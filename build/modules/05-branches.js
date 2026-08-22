/* ============================================================================
   MODULE 05 — "Branches: working without breaking anything"
   Owns: the problem branches solve, what a branch is, main/master, the branch
   selector, switching, the branches page, ahead/behind, naming, merging in
   concept, merge conflicts, and when a solo student actually needs one.
   Hands off to module 6 for pull requests.
   New continuity facts invented here: branch name `fix-readme-formatting`,
   created Aug 7 2026; branch commits d5a3e91 and 8c14b60; a "one week later"
   framing on the branches-list screen (main gains commit 2f77ab4).
   ========================================================================== */

MODULES.push({
  id: 'branches',
  num: 5,
  title: 'Branches: working without breaking anything',
  blurb: 'Your repo says “1 Branch” and you have never made a second one. Here is what the word means, what it protects you from, and the honest answer to whether you need one for a two-file assignment.',
  goals: [
    'Explain what a branch is well enough that it still makes sense when somebody asks a follow-up question',
    'Create a branch from the repo page, switch between branches, and know exactly what changes on screen when you do',
    'Read the branches page — default, ahead/behind, stale — and say what “2 ahead, 1 behind” means about two lines of work',
    'Say what a merge does, what causes a merge conflict, and why a conflict means nothing is broken'
  ],
  sections: [

  /* ============================ THE PROBLEM ============================ */
  {type:'prose', html:
    '<p class="tut-lead">Your README is being marked on Friday. It works — the headings render, the bullets are ' +
    'bullets, the marker can read it. And you want to rewrite the whole thing, because half of it is still ' +
    'template text and the degree line runs together.</p>' +
    '<p>So you are stuck between two bad options. Edit it now and the version being marked is whatever state you ' +
    'happened to leave it in when you got bored. Leave it alone until Saturday and you lose the three days you ' +
    'actually had time to work.</p>' +
    '<p>That tension is the entire reason branches exist. Not “version control best practice” — this specific ' +
    'feeling of wanting to change something while a working version has to stay standing.</p>' +
    '<p>By the end of this module you will also understand pull requests before Module 6 explains them, because a ' +
    'pull request is just a formal way of asking for one branch to be folded into another.</p>'
  },

  {type:'prose', title:'What a branch actually is',
   html:
    '<p>Here is the analogy worth keeping: <strong>a branch is a photocopy of the whole project that you can ' +
    'scribble on. Nothing you do to the photocopy touches the original until you deliberately staple it back ' +
    'in.</strong></p>' +
    '<p>Test it with the obvious follow-up questions, because a good analogy has to survive them:</p>' +
    '<ul>' +
      '<li><em>“Does making one copy my files?”</em> — In effect yes, and instantly, because Git does not actually ' +
      'duplicate anything. It writes down one new name pointing at the commit you are currently on. Two names, one ' +
      'pile of history, no copying. That is why making a branch is instant even on a repo with 40,000 files.</li>' +
      '<li><em>“Can I break main from the branch?”</em> — No. Commits you make on the branch attach themselves to ' +
      'the branch, and <code>main</code> keeps pointing exactly where it did.</li>' +
      '<li><em>“What if somebody changes main while I am working?”</em> — They can, and the two lines drift apart. ' +
      'GitHub tracks that drift and shows it as “ahead / behind”, which you will see later in this module.</li>' +
      '<li><em>“How does it get back in?”</em> — You merge it, deliberately, as a separate action. That is the ' +
      'stapling, and it never happens by accident.</li>' +
    '</ul>' +
    '<p>The mechanically accurate version, if you want it: <strong>a branch is a movable pointer to a ' +
    'commit</strong>. <code>main</code> is a label stuck on commit <code>109d091</code>. Make a new commit while ' +
    'you are on <code>main</code> and the label peels off and re-sticks to the new one. Make a second label called ' +
    '<code>fix-readme-formatting</code> and now two labels sit on the same commit — and from that moment they can ' +
    'move independently.</p>' +
    '<p>That is why the project can have several parallel lines of history at once. Every commit still points at ' +
    'its parent, exactly as Module 4 described. The branches are just labels marking the newest commit on each ' +
    'line, and any commit can have more than one child.</p>'
  },

  {type:'callout', variant:'tip', title:'Where the photocopy analogy stops being true',
   html:
    '<p>Two places, and both are worth knowing so the picture in your head does not mislead you later.</p>' +
    '<p><strong>A photocopy is frozen; a branch is not.</strong> If <code>main</code> moves on while you work, ' +
    'your branch does not automatically get those changes. It is a copy taken at a moment, and the original keeps ' +
    'going. That is exactly what “behind” means on the branches page.</p>' +
    '<p><strong>Stapling is not always trivial.</strong> If the original changed the same lines you scribbled on, ' +
    'somebody has to decide which version wins. That is a merge conflict, and it is covered at the bottom of this ' +
    'module — including why it is nowhere near as bad as it sounds.</p>'
  },

  {type:'prose', title:'main — the one branch you already have',
   html:
    '<p>Your repo says <strong>1 Branch</strong>, and that branch is called <code>main</code>. You did not create ' +
    'it. GitHub made it the moment you made the repo, because a repo with no branch has nowhere to put a commit.</p>' +
    '<p><code>main</code> is the <strong>default branch</strong>. That is a real setting, not a vibe. It is the ' +
    'branch GitHub shows when someone opens the repo, the one <code>/commits/main</code> reads from, the one your ' +
    'README is rendered from, and the branch a pull request will target unless you change it.</p>' +
    '<p>The convention everyone follows: <strong><code>main</code> should always be in a working state.</strong> ' +
    'On a code project that means it compiles and the tests pass. On yours it means the README renders correctly ' +
    'and the journal entry is complete enough to be marked. Anything half-finished belongs on a branch until it ' +
    'is not half-finished.</p>' +
    '<p>You will also see repos whose default branch is called <code>master</code>. It is the same thing — Git’s ' +
    'original default name. GitHub changed the default for new repositories to <code>main</code> in 2020, and ' +
    'existing repos kept whatever they had. Nothing about the mechanics differs; only the word does. If a ' +
    'tutorial tells you to look at <code>master</code> and your repo says <code>main</code>, they mean the same ' +
    'branch.</p>'
  },

  /* ==================== SCREEN 1: MAKING A BRANCH ==================== */
  {type:'prose', title:'Making one, on your repo',
   html:
    '<p>Below is your repo with the branch dropdown open. The box at the top of that dropdown does double duty: ' +
    'type in it to filter existing branches, and if what you typed matches nothing, GitHub offers to create a ' +
    'branch with that name instead. <code>fix-readme-formatting</code> has been typed for you.</p>' +
    '<p>Click <strong>Create branch: fix-readme-formatting from main</strong> and watch what changes — and, more ' +
    'importantly, what does not. Then use the dropdown on the next screen to switch back and forth.</p>'
  },

  {type:'screen',
   id:'branch-create',
   label:'github.com/jordan-lee/trading-journal-practice — creating a branch and switching between two',
   url:'github.com/jordan-lee/trading-journal-practice',
   initial:'root',
   inertNote:'That control is real on GitHub but inert in this lesson. The live parts here are the dropdown rows — the create-branch option and the two branch names.',

   views:{

    /* ---------------- ON MAIN, DROPDOWN OPEN, NAME TYPED ---------------- */
    root:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +

      '<div class="gh-page">' +
        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel" data-h="c-selector"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-refstats">' +
            '<span class="gh-refstat" data-h="c-count"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>1</b>&nbsp;Branch</span>' +
            '<span class="gh-refstat" data-inert><svg class="octicon"><use href="#oct-tag"/></svg><b>0</b>&nbsp;Tags</span>' +
          '</span>' +
        '</div>' +

        '<div style="position:relative;z-index:1;width:330px;max-width:100%;background:var(--gh-canvas-overlay);' +
             'border:1px solid var(--gh-border-default);border-radius:6px;box-shadow:0 8px 24px rgba(1,4,9,.75);' +
             'overflow:hidden;margin:0 0 16px" data-h="c-dropdown">' +
          '<div class="gh-menu__hd">Switch branches/tags</div>' +
          '<div style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">' +
            '<span class="gh-input gh-input--sm" style="display:block" data-h="c-input">fix-readme-formatting</span>' +
          '</div>' +
          '<div class="gh-menu__sec">Branches</div>' +
          '<div class="gh-menu__item" data-h="c-mainrow"><svg class="octicon"><use href="#oct-check"/></svg>' +
            '<span>main<small>default</small></span></div>' +
          '<div class="gh-menu__item" data-h="c-create"><svg class="octicon"><use href="#oct-git-branch"/></svg>' +
            '<span>Create branch: <b class="gh-mono">fix-readme-formatting</b><small>from ‘main’</small></span></div>' +
        '</div>' +

        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Update journal\\week6.md</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">109d091</span><span>·</span><span>29 minutes ago</span>' +
            '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>5</b>&nbsp;Commits</span></span>' +
          '</div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Fix formatting in README for degree and trading alias</span>' +
            '<span class="gh-filerow__time">2 hours ago</span></div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">journal\\week6.md</span>' +
            '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
            '<span class="gh-filerow__time">29 minutes ago</span></div>' +
        '</div>' +
      '</div>'
    },

    /* ---------------- ON THE NEW BRANCH ---------------- */
    onbranch:{ url:'github.com/jordan-lee/trading-journal-practice/tree/fix-readme-formatting', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +

      '<div class="gh-page">' +
        '<div class="gh-comparebar" data-h="o-comparebar">' +
          '<svg class="octicon"><use href="#oct-git-branch"/></svg>' +
          '<span class="gh-comparebar__pill" data-inert>fix-readme-formatting</span>' +
          '<span class="gh-comparebar__ok"><svg class="octicon"><use href="#oct-check"/></svg>This branch is up to date with main.</span>' +
          '<span style="margin-left:auto;display:flex;gap:8px"><span class="gh-btn" data-h="o-contribute">Contribute<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
        '</div>' +

        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel" data-h="o-selector"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>fix-readme-formatting</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-refstats">' +
            '<span class="gh-refstat" data-h="o-count"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>2</b>&nbsp;Branches</span>' +
            '<span class="gh-refstat" data-inert><svg class="octicon"><use href="#oct-tag"/></svg><b>0</b>&nbsp;Tags</span>' +
          '</span>' +
        '</div>' +

        '<div style="position:relative;z-index:1;width:330px;max-width:100%;background:var(--gh-canvas-overlay);' +
             'border:1px solid var(--gh-border-default);border-radius:6px;box-shadow:0 8px 24px rgba(1,4,9,.75);' +
             'overflow:hidden;margin:0 0 16px">' +
          '<div class="gh-menu__hd">Switch branches/tags</div>' +
          '<div class="gh-menu__sec">Branches</div>' +
          '<div class="gh-menu__item" data-h="o-tomain"><svg class="octicon"><use href="#oct-git-branch"/></svg>' +
            '<span>main<small>default</small></span></div>' +
          '<div class="gh-menu__item" data-h="o-here"><svg class="octicon"><use href="#oct-check"/></svg>' +
            '<span>fix-readme-formatting</span></div>' +
        '</div>' +

        '<div class="gh-filebox" data-h="o-filebox">' +
          '<div class="gh-filebox__head">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Update journal\\week6.md</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">109d091</span><span>·</span><span>29 minutes ago</span>' +
            '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>5</b>&nbsp;Commits</span></span>' +
          '</div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Fix formatting in README for degree and trading alias</span>' +
            '<span class="gh-filerow__time">2 hours ago</span></div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">journal\\week6.md</span>' +
            '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
            '<span class="gh-filerow__time">29 minutes ago</span></div>' +
        '</div>' +
      '</div>'
    },

    /* ---------------- BACK ON MAIN, TWO BRANCHES NOW ---------------- */
    backonmain:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +

      '<div class="gh-page">' +
        '<div class="gh-flash" data-h="m-prbanner">' +
          '<svg class="octicon"><use href="#oct-git-branch"/></svg>' +
          '<div style="flex:1"><b class="gh-mono">fix-readme-formatting</b> had recent pushes 1 minute ago</div>' +
          '<span class="gh-btn gh-btn--primary gh-btn--sm" data-h="m-prbtn">Compare &amp; pull request</span>' +
        '</div>' +

        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel" data-h="m-selector"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-refstats">' +
            '<span class="gh-refstat" data-h="m-count"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>2</b>&nbsp;Branches</span>' +
            '<span class="gh-refstat" data-inert><svg class="octicon"><use href="#oct-tag"/></svg><b>0</b>&nbsp;Tags</span>' +
          '</span>' +
        '</div>' +

        '<div style="position:relative;z-index:1;width:330px;max-width:100%;background:var(--gh-canvas-overlay);' +
             'border:1px solid var(--gh-border-default);border-radius:6px;box-shadow:0 8px 24px rgba(1,4,9,.75);' +
             'overflow:hidden;margin:0 0 16px">' +
          '<div class="gh-menu__hd">Switch branches/tags</div>' +
          '<div class="gh-menu__sec">Branches</div>' +
          '<div class="gh-menu__item" data-h="m-here"><svg class="octicon"><use href="#oct-check"/></svg>' +
            '<span>main<small>default</small></span></div>' +
          '<div class="gh-menu__item" data-h="m-toBranch"><svg class="octicon"><use href="#oct-git-branch"/></svg>' +
            '<span>fix-readme-formatting</span></div>' +
        '</div>' +

        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Update journal\\week6.md</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">109d091</span><span>·</span><span>29 minutes ago</span>' +
            '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>5</b>&nbsp;Commits</span></span>' +
          '</div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Fix formatting in README for degree and trading alias</span>' +
            '<span class="gh-filerow__time">2 hours ago</span></div>' +
          '<div class="gh-filerow" data-inert><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">journal\\week6.md</span>' +
            '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
            '<span class="gh-filerow__time">29 minutes ago</span></div>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="c-create"]', view:'onbranch', explain:{title:'A branch exists now. Here is exactly what happened — and what did not',
       html:'<p><strong>What happened.</strong> GitHub wrote down a new name, <code>fix-readme-formatting</code>, ' +
            'pointing at the same commit <code>main</code> points at — <code>109d091</code>. Then it switched you ' +
            'onto it. Three things on screen changed: the selector now reads <code>fix-readme-formatting</code>, ' +
            'the counter went from <strong>1 Branch</strong> to <strong>2 Branches</strong>, and the URL gained ' +
            '<code>/tree/fix-readme-formatting</code>.</p>' +
            '<p><strong>What did not happen.</strong> Nothing was copied. No file changed. <code>main</code> is ' +
            'untouched and still points at <code>109d091</code>. If you closed the tab right now and came back, the ' +
            'repo front page would look identical to before — because the front page shows the default branch, and ' +
            'that is still <code>main</code>.</p>' +
            '<p>The file list below is identical too, and it should be. You have not changed anything yet; you have ' +
            'only made somewhere safe to change things.</p>' +
            '<p>Now use the dropdown to hop back to <code>main</code> and see the switch from the other side.</p>'}},
     {on:'[data-h="c-mainrow"]', toast:'You are already on <span style="font-family:var(--font-mono)">main</span> — the tick on the left says so. Click the row below it to make the new branch.'},
     {on:'[data-h="c-input"]', toast:'On real GitHub this is a text box. Type a name that already exists and the list filters; type a new one and the “Create branch” row appears underneath.'},
     {on:'[data-h="c-selector"]', toast:'On real GitHub this opens and closes the dropdown. It is pinned open here so the numbered markers inside it stay reachable.'},

     {on:'[data-h="o-tomain"]', view:'backonmain', explain:{title:'You switched branches — the whole page changed',
       html:'<p>The URL dropped <code>/tree/fix-readme-formatting</code>. The selector says <code>main</code> again. ' +
            'And a blue banner appeared offering a <strong>Compare &amp; pull request</strong>, because GitHub has ' +
            'noticed a branch that is not <code>main</code> and is guessing what you will want next.</p>' +
            '<p>The thing to internalise: switching branches changes what the <em>entire</em> repo page shows. Not ' +
            'just the file list — the README underneath, the commit history, the commit count, the “Go to file” ' +
            'search results, all of it. You are looking at a different version of the project, not a different ' +
            'section of the same one. This surprises everybody the first time.</p>' +
            '<p>Nothing is lost by switching. The branch is still there — it is one row down in that dropdown, ' +
            'exactly where you left it.</p>'}},
     {on:'[data-h="o-here"]', toast:'The tick means you are already here. That is what the tick always means in this dropdown.'},
     {on:'[data-h="o-selector"]', toast:'On real GitHub this toggles the dropdown. It is pinned open here so you can read what is inside it.'},
     {on:'[data-h="o-contribute"]', toast:'“Contribute” is the shortcut to opening a pull request from this branch. Module 6 opens one properly.'},
     {on:'[data-h="m-toBranch"]', view:'onbranch', toast:'Back on <span style="font-family:var(--font-mono)">fix-readme-formatting</span> — and everything on the page changed again.'},
     {on:'[data-h="m-here"]', toast:'Already on main. The tick marks the branch you are currently viewing.'},
     {on:'[data-h="m-selector"]', toast:'Pinned open in this lesson. On real GitHub, click to open and click again to close.'},
     {on:'[data-h="m-prbtn"]', toast:'That is the front door to Module 6. A pull request is how a branch gets folded back into main with a discussion attached.'}
   ],

   hotspots:[
    {sel:'[data-h="c-selector"]', view:'root', place:'top', title:'The branch selector — where every branch operation starts',
     what:'<p>The button that tells you which version of the project is on screen, and the only place on the repo page where you can switch to another one or make a new one.</p>',
     why:'<p>A repo can hold many parallel versions at once and they all live at the same URL. Something has to say which one you are looking at, or you would edit the wrong one and have no way of noticing.</p>',
     how:'<p>Click it and a dropdown opens under it (pinned open here so the markers inside stay clickable). It lists branches and tags, with a filter box on top.</p>',
     fail:'<p>Not looking at it. You switch to a branch, wander off, come back the next day, edit a file and commit — onto the branch, not <code>main</code>. Then you cannot understand why the front page has not changed. That is the single most common branch mistake and this label is the thing that prevents it.</p>',
     when:'<p>Every time you are about to edit a file on a repo that has more than one branch. Read the label first, edit second.</p>'},

    {sel:'[data-h="c-input"]', view:'root', place:'right', title:'The box at the top of the dropdown does two jobs',
     what:'<p>A filter and a create field in the same input. Type and it narrows the branch list. Type something that matches no existing branch and GitHub offers to create it.</p>',
     why:'<p>Real projects have dozens of branches, so a filter is necessary. Making branch creation the natural consequence of "that name does not exist yet" means there is no separate form to find.</p>',
     how:'<p>Click into it and type a name — <code>fix-readme-formatting</code> has been typed for you here. Watch the list below react to what you type.</p>',
     fail:'<p>Typing a name and pressing Enter while it still matches an existing branch: you switch to that branch instead of creating one. Read the row you are about to click, not the box you just typed in.</p>',
     when:'<p>Any time you are about to start something you are not sure will work. Naming it is the first step and it takes five seconds.</p>'},

    {sel:'[data-h="c-mainrow"]', view:'root', place:'right', title:'main, with a tick and the word “default”',
     what:'<p>Your one existing branch. The tick means it is the one you are currently viewing; <em>default</em> means it is the branch GitHub shows to anyone who opens this repo without specifying one.</p>',
     why:'<p>Something has to be the official version. The default branch is that decision, made once in Settings and then applied everywhere — the front page, the README, the pull-request target.</p>',
     how:'<p>Clicking a branch row switches to it. Clicking the one you are already on does nothing, which is why this row just produces a message here.</p>',
     fail:'<p>Assuming <code>main</code> is protected because it is special. On your repo it is not — you can commit straight to it, which is exactly what you have been doing five times so far. “Default” describes what GitHub shows, not what GitHub defends.</p>',
     when:'<p>When a repo you have cloned from someone else has a default called <code>develop</code> or <code>master</code>, and you need to know which line of history is the real one.</p>'},

    {sel:'[data-h="c-create"]', view:'root', place:'right', title:'“Create branch: fix-readme-formatting from main”',
     what:'<p>The row that makes the branch. Note the second half: <strong>from ‘main’</strong>. The new branch starts life pointing at whatever commit <code>main</code> is on right now.</p>',
     why:'<p>A branch has to start somewhere, and “wherever I am standing” is almost always what you want. GitHub says which branch it is copying from so you cannot do it from the wrong place by accident.</p>',
     how:'<p>Click it (it works). GitHub creates the branch and immediately switches you onto it. There is no confirmation step, because there is nothing to confirm — a branch costs nothing and deletes cleanly.</p>',
     fail:'<p>Creating the branch while you are standing on a <em>different</em> branch, so it inherits work you did not want. The “from ‘main’” text is where you catch that, and it is the part everybody skims past.</p>',
     when:'<p>Right before you rewrite that README. Branch first, rewrite second, and the version being marked on Friday stays exactly as it is.</p>'},

    {sel:'[data-h="c-count"]', view:'root', place:'bottom', title:'“1 Branch” — the counter you are about to change',
     what:'<p>How many branches this repo currently has. One, right now, and it is <code>main</code>. Click the create row and watch this become <strong>2 Branches</strong>.</p>',
     why:'<p>Branches are invisible from the file list — nothing about the files tells you three other versions exist. The counter is the only signal on the front page that there is more going on.</p>',
     how:'<p>Click the counter to open the full branches page, which is the second screen in this module.</p>',
     fail:'<p>A repo showing “14 Branches” usually means fourteen half-finished ideas nobody merged. Branches are cheap to make and easy to abandon, and the counter is the only thing that keeps the mess visible.</p>',
     when:'<p>Landing on an unfamiliar repo. A high branch count with old dates tells you the project is being worked on by people who do not finish things.</p>'},

    {sel:'[data-h="o-selector"]', view:'onbranch', place:'top', title:'The selector now says fix-readme-formatting',
     what:'<p>Same control, different label. You are on the new branch, and every part of this page is now showing that branch’s view of the project.</p>',
     why:'<p>The label is the answer to “where am I?” and it is deliberately the widest, most prominent thing in the toolbar, because getting it wrong is the expensive mistake.</p>',
     how:'<p>Read it before every edit. If it does not say what you expect, click it and switch before you touch anything.</p>',
     fail:'<p>Editing a file here while believing you are on <code>main</code>. The commit lands on the branch, the front page does not change, and you spend twenty minutes convinced GitHub lost your work. It did not — it is one dropdown away.</p>',
     when:'<p>Every single edit, forever. It is a two-second glance and it is the difference between confident and confused.</p>'},

    {sel:'[data-h="o-count"]', view:'onbranch', place:'bottom', title:'“2 Branches” — the count moved',
     what:'<p>The counter that said 1 a moment ago. Two named lines of history now exist in this repo, both currently sitting on the same commit.</p>',
     why:'<p>This is the cheapest possible confirmation that the branch was actually created. A number changing is easier to trust than a message that flashes past.</p>',
     how:'<p>Click it for the full branches page: who made each branch, when it was last touched, and how far apart the two lines have drifted.</p>',
     fail:'<p>Expecting the number to go back down on its own. Branches persist until somebody deletes them, including after they have been merged and are no longer doing anything.</p>',
     when:'<p>After finishing a piece of work, as a check that you actually merged and tidied up rather than leaving a branch dangling.</p>'},

    {sel:'[data-h="o-comparebar"]', view:'onbranch', place:'bottom', title:'“This branch is up to date with main”',
     what:'<p>A status bar that appears when you are viewing a branch that is not the default. Right now the two branches are on the same commit, so there is nothing to report.</p>',
     why:'<p>The question you have on a branch is always “how far apart are we?”. GitHub answers it at the top of the page rather than making you go and compare.</p>',
     how:'<p>Once you commit something here it changes to “1 commit ahead of main”, with a link to see exactly which commit. If <code>main</code> moves too, it also starts saying how far behind you are.</p>',
     fail:'<p>Ignoring the “behind” half. A branch that is 30 commits behind <code>main</code> is being built on a version of the project that no longer exists, and merging it will be painful in proportion.</p>',
     when:'<p>Before you merge anything. This one line tells you whether the merge will be trivial or a negotiation.</p>'},

    {sel:'[data-h="o-filebox"]', view:'onbranch', place:'left', title:'Identical files — which is the whole point',
     what:'<p>The same two files, the same commit message, the same timestamps, the same commit count. Creating a branch changed nothing about the contents of the project.</p>',
     why:'<p>A branch starts as an exact match of what it branched from. If it started as anything else, “nothing you do to the photocopy touches the original” would be false in both directions.</p>',
     how:'<p>Edit a file from here and the commit attaches to this branch. The identical file list on <code>main</code> stays identical until you merge.</p>',
     fail:'<p>Believing nothing happened because nothing looks different. People create a branch, see the same page, assume the click failed, and create three more. Check the selector and the counter — those are what changed.</p>',
     when:'<p>Any moment where you want reassurance that branching is not a destructive operation. It cannot be: it has not touched a single byte of your files.</p>'},

    {sel:'[data-h="m-prbanner"]', view:'backonmain', place:'bottom', title:'“fix-readme-formatting had recent pushes”',
     what:'<p>A banner GitHub shows on the default branch when another branch has been touched recently, with a shortcut to open a pull request from it.</p>',
     why:'<p>Work sitting on an unmerged branch is invisible from the front page. The banner exists so branches do not quietly rot — it is a nudge that something is waiting to be dealt with.</p>',
     how:'<p>Click <strong>Compare &amp; pull request</strong> and GitHub pre-fills a pull request from that branch into <code>main</code>. Module 6 walks through the whole screen.</p>',
     fail:'<p>Clicking it out of curiosity and opening a pull request you did not mean to open. It is not destructive — a pull request is a proposal, and you can close it — but on a shared project it does notify people.</p>',
     when:'<p>The moment you have finished the work on your branch and want it in the official version.</p>'},

    {sel:'[data-h="m-here"]', view:'backonmain', place:'right', title:'The tick moved to main',
     what:'<p>Same dropdown, two branches in it now, and the tick has moved to <code>main</code> because that is where you are standing.</p>',
     why:'<p>The tick is the only element in the list that answers “which of these am I on?”. Everything else in a branch list looks the same.</p>',
     how:'<p>Click <code>fix-readme-formatting</code> below it to switch back, and notice the URL and the banner change again.</p>',
     fail:'<p>Reading the tick as “this is the default branch”. It means “this is the one you are viewing”. The word <em>default</em> in small grey text is what marks the default, and on a repo with a different default those two will not be on the same row.</p>',
     when:'<p>Every time the dropdown has more than two entries and you have lost track of where you are.</p>'}
   ]
  },

  /* ============================ SWITCHING ============================ */
  {type:'prose', title:'What happens to your files when you switch',
   html:
    '<p>This is the part that unsettles people, so here it is plainly: <strong>you are just looking at a different ' +
    'version of the project.</strong> Nothing was deleted, nothing was moved, nothing was uploaded.</p>' +
    '<p>On github.com, switching branches is closer to changing which page you have open than to opening a ' +
    'different file. The repo page rebuilds itself from whichever branch you picked — file list, README, commit ' +
    'history, commit count, everything. Switch back and the previous view returns unchanged, because it was never ' +
    'gone.</p>' +
    '<p>The consequences worth holding on to:</p>' +
    '<ul>' +
      '<li><strong>Committing while on a branch commits to that branch.</strong> Not to <code>main</code>. This is ' +
      'the mistake, and it is entirely prevented by reading the selector before you edit.</li>' +
      '<li><strong>The front page always shows the default branch.</strong> Your work on a branch is real and ' +
      'saved and permanent — it is just not what a visitor sees until you merge.</li>' +
      '<li><strong>Nothing is ever lost by switching.</strong> The other branch is still there, still at the same ' +
      'commit, one dropdown click away.</li>' +
      '<li><strong>An uncommitted edit is not on any branch.</strong> If you are typing into GitHub’s editor and ' +
      'you navigate away without pressing the green commit button, that text existed only in your browser tab. ' +
      'Branches protect committed work, not unsaved work.</li>' +
    '</ul>' +
    '<p>If you later work on your own laptop with Git installed, switching branches genuinely does rewrite the ' +
    'files in your folder, and watching them change under you is startling the first time. Same idea, more ' +
    'visible. Nothing is lost there either.</p>'
  },

  /* ==================== SCREEN 2: THE BRANCHES PAGE ==================== */
  {type:'prose', title:'The branches page, a week later',
   html:
    '<p>Click the branch counter on any repo page and you land here: a list of every branch, how far each one has ' +
    'drifted from the default, and what you can do about it.</p>' +
    '<p>The screen below jumps forward a week so there is something to read. You have made two commits on ' +
    '<code>fix-readme-formatting</code>, and one commit landed on <code>main</code> in the meantime — the week 7 ' +
    'journal entry, which had nothing to do with the README.</p>'
  },

  {type:'screen',
   id:'branch-list',
   label:'github.com/jordan-lee/trading-journal-practice/branches — the branch list, ahead/behind, and what to do next',
   url:'github.com/jordan-lee/trading-journal-practice/branches',
   initial:'branches',
   inertNote:'That control is real on GitHub but inert in this lesson. Use the numbered markers — this screen is here to be read rather than driven.',

   views:{
    branches:{ url:'github.com/jordan-lee/trading-journal-practice/branches', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span>' +
        '<span class="gh-breadcrumb__sep">/</span><span class="gh-breadcrumb__cur">Branches</span></div></div></div>' +

      '<div class="gh-page">' +
        '<nav class="gh-tabnav" data-h="l-filters">' +
          '<span class="gh-tab gh-tab--active">Overview</span>' +
          '<span class="gh-tab">Yours<span class="gh-counter gh-counter--flat">1</span></span>' +
          '<span class="gh-tab">Active<span class="gh-counter gh-counter--flat">2</span></span>' +
          '<span class="gh-tab">Stale</span>' +
          '<span class="gh-tab">All<span class="gh-counter gh-counter--flat">2</span></span>' +
        '</nav>' +

        '<div style="display:flex;align-items:center;gap:8px;margin:16px 0;flex-wrap:wrap">' +
          '<span class="gh-input gh-input--sm" style="max-width:280px;color:var(--gh-fg-subtle)" data-h="l-search">Search branches…</span>' +
          '<span style="margin-left:auto"><span class="gh-btn gh-btn--primary" data-h="l-newbranch">New branch</span></span>' +
        '</div>' +

        '<div class="gh-branchbox" style="margin-bottom:16px">' +
          '<div class="gh-branchbox__head">Default branch</div>' +
          '<div class="gh-branchrow" data-h="l-mainrow">' +
            '<span class="gh-branchname">main</span>' +
            '<span class="gh-state gh-state--sm" data-h="l-defaultbadge" style="background:var(--gh-neutral-emphasis)">Default</span>' +
            '<span class="gh-branchrow__meta"><span class="gh-avatar gh-avatar--16" data-user="jordan-lee"></span> ' +
              'Updated 2 days ago by jordan-lee · <span class="gh-mono">2f77ab4</span></span>' +
            '<span class="gh-branchrow__right">' +
              '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="l-mainkebab" data-inert><svg class="octicon octicon--sm"><use href="#oct-kebab-horizontal"/></svg></span>' +
            '</span>' +
          '</div>' +
        '</div>' +

        '<div class="gh-branchbox">' +
          '<div class="gh-branchbox__head">Your branches</div>' +
          '<div class="gh-branchrow" data-h="l-branchrow">' +
            '<span class="gh-branchname" data-h="l-branchname">fix-readme-formatting</span>' +
            '<span class="gh-branchrow__meta"><span class="gh-avatar gh-avatar--16" data-user="jordan-lee"></span> ' +
              'Updated 3 hours ago by jordan-lee · <span class="gh-mono">8c14b60</span></span>' +
            '<span class="gh-branchrow__right">' +
              '<span class="gh-aheadbehind" data-h="l-aheadbehind"><span>1</span>' +
                '<span class="gh-aheadbehind__bar"><i class="behind" style="width:33%"></i><i class="ahead" style="width:67%"></i></span>' +
                '<span>2</span></span>' +
              '<span class="gh-btn gh-btn--sm" data-h="l-newpr"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>New pull request</span>' +
              '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="l-delete"><svg class="octicon octicon--sm"><use href="#oct-trash"/></svg></span>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="l-newpr"]', toast:'That opens a pull request from this branch into main, with the diff pre-loaded. Module 6 does it properly.'},
     {on:'[data-h="l-delete"]', toast:'Deleting a branch removes the label, not the commits. On GitHub the deletion is also undoable for a while — a “Restore” button appears in its place.'},
     {on:'[data-h="l-newbranch"]', toast:'The same create-branch flow as the dropdown, with a form instead. It asks for a name and which branch to start from.'},
     {on:'[data-h="l-branchname"]', toast:'Clicking a branch name switches the whole repo to that branch — the same switch you made on the previous screen.'}
   ],

   hotspots:[
    {sel:'[data-h="l-filters"]', place:'bottom', title:'Overview / Yours / Active / Stale / All',
     what:'<p>Five views of the same list. <strong>Yours</strong> is branches you created. <strong>Active</strong> is anything touched in the last three months. <strong>Stale</strong> is everything older than that.</p>',
     why:'<p>Branches accumulate. On a real project most of them are finished, merged and forgotten, and a flat list of 60 makes the four live ones impossible to find. The Stale filter exists so somebody can go and clean up.</p>',
     how:'<p>Click a filter to narrow the list. Your repo has two branches and zero stale ones, so all five views look nearly identical — that will not stay true.</p>',
     fail:'<p>Treating <em>stale</em> as <em>merged</em>. A stale branch might be unmerged work somebody abandoned three months ago. Check the ahead count before you delete anything on the strength of this label.</p>',
     when:'<p>End of semester, when you want to delete every branch you finished with and keep the one you did not.</p>'},

    {sel:'[data-h="l-mainrow"]', place:'right', title:'The default branch, in its own box',
     what:'<p><code>main</code> gets a separate section at the top rather than being sorted in with the others, because it is not the same kind of thing as the rest of the list.</p>',
     why:'<p>Every other branch is measured against this one. Putting it in its own box makes it obvious that it is the reference point rather than one option among several.</p>',
     how:'<p>The kebab menu on the right is where you would rename it or change which branch is default. Changing the default is a Settings-level decision and it changes what every visitor sees.</p>',
     fail:'<p>Renaming <code>main</code> without thinking. Every link anyone has to <code>/tree/main/…</code> breaks, and anyone with a local copy has to fix theirs by hand.</p>',
     when:'<p>Almost never for a repo like yours. Worth recognising on somebody else’s project where the default is called something unexpected.</p>'},

    {sel:'[data-h="l-defaultbadge"]', place:'bottom', title:'The “Default” badge',
     what:'<p>A small grey pill marking which branch is the repo’s official one. Exactly one branch has it at any time.</p>',
     why:'<p>“Default” is a setting, not a name. Without a visible badge you could not tell which of five branches GitHub actually shows to visitors, and the answer is not always the one called <code>main</code>.</p>',
     how:'<p>It is set in <strong>Settings → General → Default branch</strong>. Nothing on this page changes it; the badge just reports it.</p>',
     fail:'<p>Assuming the default is protected from direct commits. It is not, unless somebody turned on branch protection — which is a separate setting and off by default on personal repos.</p>',
     when:'<p>Opening an unfamiliar repo where <code>main</code>, <code>master</code> and <code>develop</code> all exist and you need to know which one is real.</p>'},

    {sel:'[data-h="l-branchname"]', place:'right', title:'fix-readme-formatting — the name is doing work',
     what:'<p>The branch you made. Lowercase, hyphens instead of spaces, and a name that says what the work is rather than who is doing it or when.</p>',
     why:'<p>Branch names show up in URLs, in pull request titles, in merge commit messages, and in every terminal that ever touches this repo. Spaces and capitals cause real friction in all of those places, so the convention hardened into lowercase-with-hyphens.</p>',
     how:'<p>Click the name to switch the repo to that branch. The three shapes you will see in the wild: <code>fix-readme-formatting</code>, <code>add-week7-journal</code>, and prefixed ones like <code>feature/portfolio-page</code> or <code>fix/broken-link</code> where teams want branches grouped by kind.</p>',
     fail:'<p>Naming it <code>test</code>, <code>new</code>, or <code>adam</code>. Three weeks later you have four of them and not one tells you what is inside. The name is the only description a branch ever gets.</p>',
     when:'<p>Every time you create one. Say what the change is, in three or four hyphenated words, and future-you can read the branch list like a to-do list.</p>'},

    {sel:'[data-h="l-aheadbehind"]', place:'top', title:'“1 — bar — 2”: behind and ahead, and what they mean',
     what:'<p>Two numbers with a bar between them. The left number, <strong>1</strong>, is how many commits <code>main</code> has that this branch does not — commits you are <em>behind</em>. The right number, <strong>2</strong>, is how many commits this branch has that <code>main</code> does not — commits you are <em>ahead</em>. Red on the bar is behind; green is ahead.</p>',
     why:'<p>Two branches that both keep moving drift apart in two directions at once, and “how different are they?” needs both numbers to answer. One number would hide half the story.</p>',
     how:'<p>Read yours as a sentence: “this branch contains two commits of README work that <code>main</code> has never seen, and it is missing one commit — the week 7 journal entry — that landed on <code>main</code> after I branched.” Click the bar on real GitHub to see exactly which commits those are.</p>',
     fail:'<p>Letting the behind number grow. A branch 40 commits behind is built on a version of the project that no longer exists, and merging it means reconciling six weeks of other people’s decisions in one sitting. Merge early, merge small.</p>',
     when:'<p>Before every merge, and any time a branch has been sitting untouched for a while and you are wondering whether it is still viable.</p>',
     note:'<p>These two numbers are also the honest measure of risk. Ahead-only means a clean, boring merge. Ahead <em>and</em> behind, with both sides touching the same file, is where merge conflicts come from.</p>'},

    {sel:'[data-h="l-branchrow"] .gh-branchrow__meta', place:'bottom', title:'“Updated 3 hours ago by jordan-lee”',
     what:'<p>Who last committed to this branch, when, and the short SHA of that commit — <code>8c14b60</code>, which is the newest commit on this line of history.</p>',
     why:'<p>On a shared repo this row answers “is anyone still working on this, and who do I ask?” without opening anything. It is the difference between a live branch and an abandoned one.</p>',
     how:'<p>Click the SHA to open that commit and read its diff. Everything you learnt in Module 4 applies unchanged — a commit on a branch is an ordinary commit.</p>',
     fail:'<p>The timestamp is the last <em>commit</em>, not the last time somebody thought about it. A branch untouched for two months is usually dead, but occasionally it is somebody’s carefully parked work. Ask before deleting on a shared project.</p>',
     when:'<p>Group work, when four branches exist and you need to know which one is the one everybody is actually building on.</p>'},

    {sel:'[data-h="l-newpr"]', place:'top', title:'“New pull request”, on every branch row',
     what:'<p>A one-click start to proposing that this branch be merged into <code>main</code>. Every branch that is ahead of the default gets one of these buttons.</p>',
     why:'<p>The overwhelmingly common next step for a branch with work on it is “get this into main”. GitHub puts the button where the branches are, so you do not have to go and construct the comparison yourself.</p>',
     how:'<p>Click it and GitHub opens a comparison page pre-filled with this branch as the source and the default as the target, showing every commit and the combined diff. You add a title and a description and submit.</p>',
     fail:'<p>Opening a pull request from the wrong direction — target and source swapped. GitHub shows both at the top of the page as <em>base ← compare</em>, and the diff will look bizarrely inverted if you have it backwards.</p>',
     when:'<p>The moment the work on the branch is finished. On GitHub you almost never merge a branch directly; you open one of these. Module 6.</p>'},

    {sel:'[data-h="l-delete"]', place:'top', title:'The bin icon — deleting a branch is safe',
     what:'<p>Removes the branch. What it actually deletes is the <em>label</em>, not the commits — and if the branch was merged, every one of those commits is already part of <code>main</code>’s history and stays there permanently.</p>',
     why:'<p>Branch labels are cheap to make and cost nothing to keep, so they pile up until nobody can tell which are live. Deleting merged branches is basic hygiene, and GitHub makes it safe enough to do without ceremony.</p>',
     how:'<p>Click the bin. GitHub replaces the row with a <strong>Restore</strong> button, and that undo stays available for a good while afterwards.</p>',
     fail:'<p>Deleting a branch that was <em>never merged</em>. The commits are then unreferenced — no label points at them, they stop appearing in any history, and recovering them means knowing the SHA. Check the ahead number is zero, or that the pull request says “Merged”, before you delete.</p>',
     when:'<p>Straight after a pull request is merged. GitHub even offers you a “Delete branch” button on the merged pull request, which is the moment to take it.</p>'},

    {sel:'[data-h="l-newbranch"]', place:'left', title:'The “New branch” button',
     what:'<p>The same branch creation as the dropdown, presented as a small form: name it, and choose which branch it starts from.</p>',
     why:'<p>The dropdown assumes you are branching from wherever you are standing. This one makes the source explicit, which matters once a repo has several branches worth starting from.</p>',
     how:'<p>Click it, type a name, pick the source branch, confirm. You end up in exactly the same state as the dropdown route.</p>',
     fail:'<p>Picking the wrong source. Branch from a half-finished branch instead of <code>main</code> and you have inherited someone else’s unfinished work — and its merge conflicts.</p>',
     when:'<p>When you are already on the branches page tidying up and realise you want a new one.</p>'}
   ]
  },

  /* ============================ NAMING ============================ */
  {type:'compare', title:'Branch names that help, and branch names that do not',
   left:{title:'Names you will regret',
     html:'<p><code>test</code> · <code>new</code> · <code>New Branch (2)</code> · <code>adam</code> · ' +
          '<code>fix</code> · <code>readme_stuff_FINAL</code></p>' +
          '<p>None of these say what is inside. Three weeks later the branch list is a list of nouns with no ' +
          'verbs, and the only way to find out what any of them contain is to switch to each one and look.</p>' +
          '<p>Capitals and spaces cause practical problems too. Branch names end up in URLs, where a space becomes ' +
          '<code>%20</code>, and on the command line a name with a space has to be quoted every time.</p>' +
          '<p>Naming a branch after yourself is a special trap. On a solo repo every branch is yours, so the name ' +
          'carries no information whatsoever.</p>'},
   right:{title:'Names that read like a to-do list',
     html:'<p><code>fix-readme-formatting</code> · <code>add-week7-journal</code> · ' +
          '<code>replace-template-placeholders</code> · <code>feature/portfolio-page</code></p>' +
          '<p>Lowercase, hyphens between words, a verb and a noun. Read the branch list and you know what is in ' +
          'flight without opening anything.</p>' +
          '<p>The slash form — <code>feature/…</code>, <code>fix/…</code>, <code>docs/…</code> — is a convention ' +
          'teams use to group branches by kind. Some GitHub interfaces will even display them as folders. It is ' +
          'optional and pointless on a two-file repo.</p>' +
          '<p>Keep them short. The name appears in the URL, in the pull request, and in the merge commit message, ' +
          'and a forty-character branch name is read a hundred times and typed twice.</p>'}
  },

  /* ==================== SCREEN 3: TWO BRANCHES, SIDE BY SIDE ==================== */
  {type:'prose', title:'Two versions of the same repo, at the same time',
   html:
    '<p>The idea that a project can be in two states at once is the part that refuses to feel real until you see ' +
    'it. So here is the same repo, twice: <code>main</code> on the left, <code>fix-readme-formatting</code> on the ' +
    'right, both live.</p>' +
    '<p>Press the green button to commit the README rewrite on the branch, and watch which side changes. Then ' +
    'press the second button to merge, and watch the other side catch up.</p>'
  },

  {type:'screen',
   id:'two-branches',
   label:'The same repository on two branches at once — commit on one, then fold it into the other',
   url:'github.com/jordan-lee/trading-journal-practice',
   initial:'side',
   inertNote:'Use the two buttons under the columns — those are the live controls on this screen.',

   views:{
    side:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-page">' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:16px;align-items:start">' +

          '<div data-h="t-colmain">' +
            '<div class="gh-repotoolbar" style="margin-bottom:10px">' +
              '<span class="gh-branchsel" data-inert><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b></span>' +
              '<span class="gh-muted" style="margin-left:8px;font-size:12px">the version being marked</span>' +
            '</div>' +
            '<div class="gh-readmebox">' +
              '<div class="gh-readmebox__head"><h2><svg class="octicon"><use href="#oct-book"/></svg>README</h2></div>' +
              '<div class="gh-readmebox__body"><div class="gh-markdown" id="main-readme">' +
                '<h1>Jordan Lee -- desk profile</h1>' +
                '<p><strong>Degree:</strong> Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor</p>' +
                '<h2>Markets I want to trade this semester</h2>' +
                '<ul><li>Index futures, FX majors</li><li>all of the above 2</li></ul>' +
              '</div></div>' +
            '</div>' +
            '<p class="gh-muted" style="font-size:12px;margin:8px 0 0" id="main-tip">' +
              'Latest commit <span class="gh-mono">109d091</span> · 5 commits</p>' +
          '</div>' +

          '<div data-h="t-colbranch">' +
            '<div class="gh-repotoolbar" style="margin-bottom:10px">' +
              '<span class="gh-branchsel" data-inert><svg class="octicon"><use href="#oct-git-branch"/></svg><b>fix-readme-formatting</b></span>' +
              '<span class="gh-muted" style="margin-left:8px;font-size:12px">where the rewrite happens</span>' +
            '</div>' +
            '<div class="gh-readmebox">' +
              '<div class="gh-readmebox__head"><h2><svg class="octicon"><use href="#oct-book"/></svg>README</h2></div>' +
              '<div class="gh-readmebox__body"><div class="gh-markdown" id="branch-readme">' +
                '<h1>Jordan Lee -- desk profile</h1>' +
                '<p><strong>Degree:</strong> Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor</p>' +
                '<h2>Markets I want to trade this semester</h2>' +
                '<ul><li>Index futures, FX majors</li><li>all of the above 2</li></ul>' +
              '</div></div>' +
            '</div>' +
            '<p class="gh-muted" style="font-size:12px;margin:8px 0 0" id="branch-tip">' +
              'Latest commit <span class="gh-mono">109d091</span> · 5 commits</p>' +
          '</div>' +

        '</div>' +

        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:20px;padding-top:16px;border-top:1px solid var(--gh-border-default)">' +
          '<span class="gh-btn gh-btn--primary" data-h="t-commit">Commit the rewrite on fix-readme-formatting</span>' +
          '<span class="gh-btn" data-h="t-merge"><svg class="octicon"><use href="#oct-git-merge"/></svg>Merge fix-readme-formatting into main</span>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="t-commit"]', once:true,
      replace:{target:'#branch-readme', html:
        '<h1>Jordan Lee — desk profile</h1>' +
        '<p><strong>Degree:</strong> Economics (Finance), year 3</p>' +
        '<p><em>Trading alias:</em> IronCondor</p>' +
        '<h2>Markets I want to trade this semester</h2>' +
        '<ul><li>Index futures</li><li>FX majors</li></ul>'},
      setText:{target:'#branch-tip', text:'Latest commit d5a3e91 · 6 commits · 1 ahead of main'},
      explain:{title:'One side changed. The other did not.',
        html:'<p>The right-hand README is now the rewritten one: the degree and the trading alias are on separate ' +
             'lines, the placeholder <em>e.g.</em> is gone, and the two markets are two bullets instead of one.</p>' +
             '<p>The left-hand README is exactly as it was. <code>main</code> still points at <code>109d091</code>. ' +
             'Anyone opening your repo right now — a marker, a classmate, you on your phone — sees the old version, ' +
             'because the front page shows the default branch and the default branch has not moved.</p>' +
             '<p>That is the whole promise of branching, demonstrated in one click. You have made a real, ' +
             'permanent, committed change to the project, and the version being marked on Friday is untouched.</p>' +
             '<p>The branch is now <strong>1 ahead</strong> of main — one commit exists here that does not exist ' +
             'there. That is the number you read on the branches page.</p>'}},

     {on:'[data-h="t-merge"]', once:true,
      replace:{target:'#main-readme', html:
        '<h1>Jordan Lee — desk profile</h1>' +
        '<p><strong>Degree:</strong> Economics (Finance), year 3</p>' +
        '<p><em>Trading alias:</em> IronCondor</p>' +
        '<h2>Markets I want to trade this semester</h2>' +
        '<ul><li>Index futures</li><li>FX majors</li></ul>'},
      setText:{target:'#main-tip', text:'Latest commit d5a3e91 · 6 commits · up to date with fix-readme-formatting'},
      explain:{title:'That is a merge — and that one was a fast-forward',
        html:'<p>Both sides now show the rewritten README, and both are on commit <code>d5a3e91</code>. ' +
             'The branch’s work is part of <code>main</code>’s history, permanently.</p>' +
             '<p>Notice what did <em>not</em> appear: an extra “merge” commit. Because <code>main</code> had not ' +
             'moved at all since you branched, Git did not have to combine anything. It slid the ' +
             '<code>main</code> label forward onto the branch’s newest commit. That is a ' +
             '<strong>fast-forward</strong>, and it is the tidiest possible merge.</p>' +
             '<p>Had <code>main</code> gained a commit of its own in the meantime, sliding the label forward would ' +
             'have thrown that commit away. So Git would instead have made a new <strong>merge commit</strong> ' +
             'containing both lines of work, with two parents rather than one — the two-parent commit Module 4 ' +
             'mentioned.</p>' +
             '<p>One correction before Module 6: on GitHub you almost never press a merge button like this one. ' +
             'You open a pull request, which is a merge with a diff, a discussion and an approval step wrapped ' +
             'around it. Same outcome, visible reasoning.</p>'}}
   ],

   hotspots:[
    {sel:'[data-h="t-colmain"] .gh-repotoolbar', place:'top', title:'The left column is main',
     what:'<p>The default branch, showing the README exactly as it exists today — placeholders, run-together degree line and all.</p>',
     why:'<p>This is the version with an audience. Every visitor, every link, every clone that does not name a branch gets this one, which is why the convention is that it always works.</p>',
     how:'<p>Nothing to click here. Read it as “what the outside world currently sees”, and compare it to the right-hand column after each button press.</p>',
     fail:'<p>Doing the risky work here and hoping to finish before anyone looks. There is no half-committed state on GitHub — the moment you commit, this is what your repo is.</p>',
     when:'<p>Any week where something has to stay presentable while you change it. Assignment deadlines, mostly.</p>'},

    {sel:'[data-h="t-colbranch"] .gh-repotoolbar', place:'top', title:'The right column is the branch',
     what:'<p>The same repository, same files, viewed through <code>fix-readme-formatting</code>. Identical to the left until you commit something here.</p>',
     why:'<p>Two views of one repo is the mental model that makes everything else about branching obvious. There is one pile of commits; branches are labels marking different points in it.</p>',
     how:'<p>In the real interface you would get here by switching branches, not by putting them side by side. This layout exists to make the parallelism visible in one glance.</p>',
     fail:'<p>Expecting a branch to update itself when <code>main</code> changes. It will not. It is a separate line of history and it only receives <code>main</code>’s new commits if you deliberately pull them in.</p>',
     when:'<p>Whenever you are unsure whether an edit you made is “live” yet. Ask which branch it is on — that is always the answer.</p>'},

    {sel:'[data-h="t-commit"]', place:'top', title:'Commit on the branch — press it and watch',
     what:'<p>A stand-in for the whole edit-and-commit loop from Module 3, performed while standing on the branch instead of on <code>main</code>.</p>',
     why:'<p>Reading “commits go to the branch you are on” is not the same as seeing one side of the screen change and the other stay still. This is the button that makes the sentence real.</p>',
     how:'<p>Press it once. The right-hand README rewrites itself, the commit count under it goes to 6, and it now says <strong>1 ahead of main</strong>.</p>',
     fail:'<p>In real life, doing this with the branch selector still reading <code>main</code>. Then it is the left column that changes, the marked version is now half-rewritten, and there is nothing to undo it with except a revert.</p>',
     when:'<p>Every commit you make from now on. The only question that matters is which branch you were standing on.</p>'},

    {sel:'[data-h="t-merge"]', place:'top', title:'Merge — folding the branch back in',
     what:'<p>Takes the commits that exist only on <code>fix-readme-formatting</code> and makes them part of <code>main</code>’s history. Press it after the commit button.</p>',
     why:'<p>A branch that is never merged is a change that never happened, as far as anyone reading the repo is concerned. Merging is the deliberate act of publishing — the stapling in the photocopy analogy.</p>',
     how:'<p>Press it and both columns become identical. On real GitHub the equivalent buttons live at the bottom of a pull request, and there are three flavours of them — merge, squash, rebase — which Module 6 explains where they belong.</p>',
     fail:'<p>Merging work that is not finished, because the branch felt like a chore. <code>main</code> now contains a half-rewritten README and the branch that was protecting you is gone.</p>',
     when:'<p>When the branch does what you wanted it to do and you would be happy for a marker to open the repo right now.</p>'}
   ]
  },

  /* ============================ MERGING & CONFLICTS ============================ */
  {type:'prose', title:'Merging, in plain English',
   html:
    '<p>Merging answers one question: how do the commits that exist only on this branch become part of ' +
    '<code>main</code>? There are two shapes it can take, and the difference is worth ninety seconds of your ' +
    'attention because the words come up constantly.</p>' +
    '<h3>Fast-forward</h3>' +
    '<p>If <code>main</code> has not moved since you branched, there is nothing to combine. Your branch is ' +
    '<code>main</code> plus some extra commits, so Git slides the <code>main</code> label forward onto your newest ' +
    'commit and the job is done. The history stays a single straight line, as if you had committed to ' +
    '<code>main</code> all along. That is what the screen above did.</p>' +
    '<h3>Merge commit</h3>' +
    '<p>If <code>main</code> gained commits of its own while you were working, sliding the label forward would ' +
    'throw those away. So Git makes a brand-new commit whose job is to say “these two lines of history join here”, ' +
    'and gives it <strong>two parents</strong> — one on each line. That is the two-parent commit Module 4 warned ' +
    'you about, and now you know where they come from.</p>' +
    '<p>You do not choose between these. Git looks at whether <code>main</code> moved and picks. The only reason ' +
    'to know the names is that GitHub uses them in its buttons and its messages, and “this branch can be ' +
    'fast-forwarded” should read as “this will be painless” rather than as a warning.</p>' +
    '<h3>And then the actual answer</h3>' +
    '<p>On GitHub you almost never merge directly. You open a <strong>pull request</strong> — the same merge, with ' +
    'the combined diff on display, a comment thread attached, and somewhere for a reviewer to say yes. On any ' +
    'shared project it is the only way changes are allowed in, and it is Module 6.</p>'
  },

  {type:'callout', variant:'warn', title:'Merge conflicts: nothing is broken and nothing is lost',
   html:
    '<p>A conflict happens when two branches changed <strong>the same lines of the same file</strong>, and Git ' +
    'cannot work out which version should survive. That is the entire cause. Different files: fine. Different ' +
    'parts of the same file: fine. The same three lines, changed two different ways: conflict.</p>' +
    '<p>Git refuses to guess on purpose. Guessing would mean silently discarding somebody’s work, and a tool that ' +
    'does that occasionally is worse than one that stops and asks every time.</p>' +
    '<p>What GitHub shows you is a pull request that will not merge, with a <strong>Resolve conflicts</strong> ' +
    'button. Click it and you get an editor showing both versions of the disputed lines, wrapped in markers ' +
    '(<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>). ' +
    'You delete the markers and whichever text you do not want, leaving the version that should exist. Then you ' +
    'mark it resolved and merge.</p>' +
    '<p>The reassurance, because beginners always assume the worst: <strong>a conflict destroys nothing.</strong> ' +
    'Both versions are still in their own branches, both are still in the history, and the merge has not ' +
    'happened yet. A conflict is a question, not damage.</p>' +
    '<p>How to have fewer of them: keep branches short-lived, merge often, and do not let a branch sit 40 commits ' +
    'behind. The behind number on the branches page is the early warning.</p>'
  },

  /* ============================ HONESTY ============================ */
  {type:'prose', title:'Do you actually need branches for this assignment?',
   html:
    '<p>Honest answer: <strong>no, not really, not yet.</strong> You work alone on a repo with two files. ' +
    'Committing straight to <code>main</code> is fine and it is what most people in your position do, and the ' +
    'history in Module 4 already protects you from losing anything.</p>' +
    '<p>Anyone who tells you a solo student must branch for every change is describing a workflow built for teams ' +
    'and pretending it is a law. It is not.</p>' +
    '<p>Here is when a branch genuinely earns its keep, and these are worth recognising because they will happen ' +
    'to you:</p>' +
    '<ul>' +
      '<li><strong>The change is risky.</strong> Restructuring the whole README, not fixing a typo. If it goes ' +
      'badly you want to walk away from it rather than unpick it.</li>' +
      '<li><strong>The change is half-finished and something is due.</strong> Deadline Friday, rewrite in ' +
      'progress. The branch is what lets both be true at once.</li>' +
      '<li><strong>You want a second opinion before it counts.</strong> A branch plus a pull request gives someone ' +
      'a specific diff to comment on, instead of “have a look at my repo”.</li>' +
      '<li><strong>You are trying two approaches.</strong> Two branches, two versions, compare them properly ' +
      'rather than from memory.</li>' +
    '</ul>' +
    '<p>And here is where branching stops being optional. The moment you work with anybody else — a group ' +
    'assignment, a society project, an internship, any open-source contribution — everybody commits into the same ' +
    'repo, and direct commits to <code>main</code> mean two people can overwrite each other with nobody ever ' +
    'seeing it happen. Every team you will ever join solves this the same way: branch, pull request, review, ' +
    'merge. Learning it now on a repo where nothing is at stake is much cheaper than learning it in week 2 of an ' +
    'internship.</p>' +
    '<p>A reasonable middle path for the rest of this semester: commit small edits straight to <code>main</code>, ' +
    'and branch the first time you catch yourself thinking “I hope this works”.</p>'
  },

  {type:'steps', title:'Making and finishing a branch, click by click',
   items:[
     {label:'Open the repo and read the branch selector', html:
       '<p>Top left of the file list, next to a small branch icon. It should say <code>main</code>. If it says ' +
       'anything else you are already on a branch and creating another one from here will inherit its work.</p>'},
     {label:'Click the selector and type a name', html:
       '<p>The dropdown opens with a filter box at the top. Type something like ' +
       '<code>replace-template-placeholders</code> — lowercase, hyphens, a verb and a noun.</p>'},
     {label:'Click “Create branch: … from ‘main’”', html:
       '<p>It appears under the filter box once your name matches no existing branch. Read the <em>from</em> half ' +
       'before you click. GitHub creates it and switches you onto it immediately.</p>'},
     {label:'Check the selector again', html:
       '<p>It should now show your branch name, the counter should say <strong>2 Branches</strong>, and the URL ' +
       'should contain <code>/tree/your-branch-name</code>. Three separate confirmations that it worked.</p>'},
     {label:'Edit and commit as normal', html:
       '<p>Exactly the loop from Module 3 — open the file, pencil icon, change it, write a real commit message, ' +
       'green button. The only difference is that the commit lands on this branch.</p>'},
     {label:'Check main is untouched', html:
       '<p>Switch back to <code>main</code> in the selector. Old version, unchanged. This is the step that turns ' +
       'branching from a concept into something you trust.</p>'},
     {label:'Open a pull request when it is ready', html:
       '<p>GitHub will be showing a <strong>Compare &amp; pull request</strong> banner. That is Module 6, and it ' +
       'is where the merge actually happens.</p>'},
     {label:'Delete the branch after it merges', html:
       '<p>A <strong>Delete branch</strong> button appears on the merged pull request. Take it. The commits are ' +
       'already in <code>main</code>; you are only removing a label that has finished its job.</p>'}
   ]
  },

  {type:'terms', title:'The words this module gave you',
   items:[
     {term:'Branch', html:'A movable pointer to a commit — one named, parallel line of history. Making one copies nothing and costs nothing.'},
     {term:'main', html:'The branch GitHub creates with the repo and treats as official. Older repos call it <code>master</code>; same thing, different word.'},
     {term:'Default branch', html:'The branch shown to anyone who opens the repo without naming one, and the target a pull request assumes. A setting, marked by a grey <em>Default</em> badge.'},
     {term:'Ahead / behind', html:'Ahead: commits this branch has that the default does not. Behind: commits the default has that this branch does not. Both matter.'},
     {term:'Merge', html:'Folding one branch’s commits into another so they become part of its history.'},
     {term:'Fast-forward', html:'A merge where the target branch never moved, so its label just slides forward. No merge commit, no combining, no drama.'},
     {term:'Merge commit', html:'The commit created when both branches moved. It has two parents — one per line of history.'},
     {term:'Merge conflict', html:'Two branches changed the same lines of the same file. Git stops and asks which version wins. Nothing is broken and nothing is lost.'},
     {term:'Stale branch', html:'GitHub’s label for a branch untouched for roughly three months. Often abandoned; check the ahead count before deleting it.'},
     {term:'Pull request', html:'A proposal to merge one branch into another, with the diff, a discussion and an approval step attached. Module 6.'}
   ]
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Explain a branch as a movable pointer, and defend the photocopy analogy against the obvious follow-up questions',
     'Create a branch from the selector, read the “from <strong>main</strong>” half before clicking, and confirm it worked three different ways',
     'Switch branches knowing that the entire repo page changes — files, README, history, counts — and that nothing is lost',
     'Say why <strong>main</strong> is treated as the official version and why it is expected to always work',
     'Read the branches page: Default badge, Active/Stale, ahead/behind, New pull request, and when deleting a branch is safe',
     'Name a branch so that the branch list reads like a to-do list',
     'Explain a merge, tell a fast-forward from a merge commit, and say what causes a merge conflict and why it damages nothing',
     'Decide honestly whether a given change needs a branch — and know that the answer changes the day you work with anyone else'
   ]
  }

  ]
});
