# GitHub, Actually Explained — working copy

This folder is the **private, authored source**. It teaches from your real repo
(`jordan-lee/trading-journal-practice`) including your actual README, your answers
and your other repositories.

**Nothing in this folder is published.** It is not a git repository.

## The two builds

| | Command | Output | Contains your data? |
|---|---|---|---|
| **Yours** | `node build/assemble.js` | `index.html` (here) | Yes — that's the point |
| **Public** | `node build/publish.js` | `../github-tutorial-public/` | No — audited clean |

Open **`index.html`** to use the tutorial. It's built around your repo, which is what
makes it click — you recognise every screen.

```bash
open -a "Google Chrome" index.html
```

## The published version

Live: <https://adamkanevsky02-oss.github.io/github-actually-explained/>
Repo: <https://github.com/adamkanevsky02-oss/github-actually-explained>

`build/publish.js` regenerates it: it runs every published file through
`build/generic-map.js` (which maps your identity onto a fictional persona,
`jordan-lee` / `trading-journal-practice`), rebuilds `index.html` in the public tree,
then **audits every published byte** and refuses to finish if a single personal token
survives.

All five teaching moments survive the transform intact — the `journal\week6.md`
backslash, the leftover template placeholders, the run-together degree line, the
`correletaed` typo and the Private-repo lesson.

To update the live site:

```bash
node build/publish.js
cd ../github-tutorial-public && git add -A && git commit -m "..." && git push
```

### Never published

`BRIEF.md`, `QA-LOG.md` and `generic-map.js` are excluded by `publish.js` — the first
two are written about you specifically, and the third contains the entire
personal-to-generic mapping, which is to say all of your data in one file.

## Build files

- `build/shell.html` — GitHub-dark replica CSS, 52 Octicons, the tutorial engine
- `build/modules/NN-*.js` — one file per module, plain data objects
- `build/assemble.js` — builds + enforces the quality gate
- `build/fix-tabs.js` — normalises every replica tab bar (idempotent)
- `build/BRIEF.md` — the spec everything was written against
- `build/SCHEMA.md` — the module authoring API
- `build/QA-LOG.md` — what was verified in a browser, and what was fixed
