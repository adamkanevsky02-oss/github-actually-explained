# GitHub, Actually Explained

**[▶ Open the tutorial](https://jordan-lee.github.io/github-actually-explained/)**

An interactive, hands-on tutorial that teaches GitHub by rebuilding its interface as a
clickable replica — then explaining every part of it.

Not a video. Not a list of commands. A working fake GitHub you can click through,
with 222 numbered hotspots pinned to real interface elements.

<sub>One self-contained HTML file · no build step · no dependencies · no network requests · works offline</sub>

---

## Why it exists

Most GitHub tutorials teach you *which buttons to press*. You follow along, it works,
and you still have no idea what happened. I'd used GitHub for a while exactly like
that — clicking things that worked without understanding why.

So this one is built on a different rule: **never state what something is without also
answering why it exists, what breaks if you ignore it, and when you'd actually reach
for it.** Every single hotspot answers those five questions. That constraint is
enforced by the build — see [Quality gate](#quality-gate) below.

## What's inside

Ten modules, ~60,000 words, 21 clickable screens, 222 hotspots.

| # | Module | |
|---|--------|---|
| 1 | What Git and GitHub actually are | The distinction most beginners never get told |
| 2 | Anatomy of a repository page | Every element of a repo page — 35 hotspots |
| 3 | Files, READMEs and your first change | Markdown from zero, and the full edit → commit loop |
| 4 | Commits: the save points that never disappear | Reading history, SHAs, and how to read a diff |
| 5 | Branches | Working without breaking anything |
| 6 | Pull requests | Why the name is confusing, and what a PR really is |
| 7 | Issues | The to-do list that lives with the project |
| 8 | Finding things | Search qualifiers, the dashboard, reading a GitHub URL |
| 9 | Settings and visibility | Private vs public, and not leaking secrets |
| 10 | Beyond the basics | Pages, Actions, portfolios, collaboration, open source |

## The interesting design decision

It teaches from **one real repository, with real mistakes in it** — a genuine first-week
practice repo, defects included, rather than a sanitised example.

The best of those: a file committed as `journal\week6.md`. A Windows-style backslash
typed into GitHub's filename box, which produces *one file with a backslash in its name*
rather than a `journal/` folder. GitHub only builds folders from a forward slash. It's
invisible until you know to look, it's a mistake thousands of people make, and no
tutorial covers it because no tutorial uses a repo that actually contains it.

Teaching from real defects means the reader recognises the situation instead of
watching an idealised one.

## Interaction model

- Screens are **genuinely clickable** — tabs switch views, dropdowns open, diffs expand
- Actions that would hit the network **simulate their result instead**: merge a pull
  request and the state pill goes purple, the timeline updates, and a panel explains
  exactly what moved where
- A **guided walker** steps through hotspots in reading order, or free-roam
- Arrow keys move between hotspots, <kbd>Esc</kbd> closes; progress persists in `localStorage`

## Build

Source lives in `build/`. Modules are plain data objects; the engine renders them.

```bash
node build/assemble.js     # regenerates index.html
node build/fix-tabs.js     # re-normalises every replica tab bar (idempotent)
```

### Quality gate

`assemble.js` refuses to produce a build on any of:

- a hotspot missing any of its five explanation fields
- banned filler phrasing (`simply`, `as you can see`, `obviously`, …)
- a screen referencing a view that doesn't exist
- **anything that would reach the network** — no CDN, no fonts, no images, no `fetch`

Every icon is inline SVG; every avatar is a generated identicon. The 890 KB output
file is the entire application.

## Tech

Vanilla HTML, CSS and JavaScript. No framework, no bundler, no package.json.
Dark theme built to match GitHub's own tokens so the replica reads as the real thing.
