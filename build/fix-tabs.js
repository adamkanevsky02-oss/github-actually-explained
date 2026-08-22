#!/usr/bin/env node
/**
 * fix-tabs.js — rebuilds every repo tab bar to match the reference account's real GitHub.
 *
 *   node build/fix-tabs.js [file...]      (defaults to every build/modules/NN-*.js)
 *
 * His repo shows exactly nine tabs, in this order:
 *   Code | Issues | Pull requests | Agents | Actions | Projects |
 *   Security and quality | Insights | Settings
 *
 * The modules were authored independently and drifted: module 2 shipped a
 * generic set with Wiki and no Agents, module 5 an abbreviated four-tab bar,
 * modules 9 and 10 dropped Projects/Security. On real GitHub this bar is
 * identical on every page of a repo, so tabs appearing and disappearing between
 * tutorial screens is a teaching error, not a cosmetic one.
 *
 * Each repo tab bar is rebuilt to the canonical nine while PRESERVING, per tab:
 *   - which tab is active (the orange underline)
 *   - any data-h attribute (hotspot and action selectors depend on these)
 *   - any counter pill with a non-zero value
 * Zero-value tab pills are dropped, because real GitHub hides a 0 counter and
 * the reference screenshots confirm no pills on Issues / Pull requests. Button counters
 * (Watch / Fork / Star) use the plain `gh-counter` class and are untouched.
 *
 * PR sub-tabs (Conversation / Commits / Checks / Files changed) and branch
 * filters (Active / Stale / All) share the gh-tabnav class and are skipped.
 *
 * Idempotent by construction: it re-derives the bar from scratch every run.
 */

const fs = require('fs');
const path = require('path');

const CANON = [
  ['Code',                 'code'],
  ['Issues',               'issue-opened'],
  ['Pull requests',        'git-pull-request'],
  ['Agents',               'rocket'],
  ['Actions',              'play'],
  ['Projects',             'table'],
  ['Security and quality', 'shield'],
  ['Insights',             'graph'],
  ['Settings',             'gear']
];

// Old label -> canonical label, for carrying attributes across a rename.
const ALIAS = { 'Security': 'Security and quality' };

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(path.join(__dirname, 'modules'))
      .filter(f => /^\d{2}-.+\.js$/.test(f))
      .sort()
      .map(f => path.join(__dirname, 'modules', f));

const grand = { bars: 0, added: 0, removed: 0, pills: 0 };

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const n = { bars: 0, added: 0, removed: 0, pills: 0 };

  const s = before.replace(/<nav class="gh-tabnav">[\s\S]*?<\/nav>/g, block => {
    if (!/>Code</.test(block)) return block;   // not a repo tab bar
    n.bars++;

    // ---- parse the existing tabs -----------------------------------------
    const found = new Map();
    const tabRe = /<span class="gh-tab([^"]*)"([^>]*)>(?:<svg[^>]*><use href="#oct-[^"]*"\/><\/svg>)?([^<]*)(<span class="gh-counter[^"]*">([^<]*)<\/span>)?\s*<\/span>/g;
    let m;
    while ((m = tabRe.exec(block)) !== null) {
      const label = ALIAS[m[3].trim()] || m[3].trim();
      if (!label) continue;
      const dataH = (m[2].match(/data-h="[^"]*"/) || [''])[0];
      found.set(label, {
        active: /gh-tab--active/.test(m[1]),
        dataH: dataH ? ' ' + dataH : '',
        count: m[5] !== undefined ? m[5].trim() : null
      });
    }
    if (!found.size) return block;             // couldn't parse — leave alone

    // ---- emit the canonical nine -----------------------------------------
    const tabs = CANON.map(([label, icon]) => {
      const prev = found.get(label);
      if (!prev) n.added++;
      const cls = 'gh-tab' + (prev && prev.active ? ' gh-tab--active' : '');
      const attrs = prev ? prev.dataH : '';
      let pill = '';
      if (prev && prev.count !== null) {
        if (prev.count === '0') n.pills++;     // GitHub hides a zero counter
        else pill = '<span class="gh-counter gh-counter--flat">' + prev.count + '</span>';
      }
      return '<span class="' + cls + '"' + attrs + '>' +
             '<svg class="octicon"><use href="#oct-' + icon + '"/></svg>' +
             label + pill + '</span>';
    });

    for (const label of found.keys()) {
      if (!CANON.some(([c]) => c === label)) n.removed++;   // e.g. Wiki
    }

    return '<nav class="gh-tabnav">' + tabs.join('') + '</nav>';
  });

  if (s !== before) {
    fs.writeFileSync(file, s, 'utf8');
    console.log(path.basename(file).padEnd(32) +
      'bars:' + n.bars + '  tabs added:' + n.added + '  removed:' + n.removed +
      '  zero-pills dropped:' + n.pills);
  } else {
    console.log(path.basename(file).padEnd(32) + 'no change' + (n.bars ? '  (bars:' + n.bars + ')' : ''));
  }
  for (const k in n) grand[k] += n[k];
}

console.log('\nTOTAL  repo tab bars:' + grand.bars + '  tabs added:' + grand.added +
  '  non-canonical removed:' + grand.removed + '  zero-pills dropped:' + grand.pills);
