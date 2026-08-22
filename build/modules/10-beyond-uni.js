/* ============================================================================
   MODULE 10 — "What GitHub is actually capable of (beyond this unit)"
   The closing module. Lands the ending.
   ========================================================================== */

MODULES.push({
  id: 'beyond-uni',
  num: 10,
  title: 'What GitHub is actually capable of (beyond this unit)',
  blurb: 'Everything so far was one repository with two files in it. This is what the same machinery does once you stop thinking of it as a place to hand in coursework.',
  goals: [
    'Publish a free website from a repository, and know exactly what it can and cannot do',
    'Say what class of problem GitHub Actions solves, and recognise when you have one',
    'Use repositories, issues and history for work that is not code — documents, datasets, notes, a trading journal',
    'Run a group assignment on GitHub, and make your first open-source contribution with what you already know'
  ],
  sections: [

  {type:'prose', html:
    '<p class="tut-lead">You started this saying you had used GitHub blindly. Nine modules later you can read a repo ' +
    'page, make a change, explain what a commit is, work on a branch, open a pull request, file an issue, find ' +
    'anything, and decide who gets to see it. That is the whole core of the thing.</p>' +
    '<p>Which means the rest of GitHub is no longer a separate subject. Everything below is built out of the same ' +
    'four ideas you already have — files, commits, branches, and a repository that owns them — arranged for ' +
    'different purposes.</p>' +
    '<p>This module is deliberately about what happens after the unit. Take the two or three things that are ' +
    'actually useful to you and ignore the rest until it becomes relevant.</p>'
  },

  /* ==================== PAGES ==================== */
  {type:'prose', title:'GitHub Pages: a free website, from a repository',
   html:
    '<p>Every repository can be served as a website. Point GitHub at a branch, and the HTML and Markdown files in it ' +
    'become pages on the public internet at <code>yourname.github.io</code> — no hosting bill, no domain to buy, no ' +
    'server to configure.</p>' +
    '<p>It exists because open-source projects all needed documentation sites, and the documentation was already ' +
    'sitting in the repo as Markdown. Rather than have thousands of projects each solve hosting separately, GitHub ' +
    'made the repo itself the website. The side effect is the useful bit for you: a personal site is a repo, so ' +
    'publishing one is a commit.</p>' +
    '<p>Two addresses, one rule. A repo named exactly <code>jordan-lee.github.io</code> is served at ' +
    '<code>https://jordan-lee.github.io/</code> — your main site. Any other repo is served at ' +
    '<code>https://jordan-lee.github.io/repo-name/</code> — a project page. Same mechanism, different ' +
    'address.</p>' +
    '<p>One condition worth knowing before you plan around it: on a free account, Pages only publishes from a ' +
    '<strong>public</strong> repository. That is why the replica below shows <code>trading-journal-practice</code> with a ' +
    'Public badge — it is the state this feature needs, and Module 9 is the argument for when you get there. If you ' +
    'want a site today without touching your coursework repo, make a <em>separate</em> public repo for it.</p>' +
    '<p>What it will not do: run code on the server. There is no database, no login system, no place to receive a ' +
    'form submission. Everything is <strong>static</strong> — files sent exactly as they are, with whatever ' +
    'JavaScript runs in the visitor’s browser. For a portfolio, a CV, a project write-up, lecture notes, a blog, or ' +
    'a page of charts you generated yourself, that limitation costs you nothing.</p>'
  },

  {type:'screen',
   id:'pages',
   label:'Settings → Pages — turning a repository into a website',
   url:'github.com/jordan-lee/trading-journal-practice/settings/pages',
   initial:'setup',
   inertNote:'Inert here. The live path is: Save → then click the live URL that appears.',

   views:{

    setup:{ url:'github.com/jordan-lee/trading-journal-practice/settings/pages', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span>' +
        '<span class="gh-badge">Public</span></div></div></div>' +
      '<div class="gh-page"><div class="gh-settings">' +
        '<div class="gh-settings__nav">' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-gear"/></svg>General</span>' +
          '<span class="gh-settings__navsec">Code and automation</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-git-branch"/></svg>Branches</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-play"/></svg>Actions</span>' +
          '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Pages</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-link-external"/></svg>Environments</span>' +
        '</div>' +
        '<div>' +
          '<h2 class="gh-settings__h">GitHub Pages</h2>' +
          '<p class="gh-muted" style="font-size:13px;margin-top:0">GitHub Pages is designed to host your personal, ' +
          'organization, or project pages from a GitHub repository.</p>' +

          '<div id="pages-status"><div class="gh-flash" data-h="notlive"><svg class="octicon"><use href="#oct-info"/></svg>' +
            '<span>This repository is not currently published. Choose a source and press Save.</span></div></div>' +

          '<h3 class="gh-settings__h2">Build and deployment</h3>' +
          '<div class="gh-formrow" data-h="sourcerow">' +
            '<span class="gh-formrow__label">Source</span>' +
            '<span class="gh-btn">Deploy from a branch<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
            '<div class="gh-formrow__hint">The other option runs a GitHub Actions workflow to build the site first — ' +
            'which is what you would use for a site generator.</div>' +
          '</div>' +
          '<div class="gh-formrow" data-h="branchrow">' +
            '<span class="gh-formrow__label">Branch</span>' +
            '<span style="display:inline-flex;gap:8px;align-items:center">' +
              '<span class="gh-btn"><svg class="octicon"><use href="#oct-git-branch"/></svg>main' +
                '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<span class="gh-btn"><svg class="octicon"><use href="#oct-file-directory-fill"/></svg>/ (root)' +
                '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
              '<span class="gh-btn gh-btn--primary" data-h="pagessave">Save</span></span>' +
            '<div class="gh-formrow__hint">Every push to this branch republishes the site, usually within a minute.</div>' +
          '</div>' +

          '<h3 class="gh-settings__h2">Custom domain</h3>' +
          '<div class="gh-formrow" data-h="customdomain">' +
            '<span class="gh-input" style="display:block;color:var(--gh-fg-subtle)">example.com</span>' +
            '<div class="gh-formrow__hint">Optional. Point a domain you own at the site — the certificate is issued free.</div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    },

    site:{ url:'jordan-lee.github.io/trading-journal-practice/', html:
      '<div style="background:#ffffff;color:#1f2328;min-height:420px;padding:0">' +
        '<div style="background:#0d1117;color:#e6edf3;padding:10px 16px;font-size:12px;display:flex;align-items:center;gap:10px">' +
          '<svg class="octicon"><use href="#oct-mark-github"/></svg>' +
          '<span>You have left GitHub. This is your website, served from the repository.</span>' +
          '<span class="gh-btn gh-btn--sm" style="margin-left:auto" data-h="back-settings">Back to Settings → Pages</span>' +
        '</div>' +
        '<div style="max-width:640px;margin:0 auto;padding:48px 24px;font-family:var(--font-sans)">' +
          '<h1 style="font-size:34px;margin:0 0 6px;color:#1f2328">Jordan Lee</h1>' +
          '<p style="color:#59636e;margin:0 0 28px;font-size:16px">Economics (Finance), year 3 · trading, markets, and things I am building</p>' +
          '<h2 style="font-size:20px;margin:0 0 8px;border-bottom:1px solid #d1d9e0;padding-bottom:6px;color:#1f2328">Markets I follow</h2>' +
          '<ul style="color:#1f2328;font-size:15px;line-height:1.7;margin:0 0 26px;padding-left:20px">' +
            '<li>Index futures</li><li>FX majors</li></ul>' +
          '<h2 style="font-size:20px;margin:0 0 8px;border-bottom:1px solid #d1d9e0;padding-bottom:6px;color:#1f2328">Trading journal</h2>' +
          '<p style="color:#1f2328;font-size:15px;line-height:1.7;margin:0 0 26px">Weekly notes on what I traded, what I ' +
          'expected, and what actually happened. Written in Markdown, versioned in the same repository as this page.</p>' +
          '<p style="color:#59636e;font-size:13px;margin:0">This entire page is one Markdown file in ' +
          '<span style="font-family:var(--font-mono)">jordan-lee/trading-journal-practice</span>. Editing that file ' +
          'and committing republishes the site.</p>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="pagessave"]', once:true,
      replace:{target:'#pages-status', html:
        '<div class="gh-flash gh-flash--success" data-h="livebanner"><svg class="octicon"><use href="#oct-check-circle"/></svg>' +
        '<span>Your site is live at <span class="gh-link" data-h="liveurl" style="font-family:var(--font-mono)">' +
        'https://jordan-lee.github.io/trading-journal-practice/</span> · ' +
        '<span class="gh-muted">Last deployed just now</span></span></div>'},
      explain:{title:'That repository is now a website',
       html:'<p>One dropdown and one button. GitHub took the files on <code>main</code>, rendered the Markdown into ' +
            'HTML, and served the result at a real address that anybody can open.</p>' +
            '<p>Nothing about the repository changed. The same files are still there, the same history, the same ' +
            'commits. Pages is a second way of <em>reading</em> the repo, not a copy of it — which is why every ' +
            'future push to <code>main</code> updates the site automatically, with no separate publish step.</p>' +
            '<p>Click the green address to see what a visitor gets.</p>'}},
     {on:'[data-h="liveurl"]', view:'site'},
     {on:'[data-h="back-settings"]', view:'setup'},
     {on:'[data-h="customdomain"]', toast:'A custom domain needs a DNS record at your registrar. Free HTTPS certificate either way.'}
   ],

   hotspots:[
    {sel:'[data-h="sourcerow"]', place:'right', title:'Source — where the website comes from',
     what:'<p>Which part of the repository becomes the site. “Deploy from a branch” serves files directly; “GitHub Actions” runs a build first, for sites written in a generator like Jekyll or Hugo.</p>',
     why:'<p>Some people want to publish handwritten HTML immediately. Others want to write Markdown and have a tool turn it into a themed site. One setting covers both without two products.</p>',
     how:'<p>Leave it on “Deploy from a branch” unless you are using a site generator. That is the ten-minute version: write <code>index.md</code>, save, done.</p>',
     fail:'<p>Choosing the Actions source with no workflow file in the repo. The build never runs, the site never appears, and the page gives you no hint that you asked for a build nobody wrote.</p>',
     when:'<p>Right at the start. Changing it later republishes the whole site, which is harmless but confusing while you are still learning what caused what.</p>'},

    {sel:'[data-h="branchrow"]', place:'right', title:'Branch and folder — the actual switch',
     what:'<p>Which branch to publish, and which folder inside it. <code>main</code> and <code>/ (root)</code> means “everything at the top level of the main branch is the website”.</p>',
     why:'<p>Plenty of projects want their site kept apart from their code — hence the option of a <code>/docs</code> folder or a separate branch. Keeping it configurable means one repo can be both a project and its own documentation site.</p>',
     how:'<p>Pick <code>main</code>, pick <code>/ (root)</code>, click <strong>Save</strong> — it works here, try it. The first deploy takes about a minute; after that every push republishes automatically.</p>',
     fail:'<p>There must be an <code>index.html</code> or <code>index.md</code> at the top of that folder, or the address returns a 404 with no explanation. A repo of Markdown files with no index publishes a working site with no front page.</p>',
     when:'<p>The first time you want something on the internet with your name on it. Ten minutes, start to finish, and it costs nothing.</p>'},

    {sel:'#pages-status', place:'right', title:'The status banner — and the live address',
     what:'<p>Before you save it tells you the repo is unpublished. After you save it turns green and shows the real URL of your site.</p>',
     why:'<p>Publishing is asynchronous — GitHub has to build and distribute the site — so there has to be somewhere that tells you whether the thing actually happened.</p>',
     how:'<p>Press Save, watch this box change, then click the address (that works too). The address follows a fixed pattern, so you can predict it before it exists.</p>',
     fail:'<p>The banner says live while the browser still shows the old version, because the page is cached. A hard refresh, or a private window, is the check that means anything.</p>',
     when:'<p>Any time you push a change to the site and it looks like nothing happened. Look here first: it timestamps the last deploy.</p>'},

    {sel:'[data-h="customdomain"]', place:'right', title:'Custom domain',
     what:'<p>Serves the same site from a domain you own — <code>jordan-lee.com</code> — instead of the <code>github.io</code> address.</p>',
     why:'<p>A personal domain outlives any one host. GitHub supports it, and issues the HTTPS certificate free, so that moving your site later does not break every link to it.</p>',
     how:'<p>Buy the domain, add a DNS record at the registrar pointing to GitHub, type the domain here, tick “Enforce HTTPS”. Roughly fifteen minutes, most of it waiting for DNS.</p>',
     fail:'<p>Typing the domain here without creating the DNS record. GitHub shows an unverified warning and the domain resolves nowhere, which looks like a GitHub fault and is not.</p>',
     when:'<p>Only worth it once the site is something you would put on a CV. The <code>github.io</code> address works perfectly well until then.</p>'}
   ]
  },

  /* ==================== ACTIONS ==================== */
  {type:'prose', title:'GitHub Actions: things that happen by themselves',
   html:
    '<p>An Action is a job that runs on GitHub’s computers when something happens in your repository. Three parts, ' +
    'and you can hold all three in your head at once.</p>' +
    '<p><strong>A trigger</strong> — the event that starts it. Someone pushed a commit. Someone opened a pull ' +
    'request. It is 7am. You clicked a button. <strong>A runner</strong> — a fresh, empty computer GitHub starts up ' +
    'for you, runs your job on, and throws away afterwards. <strong>Steps</strong> — the ordered list of things to ' +
    'do on it, each either a shell command or a prepackaged action someone else wrote.</p>' +
    '<p>The reason it exists is that the rules a team agrees on are the rules a team forgets at 2am. “Run the tests ' +
    'before merging” and “rebuild the site after every change” are exactly the kind of instruction a machine follows ' +
    'perfectly and a tired human does not. Actions moves those from the honour system to the server.</p>' +
    '<p>The class of problem it solves, stated plainly: <strong>anything you would otherwise have to remember to do ' +
    'every time something changes, or every morning.</strong> Check a file for errors on every commit. Rebuild and ' +
    'republish a website. Download yesterday’s closing prices at 6am and commit them into a data folder. Email you ' +
    'when a page you watch changes. Turn a folder of Markdown into a PDF whenever you edit it.</p>' +
    '<p>You configure it with a YAML file under <code>.github/workflows/</code>, which this tutorial is not going to ' +
    'teach — the point right now is recognising when you have a problem shaped like this one. When you do, GitHub ' +
    'offers ready-made starter workflows from the Actions tab and you fill in the blanks.</p>'
  },

  {type:'screen',
   id:'actions',
   label:'The Actions tab — a workflow that runs itself every morning',
   url:'github.com/jordan-lee/trading-journal-practice/actions',
   initial:'runs',
   inertNote:'Inert here. The live parts are the run rows and, inside a run, the step rows — click one to expand its log.',

   views:{

    runs:{ url:'github.com/jordan-lee/trading-journal-practice/actions', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab gh-tab--active" data-h="actionstab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page"><div class="gh-layout gh-layout--narrow" style="grid-template-columns:220px minmax(0,1fr)">' +
        '<div>' +
          '<div class="gh-b" style="margin-bottom:8px">Workflows</div>' +
          '<div class="gh-settings__nav" data-h="workflowlist">' +
            '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-play"/></svg>Daily close snapshot</span>' +
            '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-check"/></svg>Check journal formatting</span>' +
            '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Publish site</span>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="gh-listbox">' +
            '<div class="gh-listbox__head"><span>Daily close snapshot</span>' +
              '<span class="gh-muted" style="margin-left:auto;font-weight:400;font-size:12px">Trigger: schedule, 06:00 daily · and on push to main</span></div>' +
            '<div class="gh-listrow" data-h="run-latest">' +
              '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
              '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Fetch and commit yesterday’s closes</span>' +
                '<span class="gh-listrow__meta" style="display:block">Daily close snapshot #58 · scheduled · main</span></span>' +
              '<span class="gh-listrow__right"><span style="font-size:12px">6 hours ago</span>' +
                '<span class="gh-mono">41s</span></span>' +
            '</div>' +
            '<div class="gh-listrow">' +
              '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
              '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Fetch and commit yesterday’s closes</span>' +
                '<span class="gh-listrow__meta" style="display:block">Daily close snapshot #57 · scheduled · main</span></span>' +
              '<span class="gh-listrow__right"><span style="font-size:12px">1 day ago</span>' +
                '<span class="gh-mono">38s</span></span>' +
            '</div>' +
            '<div class="gh-listrow" data-h="run-failed">' +
              '<svg class="octicon gh-listrow__icon" style="color:var(--gh-danger-fg)"><use href="#oct-x"/></svg>' +
              '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Fetch and commit yesterday’s closes</span>' +
                '<span class="gh-listrow__meta" style="display:block">Daily close snapshot #56 · scheduled · main</span></span>' +
              '<span class="gh-listrow__right"><span style="font-size:12px">2 days ago</span>' +
                '<span class="gh-mono">12s</span></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    },

    run:{ url:'github.com/jordan-lee/trading-journal-practice/actions/runs/58', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap">' +
          '<span style="font-size:20px;font-weight:600">Fetch and commit yesterday’s closes</span>' +
          '<span class="gh-state gh-state--open gh-state--sm"><svg class="octicon octicon--sm"><use href="#oct-check"/></svg>Success</span>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-runs"><svg class="octicon"><use href="#oct-arrow-left"/></svg>All runs</span>' +
        '</div>' +
        '<div class="gh-muted" style="font-size:12px;margin-bottom:18px" data-h="runmeta">Daily close snapshot #58 · ' +
          'triggered by <b>schedule</b> at 06:00 · ran on <span class="gh-mono">ubuntu-latest</span> · total 41s</div>' +
        '<div class="gh-listbox" data-h="steplist">' +
          '<div class="gh-listbox__head"><span>Jobs and steps</span>' +
            '<span class="gh-muted" style="margin-left:auto;font-weight:400;font-size:12px">Click a step to expand its log</span></div>' +
          '<div class="gh-listrow" data-h="step-checkout">' +
            '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
            '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Check out the repository</span>' +
              '<span class="gh-listrow__meta" style="display:block">actions/checkout@v4</span></span>' +
            '<span class="gh-listrow__right"><span class="gh-mono">2s</span></span>' +
          '</div>' +
          '<div class="gh-listrow">' +
            '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
            '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Set up Python</span>' +
              '<span class="gh-listrow__meta" style="display:block">actions/setup-python@v5</span></span>' +
            '<span class="gh-listrow__right"><span class="gh-mono">6s</span></span>' +
          '</div>' +
          '<div class="gh-listrow" data-h="step-run">' +
            '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
            '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Run fetch_closes.py</span>' +
              '<span class="gh-listrow__meta" style="display:block">shell command · uses the secret MARKET_API_KEY</span></span>' +
            '<span class="gh-listrow__right"><span class="gh-mono">28s</span></span>' +
          '</div>' +
          '<div class="gh-listrow" data-h="step-commit">' +
            '<svg class="octicon gh-listrow__icon" style="color:var(--gh-success-fg)"><use href="#oct-check-circle"/></svg>' +
            '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">Commit data/2026-08-06.csv</span>' +
              '<span class="gh-listrow__meta" style="display:block">the workflow committed to your repo, as a bot</span></span>' +
            '<span class="gh-listrow__right"><span class="gh-mono">5s</span></span>' +
          '</div>' +
        '</div>' +
        '<div id="steplog"></div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="run-latest"]', view:'run', explain:{title:'A run is a receipt',
       html:'<p>Every time a workflow fires, GitHub keeps the whole record: what triggered it, which machine it ran ' +
            'on, every step, how long each took, and the complete log output.</p>' +
            '<p>That is the part that makes automation trustworthy rather than spooky. When something runs at 6am ' +
            'while you are asleep, you can come back and read exactly what it did — the same way the commit history ' +
            'lets you read exactly what you did.</p>' +
            '<p>Click any step row to expand its log.</p>'}},
     {on:'[data-h="run-failed"]', toast:'A red cross is a failed run. GitHub emails you, and the log tells you which step broke and on which line.'},
     {on:'[data-h="back-runs"]', view:'runs'},
     {on:'[data-h="step-run"]',
      replace:{target:'#steplog', html:
        '<div style="border:1px solid var(--gh-border-default);border-radius:6px;margin-top:14px;overflow:hidden">' +
          '<div style="padding:8px 12px;background:var(--gh-canvas-subtle);font-size:12px;font-weight:600">' +
            'Log — Run fetch_closes.py</div>' +
          '<pre style="margin:0;padding:12px;background:var(--gh-canvas-inset);font-family:var(--font-mono);' +
            'font-size:12px;line-height:1.7;overflow-x:auto;color:var(--gh-fg-default)">' +
            '<span style="color:var(--gh-fg-subtle)">06:00:04</span> Requesting closes for 2026-08-06\n' +
            '<span style="color:var(--gh-fg-subtle)">06:00:19</span> 503 rows received\n' +
            '<span style="color:var(--gh-fg-subtle)">06:00:31</span> Wrote data/2026-08-06.csv\n' +
            '<span style="color:var(--gh-success-fg)">06:00:32 Process completed with exit code 0.</span></pre>' +
        '</div>'},
      toast:'The API key it used came from Settings → Secrets, never from a file in the repo.'},
     {on:'[data-h="step-checkout"]', toast:'Every run starts on an empty machine, so step one is always “fetch a copy of the repository”.'},
     {on:'[data-h="step-commit"]', toast:'A workflow can commit back into the repo. Those commits appear in your history like any other, authored by a bot.'}
   ],

   hotspots:[
    {sel:'[data-h="workflowlist"]', place:'right', title:'Workflows — one file each, listed down the side',
     what:'<p>Each entry is one YAML file in <code>.github/workflows/</code>. This repo has three: a scheduled data fetch, a check that runs on every commit, and a site publisher.</p>',
     why:'<p>Keeping each automation in its own file means you can add, disable or delete one without touching the others — and because the files live in the repo, the automation is versioned alongside the thing it automates.</p>',
     how:'<p>Add one by creating the file, or use Actions → New workflow and pick from GitHub’s starter templates. The file appears in your repo like any other and you edit it with the pencil.</p>',
     fail:'<p>The folder name is exact: <code>.github/workflows/</code>. Put the file anywhere else — <code>workflows/</code>, <code>.github/</code> — and GitHub ignores it completely, with no error to tell you why nothing runs.</p>',
     when:'<p>The first time you catch yourself doing the same small chore after every change. That is the signal.</p>'},

    {sel:'[data-h="run-latest"]', place:'left', title:'A run row — green tick, trigger, duration',
     what:'<p>One row per execution: whether it succeeded, what set it off, which branch, when, and how long it took.</p>',
     why:'<p>Automation you cannot inspect is automation you cannot trust. The run list is the audit trail — the same idea as commit history, applied to things the machine did rather than things you did.</p>',
     how:'<p>Click a row (it works) to open the run and see every step. Green tick means every step succeeded; a red cross means one failed and everything after it was skipped.</p>',
     fail:'<p>Ignoring a red cross for a fortnight. Failed runs are silent unless you read your email, and a broken daily job leaves a hole in your data that nothing backfills automatically.</p>',
     when:'<p>Whenever something that should have happened by itself did not. This page tells you whether the job ran and failed, or never fired at all — two very different problems.</p>'},

    {sel:'[data-h="runmeta"]', view:'run', place:'bottom', title:'“triggered by schedule · ran on ubuntu-latest”',
     what:'<p>The two facts that make Actions concrete: what started this run, and what computer it ran on. <code>ubuntu-latest</code> is a fresh virtual machine GitHub created for the job and destroyed afterwards.</p>',
     why:'<p>Running your job on a clean machine every time means it cannot depend on anything you happened to have installed. If it works on the runner, it works anywhere — which is precisely why teams trust automated checks over “it works on mine”.</p>',
     how:'<p>You name the trigger and the machine in the workflow file: <code>on: schedule</code> for a clock, <code>on: push</code> for every commit, <code>on: pull_request</code> for every PR.</p>',
     fail:'<p>Because the machine is destroyed, anything the job produces is gone unless it is committed, uploaded as an artifact, or sent somewhere. People write a file, see it in the log, and then cannot find it.</p>',
     when:'<p>The moment you want something to happen while your laptop is shut. That is the whole reason to move a script off your own machine.</p>'},

    {sel:'[data-h="steplist"]', view:'run', place:'left', title:'The steps — an ordered list, top to bottom',
     what:'<p>What the job actually did, in order. Some steps are prepackaged actions written by other people (<code>actions/checkout</code>); some are plain shell commands.</p>',
     why:'<p>Nearly every automation starts by fetching the repository and setting up a language, so those became shareable building blocks rather than something everyone rewrites. That library of reusable steps is most of what makes Actions practical.</p>',
     how:'<p>Click a step to expand its log — try <em>Run fetch_closes.py</em>. Each line is timestamped, so a slow job tells you exactly which step is slow.</p>',
     fail:'<p>Steps run in order and stop at the first failure. If step two fails, steps three and four never run at all — so an empty log for a later step means it was skipped, not that it did nothing.</p>',
     when:'<p>Every time a run goes red. Open it, find the first red step, read the last few lines of its log. The answer is almost always there.</p>'},

    {sel:'[data-h="step-run"]', view:'run', place:'left', title:'The step that uses a secret',
     what:'<p>This step calls a market data API, and the key it needs comes from Settings → Secrets and variables, not from any file in the repository.</p>',
     why:'<p>Automation needs credentials, and the whole point of Module 9 was that credentials must not live in files. Encrypted repository secrets exist exactly to close that gap.</p>',
     how:'<p>Store the value once in Settings → Secrets, refer to it by name in the workflow. GitHub hands it to the runner at run time and masks it if anything tries to print it into the log.</p>',
     fail:'<p>Pasting the key straight into the workflow file instead. The workflow file is a file in your repository — on a public repo you have just published the key, and the log masking does not save you.</p>',
     when:'<p>Any automation that talks to a service you have an account with: market data, a mail sender, a cloud store.</p>'}
   ]
  },

  /* ==================== GISTS ==================== */
  {type:'prose', title:'Gists: a repository without the ceremony',
   html:
    '<p>A gist is a snippet with its own page, its own history and its own comments, created from a single box at ' +
    '<code>gist.github.com</code>. No repo name, no README, no settings — you paste, you name the file, you create.</p>' +
    '<p>They exist because a whole repository is too much machinery for one file. Somebody wants to send you eleven ' +
    'lines of Python or a config snippet, and creating a repo for that leaves clutter on their profile forever.</p>' +
    '<p>Gists come in two flavours and the naming is a trap. <strong>Public</strong> gists appear on your profile ' +
    'and in gist search. <strong>Secret</strong> gists do not — but anybody with the link can open one, so “secret” ' +
    'means unlisted rather than private. Never put anything in a secret gist that you would mind a stranger reading.</p>' +
    '<p>Reach for a gist when: you want to send someone one file, you want a scratchpad with version history, or you ' +
    'want a snippet you can find again in a year. Reach for a repository instead the moment there are two files that ' +
    'refer to each other, or the moment the thing needs a README to make sense.</p>'
  },

  /* ==================== FORKING ==================== */
  {type:'prose', title:'Forking: the legitimate way to learn from other people’s work',
   html:
    '<p>You cannot commit to a stranger’s repository — you have no write access, and that is the point. Forking ' +
    'makes you a complete copy under your own account, with the whole history, that stays linked back to the ' +
    'original.</p>' +
    '<p>Two quite different uses, and confusing them is the usual beginner error. The first is <strong>take it and ' +
    'break it</strong>: fork a project, change the numbers, run it, see what stops working. Reading code teaches you ' +
    'a fraction of what changing it does, and a fork is a copy nobody can be annoyed about. The second is ' +
    '<strong>contribute back</strong>: fork, fix something, open a pull request from your fork to theirs. Because ' +
    'the link is preserved, GitHub knows how to offer that.</p>' +
    '<p>What forking is <em>not</em> is a backup or a way to work on your own project. For your own repo, use a ' +
    'branch — Module 5. People who fork their own work end up with two copies, edit the wrong one for a week, and ' +
    'lose track of which is real.</p>' +
    '<p>Two practical notes. A fork does not update itself: the original moves on, and yours sits where you left it ' +
    'until you press “Sync fork”. And a fork of a public repo is public, so anything you commit to it is published ' +
    '— which puts it under everything in Module 9.</p>'
  },

  /* ==================== NOT CODE ==================== */
  {type:'prose', title:'GitHub for things that are not code',
   html:
    '<p>Nothing in Git knows what a programming language is. It tracks text files and who changed which line when. ' +
    'Any work that is text, that you iterate on, and where you would ever want to see an earlier version, fits — ' +
    'which is far more of your life than it sounds.</p>' +
    '<p>Concretely, and by workflow rather than by noun:</p>' +
    '<ul>' +
    '<li><strong>A trading journal.</strong> One Markdown file per week in a <code>journal/</code> folder. Each ' +
    'entry commits on the day you wrote it, so the timestamps are evidence you cannot fake to yourself. Six months ' +
    'later the history shows what you believed <em>before</em> the trade, not the version you would rather remember. ' +
    'That is the exact reason a desk keeps a blotter, and it is the same audit-trail argument.</li>' +
    '<li><strong>A thesis or a long report.</strong> Especially in LaTeX, which is plain text. Every draft is a ' +
    'commit; a supervisor’s round of comments is an issue list; a rewrite you are not sure about is a branch you can ' +
    'abandon without losing the version that worked.</li>' +
    '<li><strong>Datasets and research.</strong> A CSV in version control means “which numbers did I use in the ' +
    'regression I ran in March?” has an exact answer, and the diff shows you precisely which rows changed when the ' +
    'source was revised.</li>' +
    '<li><strong>Lecture notes and a personal wiki.</strong> One repo of Markdown files, searchable with the ' +
    'qualifiers from Module 8, readable on any machine, and publishable as a website with the Pages switch above.</li>' +
    '<li><strong>Budgets and financial models.</strong> A spreadsheet is a binary file, so the diff is unhelpful — ' +
    'but a model written as CSV plus a script gets you a proper line-by-line history of every assumption you ' +
    'changed. Anyone who has emailed themselves <em>budget_v7_FINAL_final.xlsx</em> knows what problem that solves.</li>' +
    '<li><strong>Anything with a to-do list attached.</strong> The issue tracker is not about bugs. It is a list of ' +
    'open questions that lives next to the work instead of in your head, with a number, a status and a thread.</li>' +
    '</ul>' +
    '<p>The one real limitation: Git handles text brilliantly and binary files badly. Word documents, Excel ' +
    'workbooks, images and PDFs all get stored, but you get no meaningful diff, and every version is kept whole, so ' +
    'the repo grows fast. Keep the sources in text where you can.</p>'
  },

  /* ==================== PORTFOLIO ==================== */
  {type:'prose', title:'Your GitHub as a portfolio, honestly',
   html:
    '<p>The honest version: recruiters and hiring managers do look, but not for long and not at everything. What ' +
    'actually happens is that somebody opens your profile for about thirty seconds, reads the top of the page, and ' +
    'clicks at most one repository.</p>' +
    '<p>Which tells you where the effort goes. <strong>One well-explained project beats ten empty ones.</strong> ' +
    'A repo with a README that says what the thing does, why you built it, what you would change, and how to run it ' +
    'is worth more than a wall of repos called <code>test</code>, <code>test2</code> and <code>practice</code>.</p>' +
    '<p>A good student portfolio repo has five things: a clear name, a one-line description in the About box, a ' +
    'README that opens with what it is and who it is for, a screenshot or a worked example, and a commit history ' +
    'that shows the thing being built rather than one commit called “final”. None of that requires the project ' +
    'itself to be impressive.</p>' +
    '<p>Your three levers, in order of return: the <strong>profile README</strong>, because it is the first thing on ' +
    'the page and almost nobody has one; <strong>pinned repositories with real descriptions</strong>, because they ' +
    'are what gets clicked; and the <strong>contribution graph</strong>, which is weak evidence on its own but ' +
    'corroborates everything else. Module 8 covered all three — this is the reason they mattered.</p>'
  },

  /* ==================== COLLABORATION ==================== */
  {type:'prose', title:'Working with other people',
   html:
    '<p>Two ways to share a repository. <strong>Collaborators</strong> — you add individuals to one repo, at one of ' +
    'five access levels. Right for a group assignment. <strong>Organizations</strong> — an account owned by a group, ' +
    'which owns repos, with <em>teams</em> inside it that get access in bulk. Right for a club, a society, a startup, ' +
    'or a course, which is exactly what <code>coursework</code> and <code>coursework</code> in your dashboard are.</p>' +
    '<p>The reason organizations exist is turnover. If a repo belongs to whoever created it, then that person ' +
    'graduating takes the work with them. An organization owns it independently of any member, so people can join ' +
    'and leave without the project moving.</p>'
  },

  {type:'steps', title:'How a group assignment actually runs on GitHub',
   items:[
     {label:'One person creates the repo and adds the others',
      html:'<p>Settings → Collaborators → Add people, using their exact usernames. Give everyone <strong>Write</strong>, ' +
           'not Admin. Everyone has to accept the invitation before they can see anything, which is the single most ' +
           'common “it is not working” in a group.</p>'},
     {label:'Agree that nobody commits straight to main',
      html:'<p>Then make the server enforce it: Settings → Branches → require a pull request before merging. Without ' +
           'that rule, two people editing the same file on main is how a group loses an afternoon’s work — and ' +
           'nobody notices until it is gone.</p>'},
     {label:'One branch per person, per piece of work',
      html:'<p><code>adam/literature-review</code>, <code>sam/data-cleaning</code>. Branch names with the author in ' +
           'front make the branch list readable at a glance. Module 5 is the mechanics.</p>'},
     {label:'Issues are the division of labour',
      html:'<p>One issue per task, assigned to a person, with a deadline in the title if it matters. “Who is doing ' +
           'the regression section?” stops being a group-chat question and becomes a page anyone can look at.</p>'},
     {label:'Pull requests are how work arrives',
      html:'<p>Open a PR when the piece is ready, tag a partner to review, merge once someone has actually read it. ' +
           'This is also, incidentally, an unarguable record of who wrote what — useful when a group member ' +
           'disappears in week eleven.</p>'},
     {label:'Tag the version you submitted',
      html:'<p>After the final merge, create a release or a tag called something like <code>submitted</code>. Then ' +
           '“what exactly did we hand in?” has a one-word answer forever, whatever anybody edits afterwards.</p>'}
   ]
  },

  /* ==================== OPEN SOURCE ==================== */
  {type:'prose', title:'Open source, demystified',
   html:
    '<p>Open source sounds like a club you need an invitation to. It is not: it is a public repository whose owner ' +
    'accepts pull requests from strangers. You already know every mechanical step involved.</p>' +
    '<p>The way in is a label. Most projects tag easy tasks <code>good first issue</code>, and GitHub lets you search ' +
    'across all of them — <code>label:"good first issue" is:issue is:open language:python</code>, plus ' +
    '<code>pushed:&gt;2026-01-01</code> so you do not pick a dead project. That is a Module 8 query doing something ' +
    'genuinely useful.</p>' +
    '<p>Then it is: <strong>fork</strong> their repo → make a <strong>branch</strong> → <strong>commit</strong> your ' +
    'change → open a <strong>pull request</strong> back to theirs → answer whatever the maintainer says. Modules 5, ' +
    '6 and 7, applied to somebody else’s project. Read their <code>CONTRIBUTING.md</code> first if there is one — ' +
    'it exists to save both of you a round of comments.</p>' +
    '<p>Start smaller than feels respectable. A typo in the documentation, a broken link, an example that no longer ' +
    'runs — these are real contributions, they get merged, and they teach you the whole loop with nothing at stake. ' +
    'Doing it once is disproportionately valuable: it converts “I have used GitHub” into “I have had a change ' +
    'reviewed and merged by a stranger”, which is a different sentence entirely.</p>'
  },

  {type:'callout', variant:'info', title:'GitHub Desktop and VS Code — here is the door',
   html:
    '<p>This whole tutorial has been deliberately web-only, because the browser is where you can see what is ' +
    'happening. There are two obvious next steps, and neither is urgent.</p>' +
    '<p><strong>GitHub Desktop</strong> is a free app that does the Git part with buttons: it shows you which files ' +
    'you have changed, lets you tick the ones to include, and has one button for commit and one for push. What it ' +
    'buys you is working on more than one file at a time, and being able to work offline — the web pencil edits ' +
    'exactly one file per commit, which gets painful fast.</p>' +
    '<p><strong>VS Code</strong> is a code editor with Git built in. What it buys you is doing the editing and the ' +
    'committing in the same place, plus a proper side-by-side diff before you commit. If you are writing anything ' +
    'longer than a README, you will end up here.</p>' +
    '<p>And the halfway house you already know: press <code>.</code> on any repository on github.com and the same ' +
    'editor opens in your browser, with nothing installed. Try that before you download anything.</p>'
  },

  /* ==================== WHERE NEXT ==================== */
  {type:'prose', title:'Where to go next',
   html:
    '<p><strong>GitHub Skills</strong> (<code>skills.github.com</code>) is GitHub’s own set of short interactive ' +
    'courses — a bot opens pull requests on a practice repo and walks you through responding to them. It is the ' +
    'closest thing to this tutorial that GitHub runs itself.</p>' +
    '<p><strong>GitHub Docs</strong> (<code>docs.github.com</code>) is the reference. Search it when you have a ' +
    'specific question; do not read it front to back. It is accurate and complete, which also makes it a poor ' +
    'place to learn from cold.</p>' +
    '<p>Everything else you will pick up by needing it. The failure mode from here is not ignorance, it is never ' +
    'opening the site again — so the list below is deliberately short and specific.</p>'
  },

  {type:'callout', variant:'tip', title:'Five things to do in your own account this week',
   html:
    '<p><strong>1. Fix the README.</strong> Replace <em>e.g. IronCondor</em> with a real alias, replace ' +
    '<em>all of the above 2</em> with an actual answer, and take the angle brackets off the flash-crash paragraph. ' +
    'Ten minutes, and it is the file everyone reads first.</p>' +
    '<p><strong>2. Rename <code>journal\\week6.md</code> to <code>journal/week6.md</code>.</strong> Open the file, ' +
    'click the pencil, change the backslash to a forward slash in the filename box, commit. Watch GitHub turn it ' +
    'into a folder.</p>' +
    '<p><strong>3. Fill in the About box.</strong> One line of description, two topics. Thirty seconds.</p>' +
    '<p><strong>4. Create your profile README</strong> — a repo named <code>jordan-lee</code>. Four lines ' +
    'about who you are and what you are studying. This is the public portfolio piece that costs you nothing.</p>' +
    '<p><strong>5. Turn on two-factor authentication and save the recovery codes somewhere that is not your ' +
    'phone.</strong> Fifteen minutes total for all five, and every one of them is permanent.</p>'
  },

  {type:'terms', title:'The last set of words',
   items:[
     {term:'GitHub Pages', html:'A website served straight from a repository, free, at <code>username.github.io</code>. Static files only — no server, no database.'},
     {term:'Static site', html:'A site made of files sent exactly as they are. Fast, free to host, and incapable of storing anything a visitor submits.'},
     {term:'Actions / workflow', html:'A job that runs on GitHub’s computers when a trigger fires. Defined by a YAML file in <code>.github/workflows/</code>.'},
     {term:'Runner', html:'The fresh virtual machine a workflow runs on. Created for the job, destroyed afterwards — so anything it produces must be saved deliberately.'},
     {term:'Gist', html:'A single-file snippet with its own history and comments. “Secret” means unlisted, not private.'},
     {term:'Fork', html:'Your own copy of someone else’s repo, linked back to the original so you can offer changes as a pull request.'},
     {term:'Organization', html:'An account owned by a group rather than a person, containing repos and teams. Survives members joining and leaving.'},
     {term:'good first issue', html:'The conventional label maintainers put on tasks suitable for a newcomer. Searchable across the whole of GitHub.'}
   ]
  },

  /* ==================== CLOSING ==================== */
  {type:'prose', title:'Where you started, and where you are',
   html:
    '<p>You opened this saying you had used GitHub before but had been clicking blindly, with no idea how to ' +
    'navigate it. That was an accurate description, and it is worth being specific about what has changed, because ' +
    '“you learned GitHub” is not a useful thing to be told.</p>' +
    '<p>You can look at a repository page and account for every strip of it. You can read a URL and know where it ' +
    'points before the page loads. You know that <code>journal\\week6.md</code> is one file with a backslash in its ' +
    'name rather than a folder, why it happened, and how to fix it in a single commit. You know that your README ' +
    'still contains the template’s own instructions, and why the degree line runs together. You can make a change, ' +
    'write a commit message that will still mean something in November, and find that change again in the history.</p>' +
    '<p>You know what a branch is for and that it is not a backup. You can open a pull request and say what it is ' +
    'protecting against. You can file an issue that will still be legible to you in three weeks. You can find ' +
    'anything you own with one line of query syntax. And you can say precisely who can see your repository today, ' +
    'what changes the moment you flip it, and why the order is rotate-then-clean if a key ever gets in.</p>' +
    '<p>None of that is knowledge about a website. It is a way of working — keep a history, make changes in the open, ' +
    'write down why — that happens to be implemented as buttons on github.com. It transfers to your thesis, your ' +
    'trading journal, a group assignment, and whatever you build after this degree.</p>' +
    '<p>The two files in <code>trading-journal-practice</code> are still not fixed. Go and fix them. You now know exactly ' +
    'what is wrong with each one, exactly which click changes it, and exactly what will appear in the history ' +
    'afterwards — which is the difference between using GitHub blindly and using it.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Publish a free website from a repository in about ten minutes, and say why it cannot have a database',
     'Recognise an Actions-shaped problem — anything you would otherwise remember to do after every change, or every morning',
     'Read a workflow run like a receipt: trigger, runner, steps, logs, and what a red cross means',
     'Choose between a gist and a repository, and know that a “secret” gist is unlisted rather than private',
     'Fork someone’s project to learn from it, and tell that apart from branching your own',
     'Use repositories, issues and history for a thesis, a dataset, lecture notes or a trading journal — and say why binary files are the exception',
     'Set a group assignment up properly: collaborators with Write, a protected main, one branch each, issues as the division of labour',
     'Find a <code>good first issue</code> and take it through fork → branch → commit → pull request',
     'Name your next three moves in your own account, and finish the two fixes still sitting in <strong>trading-journal-practice</strong>'
   ]
  }

  ]
});
