# GitHub, Actually Explained

**[▶ Open the tutorial](https://adamkanevsky02-oss.github.io/github-actually-explained/)**

An interactive tutorial that teaches GitHub by rebuilding its interface as a clickable
replica — then explaining every part of it.

Not a video, not a list of commands. A working fake GitHub you can click through, with
**222 numbered hotspots** pinned to real interface elements.

<sub>One self-contained HTML file · no dependencies · no build step to view · no network requests · works offline</sub>

---

## Why it exists

It gives beginners a visual walkthrough the github interface, while also explaining all of the use cases of the web app. Ensuring that anyone who uses the guide, can navigate the platform, and use it in their everyday life. 

Every hotspot answers five questions:

> **What it is** · **Why it exists** · **How you use it** · **What goes wrong** · **When you'd reach for it**

## What's inside

Ten modules, ~60,000 words, 21 clickable screens, 222 hotspots.

| # | Module | |
|---|--------|---|
| 1 | What Git and GitHub actually are | The distinction most beginners are never told |
| 2 | Anatomy of a repository page | Every element of a repo page — 35 hotspots on one screen |
| 3 | Files, READMEs and your first change | Markdown from zero, and the full edit → commit loop |
| 4 | Commits: the save points that never disappear | Reading history, SHAs, and how to read a diff |
| 5 | Branches | Working without breaking anything |
| 6 | Pull requests | Why the name is confusing, and what a PR really is |
| 7 | Issues | The to-do list that lives with the project |
| 8 | Finding things | Search qualifiers, the dashboard, and reading a GitHub URL |
| 9 | Settings and visibility | Private vs public, and not leaking secrets |
| 10 | Beyond the basics | Pages, Actions, portfolios, collaboration, open source |

## The design decision that matters

It teaches from **one repository that actually contains mistakes**, rather than a
sanitised example.

The best of them: a file committed as `journal\week6.md`. Someone typed a Windows-style
backslash into GitHub's filename box, which produces *one file with a backslash in its
name* instead of a `journal/` folder — because GitHub only builds folders from a forward
slash. It is invisible until you know to look for it, thousands of people do it, and no
tutorial covers it, because no tutorial uses a repo that contains it.

Four more run through the modules: leftover template placeholders nobody deleted, a
Markdown line that renders run-together because a single newline is not a line break, an
uncorrected typo used as a zero-stakes worked example of the commit loop, and a private
repo that is the right call now and the wrong call later.

Teaching from real defects means the reader recognises the situation instead of watching
an idealised one.

## Interaction model

- Screens are **genuinely clickable** — tabs switch views, dropdowns open, diffs expand,
  file rows navigate
- Actions that would hit the network **simulate their result instead**: merge a pull
  request and the state pill turns purple, the timeline gains two events, the merge box
  becomes "successfully merged and closed", and a panel explains exactly what moved where
- A **guided walker** steps through hotspots in reading order, or free-roam them
- Arrow keys move between hotspots, <kbd>Esc</kbd> closes, progress persists in `localStorage`


## Tech

Vanilla HTML, CSS and JavaScript. Dark theme built against GitHub's own colour tokens so
the replica reads as the real thing.
