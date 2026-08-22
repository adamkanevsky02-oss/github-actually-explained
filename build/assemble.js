#!/usr/bin/env node
/**
 * assemble.js — builds the single-file tutorial.
 *
 *   node build/assemble.js
 *
 * Reads build/shell.html, concatenates every build/modules/NN-*.js in numeric
 * order into the <!-- INJECT:MODULES --> marker, validates the result, and
 * writes index.html at the project root.
 *
 * Validation is deliberately noisy: this file is the last gate before a build
 * reaches a reader, and a silently-broken module is worse than a failed build.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GENERIC = process.argv.includes('--generic');
const outFlag = process.argv.indexOf('--out');
const OUT_OVERRIDE = outFlag >= 0 ? process.argv[outFlag + 1] : null;
const G = GENERIC ? require('./generic-map.js') : null;
const xf = s => (G ? G.transform(s) : s);

const BUILD = __dirname;
const ROOT = path.dirname(BUILD);
const SHELL = path.join(BUILD, 'shell.html');
const MODULE_DIR = path.join(BUILD, 'modules');
const OUT = OUT_OVERRIDE ? path.resolve(ROOT, OUT_OVERRIDE) : path.join(ROOT, 'index.html');

const MARKER = '<!-- INJECT:MODULES -->';
const EXPECTED = [
  'what-is-github', 'repo-anatomy', 'files-and-readme', 'commits-and-history',
  'branches', 'pull-requests', 'issues', 'search-and-discovery',
  'settings-and-visibility', 'beyond-uni'
];

const problems = [];
const warnings = [];
const fail = m => problems.push(m);
const warn = m => warnings.push(m);

// ---------------------------------------------------------------- read shell
if (!fs.existsSync(SHELL)) {
  console.error('FATAL: shell.html not found at ' + SHELL);
  process.exit(1);
}
const shell = xf(fs.readFileSync(SHELL, 'utf8'));

const markerCount = shell.split(MARKER).length - 1;
if (markerCount !== 1) {
  console.error('FATAL: expected exactly 1 "' + MARKER + '" in shell.html, found ' + markerCount);
  process.exit(1);
}

// -------------------------------------------------------------- read modules
const files = fs.readdirSync(MODULE_DIR)
  .filter(f => /^\d{2}-.+\.js$/.test(f))
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

if (!files.length) {
  console.error('FATAL: no NN-*.js files in ' + MODULE_DIR);
  process.exit(1);
}

const seenIds = new Set();
const seenNums = new Set();
const blocks = [];
const summary = [];

for (const file of files) {
  const full = path.join(MODULE_DIR, file);
  let src = xf(fs.readFileSync(full, 'utf8'));

  // --- syntax check + shape check, by actually running it in a sandbox ------
  const sandbox = { MODULES: [], console };
  try {
    vm.runInNewContext(src, sandbox, { filename: file, timeout: 5000 });
  } catch (e) {
    fail(file + ': does not execute — ' + e.message);
    continue;
  }

  if (sandbox.MODULES.length !== 1) {
    fail(file + ': pushed ' + sandbox.MODULES.length + ' modules, expected exactly 1');
    continue;
  }

  const mod = sandbox.MODULES[0];
  const where = file + ' (' + (mod.id || '?') + ')';

  for (const key of ['id', 'num', 'title', 'blurb', 'goals', 'sections']) {
    if (mod[key] === undefined) fail(where + ': missing required key "' + key + '"');
  }
  if (!Array.isArray(mod.sections) || !mod.sections.length) {
    fail(where + ': sections must be a non-empty array');
  }
  if (seenIds.has(mod.id)) fail(where + ': duplicate id "' + mod.id + '"');
  seenIds.add(mod.id);
  if (seenNums.has(mod.num)) fail(where + ': duplicate num ' + mod.num);
  seenNums.add(mod.num);
  if (EXPECTED[mod.num - 1] !== mod.id) {
    fail(where + ': num ' + mod.num + ' should have id "' + EXPECTED[mod.num - 1] + '"');
  }

  // --- content quality gates ----------------------------------------------
  const sections = Array.isArray(mod.sections) ? mod.sections : [];
  let hotspots = 0, screens = 0, escapes = 0, incomplete = [];

  for (const s of sections) {
    if (s.type === 'html') escapes++;
    if (s.type !== 'screen') continue;
    screens++;
    for (const h of (s.hotspots || [])) {
      hotspots++;
      const missing = ['what', 'why', 'how', 'fail', 'when'].filter(k => !h[k]);
      if (missing.length) incomplete.push((h.title || h.sel) + ' → missing ' + missing.join(', '));
      if (!h.sel) fail(where + ': a hotspot has no `sel`');
      // a hotspot pointing at a view that does not exist renders nothing
      if (h.view && s.views && !s.views[h.view]) {
        fail(where + ': hotspot "' + (h.title || h.sel) + '" targets unknown view "' + h.view + '"');
      }
    }
    if (s.views && s.initial && !s.views[s.initial]) {
      fail(where + ': screen "' + s.id + '" has initial view "' + s.initial + '" which does not exist');
    }
  }

  if (incomplete.length) {
    fail(where + ': ' + incomplete.length + ' hotspot(s) missing Why-Chain fields:\n      - ' +
      incomplete.slice(0, 8).join('\n      - ') +
      (incomplete.length > 8 ? '\n      - …and ' + (incomplete.length - 8) + ' more' : ''));
  }

  const words = JSON.stringify(mod).replace(/<[^>]+>/g, ' ').replace(/\\[nt]/g, ' ')
    .split(/\s+/).filter(w => /[a-z]{3}/i.test(w)).length;
  if (words < 900) warn(where + ': only ~' + words + ' words of copy (brief asks for 900+)');
  if (!screens) warn(where + ': has no interactive screen');
  if (!sections.some(s => s.type === 'recap')) warn(where + ': has no recap section');
  if (escapes) warn(where + ': uses the `html` escape hatch ' + escapes + '×');

  // --- ban list ------------------------------------------------------------
  const flat = JSON.stringify(mod);
  const banned = [
    /\bsimply\b/i, /\bas you can see\b/i, /\bobviously\b/i,
    /\bit'?s straightforward\b/i, /\bthis is where you manage\b/i
  ];
  // NB "easy" is deliberately NOT banned: "it is easy to miss one" warns the
  // reader, which is the opposite of the dismissiveness the brief prohibits.
  for (const re of banned) {
    const hit = flat.match(re);
    if (hit) fail(where + ': ban-list phrase "' + hit[0] + '"');
  }

  // --- the backslash trap --------------------------------------------------
  // In a JS string `journal\week6.md` collapses to `journalweek6.md`. If the
  // module mentions the journal file at all, it must survive execution intact.
  if (/journal.{0,2}week6/.test(flat) && !/journal\\\\week6\.md/.test(flat) && !/journal\/week6\.md/.test(flat)) {
    warn(where + ': mentions the journal file but neither `journal\\week6.md` nor `journal/week6.md` ' +
      'survived — check your backslash escaping');
  }

  // --- safe to embed in <script> ------------------------------------------
  src = src.replace(/<\/script/gi, '<\\/script');

  blocks.push('<script>\n/* ' + file + ' */\n' + src.trim() + '\n</script>');
  summary.push({ file, num: mod.num, id: mod.id, words, screens, hotspots, sections: sections.length });
}

// ------------------------------------------------------------- missing check
for (let i = 0; i < EXPECTED.length; i++) {
  if (!seenIds.has(EXPECTED[i])) warn('module ' + (i + 1) + ' (' + EXPECTED[i] + ') not built yet');
}

// -------------------------------------------------------------------- output
const out = shell.replace(MARKER, blocks.join('\n\n'));

// self-containment: nothing may reach the network
const selfCheck = [
  // require an attribute: a bare "<img>" in prose/docs is not a real tag
  [/<img\s[^>]*>/i, '<img> tag'],
  [/<link\b(?![^>]*rel=["']?(icon|manifest))/i, '<link> tag'],
  [/\bsrc\s*=\s*["']https?:/i, 'remote src'],
  [/\bhref\s*=\s*["']https?:\/\/(?!github\.com)/i, 'remote href (non-github.com placeholder)'],
  [/@import/i, '@import'],
  [/\burl\(\s*["']?https?:/i, 'remote url()'],
  [/\bfetch\s*\(/i, 'fetch('],
  [/XMLHttpRequest/i, 'XMLHttpRequest'],
  [/new\s+WebSocket/i, 'WebSocket']
];
for (const [re, label] of selfCheck) {
  if (re.test(out)) fail('self-containment: output contains ' + label);
}

// personal-data audit (generic builds only)
if (GENERIC) {
  const leaks = G.audit(out, 'output');
  for (const l of leaks) fail('genericise: personal token survived — ' + l);
}

// ------------------------------------------------------------------- report
console.log('\nModules built\n' + '-'.repeat(78));
for (const s of summary) {
  console.log(
    String(s.num).padStart(2) + '. ' + s.id.padEnd(24) +
    String(s.words).padStart(6) + ' words  ' +
    String(s.sections).padStart(3) + ' sections  ' +
    String(s.screens).padStart(2) + ' screens  ' +
    String(s.hotspots).padStart(3) + ' hotspots'
  );
}
const tot = summary.reduce((a, s) => ({
  words: a.words + s.words, screens: a.screens + s.screens, hotspots: a.hotspots + s.hotspots
}), { words: 0, screens: 0, hotspots: 0 });
console.log('-'.repeat(78));
console.log('    ' + 'TOTAL'.padEnd(24) + String(tot.words).padStart(6) + ' words' +
  '                ' + String(tot.screens).padStart(2) + ' screens  ' + String(tot.hotspots).padStart(3) + ' hotspots');

if (warnings.length) {
  console.log('\nWarnings (' + warnings.length + ')');
  warnings.forEach(w => console.log('  ! ' + w));
}

if (problems.length) {
  console.log('\nBLOCKING PROBLEMS (' + problems.length + ')');
  problems.forEach(p => console.log('  x ' + p));
  console.log('\nBuild NOT written.\n');
  process.exit(1);
}

fs.writeFileSync(OUT, out, 'utf8');
console.log('\nWrote ' + OUT + '  (' + (Buffer.byteLength(out) / 1024).toFixed(0) + ' KB)\n');
