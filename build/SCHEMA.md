# CONTENT AGENT CONTRACT — read after BRIEF.md, before writing anything

Produced by the foundation engineer. This is the exact API your module file must use.
The reference implementation is `build/modules/02-repo-anatomy.js` — **open it and read it**.
It is the shape you are copying.

---

## Your file

One file: `build/modules/NN-slug.js`, containing **exactly one statement**. Nothing else.

```js
MODULES.push({
  id:    'branches',                 // must match the slug in BRIEF.md §5
  num:   5,                          // module number, drives ordering
  title: 'Branches: working without breaking anything',
  blurb: 'One sentence, shown under the module title.',
  goals: ['...','...','...'],        // 3–4 "you will be able to…" lines
  sections: [ /* rendered top to bottom, in order */ ]
});
```

---

## The eight section types

### 1. `prose` — teaching copy
```js
{type:'prose', title:'Optional <h2> heading', html:
  '<p>First paragraph.</p>' +
  '<p>Use <strong>bold</strong>, <em>italic</em>, <code>code</code>, ' +
  '<a href="#">links</a>, <ul>/<ol>, <blockquote>, <pre><code>blocks</code></pre>.</p>'}
```
Add `class="tut-lead"` to the first `<p>` for a larger opening paragraph.

### 2. `callout` — boxed aside
`variant` is `info` | `tip` | `warn` | `danger` | `moment`.
```js
{type:'callout', variant:'moment', title:'Teaching moment: the README still has template text',
 html:'<p>…</p><p>…</p>'}
```
Use **`variant:'moment'` for the five real defects in BRIEF.md §4** — it renders with an amber
"In your repo" tag so they read as a distinct thread running through the whole tutorial.

### 3. `steps` — numbered click-by-click walkthrough
```js
{type:'steps', title:'Renaming the file, click by click', items:[
  {label:'Open the file', html:'<p>Click <code>journal\\week6.md</code> in the file list.</p>'},
  {label:'Click the pencil', html:'<p>Top right of the file box…</p>'}
]}
```

### 4. `compare` — wrong vs right, side by side (left renders red, right green)
```js
{type:'compare', title:'Forward slash vs backslash',
 left:  {title:'What you typed: journal\\week6.md', html:'<p>…</p>'},
 right: {title:'What you meant: journal/week6.md', html:'<p>…</p>'}}
```

### 5. `terms` — definition list for jargon
```js
{type:'terms', title:'The words you now need', items:[
  {term:'Branch', html:'One parallel version of the project. <code>main</code> is the official one.'},
  {term:'Merge',  html:'Folding one branch’s changes back into another.'}
]}
```

### 6. `recap` — closing checklist. **One per module, always last.**
```js
{type:'recap', title:'What you can now do', items:[
  'Make a branch and know where it lives',
  'Explain why a branch is safer than editing <strong>main</strong>'
]}
```

### 7. `html` — escape hatch
Only if nothing above fits. **Flag every use in your report to the PM.**
```js
{type:'html', html:'<div class="tut-prose">…</div>'}
```

### 8. `screen` — an interactive fake GitHub page (the important one)
```js
{type:'screen',
 id:'branch-demo',                                   // unique within your module
 label:'Making a branch on your repo',               // caption above the frame
 url:'github.com/jordan-lee/trading-journal-practice',
 initial:'root',                                     // which view shows first
 inertNote:'Optional custom toast for unwired controls.',

 views:{                                             // one entry per screen state
   root:    {url:'github.com/jordan-lee/trading-journal-practice', html:'…'},
   branches:{url:'github.com/jordan-lee/trading-journal-practice/branches', html:'…'}
 },

 actions: [ /* see below */ ],
 hotspots:[ /* see below */ ]
}
```

---

## Hotspots — numbered 1..N automatically, in array order

Order them the way you want him to read them.

```js
{sel:  '[data-h="branch-selector"]',   // CSS selector, scoped to the view
 view: 'root',                         // defaults to `initial`
 place:'left',                         // 'left'|'right'|'top'|'bottom' — auto-flips
 title:'The branch selector — it says "main"',
 what: '<p>What it is, in plain English.</p>',
 why:  '<p>What problem caused this to be invented.</p>',
 how:  '<p>The literal clicks.</p>',
 fail: '<p>The concrete failure mode.</p>',
 when: '<p>A real moment in the reader’s life.</p>',
 note: '<p>Optional extra warning box at the bottom of the panel.</p>'}
```

**All five Why-Chain fields (`what` `why` `how` `fail` `when`) are required.** A missing one
silently drops that row from the panel — the PM will notice. `note` is optional.

---

## House rules — these will bite you

- **Give every hotspot target a `data-h="name"` attribute and select on that.** Never select on a
  class you might reuse — you will hit the wrong node.
- **Backslashes.** The file is `journal\week6.md`. In a JS string you **must** write
  `'journal\\week6.md'`. Writing `'\w'` silently becomes `'w'` and the teaching moment evaporates.
  In HTML attributes and text nodes one backslash is fine.
- **Apostrophes.** Strings are single-quoted — use the typographic `’` (U+2019) or `\'`.
- **No emoji inside the fake GitHub chrome.** Emoji are fine in tutorial prose.
- **No `<img>`, ever.** Avatars are drawn:
  `<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>` — the engine paints
  a deterministic identicon into it.
- Sections render in array order; a screen can appear anywhere among prose blocks.

---

## The interactive-screen API

`actions` is a list of `{on, …effects}`. `on` is a CSS selector; **the first action whose `on`
matches the click wins**. You write data, never code.

| Effect | Shape |
|---|---|
| `view` | `'commits'` — switch view (URL bar updates, markers rebuild) |
| `toggle` | `{target:'#branch-menu', class:'is-open'}` — `is-open` also closes other menus |
| `addClass` / `removeClass` | `{target:'#x', class:'is-on'}` |
| `append` / `prepend` | `{target:'#commit-list', html:'<div class="gh-commitrow">…</div>'}` |
| `replace` | `{target:'#box', html:'…'}` — sets innerHTML |
| `setText` | `{target:'#count', text:'6'}` |
| `toast` | `'One-line message that fades away.'` (HTML allowed) |
| `explain` | `{title:'What just happened', html:'<p>…</p>'}` — opens the drawer in teal "event" mode |
| `once` | `true` — fires at most once |

Anything clickable-looking **not** covered by an action automatically shows a "not wired up in this
lesson" toast, so nothing ever feels broken. `data-inert` opts an element into that explicitly.
Selectors in `target` resolve inside the currently visible view first, then the whole screen.

Free on every screen: a **"Walk me through it"** guided walker (1→N, switches views, scrolls the
target into view, auto-opens the panel), a **Reset** button, ←/→ arrow keys, Esc to close, and an
`N / M explained` counter.

### Worked example — simulating a commit
```js
{type:'screen', id:'commit-demo', label:'Committing the typo fix',
 url:'github.com/jordan-lee/trading-journal-practice', initial:'edit',
 views:{
   edit:{url:'github.com/jordan-lee/trading-journal-practice/edit/main/README.md', html:
     '<div class="gh-page"><div class="gh-blob">…</div>' +
     '<button class="gh-btn gh-btn--primary" data-h="commit-btn">Commit changes…</button>' +
     '<div class="gh-commitlist" id="history">' +
       '<div class="gh-commitrow">…existing commit…</div>' +
     '</div></div>'}
 },
 actions:[
   {on:'[data-h="commit-btn"]', once:true,
    prepend:{target:'#history', html:
      '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Fix correletaed typo in README</span>' +
      '<span class="gh-commitrow__meta">jordan-lee committed just now</span></span>' +
      '<span class="gh-commitrow__right"><span class="gh-shabox">' +
      '<span class="gh-shabox__sha">b71f0c2</span></span></span></div>'},
    setText:{target:'[data-h="commit-count"]', text:'6'},
    explain:{title:'You just made a commit',
      html:'<p>A new row appeared at the top of the history and the count went from 5 to 6. ' +
           'The old version did not vanish — it is one row down, permanently.</p>'}}
 ],
 hotspots:[ /* … */ ]}
```

---

## Icons

`<svg class="octicon"><use href="#oct-NAME"/></svg>`. Modifiers `octicon--sm` (12px),
`octicon--lg` (24px). All 52 verified rendering.

`repo` `repo-locked` `file` `file-directory-fill` `git-branch` `git-commit` `git-pull-request`
`git-merge` `issue-opened` `issue-closed` `comment` `star` `eye` `repo-forked` `code` `play`
`table` `shield` `graph` `gear` `search` `plus` `triangle-down` `check` `check-circle` `x` `lock`
`book` `history` `pencil` `trash` `copy` `kebab-horizontal` `three-bars` `mark-github` `download`
`link-external` `dot-fill` `tag` `people` `clock` `alert` `bell` `milestone` `info` `light-bulb`
`question` `sync` `rocket` `organization` `arrow-left` `arrow-right`

---

## CSS classes

**Everything below must live inside a `screen` section** (the engine wraps it in `.gh-root`).

| Surface | Classes |
|---|---|
| **Global top nav** | `gh-topnav` `gh-topnav__hamburger` `gh-topnav__mark` `gh-topnav__spacer` `gh-topnav__actions` `gh-topnav__avatar` · `gh-searchbox` `gh-searchbox__ph` `gh-searchbox__slash` · `gh-navbtn` `gh-navbtn--bordered` `gh-navbtn__dot` |
| **Repo header** | `gh-repohead` `gh-repohead__row` `gh-repohead__actions` · `gh-breadcrumb` `gh-breadcrumb__owner` `gh-breadcrumb__sep` `gh-breadcrumb__repo` `gh-breadcrumb__cur` · `gh-badge` |
| **Tab bar** | `gh-tabnav` `gh-tab` `gh-tab--active` (orange underline) · count pills use `gh-counter gh-counter--flat` |
| **Page layout** | `gh-page` · `gh-layout` (main + 296px sidebar) `gh-layout--narrow` `gh-layout--full` |
| **Branch/tag toolbar** | `gh-repotoolbar` `gh-branchsel` `gh-refstats` `gh-refstat` `gh-toolbar-right` `gh-gotofile` `gh-gotofile__slash` |
| **File list** | `gh-filebox` `gh-filebox__head` · `gh-commitauthor` `gh-commitmsg` `gh-commitmeta` `gh-sha` `gh-copybtn` `gh-commitcount` · `gh-filerow` `gh-filerow__icon` `gh-filerow__icon--dir` `gh-filerow__name` `gh-filerow__msg` `gh-filerow__time` |
| **README / markdown** | `gh-readmebox` `gh-readmebox__head` `gh-readmebox__tools` `gh-readmebox__body` · `gh-markdown` (styles h1–h4 with border-bottoms, p, ul/ol, blockquote, code, pre, table, hr, a) |
| **Right sidebar** | `gh-side` `gh-sidecard` `gh-sidecard__hd` `gh-sidecard__gear` `gh-sidecard__empty` · `gh-metalist` `gh-metarow` `gh-sidelink` `gh-contribs` `gh-contribrow` · `gh-langbar` `gh-langbar__seg` `gh-langlist` `gh-langdot` · `gh-topics` `gh-topic` |
| **Commit history** | `gh-commitgroup` `gh-commitgroup__date` `gh-commitlist` `gh-commitrow` `gh-commitrow__main` `gh-commitrow__title` `gh-commitrow__meta` `gh-commitrow__right` · `gh-shabox` `gh-shabox__sha` `gh-verified` `gh-unverified` |
| **Blob (file view)** | `gh-blob` `gh-blob__head` `gh-blob__tools` `gh-blob__table` `gh-blob__ln` `gh-blob__code` · `gh-filepath` `gh-filepath__part` `gh-filepath__cur` |
| **Diff** | `gh-diff` `gh-diff__head` `gh-diff__stat` (`.add`/`.del`) `gh-diff__tools` · `gh-difftable` `gh-diff__ln` `gh-diff__sign` `gh-diff__code` · row classes `gh-diffrow--add` `gh-diffrow--del` `gh-diffrow--hunk` · word-level `gh-diffword-add` `gh-diffword-del` · `gh-difftoggle` (Unified/Split, `.is-on`) |
| **Branches** | `gh-branchbox` `gh-branchbox__head` `gh-branchrow` `gh-branchname` `gh-branchrow__meta` `gh-branchrow__right` · `gh-aheadbehind` `gh-aheadbehind__bar` (`i.ahead`/`i.behind`) · `gh-comparebar` `gh-comparebar__pill` `gh-comparebar__ok` |
| **Issues / PRs** | `gh-listbox` `gh-listbox__head` `gh-listbox__filter` · `gh-listrow` `gh-listrow__icon` (`--open`/`--closed`/`--merged`) `gh-listrow__main` `gh-listrow__title` `gh-listrow__meta` `gh-listrow__right` · `gh-state` (`--open`/`--merged`/`--closed`/`--draft`/`--notplanned`, `--sm`) · `gh-label` `gh-labels` `gh-milestone` `gh-assignees` |
| **PR conversation** | `gh-issuehead` `gh-issuenum` `gh-issuehead__sub` · `gh-timeline` `gh-tlitem` `gh-tlevent` `gh-tlbadge` (`--open`/`--merged`/`--closed`/`--commit`) · `gh-comment` `gh-comment__hd` `gh-comment__bd` `gh-comment__tools` · `gh-commentbox` `gh-commentbox__tabs` `gh-commentbox__tab` `gh-commentbox__area` `gh-commentbox__ft` · `gh-mergebox` `gh-mergebox__row` `gh-mergebox__icon` (`--ok`/`--warn`/`--bad`) `gh-mergebox__ttl` `gh-mergebox__sub` `gh-mergebox__actions` |
| **Settings** | `gh-settings` `gh-settings__nav` `gh-settings__navsec` `gh-settings__navitem` (`.is-on`) `gh-settings__h` `gh-settings__h2` · `gh-formrow` `gh-formrow__label` `gh-formrow__hint` · `gh-radiorow` `gh-radiorow__mark` `gh-radiorow__ttl` `gh-radiorow__sub` · `gh-danger` `gh-danger__hd` `gh-danger__row` `gh-danger__ttl` `gh-danger__sub` |
| **Search results** | `gh-searchpage` `gh-facets` `gh-facet` `gh-facet__n` · `gh-searchhead` `gh-searchresult` `gh-searchresult__ttl` `gh-searchresult__snip` (use `<mark>` for hits) `gh-searchresult__meta` |
| **Dashboard** | `gh-dash` `gh-dash__panel` `gh-dash__hd` `gh-dash__search` `gh-dash__right` · `gh-toprepos` `gh-toprepo` · `gh-feeditem` `gh-feeditem__hd` `gh-feeditem__bd` `gh-feedrepo` `gh-feeditem__desc` `gh-feeditem__meta` · `gh-changelog__item` `gh-changelog__date` |
| **Primitives** | `gh-btn` + `--primary` `--danger` `--invisible` `--sm` `--icon` `--block` · `gh-btngroup` `gh-split` · `gh-counter` `gh-counter--flat` · `gh-input` `gh-input--sm` · `gh-menuwrap` `gh-menu` (`.is-open`) `gh-menu--right` `gh-menu--wide` `gh-menu__hd` `gh-menu__sec` `gh-menu__item` · `gh-flash` + `--warn` `--danger` `--success` · `gh-blankslate` `gh-blankslate--dashed` · `gh-avatar` + `--16` `--20` `--24` `--32` `--40` `--48` `--sq` · `gh-link` `gh-muted` `gh-subtle` `gh-mono` `gh-b` · `[data-inert]` |

**Tutorial-chrome classes** (only inside `type:'html'` escape hatches): `tut-prose` `tut-lead`
`tut-callout` `tut-callout--{info,tip,warn,danger,moment}` `tut-steps` `tut-compare` `tut-terms`
`tut-recap` `tut-code`.

---

## Continuity facts fixed by module 2 — do not contradict these

- Invented older commit SHAs already used in module 2's history view, oldest → newest:
  `e18b7f2`, `3c9d114`, `7b0e5da`, `a4f21c8`, then the real `109d091`. Reuse these exact values.
- `journal\week6.md` blob content is a three-line invented stub in module 2's `views.blobJournal`.
- Today's date in the tutorial's world is **Aug 7, 2026**. Relative times: the latest commit is
  "29 minutes ago", README's last change "2 hours ago".
- Module 2 hotspots the README placeholders, the run-together degree line, and the Private badge in
  passing. Modules 3 and 9 still **own** those teaching moments and must explain them in full.
