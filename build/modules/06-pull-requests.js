/* ============================================================================
   MODULE 06 — "Pull requests: how changes get discussed and merged"
   Owns: the PR page, review, merge strategies, conflicts in a PR, draft PRs,
   the fork -> branch -> PR flow, and the honest answer to "do I need this?"
   Does NOT re-teach: branches (module 5), commits/diff reading (module 4),
   global search (module 8).
   ========================================================================== */

MODULES.push({
  id: 'pull-requests',
  num: 6,
  title: 'Pull requests: how changes get discussed and merged',
  blurb: 'The one thing on GitHub with no equivalent anywhere else in computing, wearing the most unhelpful name in software. Here is what it actually is and why it is worth using even on your own.',
  goals: [
    'Say in one sentence what a pull request is, and why the name is misleading',
    'Read every part of a PR page — the state pill, the branch bar, the four tabs, the timeline and the merge box',
    'Review a change line by line, and choose between Comment, Approve and Request changes',
    'Pick the right merge strategy out of the three in the dropdown, and say why',
    'Open a pull request on somebody else’s public repo without guessing'
  ],
  sections: [

  /* ======================================================================
     1. START FROM THE PROBLEM
     ====================================================================== */
  {type:'prose', html:
    '<p class="tut-lead">Module 5 left you holding something: a branch called <code>fix-readme-formatting</code> ' +
    'with two commits on it that fix the README. The change is good. It is also stuck. It lives on a branch ' +
    'nobody looks at, and <code>main</code> — the version anyone actually reads — still has ' +
    '<em>e.g. IronCondor</em> in it.</p>' +
    '<p>So: how does the change get into <code>main</code>? On your own you could just merge it and be done. ' +
    'But three questions appear the moment anyone else is involved, and they appear even when nobody is:</p>' +
    '<ul>' +
      '<li><strong>Who checks it first?</strong> Not “is it perfect” — just “has one other pair of eyes seen this ' +
      'before it becomes the official version?”</li>' +
      '<li><strong>Where does the conversation happen?</strong> If your tutor thinks line 5 is wrong, where does ' +
      'she write that? Email is detached from the code. A group chat scrolls away.</li>' +
      '<li><strong>How does anyone know what changed, exactly?</strong> Not “I fixed the README” — the literal ' +
      'lines, before and after.</li>' +
    '</ul>' +
    '<p>A pull request is GitHub’s single answer to all three at once. It is a page that holds a proposed change, ' +
    'shows the exact lines it would alter, carries the discussion about it, and finishes with a button that ' +
    'performs the merge. Nothing on your laptop does this. It is the reason teams use GitHub rather than a shared ' +
    'folder.</p>'
  },

  {type:'callout', variant:'warn', title:'The name is wrong and it is not your fault',
   html:
    '<p><strong>Nothing is being pushed and nothing is being pulled by you.</strong> The name is a historical ' +
    'artifact. It comes from the era before GitHub, when contributing to a project meant emailing its maintainer ' +
    'a message that said, in effect, “my copy is at this address — please <em>pull</em> my changes into yours.” ' +
    'GitHub put a button on that email and kept the name.</p>' +
    '<p>So the word “request” is the honest half: you are <em>asking</em>. Opening a pull request changes nothing ' +
    'about <code>main</code>. It is a proposal sitting on a page, and it stays a proposal until somebody presses ' +
    'Merge. On your own repo that somebody is you, ten seconds later. On someone else’s it might be never.</p>' +
    '<p>Every time you read “pull request” in this module, the phrase in your head should be ' +
    '<strong>“a proposed change, with a discussion attached.”</strong> GitLab, GitHub’s main rival, calls the ' +
    'same thing a “merge request”, which is a better name for exactly this reason. Everyone shortens it to ' +
    '<strong>PR</strong> anyway.</p>'
  },

  {type:'prose', title:'A pull request is three things stacked on one page',
   html:
    '<p>Most beginners see the comment thread, assume a PR is a forum post, and are then baffled by everything ' +
    'else on the screen. It is actually three separate objects sharing a URL, and once you can see the seams the ' +
    'page stops being noisy.</p>' +
    '<p><strong>1. A proposed merge.</strong> Every PR has exactly two branches attached to it: the ' +
    '<em>base</em> (where the change wants to go — almost always <code>main</code>) and the <em>compare</em> ' +
    'branch (where the change currently lives). The PR is a standing offer to fold the second into the first. ' +
    'That pair is printed at the top of the page and never changes for the life of the PR.</p>' +
    '<p><strong>2. A live diff.</strong> The <em>Files changed</em> tab shows every line the merge would alter. ' +
    'It is not a snapshot taken when you opened the PR — it recalculates. Push another commit to the branch ' +
    'tomorrow and the diff on this page updates by itself, the commit appears in the timeline, and anyone who ' +
    'already reviewed gets told there is new work. That is the whole reason a PR is a <em>page</em> and not a ' +
    'message.</p>' +
    '<p><strong>3. A comment thread.</strong> Comments on the change as a whole, plus comments pinned to ' +
    'individual lines of the diff, plus automatic entries recording every event — commits pushed, reviews left, ' +
    'labels added, the merge itself. It is a permanent transcript of a decision.</p>' +
    '<p>Here is one, built on your repo. It does not exist on the real github.com — your repo currently shows ' +
    '<strong>0 pull requests</strong>, and <code>course-tutor</code> is an invented reviewer so you can see what ' +
    'a review looks like. Everything else is exactly where GitHub really puts it.</p>'
  },

  /* ======================================================================
     2. THE MAIN SCREEN — a full PR
     ====================================================================== */
  {type:'screen',
   id:'pr-main',
   label:'Pull request #1 on your repo — fix-readme-formatting into main',
   url:'github.com/jordan-lee/trading-journal-practice/pull/1',
   initial:'conversation',
   inertNote:'That control is real on GitHub but inert here. The live parts of this screen are the four PR tabs, the merge button and its dropdown, the “Viewed” tick, the blue “+” in the diff gutter and the “Review changes” button.',

   views:{

    /* ---------------- CONVERSATION TAB ---------------- */
    conversation:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-counter gh-counter--flat">1</span></span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +

      '<div class="gh-issuehead">' +
        '<h1 data-h="pr-title">Fix README formatting and clean up template placeholders ' +
          '<span class="gh-issuenum">#1</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span id="pr-state"><span class="gh-state gh-state--open" data-h="state-pill">' +
            '<svg class="octicon"><use href="#oct-git-pull-request"/></svg>Open</span></span>' +
          '<span data-h="branchbar"><b class="gh-b" style="color:var(--gh-fg-default)">jordan-lee</b> wants to merge ' +
            '<b class="gh-b" style="color:var(--gh-fg-default)">2 commits</b> into ' +
            '<span class="gh-comparebar__pill">main</span> from ' +
            '<span class="gh-comparebar__pill">fix-readme-formatting</span></span>' +
        '</div>' +
      '</div>' +

      '<nav class="gh-tabnav" data-h="pr-tabs">' +
        '<span class="gh-tab gh-tab--active" data-h="tab-conversation"><svg class="octicon"><use href="#oct-comment"/></svg>Conversation<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-commits"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-checks"><svg class="octicon"><use href="#oct-check-circle"/></svg>Checks</span>' +
        '<span class="gh-tab" data-h="tab-files"><svg class="octicon"><use href="#oct-file"/></svg>Files changed<span class="gh-counter gh-counter--flat">1</span></span>' +
      '</nav>' +

      '<div class="gh-page"><div class="gh-layout">' +
        '<div>' +

          '<div class="gh-timeline" id="pr-timeline">' +

            '<div class="gh-tlitem" data-h="pr-body">' +
              '<span class="gh-tlbadge gh-tlbadge--open"><svg class="octicon"><use href="#oct-git-pull-request"/></svg></span>' +
              '<div class="gh-comment">' +
                '<div class="gh-comment__hd"><span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
                  '<b>jordan-lee</b> commented 40 minutes ago' +
                  '<span class="gh-comment__tools"><span class="gh-badge">Owner</span>' +
                  '<span class="gh-btn gh-btn--invisible gh-btn--icon" data-inert><svg class="octicon"><use href="#oct-kebab-horizontal"/></svg></span></span></div>' +
                '<div class="gh-comment__bd"><div class="gh-markdown">' +
                  '<p>Three things the Week 1 template left behind:</p>' +
                  '<ul>' +
                    '<li>Degree and trading alias render as one run-on line — needs a blank line between them.</li>' +
                    '<li><code>e.g. IronCondor</code> and <code>all of the above 2</code> are placeholder text, not answers.</li>' +
                    '<li>Typo: <code>correletaed</code>. Also dropped the angle brackets around the flash-crash answer.</li>' +
                  '</ul>' +
                  '<p>Closes #3. Leaving the <code>journal\\week6.md</code> rename to #2 — a rename shows up in ' +
                  'a diff as one file deleted and one added, and mixing that in here would make both harder to ' +
                  'read.</p>' +
                '</div></div>' +
              '</div>' +
            '</div>' +

            '<div class="gh-tlevent" data-h="tl-commits">' +
              '<span class="gh-tlbadge gh-tlbadge--commit"><svg class="octicon"><use href="#oct-git-commit"/></svg></span>' +
              '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
              '<b>jordan-lee</b> added 2 commits 40 minutes ago ' +
              '<span class="gh-mono gh-muted">8c14b60</span><span class="gh-muted">·</span><span class="gh-mono gh-muted">d5a3e91</span>' +
            '</div>' +

            '<div class="gh-tlitem" data-h="review-comment">' +
              '<span class="gh-tlbadge"><svg class="octicon"><use href="#oct-comment"/></svg></span>' +
              '<div class="gh-comment">' +
                '<div class="gh-comment__hd"><span class="gh-avatar gh-avatar--24" data-user="course-tutor"></span>' +
                  '<b>course-tutor</b> commented 12 minutes ago' +
                  '<span class="gh-comment__tools"><span class="gh-badge">Collaborator</span></span></div>' +
                '<div class="gh-comment__bd"><div class="gh-markdown">' +
                  '<p>Left one note on line 5. Otherwise this is exactly the fix — the blank line is the bit ' +
                  'everyone gets wrong, so worth remembering why it works.</p>' +
                '</div></div>' +
              '</div>' +
            '</div>' +

            '<div class="gh-tlevent" data-h="tl-approved">' +
              '<span class="gh-tlbadge gh-tlbadge--open"><svg class="octicon"><use href="#oct-check"/></svg></span>' +
              '<span class="gh-avatar gh-avatar--20" data-user="course-tutor"></span>' +
              '<b>course-tutor</b> approved these changes 12 minutes ago' +
            '</div>' +

          '</div>' +

          '<div class="gh-commentbox" data-h="commentbox" style="margin-top:8px">' +
            '<div class="gh-commentbox__tabs"><span class="gh-commentbox__tab is-on">Write</span>' +
              '<span class="gh-commentbox__tab" data-inert>Preview</span></div>' +
            '<div class="gh-commentbox__area"><textarea placeholder="Add your comment here..." data-inert></textarea></div>' +
            '<div class="gh-commentbox__ft"><span class="gh-btn" data-inert>Close pull request</span>' +
              '<span class="gh-btn gh-btn--primary" data-inert>Comment</span></div>' +
          '</div>' +

          '<div class="gh-mergebox" data-h="mergebox" id="merge-box" style="overflow:visible">' +
            '<div class="gh-mergebox__row" data-h="merge-checks">' +
              '<span class="gh-mergebox__icon gh-mergebox__icon--ok"><svg class="octicon"><use href="#oct-check"/></svg></span>' +
              '<span><div class="gh-mergebox__ttl">1 approving review</div>' +
              '<div class="gh-mergebox__sub">course-tutor approved these changes 12 minutes ago</div></span>' +
            '</div>' +
            '<div class="gh-mergebox__row">' +
              '<span class="gh-mergebox__icon gh-mergebox__icon--ok"><svg class="octicon"><use href="#oct-git-merge"/></svg></span>' +
              '<span><div class="gh-mergebox__ttl">This branch has no conflicts with the base branch</div>' +
              '<div class="gh-mergebox__sub">Merging can be performed automatically.</div></span>' +
              '<span class="gh-mergebox__actions"><span class="gh-menuwrap">' +
                '<span class="gh-split">' +
                  '<span class="gh-btn gh-btn--primary" data-h="merge-btn">Merge pull request</span>' +
                  '<span class="gh-btn gh-btn--primary" data-h="merge-menu-btn"><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
                '</span>' +
                '<div class="gh-menu gh-menu--right gh-menu--wide" id="merge-menu" style="top:auto;bottom:calc(100% + 6px)">' +
                  '<div class="gh-menu__hd">How should these 2 commits land on main?</div>' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-git-merge"/></svg><span>Create a merge commit<small>All 2 commits plus a merge commit are added to main</small></span></div>' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-git-commit"/></svg><span>Squash and merge<small>The 2 commits are combined into one commit on main</small></span></div>' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-git-branch"/></svg><span>Rebase and merge<small>The 2 commits are replayed onto main individually</small></span></div>' +
                '</div>' +
              '</span></span>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<div class="gh-side">' +
          '<div class="gh-sidecard" data-h="side-reviewers">' +
            '<div class="gh-sidecard__hd"><h2>Reviewers</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<div class="gh-contribrow"><span class="gh-avatar gh-avatar--20" data-user="course-tutor"></span>' +
              '<span class="gh-link">course-tutor</span>' +
              '<svg class="octicon" style="margin-left:auto;color:var(--gh-success-fg)"><use href="#oct-check"/></svg></div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-assignees">' +
            '<div class="gh-sidecard__hd"><h2>Assignees</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<div class="gh-contribrow"><span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
              '<span class="gh-link">jordan-lee</span></div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-labels">' +
            '<div class="gh-sidecard__hd"><h2>Labels</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<div class="gh-labels" style="margin-left:0">' +
              '<span class="gh-label" style="background:rgba(0,117,202,.18);color:#54aeff;border-color:rgba(84,174,255,.35)">documentation</span>' +
            '</div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-milestone">' +
            '<div class="gh-sidecard__hd"><h2>Milestone</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<span class="gh-metarow"><svg class="octicon"><use href="#oct-milestone"/></svg>Week 6 submission</span>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-development">' +
            '<div class="gh-sidecard__hd"><h2>Development</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<span class="gh-metarow"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Closes&nbsp;<span class="gh-link">#3</span></span>' +
          '</div>' +
        '</div>' +

      '</div></div>'
    },

    /* ---------------- FILES CHANGED TAB ---------------- */
    files:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1/files', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-issuehead">' +
        '<h1>Fix README formatting and clean up template placeholders <span class="gh-issuenum">#1</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span class="gh-state gh-state--open"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Open</span>' +
          '<span><b class="gh-b" style="color:var(--gh-fg-default)">jordan-lee</b> wants to merge ' +
            '<b class="gh-b" style="color:var(--gh-fg-default)">2 commits</b> into ' +
            '<span class="gh-comparebar__pill">main</span> from ' +
            '<span class="gh-comparebar__pill">fix-readme-formatting</span></span>' +
        '</div>' +
      '</div>' +

      '<nav class="gh-tabnav">' +
        '<span class="gh-tab" data-h="tab-conversation"><svg class="octicon"><use href="#oct-comment"/></svg>Conversation<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-commits"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-checks"><svg class="octicon"><use href="#oct-check-circle"/></svg>Checks</span>' +
        '<span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-file"/></svg>Files changed<span class="gh-counter gh-counter--flat">1</span></span>' +
      '</nav>' +

      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">' +
          '<span class="gh-muted" data-h="diffstats">Showing <b style="color:var(--gh-fg-default)">1 changed file</b> with ' +
            '<b style="color:var(--gh-success-fg)">4 additions</b> and ' +
            '<b style="color:var(--gh-danger-fg)">3 deletions</b>.</span>' +
          '<span class="gh-difftoggle" data-inert><button type="button" class="is-on">Unified</button><button type="button">Split</button></span>' +
          '<span class="gh-menuwrap" style="margin-left:auto">' +
            '<span class="gh-btn gh-btn--primary" data-h="review-btn">Review changes' +
              '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
            '<div class="gh-menu gh-menu--right gh-menu--wide" id="review-menu">' +
              '<div class="gh-menu__hd">Finish your review</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-comment"/></svg><span>Comment<small>Submit general feedback without explicit approval</small></span></div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-check"/></svg><span>Approve<small>Submit feedback and approve merging these changes</small></span></div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-x"/></svg><span>Request changes<small>Submit feedback that must be addressed before merging</small></span></div>' +
            '</div>' +
          '</span>' +
        '</div>' +

        '<div class="gh-diff" data-h="diffbox">' +
          '<div class="gh-diff__head">' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg>' +
            '<span class="gh-mono">README.md</span>' +
            '<span class="gh-diff__stat"><span class="add">+4</span>&nbsp;<span class="del">&minus;3</span></span>' +
            '<span class="gh-diff__tools">' +
              '<span class="gh-btn gh-btn--sm" data-h="viewed"><span id="viewed-mark" style="display:inline-block;width:12px;height:12px;border:1px solid var(--gh-border-default);border-radius:3px;background:var(--gh-canvas-default);vertical-align:-2px"></span>&nbsp;Viewed</span>' +
              '<span class="gh-btn gh-btn--sm gh-btn--icon" data-inert><svg class="octicon octicon--sm"><use href="#oct-kebab-horizontal"/></svg></span>' +
            '</span>' +
          '</div>' +
          '<table class="gh-difftable"><tbody>' +
            '<tr class="gh-diffrow--hunk" data-h="hunk"><td colspan="4">@@ -1,11 +1,12 @@</td></tr>' +
            '<tr><td class="gh-diff__ln">1</td><td class="gh-diff__ln">1</td><td class="gh-diff__sign"></td><td class="gh-diff__code"># Jordan Lee -- desk profile</td></tr>' +
            '<tr><td class="gh-diff__ln">2</td><td class="gh-diff__ln">2</td><td class="gh-diff__sign"></td><td class="gh-diff__code"></td></tr>' +
            '<tr><td class="gh-diff__ln">3</td><td class="gh-diff__ln">3</td><td class="gh-diff__sign"></td><td class="gh-diff__code">**Degree:** Economics (Finance), year 3</td></tr>' +
            '<tr class="gh-diffrow--add" data-h="blank-line-add"><td class="gh-diff__ln"></td><td class="gh-diff__ln">4</td><td class="gh-diff__sign">+</td><td class="gh-diff__code"></td></tr>' +
            '<tr class="gh-diffrow--del" data-h="del-alias"><td class="gh-diff__ln">4</td><td class="gh-diff__ln"></td><td class="gh-diff__sign">-</td><td class="gh-diff__code">*Trading alias:* <span class="gh-diffword-del">e.g. </span>IronCondor</td></tr>' +
            '<tr class="gh-diffrow--add" data-h="add-alias">' +
              '<td class="gh-diff__ln" style="position:relative">' +
                '<button type="button" data-h="line-comment" aria-label="Comment on this line" style="position:absolute;left:8px;top:1px;width:18px;height:18px;border-radius:4px;background:var(--gh-accent-emphasis);color:#fff;border:0;padding:0;font:700 13px/18px var(--font-mono);cursor:pointer">+</button>' +
              '</td>' +
              '<td class="gh-diff__ln">5</td><td class="gh-diff__sign">+</td><td class="gh-diff__code">*Trading alias:* IronCondor</td></tr>' +
            '<tr><td colspan="4" style="padding:0 !important" id="line-comment-slot"></td></tr>' +
            '<tr><td class="gh-diff__ln">5</td><td class="gh-diff__ln">6</td><td class="gh-diff__sign"></td><td class="gh-diff__code"></td></tr>' +
            '<tr><td class="gh-diff__ln">6</td><td class="gh-diff__ln">7</td><td class="gh-diff__sign"></td><td class="gh-diff__code">## Markets I want to trade this semester</td></tr>' +
            '<tr><td class="gh-diff__ln">7</td><td class="gh-diff__ln">8</td><td class="gh-diff__sign"></td><td class="gh-diff__code">- Index futures, FX majors</td></tr>' +
            '<tr class="gh-diffrow--del"><td class="gh-diff__ln">8</td><td class="gh-diff__ln"></td><td class="gh-diff__sign">-</td><td class="gh-diff__code">- <span class="gh-diffword-del">all of the above 2</span></td></tr>' +
            '<tr class="gh-diffrow--add"><td class="gh-diff__ln"></td><td class="gh-diff__ln">9</td><td class="gh-diff__sign">+</td><td class="gh-diff__code">- <span class="gh-diffword-add">FX majors (gold and crude oil)</span></td></tr>' +
            '<tr><td class="gh-diff__ln">9</td><td class="gh-diff__ln">10</td><td class="gh-diff__sign"></td><td class="gh-diff__code"></td></tr>' +
            '<tr><td class="gh-diff__ln">10</td><td class="gh-diff__ln">11</td><td class="gh-diff__sign"></td><td class="gh-diff__code">## One market story that hooked me</td></tr>' +
            '<tr class="gh-diffrow--del"><td class="gh-diff__ln">11</td><td class="gh-diff__ln"></td><td class="gh-diff__sign">-</td><td class="gh-diff__code"><span class="gh-diffword-del">&lt;</span>The 2010 flash crash, Living through story and seeing how companies were affected in real time, and how it <span class="gh-diffword-del">correletaed</span> to their stock prices falling.<span class="gh-diffword-del">&gt;</span></td></tr>' +
            '<tr class="gh-diffrow--add"><td class="gh-diff__ln"></td><td class="gh-diff__ln">12</td><td class="gh-diff__sign">+</td><td class="gh-diff__code">The 2010 flash crash. Living through story and seeing how companies were affected in real time, and how it <span class="gh-diffword-add">correlated</span> to their stock prices falling.</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    },

    /* ---------------- COMMITS TAB ---------------- */
    commits:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1/commits', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-issuehead">' +
        '<h1>Fix README formatting and clean up template placeholders <span class="gh-issuenum">#1</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span class="gh-state gh-state--open"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Open</span>' +
          '<span>2 commits on <span class="gh-comparebar__pill">fix-readme-formatting</span></span></div>' +
      '</div>' +
      '<nav class="gh-tabnav">' +
        '<span class="gh-tab" data-h="tab-conversation"><svg class="octicon"><use href="#oct-comment"/></svg>Conversation<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-checks"><svg class="octicon"><use href="#oct-check-circle"/></svg>Checks</span>' +
        '<span class="gh-tab" data-h="tab-files"><svg class="octicon"><use href="#oct-file"/></svg>Files changed<span class="gh-counter gh-counter--flat">1</span></span>' +
      '</nav>' +
      '<div class="gh-page">' +
        '<div class="gh-commitgroup"><div class="gh-commitgroup__date"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits on Aug 7, 2026</div>' +
        '<div class="gh-commitlist">' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Separate degree and trading alias onto their own lines</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 45 minutes ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">8c14b60</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Replace template placeholders and fix correletaed typo</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 42 minutes ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">d5a3e91</span></span></span></div>' +
        '</div></div>' +
        '<div class="gh-flash" style="margin-top:16px"><svg class="octicon"><use href="#oct-info"/></svg>' +
          '<span>These two commits already exist on the branch. The pull request does not copy them — it points at them. ' +
          'Add a third commit to <b>fix-readme-formatting</b> and this list grows on its own.</span></div>' +
      '</div>'
    },

    /* ---------------- CHECKS TAB ---------------- */
    checks:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1/checks', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-issuehead">' +
        '<h1>Fix README formatting and clean up template placeholders <span class="gh-issuenum">#1</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span class="gh-state gh-state--open"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Open</span>' +
          '<span>No checks configured for this repository</span></div>' +
      '</div>' +
      '<nav class="gh-tabnav">' +
        '<span class="gh-tab" data-h="tab-conversation"><svg class="octicon"><use href="#oct-comment"/></svg>Conversation<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab" data-h="tab-commits"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits<span class="gh-counter gh-counter--flat">2</span></span>' +
        '<span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-check-circle"/></svg>Checks</span>' +
        '<span class="gh-tab" data-h="tab-files"><svg class="octicon"><use href="#oct-file"/></svg>Files changed<span class="gh-counter gh-counter--flat">1</span></span>' +
      '</nav>' +
      '<div class="gh-page"><div class="gh-blankslate gh-blankslate--dashed">' +
        '<svg class="octicon"><use href="#oct-check-circle"/></svg>' +
        '<h3>No checks to show</h3>' +
        '<p>Checks are automated jobs that run against a pull request — tests, linters, builds. ' +
        'This repository has none configured, which is correct for two Markdown files.</p>' +
        '<span class="gh-btn" data-h="tab-conversation"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to Conversation</span>' +
      '</div></div>'
    }

   },

   /* ==================== INTERACTIONS ==================== */
   actions:[

    {on:'[data-h="merge-menu-btn"]', toggle:{target:'#merge-menu', class:'is-open'}},

    /* the satisfying moment — two actions, because the first passes the click on */
    {on:'[data-h="merge-btn"]', once:true, stop:false,
      replace:{target:'#pr-state', html:
        '<span class="gh-state gh-state--merged" data-h="state-pill">' +
        '<svg class="octicon"><use href="#oct-git-merge"/></svg>Merged</span>'}},

    {on:'[data-h="merge-btn"]', once:true,
      append:{target:'#pr-timeline', html:
        '<div class="gh-tlevent"><span class="gh-tlbadge gh-tlbadge--merged"><svg class="octicon"><use href="#oct-git-merge"/></svg></span>' +
        '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
        '<b>jordan-lee</b> merged commit <span class="gh-mono">e7a3d20</span> into <b>main</b> from ' +
        '<b>fix-readme-formatting</b> just now</div>' +
        '<div class="gh-tlevent"><span class="gh-tlbadge gh-tlbadge--closed"><svg class="octicon"><use href="#oct-x"/></svg></span>' +
        '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
        '<b>jordan-lee</b> closed this just now</div>'},
      replace:{target:'#merge-box', html:
        '<div class="gh-mergebox__row">' +
          '<span class="gh-mergebox__icon" style="background:#8957e5"><svg class="octicon"><use href="#oct-git-merge"/></svg></span>' +
          '<span><div class="gh-mergebox__ttl">Pull request successfully merged and closed</div>' +
          '<div class="gh-mergebox__sub">The <b>fix-readme-formatting</b> branch has served its purpose and can be safely deleted.</div></span>' +
          '<span class="gh-mergebox__actions"><span class="gh-btn" data-h="delete-branch">Delete branch</span></span>' +
        '</div>'},
      explain:{title:'What just moved where',
        html:'<p>Three separate things happened in that one click, and it is worth naming them apart.</p>' +
             '<p><strong>1. The two commits are now on <code>main</code>.</strong> Not copies — the same commits, ' +
             '<code>8c14b60</code> and <code>d5a3e91</code>. GitHub also wrote a brand-new commit, ' +
             '<code>e7a3d20</code>, whose only job is to record “these two histories joined here”. That is what a ' +
             '<em>merge commit</em> is, and it is why the default strategy is called “Create a merge commit”. ' +
             'Your repo’s history is now longer, and the README on the front page has the fixes in it.</p>' +
             '<p><strong>2. The state pill went green to purple.</strong> Purple means merged, and it is a ' +
             'different colour from red-closed on purpose: a merged PR was accepted, a closed PR was rejected or ' +
             'abandoned. Two very different stories, one glance apart.</p>' +
             '<p><strong>3. The PR did not go anywhere.</strong> This page still exists, at the same URL, forever. ' +
             'The description, the review comment, the approval, the diff, the timestamp of the merge — all still ' +
             'here. In three months when you look at the README and wonder why the alias line has a blank line ' +
             'above it, this page is the answer, and it took no extra effort to write.</p>' +
             '<p>Now try <strong>Delete branch</strong>.</p>'}},

    {on:'[data-h="delete-branch"]', once:true,
      replace:{target:'#merge-box', html:
        '<div class="gh-mergebox__row">' +
          '<span class="gh-mergebox__icon" style="background:#8957e5"><svg class="octicon"><use href="#oct-git-merge"/></svg></span>' +
          '<span><div class="gh-mergebox__ttl">Pull request successfully merged and closed</div>' +
          '<div class="gh-mergebox__sub">You deleted the <b>fix-readme-formatting</b> branch.</div></span>' +
          '<span class="gh-mergebox__actions"><span class="gh-btn" data-inert>Restore branch</span></span>' +
        '</div>'},
      explain:{title:'Deleting the branch deletes nothing you care about',
        html:'<p>The word “delete” is alarming and it should not be. A branch is a label pointing at a commit. ' +
             'The commits it pointed at are now on <code>main</code>, so the label has no job left.</p>' +
             '<p>Notice GitHub immediately offers <strong>Restore branch</strong>. It can, because nothing was ' +
             'destroyed — recreating the label is trivial. Your repo goes from “1 Branch” back to a clean ' +
             '<code>main</code>, which is exactly the state you want between pieces of work.</p>' +
             '<p>The habit worth forming: merge, then delete. A repo with nine stale merged branches makes the ' +
             'branch list useless, because you can no longer tell which branches are live work.</p>'}},

    {on:'[data-h="tab-files"]', view:'files', explain:{title:'The review surface',
      html:'<p>This is where a review actually happens. Not the description, which is your account of the change — ' +
           'the lines themselves.</p>' +
           '<p>Read it in three columns. Far left is the line number in the <strong>old</strong> file, next to it ' +
           'is the line number in the <strong>new</strong> file, then the <code>+</code> or <code>-</code> sign. ' +
           'A red <code>-</code> row is a line as it was; a green <code>+</code> row is a line as it will be. ' +
           'A line that only moved appears as both.</p>' +
           '<p>The header <code>@@ -1,11 +1,12 @@</code> is not decoration either — it says “from here on, the ' +
           'old file had 11 lines starting at line 1, the new one has 12 starting at line 1.” On a long file ' +
           'GitHub shows only the changed neighbourhoods, and each one gets its own <code>@@</code> header.</p>' +
           '<p>Hover the blue <strong>+</strong> in the gutter and click it — that is the whole point of this tab.</p>'}},
    {on:'[data-h="tab-commits"]', view:'commits'},
    {on:'[data-h="tab-checks"]', view:'checks'},
    {on:'[data-h="tab-conversation"]', view:'conversation'},

    {on:'[data-h="review-btn"]', toggle:{target:'#review-menu', class:'is-open'}},

    {on:'[data-h="viewed"]', once:true,
      replace:{target:'#viewed-mark', html:'<svg class="octicon" style="width:10px;height:10px;color:var(--gh-success-fg)"><use href="#oct-check"/></svg>'},
      toast:'Marked README.md as viewed. On a 30-file PR this is how you keep your place.'},

    {on:'[data-h="line-comment"]', once:true,
      replace:{target:'#line-comment-slot', html:
        '<div style="padding:12px 16px;background:var(--gh-canvas-subtle);border-top:1px solid var(--gh-border-default);border-bottom:1px solid var(--gh-border-default);font-family:var(--font-sans);font-size:14px;line-height:1.5;white-space:normal">' +
          '<div class="gh-comment" style="max-width:640px">' +
            '<div class="gh-comment__hd"><span class="gh-avatar gh-avatar--24" data-user="course-tutor"></span>' +
              '<b>course-tutor</b> commented on line 5</div>' +
            '<div class="gh-comment__bd"><div class="gh-markdown">' +
              '<p>This is the fix. Worth knowing <em>why</em> it works: in Markdown a single newline is not a ' +
              'line break, so lines 3 and 4 rendered as one sentence. The blank line you added on line 4 starts ' +
              'a new paragraph, which is what forces the break.</p>' +
              '<p>Two trailing spaces at the end of line 3 would also work, but they are invisible in an editor ' +
              'and everyone deletes them by accident. Blank line is the safe habit.</p>' +
            '</div></div>' +
          '</div>' +
        '</div>'},
      explain:{title:'A comment pinned to one line',
        html:'<p>That comment is attached to <strong>line 5 of README.md in this pull request</strong>. Not to the ' +
             'PR in general — to that line. It will keep pointing at that line even after ten more commits, and ' +
             'when the line changes GitHub marks the comment “outdated” rather than losing it.</p>' +
             '<p>This is the difference between a review and an opinion. “The README needs work” is unactionable. ' +
             'A note on line 5 is a specific thing one specific person can fix in one specific place.</p>' +
             '<p>Two more things live on this affordance. Drag across several line numbers before clicking the ' +
             '<strong>+</strong> and the comment covers the whole range. And inside the comment box there is a ' +
             '<em>Suggest a change</em> button — it wraps your text in a <code>suggestion</code> block that ' +
             'renders as a proposed diff, and the author can apply it with a single click. That is the fastest ' +
             'possible loop from “this is wrong” to “this is fixed”.</p>'}},

    {on:'[data-h="side-labels"]', toast:'Labels work identically on pull requests and issues — Module 7 has the full story.'},
    {on:'[data-h="side-development"]', toast:'“Closes #3” in the description created this link. Merging this PR will close issue #3 automatically.'}
   ],

   /* ==================== HOTSPOTS ==================== */
   hotspots:[

    {sel:'[data-h="pr-title"] .gh-issuenum', place:'right', title:'The title and the #1',
     what:'<p>A one-line description of the proposed change, plus a number GitHub assigns and never reuses. This is PR <code>#1</code> because it is the first thing ever numbered in this repo.</p>',
     why:'<p>Issues and pull requests share a single numbering sequence per repo, so <code>#7</code> is unambiguous — there is no “issue 7 and also PR 7”. That is what makes typing <code>#7</code> anywhere on GitHub into a working link.</p>',
     how:'<p>The title defaults to your branch name or your single commit message. Overwrite it. Write what the change does, not what you did: <em>“Fix README formatting and clean up template placeholders”</em>, not <em>“readme fixes”</em>.</p>',
     fail:'<p>A PR titled <em>“Update”</em> forces every reviewer to open the diff before they know whether it concerns them. On a repo with fifteen open PRs that is fifteen wasted clicks a day, which is why people stop reviewing.</p>',
     when:'<p>Every PR you ever open. Also on your own repo — six weeks from now the list of merged PR titles is a readable summary of everything you did, for free.</p>'},

    {sel:'[data-h="state-pill"]', place:'bottom', title:'The state pill — Open, Merged or Closed',
     what:'<p>The single most important pixel on the page: whether this proposal is still live. Green <strong>Open</strong> means undecided. Purple <strong>Merged</strong> means accepted and in <code>main</code>. Red <strong>Closed</strong> means shut without merging.</p>',
     why:'<p>“Closed” alone would be ambiguous — did it land, or was it thrown away? Those are opposite outcomes, so GitHub gave the good one its own colour. Purple on GitHub always means “merged”, everywhere it appears.</p>',
     how:'<p>You do not set it directly. It changes as a consequence: pressing <strong>Merge pull request</strong> makes it purple; pressing <strong>Close pull request</strong> under the comment box makes it red.</p>',
     fail:'<p>Closing a PR instead of merging it is a real and common misclick, because the two buttons sit near each other. Nothing is lost — the branch and its commits survive — but your change is not in <code>main</code> and the page now says it was rejected.</p>',
     when:'<p>When you scan a repo’s PR list before a deadline. Purple rows are done, green rows are outstanding work, red rows are decisions somebody already made.</p>',
     note:'<p>Press the green <strong>Merge pull request</strong> button lower down this page and watch this pill change. Everything on the screen updates the way it would on the real site.</p>'},

    {sel:'[data-h="branchbar"]', place:'right', title:'base ← compare: “into main from fix-readme-formatting”',
     what:'<p>The two branches this PR is about. <strong>Into main</strong> is the <em>base</em> — the destination. <strong>From fix-readme-formatting</strong> is the <em>compare</em> branch — where your work currently is. Direction matters and it is stated in plain English here.</p>',
     why:'<p>A PR is meaningless without both ends. The entire diff below is computed by asking “what would change in the base if the compare branch were folded in?” Change either branch and the diff changes completely.</p>',
     how:'<p>You pick these on the compare page before the PR exists: GitHub pre-fills <code>main</code> as base and your branch as compare, which is right 95% of the time. Both are dropdowns until the PR is created.</p>',
     fail:'<p>Getting them backwards is the classic beginner error, and it produces a PR that proposes overwriting your new work with the old <code>main</code>. The tell is the diff looking inverted — your improvements shown in red as deletions.</p>',
     when:'<p>Whenever you contribute to somebody else’s project. There the base is <em>their</em> <code>main</code> and the compare is a branch on <em>your</em> fork, and reading this line is how you check you are aiming at the right repo.</p>'},

    {sel:'[data-h="pr-tabs"]', place:'bottom', title:'The four tabs — and why they are not the same as the repo tabs',
     what:'<p>Four views of this one pull request. <strong>Conversation</strong> is discussion and events. <strong>Commits</strong> lists the commits on the branch. <strong>Checks</strong> shows automated jobs. <strong>Files changed</strong> is the diff.</p>',
     why:'<p>A PR carries too much to fit on one screen, and different people want different parts of it. Your tutor wants Files changed. You want Conversation. A build robot writes to Checks. Splitting them keeps each one readable.</p>',
     how:'<p>Click any of them — all four work here. The numbers are live counts: 2 comments, 2 commits, 0 checks, 1 changed file. Reviewers almost always go straight to <strong>Files changed</strong>.</p>',
     fail:'<p>People confuse this row with the repo tab row above it. The repo row moves you between rooms in the project; this row moves you between views of one proposal. Clicking <em>Code</em> up there loses your place in the PR.</p>',
     when:'<p>Reviewing anything: skim Conversation for context, then live in Files changed. The counter on Files changed also tells you the size of the job before you commit to it.</p>'},

    {sel:'[data-h="pr-body"] .gh-comment__hd', place:'left', title:'The description — the first comment, written by you',
     what:'<p>The opening post. It is an ordinary comment that happens to sit at the top, written in Markdown, editable forever by its author.</p>',
     why:'<p>The diff shows <em>what</em> changed; nothing in Git records <em>why</em>. This box is the only place the reasoning can live, and it is the single highest-value thing you will write on GitHub.</p>',
     how:'<p>Answer three questions in three short paragraphs or a bullet list: what problem this fixes, what you actually did, and anything a reviewer should look at closely. Note the last line — <code>Closes #3</code>. That one phrase links this PR to issue 3 and closes that issue automatically the moment this merges. The bare <code>#2</code> beside it only links; it closes nothing.</p>',
     fail:'<p>Leaving the box empty. GitHub then fills the PR with your branch name and nothing else, and a reviewer has to reverse-engineer your intent from the diff — which is exactly the work you were supposed to save them.</p>',
     when:'<p>On a group assignment where somebody has to mark your contribution. A PR description is a written, timestamped, un-editable-in-secret record of what you did and why.</p>'},

    {sel:'[data-h="tl-commits"]', place:'right', title:'“added 2 commits” — the live link to the branch',
     what:'<p>An automatic timeline entry. Nobody typed it: GitHub writes an event every time the branch behind this PR gains commits.</p>',
     why:'<p>This is the mechanism behind “a PR is a live diff”. The PR does not contain a copy of your work; it points at a branch. Push to the branch and the PR grows to match, with a dated record of when.</p>',
     how:'<p>Do nothing. Make another commit on <code>fix-readme-formatting</code> — on the website or from your laptop — and a new event appears here within seconds, the Files changed diff updates, and anyone who already approved is notified there is new work.</p>',
     fail:'<p>People close a PR and open a fresh one to “add another change”, losing the whole conversation. You almost never need to. Push to the same branch and the existing PR absorbs it.</p>',
     when:'<p>Right after a reviewer asks for something. You fix it, commit to the same branch, and their thread is still there with the new commit attached underneath.</p>'},

    {sel:'[data-h="review-comment"] .gh-comment__hd', place:'left', title:'A reviewer’s comment',
     what:'<p>A comment from somebody who is not you — here a collaborator on the repo, marked <strong>Collaborator</strong> by the small grey badge.</p>',
     why:'<p>Those author badges exist because on a public project you cannot assume you know who anyone is. <em>Owner</em>, <em>Collaborator</em>, <em>Contributor</em> and <em>First-time contributor</em> tell you how much weight a comment carries before you read it.</p>',
     how:'<p>Reply in the box at the bottom of the timeline. Use <code>@course-tutor</code> to notify a specific person — a comment without an @-mention only reaches people already watching the thread.</p>',
     fail:'<p>Replying to review feedback by email or in a chat app. The PR then records a question with no answer, and in two months the page tells a misleading story about what was decided.</p>',
     when:'<p>Any group project. Also the first time you contribute to an open-source project and a stranger asks you to change something — this is the entire conversation surface you get.</p>'},

    {sel:'[data-h="tl-approved"]', place:'right', title:'“approved these changes”',
     what:'<p>The event recording a formal review verdict. A review is not just a comment: it is one of three explicit states — <strong>Comment</strong>, <strong>Approve</strong> or <strong>Request changes</strong> — with a timestamp and an author.</p>',
     why:'<p>“Looks fine to me” buried in a thread cannot be checked by a machine. Making approval a structured state lets GitHub enforce rules like “this branch cannot be merged until one person approves”.</p>',
     how:'<p>A reviewer opens <strong>Files changed</strong>, writes line notes, then presses <strong>Review changes</strong> and picks a verdict. <em>Approve</em> means merge it. <em>Request changes</em> blocks the merge until they revisit. <em>Comment</em> is thoughts with no verdict.</p>',
     fail:'<p><em>Request changes</em> and then going quiet for a week blocks the PR entirely — only the same reviewer can clear it. It is a heavier action than it looks; most feedback should be <em>Comment</em>.</p>',
     when:'<p>Whenever you review a group-mate’s work. Approve when you would be comfortable with it going live, not when you have merely finished reading.</p>'},

    {sel:'[data-h="commentbox"]', place:'left', title:'The comment box (and the Close button next to it)',
     what:'<p>Where you add to the conversation. Markdown, a Write/Preview toggle, and two buttons: green <strong>Comment</strong>, and a plain <strong>Close pull request</strong>.</p>',
     why:'<p>Comments live at the bottom because a PR is read top to bottom as a chronological record. New contributions belong at the end of the story, not the start.</p>',
     how:'<p>Markdown works here exactly as in your README: <code>**bold**</code>, backticks for <code>code</code>, <code>-</code> for bullets. <code>#2</code> becomes a link to issue 2, <code>@someone</code> notifies a person, and three backticks fence a code block.</p>',
     fail:'<p><strong>Close pull request</strong> sits right beside <strong>Comment</strong>. Hitting it does not delete anything, but it marks the proposal rejected and notifies everyone watching. Reopening is one click; the confusing email you sent is not recallable.</p>',
     when:'<p>To record a decision you would otherwise make in your head — “not doing the folder rename in this PR, opening a separate one” is worth thirty seconds of typing.</p>'},

    {sel:'[data-h="merge-checks"]', place:'left', title:'The merge box, top row: the gate',
     what:'<p>A checklist of everything that must be true before merging is allowed. Here: one approving review, and no conflicts with <code>main</code>.</p>',
     why:'<p>Merging is the one irreversible-feeling action on the page, so GitHub puts every condition in front of you first. Green tick means go. A red or amber icon here means the green button below is disabled or carries a warning.</p>',
     how:'<p>Nothing to click. Read it. On a repo with branch protection turned on, this box is where you find out <em>why</em> you cannot merge: “Review required”, “Checks failing”, “Merging is blocked”.</p>',
     fail:'<p>A repo owner can require an approval on <code>main</code> and then be unable to merge their own work, because GitHub does not count your approval of yourself. It looks like a bug and is a rule you switched on.</p>',
     when:'<p>Any repo with rules — meaning every workplace repo you will ever touch. Reading this box first saves you hunting for a disabled button’s cause.</p>'},

    {sel:'[data-h="merge-btn"]', place:'top', title:'The green “Merge pull request” button',
     what:'<p>The button that performs the merge. Everything above this point was proposal; this is the moment the change becomes part of <code>main</code>.</p>',
     why:'<p>Separating “propose” from “merge” is the entire value of a PR. The gap between opening one and pressing this is where review, discussion and second thoughts fit. Without the gap you are just editing <code>main</code> with extra steps.</p>',
     how:'<p>Press it (it works here). GitHub asks you to confirm the merge commit message, then the page transforms: the pill goes purple, the timeline gains a merge event, and this box becomes the “successfully merged” state with a <strong>Delete branch</strong> button.</p>',
     fail:'<p>Merging your own PR the second you open it, with no review, is the most common way a PR becomes pure ceremony. Even alone, read your own Files changed tab once before pressing this — you will catch a stray debug line surprisingly often.</p>',
     when:'<p>The end of every piece of work. Merge, delete the branch, start the next branch from a clean <code>main</code>.</p>'},

    {sel:'[data-h="merge-menu-btn"]', place:'top', title:'The dropdown: three ways to merge',
     what:'<p>Three different shapes the same change can take once it lands on <code>main</code>. The button remembers whichever you used last, which is why it sometimes says “Squash and merge” instead.</p>',
     why:'<p>Your branch might contain six commits called “wip”, “wip2”, “actually fix it”. Some projects want that detail preserved; most want the finished change as one clean entry. GitHub refused to choose for you, so there are three buttons.</p>',
     how:'<p>Click the arrow (it opens). <strong>Create a merge commit</strong> keeps all your commits plus one extra recording the join. <strong>Squash and merge</strong> flattens the branch into a single commit on <code>main</code>. <strong>Rebase and merge</strong> replays your commits onto <code>main</code> individually with no merge commit.</p>',
     fail:'<p>Rebase and merge rewrites your commits — they get new SHAs. If anyone else had that branch on their machine, their copy no longer matches and they get an ugly conflict. It is the one of the three that can hurt somebody else.</p>',
     when:'<p>Almost always pick <strong>Squash and merge</strong>. One commit on <code>main</code> per finished change makes your history a list of accomplishments instead of a list of keystrokes, and reverting a whole feature becomes one click.</p>',
     note:'<p><strong>The short version:</strong> merge commit = full detail, messy history. Squash = one tidy commit, branch detail discarded (but the PR page keeps it forever, which is why nothing is really lost). Rebase = linear history, no record that a branch existed, and the only option that rewrites history.</p>'},

    {sel:'[data-h="side-reviewers"] .gh-sidecard__hd', place:'right', title:'Reviewers',
     what:'<p>The people you are formally asking to look at this. The green tick beside a name means they have approved; an amber dot means changes requested; nothing means still waiting.</p>',
     why:'<p>“Can someone look at this?” posted in a group chat reaches nobody in particular. Adding a reviewer creates an obligation with a name on it and puts the PR into that person’s review queue.</p>',
     how:'<p>Click the gear, pick people. They get a notification and the PR appears under <em>Pull requests → Review requests</em> on their dashboard. You can only request review from people who have access to the repo.</p>',
     fail:'<p>Requesting review from five people means nobody reviews it — everyone assumes one of the other four will. Ask one person, or two at most.</p>',
     when:'<p>A group assignment where you split the work: each of you reviews the other’s PR before it lands, and the marker can see that happened.</p>'},

    {sel:'[data-h="side-assignees"] .gh-sidecard__hd', place:'right', title:'Assignees',
     what:'<p>Who owns getting this over the line. Usually the author, but not always — if a PR is handed over, the assignee changes and the author does not.</p>',
     why:'<p>Reviewer and assignee answer different questions. Reviewer: “who should look at it?” Assignee: “whose job is it to finish it?” On a stalled PR the second question is the one people actually need answered.</p>',
     how:'<p>Gear → choose a person, or click <em>assign yourself</em>. Then <code>assignee:@me</code> in the PR search box filters to only your work — the same query syntax Module 7 uses for issues.</p>',
     fail:'<p>Leaving it blank on a team PR is how something sits untouched for three weeks. Nobody was ignoring it; nobody had been told it was theirs.</p>',
     when:'<p>The moment more than one person can push to a repo. Below that it is noise — on a solo repo, skip it.</p>'},

    {sel:'[data-h="side-labels"] .gh-sidecard__hd', place:'right', title:'Labels on a pull request',
     what:'<p>Coloured tags. The same label system as issues, applied to PRs — this one is tagged <code>documentation</code>.</p>',
     why:'<p>Titles are prose and cannot be filtered reliably. Labels are a fixed vocabulary, which is what makes <code>label:documentation</code> a search that actually returns everything it should.</p>',
     how:'<p>Gear → tick labels. GitHub gives every repo a starter set the day it is created. Module 7 covers building your own set and why colour matters at volume.</p>',
     fail:'<p>Twenty labels on a repo with four contributors means nobody remembers which to use, so they get applied inconsistently and filtering by them becomes worthless.</p>',
     when:'<p>Once a repo has more than roughly ten open items. Below that the list fits on one screen and labels are pure overhead.</p>'},

    {sel:'[data-h="side-development"] .gh-sidecard__hd', place:'right', title:'Development — the link to issue #3',
     what:'<p>The bridge between this pull request and the issue it resolves. It appeared because the description contains <code>Closes #3</code>.</p>',
     why:'<p>An issue says a thing should be fixed; a PR is the fix. Keeping them linked means that in six months you can start at either end — the complaint or the code — and reach the other in one click.</p>',
     how:'<p>Type <code>Closes #3</code>, <code>Fixes #3</code> or <code>Resolves #3</code> anywhere in the PR description. GitHub links them immediately and closes the issue automatically the instant this PR merges into the default branch.</p>',
     fail:'<p>Only works from the PR <em>description</em> or a commit message, and only when the PR targets the default branch. Writing <code>Closes #3</code> in a follow-up comment links nothing and closes nothing.</p>',
     when:'<p>Every time a PR answers an issue. It removes the “did I remember to close that?” chore entirely, which is Module 7’s favourite trick.</p>'},

    /* ---- FILES CHANGED VIEW ---- */
    {sel:'[data-h="diffstats"]', view:'files', place:'left', title:'“1 changed file with 4 additions and 3 deletions”',
     what:'<p>The size of the proposal in one line, before you read a word of it. Four lines added, three removed, across one file.</p>',
     why:'<p>Reviewers triage by size. A 20-line PR gets read properly; a 2,000-line PR gets skimmed and approved, which defeats the point. Putting the number at the top makes the cost visible immediately.</p>',
     how:'<p>Nothing to click. Note that Git has no concept of “changed a line” — every edit is a deletion plus an addition, which is why editing three lines shows as +3 −3.</p>',
     fail:'<p>Bundling six unrelated fixes into one PR. It is faster for you and much slower for everyone else, and if one of the six is wrong the whole thing gets blocked. One PR, one idea.</p>',
     when:'<p>Before you open a PR: if this number is going to be enormous, split the work across two branches now rather than apologising in the description later.</p>'},

    {sel:'[data-h="diffbox"] .gh-diff__head', view:'files', place:'left', title:'The file header and the “Viewed” tick',
     what:'<p>One header per changed file, with the filename, its own +/− counts, a triangle to collapse it, and a <strong>Viewed</strong> checkbox.</p>',
     why:'<p>On a large PR you review across several sittings. Ticking <em>Viewed</em> collapses that file and remembers it, so when you come back tomorrow you see only what you have not read.</p>',
     how:'<p>Click <strong>Viewed</strong> (it works). If the author pushes a new commit that touches a file you had ticked, GitHub silently un-ticks it and shows you only what changed since — which is the feature that makes reviewing round two bearable.</p>',
     fail:'<p>The state is per person and per PR, not shared. Ticking everything as viewed is not the same as approving, and a reviewer who does that has recorded nothing anyone else can see.</p>',
     when:'<p>Any PR touching more than about five files. Below that it is faster to scroll.</p>'},

    {sel:'[data-h="hunk"]', view:'files', place:'right', title:'The @@ hunk header',
     what:'<p>A marker saying which region of the file the rows below belong to. <code>@@ -1,11 +1,12 @@</code> means: old file, 11 lines from line 1; new file, 12 lines from line 1.</p>',
     why:'<p>A diff of a 900-line file would be unreadable if it showed all 900 lines. Git shows only the changed neighbourhoods with a few lines of context, and each neighbourhood needs a label saying where it sits.</p>',
     how:'<p>On a bigger file you get several of these, and clicking the expand arrows beside one pulls in more surrounding context. The minus side is the old file, the plus side is the new one — the same convention as the rows below.</p>',
     fail:'<p>Reading the numbers as “lines 1 to 11 changed”. They describe the window shown, not the edits. The actual edits are only the coloured rows.</p>',
     when:'<p>When a reviewer says “line 340 looks wrong” and you need to find line 340 in a diff that only shows fragments. The hunk headers are how you navigate.</p>'},

    {sel:'[data-h="del-alias"]', view:'files', place:'left', title:'A red line: what is being removed',
     what:'<p>The line as it exists on <code>main</code> right now, with a <code>-</code> in the sign column. The darker red highlight inside it marks the exact characters that differ — here, <code>e.g. </code>.</p>',
     why:'<p>Colouring whole lines is not precise enough. When you change three characters in a long sentence, word-level highlighting is the difference between spotting it and scrolling past it.</p>',
     how:'<p>Read left to right: old line number 4, no new line number (it will not exist after this change), a red minus, then the content. The absence of a number in the second column is what tells you this line is going away.</p>',
     fail:'<p>Assuming red means “broken” or “error”. Red just means “before”. A PR that deletes something harmful is a red-heavy diff and a very good change.</p>',
     when:'<p>Reviewing anything. Red rows are where accidents hide — a line someone deleted without meaning to shows up here and nowhere else.</p>'},

    {sel:'[data-h="add-alias"]', view:'files', place:'left', title:'A green line — and the blue “+” that starts a review',
     what:'<p>The replacement line, marked <code>+</code>, with the new line number 5. The blue <strong>+</strong> button in the left gutter is the line-comment affordance — on the real site it only appears when you hover that row.</p>',
     why:'<p>Feedback attached to a whole PR is vague. GitHub made every single line a place a conversation can be anchored, which turns “this bit is wrong” into an unambiguous location.</p>',
     how:'<p>Click the blue <strong>+</strong> (it works here). A comment box opens under the line. Type, then choose <em>Start a review</em> to batch your notes and send them all at once, rather than firing off six separate notifications.</p>',
     fail:'<p>Using <em>Add single comment</em> for every note. Twelve comments become twelve emails to the author in four minutes, which is unpleasant enough that people stop reading review notifications.</p>',
     when:'<p>Reviewing a group-mate’s work — and honestly, on your own PRs too. Leaving yourself a note on a line you are unsure about is how you remember to come back to it.</p>'},

    {sel:'[data-h="review-btn"]', view:'files', place:'left', title:'“Review changes” — Comment, Approve, Request changes',
     what:'<p>The button that submits everything you wrote as one review, with a verdict attached. Three verdicts, and they mean genuinely different things.</p>',
     why:'<p>Batching exists so the author gets one notification containing your complete thoughts. Verdicts exist so GitHub can enforce “needs an approval before merging” without reading English.</p>',
     how:'<p>Click it (it opens). <strong>Comment</strong>: thoughts, no verdict, does not block. <strong>Approve</strong>: you are happy for this to be merged. <strong>Request changes</strong>: this must not merge until you say otherwise — and only you can clear it.</p>',
     fail:'<p>Writing five line comments and never pressing this button. They sit as <em>pending</em>, visible only to you, and the author sees nothing at all. It is the single most common review mistake and it is completely silent.</p>',
     when:'<p>The end of every review you do. On your own repo you cannot approve your own PR — GitHub blocks it — which is exactly why a required approval on a solo repo is a trap.</p>'}
   ]
  },

  /* ======================================================================
     3. AFTER THE MAIN SCREEN
     ====================================================================== */
  {type:'callout', variant:'tip', title:'The permanence is the point — and the best argument for using PRs alone',
   html:
    '<p>The merged pull request you just created does not go away. It keeps its URL, its description, its ' +
    'review comment, its diff and its timestamps, forever, whether or not the branch still exists.</p>' +
    '<p>That matters more than it sounds. Git records <em>what</em> changed with perfect fidelity and records ' +
    '<em>why</em> not at all. A commit message is one line. A PR is the only place on GitHub where the reasoning ' +
    'behind a change — the objection someone raised, the thing you tried first, the reason you chose the blank ' +
    'line over two trailing spaces — is stored next to the change itself.</p>' +
    '<p>Think of it as the difference between a trade blotter and a trade rationale. The blotter says you bought ' +
    'at 11:04. It cannot tell you what you were thinking. Six months later only one of those two is worth having, ' +
    'and it is not the timestamp.</p>' +
    '<p>Cost of getting this: opening a PR on your own repo instead of committing straight to <code>main</code>. ' +
    'About twenty extra seconds.</p>'
  },

  {type:'prose', title:'Draft pull requests — opening one before it is ready',
   html:
    '<p>There is a moment in every piece of work where you want eyes on it but it is visibly unfinished. Without a ' +
    'signal for that, people either open a PR and get reviewed too early, or sit on the branch in silence until ' +
    'the end, which is when feedback is most expensive.</p>' +
    '<p>A <strong>draft pull request</strong> is the signal. When you create a PR, the green button has a dropdown ' +
    'arrow — choose <em>Create draft pull request</em>. The PR opens with a grey state pill instead of green, the ' +
    'merge button is disabled, and GitHub will not send review requests. Everything else works normally: the diff ' +
    'is live, people can comment, you can keep pushing commits.</p>' +
    '<p>When it is ready, press <strong>Ready for review</strong>. The pill turns green, the merge button wakes up, ' +
    'and reviewers are notified. Nothing is lost in the transition.</p>' +
    '<p>What breaks without it: you open a normal PR at 20% done, your reviewer spends an hour on it, and half ' +
    'their comments are about code you were already going to delete. Both of you wasted the hour.</p>'
  },

  /* ======================================================================
     4. CONFLICTS IN A PR — second screen
     ====================================================================== */
  {type:'prose', title:'When a pull request says it has conflicts',
   html:
    '<p>Module 5 introduced merge conflicts: two branches changed the same line, Git has no basis for preferring ' +
    'one, so it stops and asks. Here is what that looks like on a PR page, because the wording GitHub uses sounds ' +
    'far more alarming than the situation is.</p>' +
    '<p>The scenario: you branched off, and while you were working, <code>main</code> changed. Somebody — possibly ' +
    'you, on the website, forgetting you had a branch open — edited the same line of the README. Now both versions ' +
    'have a claim on line 5.</p>' +
    '<p>Nothing is broken and nothing is lost. Both versions exist, intact, in the history. Git is asking you a ' +
    'question it genuinely cannot answer.</p>'
  },

  {type:'screen',
   id:'pr-conflict',
   label:'The same PR, in the conflict state — and GitHub’s web conflict editor',
   url:'github.com/jordan-lee/trading-journal-practice/pull/1',
   initial:'conflict',
   inertNote:'Inert in this lesson. The live controls here are “Resolve conflicts” and “Mark as resolved”.',
   views:{

    conflict:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-issuehead">' +
        '<h1>Fix README formatting and clean up template placeholders <span class="gh-issuenum">#1</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span class="gh-state gh-state--open"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Open</span>' +
          '<span><b class="gh-b" style="color:var(--gh-fg-default)">jordan-lee</b> wants to merge ' +
            '<b class="gh-b" style="color:var(--gh-fg-default)">2 commits</b> into ' +
            '<span class="gh-comparebar__pill">main</span> from ' +
            '<span class="gh-comparebar__pill">fix-readme-formatting</span></span>' +
        '</div>' +
      '</div>' +
      '<div class="gh-page">' +
        '<div class="gh-mergebox" id="conflict-box">' +
          '<div class="gh-mergebox__row" data-h="conflict-row">' +
            '<span class="gh-mergebox__icon gh-mergebox__icon--bad"><svg class="octicon"><use href="#oct-alert"/></svg></span>' +
            '<span><div class="gh-mergebox__ttl">This branch has conflicts that must be resolved</div>' +
            '<div class="gh-mergebox__sub">Use the web editor or the command line to resolve conflicts before continuing.<br>' +
            '<span class="gh-mono" style="color:var(--gh-fg-default)">README.md</span></div></span>' +
            '<span class="gh-mergebox__actions"><span class="gh-btn" data-h="resolve-btn">Resolve conflicts</span></span>' +
          '</div>' +
          '<div class="gh-mergebox__row">' +
            '<span class="gh-mergebox__icon" style="background:var(--gh-neutral-emphasis)"><svg class="octicon"><use href="#oct-git-merge"/></svg></span>' +
            '<span><div class="gh-mergebox__ttl" style="color:var(--gh-fg-muted)">Merging is blocked</div>' +
            '<div class="gh-mergebox__sub">Merging can be performed automatically once the conflicting files are resolved.</div></span>' +
            '<span class="gh-mergebox__actions"><span class="gh-btn" data-h="blocked-merge" style="opacity:.5">Merge pull request</span></span>' +
          '</div>' +
        '</div>' +
      '</div>'
    },

    resolver:{ url:'github.com/jordan-lee/trading-journal-practice/pull/1/conflicts', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<h2 style="font-size:20px;font-weight:400;margin:0">Resolve conflicts</h2>' +
          '<span class="gh-muted">between <b style="color:var(--gh-fg-default)">fix-readme-formatting</b> and ' +
          '<b style="color:var(--gh-fg-default)">main</b></span>' +
          '<span class="gh-btn gh-btn--primary" style="margin-left:auto" data-h="mark-resolved">Mark as resolved</span>' +
        '</div>' +
        '<div class="gh-blob" data-h="conflict-editor">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">README.md</span>' +
            '<span class="gh-muted">|</span><span class="gh-muted">1 conflict</span></div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr><td class="gh-blob__ln">3</td><td class="gh-blob__code">**Degree:** Economics (Finance), year 3</td></tr>' +
            '<tr><td class="gh-blob__ln">4</td><td class="gh-blob__code"></td></tr>' +
            '<tr data-h="marker-head"><td class="gh-blob__ln">5</td><td class="gh-blob__code" style="background:rgba(56,139,253,.15);color:#79c0ff">&lt;&lt;&lt;&lt;&lt;&lt;&lt; fix-readme-formatting</td></tr>' +
            '<tr><td class="gh-blob__ln">6</td><td class="gh-blob__code" style="background:rgba(63,185,80,.12)">*Trading alias:* IronCondor</td></tr>' +
            '<tr data-h="marker-mid"><td class="gh-blob__ln">7</td><td class="gh-blob__code" style="background:rgba(56,139,253,.15);color:#79c0ff">=======</td></tr>' +
            '<tr><td class="gh-blob__ln">8</td><td class="gh-blob__code" style="background:rgba(248,81,73,.12)">*Trading alias:* CondorJordan</td></tr>' +
            '<tr data-h="marker-end"><td class="gh-blob__ln">9</td><td class="gh-blob__code" style="background:rgba(56,139,253,.15);color:#79c0ff">&gt;&gt;&gt;&gt;&gt;&gt;&gt; main</td></tr>' +
            '<tr><td class="gh-blob__ln">10</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">11</td><td class="gh-blob__code">## Markets I want to trade this semester</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
    {on:'[data-h="resolve-btn"]', view:'resolver', explain:{title:'Read the markers, then delete them',
      html:'<p>GitHub has pasted <em>both</em> versions into the file, wrapped in three marker lines. This is Git’s ' +
           'standard conflict format and it looks identical in every editor on earth, so learning it once is enough.</p>' +
           '<p><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; fix-readme-formatting</code> — everything below this is <strong>your ' +
           'branch’s</strong> version.<br>' +
           '<code>=======</code> — the divider.<br>' +
           '<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; main</code> — everything above this and below the divider is what is ' +
           'already on <strong>main</strong>.</p>' +
           '<p>Resolving means editing this box until it contains exactly the text you want — which may be one side, ' +
           'the other, or a blend of both — and <strong>deleting all three marker lines</strong>. Then ' +
           '<strong>Mark as resolved</strong>, then <strong>Commit merge</strong>.</p>' +
           '<p>You are not choosing a winner. You are writing the final answer.</p>'}},
    {on:'[data-h="mark-resolved"]', once:true,
      toast:'Marked README.md as resolved. On the real site the next button is “Commit merge”, which puts your answer on the branch as one more commit.',
      explain:{title:'The conflict is now just another commit',
        html:'<p>Resolving a conflict does not do anything exotic. Your edited version becomes one more commit on ' +
             '<code>fix-readme-formatting</code>, the PR page updates, the red box turns green, and ' +
             '<strong>Merge pull request</strong> comes back to life.</p>' +
             '<p>The two original versions are both still in the history, untouched. That is worth saying plainly: ' +
             'a conflict has never lost anyone’s work. It is a request for a decision, and the decision is recorded ' +
             'like every other change.</p>' +
             '<p>How to have fewer of them: keep branches short-lived. A branch merged the same day it was made ' +
             'almost never conflicts. A branch left open for three weeks nearly always does.</p>'}},
    {on:'[data-h="blocked-merge"]', toast:'Disabled while conflicts exist — that is GitHub refusing to guess. Press “Resolve conflicts” instead.'}
   ],

   hotspots:[
    {sel:'[data-h="conflict-row"]', place:'left', title:'“This branch has conflicts that must be resolved”',
     what:'<p>The state a PR enters when the base branch has moved on in a way that overlaps your change. Both versions of the overlapping lines are intact; Git just will not pick between them.</p>',
     why:'<p>The alternative would be silently choosing one — which means silently deleting somebody’s work. Git treats that as unacceptable, so it stops and hands the decision to a person.</p>',
     how:'<p>Click <strong>Resolve conflicts</strong> (it works) for the built-in web editor. It only appears for text conflicts small enough to fix in a browser; anything larger sends you to your laptop.</p>',
     fail:'<p>Panicking and closing the PR, or deleting the branch and starting again. Both throw away work that is perfectly fine. Nothing here is damaged — the box is a question, not an error.</p>',
     when:'<p>Any group assignment where two of you touch the same file in the same week. Also on your own repo, if you edit a file on the website while a branch of yours is open on the same lines.</p>'},

    {sel:'[data-h="blocked-merge"]', place:'top', title:'The merge button, greyed out',
     what:'<p>The same green button as before, disabled. GitHub will not let you merge a PR it cannot merge cleanly.</p>',
     why:'<p>Disabling it rather than hiding it keeps the page shape stable, so you learn where the button lives and you can see exactly which condition above is stopping you.</p>',
     how:'<p>Nothing to do here. Fix the row above and this re-enables by itself, usually within a second of the resolving commit landing.</p>',
     fail:'<p>Hunting for a “force merge” option. There isn’t one, and that is deliberate — a forced merge would mean GitHub inventing a resolution nobody approved.</p>',
     when:'<p>Any time the merge button is grey: read upward. The reason is always in the box directly above it — conflicts, a missing review, or a failing check.</p>'},

    {sel:'[data-h="marker-head"]', view:'resolver', place:'right', title:'&lt;&lt;&lt;&lt;&lt;&lt;&lt; your branch',
     what:'<p>The opening marker. Everything between this line and the <code>=======</code> divider is the version from <strong>fix-readme-formatting</strong> — your work.</p>',
     why:'<p>Git needs to show two incompatible versions of the same lines in one file. Marker lines are the format it invented to do that, and they are deliberately ugly so you cannot leave them in by accident.</p>',
     how:'<p>Read the branch name printed after the arrows — that is how you tell which half is yours. Keep it, delete it, or merge it with the other half by hand.</p>',
     fail:'<p>Committing with the markers still in the file. The arrows and equals signs become literal text in your README, and it renders on your repo front page looking exactly as broken as it is.</p>',
     when:'<p>The first time you hit a conflict in any tool — VS Code, the terminal, GitHub’s editor. The format never changes.</p>'},

    {sel:'[data-h="marker-mid"]', view:'resolver', place:'right', title:'======= the divider',
     what:'<p>The line separating the two competing versions. Above it: your branch. Below it: the base branch.</p>',
     why:'<p>Without an explicit divider you could not tell where one version stopped and the other started, especially when both are several lines long.</p>',
     how:'<p>Delete it along with the other two markers once you have written your final text. GitHub will not let you press <em>Mark as resolved</em> while any marker line survives.</p>',
     fail:'<p>Deleting the divider but leaving one of the arrow lines. The file still contains nonsense and the resolve button stays disabled with an error you have to hunt for.</p>',
     when:'<p>Every conflict. Three markers go in, three markers come out.</p>'},

    {sel:'[data-h="marker-end"]', view:'resolver', place:'right', title:'&gt;&gt;&gt;&gt;&gt;&gt;&gt; main',
     what:'<p>The closing marker, naming the other branch. Everything between the divider and this line is the version already sitting on <code>main</code>.</p>',
     why:'<p>You need to know what you would be overwriting. Somebody chose <code>CondorJordan</code> for a reason, even if that somebody was you last Tuesday.</p>',
     how:'<p>Decide, edit, delete all three markers, <strong>Mark as resolved</strong>, then <strong>Commit merge</strong>. The result becomes a normal commit on your branch.</p>',
     fail:'<p>Reflexively keeping your own side every time. Sometimes <code>main</code> is right and your branch is stale, and blindly winning the conflict quietly reverts someone else’s fix.</p>',
     when:'<p>Whenever the two versions are both meaningful — which is most of the time, because a conflict only happens when two people cared about the same line.</p>'}
   ]
  },

  /* ======================================================================
     5. PRs ON OTHER PEOPLE'S REPOS
     ====================================================================== */
  {type:'prose', title:'Contributing to somebody else’s project: fork → branch → pull request',
   html:
    '<p>Everything above assumed you can write to the repo. On a stranger’s project you cannot — you have no ' +
    'permission, and there is no “ask for permission” button. This is where most people conclude that ' +
    'open-source contribution is for other people. It is a four-step flow and you already understand three of ' +
    'the steps.</p>' +
    '<p>The one new idea is the <strong>fork</strong>: your own full copy of their repo, sitting under your ' +
    'account, that remembers where it came from. You have complete control over your copy. Because GitHub ' +
    'remembers the link, it can compute a diff between your copy and theirs — and that diff is a pull request ' +
    'they can accept.</p>'
  },

  {type:'steps', title:'The whole flow, click by click',
   items:[
     {label:'Fork their repo', html:
       '<p>On their repo page, press <strong>Fork</strong> (top right, next to Star), then <em>Create fork</em>. ' +
       'You land on <code>jordan-lee/their-repo</code> — a complete copy, yours, with a small line under ' +
       'the title reading “forked from …”. This costs them nothing and notifies nobody.</p>'},
     {label:'Make a branch on your fork', html:
       '<p>Same as Module 5, on your copy. Name it after the change: <code>fix-typo-in-readme</code>. ' +
       'Do not work directly on your fork’s <code>main</code> — you will want that clean so you can sync it ' +
       'with theirs later.</p>'},
     {label:'Make the change and commit it', html:
       '<p>Edit files on the website or on your laptop, exactly as you would on your own repo. Commit to the ' +
       'branch. Nothing has touched their project yet, and nothing can.</p>'},
     {label:'Open the pull request — against THEIR repo', html:
       '<p>GitHub shows a yellow banner on your fork: <em>“This branch is 1 commit ahead of them:main”</em>, with ' +
       'a <strong>Contribute</strong> button. Press it, then <em>Open pull request</em>. Read the branch bar ' +
       'carefully: the base should be <strong>their</strong> repo and <code>main</code>; the compare should be ' +
       '<strong>your</strong> fork and your branch. Getting these backwards is the classic mistake.</p>'},
     {label:'Write a description a stranger can act on', html:
       '<p>They have no idea who you are. Say what is wrong, what you changed, and how you checked it. If the ' +
       'repo has a <code>CONTRIBUTING.md</code>, read it first — it will tell you their rules, and ignoring them ' +
       'is the fastest way to get a PR closed unread.</p>'},
     {label:'Wait, and respond', html:
       '<p>Maintainers are volunteers. A week of silence is normal; a month is common. If they request changes, ' +
       'push more commits to the same branch on your fork — the PR updates itself. Do not open a second one.</p>'}
   ]
  },

  {type:'callout', variant:'info', title:'Why this is worth doing once, even if you never do it again',
   html:
    '<p>A merged pull request on someone else’s public repo appears on your GitHub profile permanently, with your ' +
    'name on it, in a project other people use. It is the only line on a graduate CV that a reader can verify in ' +
    'ten seconds without taking your word for anything.</p>' +
    '<p>It does not have to be code. Fixing a broken link in a documentation page, correcting a typo in a README, ' +
    'or adding a missing example are all real contributions, all merged constantly, and all within reach of ' +
    'someone who has read this far. Search GitHub for the label <code>good first issue</code> — Module 7 explains ' +
    'that label and Module 8 explains the search.</p>'
  },

  /* ======================================================================
     6. THE HONEST ANSWER
     ====================================================================== */
  {type:'compare', title:'Do you, personally, right now, need pull requests?',
   left:{title:'No — for the repo you have today',
     html:'<p><code>trading-journal-practice</code> has two files, one contributor and no reviewers. A PR on it is a ' +
          'conversation with yourself, and the merge button is a formality. Committing straight to <code>main</code> ' +
          'is not a mistake at this size, and your repo currently showing <strong>0 pull requests</strong> is not ' +
          'a defect.</p>' +
          '<p>Anyone who tells you a solo two-file repo <em>requires</em> a PR per change is describing a workplace ' +
          'rule, not a law of nature.</p>'},
   right:{title:'Yes — for three reasons that arrive sooner than you think',
     html:'<p><strong>1. Every team runs on them.</strong> At any internship, any workplace, any group assignment ' +
          'with a competent group, the rule is: nobody pushes to <code>main</code>. Turning up already fluent in ' +
          'the PR page is worth more than most things on your CV.</p>' +
          '<p><strong>2. It is the cheapest way to build a visible record of your reasoning.</strong> Twenty ' +
          'seconds per change buys you a permanent, dated, public-if-you-want-it explanation of why your work ' +
          'looks the way it does.</p>' +
          '<p><strong>3. It makes your work reviewable by someone else.</strong> Open a PR instead of committing ' +
          'to <code>main</code>, send your tutor the PR link, and they can comment on line 5 rather than emailing ' +
          'you a paragraph about the README in general.</p>'}
  },

  {type:'callout', variant:'moment', title:'Two PRs worth opening on your actual repo this week',
   html:
    '<p><strong>PR one: the README.</strong> Branch off <code>main</code>, replace <code>e.g. IronCondor</code> ' +
    'with a real alias, replace <code>all of the above 2</code> with real markets, delete the angle brackets ' +
    'around the flash-crash answer, fix <code>correletaed</code>, and add the blank line that separates the degree from ' +
    'the trading alias. That is exactly the PR you merged on the screen above.</p>' +
    '<p><strong>PR two: the file name.</strong> Rename <code>journal\\week6.md</code> to ' +
    '<code>journal/week6.md</code> on its own branch. It is a one-character change with a genuinely surprising ' +
    'diff — GitHub records it as one file deleted and one file added, because to Git a rename <em>is</em> a delete ' +
    'plus an add. Seeing that in a Files changed tab explains more about how Git thinks than a page of prose.</p>' +
    '<p>Keep them separate. Two ideas, two branches, two pull requests — which is the habit this whole module is ' +
    'really teaching.</p>'
  },

  {type:'terms', title:'The words you now need',
   items:[
     {term:'Pull request (PR)', html:'A proposed merge of one branch into another, with a live diff and a discussion attached. Nothing is pushed or pulled by you — you are asking.'},
     {term:'Base / compare', html:'The two branches a PR joins. <strong>Base</strong> is the destination (usually <code>main</code>); <strong>compare</strong> is where your work is.'},
     {term:'Review', html:'A submitted verdict on a PR: <em>Comment</em>, <em>Approve</em> or <em>Request changes</em>. Line notes you have not submitted are <em>pending</em> and invisible to everyone else.'},
     {term:'Merge commit', html:'The extra commit Git writes to record that two histories joined. Only the “Create a merge commit” strategy produces one.'},
     {term:'Squash and merge', html:'Flattens every commit on the branch into a single commit on <code>main</code>. The usual best choice, and the one to default to.'},
     {term:'Rebase and merge', html:'Replays your commits onto <code>main</code> one by one with no merge commit. Gives the tidiest history and is the only option that rewrites your commits.'},
     {term:'Draft PR', html:'A PR marked not-ready. Grey pill, merge disabled, no review requests sent. Press <em>Ready for review</em> when it is.'},
     {term:'Fork', html:'Your own copy of somebody else’s repo, under your account, that remembers its origin — which is what lets you send changes back as a PR.'},
     {term:'Conflict', html:'Two branches changed the same lines, so Git stops and asks. Marked in the file with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Never destroys work.'},
     {term:'Closes #n', html:'A phrase in a PR description or commit message that links the PR to issue <em>n</em> and closes that issue automatically on merge.'}
   ]
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Explain what a pull request is without using the words “push” or “pull”, and say why the name misleads people',
     'Name the three things a PR is at once — a proposed merge, a live diff, and a comment thread',
     'Read a PR page cold: the state pill’s colour, the base ← compare bar, the four tabs, the timeline and the merge box',
     'Leave a review on a specific line, and choose correctly between Comment, Approve and Request changes',
     'Pick a merge strategy on purpose — and know why <strong>Squash and merge</strong> is usually the right default',
     'Recognise the conflict state, read the three marker lines, and resolve one without panicking',
     'Open a draft PR when the work is unfinished, and a real one on somebody else’s repo via fork → branch → PR',
     'Give an honest answer to “do I need this for a two-file repo?” — and still open one, because it costs twenty seconds'
   ]
  }

  ]
});
