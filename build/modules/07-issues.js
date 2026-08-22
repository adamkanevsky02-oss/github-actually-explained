/* ============================================================================
   MODULE 07 — "Issues: the to-do list that lives with the project"
   Owns: issues, labels, assignees, milestones, the issue list + filter syntax,
   Closes #n, cross-references, issue templates, Discussions vs Issues,
   issues for non-code work, and a first look at Projects.
   Defers: global search syntax (module 8), branches (5), PRs (6).

   CONTINUITY: pull request #1 already exists (module 6). Issues and PRs share
   one numbering sequence per repo, so the FIRST issue in this repo is #2.
   ========================================================================== */

MODULES.push({
  id: 'issues',
  num: 7,
  title: 'Issues: the to-do list that lives with the project',
  blurb: 'The tab everybody skips. It is also the reason GitHub works for things that are not code at all — a trading journal, a reading list, a plan, a personal task board.',
  goals: [
    'Open an issue that is still useful to read three weeks later',
    'Use labels, assignees and milestones for what each is actually for',
    'Filter an issue list with the search syntax instead of scrolling',
    'Link an issue to the commit or pull request that fixes it, and have it close itself',
    'Run a non-code project — a journal, a plan, a reading list — out of issues'
  ],
  sections: [

  /* ======================================================================
     1. START FROM THE PROBLEM
     ====================================================================== */
  {type:'prose', html:
    '<p class="tut-lead">Right now, the things you need to do about <code>trading-journal-practice</code> are stored in ' +
    'four incompatible places: a couple in your head, one in the Notes app, one in a message you sent yourself, ' +
    'and one in an email from your tutor. Every one of them is detached from the thing it is about. None of them ' +
    'will still be findable in three weeks.</p>' +
    '<p>An issue is a to-do that lives <em>with</em> the project and cannot be separated from it. Same URL, same ' +
    'permissions, same search, same notifications. Open the repo in six months and the list of things that were ' +
    'wrong with it — and what was decided about each one — is right there in a tab.</p>' +
    '<p>That is the entire idea. Everything else in this module is detail on top of it.</p>' +
    '<p>And the word <em>issue</em> is doing you a disservice, the same way “pull request” did in Module 6. It ' +
    'sounds like a bug report. An issue is a <strong>titled thread with a state</strong>, and you can put anything ' +
    'in one: a task, a question, an idea, a decision to be made, a bug, a note to your future self, or “week 7 ' +
    'journal — do before Friday”.</p>'
  },

  {type:'callout', variant:'info', title:'What an issue actually consists of',
   html:
    '<p>Five parts, and only the first two are compulsory:</p>' +
    '<p><strong>A title and a number.</strong> The number is permanent, never reused, and shared with pull ' +
    'requests — which is why your first issue on this repo is going to be <code>#2</code> and not <code>#1</code>. ' +
    'Pull request #1 already took the number.</p>' +
    '<p><strong>A description in Markdown.</strong> Written by whoever opened it. Editable forever, with an edit ' +
    'history anyone can inspect.</p>' +
    '<p><strong>A state.</strong> Open (green) or Closed. Closed comes in two flavours GitHub keeps deliberately ' +
    'distinct: <em>completed</em> (purple) and <em>not planned</em> (grey).</p>' +
    '<p><strong>A comment timeline.</strong> Human comments, plus automatic events — labelled, assigned, ' +
    'referenced from a commit, closed. The discussion and the audit trail are the same object.</p>' +
    '<p><strong>Metadata down the right-hand side.</strong> Assignees, Labels, Projects, Milestone, Development. ' +
    'All optional. All the difference between a list of forty issues and a plan.</p>'
  },

  /* ======================================================================
     2. SCREEN A — empty → create → list
     ====================================================================== */
  {type:'prose', title:'Start where you will actually start: an empty tab',
   html:
    '<p>Click the Issues tab on your real repo today and you get GitHub’s blank slate, because you have never ' +
    'opened one. That panel is not an error and it is not a placeholder for a broken page — GitHub shows an ' +
    'invitation instead of a blank screen everywhere it can, so you always know the difference between “nothing ' +
    'here yet” and “something went wrong”.</p>' +
    '<p>Below, the whole path from that empty tab to a working list. Press <strong>New issue</strong> and follow ' +
    'it through.</p>'
  },

  {type:'screen',
   id:'issues-start',
   label:'Your Issues tab — empty, then creating one, then a real list',
   url:'github.com/jordan-lee/trading-journal-practice/issues',
   initial:'empty',
   inertNote:'Inert in this lesson. The live path is: New issue → Create → the issue list. The markers explain everything else.',

   views:{

    /* ---------- EMPTY STATE ---------- */
    empty:{ url:'github.com/jordan-lee/trading-journal-practice/issues', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab gh-tab--active" data-h="issues-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-counter gh-counter--flat">1</span></span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab" data-h="projects-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page"><div class="gh-blankslate gh-blankslate--dashed" data-h="blankslate">' +
        '<svg class="octicon"><use href="#oct-issue-opened"/></svg>' +
        '<h3>Welcome to issues!</h3>' +
        '<p>Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll ' +
        'appear here in a searchable and filterable list. To get started, you should create an issue.</p>' +
        '<span class="gh-btn gh-btn--primary" data-h="new-issue-btn"><svg class="octicon"><use href="#oct-plus"/></svg>New issue</span>' +
      '</div></div>'
    },

    /* ---------- THE NEW-ISSUE FORM ---------- */
    newform:{ url:'github.com/jordan-lee/trading-journal-practice/issues/new', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-page"><div class="gh-layout">' +
        '<div>' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">' +
            '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<h2 style="font-size:20px;font-weight:400;margin:0">New issue in ' +
            '<b style="font-weight:600">jordan-lee/trading-journal-practice</b></h2>' +
          '</div>' +
          '<div style="margin-bottom:12px" data-h="issue-title-field">' +
            '<label class="gh-formrow__label">Add a title</label>' +
            '<input class="gh-input" value="Fix journal folder name (backslash instead of slash)" data-inert>' +
          '</div>' +
          '<div class="gh-commentbox" data-h="issue-body-field">' +
            '<div class="gh-commentbox__tabs"><span class="gh-commentbox__tab is-on">Write</span>' +
              '<span class="gh-commentbox__tab" data-h="preview-tab">Preview</span></div>' +
            '<div class="gh-commentbox__area"><textarea data-inert>The file at the repo root is named journal\\week6.md — one file with a backslash in its name, not a folder called journal containing week6.md.\n\nWhy: GitHub only builds folders from a FORWARD slash. A backslash is an ordinary character to Git.\n\nFix: open the file, click the pencil, and change the name to journal/week6.md. GitHub turns the / into a folder move in a single commit.\n\nDo this before adding week 7, or there will be two loose files instead of a folder.</textarea></div>' +
            '<div class="gh-commentbox__ft">' +
              '<span class="gh-btn" data-inert>Cancel</span>' +
              '<span class="gh-btn gh-btn--primary" data-h="submit-issue">Create</span></div>' +
          '</div>' +
          '<div class="gh-flash" style="margin-top:16px" data-h="template-note"><svg class="octicon"><use href="#oct-light-bulb"/></svg>' +
            '<span>On a repo that has <b>issue templates</b>, you never see this blank box first — you get a menu ' +
            'of choices (Bug report, Feature request, Question) and a form with the questions already written.</span></div>' +
        '</div>' +
        '<div class="gh-side">' +
          '<div class="gh-sidecard" data-h="form-assignees">' +
            '<div class="gh-sidecard__hd"><h2>Assignees</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">No one — <span class="gh-sidelink">assign yourself</span></p>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="form-labels">' +
            '<div class="gh-sidecard__hd"><h2>Labels</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">None yet</p>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="form-projects">' +
            '<div class="gh-sidecard__hd"><h2>Projects</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">None yet</p>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="form-milestone">' +
            '<div class="gh-sidecard__hd"><h2>Milestone</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">No milestone</p>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    },

    /* ---------- THE POPULATED LIST ---------- */
    list:{ url:'github.com/jordan-lee/trading-journal-practice/issues', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab gh-tab--active"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues<span class="gh-counter gh-counter--flat">3</span></span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-counter gh-counter--flat">1</span></span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab" data-h="projects-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:center">' +
          '<span class="gh-input gh-input--sm gh-mono" style="max-width:420px;display:inline-flex;align-items:center;gap:8px" data-h="filter-input">' +
            '<svg class="octicon"><use href="#oct-search"/></svg>is:issue is:open</span>' +
          '<span class="gh-btn gh-btn--sm" data-h="labels-btn"><svg class="octicon octicon--sm"><use href="#oct-tag"/></svg>Labels<span class="gh-counter">6</span></span>' +
          '<span class="gh-btn gh-btn--sm" data-h="milestones-btn"><svg class="octicon octicon--sm"><use href="#oct-milestone"/></svg>Milestones<span class="gh-counter">1</span></span>' +
          '<span class="gh-btn gh-btn--sm gh-btn--primary" style="margin-left:auto" data-inert><svg class="octicon octicon--sm"><use href="#oct-plus"/></svg>New issue</span>' +
        '</div>' +
        '<div class="gh-listbox">' +
          '<div class="gh-listbox__head" data-h="list-head">' +
            '<span class="gh-listbox__filter is-on" data-h="filter-open"><svg class="octicon"><use href="#oct-issue-opened"/></svg>3 Open</span>' +
            '<span class="gh-listbox__filter" data-h="filter-closed"><svg class="octicon"><use href="#oct-check"/></svg>0 Closed</span>' +
            '<span style="margin-left:auto;display:flex;gap:16px;color:var(--gh-fg-muted);font-size:12px;font-weight:600">' +
              '<span data-h="sort-author">Author <svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<span data-h="sort-label">Label <svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<span data-h="sort-assignee">Assignee <svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<span data-h="sort-sort">Sort <svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
            '</span>' +
          '</div>' +

          '<div class="gh-listrow" data-h="row-2">' +
            '<svg class="octicon gh-listrow__icon gh-listrow__icon--open"><use href="#oct-issue-opened"/></svg>' +
            '<span class="gh-listrow__main">' +
              '<span class="gh-listrow__title">Fix journal folder name (backslash instead of slash)</span>' +
              '<span class="gh-labels">' +
                '<span class="gh-label" style="background:rgba(215,58,74,.2);color:#ff7b72;border-color:rgba(255,123,114,.3)">bug</span>' +
              '</span>' +
              '<span class="gh-listrow__meta">#2 opened 2 minutes ago by jordan-lee</span>' +
            '</span>' +
            '<span class="gh-listrow__right">' +
              '<span class="gh-assignees"><span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span></span>' +
            '</span>' +
          '</div>' +

          '<div class="gh-listrow" data-h="row-3">' +
            '<svg class="octicon gh-listrow__icon gh-listrow__icon--open"><use href="#oct-issue-opened"/></svg>' +
            '<span class="gh-listrow__main">' +
              '<span class="gh-listrow__title">README still contains Week 1 template placeholders</span>' +
              '<span class="gh-labels">' +
                '<span class="gh-label" style="background:rgba(0,117,202,.2);color:#54aeff;border-color:rgba(84,174,255,.3)">documentation</span>' +
                '<span class="gh-label" style="background:rgba(112,87,255,.2);color:#a371f7;border-color:rgba(163,113,247,.3)">good first issue</span>' +
              '</span>' +
              '<span class="gh-listrow__meta">#3 opened 1 hour ago by jordan-lee &nbsp;·&nbsp; ' +
                '<span class="gh-milestone"><svg class="octicon octicon--sm"><use href="#oct-milestone"/></svg>Week 6 submission</span></span>' +
            '</span>' +
            '<span class="gh-listrow__right">' +
              '<span data-h="row3-linked"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>&nbsp;1</span>' +
              '<span class="gh-assignees"><span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span></span>' +
              '<span><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>&nbsp;2</span>' +
            '</span>' +
          '</div>' +

          '<div class="gh-listrow" data-h="row-4">' +
            '<svg class="octicon gh-listrow__icon gh-listrow__icon--open"><use href="#oct-issue-opened"/></svg>' +
            '<span class="gh-listrow__main">' +
              '<span class="gh-listrow__title">Write week 7 journal entry before Friday tutorial</span>' +
              '<span class="gh-labels">' +
                '<span class="gh-label" style="background:rgba(162,238,239,.16);color:#7ee0e3;border-color:rgba(126,224,227,.3)">enhancement</span>' +
              '</span>' +
              '<span class="gh-listrow__meta">#4 opened 1 hour ago by jordan-lee &nbsp;·&nbsp; ' +
                '<span class="gh-milestone"><svg class="octicon octicon--sm"><use href="#oct-milestone"/></svg>Week 6 submission</span></span>' +
            '</span>' +
            '<span class="gh-listrow__right">' +
              '<span class="gh-assignees"><span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span></span>' +
            '</span>' +
          '</div>' +

        '</div>' +
      '</div>'
    }
   },

   actions:[
    {on:'[data-h="new-issue-btn"]', view:'newform', explain:{title:'Two boxes and a green button',
      html:'<p>That is the whole form. A title, a description, and optional metadata down the right. GitHub ' +
           'deliberately kept it this small — a to-do system with fifteen required fields is a to-do system ' +
           'nobody uses.</p>' +
           '<p>The description box is Markdown, exactly like your README. Headings, bullets, ' +
           '<code>`code`</code>, links. Two extras worth knowing: <code>- [ ]</code> at the start of a line makes ' +
           'a real tickable checkbox, and you can drag an image or a PDF straight into the box and GitHub hosts ' +
           'it for you.</p>' +
           '<p>Look at what has been typed in. The title names one specific problem. The body says what is wrong, ' +
           '<em>why</em> it is wrong, and what the fix is. That is the difference between an issue that is still ' +
           'useful in three weeks and one that says “fix folder”.</p>' +
           '<p>Press <strong>Create</strong> when you have read the markers.</p>'}},

    {on:'[data-h="submit-issue"]', view:'list', explain:{title:'Your first issue is #2, not #1 — and that is not a bug',
      html:'<p>Issue numbers and pull request numbers come out of the <strong>same</strong> counter, one per ' +
           'repository. Module 6 opened pull request <code>#1</code>, so the next number available was ' +
           '<code>#2</code>, and your first issue took it.</p>' +
           '<p>This is a deliberate design decision, not an accident. It means <code>#2</code> on this repo refers ' +
           'to exactly one thing, forever, and GitHub never has to ask “issue 2 or PR 2?”. It is what makes typing ' +
           '<code>#2</code> in any comment, commit message or description turn into a working link with no extra ' +
           'syntax.</p>' +
           '<p>The other two rows are the other two issues from the callout at the end of this module, filed in the ' +
           'same sitting. Notice how much a list of three tells you at a glance that a ' +
           'Notes app never could: which are open, what kind of thing each one is (the labels), which are due for ' +
           'the same deadline (the milestone), whether anyone is on it (the avatar), and whether there is already ' +
           'a pull request attached (the small branch icon on <code>#3</code>).</p>'}},

    {on:'[data-h="filter-closed"]', toast:'0 Closed — nothing has been finished yet. This is the same view with <span style="font-family:var(--font-mono)">is:issue is:closed</span> in the box above.'},
    {on:'[data-h="labels-btn"]', toast:'Opens the label manager: rename, recolour, delete, or create your own. Every repo starts with 6 defaults.'},
    {on:'[data-h="milestones-btn"]', toast:'Opens the milestone list — “Week 6 submission”, due Aug 14, with a progress bar showing 0 of 2 done.'},
    {on:'[data-h="row-2"]', toast:'Opening a single issue is the next screen down the page — it has its own markers.'},
    {on:'[data-h="row-3"]', toast:'This is the issue pull request #1 closes. That link came from writing “Closes #3” in the PR description.'},
    {on:'[data-h="row-4"]', toast:'A pure to-do. No code involved, and no less at home here for it.'},
    {on:'[data-h="projects-tab"]', toast:'Projects turns these same issues into a drag-and-drop board. There is a section on it further down this module.'},
    {on:'[data-h="preview-tab"]', toast:'Preview renders your Markdown before you post it. Always worth one click on a long issue.'}
   ],

   hotspots:[

    {sel:'[data-h="issues-tab"]', place:'bottom', title:'The Issues tab and its counter',
     what:'<p>One of the rooms inside your repo, with a live count of how many issues are currently <strong>open</strong>. Closed ones are not counted — the number is “what still needs doing”, not “how many were ever filed”.</p>',
     why:'<p>Putting the number on the tab means you can tell whether a project has outstanding work without opening anything. On a repo you visit weekly, that single digit is most of the status report.</p>',
     how:'<p>Click the tab, or go straight to <code>github.com/OWNER/REPO/issues</code>. The URL is completely predictable, so you can type it faster than you can find the tab.</p>',
     fail:'<p>Reading a count of 0 as “this project has no problems”. It usually means nobody files issues here. On someone else’s repo, zero open issues plus 200 stars is a warning sign, not a compliment.</p>',
     when:'<p>Every time you come back to a project after a break. It is the fastest possible answer to “where was I?”</p>'},

    {sel:'[data-h="blankslate"]', place:'left', title:'The empty state — what you will actually see today',
     what:'<p>GitHub’s invitation panel. It appears instead of a blank page whenever a list has nothing in it, and it always contains the button that fixes that.</p>',
     why:'<p>A genuinely blank screen is indistinguishable from a broken one. GitHub uses empty states everywhere for that reason — you saw the same pattern on the Pull requests tab in Module 2.</p>',
     how:'<p>Read the sentence, press the green button. Notice it also tells you what issues are <em>for</em>: “todos, bugs, feature requests, and more”. The “and more” is doing a lot of work and this module unpacks it.</p>',
     fail:'<p>Assuming the tab is switched off. Issues can genuinely be disabled per repo in Settings, and when they are the tab disappears entirely rather than showing this panel. Panel visible means the feature is on.</p>',
     when:'<p>The first minute of any new project. Open one issue immediately — even “set this repo up properly” — so the tab stops being empty and you start using it.</p>'},

    {sel:'[data-h="new-issue-btn"]', place:'right', title:'The “New issue” button',
     what:'<p>The only way to create an issue by clicking. It lives here on the empty state and top-right of the list once there is one.</p>',
     why:'<p>Filing has to be nearly free or people stop doing it and go back to remembering things. Two boxes and one button is about as cheap as a form can be.</p>',
     how:'<p>Press it (it works). Faster route once you know the shape of GitHub: type <code>github.com/OWNER/REPO/issues/new</code> straight into the address bar.</p>',
     fail:'<p>Filing the same thing twice because you did not check the existing list. GitHub searches as you type the title and shows possible duplicates underneath — read that dropdown before pressing Create.</p>',
     when:'<p>The instant you notice something. Not later. The whole value of issues is that they capture the thought at the moment you have it, which is the moment you are least likely to write it down.</p>'},

    {sel:'[data-h="issue-title-field"]', view:'newform', place:'left', title:'The title — write it for the person who reads it in a month',
     what:'<p>One line, and the only part of the issue that appears in the list, in search results, in notification emails, and in every place the issue is linked.</p>',
     why:'<p>Nobody reads forty descriptions. They read forty titles and open one. The title is therefore not a label for the issue — it <em>is</em> the issue, as far as most people are concerned.</p>',
     how:'<p>Name the problem, not the area. <em>“Fix journal folder name (backslash instead of slash)”</em> tells you what is wrong and where. Say the specific thing; the description carries the detail.</p>',
     fail:'<p>Titles like <em>“README”</em>, <em>“fix stuff”</em> or <em>“issue with journal”</em>. Three weeks later you have to open each one to remember what it meant, which is precisely the cost you filed the issue to avoid.</p>',
     when:'<p>Every single issue, including the ones only you will ever read. Especially those — nobody is going to explain it to you later.</p>'},

    {sel:'[data-h="issue-body-field"]', view:'newform', place:'left', title:'The description, in Markdown',
     what:'<p>The body of the issue. Markdown, a Write/Preview toggle, and support for dragged-in images and files.</p>',
     why:'<p>“Fix the folder” is not actionable by anyone, including you-in-three-weeks. A description exists so the issue survives the loss of the context you had when you wrote it.</p>',
     how:'<p>Three short paragraphs beat one long one: <strong>what is wrong</strong>, <strong>why it matters</strong>, <strong>what the fix is</strong>. Type <code>- [ ] step one</code> to get a real tickable checkbox — GitHub even shows “1 of 3” progress on the list row.</p>',
     fail:'<p>Leaving it blank because “I will remember”. You will not, and an issue with an empty body is functionally a bookmark with no page attached.</p>',
     when:'<p>Right now, on this exact issue. The backslash file is a real defect in your real repo, and this is the fix written down where it cannot get lost.</p>',
     note:'<p><strong>Backslash reminder:</strong> the file really is called <code>journal\\week6.md</code> — one file, backslash included. Renaming it to <code>journal/week6.md</code> is what creates the folder, because on GitHub folders are implied by forward slashes in a path and never created directly.</p>'},

    {sel:'[data-h="form-assignees"]', view:'newform', place:'right', title:'Assignees — whose job it is',
     what:'<p>The person responsible for this issue. Not who reported it, not who is interested — who is doing it.</p>',
     why:'<p>An unassigned task on a shared list is a task everyone assumes someone else has. Putting a face on the row removes that ambiguity, which is most of what project management is.</p>',
     how:'<p>Gear → pick people, or use the <em>assign yourself</em> link. Then <code>assignee:@me</code> in any issue search shows only your work, across every repo you have access to.</p>',
     fail:'<p>Assigning four people “so everyone knows”. Four owners is zero owners. One name, or none.</p>',
     when:'<p>A group assignment. On a solo repo, assigning yourself is still worth it for one reason: <code>assignee:@me</code> then becomes a single query that gathers every outstanding thing you owe across all your projects.</p>'},

{sel:'[data-h="form-labels"]', view:'newform', place:'right', title:'Labels — the fixed vocabulary',
     what:'<p>Coloured tags you attach to an issue. Every new repo starts with six: <code>bug</code>, <code>documentation</code>, <code>enhancement</code>, <code>good first issue</code>, <code>help wanted</code>, <code>question</code>.</p>',
     why:'<p>Titles are free-form prose, so you cannot reliably filter on them — one person writes “bug”, the next writes “broken”. Labels are a closed set, which is the only reason <code>label:bug</code> returns everything it should.</p>',
     how:'<p>Click the gear and tick. Colour is not decoration: at twenty issues your eye finds the red rows before it reads a single word, so pick colours by category — red for broken, blue for docs, green for new work.</p>',
     fail:'<p>Inventing a new label every time you file something. Twenty near-identical labels means nobody remembers which to use, they get applied inconsistently, and filtering by them returns half the truth — which is worse than no labels at all.</p>',
     when:'<p><code>good first issue</code> and <code>help wanted</code> are the two that matter outside your own repos: they are the standard flags open-source projects use to mark work suitable for newcomers, and searching GitHub for them is how most people find their first contribution.</p>'},

{sel:'[data-h="form-projects"]', view:'newform', place:'right', title:'Projects — the board this issue can also live on',
     what:'<p>A link between this issue and a GitHub Project: a spreadsheet-or-kanban view built out of issues from one or many repos.</p>',
     why:'<p>A flat list is fine at ten items and useless at forty. A board shows what is actually in progress right now, which a list fundamentally cannot.</p>',
     how:'<p>Add the issue to a project here and it appears as a card in the board’s first column. Dragging that card to “Done” can close the issue automatically — the board and the issue stay one object, not two copies.</p>',
     fail:'<p>Building an elaborate board for six tasks, then maintaining it instead of doing them. Boards earn their keep above roughly fifteen live items.</p>',
     when:'<p>There is a fuller section on Projects at the end of this module, and Module 10 goes further. For a two-file coursework repo: not yet.</p>'},

{sel:'[data-h="form-milestone"]', view:'newform', place:'right', title:'Milestone — a deadline with issues attached',
     what:'<p>A named bucket with an optional due date. Issues and pull requests get dropped into it, and GitHub draws a progress bar showing how many are done.</p>',
     why:'<p>Labels answer “what kind of thing is this?”. Milestones answer “does this have to be finished by Friday?”. Those are different questions and a single tagging system cannot serve both.</p>',
     how:'<p>Create one at <code>…/milestones</code> — give it a name and a date, then attach issues from this dropdown. The milestone page shows a burn-down: 2 open, 1 closed, 33% complete.</p>',
     fail:'<p>Making a milestone with no due date. It becomes just another label, and you lose the one thing it does that labels cannot — telling you whether you are ahead or behind.</p>',
     when:'<p>Directly useful to you: a milestone called <strong>“Week 6 submission”</strong> due the day before your tutorial, with every issue you must finish first inside it. One page, one progress bar, no guessing.</p>'},

    {sel:'[data-h="template-note"]', view:'newform', place:'left', title:'Issue templates — why some repos interrogate you',
     what:'<p>Pre-written forms a repo can define. Instead of a blank box you get a menu — Bug report, Feature request, Question — and a body already containing the questions you must answer.</p>',
     why:'<p>Maintainers were receiving bug reports that said “doesn’t work”. A template makes the useful questions unskippable: what did you expect, what happened, what version, how do we reproduce it.</p>',
     how:'<p>They are files in <code>.github/ISSUE_TEMPLATE/</code> in the repo. You do not need to build one, but you will meet them constantly — the first time you file an issue on a popular open-source project, expect a form.</p>',
     fail:'<p>Deleting the template’s questions and typing a sentence instead. On busy projects that is the fastest way to have your issue closed unanswered, because it fails the maintainer’s triage in five seconds.</p>',
     when:'<p>Reporting a bug in a library you rely on. Fill the form out honestly, including the boring version numbers — that is the part that actually gets it fixed.</p>'},

    {sel:'[data-h="filter-input"]', view:'list', place:'bottom', title:'The filter box — <span style="font-family:var(--font-mono)">is:issue is:open</span>',
     what:'<p>Not a free-text search box. It is a query box, and what is in it right now is a query: “things that are issues, and are open”. It is pre-filled, which is why the list defaults to open issues only.</p>',
     why:'<p>Once a repo has 300 issues, “find me the open bugs nobody is assigned to” is a question no amount of scrolling answers. GitHub built a small query language rather than twenty dropdowns.</p>',
     how:'<p>Terms are <code>key:value</code>, space-separated, and they all have to be true. The ones worth memorising: <code>is:open</code> / <code>is:closed</code>, <code>label:bug</code>, <code>assignee:@me</code>, <code>author:jordan-lee</code>, <code>milestone:"Week 6 submission"</code>, <code>no:assignee</code>, <code>sort:created-desc</code>.</p>',
     fail:'<p>Deleting <code>is:open</code> to search and then wondering why closed issues keep appearing. Every term you remove widens the result. Also: <code>label:good first issue</code> silently breaks on the space — it has to be <code>label:"good first issue"</code>.</p>',
     when:'<p>Worth learning properly because it is the <em>same</em> syntax as GitHub’s global search bar, which Module 8 covers. Learn it once here on three issues, use it forever across all of GitHub.</p>'},

    {sel:'[data-h="list-head"]', view:'list', place:'right', title:'Open / Closed, and the four dropdowns',
     what:'<p>The header strip: a live count of open and closed issues on the left, and Author / Label / Assignee / Sort filters on the right.</p>',
     why:'<p>The dropdowns are a friendly front end for the query box — clicking <em>Label → bug</em> just types <code>label:bug</code> for you. Two interfaces, one mechanism, which is why the box and the dropdowns never disagree.</p>',
     how:'<p>Click <strong>0 Closed</strong> to see finished work — a genuinely satisfying view once you have used issues for a month. <strong>Sort</strong> offers newest, oldest, most commented, recently updated.</p>',
     fail:'<p>Forgetting the Closed tab exists and re-filing something you already dealt with. The default view hides everything you have finished, which is right for daily use and misleading when you are checking history.</p>',
     when:'<p>End of semester, when you want to show — or just see — everything you got through. Closed issues are a record of completed work that you did not have to write a report to produce.</p>'},

    {sel:'[data-h="row-2"]', view:'list', place:'left', title:'A row in the list',
     what:'<p>One issue, compressed into a line: state icon, title, labels, then <code>#number opened WHEN by WHO</code>, with assignee avatars and a comment count on the right.</p>',
     why:'<p>Every element on the row answers a triage question — is it live, what is it, how old, whose, how much argument has it caused. It is designed to be scanned at speed, not read.</p>',
     how:'<p>The green circle icon means open; a purple tick means closed-completed; a grey circle-with-slash means closed as not planned. Click the title to open the issue itself.</p>',
     fail:'<p>Clicking the row background instead of the title text. Only the title is the link, which is deliberate — it leaves the rest of the row free for the checkbox you use to bulk-label ten issues at once.</p>',
     when:'<p>Every time you open the tab. Ten seconds of scanning this list is a complete status report on a project you have not touched in a fortnight.</p>'},

    {sel:'[data-h="row-3"] .gh-labels', view:'list', place:'bottom', title:'Two labels on one issue',
     what:'<p><code>documentation</code> and <code>good first issue</code> on the same row. Labels are not mutually exclusive — an issue can carry as many as make sense.</p>',
     why:'<p>Real tasks have more than one attribute. This one is about docs <em>and</em> it is easy enough for a newcomer. Forcing a single category would lose one of those facts.</p>',
     how:'<p>Filter on more than one at once: <code>label:documentation label:"good first issue"</code> returns issues carrying both. Multi-word labels need the quotes.</p>',
     fail:'<p>Five labels on every issue. Past three the colours stop being scannable and you are back to reading, which is what labels were supposed to save you from.</p>',
     when:'<p><code>good first issue</code> is your way into open source. Search GitHub for it, filter by a language or topic you care about, and you have a list of tasks maintainers have explicitly marked as suitable for someone new.</p>'},

    {sel:'[data-h="row3-linked"]', view:'list', place:'left', title:'The small branch icon: a linked pull request',
     what:'<p>A marker saying this issue already has a pull request attached to it — here, pull request #1 from Module 6.</p>',
     why:'<p>The most annoying question on any issue list is “is anyone already doing this?”. This icon answers it without opening anything, which stops two people fixing the same thing twice.</p>',
     how:'<p>The link is created automatically the moment somebody writes <code>Closes #3</code> in a PR description. When that PR merges, this issue closes itself and a timeline event records which PR did it.</p>',
     fail:'<p>The link only forms from the PR <em>description</em> or a commit message. Typing “this fixes #3” in a later PR comment creates a plain mention — visible, but it will not close anything, and this icon never appears.</p>',
     when:'<p>Before starting work on anything in a shared repo. Scan for this icon first; if it is there, go and read the PR instead of duplicating it.</p>'},

    {sel:'[data-h="row-4"]', view:'list', place:'left', title:'An issue that is not about code at all',
     what:'<p><em>“Write week 7 journal entry before Friday tutorial”</em>. No bug, no code, no diff. A dated personal task, filed against the project it belongs to.</p>',
     why:'<p>Nothing in the issue system knows or cares what a repo contains. It is a numbered, labelled, assignable, searchable, permanently-stored thread — and that is just as useful for a task as for a defect.</p>',
     how:'<p>File it exactly like any other: title, a line of detail, a milestone if it has a deadline. Tick it closed when it is done. That is a to-do list.</p>',
     fail:'<p>Keeping uni tasks in one app, project tasks here, and notes in a third place. The split is the failure — the point of an issue is that it sits with the thing it is about and comes back with it.</p>',
     when:'<p>This is the module’s real payoff, and there is a whole section on it below. Trading journal, reading list, spreadsheet bugs, a personal board.</p>'}
   ]
  },

  /* ======================================================================
     3. SCREEN B — a single issue
     ====================================================================== */
  {type:'prose', title:'One issue, in full',
   html:
    '<p>The list is the index. The issue page is where the thinking lives. Here is <code>#2</code> — the backslash ' +
    'file in your actual repo — with everything a real issue page carries.</p>' +
    '<p>Two things on this page are worth arriving early for: the <strong>cross-reference event</strong> in the ' +
    'timeline, which is GitHub quietly stitching your issues, commits and pull requests into one navigable web; ' +
    'and the <strong>Close issue</strong> button, which behaves differently from anything you have pressed so ' +
    'far. Press it and read what happens.</p>'
  },

  {type:'screen',
   id:'issue-one',
   label:'Issue #2 — the backslash file, the thing that is actually wrong with your repo',
   url:'github.com/jordan-lee/trading-journal-practice/issues/2',
   initial:'issue',
   inertNote:'Inert in this lesson. The live controls here are the Labels gear, the “#3” reference link and the “Close issue” button.',

   views:{
    issue:{ url:'github.com/jordan-lee/trading-journal-practice/issues/2', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-issuehead">' +
        '<h1 data-h="issue-title">Fix journal folder name (backslash instead of slash) ' +
          '<span class="gh-issuenum">#2</span></h1>' +
        '<div class="gh-issuehead__sub">' +
          '<span id="issue-state"><span class="gh-state gh-state--open" data-h="issue-state-pill">' +
            '<svg class="octicon"><use href="#oct-issue-opened"/></svg>Open</span></span>' +
          '<span data-h="issue-byline"><b class="gh-b" style="color:var(--gh-fg-default)">jordan-lee</b> ' +
            'opened this issue 2 minutes ago · 1 comment</span>' +
        '</div>' +
      '</div>' +

      '<div class="gh-page"><div class="gh-layout">' +
        '<div>' +
          '<div class="gh-timeline" id="issue-timeline">' +

            '<div class="gh-tlitem" data-h="issue-body">' +
              '<span class="gh-tlbadge gh-tlbadge--open"><svg class="octicon"><use href="#oct-issue-opened"/></svg></span>' +
              '<div class="gh-comment">' +
                '<div class="gh-comment__hd"><span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
                  '<b>jordan-lee</b> commented 2 minutes ago' +
                  '<span class="gh-comment__tools"><span class="gh-badge">Owner</span>' +
                  '<span class="gh-btn gh-btn--invisible gh-btn--icon" data-inert><svg class="octicon"><use href="#oct-kebab-horizontal"/></svg></span></span></div>' +
                '<div class="gh-comment__bd"><div class="gh-markdown">' +
                  '<p>The file at the repo root is named <code>journal\\week6.md</code> — one file with a backslash ' +
                  'in its name, not a folder called <code>journal</code> containing <code>week6.md</code>.</p>' +
                  '<p><strong>Why:</strong> GitHub only builds folders from a <em>forward</em> slash. A backslash is ' +
                  'an ordinary character to Git, so it just stayed in the name.</p>' +
                  '<p><strong>Fix:</strong> open the file, click the pencil, change the name to ' +
                  '<code>journal/week6.md</code>. GitHub turns the <code>/</code> into a folder move in one commit.</p>' +
                  '<p>Do this before adding week 7, or there will be two loose files instead of a folder.</p>' +
                '</div></div>' +
              '</div>' +
            '</div>' +

            '<div class="gh-tlevent" data-h="tl-labelled">' +
              '<span class="gh-tlbadge"><svg class="octicon"><use href="#oct-tag"/></svg></span>' +
              '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
              '<b>jordan-lee</b> added the ' +
              '<span class="gh-label" style="background:rgba(215,58,74,.2);color:#ff7b72;border-color:rgba(255,123,114,.3)">bug</span> ' +
              'label 2 minutes ago' +
            '</div>' +

            '<div class="gh-tlevent" data-h="tl-crossref">' +
              '<span class="gh-tlbadge"><svg class="octicon"><use href="#oct-git-pull-request"/></svg></span>' +
              '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
              '<b>jordan-lee</b> mentioned this issue in ' +
              '<span class="gh-link" data-h="crossref-link">Fix README formatting and clean up template placeholders #1</span> ' +
              '1 minute ago' +
            '</div>' +

            '<div class="gh-tlitem" data-h="issue-comment">' +
              '<span class="gh-tlbadge"><svg class="octicon"><use href="#oct-comment"/></svg></span>' +
              '<div class="gh-comment">' +
                '<div class="gh-comment__hd"><span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
                  '<b>jordan-lee</b> commented 1 minute ago' +
                  '<span class="gh-comment__tools"><span class="gh-badge">Owner</span></span></div>' +
                '<div class="gh-comment__bd"><div class="gh-markdown">' +
                  '<p>Doing this separately from <span class="gh-link">#3</span> — a rename shows up in the diff as ' +
                  'one file deleted and one file added, and mixing that in with the README edits would make both ' +
                  'harder to read.</p>' +
                  '<p>Checklist:</p>' +
                  '<ul><li>Rename to <code>journal/week6.md</code></li>' +
                  '<li>Confirm the file list shows a blue folder row, not a file row</li>' +
                  '<li>Add <code>journal/week7.md</code> and check it lands inside the same folder</li></ul>' +
                '</div></div>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<div class="gh-commentbox" data-h="issue-commentbox" style="margin-top:8px">' +
            '<div class="gh-commentbox__tabs"><span class="gh-commentbox__tab is-on">Write</span>' +
              '<span class="gh-commentbox__tab" data-inert>Preview</span></div>' +
            '<div class="gh-commentbox__area"><textarea placeholder="Add your comment here..." data-inert></textarea></div>' +
            '<div class="gh-commentbox__ft" id="issue-footer">' +
              '<span class="gh-btn" data-h="close-issue"><svg class="octicon"><use href="#oct-issue-closed"/></svg>Close issue</span>' +
              '<span class="gh-btn gh-btn--primary" data-inert>Comment</span></div>' +
          '</div>' +
        '</div>' +

        '<div class="gh-side">' +
          '<div class="gh-sidecard" data-h="side-assignees">' +
            '<div class="gh-sidecard__hd"><h2>Assignees</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<div class="gh-contribrow"><span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
              '<span class="gh-link">jordan-lee</span></div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-labels" style="position:relative">' +
            '<div class="gh-sidecard__hd"><h2>Labels</h2>' +
              '<span class="gh-sidecard__gear" data-h="labels-gear"><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<div class="gh-labels" style="margin-left:0" id="label-slot">' +
              '<span class="gh-label" style="background:rgba(215,58,74,.2);color:#ff7b72;border-color:rgba(255,123,114,.3)">bug</span>' +
            '</div>' +
            '<div class="gh-menu" id="labels-menu" style="left:auto;right:0;top:38px">' +
              '<div class="gh-menu__hd">Apply labels to this issue</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-check"/></svg><span>bug<small>Something isn’t working</small></span></div>' +
              '<div class="gh-menu__item"><span style="width:16px"></span><span>documentation<small>Improvements or additions to documentation</small></span></div>' +
              '<div class="gh-menu__item"><span style="width:16px"></span><span>enhancement<small>New feature or request</small></span></div>' +
              '<div class="gh-menu__item"><span style="width:16px"></span><span>good first issue<small>Good for newcomers</small></span></div>' +
              '<div class="gh-menu__item"><span style="width:16px"></span><span>help wanted<small>Extra attention is needed</small></span></div>' +
              '<div class="gh-menu__item"><span style="width:16px"></span><span>question<small>Further information is requested</small></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-projects">' +
            '<div class="gh-sidecard__hd"><h2>Projects</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">None yet</p>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-milestone">' +
            '<div class="gh-sidecard__hd"><h2>Milestone</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<span class="gh-metarow"><svg class="octicon"><use href="#oct-milestone"/></svg>Week 6 submission</span>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-development">' +
            '<div class="gh-sidecard__hd"><h2>Development</h2><span class="gh-sidecard__gear" data-inert><svg class="octicon"><use href="#oct-gear"/></svg></span></div>' +
            '<p class="gh-sidecard__empty">No branches or pull requests</p>' +
          '</div>' +
          '<div class="gh-sidecard" data-h="side-participants">' +
            '<div class="gh-sidecard__hd"><h2>Participants</h2></div>' +
            '<div class="gh-contribrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    }
   },

   actions:[
    {on:'[data-h="labels-gear"]', toggle:{target:'#labels-menu', class:'is-open'}},

    {on:'[data-h="close-issue"]', once:true, stop:false,
      replace:{target:'#issue-state', html:
        '<span class="gh-state gh-state--closed-issue" data-h="issue-state-pill">' +
        '<svg class="octicon"><use href="#oct-issue-closed"/></svg>Closed as completed</span>'}},

    {on:'[data-h="close-issue"]', once:true,
      append:{target:'#issue-timeline', html:
        '<div class="gh-tlevent"><span class="gh-tlbadge" style="background:#8957e5;color:#fff"><svg class="octicon"><use href="#oct-issue-closed"/></svg></span>' +
        '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
        '<b>jordan-lee</b> closed this as completed just now</div>'},
      replace:{target:'#issue-footer', html:
        '<span class="gh-btn" data-inert><svg class="octicon"><use href="#oct-sync"/></svg>Reopen issue</span>' +
        '<span class="gh-btn gh-btn--primary" data-inert>Comment</span>'},
      explain:{title:'Closed is not deleted — and there are two kinds of closed',
        html:'<p>The issue did not go anywhere. Same URL, same number, same comments, same everything. All that ' +
             'changed is a state flag, which is why the default list view stops showing it and ' +
             '<code>is:closed</code> starts.</p>' +
             '<p>Notice the wording: <strong>Closed as completed</strong>, purple. GitHub also offers ' +
             '<strong>Closed as not planned</strong>, which renders grey. The distinction exists because “we did ' +
             'it” and “we decided not to” are opposite outcomes, and a list where both look identical tells you ' +
             'nothing about what a project actually achieved.</p>' +
             '<p>The button became <strong>Reopen issue</strong>. Closing is free and completely reversible — which ' +
             'is the argument for closing things aggressively. An issue list you are afraid to close is an issue ' +
             'list you stop reading.</p>' +
             '<p>And the better way to do this: never press this button at all. Write <code>Closes #2</code> in the ' +
             'pull request that fixes it, and the issue closes itself the moment the fix lands on <code>main</code> ' +
             '— with a permanent record of exactly which change closed it.</p>'}},

    {on:'[data-h="crossref-link"]', toast:'On the real site this jumps to pull request #1. Cross-references are two-way — PR #1 shows a matching link back to this issue.'}
   ],

   hotspots:[

    {sel:'[data-h="issue-title"] .gh-issuenum', place:'right', title:'The title and #2 — a permanent address',
     what:'<p>The title, and the number this issue keeps forever. Even deleted issues do not free their number for reuse.</p>',
     why:'<p>Permanence is what makes referencing possible. If numbers were recycled, <code>#2</code> in a two-year-old comment could silently start pointing at something else, and the whole cross-reference web would rot.</p>',
     how:'<p>The URL is <code>…/issues/2</code> — typeable. Anywhere on GitHub inside this repo, writing <code>#2</code> in a comment, a commit message or a PR description turns into a live link with the current title and state shown on hover.</p>',
     fail:'<p><code>#2</code> only resolves inside this repo. Pasted into a comment on somebody else’s project it becomes a link to <em>their</em> number 2. Across repos you need the full form: <code>jordan-lee/trading-journal-practice#2</code>.</p>',
     when:'<p>Every time you want to point at a decision instead of re-explaining it. “Same reason as #2” is a complete sentence on GitHub.</p>'},

    {sel:'[data-h="issue-state-pill"]', place:'bottom', title:'The state pill — green Open, purple Closed, grey Not planned',
     what:'<p>Whether this is still live. Green <strong>Open</strong>. Purple <strong>Closed as completed</strong>. Grey <strong>Closed as not planned</strong> for things dropped rather than done.</p>',
     why:'<p>A single “closed” state made project history unreadable — you could not tell finished work from abandoned work. GitHub split it in two and gave each its own colour, because that distinction is the difference between a progress report and a graveyard.</p>',
     how:'<p>Set by the buttons at the bottom of the page, or automatically by a merged pull request containing <code>Closes #2</code>. Press <strong>Close issue</strong> further down and watch this pill change.</p>',
     fail:'<p>Closing everything as “completed” out of habit, including the ideas you decided against. Six months later your closed list claims you did nine things you never did.</p>',
     when:'<p>Reviewing a project before a submission or an interview. Purple rows are things you finished; grey rows are decisions you made. Both are worth being able to see apart.</p>'},

    {sel:'[data-h="issue-byline"]', place:'right', title:'“opened this issue 2 minutes ago · 1 comment”',
     what:'<p>Author, age and comment count. Three facts GitHub records automatically and you can never edit.</p>',
     why:'<p>The metadata is the audit trail. Who raised this, when, and how much discussion it caused are exactly the questions you have when you find a stale issue and cannot tell whether it still matters.</p>',
     how:'<p>Hover the relative time on the real site to get the exact timestamp. The author name links to their profile, which on a public repo is how you work out whether a reporter is a maintainer or a passer-by.</p>',
     fail:'<p>Trusting an old issue because it has lots of comments. Volume of discussion often means unresolved disagreement, not importance — check the date of the <em>last</em> comment, not the count.</p>',
     when:'<p>Triaging somebody else’s repo before you depend on it. Fifty open issues all opened three years ago with no replies tells you what you need to know about maintenance.</p>'},

    {sel:'[data-h="issue-body"] .gh-comment__bd', place:'left', title:'The body — what / why / fix',
     what:'<p>The description, rendered as Markdown. Same rendering engine as your README, so headings, bullets, code and links all behave identically.</p>',
     why:'<p>An issue exists to survive the loss of your context. This one names the file, explains that GitHub builds folders only from forward slashes, and gives the exact fix — so it is actionable in three weeks by someone who has forgotten everything.</p>',
     how:'<p>Structure beats prose: <strong>what is wrong</strong>, <strong>why</strong>, <strong>the fix</strong>. Edit it any time from the <code>…</code> menu; GitHub keeps the edit history so nothing is quietly rewritten.</p>',
     fail:'<p>An issue that only describes the symptom. “Journal folder is weird” sends future-you back to work out the diagnosis again from scratch, which is the exact cost you filed the issue to avoid.</p>',
     when:'<p>This is teaching moment number one from your real repo, written down properly. The backslash file is genuinely there right now, and this is genuinely how you would track fixing it.</p>'},

    {sel:'[data-h="tl-labelled"]', place:'left', title:'An automatic timeline event',
     what:'<p>A grey one-line entry nobody typed. GitHub writes one every time the issue changes: labelled, assigned, milestoned, renamed, referenced, closed, reopened.</p>',
     why:'<p>Discussion and history are the same thread on purpose. Splitting them into “comments” and “an activity log elsewhere” means you have to read two things in parallel to understand what happened.</p>',
     how:'<p>Nothing to click. Read them as punctuation between comments — they tell you when the shape of the issue changed, which is often the moment a conversation turned.</p>',
     fail:'<p>Renaming an issue’s title thinking it is invisible. GitHub records the old title and the new one in this timeline, permanently, for anyone to read.</p>',
     when:'<p>When you land on a long issue and need to know how it got to its current state without reading forty comments. The events are the skeleton of the story.</p>'},

    {sel:'[data-h="tl-crossref"]', place:'left', title:'“mentioned this issue in #1” — the cross-reference',
     what:'<p>A link that created itself. Someone wrote <code>#2</code> inside pull request #1, and GitHub recorded a matching entry <em>here</em>, pointing back the other way.</p>',
     why:'<p>Links written by hand only ever go one direction, and the direction you need later is usually the other one. Making every mention two-way is what turns a pile of issues, commits and PRs into something you can navigate.</p>',
     how:'<p>Type <code>#2</code> anywhere in this repo — a comment, a commit message, a PR description — and both ends link automatically. Use <code>@username</code> to notify a person instead, and the full <code>owner/repo#2</code> form to reference across repositories.</p>',
     fail:'<p>Discussing an issue in a chat app instead. The link never forms, and in two months the issue page shows a question that was answered somewhere nobody can find.</p>',
     when:'<p>Constantly, once it becomes a habit. “Related to #4”, “blocked by #7”, “superseded by #12” — each of those costs three characters and buys a permanent navigable link.</p>',
     note:'<p><strong>Mention vs close.</strong> A bare <code>#2</code> creates a link and nothing else. <code>Closes #2</code>, <code>Fixes #2</code> or <code>Resolves #2</code> in a <em>pull request description</em> or a <em>commit message</em> also closes the issue when that work reaches the default branch. Same syntax, very different effect.</p>'},

    {sel:'[data-h="issue-comment"] .gh-comment__bd', place:'left', title:'A comment — including one to yourself',
     what:'<p>A follow-up on the same thread. Here it records a decision (keep the rename separate from the README fix) and a three-step checklist.</p>',
     why:'<p>Decisions made silently get remade. Writing “doing this separately from #3, because…” costs fifteen seconds and stops you re-litigating it with yourself next week.</p>',
     how:'<p>Type in the box at the bottom and press Comment. <code>- [ ]</code> at the start of a line makes a tickable checkbox, and the issue row in the list then shows a progress count like “1 of 3”.</p>',
     fail:'<p>Feeling silly commenting on your own issue. It is the highest-value thing you can do on a solo repo — a dated record of your reasoning that survives you forgetting all of it.</p>',
     when:'<p>Any time you make a choice you might second-guess. “Not doing X, because Y” is the single most useful sentence on GitHub.</p>'},

    {sel:'[data-h="close-issue"]', place:'top', title:'The “Close issue” button',
     what:'<p>Flips the state from Open to Closed. It sits beside the Comment button because closing usually comes with a final remark explaining why.</p>',
     why:'<p>An issue list where nothing ever closes stops being a plan and becomes wallpaper. Closing has to be one click and completely reversible, or people avoid it.</p>',
     how:'<p>Press it (it works here). On the real site the arrow beside it lets you pick <em>Closed as completed</em> or <em>Closed as not planned</em>. Reopening is one click and the timeline records both events.</p>',
     fail:'<p>Closing an issue without saying what happened. Three months later the page shows a problem and a silent closure, and nobody — including you — can tell whether it was fixed or given up on.</p>',
     when:'<p>Ideally never by hand. Write <code>Closes #2</code> in the pull request that fixes it and the issue closes itself, with a permanent link to the exact change that did it.</p>'},

    {sel:'[data-h="side-labels"] .gh-sidecard__hd', place:'right', title:'Labels, from the issue page',
     what:'<p>The same label set as the creation form, editable after the fact. Click the gear to open the picker.</p>',
     why:'<p>You rarely know the right label when you file something. Labelling is usually a triage step done later, in a batch, which is why it has to be editable from here rather than fixed at creation.</p>',
     how:'<p>Click the gear (it opens). Every change writes a timeline event, so label history is visible. Making your own: <em>Issues → Labels → New label</em>, give it a name, a colour and a one-line description.</p>',
     fail:'<p>Colours chosen at random. If <code>bug</code> is green and <code>enhancement</code> is red, the list becomes actively misleading and you will read it wrong at speed for months.</p>',
     when:'<p>Once you have ten or more issues. Below that, the list fits on a screen and labels are ceremony.</p>'},

    {sel:'[data-h="side-milestone"] .gh-sidecard__hd', place:'right', title:'Milestone: “Week 6 submission”',
     what:'<p>This issue is attached to a dated bucket. The milestone page shows every issue in it and a progress bar.</p>',
     why:'<p>Deadlines are not attributes of a task, they are attributes of a group of tasks. Milestones exist so “what has to be done by Friday?” is one page rather than a filter you rebuild every time.</p>',
     how:'<p>Gear → choose a milestone, or create one at <code>…/milestones</code> with a name and a due date. GitHub then shows “2 open, 1 closed, 33% complete” and how many days remain.</p>',
     fail:'<p>Putting everything in one milestone called “Semester 2”. A milestone spanning three months has a progress bar that never visibly moves, which makes it useless as a signal.</p>',
     when:'<p>One milestone per assessment. <em>Week 6 submission</em>, due the night before the tutorial, containing the three things that must be true before you submit.</p>'},

    {sel:'[data-h="side-development"] .gh-sidecard__hd', place:'right', title:'Development — “No branches or pull requests”',
     what:'<p>The card showing whether any actual work has been started on this issue. Empty here, because nobody has branched for the rename yet.</p>',
     why:'<p>The distance between “someone filed this” and “someone is doing this” is where projects stall. This card makes that distinction visible without opening anything else.</p>',
     how:'<p>It fills itself in when a branch or PR references the issue. There is also a <em>Create a branch</em> link on the real site that makes a branch named after the issue and links the two automatically.</p>',
     fail:'<p>Assuming an empty card means nobody is working on it. If someone forgot the <code>#2</code> reference the link never forms — the card is evidence, not proof.</p>',
     when:'<p>Before starting anything in a shared repo: check here first, then the PR list. Two people fixing the same thing in parallel is the most avoidable waste on a group project.</p>'},

    {sel:'[data-h="side-participants"] .gh-sidecard__hd', place:'right', title:'Participants',
     what:'<p>Everyone who has commented on or been mentioned in this thread. One person here, and it is you.</p>',
     why:'<p>On a long thread it answers “who is actually involved in this decision?” before you scroll. It is also the notification list — participants get told about new comments automatically.</p>',
     how:'<p>You join by commenting or by being <code>@</code>-mentioned. There is an Unsubscribe control beneath it if a thread becomes noisy and stops concerning you.</p>',
     fail:'<p>@-mentioning six people to “make sure it gets seen”. You have just subscribed six people to every future comment on the thread, and several will mute you rather than the thread.</p>',
     when:'<p>On any busy open-source issue, to see whether a maintainer has engaged at all — the fastest signal for whether your report is going anywhere.</p>'}
   ]
  },

  /* ======================================================================
     4. CLOSING FROM COMMITS AND PRs
     ====================================================================== */
  {type:'prose', title:'Closing an issue from a commit or a pull request',
   html:
    '<p>Write <code>Closes #2</code> in a commit message or a pull request description, and when that work lands ' +
    'on your default branch GitHub closes issue 2 for you, permanently records which commit did it, and adds a ' +
    'timeline event at both ends.</p>' +
    '<p>The keywords are <code>close</code>, <code>closes</code>, <code>closed</code>, <code>fix</code>, ' +
    '<code>fixes</code>, <code>fixed</code>, <code>resolve</code>, <code>resolves</code> and ' +
    '<code>resolved</code>. Case does not matter. Multiple issues need the keyword repeated: ' +
    '<code>Closes #2, closes #3</code> — <code>Closes #2, #3</code> only closes the first.</p>' +
    '<p>The automation is nice. <strong>The link is the point.</strong> Six months from now you will look at a ' +
    'line in your README and wonder why it is written that way. The commit message gets you to the pull request; ' +
    'the pull request gets you to the issue; the issue tells you what problem you were solving and what you ' +
    'decided. Three clicks, no memory required. That chain does not exist unless somebody types six characters, ' +
    'and the somebody is you.</p>'
  },

  {type:'compare', title:'The same fix, tracked two ways',
   left:{title:'Without the link',
     html:'<p>Commit message: <em>“update readme”</em>. Issue #3 sits open forever, because you fixed the thing and ' +
          'forgot the list.</p>' +
          '<p>Three weeks later the issue list shows work that is already done, so you stop trusting it, so you ' +
          'stop reading it, so you stop filing issues. This is how issue trackers die, and it takes about a ' +
          'fortnight.</p>' +
          '<p>And the reasoning is gone. The README is different and nothing anywhere says why.</p>'},
   right:{title:'With <code>Closes #3</code>',
     html:'<p>PR description ends <code>Closes #3</code>. The moment it merges: issue #3 turns purple, a timeline ' +
          'event on the issue names the exact PR, and the PR shows the issue in its Development card.</p>' +
          '<p>The list stays honest with zero maintenance, so you keep trusting it, so you keep using it.</p>' +
          '<p>And there is now a permanent path from any line of the README to the reason it exists. Six ' +
          'characters bought that.</p>'}
  },

  /* ======================================================================
     5. THE PAYOFF — NON-CODE WORK
     ====================================================================== */
  {type:'prose', title:'Using issues for things that have nothing to do with code',
   html:
    '<p>This is the part worth staying for, and it is the reason you said GitHub matters to you outside uni.</p>' +
    '<p>Nothing in the issue system knows what a repository contains. It cannot tell code from Markdown from an ' +
    'empty folder. What it gives you is a numbered, titled, labelled, assignable, deadline-able, searchable, ' +
    'cross-referenceable, permanently-stored thread with a state — attached to a project, private by default, ' +
    'free, and with a phone app.</p>' +
    '<p>That is a genuinely good task system. Most people pay for worse. Four ways you would actually use it:</p>'
  },

  {type:'steps', title:'Four real uses, not hypotheticals',
   items:[
     {label:'A trading journal, one issue per week', html:
       '<p>Repo: <code>trading-journal</code>, private. One issue per week, titled ' +
       '<em>“Week of 10 Aug — 3 trades”</em>. In the body: the thesis you had going in. In the comments, added as ' +
       'the week goes: what you actually did and why. Close it on Sunday with the outcome.</p>' +
       '<p>Why this beats a document: each week is a separate object with its own date, so ' +
       '<code>label:mistake is:closed</code> returns every week you flagged a mistake, and the comment ' +
       'timestamps prove what you thought <em>before</em> the trade rather than after. That is the difference ' +
       'between a journal and a story you told yourself later — which is the entire reason a trading journal ' +
       'exists.</p>'},
     {label:'Bugs in a spreadsheet model', html:
       '<p>You build a DCF or a backtest in Excel and something is off. File it: ' +
       '<em>“Terminal value formula ignores the mid-year convention”</em>, label <code>bug</code>, describe what ' +
       'you expected versus what the cell produced, drag in a screenshot.</p>' +
       '<p>Why here rather than a sticky note: the issue has a permanent number, so when you fix it you can ' +
       'write <code>Closes #14</code> in the commit that uploads the corrected workbook. You end up with a ' +
       'dated record of every error the model has ever had — which is exactly what anyone auditing your work ' +
       'would ask for, and exactly what nobody ever has.</p>'},
     {label:'A reading list you will actually finish', html:
       '<p>One issue per paper or book. Labels for <code>to-read</code>, <code>reading</code>, ' +
       '<code>abandoned</code>. Notes go in the comments as you read. Close it when you are done, or as ' +
       '<em>not planned</em> when you give up — and that grey state is honest in a way a to-do app never lets ' +
       'you be.</p>' +
       '<p>The unexpectedly useful part: <code>#</code> references between issues. Reading paper #21 and it ' +
       'argues against #9? Write “contradicts #9” and both pages now link to each other, forever. You have ' +
       'built a small citation graph by accident.</p>'},
     {label:'Planning anything with a deadline', html:
       '<p>A milestone with a due date, and one issue per thing that has to be true before that date. It works ' +
       'identically for a group assignment, a job application round, or moving house. The progress bar on the ' +
       'milestone page is the whole status report.</p>' +
       '<p>The advantage over a shared doc: each item has one owner, one state, and its own discussion thread, ' +
       'so “who is doing the intro and is it done?” is answered by looking rather than by asking.</p>'}
   ]
  },

  {type:'callout', variant:'tip', title:'The catch, said plainly',
   html:
    '<p>Issues are worse than a dedicated task app at two things: there is no quick-capture on your phone lock ' +
    'screen, and there are no recurring tasks. If your entire life runs on reminders that repeat every Tuesday, ' +
    'this is the wrong tool and you should keep the app you have.</p>' +
    '<p>Where it wins is <em>projects</em> — anything with a body of work attached, where the tasks and the ' +
    'artefacts belong together and both need to still be there in a year. A trading journal is a project. ' +
    '“Buy milk” is not.</p>' +
    '<p>One practical note: a repository has to contain something before issues feel natural, and a repo with ' +
    'nothing but a README is fine. Make it private, add one file, and start filing.</p>'
  },

  /* ======================================================================
     6. PROJECTS + DISCUSSIONS
     ====================================================================== */
  {type:'prose', title:'GitHub Projects, briefly',
   html:
    '<p>A <strong>Project</strong> is a board or a table built out of issues and pull requests. Not copies of ' +
    'them — the same objects, shown differently. Close an issue and its card moves; drag a card to Done and the ' +
    'issue closes. There is one source of truth, which is what makes it different from every kanban tool you ' +
    'have to keep in sync by hand.</p>' +
    '<p>You get to add your own fields — a Status column, a priority, a date, a number — and switch between a ' +
    'board view, a table view and a roadmap view of the same data. A Project can also span several repos, which ' +
    'is the one thing the Issues tab genuinely cannot do.</p>' +
    '<p>When to reach for it: above roughly fifteen live items, or when “what is in progress right now” is a ' +
    'question you keep asking. Below that, the issue list with a milestone is faster and needs no setup. For a ' +
    'two-file coursework repo, a Project is furniture. Module 10 goes further.</p>'
  },

  {type:'callout', variant:'info', title:'Discussions vs Issues — one sentence each',
   html:
    '<p><strong>An issue is a task with a state:</strong> something that should end up either done or explicitly ' +
    'not-done, which is why it has a Close button.</p>' +
    '<p><strong>A discussion is a conversation with no end state:</strong> a question, an announcement, a “how do ' +
    'people use this?” thread — which is why it has upvotes and marked answers instead.</p>' +
    '<p>Most repos have only Issues, and that is fine. Large projects turn Discussions on to stop their issue ' +
    'tracker filling with questions that were never going to close. If a repo has both and you are unsure: if ' +
    'somebody could plausibly close it as “done”, it is an issue.</p>'
  },

  {type:'terms', title:'The words you now need',
   items:[
     {term:'Issue', html:'A numbered thread with a title, a Markdown body, a state and metadata. A task, a bug, a question or an idea — the system does not care which.'},
     {term:'Open / Closed', html:'The state. Closed comes in two kinds: <em>completed</em> (purple) and <em>not planned</em> (grey). Closing is free and reversible.'},
     {term:'Label', html:'A coloured tag from a fixed per-repo set. What makes <code>label:bug</code> a reliable filter, which free-form titles never are.'},
     {term:'Assignee', html:'The one person responsible. Enables <code>assignee:@me</code>, which gathers everything you owe across every repo.'},
     {term:'Milestone', html:'A named bucket with a due date and a progress bar. Answers “what must be done by Friday?”.'},
     {term:'<code>#2</code>', html:'A reference. Turns into a live link anywhere in the same repo. Across repos use <code>owner/repo#2</code>.'},
     {term:'<code>Closes #2</code>', html:'In a commit message or PR description: links the two <em>and</em> closes issue 2 when the work reaches the default branch.'},
     {term:'Cross-reference', html:'The automatic two-way link GitHub writes when one issue, PR or commit mentions another. How a project stays navigable.'},
     {term:'Issue template', html:'A pre-written form a repo shows instead of a blank box, so reports arrive with the useful questions already answered.'},
     {term:'Project', html:'A board or table view built from issues and PRs — the same objects, not copies. Useful above roughly fifteen live items.'},
     {term:'Discussion', html:'A conversation with no end state. Issues close; discussions do not.'}
   ]
  },

  {type:'callout', variant:'moment', title:'Three issues to open on your repo before Friday',
   html:
    '<p><strong>#2 — “Fix journal folder name (backslash instead of slash)”.</strong> Label <code>bug</code>. ' +
    'Body: the file is <code>journal\\week6.md</code>, one file with a backslash, not a <code>journal</code> ' +
    'folder. Fix: rename it to <code>journal/week6.md</code> — the forward slash is what creates the folder.</p>' +
    '<p><strong>#3 — “README still contains Week 1 template placeholders”.</strong> Label ' +
    '<code>documentation</code>. Body: <code>e.g. IronCondor</code> is the template’s example not your answer; ' +
    '<code>all of the above 2</code> is a leftover; the angle brackets around the flash-crash paragraph are “fill this ' +
    'in” markers being rendered literally; and <code>correletaed</code> is a typo. Close it with a pull request ' +
    'that ends <code>Closes #3</code>.</p>' +
    '<p><strong>#4 — “Write week 7 journal entry before Friday tutorial”.</strong> No label needed. Milestone: ' +
    '<em>Week 6 submission</em>. It is a to-do, it lives with the project, and it is the first non-code thing you ' +
    'will have tracked here.</p>' +
    '<p>Ten minutes total. Your Issues tab goes from an empty state to a plan, and the next time you open the ' +
    'repo you do not have to remember anything.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Say what an issue is without saying “bug report”, and explain why your first one is <strong>#2</strong>',
     'Write a title and a body that are still actionable three weeks later — what is wrong, why, and the fix',
     'Use labels, assignees and milestones for the three different questions they each answer',
     'Filter a list with <code>is:issue is:open</code>, <code>label:bug</code> and <code>assignee:@me</code> instead of scrolling',
     'Close an issue from a pull request with <code>Closes #2</code>, and say why the link matters more than the automation',
     'Read a timeline: comments, automatic events, and the two-way cross-references between issues, PRs and commits',
     'Tell the difference between Closed as completed and Closed as not planned, and why GitHub bothered',
     'Run something that is not code out of issues — a trading journal, a reading list, a spreadsheet model, a deadline'
   ]
  }

  ]
});
