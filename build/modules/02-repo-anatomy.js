/* ============================================================================
   MODULE 02 — "Anatomy of a repository page"
   REFERENCE IMPLEMENTATION. Copy this file's shape for every other module.
   ============================================================================

   ------------------------------- THE SCHEMA ---------------------------------
   Your file contains EXACTLY ONE statement:

     MODULES.push({
       id:    'repo-anatomy',        // must match the slug in BRIEF.md §5
       num:   2,                     // module number, drives ordering
       title: 'Anatomy of a repository page',
       blurb: 'One sentence, shown under the module title.',
       goals: ['...','...','...'],   // 3–4 "you will be able to…" lines
       sections: [ ... ]             // rendered top to bottom, in order
     });

   Every section is an object with a `type`. These are ALL the types:

   1) PROSE — your teaching copy. `html` is raw HTML.
      { type:'prose', title:'Optional <h2>', html:'<p>…</p><p>…</p>' }
      Inside html you may use: <p> <h3> <ul>/<ol>/<li> <strong> <em> <code>
      <pre><code> <blockquote> <a href>. Keep paragraphs to 2–4 sentences.

   2) CALLOUT — a boxed aside.
      { type:'callout', variant:'info'|'tip'|'warn'|'danger'|'moment',
        title:'Heading text', html:'<p>…</p>' }
      Use variant:'moment' for the five REAL defects in the reader's repo
      (BRIEF.md §4). It renders with an "In your repo" tag.

   3) STEPS — a numbered click-by-click walkthrough.
      { type:'steps', title:'Optional', items:[
          { label:'Click the pencil', html:'<p>…</p>' }, … ] }

   4) COMPARE — wrong vs right, side by side.
      { type:'compare', title:'Optional',
        left:  { title:'What he typed',  html:'<p>…</p>' },
        right: { title:'What he meant',  html:'<p>…</p>' } }

   5) TERMS — a definition list for jargon.
      { type:'terms', title:'Optional', items:[
          { term:'Commit', html:'Plain-English definition.' }, … ] }

   6) RECAP — the closing checklist. One per module, last.
      { type:'recap', title:'Optional', items:['…','…'] }

   7) HTML — escape hatch. Only if nothing above fits; tell the PM you used it.
      { type:'html', html:'<div>…</div>' }

   8) SCREEN — an interactive fake GitHub page. THE IMPORTANT ONE. See below.

   --------------------------- THE SCREEN SECTION -----------------------------
   { type:'screen',
     id:    'repo-home',                 // unique within your module
     label: 'the reader's repo — the Code tab',// shown above the frame
     url:   'github.com/owner/repo',     // fallback fake URL
     initial:'root',                     // which view shows first
     inertNote:'optional custom toast for unwired controls',

     views: {                            // one entry per screen state
       root:    { url:'github.com/owner/repo', html:'…' },
       commits: { url:'github.com/owner/repo/commits/main', html:'…' }
     },

     actions: [ … ],                     // see "INTERACTIVE API" below
     hotspots:[ … ]                      // see "HOTSPOTS" below
   }

   HOTSPOTS — numbered 1..N automatically, in array order. Order them the way
   you want him to read them.
     { sel:  '[data-h="private-badge"]',  // CSS selector, scoped to the view
       view: 'root',                      // defaults to `initial`
       place:'left'|'right'|'top'|'bottom',// where the marker sits (auto-flips)
       title:'The Private badge',
       what: '<p>…</p>',   // what it is, plain English
       why:  '<p>…</p>',   // what problem caused it to be invented
       how:  '<p>…</p>',   // the literal clicks
       fail: '<p>…</p>',   // the concrete failure mode
       when: '<p>…</p>',   // a real moment in the reader's life
       note: '<p>…</p>'    // optional extra warning box
     }
   All five Why-Chain fields are REQUIRED (BRIEF.md §6). A hotspot missing one
   silently drops that row — the PM will notice.

   INTERACTIVE API — `actions` is a list of {trigger, effects}. You write DATA,
   never code. `on` is a CSS selector; the first action whose `on` matches the
   click wins. Effects (combine as many as you like on one action):
     view:      'commits'                         → switch to that view
     toggle:    { target:'#branch-menu', class:'is-open' }
     addClass / removeClass: { target:'#x', class:'is-on' }
     append:    { target:'#commit-list', html:'<div …>' }
     prepend:   { target:'#commit-list', html:'…' }
     replace:   { target:'#box', html:'…' }        → sets innerHTML
     setText:   { target:'#count', text:'6' }
     toast:     'One-line message that fades away.'
     explain:   { title:'What just happened', html:'<p>…</p>' }
     once:      true                               → fires at most once
   Anything clickable NOT covered by an action shows a "not wired up" toast
   automatically, so nothing feels broken.

   ------------------------------ HOUSE RULES ---------------------------------
   * Give every hotspot target a `data-h="name"` attribute and select on that.
     Never select on a class you might reuse — you will hit the wrong node.
   * BACKSLASHES: the file is called  journal\week6.md  — in a JS string you
     MUST write 'journal\\week6.md'. Writing '\w' silently becomes 'w'.
     In HTML attributes/text, one backslash is fine.
   * Apostrophes: this file uses single-quoted JS strings, so write \' or use
     the typographic ' (U+2019). The second reads better anyway.
   * Icons: <svg class="octicon"><use href="#oct-NAME"/></svg>.
     Available: repo repo-locked file file-directory-fill git-branch git-commit
     git-pull-request git-merge issue-opened issue-closed comment star eye
     repo-forked code play table shield graph gear search plus triangle-down
     check check-circle x lock book history pencil trash copy kebab-horizontal
     three-bars mark-github download link-external dot-fill tag people clock
     alert bell milestone info light-bulb question sync rocket organization
     arrow-left arrow-right
   * Avatars: <span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>
     The engine paints a deterministic identicon. Never use an <img>.
   * No emoji inside the fake GitHub chrome. Emoji are fine in tutorial prose.
   ========================================================================== */

MODULES.push({
  id: 'repo-anatomy',
  num: 2,
  title: 'Anatomy of a repository page',
  blurb: 'Your repo page has about thirty things on it. Here is what every single one is for, why it exists, and which ones you will actually touch this semester.',
  goals: [
    'Point at any part of a GitHub repo page and say what it does and why it is there',
    'Read a GitHub URL and know where you are before the page finishes loading',
    'Tell the difference between a file and a folder in the file list — and spot when you have accidentally made the wrong one',
    'Find the history of a project from its front page in two clicks'
  ],
  sections: [

  {type:'prose', html:
    '<p class="tut-lead">A repository page looks busy because it is doing four different jobs at once. ' +
    'It is a file browser, a history book, a discussion forum and a settings panel, all stacked on one screen. ' +
    'Once you know which strip of the page belongs to which job, the clutter turns into a map.</p>' +
    '<p>Here is the repo we will work in. Not a screenshot — a working replica. Every numbered amber marker opens ' +
    'an explanation of the thing it points at. You can click the markers in any order, or press ' +
    '<strong>Walk me through it</strong> and be led through all 35 in reading order. Arrow keys work too.</p>' +
    '<p>Some of the page is genuinely clickable: the tabs switch, the file rows open, the dropdowns drop down, ' +
    'the commit history loads. Nothing you do here touches your real account, so poke at everything.</p>'
  },

  {type:'callout', variant:'tip', title:'Before you start: the four strips',
   html:
    '<p><strong>Strip 1 — the black bar at the very top.</strong> That belongs to GitHub the website, not to your ' +
    'project. It is the same on every page you will ever see. Search, notifications, your avatar.</p>' +
    '<p><strong>Strip 2 — your repo’s name and the Watch/Fork/Star buttons.</strong> Identity and social. Who owns ' +
    'this, what is it called, who can see it, who is following it.</p>' +
    '<p><strong>Strip 3 — the tab row (Code, Issues, Pull requests…).</strong> Nine different rooms inside the same ' +
    'project. You are in the Code room right now.</p>' +
    '<p><strong>Strip 4 — everything below that.</strong> The contents of whichever room you are in. Right now: your ' +
    'files, your latest commit, and your README.</p>'
  },

  /* ==================== THE MAIN SCREEN ==================== */
  {type:'screen',
   id:'repo-home',
   label:'github.com/jordan-lee/trading-journal-practice — your real repo, rebuilt',
   url:'github.com/jordan-lee/trading-journal-practice',
   initial:'root',
   inertNote:'That control is real on GitHub but inert in this lesson. The amber markers and the tabs, file rows, dropdowns and “5 Commits” link are the live parts.',

   views:{

    /* ---------- THE CODE TAB (the repo front page) ---------- */
    root:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert aria-label="Menu"><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark" data-h="ghmark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox" data-h="topsearch"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type <span style="font-family:var(--font-mono)">/</span> to search</span>' +
          '<span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-topnav__actions">' +
          '<span class="gh-navbtn gh-navbtn--bordered" data-h="plusmenu"><svg class="octicon"><use href="#oct-plus"/></svg><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-navbtn" data-h="navissues" title="Issues"><svg class="octicon"><use href="#oct-issue-opened"/></svg></span>' +
          '<span class="gh-navbtn" data-h="navprs" title="Pull requests"><svg class="octicon"><use href="#oct-git-pull-request"/></svg></span>' +
          '<span class="gh-navbtn" data-h="navinbox" title="Inbox"><svg class="octicon"><use href="#oct-bell"/></svg><i class="gh-navbtn__dot"></i></span>' +
          '<span class="gh-avatar gh-avatar--32 gh-topnav__avatar" data-h="navavatar" data-user="jordan-lee"></span>' +
        '</span>' +
      '</div>' +

      '<div class="gh-repohead">' +
        '<div class="gh-repohead__row">' +
          '<div class="gh-breadcrumb">' +
            '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-h="owneravatar" data-user="jordan-lee"></span>' +
            '<span class="gh-breadcrumb__owner" data-h="owner">jordan-lee</span>' +
            '<span class="gh-breadcrumb__sep">/</span>' +
            '<span class="gh-breadcrumb__repo" data-h="reponame">trading-journal-practice</span>' +
            '<span class="gh-badge" data-h="private">Private</span>' +
          '</div>' +
          '<div class="gh-repohead__actions">' +
            '<span class="gh-btngroup" data-h="watch"><span class="gh-btn"><svg class="octicon"><use href="#oct-eye"/></svg>Watch<span class="gh-counter">0</span></span>' +
              '<span class="gh-btn gh-btn--icon"><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
            '<span class="gh-btngroup" data-h="fork"><span class="gh-btn"><svg class="octicon"><use href="#oct-repo-forked"/></svg>Fork<span class="gh-counter">0</span></span>' +
              '<span class="gh-btn gh-btn--icon"><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
            '<span class="gh-btngroup" data-h="star"><span class="gh-btn"><svg class="octicon"><use href="#oct-star"/></svg>Star<span class="gh-counter">0</span></span>' +
              '<span class="gh-btn gh-btn--icon"><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
          '</div>' +
        '</div>' +
        '<nav class="gh-tabnav"><span class="gh-tab gh-tab--active" data-h="tab-code"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab" data-h="tab-issues"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab" data-h="tab-pulls"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab" data-h="tab-agents"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab" data-h="tab-actions"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab" data-h="tab-projects"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab" data-h="tab-security"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab" data-h="tab-insights"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab" data-h="tab-settings"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav>' +
      '</div>' +

      '<div class="gh-page"><div class="gh-layout">' +
        '<div>' +

          '<div class="gh-repotoolbar">' +
            '<span class="gh-menuwrap">' +
              '<span class="gh-branchsel" data-h="branchsel"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<div class="gh-menu" id="branch-menu">' +
                '<div class="gh-menu__hd">Switch branches/tags</div>' +
                '<div class="gh-menu__sec">Branches</div>' +
                '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-check"/></svg><span>main<small>default</small></span></div>' +
                '<div class="gh-menu__sec">Tags</div>' +
                '<div class="gh-menu__item"><span class="gh-muted">Nothing to show</span></div>' +
              '</div>' +
            '</span>' +
            '<span class="gh-refstats">' +
              '<span class="gh-refstat" data-h="branchcount"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>1</b>&nbsp;Branch</span>' +
              '<span class="gh-refstat" data-h="tagcount"><svg class="octicon"><use href="#oct-tag"/></svg><b>0</b>&nbsp;Tags</span>' +
            '</span>' +
            '<span class="gh-toolbar-right">' +
              '<span class="gh-gotofile" data-h="gotofile"><svg class="octicon"><use href="#oct-search"/></svg>Go to file<span class="gh-gotofile__slash">t</span></span>' +
              '<span class="gh-menuwrap">' +
                '<span class="gh-btn" data-h="addfile">Add file<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
                '<div class="gh-menu gh-menu--right" id="addfile-menu">' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-pencil"/></svg>Create new file</div>' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-download"/></svg>Upload files</div>' +
                '</div>' +
              '</span>' +
              '<span class="gh-menuwrap">' +
                '<span class="gh-btn gh-btn--primary" data-h="codebtn"><svg class="octicon"><use href="#oct-code"/></svg>Code<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
                '<div class="gh-menu gh-menu--right gh-menu--wide" id="code-menu">' +
                  '<div class="gh-menu__hd">Clone</div>' +
                  '<div class="gh-menu__item"><span class="gh-mono" style="overflow:hidden;text-overflow:ellipsis">https://github.com/jordan-lee/trading-journal-practice.git</span><svg class="octicon" style="margin-left:auto"><use href="#oct-copy"/></svg></div>' +
                  '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-download"/></svg>Download ZIP</div>' +
                '</div>' +
              '</span>' +
            '</span>' +
          '</div>' +

          '<div class="gh-filebox">' +
            '<div class="gh-filebox__head" data-h="latestcommit">' +
              '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
              '<span class="gh-commitauthor">jordan-lee</span>' +
              '<span class="gh-commitmsg">Update journal\\week6.md</span>' +
              '<span class="gh-commitmeta">' +
                '<span class="gh-sha" data-h="sha">109d091</span>' +
                '<button class="gh-copybtn" type="button" data-h="copysha" aria-label="Copy the full commit SHA"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                '<span>·</span><span>29 minutes ago</span>' +
                '<span class="gh-commitcount" data-h="commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>5</b>&nbsp;Commits</span>' +
              '</span>' +
            '</div>' +
            '<div class="gh-filerow" data-h="row-readme">' +
              '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
              '<span class="gh-filerow__name">README.md</span>' +
              '<span class="gh-filerow__msg">Fix formatting in README for degree and trading alias</span>' +
              '<span class="gh-filerow__time">2 hours ago</span>' +
            '</div>' +
            '<div class="gh-filerow" data-h="row-journal">' +
              '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
              '<span class="gh-filerow__name">journal\\week6.md</span>' +
              '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
              '<span class="gh-filerow__time">29 minutes ago</span>' +
            '</div>' +
          '</div>' +

          '<div class="gh-readmebox" data-h="readmebox">' +
            '<div class="gh-readmebox__head"><h2><svg class="octicon"><use href="#oct-book"/></svg>README</h2>' +
              '<span class="gh-readmebox__tools"><span class="gh-btn gh-btn--invisible gh-btn--icon" data-inert><svg class="octicon"><use href="#oct-pencil"/></svg></span></span>' +
            '</div>' +
            '<div class="gh-readmebox__body"><div class="gh-markdown">' +
              '<h1>Jordan Lee -- desk profile</h1>' +
              '<p data-h="degree-line"><strong>Degree:</strong> Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor</p>' +
              '<h2>Markets I want to trade this semester</h2>' +
              '<ul><li>Index futures, FX majors</li><li data-h="all-above">all of the above 2</li></ul>' +
              '<h2>One market story that hooked me</h2>' +
              '<p data-h="story-line">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</p>' +
            '</div></div>' +
          '</div>' +

        '</div>' +

        '<div class="gh-side">' +
          '<div class="gh-sidecard" data-h="about">' +
            '<div class="gh-sidecard__hd"><h2>About</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">No description, website, or topics provided.</p>' +
            '<div class="gh-metalist">' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-book"/></svg>Readme</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-graph"/></svg>Activity</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-star"/></svg><b>0</b>&nbsp;stars</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-eye"/></svg><b>0</b>&nbsp;watching</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-repo-forked"/></svg><b>0</b>&nbsp;forks</span>' +
            '</div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="releases">' +
            '<div class="gh-sidecard__hd"><h2>Releases</h2></div>' +
            '<p class="gh-sidecard__empty">No releases published</p>' +
            '<span class="gh-sidelink">Create a new release</span>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="packages">' +
            '<div class="gh-sidecard__hd"><h2>Packages</h2></div>' +
            '<p class="gh-sidecard__empty">No packages published</p>' +
            '<span class="gh-sidelink">Publish your first package</span>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="contributors">' +
            '<div class="gh-sidecard__hd"><h2>Contributors</h2><span class="gh-counter">1</span></div>' +
            '<div class="gh-contribrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-link">jordan-lee</span></div>' +
          '</div>' +
        '</div>' +

      '</div></div>'
    },

    /* ---------- ISSUES TAB (empty, which is the point) ---------- */
    issues:{ url:'github.com/jordan-lee/trading-journal-practice/issues', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab" data-h="back-code"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab" data-h="to-pulls"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page"><div class="gh-blankslate gh-blankslate--dashed">' +
        '<svg class="octicon"><use href="#oct-issue-opened"/></svg>' +
        '<h3>Welcome to Issues!</h3>' +
        '<p>Issues are used to track todos, bugs, feature requests, and more.</p>' +
        '<span class="gh-btn gh-btn--primary">New issue</span>' +
      '</div></div>'
    },

    /* ---------- PULL REQUESTS TAB ---------- */
    pulls:{ url:'github.com/jordan-lee/trading-journal-practice/pulls', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab" data-h="back-code"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab" data-h="to-issues"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page"><div class="gh-blankslate gh-blankslate--dashed">' +
        '<svg class="octicon"><use href="#oct-git-pull-request"/></svg>' +
        '<h3>Welcome to pull requests!</h3>' +
        '<p>Pull requests help you collaborate on code with other people. As pull requests are created, they’ll appear here in a searchable and filterable list.</p>' +
      '</div></div>'
    },

    /* ---------- COMMIT HISTORY ---------- */
    commits:{ url:'github.com/jordan-lee/trading-journal-practice/commits/main', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div>' +
        '<div class="gh-repohead__actions"><span class="gh-btn" data-h="back-code">' +
          '<svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the Code tab</span></div></div></div>' +
      '<div class="gh-page">' +
        '<div class="gh-repotoolbar"><span class="gh-branchsel"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
          '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-muted" style="margin-left:8px">Commits on main</span></div>' +
        '<div class="gh-commitgroup"><div class="gh-commitgroup__date"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits on Aug 7, 2026</div>' +
        '<div class="gh-commitlist" id="commit-list">' +
          '<div class="gh-commitrow" data-h="commit-latest"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Update journal\\week6.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 29 minutes ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-verified">Verified</span>' +
            '<span class="gh-shabox"><button class="gh-copybtn" type="button"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
            '<span class="gh-shabox__sha">109d091</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Fix formatting in README for degree and trading alias</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 2 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-verified">Verified</span>' +
            '<span class="gh-shabox"><button class="gh-copybtn" type="button"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
            '<span class="gh-shabox__sha">a4f21c8</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Update README.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-verified">Verified</span>' +
            '<span class="gh-shabox"><button class="gh-copybtn" type="button"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
            '<span class="gh-shabox__sha">7b0e5da</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Create README.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-verified">Verified</span>' +
            '<span class="gh-shabox"><button class="gh-copybtn" type="button"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
            '<span class="gh-shabox__sha">3c9d114</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Initial commit</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-verified">Verified</span>' +
            '<span class="gh-shabox"><button class="gh-copybtn" type="button"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
            '<span class="gh-shabox__sha">e18b7f2</span></span></span></div>' +
        '</div></div>' +
      '</div>'
    },

    /* ---------- THE BACKSLASH FILE, OPENED ---------- */
    blobJournal:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/journal%5Cweek6.md', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath" data-h="blobpath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part" data-h="back-code">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span>' +
            '<span class="gh-filepath__cur">journal\\week6.md</span>' +
          '</div>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-code"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the Code tab</span>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">Preview</span>' +
            '<span class="gh-muted">|</span><span>Code</span><span class="gh-muted">|</span><span>Blame</span>' +
            '<span class="gh-blob__tools"><span class="gh-btn gh-btn--invisible gh-btn--icon"><svg class="octicon"><use href="#oct-pencil"/></svg></span>' +
            '<span class="gh-btn gh-btn--invisible gh-btn--icon"><svg class="octicon"><use href="#oct-trash"/></svg></span></span></div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr><td class="gh-blob__ln">1</td><td class="gh-blob__code"># Week 6 journal</td></tr>' +
            '<tr><td class="gh-blob__ln">2</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">3</td><td class="gh-blob__code">Notes from this week go here.</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    },

    /* ---------- README, OPENED AS A FILE ---------- */
    blobReadme:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part" data-h="back-code">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
          '</div>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-code"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the Code tab</span>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">Code</span>' +
            '<span class="gh-muted">|</span><span>Blame</span><span class="gh-muted" style="margin-left:8px">10 lines · 322 Bytes</span>' +
            '<span class="gh-blob__tools"><span class="gh-btn gh-btn--invisible gh-btn--icon" data-h="pencil"><svg class="octicon"><use href="#oct-pencil"/></svg></span></span></div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr><td class="gh-blob__ln">1</td><td class="gh-blob__code"># Jordan Lee -- desk profile</td></tr>' +
            '<tr><td class="gh-blob__ln">2</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">3</td><td class="gh-blob__code">**Degree:** Economics (Finance), year 3</td></tr>' +
            '<tr><td class="gh-blob__ln">4</td><td class="gh-blob__code">*Trading alias:* e.g. IronCondor</td></tr>' +
            '<tr><td class="gh-blob__ln">5</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">6</td><td class="gh-blob__code">## Markets I want to trade this semester</td></tr>' +
            '<tr><td class="gh-blob__ln">7</td><td class="gh-blob__code">- Index futures, FX majors</td></tr>' +
            '<tr><td class="gh-blob__ln">8</td><td class="gh-blob__code">- all of the above 2</td></tr>' +
            '<tr><td class="gh-blob__ln">9</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">10</td><td class="gh-blob__code">## One market story that hooked me</td></tr>' +
            '<tr><td class="gh-blob__ln">11</td><td class="gh-blob__code">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    }
   },

   /* ==================== INTERACTIONS ==================== */
   actions:[
     {on:'[data-h="tab-issues"]', view:'issues', explain:{title:'You changed rooms, not projects',
       html:'<p>The URL bar above the page changed from <code>…/trading-journal-practice</code> to ' +
            '<code>…/trading-journal-practice/issues</code>. Same repo, different room.</p>' +
            '<p>Yours is empty because you have never opened an issue. That “Welcome to Issues!” panel is ' +
            'GitHub’s <strong>empty state</strong> — it appears instead of a blank page so you know nothing is broken, ' +
            'there is just nothing here yet. You will see empty states all over GitHub.</p>' +
            '<p>Click <strong>Code</strong> in the tab row to come back.</p>'}},
     {on:'[data-h="tab-pulls"]', view:'pulls', explain:{title:'Pull requests: also empty, also fine',
       html:'<p>A pull request is a proposal: “here are some changes, please look at them before they go in.” ' +
            'You have never made one, so there is nothing here.</p>' +
            '<p>Module 6 builds one end to end. For now the useful thing to notice is that the tab count says ' +
            '<strong>0</strong>, and GitHub shows counts on tabs precisely so you can tell at a glance whether ' +
            'something needs your attention without clicking.</p>'}},
     {on:'[data-h="to-issues"]', view:'issues'},
     {on:'[data-h="to-pulls"]', view:'pulls'},
     {on:'[data-h="back-code"]', view:'root'},
     {on:'[data-h="tab-actions"]', toast:'Actions runs automated jobs when you push. Nothing to run in this repo — Module 10 covers it.'},
     {on:'[data-h="tab-projects"]', toast:'Projects is a kanban board attached to the repo. Module 7 touches on it.'},
     {on:'[data-h="tab-agents"]', toast:'Agents is where you hand a task to GitHub’s AI coding agent and get back a pull request to review.'},
     {on:'[data-h="tab-security"]', toast:'Security and quality is where GitHub reports vulnerable dependencies. A folder of Markdown files has none.'},
     {on:'[data-h="tab-insights"]', toast:'Insights is charts about the repo — commits over time, who contributed. Module 8 uses it.'},
     {on:'[data-h="tab-settings"]', toast:'Settings is where Private becomes Public. That is Module 9 — it deserves its own module.'},
     {on:'[data-h="branchsel"]', toggle:{target:'#branch-menu', class:'is-open'}},
     {on:'[data-h="addfile"]', toggle:{target:'#addfile-menu', class:'is-open'}},
     {on:'[data-h="codebtn"]', toggle:{target:'#code-menu', class:'is-open'}},
     {on:'[data-h="copysha"]', toast:'Copied <span style="font-family:var(--font-mono)">109d091f4b2a8c6d3e07…</span> — the full 40-character commit ID.'},
     {on:'[data-h="commitcount"]', view:'commits', explain:{title:'This is the whole history of your repo',
       html:'<p>Five commits, newest first. Every one of them is a permanent, named save point that you can go ' +
            'back to. Nothing here can be silently overwritten.</p>' +
            '<p>Read one row: <strong>who</strong> made the change, <strong>what</strong> they called it, ' +
            '<strong>when</strong>, and the short ID on the right. That is the same four facts a trade blotter ' +
            'records, and for the same reason — so that six weeks later nobody has to trust anyone’s memory.</p>' +
            '<p>Notice your commit messages: <em>“Update journal\\week6.md”</em> and <em>“Create README.md”</em> ' +
            'are the ones GitHub wrote for you when you did not type your own. <em>“Fix formatting in README for ' +
            'degree and trading alias”</em> is one you wrote. Compare how much more useful yours is. Module 4 is ' +
            'all about this.</p>'}},
     {on:'[data-h="row-journal"]', view:'blobJournal', explain:{title:'Look at the file path at the top',
       html:'<p>It reads <code>trading-journal-practice / journal\\week6.md</code>. One slash-separated step: the repo, ' +
            'then the file. There is no <code>journal</code> step in between, because there is no ' +
            '<code>journal</code> folder.</p>' +
            '<p>Compare it to what you meant: <code>trading-journal-practice / journal / week6.md</code> — three steps, ' +
            'because <code>journal</code> would be a real level in the path.</p>' +
            '<p>Look at the URL too. GitHub had to write the backslash as <code>%5C</code>, which is what URLs do ' +
            'to characters that are not supposed to be in a path. That <code>%5C</code> is the smoking gun.</p>' +
            '<p>Nothing is broken and no data is lost. It is a naming mistake, and Module 3 fixes it in about ' +
            'twenty seconds.</p>'}},
     {on:'[data-h="row-readme"]', view:'blobReadme', explain:{title:'The same README, but as source',
       html:'<p>The front page showed you README.md <strong>rendered</strong>. This is the same file ' +
            '<strong>raw</strong> — the actual characters you typed, with line numbers.</p>' +
            '<p>Now the formatting makes sense. <code>#</code> at the start of a line means heading. ' +
            '<code>**bold**</code> and <code>*italic*</code> are asterisks. <code>-</code> starts a bullet.</p>' +
            '<p>And here is the thing worth staring at: lines 3 and 4 are separate lines in the source, but on the ' +
            'front page they rendered as one run-on sentence. That is not a bug in GitHub. In Markdown a single ' +
            'newline is not a line break — you need a blank line between them, or two spaces at the end of line 3. ' +
            'Your commit “Fix formatting in README for degree and trading alias” was you noticing this. It is ' +
            'still not fixed.</p>'}}
   ],

   /* ==================== HOTSPOTS ==================== */
   hotspots:[

    {sel:'[data-h="topsearch"]', place:'bottom', title:'The search box (and the “/” hint)',
     what:'<p>GitHub’s global search. It searches whatever context you are in — inside this repo by default, or across all of GitHub if you widen it.</p>',
     why:'<p>Big projects have thousands of files. Scrolling to find one is hopeless, so GitHub made search the fastest thing on the page and put a keyboard shortcut on it.</p>',
     how:'<p>Click it, or just press <code>/</code> anywhere on the page — that is what the little <code>/</code> box on the right is telling you. Type, hit Enter.</p>',
     fail:'<p>Press <code>/</code> while your cursor is inside a text box and you will type a slash into your work instead of opening search. Click on empty page background first.</p>',
     when:'<p>Six weeks from now when you cannot remember whether your trading notes went in the journal file or the README. Search for <code>IronCondor</code> and GitHub tells you.</p>'},

    {sel:'[data-h="plusmenu"]', place:'bottom', title:'The “+” create menu',
     what:'<p>The shortcut for making something new: a repository, an import, a gist, an organization.</p>',
     why:'<p>Creating a repo used to mean hunting for a button on your profile page. GitHub moved it to the top bar so it is one click from anywhere.</p>',
     how:'<p>Click the <strong>+</strong>, choose <em>New repository</em>, give it a name, choose Public or Private, tick “Add a README file”, click Create.</p>',
     fail:'<p>People create a second repo when they meant to add a file to an existing one, then end up with their work split across two places and no idea which is current.</p>',
     when:'<p>Next semester when a different unit asks for a GitHub link, or the first time you want somewhere to keep a personal project.</p>'},

    {sel:'[data-h="navinbox"]', place:'bottom', title:'Notifications (the bell with the blue dot)',
     what:'<p>Your GitHub inbox. A blue dot means something happened that involves you — someone commented, replied, or asked for your review.</p>',
     why:'<p>Conversations on GitHub happen inside issues and pull requests, not in your email. Without a central inbox you would have to revisit every project to check for replies.</p>',
     how:'<p>Click the bell. Items are grouped by repository. Click one to jump to the exact comment; click the tick to mark it done and clear it.</p>',
     fail:'<p>Ignore it for a month and you will have a hundred unread items, at which point you stop reading it entirely and genuinely miss things your tutor wrote.</p>',
     when:'<p>The moment your tutorial repo gets a comment from a marker, or when you contribute to someone else’s project and they reply.</p>'},

    {sel:'[data-h="navavatar"]', place:'left', title:'Your avatar (the account menu)',
     what:'<p>The menu for everything that belongs to <em>you</em> rather than to this project: your profile, your repositories, your account settings, sign out.</p>',
     why:'<p>GitHub separates “settings for this repo” from “settings for me”. Two different gears, two different places. Mixing them up is the single most common beginner confusion.</p>',
     how:'<p>Click your avatar → <em>Your profile</em> to see what a stranger sees. → <em>Settings</em> for your account, your email, your name, your profile picture.</p>',
     fail:'<p>You go looking for “make this repo public” in here and cannot find it, because that lives in the repo’s own Settings tab. Different gear.</p>',
     when:'<p>Right now, honestly — your profile is the page a recruiter lands on, and it is currently blank.</p>'},

    {sel:'[data-h="owner"]', place:'bottom', title:'The owner: jordan-lee',
     what:'<p>The account this repository belongs to. Yours. Every repo on GitHub is owned by exactly one account, either a person or an organization.</p>',
     why:'<p>Two different people can both have a repo called <code>trading-journal-practice</code>. The owner is what keeps them apart — the real name of this project is <strong>jordan-lee/trading-journal-practice</strong>, never just the second half.</p>',
     how:'<p>Click the owner name to land on your profile: every repo you own, your contribution graph, your pinned projects.</p>',
     fail:'<p>You send a classmate “the trading-journal-practice repo” with no owner. There is no such thing. They cannot find it, and they would not be able to open yours anyway because it is Private.</p>',
     when:'<p>Any time you paste a GitHub link. Owner plus repo name, or it is not an address.</p>'},

    {sel:'[data-h="reponame"]', place:'bottom', title:'The repository name: trading-journal-practice',
     what:'<p>The name of this project. A repository — “repo” — is one project’s folder of files plus the complete history of every change ever made to them.</p>',
     why:'<p>Keeping files and their history in one named box is the whole idea. It is why you can ask “what did this look like last Tuesday” and get an answer, which a folder on your laptop can never do.</p>',
     how:'<p>Click the name from anywhere inside the repo to come back to this front page. It is the “home” button for the project.</p>',
     fail:'<p>Renaming a repo later breaks every link anyone has to it. GitHub does redirect old links, but only until someone else claims the old name. Name it properly on day one.</p>',
     when:'<p>When you start your next project and have to name it. Lowercase, hyphens not spaces, and something you will still recognise in a year.</p>'},

    {sel:'[data-h="private"]', place:'right', title:'The Private badge',
     what:'<p>A one-word answer to “who can see this?” Private means you and nobody else. Public means the entire internet, no login required.</p>',
     why:'<p>GitHub started as a place to publish code openly. Private repos came later, for work you are not ready to show. The badge exists so you never have to guess which kind you are looking at.</p>',
     how:'<p>You change it in <strong>Settings → General → Danger Zone → Change repository visibility</strong>. It is deliberately buried, because it is not a decision to make by accident.</p>',
     fail:'<p>Two opposite failures. Flip a repo public with an API key or a password inside it and you have leaked it — and deleting the file later does <em>not</em> help, because the old version is still in the history. Leave it private forever and your tutor cannot open the link you submitted.</p>',
     when:'<p>Right now it should stay Private — it is unfinished coursework. The moment it is something you would show an employer, that decision flips. Module 9.</p>'},

    {sel:'[data-h="watch"]', place:'top', title:'Watch',
     what:'<p>Subscribe to notifications from this repo. “All Activity” pings you on every issue, comment and release; “Participating” only pings you when someone actually mentions you.</p>',
     why:'<p>On a busy open-source project hundreds of things happen a day. Watch lets you choose your own volume instead of getting everything or nothing.</p>',
     how:'<p>Click <strong>Watch</strong> → pick a level. You are automatically watching your own repos, which is why the count says 0 but you still get notified.</p>',
     fail:'<p>Watch a huge popular project on “All Activity” and your notifications inbox is destroyed within a day. Almost always pick “Participating and @mentions”.</p>',
     when:'<p>When you find a library you depend on and want to know when it releases a breaking change — not for a two-file coursework repo.</p>'},

    {sel:'[data-h="fork"]', place:'top', title:'Fork',
     what:'<p>Make your own complete copy of somebody else’s repo, under your account, that remembers where it came from.</p>',
     why:'<p>You cannot change a stranger’s repo — you have no permission. Forking gives you a copy you fully control, and because it stays linked to the original you can later offer your changes back as a pull request.</p>',
     how:'<p>On someone else’s repo, click <strong>Fork</strong>. You land on <code>your-name/their-repo</code>. Edit freely. If your change is worth sharing, open a pull request back to theirs.</p>',
     fail:'<p>People fork their own repo to “make a backup”, end up with two copies, edit the wrong one for a week, and lose track of which is real. Use a branch for that, not a fork.</p>',
     when:'<p>The first time you find someone’s trading-strategy notebook on GitHub and want to change the parameters and run it yourself.</p>'},

    {sel:'[data-h="star"]', place:'top', title:'Star',
     what:'<p>A bookmark that is also a public vote. Starring a repo saves it to your list and adds one to its counter.</p>',
     why:'<p>There is no ranking authority on GitHub. Stars became the crowd’s way of saying “this one is worth your time”, which is why you see “45k stars” quoted like a credential.</p>',
     how:'<p>Click <strong>Star</strong>. Find everything you starred later at <code>github.com/stars</code>.</p>',
     fail:'<p>Star count is popularity, not quality or maintenance. Plenty of 20k-star projects have been abandoned for three years. Check the latest commit date before you trust one.</p>',
     when:'<p>Every time you find a repo you will want again — a finance data library, a LaTeX template, someone’s beautiful README you want to copy the structure of.</p>'},

    {sel:'[data-h="tab-code"]', place:'bottom', title:'The Code tab (you are here)',
     what:'<p>The files themselves, as they exist right now on the <code>main</code> branch, plus your README displayed underneath.</p>',
     why:'<p>Ninety percent of visits to a repo are “show me what is in here”. GitHub makes that the default landing page and puts everything else behind a tab.</p>',
     how:'<p>The orange underline tells you which tab you are on. Click any file row to open it; click the repo name to come back here.</p>',
     fail:'<p>You edit a file, do not commit, navigate away, and lose the edit. The Code tab shows committed state only — an uncommitted edit exists nowhere except your browser tab.</p>',
     when:'<p>Every single time you open the repo. This is the front door.</p>'},

    {sel:'[data-h="tab-issues"]', place:'bottom', title:'Issues (count: 0)',
     what:'<p>A to-do list and a discussion thread rolled into one, attached to the project rather than to a person.</p>',
     why:'<p>“I will remember to fix that” does not survive a week. Issues exist so a task lives next to the code it concerns, with a number, a status and a conversation.</p>',
     how:'<p>Click the tab → <strong>New issue</strong> → title, description, Submit. It gets a number like <code>#1</code>. Type “Fixes #1” in a later commit and GitHub closes it for you automatically.</p>',
     fail:'<p>Writing an issue titled “fix stuff”. Three weeks later it means nothing to you and nothing to anyone else. One issue, one specific problem, in a sentence.</p>',
     when:'<p>Right now you could open one: “README still has template placeholders — replace IronCondor and ‘all of the above 2’ with real answers.” Module 7.</p>'},

    {sel:'[data-h="tab-pulls"]', place:'bottom', title:'Pull requests (count: 0)',
     what:'<p>A formal proposal to merge one branch into another, with a diff, a discussion and an approval step.</p>',
     why:'<p>Letting anyone write straight into the main version of a project is how things get broken silently. A pull request forces changes to be visible and reviewable before they land.</p>',
     how:'<p>Make a branch → change something → GitHub offers “Compare & pull request” → describe it → someone reviews → <strong>Merge pull request</strong>.</p>',
     fail:'<p>Committing straight to <code>main</code> every time. It works alone, but the day you work with anyone else you overwrite their work and there was no moment where either of you could have caught it.</p>',
     when:'<p>Any group assignment, and every open-source contribution you ever make. Module 6.</p>'},

    {sel:'[data-h="tab-actions"]', place:'bottom', title:'Actions',
     what:'<p>Automation. You describe jobs that run on GitHub’s computers whenever something happens in the repo — every push, every pull request, every morning at 9am.</p>',
     why:'<p>“Run the tests before merging” is the sort of rule humans forget and machines never do. Actions removes the human.</p>',
     how:'<p>You add a YAML file under <code>.github/workflows/</code>. Each run appears here as a green tick or a red cross.</p>',
     fail:'<p>Actions runs on GitHub’s servers, on a clock, with a free-tier limit. A workflow that accidentally loops can burn your quota in an afternoon.</p>',
     when:'<p>Not this semester. But it is how a real quant repo automatically re-runs a backtest every time the strategy changes. Module 10.</p>'},

    {sel:'[data-h="tab-projects"]', place:'bottom', title:'Projects',
     what:'<p>A kanban board — To do / In progress / Done — where the cards are your issues and pull requests.</p>',
     why:'<p>Once a project has thirty open issues, a flat list stops being a plan. A board shows what is actually being worked on right now.</p>',
     how:'<p>New project → add a view → drag issues between columns. Moving a card can close the issue automatically.</p>',
     fail:'<p>Setting up an elaborate board for a two-person assignment and then never opening it. Boards are worth it above roughly fifteen live tasks, not below.</p>',
     when:'<p>A group project with four people and a deadline, where “who is doing what” is a real question.</p>'},

    {sel:'[data-h="tab-agents"]', place:'bottom', title:'Agents',
     what:'<p>The newest tab on this bar. You describe a task in plain English, GitHub’s AI coding agent goes away and attempts it on its own branch, and it comes back as a pull request waiting for you.</p>',
     why:'<p>GitHub already had a very good machine for “someone proposes a change, a human reads it and decides”. That is the pull request, and it is Module 6. Once that machine exists, the safest way to let an AI write anything is to make it use the same front door as every other contributor — propose, don’t apply.</p>',
     how:'<p>Click Agents → describe the task → it opens a branch, makes commits, and raises a pull request. You then review that PR exactly like a human’s: read the diff, comment on lines, merge it or close it.</p>',
     fail:'<p>Treating its output as finished work. It opens a <em>request</em>, not a merge — nothing reaches <code>main</code> until you press the green button yourself. The other failure is academic: check your unit’s rules on AI assistance before you let it near anything you submit for marks. a finance unit is not a coding unit, and “the agent wrote it” is not a defence.</p>',
     when:'<p>Almost never on a two-file Markdown repo — there is nothing here worth delegating. It earns its place on a project big enough that “rename this thing in eleven files” is a genuine chore.</p>',
     note:'<p><strong>Why your tab bar might not match a screenshot online:</strong> these tabs are per-repo settings, not fixed furniture. Wiki, Discussions and Projects can each be switched off, and a repo with them off does not show the tab at all. Yours has Wiki and Discussions off, which is why you see nine tabs and someone else sees eleven. Module 9 shows you the actual toggles.</p>'},

    {sel:'[data-h="tab-security"]', place:'bottom', title:'Security and quality',
     what:'<p>GitHub’s automated warnings: known vulnerabilities in libraries you depend on, and accidentally committed secrets like API keys.</p>',
     why:'<p>Most security holes are not exotic — they are an out-of-date library nobody noticed. GitHub scans for those and tells you.</p>',
     how:'<p>Turn on Dependabot alerts here. When a dependency has a published vulnerability, GitHub opens a pull request that upgrades it for you.</p>',
     fail:'<p>Ignoring the alerts. Also: this tab does not scan for secrets in a private repo the way it does in a public one, so “it did not warn me” is not proof a key is safe.</p>',
     when:'<p>The first time you build something with real dependencies — a Python project with a <code>requirements.txt</code>, for instance.</p>'},

    {sel:'[data-h="tab-insights"]', place:'bottom', title:'Insights',
     what:'<p>Charts about the repo itself: commits over time, who contributed how much, how long issues stay open.</p>',
     why:'<p>Every commit is already a timestamped record, so the graphs are free. GitHub just draws what is already there.</p>',
     how:'<p>Insights → <strong>Network</strong> is the useful one: a picture of every branch and where it split and rejoined. It makes branching click faster than any explanation.</p>',
     fail:'<p>Treating commit count as effort. One person writing “Update file” forty times beats someone who wrote one careful commit, and it means nothing.</p>',
     when:'<p>When Module 5 leaves you unsure what a branch actually looks like — come here and look at the picture.</p>'},

    {sel:'[data-h="tab-settings"]', place:'bottom', title:'Settings (this repo’s settings, not yours)',
     what:'<p>Everything about how <em>this repository</em> behaves: its name, its visibility, who can write to it, which branches are protected, and the Danger Zone at the bottom.</p>',
     why:'<p>Repos need per-project rules — a group assignment needs collaborators, a public repo needs branch protection — and those cannot live in your personal account settings.</p>',
     how:'<p>You only see this tab on repos you own or administer. Two things you will genuinely use: <strong>Collaborators</strong>, and <strong>Danger Zone → Change visibility</strong>.</p>',
     fail:'<p>Confusing it with the Settings under your avatar. Also: “Delete this repository” is at the bottom of this page and it is permanent. Nothing recovers it.</p>',
     when:'<p>When you add a group member, and at the end of semester when you decide whether this becomes public. Module 9.</p>'},

    {sel:'[data-h="branchsel"]', place:'bottom', title:'The branch selector — it says “main”',
     what:'<p>A dropdown showing which version of the project you are currently looking at. <code>main</code> is the default branch: the official, current one.</p>',
     why:'<p>A repo can hold several parallel versions at once. Something has to tell you which one is on screen, or you would edit the wrong one and never know.</p>',
     how:'<p>Click it (go on — it opens). You will see one branch, <code>main</code>, marked default. Choosing another branch reloads the file list as that branch sees it.</p>',
     fail:'<p>Switching branch, editing a file, and committing — then wondering why the change is not on the front page. It is; just not on <code>main</code>. This is the number-one branch confusion.</p>',
     when:'<p>Module 5, when you make a branch to try rewriting the README without touching the version you have already submitted.</p>'},

    {sel:'[data-h="branchcount"]', place:'bottom', title:'“1 Branch”',
     what:'<p>A count of how many parallel versions this repo currently has. Yours has exactly one: <code>main</code>.</p>',
     why:'<p>Branches are invisible from the file list, so GitHub surfaces the count here. On a real project this number tells you instantly how much unmerged work is floating around.</p>',
     how:'<p>Click it for a list of every branch, who last touched it, and how far ahead or behind <code>main</code> it is.</p>',
     fail:'<p>A repo with fourteen branches nobody has merged in months means fourteen half-finished ideas. Branches are cheap to make and easy to abandon.</p>',
     when:'<p>After Module 5, to check you actually merged the branch you made rather than leaving it dangling.</p>'},

    {sel:'[data-h="tagcount"]', place:'bottom', title:'“0 Tags”',
     what:'<p>A tag is a permanent human-readable label stuck onto one specific commit — <code>v1.0</code>, <code>submitted-week6</code>.</p>',
     why:'<p>Commit IDs like <code>109d091</code> are precise but unmemorable. Tags let you say “the version I handed in” and have it mean exactly one thing forever.</p>',
     how:'<p>Releases → Create a new release → invent a tag name → publish. The tag freezes that commit under that name.</p>',
     fail:'<p>Tags do not move. Tag a commit, then fix a typo — the tag still points at the typo. You have to delete and re-tag, which confuses anyone who already downloaded it.</p>',
     when:'<p>Genuinely useful the day you submit: tag the exact commit you handed in, so “what did I submit?” has a one-word answer.</p>'},

    {sel:'[data-h="gotofile"]', place:'top', title:'“Go to file”',
     what:'<p>A fuzzy file finder scoped to this repo. Type part of a filename and it filters as you type.</p>',
     why:'<p>Clicking through nested folders to reach one file is slow. This jumps straight there — the same trick every code editor has.</p>',
     how:'<p>Click it, or press <code>t</code> on the file list. Type <code>week6</code> and your journal file appears without you touching a folder.</p>',
     fail:'<p>It searches file <em>names</em>, not file contents. Looking for the word “IronCondor” inside a file? That is the search box at the top, not this.</p>',
     when:'<p>The moment a repo has more than about ten files. Yours has two, so it looks pointless — it will not stay that way.</p>'},

    {sel:'[data-h="addfile"]', place:'top', title:'The “Add file” dropdown',
     what:'<p>Two ways to put something new in the repo without leaving the browser: <em>Create new file</em> (type it here) or <em>Upload files</em> (drag from your computer).</p>',
     why:'<p>Git normally expects command-line tools installed on your machine. This button exists so people who have never opened a terminal can still use GitHub properly.</p>',
     how:'<p>Click it (it opens). <em>Create new file</em> gives you a filename box and a text area, then a green <strong>Commit changes</strong> button at the bottom.</p>',
     fail:'<p>This is exactly where your <code>journal\\week6.md</code> file went wrong. In that filename box, a <strong>forward slash</strong> <code>/</code> creates a folder. A backslash <code>\\</code> is just a character in the name. Hotspot 30 has the full story.</p>',
     when:'<p>Every week when you add the next journal entry — and this time you will type <code>journal/week7.md</code>.</p>'},

    {sel:'[data-h="codebtn"]', place:'top', title:'The green “Code” button',
     what:'<p>How you get the whole repo onto your own computer — either as a Git clone (a live linked copy) or a plain ZIP download (a dead snapshot).</p>',
     why:'<p>The website is fine for editing one file. Anything real happens on your machine, so there has to be a bridge, and this is it.</p>',
     how:'<p>Click it (it opens). <strong>Download ZIP</strong> is the no-setup option. The HTTPS URL is for <code>git clone</code> once you have Git installed.</p>',
     fail:'<p>Downloading the ZIP, editing files in it, and expecting GitHub to notice. It will not — a ZIP has no connection back. Changes made that way have to be uploaded manually.</p>',
     when:'<p>When a unit gives you a starter repo of Python or R and you need it in your editor rather than in a browser tab.</p>'},

    {sel:'[data-h="latestcommit"]', place:'top', title:'The latest-commit bar',
     what:'<p>A one-line summary of the most recent change to anything in this repo: who, what they called it, its ID, and when.</p>',
     why:'<p>It answers the first question anyone has about an unfamiliar repo — “is this alive?” — before you have scrolled a pixel.</p>',
     how:'<p>Click the message to see exactly what changed in that commit. Click the author to see their profile.</p>',
     fail:'<p>Your message here is <em>“Update journal\\week6.md”</em>, which GitHub wrote for you. It says what file changed and nothing about why. In three weeks that is worthless to you.</p>',
     when:'<p>Every time you land on a stranger’s repo. “Last commit: 4 years ago” tells you not to depend on it.</p>'},

    {sel:'[data-h="sha"]', place:'top', title:'109d091 — the commit ID (SHA)',
     what:'<p>The unique fingerprint of one commit. You are seeing the first 7 characters; the real one is 40 characters long.</p>',
     why:'<p>Git needs a name for every save point that cannot be duplicated or reused. It generates one from the actual content of the change, so the same ID always means the same exact state of the project.</p>',
     how:'<p>Click the copy icon next to it (try it) to grab the full ID. Paste it in a message and anyone can jump to precisely that version.</p>',
     fail:'<p>Assuming it is sequential. <code>109d091</code> is not “commit number 109” — it is not a number at all, and it tells you nothing about order. Only the dates do that.</p>',
     when:'<p>When something worked on Tuesday and does not today: you find Tuesday’s SHA and compare it to now. It is the audit-trail reference number for your project.</p>'},

    {sel:'[data-h="commitcount"]', place:'top', title:'“5 Commits”',
     what:'<p>The total number of save points in this repo, and a link to all of them.</p>',
     why:'<p>The file list only shows the present. The history is the actual asset — the thing that makes this different from a Dropbox folder — so GitHub keeps a door to it on the front page.</p>',
     how:'<p>Click it (it works). You get all five, newest first, each with its author, message, time and SHA.</p>',
     fail:'<p>Reading the number as productivity. Five thoughtful commits beat fifty called “update”. It measures how often you saved, nothing more.</p>',
     when:'<p>When you want to prove you did the work steadily rather than in one panic at 11pm — the timestamps are permanent and honest.</p>'},

    {sel:'[data-h="row-readme"]', place:'left', title:'README.md — the file row',
     what:'<p>One row per thing at the top level of the repo. This one is a <strong>file</strong>: note the plain document icon, and the message and timestamp from the last commit that touched <em>this specific file</em>.</p>',
     why:'<p>Showing per-file last-changed information turns a file list into a map of what is active and what is stale, at a glance.</p>',
     how:'<p>Click the row (it opens) to view the file. Click the commit message on the right to see what changed in it instead.</p>',
     fail:'<p>The timestamps are per file, not for the repo. A file saying “2 hours ago” next to one saying “29 minutes ago” is normal, not a sync problem.</p>',
     when:'<p>Every time you open a repo and want to know which file someone touched most recently.</p>'},

    {sel:'[data-h="row-journal"]', place:'left', title:'journal\\week6.md — and here is the mistake',
     what:'<p>This row looks like a sibling of README.md because it <em>is</em> one. It is a single file whose name happens to contain a backslash. There is no <code>journal</code> folder in this repo.</p>',
     why:'<p>GitHub builds folders from <strong>forward slashes</strong> in a path. Type <code>journal/week6.md</code> and it creates a folder called <code>journal</code> with <code>week6.md</code> inside. A backslash <code>\\</code> is Windows’ separator, and it means nothing to Git — so it stayed in the name as an ordinary character.</p>',
     how:'<p>The proof is on screen. A folder row has a blue filled-folder icon, sorts above all files, and has no per-file commit message. This row has the grey document icon and sorts alongside README.md. Click it and watch the URL — the backslash becomes <code>%5C</code>.</p>',
     fail:'<p>Nothing is broken, but nothing works the way you intended either. Add <code>journal\\week7.md</code> next week and you get a second loose file, not a tidy folder. Anyone cloning this on a Mac or Linux gets a file with a literal backslash in its name, which most tools choke on.</p>',
     when:'<p>Fix it in Module 3: open the file → pencil icon → in the filename box replace the backslash with <code>/</code> → commit. GitHub reads the <code>/</code> as “move this into a folder” and does the whole thing in one commit.</p>',
     note:'<p><strong>The rule, once:</strong> on GitHub, folders are not objects you create. They are implied by the slashes in a filename. A folder exists only for as long as a file lives inside it — delete the last file and the folder silently disappears.</p>'},

    {sel:'[data-h="readmebox"] .gh-readmebox__head', place:'left', title:'The README box',
     what:'<p>GitHub automatically finds a file called <code>README.md</code> and renders it underneath the file list. Nothing else on the page is generated from a file like this.</p>',
     why:'<p>A folder of files does not explain itself. The README is the project’s front page, and auto-rendering it means the explanation is impossible to miss.</p>',
     how:'<p>Write it in Markdown. <code>#</code> is a big heading, <code>##</code> a smaller one, <code>-</code> makes bullets, <code>**bold**</code>, <code>*italic*</code>. Click README.md in the file list to see the raw version side by side with this.</p>',
     fail:'<p>Yours still contains the template’s own instructions. <em>“e.g. IronCondor”</em> is the example, not your answer. <em>“all of the above 2”</em> is a leftover. And the angle brackets around the flash-crash paragraph are the template’s “fill this in” markers being rendered literally.</p>',
     when:'<p>Before you submit, and again before you ever make this public. The README is what a marker reads first and what a recruiter reads instead of your code.</p>'},

    {sel:'[data-h="about"] .gh-sidecard__hd', place:'right', title:'The About card',
     what:'<p>The repo’s one-line description, website link and topic tags. Yours says “No description, website, or topics provided.”</p>',
     why:'<p>Repo names are short and cryptic. The description is what appears in search results and next to your repo on your profile — often it is the only thing anyone reads.</p>',
     how:'<p>Click the gear on this card → type a description → add topics like <code>finance</code>, <code>university</code>. Thirty seconds of work.</p>',
     fail:'<p>Leaving it blank means your profile shows a list of names with no explanation. A visitor has to open each repo to find out what any of them are, so they open none.</p>',
     when:'<p>Now. “the unit trading journal and desk profile” takes ten seconds and makes the repo legible to a stranger forever.</p>'},

    {sel:'[data-h="releases"] .gh-sidecard__hd', place:'right', title:'The Releases card',
     what:'<p>Named, downloadable versions of the project — a tag plus notes plus a packaged download. Yours has none, which is correct.</p>',
     why:'<p>People downloading software do not want the messy latest commit, they want “version 2.1, tested”. Releases give the project a stable thing to point at.</p>',
     how:'<p>Create a new release → pick or invent a tag → write what changed → publish. GitHub attaches ZIP files automatically.</p>',
     fail:'<p>Publishing releases for something nobody downloads is pure ceremony. Skip it until there is a version worth naming.</p>',
     when:'<p>Not this semester. Useful the day you build a tool other people install.</p>'},

    {sel:'[data-h="packages"] .gh-sidecard__hd', place:'right', title:'The Packages card',
     what:'<p>A place to publish reusable code libraries so other projects can install them by name. Yours says “No packages published”.</p>',
     why:'<p>Releases are for humans downloading a thing. Packages are for machines installing a dependency automatically. Different audiences, different shelf.</p>',
     how:'<p>You publish from a build tool — <code>npm publish</code>, or a Python package upload — pointed at GitHub Packages. Never by clicking.</p>',
     fail:'<p>Confusing packages with releases and publishing your coursework as a library. Nobody is going to <code>import</code> your journal.</p>',
     when:'<p>Only if you ever write a piece of code you want to reuse across several of your own projects.</p>'},

    {sel:'[data-h="contributors"] .gh-sidecard__hd', place:'right', title:'The Contributors card',
     what:'<p>Everyone who has ever had a commit merged into this repo. Yours says 1, and it is you.</p>',
     why:'<p>On a shared project this is the fastest answer to “who actually built this, and who do I ask?”</p>',
     how:'<p>Click a name for their profile and their commits here. Contributors is derived from commit history — you cannot add someone by hand.</p>',
     fail:'<p>Adding a collaborator in Settings does <em>not</em> put them here. They appear only after their first merged commit. On a group assignment that difference is who did the work versus who had access.</p>',
     when:'<p>Any group project, and any time you want to check whether an open-source library is maintained by fifty people or one exhausted volunteer.</p>'}
   ]
  },

  /* ==================== AFTER THE SCREEN ==================== */
  {type:'callout', variant:'moment', title:'Teaching moment: journal\\week6.md is a file, not a folder',
   html:
    '<p>You typed a Windows-style path into GitHub’s filename box. GitHub builds folders out of ' +
    '<strong>forward slashes</strong> only, so <code>journal\\week6.md</code> did not create a <code>journal</code> ' +
    'folder containing <code>week6.md</code>. It created one file whose name literally includes a backslash.</p>' +
    '<p>You can see it on the screen above without taking anyone’s word for it: the row has the grey document icon, ' +
    'not the blue folder icon, and it sorts alongside README.md instead of above it. Open it and the URL shows ' +
    '<code>journal%5Cweek6.md</code> — <code>%5C</code> is how a URL spells a backslash.</p>' +
    '<p>Nothing is lost and nothing is broken. It is a naming mistake, and Module 3 fixes it in one commit.</p>'
  },

  {type:'compare', title:'Forward slash vs backslash, once and for all',
   left:{title:'What you typed: journal\\week6.md',
     html:'<p>One file. Name: <code>journal\\week6.md</code>. Backslash is an ordinary character to Git, exactly like a ' +
          'hyphen or a full stop.</p>' +
          '<p>Add <code>journal\\week7.md</code> next week and you get a <em>second</em> loose file at the top level. ' +
          'By week 12 your repo root is a wall of near-identical names.</p>' +
          '<p>Clone it on a Mac or Linux machine and you get a file with a backslash in its name, which a lot of ' +
          'tools refuse to handle.</p>'},
   right:{title:'What you meant: journal/week6.md',
     html:'<p>A folder called <code>journal</code> containing <code>week6.md</code>. GitHub creates the folder for you ' +
          'the moment you type the forward slash — there is no separate “new folder” button, and there never was.</p>' +
          '<p>Week 7 goes in the same folder automatically. The repo root stays two rows: <code>README.md</code> and ' +
          '<code>journal/</code>.</p>' +
          '<p>Rule to keep: on GitHub a folder is not an object you create. It is implied by the slashes in a file’s ' +
          'path, and it disappears by itself when the last file inside it is deleted.</p>'}
  },

  {type:'prose', title:'Read the URL before you read the page',
   html:
    '<p>The fake address bar above the replica is not decoration. GitHub URLs are strictly predictable, and once ' +
    'you can read one you always know where you are, even before the page renders.</p>' +
    '<pre><code>github.com/<b>owner</b>/<b>repo</b>/<b>what</b>/<b>which</b>/<b>path</b>\n\n' +
    'github.com/jordan-lee/trading-journal-practice\n' +
    '          the front page — files on the default branch\n\n' +
    'github.com/jordan-lee/trading-journal-practice/commits/main\n' +
    '          every commit on the branch called main\n\n' +
    'github.com/jordan-lee/trading-journal-practice/blob/main/README.md\n' +
    '          one file, as it exists on main  ("blob" = a single file)\n\n' +
    'github.com/jordan-lee/trading-journal-practice/tree/main/journal\n' +
    '          one folder, as it exists on main  ("tree" = a folder)\n\n' +
    'github.com/jordan-lee/trading-journal-practice/issues/3\n' +
    '          issue number 3</code></pre>' +
    '<p>Two words worth keeping: <strong>blob</strong> means a file and <strong>tree</strong> means a folder. They ' +
    'are Git’s internal words that leaked into the URLs, and they are the fastest way to tell at a glance whether ' +
    'a link points at one file or a whole directory.</p>' +
    '<p>This also gives you a shortcut. You can type a URL directly instead of clicking: adding <code>/commits/main</code> ' +
    'to any repo address takes you straight to its history.</p>'
  },

  {type:'terms', title:'The words you now need',
   items:[
     {term:'Repository (repo)', html:'One project: its files, plus every version of those files that has ever existed. The unit GitHub is built around.'},
     {term:'Owner', html:'The account a repo belongs to. Always quote a repo as <code>owner/repo</code> — the second half alone is not an address.'},
     {term:'Branch', html:'One parallel version of the project. <code>main</code> is the official one. Yours has exactly one branch.'},
     {term:'Commit', html:'One saved change, with an author, a message, a timestamp and a permanent ID. Yours has five.'},
     {term:'SHA', html:'A commit’s 40-character fingerprint, usually shown as the first 7 — <code>109d091</code>. Not a sequence number.'},
     {term:'blob / tree', html:'Git’s words, visible in URLs: <code>blob</code> is a single file, <code>tree</code> is a folder.'},
     {term:'README', html:'The file GitHub renders automatically under your file list. The project’s front page.'},
     {term:'Empty state', html:'The friendly panel GitHub shows instead of a blank page when there is nothing to list yet. Not an error.'}
   ]
  },

  {type:'callout', variant:'warn', title:'Two gears, and they are not the same gear',
   html:
    '<p>The <strong>Settings tab</strong> on the repo row controls this project: its name, its visibility, who can ' +
    'write to it, and the Danger Zone.</p>' +
    '<p><strong>Settings under your avatar</strong>, top right, controls you: your email, your display name, your ' +
    'profile picture, two-factor authentication.</p>' +
    '<p>Almost every “I cannot find that setting” moment on GitHub is looking in the wrong one of these two. Ask ' +
    '“is this about the project or about me?” first.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Name every strip of a repo page and say which job it does — global nav, repo identity, tab row, contents',
     'Read a GitHub URL and know whether it points at a repo, a branch, a single file or a folder',
     'Tell a file row from a folder row on sight, and explain why <strong>journal\\week6.md</strong> is a file',
     'Get from the front page to the full commit history in one click, and read what a commit row is telling you',
     'Say what Private actually means, and where the switch that changes it lives',
     'Point at the four sidebar cards and say which one is worth filling in today (About) and which three are not yet'
   ]
  }

  ]
});
