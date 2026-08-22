/* ============================================================================
   MODULE 08 — "Finding things: search, the dashboard, other people's code"
   Shape copied from 02-repo-anatomy.js. One MODULES.push({...}) statement.
   ========================================================================== */

MODULES.push({
  id: 'search-and-discovery',
  num: 8,
  title: 'Finding things: search, the dashboard, other people’s code',
  blurb: 'Seven modules in, you can read a repo. This one is about getting to it — from the logged-in home page, from the search box, from a URL you type yourself, and from somebody else’s project you found at 1am.',
  goals: [
    'Get from github.com to any repo you own in two clicks, and know why the list is ordered the way it is',
    'Write a search query with qualifiers — <code>user:</code>, <code>repo:</code>, <code>language:</code>, <code>is:issue</code> — instead of scrolling',
    'Read and hand-edit a GitHub URL so you can jump anywhere without hunting for a button',
    'Judge an unfamiliar repo in about five seconds, and use stars, watching and forks as tools rather than decoration'
  ],
  sections: [

  {type:'prose', html:
    '<p class="tut-lead">Navigating GitHub is really three separate questions, and beginners lose time because they ' +
    'try to answer all three with the same move — scrolling.</p>' +
    '<p><strong>Where are my things?</strong> That is the logged-in home page at <code>github.com</code>, which is ' +
    'nothing like the marketing page you see when logged out. <strong>Where is one specific thing inside a project?</strong> ' +
    'That is the search box, the file finder, and the URL bar. <strong>Where is everyone else’s stuff?</strong> That is ' +
    'Explore, Topics, and search with the whole of GitHub as its scope.</p>' +
    '<p>Each has its own tool. The rest of this module is those tools, in that order, with the highest-leverage skill ' +
    '— search qualifiers — in the middle.</p>'
  },

  {type:'callout', variant:'tip', title:'The one habit that fixes most of this',
   html:
    '<p>GitHub is a website where the address bar is faster than the interface. Every page has a predictable URL, ' +
    'and typing one is quicker than three clicks and a scroll. That is unusual, and it is why the URL section further ' +
    'down is not filler.</p>' +
    '<p>Second habit: press <code>/</code> instead of reaching for the mouse. It focuses the search box on almost ' +
    'every page. Both of these take a week to become automatic and then save you time for years.</p>'
  },

  /* ==================== SCREEN 1 — THE DASHBOARD ==================== */
  {type:'prose', title:'Your logged-in home page',
   html:
    '<p>When you are signed in, <code>github.com</code> shows you a three-column dashboard. It is not a landing page ' +
    'and it is not a list of your repos — it is three unrelated things sitting side by side, which is exactly why it ' +
    'looks confusing until someone splits it up for you.</p>' +
    '<p>This is your real one, rebuilt from your account: the seven repositories GitHub currently lists on the left, ' +
    'a feed in the middle, and GitHub’s own changelog on the right. Click the markers, or press ' +
    '<strong>Walk me through it</strong>.</p>'
  },

  {type:'screen',
   id:'dash',
   label:'github.com — your dashboard, and your profile page',
   url:'github.com',
   initial:'home',
   inertNote:'That control is real on GitHub but inert here. The live parts of this screen are the numbered markers, the repository rows, your avatar and the “Home” feed links.',

   views:{

    /* ---------- THE DASHBOARD ---------- */
    home:{ url:'github.com', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert aria-label="Menu"><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark" data-h="ghmark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox" data-h="globalsearch"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type <span style="font-family:var(--font-mono)">/</span> to search</span>' +
          '<span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-topnav__actions">' +
          '<span class="gh-navbtn gh-navbtn--bordered" data-h="plusmenu"><svg class="octicon"><use href="#oct-plus"/></svg><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-navbtn" title="Issues"><svg class="octicon"><use href="#oct-issue-opened"/></svg></span>' +
          '<span class="gh-navbtn" title="Pull requests"><svg class="octicon"><use href="#oct-git-pull-request"/></svg></span>' +
          '<span class="gh-navbtn" title="Inbox"><svg class="octicon"><use href="#oct-bell"/></svg><i class="gh-navbtn__dot"></i></span>' +
          '<span class="gh-avatar gh-avatar--32 gh-topnav__avatar" data-h="avatar" data-user="jordan-lee"></span>' +
        '</span>' +
      '</div>' +

      '<div class="gh-dash">' +

        '<div>' +
          '<div class="gh-dash__panel">' +
            '<div class="gh-dash__hd" data-h="toprepos-hd"><svg class="octicon"><use href="#oct-book"/></svg>Top repositories' +
              '<span class="gh-btn gh-btn--primary gh-btn--sm" style="margin-left:auto" data-h="newbtn"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>New</span></div>' +
            '<div class="gh-dash__search"><span class="gh-input gh-input--sm gh-muted" style="display:block" data-h="findrepo">Find a repository…</span></div>' +
            '<div class="gh-toprepos" data-h="repolist">' +
              '<span class="gh-toprepo" data-h="repo-smart"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="jordan-lee"></span><span>jordan-lee/study-planner</span></span>' +
              '<span class="gh-toprepo" data-h="repo-coursework"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="coursework"></span><span>coursework/48213097</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="jordan-lee"></span><span>jordan-lee/portfolio-site</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="jordan-lee"></span><span>jordan-lee/data-pipeline</span></span>' +
              '<span class="gh-toprepo" data-h="repo-coursework"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="coursework"></span><span>coursework/jordan-lee</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="jordan-lee"></span><span>jordan-lee/budget-tracker</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--16 gh-avatar--sq" data-user="jordan-lee"></span><span>jordan-lee/budget-tracker-mobile</span></span>' +
            '</div>' +
          '</div>' +
          '<div class="gh-dash__panel" style="margin-top:16px">' +
            '<div class="gh-dash__hd"><svg class="octicon"><use href="#oct-history"/></svg>Recent activity</div>' +
            '<div style="padding:0 16px 16px;font-size:12px;color:var(--gh-fg-muted)" data-h="recentactivity">' +
              'Your latest push: <span class="gh-link">trading-journal-practice</span> · 29 minutes ago</div>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<div class="gh-dash__hd" style="padding-left:0" data-h="feedhd"><svg class="octicon"><use href="#oct-mark-github"/></svg>Home</div>' +
          '<div class="gh-feeditem" data-h="feeditem">' +
            '<div class="gh-feeditem__hd"><svg class="octicon"><use href="#oct-star"/></svg>Trending repository</div>' +
            '<div class="gh-feeditem__bd">' +
              '<div class="gh-feedrepo"><svg class="octicon"><use href="#oct-repo"/></svg>ranaroussi/yfinance</div>' +
              '<p class="gh-feeditem__desc">Download market data from Yahoo! Finance’s API</p>' +
              '<div class="gh-feeditem__meta" data-h="feedmeta">' +
                '<span><span class="gh-langdot" style="background:#3572A5"></span>Python</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>17.4k</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-repo-forked"/></svg>2.6k</span>' +
                '<span>Updated 3 days ago</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="gh-feeditem">' +
            '<div class="gh-feeditem__hd"><svg class="octicon"><use href="#oct-light-bulb"/></svg>Recommended for you</div>' +
            '<div class="gh-feeditem__bd">' +
              '<div class="gh-feedrepo"><svg class="octicon"><use href="#oct-repo"/></svg>OpenBB-finance/OpenBB</div>' +
              '<p class="gh-feeditem__desc">Investment research for everyone, anywhere</p>' +
              '<div class="gh-feeditem__meta">' +
                '<span><span class="gh-langdot" style="background:#3572A5"></span>Python</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>29.1k</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-repo-forked"/></svg>2.8k</span>' +
                '<span>Updated 6 hours ago</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="gh-dash__right">' +
          '<div class="gh-dash__panel" data-h="changelog">' +
            '<div class="gh-dash__hd"><svg class="octicon"><use href="#oct-rocket"/></svg>Latest changes</div>' +
            '<div style="padding:0 16px 12px">' +
              '<div class="gh-changelog__item"><span class="gh-link">Push protection is now on by default for public repositories</span>' +
                '<span class="gh-changelog__date">2 days ago</span></div>' +
              '<div class="gh-changelog__item"><span class="gh-link">Code search now supports regular expressions</span>' +
                '<span class="gh-changelog__date">5 days ago</span></div>' +
              '<div class="gh-changelog__item"><span class="gh-link">Pages: faster builds for static site generators</span>' +
                '<span class="gh-changelog__date">1 week ago</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>'
    },

    /* ---------- YOUR PROFILE PAGE ---------- */
    profile:{ url:'github.com/jordan-lee', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert aria-label="Menu"><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark" data-h="back-home"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32 gh-topnav__avatar" data-user="jordan-lee"></span>' +
      '</div>' +

      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">' +
          '<span class="gh-btn" data-h="back-home"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the dashboard</span>' +
          '<span class="gh-muted" style="font-size:12px">This is the page a stranger — or a recruiter — lands on.</span>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:260px minmax(0,1fr);gap:32px;align-items:start">' +

          '<div>' +
            '<span class="gh-avatar" data-h="bigavatar" data-user="jordan-lee" style="width:200px;height:200px;display:block"></span>' +
            '<div style="font-size:24px;font-weight:600;margin-top:14px">jordan-lee</div>' +
            '<div class="gh-muted" style="font-size:18px;margin-bottom:12px">Jordan Lee</div>' +
            '<span class="gh-btn gh-btn--block" data-h="editprofile">Edit profile</span>' +
            '<div class="gh-muted" style="font-size:12px;margin-top:14px;display:flex;gap:12px;align-items:center">' +
              '<span><svg class="octicon octicon--sm"><use href="#oct-people"/></svg> <b>0</b> followers</span>' +
              '<span>·</span><span><b>0</b> following</span></div>' +
          '</div>' +

          '<div>' +
            '<div class="gh-readmebox" data-h="profilereadme" style="margin-bottom:20px">' +
              '<div class="gh-readmebox__head"><h2><svg class="octicon"><use href="#oct-book"/></svg>jordan-lee/README.md</h2></div>' +
              '<div class="gh-readmebox__body"><div class="gh-markdown">' +
                '<p class="gh-muted">You have not created a profile README yet. If you did, its text would render right here, ' +
                'above everything else on your profile.</p>' +
              '</div></div>' +
            '</div>' +

            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">' +
              '<span class="gh-b" data-h="pinnedhd">Pinned</span><span class="gh-link" style="font-size:12px">Customize your pins</span></div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">' +
              '<div class="gh-dash__panel" style="padding:16px" data-h="pin1">' +
                '<div class="gh-feedrepo" style="font-size:14px"><svg class="octicon"><use href="#oct-repo"/></svg>study-planner</div>' +
                '<p class="gh-feeditem__desc" style="margin-bottom:8px">Study planner that turns a syllabus into a revision schedule.</p>' +
                '<div class="gh-feeditem__meta"><span><span class="gh-langdot" style="background:#3572A5"></span>Python</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>0</span></div>' +
              '</div>' +
              '<div class="gh-dash__panel" style="padding:16px">' +
                '<div class="gh-feedrepo" style="font-size:14px"><svg class="octicon"><use href="#oct-repo"/></svg>portfolio-site</div>' +
                '<p class="gh-feeditem__desc" style="margin-bottom:8px">No description provided.</p>' +
                '<div class="gh-feeditem__meta"><span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>0</span></div>' +
              '</div>' +
            '</div>' +

            '<div class="gh-dash__panel" style="padding:16px" data-h="contribgraph">' +
              '<div class="gh-b" style="margin-bottom:12px">147 contributions in the last year</div>' +
              '<div style="display:grid;grid-template-rows:repeat(7,11px);grid-auto-flow:column;grid-auto-columns:11px;gap:3px;overflow-x:auto">' +
                ('0003000 0033000 0003000 0000000 0000401 0000000 0240230 0022431 1020220 1000221 0202300 0000021 0020420 0114410 1211200 0212220 0222010 0222212 0014110 0123211 0134300')
                  .replace(/ /g,'').split('').map(function(c){
                    return '<i style="background:' + ['#161b22','#0e4429','#006d32','#26a641','#39d353'][+c] + ';border-radius:2px"></i>';
                  }).join('') +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:5px;margin-top:12px;font-size:11px;color:var(--gh-fg-muted)">' +
                '<span>Less</span>' +
                '<i style="width:11px;height:11px;border-radius:2px;background:#161b22;display:inline-block"></i>' +
                '<i style="width:11px;height:11px;border-radius:2px;background:#0e4429;display:inline-block"></i>' +
                '<i style="width:11px;height:11px;border-radius:2px;background:#006d32;display:inline-block"></i>' +
                '<i style="width:11px;height:11px;border-radius:2px;background:#26a641;display:inline-block"></i>' +
                '<i style="width:11px;height:11px;border-radius:2px;background:#39d353;display:inline-block"></i>' +
                '<span>More</span>' +
              '</div>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="avatar"]', view:'profile', explain:{title:'This is the page other people see',
       html:'<p>Your dashboard is private — nobody else has ever seen it. Your <em>profile</em> is public whether you ' +
            'want it to be or not, and it is what loads when someone types <code>github.com/jordan-lee</code>.</p>' +
            '<p>Notice what a stranger currently gets: an identicon, a username, no bio, no profile README, and two ' +
            'pinned repositories with almost no description. Your <code>trading-journal-practice</code> repo does not appear ' +
            'at all, because Private repos are invisible to everyone but you.</p>' +
            '<p>The green squares are the only thing on this page currently doing any work for you. Marker 10 explains ' +
            'what they actually count — and the three common things they do not.</p>'}},
     {on:'[data-h="back-home"]', view:'home'},
     {on:'[data-h="repo-coursework"]', toast:'<b>coursework</b> is an organization, not a person. Two of your seven top repos are owned by one — see the section under this screen.'},
     {on:'[data-h="repo-coursework"]', toast:'<b>coursework/jordan-lee</b> — the org owns the repo, and the repo is named after you. CS50 does that for every student.'},
     {on:'[data-h="repo-smart"]', toast:'On the real dashboard this jumps straight into the repo. Two clicks from anywhere: GitHub logo, then the repo name.'},
     {on:'[data-h="globalsearch"]', toast:'Search gets its own screen further down this module — with the qualifiers that make it worth using.'}
   ],

   hotspots:[

    {sel:'[data-h="ghmark"]', place:'bottom', title:'The GitHub logo — your “go home” button',
     what:'<p>The cat-octopus mark at the top left is a link to <code>github.com</code>, which when you are signed in means this dashboard.</p>',
     why:'<p>GitHub buries you fast: repo, then a file, then a commit, then a diff. There has to be one control that is in the same place on every page and always resets you to a known starting point.</p>',
     how:'<p>Click it from anywhere. You land here, with your repository list on the left — so “logo, then repo name” is the two-click route to any project you own.</p>',
     fail:'<p>Using the browser Back button instead. Back retraces every step you took, so after ten minutes of exploring you are pressing it eleven times. The logo is one press from any depth.</p>',
     when:'<p>Every time you finish reading somebody else’s repo and want to get back to your own work.</p>'},

    {sel:'[data-h="globalsearch"]', place:'bottom', title:'The global search box — and the “/” hint',
     what:'<p>One box that searches code, repositories, issues, pull requests, people and discussions. The small <code>/</code> on its right is telling you the keyboard shortcut, not decoration.</p>',
     why:'<p>GitHub holds hundreds of millions of repos. No menu can list that, so search is the primary interface and GitHub put a one-key shortcut on it — the same <code>/</code> convention Gmail, Slack, Reddit and YouTube use.</p>',
     how:'<p>Press <code>/</code> anywhere, type, press Enter. From inside a repo you get a “This repository” option as well as “All GitHub” — pick the scope <em>before</em> you type, because it changes what the results mean.</p>',
     fail:'<p>Pressing <code>/</code> while your cursor sits in a text box types a slash into your writing instead of opening search. Click empty page background first, then press it.</p>',
     when:'<p>The moment you cannot remember which of your seven repos a piece of work went into — which, with names like <code>data-pipeline</code> and <code>portfolio-site</code>, will happen.</p>'},

    {sel:'[data-h="repolist"]', place:'bottom', title:'“Top repositories” — and how that list is ordered',
     what:'<p>The left rail lists repositories you can access, ordered by how recently you pushed to them, not alphabetically and not by how important they are.</p>',
     why:'<p>The thing you touched last is nearly always the thing you want next. Sorting by recency makes the list right most of the time without you configuring anything.</p>',
     how:'<p>Click a row to jump straight into that repo. The box above it filters the list as you type, so eight characters gets you anywhere without scrolling.</p>',
     fail:'<p>Treating the order as a ranking. <code>study-planner</code> is at the top because you pushed to it most recently, not because it is your best work. Pin the good ones on your profile instead — that list you control.</p>',
     when:'<p>Every morning you sit down to work. And note what is <em>missing</em>: <code>trading-journal-practice</code> is not shown here yet, so use the filter box rather than assuming it has vanished.</p>'},

    {sel:'[data-h="repo-coursework"]', place:'right', title:'coursework/48213097 — an owner that is not a person',
     what:'<p>Every repo is <code>owner/name</code>. Here the owner is <strong>coursework</strong>, an <em>organization</em> account rather than a human one, and the name is a number CS50 generated for your codespace.</p>',
     why:'<p>Courses, companies and open-source projects need repos that belong to the group rather than to one member’s personal account, so that people can join and leave without the work moving. Organization accounts exist for that.</p>',
     how:'<p>Click the owner half of any <code>owner/name</code> pair to see who it is. An organization profile shows repositories, people and teams instead of a contribution graph.</p>',
     fail:'<p>Assuming everything in your dashboard list is yours to control. You can read these two, but you do not own them — settings, visibility and deletion belong to CS50, and if they close the org, the repos go with it.</p>',
     when:'<p>Any group assignment where the unit creates an org and adds you to it. Your work will live at <code>uni-org/team-4</code>, and your personal profile will not list it as yours.</p>'},

    {sel:'[data-h="repo-coursework"]', place:'right', title:'coursework/jordan-lee — the naming scheme, backwards',
     what:'<p>Same structure, reversed meaning: the organization <strong>coursework</strong> owns it, and the repo is <em>named after you</em>. It is where CS50 collects each student’s submissions.</p>',
     why:'<p>Because <code>owner/name</code> only has to be unique as a pair, an organization can give every student a repo named after them without any of those names colliding with anything else on GitHub.</p>',
     how:'<p>Read it left to right, always: owner first, then repo. <code>coursework/jordan-lee</code> and <code>jordan-lee/data-pipeline</code> look similar and have nothing in common.</p>',
     fail:'<p>Telling someone “it is in jordan-lee” when the repo is actually <code>coursework/jordan-lee</code>. They will land on your profile, find nothing, and assume you sent them a dead link.</p>',
     when:'<p>Whenever you paste a GitHub link or quote a repo in an email. Both halves, every time.</p>'},

    {sel:'[data-h="newbtn"]', place:'top', title:'The green “New” button',
     what:'<p>Creates a new repository, sitting deliberately next to the list of the ones you already have.</p>',
     why:'<p>The decision “is this a new project or part of an existing one?” is easiest to make while looking at what already exists. GitHub puts the button beside the list for exactly that reason.</p>',
     how:'<p>Click it, name the repo, choose Public or Private, tick “Add a README file”, create. Adding the README matters — an empty repo shows you a wall of terminal commands instead of a usable page.</p>',
     fail:'<p>Creating <code>trading-journal-practice-2</code> when you meant to add a file to the first one. Now your work is split across two repos, the history is split with it, and neither is complete.</p>',
     when:'<p>Next semester, when a different unit asks for a repo. Not for week 7 of this one — that is a new file in the repo you already have.</p>'},

    {sel:'[data-h="feedhd"]', place:'top', title:'The centre column — the “Home” feed',
     what:'<p>A recommendation feed: repositories that are trending, projects similar to things you have starred, and activity from people you follow.</p>',
     why:'<p>Almost nobody browses for repos deliberately, so GitHub pushes suggestions at you the way any other social product does. It is the least useful column on the page and the one that takes up the most room.</p>',
     how:'<p>Skim it for about ten seconds. If something looks relevant, star it so you can find it again — otherwise ignore it entirely and use the left rail.</p>',
     fail:'<p>Mistaking this for your own activity. Nothing in this column is yours. People genuinely open the dashboard, see a stranger’s project, and think their repo has changed.</p>',
     when:'<p>It earns its place about once a month, when it surfaces something like the Python finance library sitting in it right now.</p>'},

    {sel:'[data-h="feedmeta"]', place:'bottom', title:'The metadata line — this is the five-second repo check',
     what:'<p>Four facts under every repo GitHub shows you: primary language, star count, fork count, and when it was last updated.</p>',
     why:'<p>Those four answer “should I bother opening this?” without opening it. GitHub repeats the same line in search results, on profiles and in the feed because it is the fastest triage there is.</p>',
     how:'<p>Read <em>Updated</em> first, not stars. “Updated 3 days ago” means someone is home. “Updated 4 years ago” means you are on your own with whatever you find inside.</p>',
     fail:'<p>Reading stars as quality. Stars measure how many people once thought a repo was interesting — a 20k-star project abandoned in 2021 still says 20k. Nothing about the number decays.</p>',
     when:'<p>Every time you find a library that claims to fetch price data. Check the date, then the open issues, then the README, in that order.</p>'},

    {sel:'[data-h="changelog"]', place:'left', title:'The right rail — GitHub’s changelog',
     what:'<p>Announcements about GitHub the product: features that shipped, defaults that changed, things being retired.</p>',
     why:'<p>GitHub changes its own interface constantly. Without a visible changelog, buttons would move overnight and everyone would assume they were losing their minds.</p>',
     how:'<p>Read only the headlines, and only the ones about defaults changing — those are the ones that alter behaviour you already rely on.</p>',
     fail:'<p>Skipping it and then being confused when a tutorial from 2022 tells you to click something that no longer exists. Every “this button is not there” moment on GitHub started as one of these lines.</p>',
     when:'<p>The top item right now is exactly your business: push protection stops you committing an API key into a public repo. Module 9 is about that.</p>'},

    {sel:'[data-h="avatar"]', view:'home', place:'bottom', title:'Your avatar — the door to your profile',
     what:'<p>The menu for everything that belongs to you rather than to a project: your profile, your repositories, your stars, your account settings.</p>',
     why:'<p>GitHub keeps “settings for this repo” and “settings for me” in two different places on purpose. This is the second one, and it is the one that owns your identity.</p>',
     how:'<p>Click it (it works — this screen switches to your profile). Choose <em>Your profile</em> to see yourself as a stranger sees you, and <em>Your stars</em> to get back everything you bookmarked.</p>',
     fail:'<p>Hunting in here for “make this repo public”. It is not in this menu, because that setting belongs to the repository, not to you. Two gears, two jobs.</p>',
     when:'<p>Right now. Look at your profile, then come back and read markers 11 to 13.</p>'},

    {sel:'[data-h="contribgraph"]', view:'profile', place:'top', title:'The contribution graph — what it actually counts',
     what:'<p>One small square per day for the past year, shaded by how many contributions you made that day. It counts commits to the default branch, pull requests opened, issues opened, and pull request reviews.</p>',
     why:'<p>A repository list tells you what someone built. This tells you whether they kept at it. GitHub made consistency visible because consistency is the thing a list of projects cannot show.</p>',
     how:'<p>Hover a square on the real page for the exact count and date. Turn on <em>Settings → Public profile → Include private contributions</em> and your private work fills the squares in without revealing what it was.</p>',
     fail:'<p>Three things it does <em>not</em> count, which is where people get confused: commits made on a branch that never merged, commits authored with an email address not attached to your account, and anything at all in a private repo unless you turn that setting on. That last one is why your graph looks emptier than your semester felt.</p>',
     when:'<p>Before you put your GitHub link on a CV. A green graph is not a qualification, but a completely blank one next to a claim that you code is a bad look, and the fix is a settings checkbox.</p>',
     note:'<p>Do not farm it. Committing one character a day to keep a streak alive is obvious in the history and reads worse than an honest gap.</p>'},

    {sel:'[data-h="pinnedhd"]', view:'profile', place:'right', title:'Pinned repositories — the part of the profile you control',
     what:'<p>Up to six repositories you choose to display at the top of your profile, in an order you choose, with their descriptions shown.</p>',
     why:'<p>Left to itself, a profile lists repos by date, so your most recent throwaway experiment outranks the project you are proud of. Pinning exists so that you, not the clock, decide what someone sees first.</p>',
     how:'<p>Click <em>Customize your pins</em>, tick up to six, drag them into order. Then fix the description on each one, because the pin card shows it and a blank description makes the card useless.</p>',
     fail:'<p>Pinning six repos with no descriptions, or pinning a repo whose README is still a template. The pin gets someone to click; the README decides what they think.</p>',
     when:'<p>Fifteen minutes, once, in the week before you start applying for internships. It is the highest-return quarter-hour on this entire site.</p>'},

    {sel:'[data-h="profilereadme"]', view:'profile', place:'left', title:'The profile README — the one repo that renders on your profile',
     what:'<p>If you create a repository whose name is exactly your username, GitHub renders its README at the top of your profile page. Yours would be <code>jordan-lee/jordan-lee</code>.</p>',
     why:'<p>A username and an identicon tell a visitor nothing. GitHub needed a way to let people introduce themselves without inventing a whole bio system, so it reused the README mechanism you already know.</p>',
     how:'<p>New repository → name it exactly your username → tick “Add a README” → GitHub shows a banner saying you found a secret. Write three or four lines of Markdown: who you are, what you are studying, what you are building.</p>',
     fail:'<p>Get the name even slightly wrong — a capital letter, a hyphen — and it is an ordinary repo that renders nowhere. The banner GitHub shows when you get it right is your confirmation.</p>',
     when:'<p>This is the portfolio move that works even while <code>trading-journal-practice</code> stays private: a public page about you, that costs you nothing to publish. Module 10 comes back to it.</p>'}
   ]
  },

  {type:'callout', variant:'info', title:'Two of your seven repos belong to an organization',
   html:
    '<p><code>coursework/48213097</code> and <code>coursework/jordan-lee</code> are CS50 course repositories. ' +
    '<strong>coursework</strong> and <strong>coursework</strong> are organization accounts run by the course — the same kind of ' +
    'account a company or an open-source project uses.</p>' +
    '<p>An organization owns repos, and people are members of it with different levels of access. That is the whole ' +
    'idea: the work belongs to the group, so a member leaving does not take the repository with them. It also means ' +
    'those two repos appear in your dashboard because you have <em>access</em>, not because you own them.</p>' +
    '<p>Practical consequence: they will never show up on your personal profile as your work, and you cannot change ' +
    'their settings. If a recruiter looks at your profile, CS50 is invisible unless you mention it yourself.</p>'
  },

  /* ==================== SEARCH ==================== */
  {type:'prose', title:'Search, and the two questions it asks before you type',
   html:
    '<p>GitHub search has two settings that change the meaning of every query, and both are easy to miss.</p>' +
    '<p><strong>Scope.</strong> Open search from inside a repo and GitHub offers “In this repository” as well as ' +
    '“All GitHub”. Those give completely different results for the same words. Searching <code>IronCondor</code> ' +
    'across all of GitHub returns strangers’ files; searching it in your repo returns your README.</p>' +
    '<p><strong>Type.</strong> The results page splits into Code, Repositories, Issues, Pull requests, Discussions, ' +
    'Users and Commits, each with its own count. The word you typed is searched in all of them at once, and the ' +
    'counts down the left tell you where the answer actually lives before you click anything.</p>'
  },

  {type:'screen',
   id:'searchresults',
   label:'A real search: everything of yours that mentions the unit',
   url:'github.com/search?q=user%3Ajordan-lee+the unit',
   initial:'code',
   inertNote:'Inert in this lesson. The live parts here are the facet list down the left — click Repositories, Issues or Users and the results change.',

   views:{

    code:{ url:'github.com/search?q=user%3Ajordan-lee+the unit&type=code', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox" data-h="querybox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph" style="font-family:var(--font-mono);color:var(--gh-fg-default)">user:jordan-lee trading</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-searchpage">' +
        '<div class="gh-facets" data-h="facets">' +
          '<span class="gh-facet is-on"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg>Code<span class="gh-facet__n">4</span></span>' +
          '<span class="gh-facet" data-h="facet-repos"><svg class="octicon octicon--sm"><use href="#oct-repo"/></svg>Repositories<span class="gh-facet__n">2</span></span>' +
          '<span class="gh-facet" data-h="facet-issues"><svg class="octicon octicon--sm"><use href="#oct-issue-opened"/></svg>Issues<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Discussions<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet" data-h="facet-users"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Users<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-commit"/></svg>Commits<span class="gh-facet__n">3</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Wikis<span class="gh-facet__n">0</span></span>' +
        '</div>' +
        '<div>' +
          '<div class="gh-searchhead"><h2 data-h="resultcount">4 files</h2>' +
            '<span class="gh-muted" style="margin-left:auto;font-size:12px">Sort: Best match</span></div>' +
          '<div class="gh-searchresult" data-h="result1">' +
            '<div class="gh-searchresult__ttl">jordan-lee/trading-journal-practice · README.md</div>' +
            '<div class="gh-searchresult__snip">' +
              '<div>1  # Jordan Lee -- desk profile</div>' +
              '<div>3  **Degree:** Economics (Finance), year 3</div>' +
              '<div>6  ## <mark>the unit</mark> markets I want to trade this semester</div>' +
            '</div>' +
            '<div class="gh-searchresult__meta"><span class="gh-badge">Private</span>' +
              '<span>Markdown</span><span>Updated 2 hours ago</span></div>' +
          '</div>' +
          '<div class="gh-searchresult">' +
            '<div class="gh-searchresult__ttl">jordan-lee/trading-journal-practice · journal\\week6.md</div>' +
            '<div class="gh-searchresult__snip">' +
              '<div>1  # Week 6 journal</div>' +
              '<div>3  Notes from this week go here. <mark>the unit</mark> tutorial task.</div>' +
            '</div>' +
            '<div class="gh-searchresult__meta"><span class="gh-badge">Private</span>' +
              '<span>Markdown</span><span>Updated 29 minutes ago</span></div>' +
          '</div>' +
          '<div class="gh-searchresult">' +
            '<div class="gh-searchresult__ttl">jordan-lee/study-planner · units.json</div>' +
            '<div class="gh-searchresult__snip">' +
              '<div>14    { "code": "<mark>the unit</mark>", "name": "Trading and Dealing" },</div>' +
              '<div>15    { "code": "ECON3006", "name": "Financial Economics" },</div>' +
            '</div>' +
            '<div class="gh-searchresult__meta"><span>JSON</span><span>Updated 3 weeks ago</span></div>' +
          '</div>' +
          '<div class="gh-searchresult">' +
            '<div class="gh-searchresult__ttl">jordan-lee/study-planner · README.md</div>' +
            '<div class="gh-searchresult__snip">' +
              '<div>22  Semester 2 units: <mark>the unit</mark>, ECON3006, BUSS2000</div>' +
            '</div>' +
            '<div class="gh-searchresult__meta"><span>Markdown</span><span>Updated 3 weeks ago</span></div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    },

    repos:{ url:'github.com/search?q=user%3Ajordan-lee+the unit&type=repositories', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph" style="font-family:var(--font-mono);color:var(--gh-fg-default)">user:jordan-lee trading</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-searchpage">' +
        '<div class="gh-facets">' +
          '<span class="gh-facet" data-h="facet-code"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg>Code<span class="gh-facet__n">4</span></span>' +
          '<span class="gh-facet is-on"><svg class="octicon octicon--sm"><use href="#oct-repo"/></svg>Repositories<span class="gh-facet__n">2</span></span>' +
          '<span class="gh-facet" data-h="facet-issues"><svg class="octicon octicon--sm"><use href="#oct-issue-opened"/></svg>Issues<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Discussions<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet" data-h="facet-users"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Users<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-commit"/></svg>Commits<span class="gh-facet__n">3</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Wikis<span class="gh-facet__n">0</span></span>' +
        '</div>' +
        '<div>' +
          '<div class="gh-searchhead"><h2>2 repository results</h2>' +
            '<span class="gh-muted" style="margin-left:auto;font-size:12px">Sort: Best match</span></div>' +
          '<div class="gh-searchresult">' +
            '<div class="gh-searchresult__ttl">jordan-lee/<mark>trading</mark>-journal-practice</div>' +
            '<div class="gh-searchresult__meta"><span class="gh-badge">Private</span>' +
              '<span>No description provided</span><span>Updated 29 minutes ago</span></div>' +
          '</div>' +
          '<div class="gh-searchresult">' +
            '<div class="gh-searchresult__ttl">jordan-lee/study-planner</div>' +
            '<div class="gh-searchresult__meta">' +
              '<span><span class="gh-langdot" style="background:#3572A5"></span>Python</span>' +
              '<span>Study planner that turns a syllabus into a revision schedule</span>' +
              '<span>Updated 3 weeks ago</span></div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    },

    issues:{ url:'github.com/search?q=user%3Ajordan-lee+the unit&type=issues', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph" style="font-family:var(--font-mono);color:var(--gh-fg-default)">user:jordan-lee trading is:issue is:open</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-searchpage">' +
        '<div class="gh-facets">' +
          '<span class="gh-facet" data-h="facet-code"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg>Code<span class="gh-facet__n">4</span></span>' +
          '<span class="gh-facet" data-h="facet-repos"><svg class="octicon octicon--sm"><use href="#oct-repo"/></svg>Repositories<span class="gh-facet__n">2</span></span>' +
          '<span class="gh-facet is-on"><svg class="octicon octicon--sm"><use href="#oct-issue-opened"/></svg>Issues<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Discussions<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet" data-h="facet-users"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Users<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-commit"/></svg>Commits<span class="gh-facet__n">3</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Wikis<span class="gh-facet__n">0</span></span>' +
        '</div>' +
        '<div>' +
          '<div class="gh-searchhead"><h2>1 issue result</h2>' +
            '<span class="gh-muted" style="margin-left:auto;font-size:12px">Sort: Newest</span></div>' +
          '<div class="gh-listbox">' +
            '<div class="gh-listrow">' +
              '<svg class="octicon gh-listrow__icon gh-listrow__icon--open"><use href="#oct-issue-opened"/></svg>' +
              '<span class="gh-listrow__main"><span class="gh-listrow__title">README still contains Week 1 template placeholders</span>' +
                '<span class="gh-listrow__meta">jordan-lee/<mark>trading</mark>-journal-practice #3 opened 1 hour ago by jordan-lee</span></span>' +
            '</div>' +
          '</div>' +
          '<div class="gh-flash" style="margin-top:16px"><svg class="octicon"><use href="#oct-info"/></svg>' +
            '<span>The query gained <span class="gh-mono">is:issue is:open</span> when you clicked this facet. ' +
            'Look at the search box — GitHub rewrote it for you, and you can edit that text by hand.</span></div>' +
        '</div>' +
      '</div></div>'
    },

    users:{ url:'github.com/search?q=jordan-lee&type=users', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph" style="font-family:var(--font-mono);color:var(--gh-fg-default)">jordan-lee</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-searchpage">' +
        '<div class="gh-facets">' +
          '<span class="gh-facet" data-h="facet-code"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg>Code<span class="gh-facet__n">4</span></span>' +
          '<span class="gh-facet" data-h="facet-repos"><svg class="octicon octicon--sm"><use href="#oct-repo"/></svg>Repositories<span class="gh-facet__n">2</span></span>' +
          '<span class="gh-facet" data-h="facet-issues"><svg class="octicon octicon--sm"><use href="#oct-issue-opened"/></svg>Issues<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-pull-request"/></svg>Pull requests<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Discussions<span class="gh-facet__n">0</span></span>' +
          '<span class="gh-facet is-on"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Users<span class="gh-facet__n">1</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-git-commit"/></svg>Commits<span class="gh-facet__n">3</span></span>' +
          '<span class="gh-facet"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Wikis<span class="gh-facet__n">0</span></span>' +
        '</div>' +
        '<div>' +
          '<div class="gh-searchhead"><h2>1 user result</h2></div>' +
          '<div class="gh-searchresult" style="display:flex;gap:12px;align-items:center">' +
            '<span class="gh-avatar gh-avatar--48" data-user="jordan-lee"></span>' +
            '<span><span class="gh-searchresult__ttl">jordan-lee</span>' +
            '<div class="gh-searchresult__meta"><span>Jordan Lee</span><span>0 followers</span></div></span>' +
          '</div>' +
          '<div class="gh-flash gh-flash--warn" style="margin-top:16px"><svg class="octicon"><use href="#oct-alert"/></svg>' +
            '<span>This is how someone finds you by name. There is nothing here but a username and an identicon — ' +
            'no bio, no photo, no profile README. That is a fixable problem and it takes fifteen minutes.</span></div>' +
        '</div>' +
      '</div></div>'
    }
   },

   actions:[
     {on:'[data-h="facet-repos"]', view:'repos', explain:{title:'Same query, different question',
       html:'<p>You did not run a new search. You asked the same words a different question: instead of “which ' +
            '<em>lines of code</em> contain the unit”, this is “which <em>repositories</em> match the unit”.</p>' +
            '<p>That is why the second result has no highlighted text — <code>study-planner</code> matches on ' +
            'its contents, not its name. Repository search looks at the name, the description and the topics.</p>' +
            '<p>Look at the URL bar: the only thing that changed is <code>&amp;type=repositories</code>. You could have ' +
            'typed that yourself.</p>'}},
     {on:'[data-h="facet-issues"]', view:'issues'},
     {on:'[data-h="facet-users"]', view:'users'},
     {on:'[data-h="facet-code"]', view:'code'},
     {on:'[data-h="querybox"]', toast:'On the real page this is an editable box. Everything you can click in the facet list, you can also type here by hand.'}
   ],

   hotspots:[

    {sel:'[data-h="querybox"]', place:'bottom', title:'The query itself: user:jordan-lee trading',
     what:'<p>Two parts doing two different jobs. <code>user:jordan-lee</code> is a <strong>qualifier</strong> — it narrows <em>where</em> to look. <code>the unit</code> is the actual thing being looked for.</p>',
     why:'<p>Plain search across all of GitHub returns other people’s work, which is almost never what you want. Qualifiers exist so you can say “only inside my account” without GitHub needing a separate “search my stuff” page.</p>',
     how:'<p>Qualifiers are <code>name:value</code> with no space around the colon, separated by spaces from everything else. Order does not matter. Anything without a colon is treated as a search term.</p>',
     fail:'<p>Putting a space after the colon — <code>user: jordan-lee</code> — turns your account name into an ordinary search word, and you get every file on GitHub that happens to mention it.</p>',
     when:'<p>Every search you run from now on should start with a qualifier. It is the difference between search being useful and search being noise.</p>'},

    {sel:'[data-h="facets"]', place:'top', title:'The facet list, and why the counts matter most',
     what:'<p>The same query, run against eight different kinds of thing at once, with the number of matches beside each.</p>',
     why:'<p>You usually do not know what kind of object your answer is in. Was that decision written in a file, or in an issue comment? The counts let GitHub answer both without you guessing.</p>',
     how:'<p>Click a facet (they work here) and the results change. On the real page the query in the box gets rewritten too — clicking Issues silently adds <code>is:issue</code>.</p>',
     fail:'<p>Reading only the first tab and concluding “nothing here”. Code says 4, Issues says 1, Commits says 3 — three different answers to the same question, and people routinely miss two of them.</p>',
     when:'<p>Trying to remember why you changed something. The Code tab shows what the file says <em>now</em>; the Commits tab shows the moment you changed it and the message you wrote about why.</p>'},

    {sel:'[data-h="resultcount"]', place:'bottom', title:'“4 files” — the result count',
     what:'<p>How many matches this facet has, shown before you scroll. GitHub also caps and paginates results, so a huge number here means “refine, do not scroll”.</p>',
     why:'<p>A count is the cheapest possible feedback on whether your query is any good. Zero means the query is wrong; four hundred means it is too broad.</p>',
     how:'<p>Treat it as a dial. Too many results, add a qualifier — <code>language:python</code>, <code>path:journal/</code>. Too few, remove one, or check your spelling before you blame GitHub.</p>',
     fail:'<p>Code search only covers the default branch. A match sitting on a branch you never merged does not appear here at all, and the count gives you no hint that it is missing.</p>',
     when:'<p>When a search returns nothing and you are sure the text exists — check the branch, then check whether you are searching a repo GitHub has finished indexing.</p>'},

    {sel:'[data-h="result1"]', place:'left', title:'A code result — filename, line numbers, highlighted hit',
     what:'<p>One result is a repo, a file path, and the lines around the match with the matching words highlighted.</p>',
     why:'<p>The snippet exists so you can reject a result without opening it. On a large search that saves you from opening twenty files to find the one that means what you meant.</p>',
     how:'<p>Click the title to open the file at that line. The line numbers on the left of the snippet are real — the link takes you to the file scrolled to that exact line.</p>',
     fail:'<p>Results from private repos only appear because <em>you</em> are signed in and own them. Nobody else running this search sees these two, so never send a colleague a search link and assume they see what you see.</p>',
     when:'<p>Six weeks from now, hunting for where you wrote something down. This is the search that replaces opening every file one by one.</p>'},

    {sel:'[data-h="facet-users"]', place:'right', title:'The Users facet — how people find you',
     what:'<p>Searches accounts rather than content: usernames, display names and bios, for both people and organizations.</p>',
     why:'<p>Half of what happens on GitHub is finding a person — a classmate, an author of a library, the tutor who set your task. Names live in a different index from code, so they get their own tab.</p>',
     how:'<p>Click it (it works here). To find one specific person, <code>user:their-username</code> is exact where a plain name search is a guess.</p>',
     fail:'<p>This is also how a recruiter reaches your account. Right now the result is a username and an auto-generated pattern, which reads as an abandoned account rather than an active one.</p>',
     when:'<p>Before a group assignment, to add the right classmate as a collaborator. Three people on GitHub have near-identical names — ask for the exact username, not “search my name”.</p>'}
   ]
  },

  /* ==================== QUALIFIERS ==================== */
  {type:'prose', title:'Qualifiers: the actual skill in this module',
   html:
    '<p>A qualifier is a <code>name:value</code> pair that narrows a search. They are the difference between GitHub ' +
    'search being a toy and being the fastest way to answer questions about your own work. There are dozens; these ' +
    'are the ones worth memorising.</p>' +
    '<p>They combine. Every qualifier you add is an AND, so each one cuts the result set down. That is the whole ' +
    'technique: start broad, add one qualifier at a time, watch the count fall until the answer is on screen.</p>'
  },

  {type:'html', html:
    '<div style="border:1px solid var(--gh-border-default);border-radius:6px;overflow:hidden;margin:4px 0 8px">' +
    '<table style="width:100%;border-collapse:collapse;font-size:13.5px">' +
    '<thead><tr style="background:var(--gh-canvas-subtle);text-align:left">' +
      '<th style="padding:8px 12px;border-bottom:1px solid var(--gh-border-default);width:34%">Qualifier</th>' +
      '<th style="padding:8px 12px;border-bottom:1px solid var(--gh-border-default)">What it narrows to, and when you would use it</th>' +
    '</tr></thead><tbody>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">user:jordan-lee</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Only things owned by that account. Your default first move when the thing you lost is yours.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">repo:owner/name</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">One specific repository. Use it when you know which project but not which file.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">org:coursework</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Everything belonging to an organization. The version of <code>user:</code> for group accounts.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">language:python</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Only files GitHub detected as that language. Cuts out documentation and config noise instantly.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">filename:README.md</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Match on the file’s name. Handy for finding every README that mentions a thing.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">path:journal/</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Only inside that folder. The one you will want once your journal entries live in a real folder.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">in:name  in:description</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Restricts where the match may occur, rather than which repos are searched. <code>finc in:name</code> finds repos <em>called</em> finc-something.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">stars:&gt;100</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">A crude popularity floor when you are looking for a library rather than a person’s homework. <code>&gt;</code>, <code>&lt;</code> and <code>100..500</code> all work.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">pushed:&gt;2026-01-01</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Only repos touched since that date. This is the “is it still alive?” filter, and it is the most underused one on the list.</td></tr>' +
    '<tr><td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted);font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">is:issue is:open</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid var(--gh-border-muted)">Issues rather than pull requests, and only ones still open. Add <code>label:"good first issue"</code> and you have the open-source starter search from Module 10.</td></tr>' +
    '<tr><td style="padding:8px 12px;font-family:var(--font-mono);font-size:12px;color:var(--gh-accent-fg);vertical-align:top">author:username</td>' +
      '<td style="padding:8px 12px">Who wrote it. On the Commits or Issues facet this answers “what did my group partner actually do?”</td></tr>' +
    '</tbody></table></div>' +
    '<p style="font-size:13px;color:var(--gh-fg-muted);margin-top:10px">Two rules that cover the rest: put quotes around ' +
    'a value containing a space (<code>label:"good first issue"</code>), and put a minus in front to exclude ' +
    '(<code>-language:javascript</code>).</p>'
  },

  {type:'steps', title:'Worked example: find everything of yours that mentions the unit',
   items:[
     {label:'Start with the wrong version, so you can see the problem',
      html:'<p>Type <code>the unit</code> into search and press Enter. You get every public file on GitHub that ' +
           'mentions the unit code — other students’ repos, course scrapers, timetable projects. Yours are in there ' +
           'somewhere, and you will not find them.</p>'},
     {label:'Add the scope qualifier',
      html:'<p>Change it to <code>user:jordan-lee trading</code>. The result set collapses to four files, ' +
           'all yours, including the two in the private repo — because you are signed in and they are yours.</p>'},
     {label:'Read the counts, not just the first tab',
      html:'<p>Code says 4, Repositories says 2, Issues says 1, Commits says 3. If what you actually wanted was ' +
           '“when did I write that”, the answer is on the Commits tab, not the Code tab.</p>'},
     {label:'Narrow one more notch if you need to',
      html:'<p><code>user:jordan-lee trading filename:README.md</code> gets you the two READMEs only. ' +
           'Or <code>repo:jordan-lee/trading-journal-practice the unit</code> to stay inside one project.</p>'},
     {label:'Keep the URL',
      html:'<p>The address bar now holds your whole query. Bookmark it and you have a saved search you can re-run in ' +
           'one click — GitHub has no “save this search” button, so the bookmark <em>is</em> the feature.</p>'}
   ]
  },

  /* ==================== INSIDE ONE REPO ==================== */
  {type:'prose', title:'Finding things inside one repo',
   html:
    '<p>Global search is for “somewhere in my account”. Inside a single repository there are two faster tools, and ' +
    'they answer different questions.</p>' +
    '<p><strong>“Go to file”</strong>, or the <code>t</code> key, searches file <em>names</em> with fuzzy matching — ' +
    'type <code>wk6</code> and it will still find <code>week6.md</code>, because it looks for those letters in that ' +
    'order rather than as a block. <strong>Search in this repository</strong> searches file <em>contents</em>. ' +
    'Choosing the wrong one is the usual reason people conclude a file is missing.</p>'
  },

  {type:'screen',
   id:'finder',
   label:'The file finder (press t) and linking to a single line',
   url:'github.com/jordan-lee/trading-journal-practice/find/main',
   initial:'finder',
   inertNote:'Inert here. The live parts are the two result rows in the finder and the “Back” button.',

   views:{
    finder:{ url:'github.com/jordan-lee/trading-journal-practice/find/main', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page">' +
        '<div class="gh-breadcrumb" style="margin-bottom:16px">' +
          '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
          '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
          '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div>' +
        '<div class="gh-repotoolbar" style="margin-bottom:0">' +
          '<span class="gh-branchsel"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-muted" style="margin-left:8px;font-size:12px">Go to file</span></div>' +
        '<div style="border:1px solid var(--gh-accent-emphasis);border-radius:6px;padding:8px 12px;margin:12px 0 0;' +
             'box-shadow:0 0 0 1px var(--gh-accent-emphasis);font-family:var(--font-mono);font-size:13px" data-h="finderinput">' +
          'wk6<span style="color:var(--gh-fg-subtle)">|</span></div>' +
        '<div class="gh-filebox" style="margin-top:8px" data-h="finderresults">' +
          '<div class="gh-filerow" data-h="hit-journal">' +
            '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">journal\\<b style="color:var(--gh-accent-fg)">w</b>ee<b style="color:var(--gh-accent-fg)">k6</b>.md</span>' +
            '<span class="gh-filerow__time">1 of 2 matches</span>' +
          '</div>' +
          '<div class="gh-filerow">' +
            '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">notes/<b style="color:var(--gh-accent-fg)">w</b>ee<b style="color:var(--gh-accent-fg)">k6</b>-lecture.md</span>' +
            '<span class="gh-filerow__time">2 of 2 matches</span>' +
          '</div>' +
        '</div>' +
        '<div class="gh-flash" style="margin-top:16px" data-h="fuzzynote"><svg class="octicon"><use href="#oct-info"/></svg>' +
          '<span>You typed three letters — <span class="gh-mono">w</span>, <span class="gh-mono">k</span>, ' +
          '<span class="gh-mono">6</span> — and neither filename contains the string “wk6”. The finder matched the ' +
          'letters <em>in order, with gaps allowed</em>. That is what “fuzzy” means.</span></div>' +
      '</div>'
    },

    blobline:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md#L11', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span><span class="gh-muted">/</span>' +
            '<span class="gh-filepath__cur">README.md</span></div>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-finder"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the file finder</span>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">Code</span>' +
            '<span class="gh-muted">|</span><span>Blame</span>' +
            '<span class="gh-muted" style="margin-left:8px">11 lines · 322 Bytes</span></div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr><td class="gh-blob__ln">8</td><td class="gh-blob__code">- all of the above 2</td></tr>' +
            '<tr><td class="gh-blob__ln">9</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">10</td><td class="gh-blob__code">## One market story that hooked me</td></tr>' +
            '<tr style="background:rgba(187,128,9,.18)" data-h="lineeleven"><td class="gh-blob__ln" style="color:var(--gh-attention-fg)">11</td>' +
              '<td class="gh-blob__code">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</td></tr>' +
          '</tbody></table>' +
        '</div>' +
        '<div class="gh-flash gh-flash--success" style="margin-top:16px"><svg class="octicon"><use href="#oct-check-circle"/></svg>' +
          '<span>The <span class="gh-mono">#L11</span> on the end of the URL is doing this. Click a line number on the ' +
          'real page and GitHub writes it into the address bar for you — then copy the address and you have a link to ' +
          'one exact line.</span></div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="hit-journal"]', view:'blobline', explain:{title:'Two navigation tricks in one jump',
       html:'<p>First: you found a file by typing three letters that do not appear consecutively in its name. That is ' +
            'the fuzzy file finder, and on a repo with two hundred files it is the fastest thing on the page.</p>' +
            '<p>Second: look at the end of the URL. <code>#L11</code> means “line 11”, and the row is highlighted ' +
            'because of it. Click a line number on the real GitHub and the address bar updates; shift-click a second ' +
            'number and you get a range like <code>#L10-L11</code>.</p>' +
            '<p>That is how you send someone a link to a specific sentence in a document instead of saying “it is near ' +
            'the bottom of the README”.</p>'}},
     {on:'[data-h="back-finder"]', view:'finder'}
   ],

   hotspots:[
    {sel:'[data-h="finderinput"]', place:'right', title:'The file finder — press t',
     what:'<p>A single box that filters every file path in the repository as you type. The <code>t</code> key opens it from any file-list page, and “Go to file” is the same thing with a button.</p>',
     why:'<p>Clicking down through folders costs one page load per level. Real repositories are five levels deep with hundreds of files, so GitHub copied the “fuzzy open” trick every code editor has.</p>',
     how:'<p>Press <code>t</code> on the Code tab, type any letters from the path, press Enter on the highlighted row. Escape closes it.</p>',
     fail:'<p>It only sees file <em>names and paths</em>. Type <code>IronCondor</code> here and you get nothing, because that word lives inside a file, not in its name — that is a job for search.</p>',
     when:'<p>Once your repo grows past ten files. Right now yours has two, so it looks pointless; the CS50 repos in your dashboard have hundreds.</p>'},

    {sel:'[data-h="finderresults"]', place:'left', title:'Fuzzy matching — why “wk6” finds “week6.md”',
     what:'<p>The finder matches your letters in order, allowing any number of characters in between, and highlights the ones that matched.</p>',
     why:'<p>Nobody remembers exact filenames, but almost everyone remembers a few of the right letters in roughly the right order. Fuzzy matching is built for how memory actually works.</p>',
     how:'<p>Type initials and fragments rather than a careful prefix. <code>jw6</code> finds the journal file; <code>nlec</code> finds a lecture note in a notes folder.</p>',
     fail:'<p>The order matters. <code>6wk</code> finds nothing at all, because those letters never appear in that sequence. If a search fails, try the letters left to right before assuming the file is gone.</p>',
     when:'<p>Every time you know roughly what a file is called and cannot face clicking through folders to prove it.</p>'},

    {sel:'[data-h="hit-journal"]', place:'left', title:'The result row — and a reminder of your backslash',
     what:'<p>The finder shows full paths, not just names. This one reads <code>journal\\week6.md</code> with no slash-separated folder step, while the row below it reads <code>notes/week6-lecture.md</code>.</p>',
     why:'<p>Showing the whole path is the point: on a big repo, two files with the same name in different folders are common, and the path is the only thing that tells them apart.</p>',
     how:'<p>Click the row (it works — this opens the file). On the real page, arrow keys move between hits and Enter opens the highlighted one.</p>',
     fail:'<p>Compare the two rows and the naming mistake from Module 2 is impossible to miss: one file is <em>in</em> a folder, one has a folder name glued onto its own name with a backslash. The finder cannot group the second one, because as far as GitHub is concerned there is nothing to group.</p>',
     when:'<p>After you fix it, this list is how you check the fix worked — the row should read <code>journal/week6.md</code>, matching the shape of the row below it.</p>'},

    {sel:'[data-h="lineeleven"]', view:'blobline', place:'left', title:'Linking to one exact line',
     what:'<p>A single highlighted line, produced entirely by <code>#L11</code> on the end of the URL.</p>',
     why:'<p>“It is somewhere in the README” wastes the reader’s time. A line link removes all ambiguity, which is why every code review conversation on GitHub is built out of them.</p>',
     how:'<p>Click a line number on the real page — the address bar updates and the line highlights. Copy the address. Shift-click a second line number for a range, <code>#L10-L11</code>.</p>',
     fail:'<p>Line links point at a <em>branch</em>, so they drift: add three lines above and the link now points at the wrong sentence. To make it permanent, press <code>y</code> first — GitHub rewrites the URL to use the commit SHA instead of <code>main</code>, freezing it forever.</p>',
     when:'<p>Sending your tutor “this specific sentence in my journal” instead of “my journal”. Also the moment you ask anyone for help with anything.</p>'},

    {sel:'[data-h="fuzzynote"]', place:'top', title:'Search inside a repo, the other tool',
     what:'<p>Separate from the finder: <code>/</code> from inside a repo offers “In this repository”, which searches the <em>contents</em> of every file on the default branch.</p>',
     why:'<p>Names and contents are two different indexes. Merging them would make both worse, so GitHub kept them apart and gave them separate shortcuts — <code>t</code> for names, <code>/</code> for contents.</p>',
     how:'<p>Press <code>/</code>, keep the “In this repository” scope, type your words. Or skip the interface entirely and type <code>repo:jordan-lee/trading-journal-practice IronCondor</code> into global search — identical result.</p>',
     fail:'<p>Neither tool sees deleted files or other branches. If you know you wrote something and search finds nothing, the text is probably in the history rather than in the current version — that is the Commits facet, not this.</p>',
     when:'<p>“Where did I write down my trading alias?” — contents. “Where is my week 6 file?” — names. Pick the tool by which of those two you are asking.</p>'}
   ]
  },

  /* ==================== URLs ==================== */
  {type:'prose', title:'Reading a GitHub URL, and typing your own',
   html:
    '<p>This is the trick nobody teaches beginners, and it is the one that makes the whole site feel smaller. Every ' +
    'GitHub URL is built the same way, so once you can read one you can also <em>write</em> one — and typing an ' +
    'address is faster than finding the button that would have taken you there.</p>'
  },

  {type:'html', html:
    '<div style="border:1px solid var(--gh-border-default);border-radius:8px;background:var(--gh-canvas-subtle);padding:20px 18px;margin:4px 0 12px;overflow-x:auto">' +
      '<div style="font-family:var(--font-mono);font-size:15px;white-space:nowrap;display:flex;align-items:flex-end;gap:0">' +
        '<span style="color:var(--gh-fg-subtle);padding:2px 0">github.com/</span>' +
        '<span style="background:rgba(47,129,247,.18);border-bottom:2px solid #2f81f7;padding:2px 4px">jordan-lee</span>' +
        '<span style="color:var(--gh-fg-subtle);padding:2px 0">/</span>' +
        '<span style="background:rgba(163,113,247,.18);border-bottom:2px solid #a371f7;padding:2px 4px">trading-journal-practice</span>' +
        '<span style="color:var(--gh-fg-subtle);padding:2px 0">/</span>' +
        '<span style="background:rgba(63,185,80,.18);border-bottom:2px solid #3fb950;padding:2px 4px">blob</span>' +
        '<span style="color:var(--gh-fg-subtle);padding:2px 0">/</span>' +
        '<span style="background:rgba(210,153,34,.2);border-bottom:2px solid #d29922;padding:2px 4px">main</span>' +
        '<span style="color:var(--gh-fg-subtle);padding:2px 0">/</span>' +
        '<span style="background:rgba(248,81,73,.16);border-bottom:2px solid #f85149;padding:2px 4px">README.md</span>' +
        '<span style="background:rgba(139,148,158,.2);border-bottom:2px solid #8b949e;padding:2px 4px">#L11</span>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-top:18px;font-size:13px">' +
        '<div><div style="font-weight:600;color:#2f81f7;margin-bottom:2px">owner</div>' +
          '<div style="color:var(--gh-fg-muted)">A person or an organization. On its own it is a profile page.</div></div>' +
        '<div><div style="font-weight:600;color:#a371f7;margin-bottom:2px">repository</div>' +
          '<div style="color:var(--gh-fg-muted)">The project. Owner plus repo is the full address of anything.</div></div>' +
        '<div><div style="font-weight:600;color:#3fb950;margin-bottom:2px">what kind of view</div>' +
          '<div style="color:var(--gh-fg-muted)"><code>blob</code> one file · <code>tree</code> a folder · <code>commits</code> history · <code>blame</code> line-by-line authorship.</div></div>' +
        '<div><div style="font-weight:600;color:#d29922;margin-bottom:2px">which version</div>' +
          '<div style="color:var(--gh-fg-muted)">A branch name, a tag, or a commit SHA. Swap <code>main</code> for a SHA and you freeze the link.</div></div>' +
        '<div><div style="font-weight:600;color:#f85149;margin-bottom:2px">path inside the repo</div>' +
          '<div style="color:var(--gh-fg-muted)">Folders and the filename, separated by forward slashes.</div></div>' +
        '<div><div style="font-weight:600;color:#8b949e;margin-bottom:2px">fragment</div>' +
          '<div style="color:var(--gh-fg-muted)">Everything after <code>#</code> is a jump target the browser handles — here, line 11.</div></div>' +
      '</div>' +
    '</div>'
  },

  {type:'prose', html:
    '<p>Which means all of these are things you can type rather than hunt for. Take any repo address and add:</p>' +
    '<pre><code>/commits/main        every commit on the main branch\n' +
    '/tree/main/journal   one folder, as main sees it\n' +
    '/blob/main/README.md one file\n' +
    '/blame/main/README.md who wrote each line, and in which commit\n' +
    '/issues/3            issue number three\n' +
    '/pull/1              pull request number one\n' +
    '/branches            every branch, and how far ahead or behind main it is\n' +
    '/compare/main...my-branch   the full diff between two branches\n' +
    '/settings            the repo settings page (only if you own it)\n' +
    '/find/main           the file finder, without pressing t</code></pre>' +
    '<p>Two of those are worth knowing cold. <code>/compare/main...branch</code> shows you every difference between ' +
    'two versions before you commit to anything — Module 6 opens pull requests from exactly this page. And ' +
    '<code>/blame/</code> answers “when did this line become wrong, and what was I thinking” in one screen.</p>' +
    '<p>One gotcha you have already met: your file’s backslash appears in URLs as <code>%5C</code>. Any character ' +
    'that is not legal in a path gets rewritten as a percent sign and two digits, which is why ' +
    '<code>journal%5Cweek6.md</code> looks so strange in the address bar. It is a symptom, not a second bug.</p>'
  },

  /* ==================== OTHER PEOPLE'S REPOS ==================== */
  {type:'prose', title:'Other people’s code: finding it, and judging it',
   html:
    '<p>Three doors into the rest of GitHub. <strong>Explore</strong> (<code>github.com/explore</code>) is a ' +
    'recommendation page. <strong>Trending</strong> (<code>github.com/trending</code>) is what gained the most stars ' +
    'today, this week or this month, filterable by language — good for seeing what exists, terrible as a quality ' +
    'signal, because a repo can trend on a good README alone. <strong>Topics</strong> ' +
    '(<code>github.com/topics/quantitative-finance</code>) are the tags repo owners add themselves, and they are the ' +
    'most useful of the three because someone deliberately classified their own work.</p>' +
    '<p>Finding a repo is the easy half. The skill is deciding in a few seconds whether it deserves your afternoon.</p>'
  },

  {type:'compare', title:'Judging an unfamiliar repo',
   left:{title:'What most people do',
     html:'<p>Look at the star count, decide 8k stars means it is good, clone it, spend two hours discovering it was ' +
          'abandoned in 2021 and no longer works with a current version of Python.</p>' +
          '<p>Stars never expire and never decrease. They record how many people once thought a project was ' +
          'interesting, which is a fact about the past and says nothing about today.</p>' +
          '<p>The other version of the same mistake: rejecting a genuinely good, actively maintained tool because it ' +
          'only has 200 stars. Niche things are small on purpose.</p>'},
   right:{title:'The five-second check, in order',
     html:'<p><strong>1. Last commit date.</strong> Top of the file list. Months is fine. Years means you are on your ' +
          'own.</p>' +
          '<p><strong>2. Issues tab.</strong> Open issues with recent replies means someone is home. Four hundred open ' +
          'and nothing answered since 2023 means nobody is.</p>' +
          '<p><strong>3. The README.</strong> Does it show you how to install and use the thing in the first screen? ' +
          'A README that only describes the philosophy usually fronts a project you will not get working.</p>' +
          '<p><strong>4. The licence.</strong> Shown in the About sidebar. No licence means you have no legal ' +
          'permission to reuse it, however public it is — Module 9 covers why.</p>' +
          '<p><strong>5. Stars, last.</strong> Now the number is context rather than the verdict.</p>'}
  },

  {type:'prose', title:'Stars, watching and forking — as your tools',
   html:
    '<p>These three sit next to each other in the repo header and get treated as social buttons. They are actually ' +
    'three different pieces of personal infrastructure.</p>' +
    '<p><strong>Star = a bookmark you can search.</strong> Everything you star lands at <code>github.com/stars</code>, ' +
    'where you can filter by language and — the part almost nobody uses — sort them into named lists. Star anything ' +
    'you would otherwise paste into a notes file. Unlike a browser bookmark it survives switching computers, and it ' +
    'is searchable.</p>' +
    '<p><strong>Watch = notifications, with a volume dial.</strong> The default when you click Watch is “All ' +
    'Activity”, which on a busy project means every comment on every issue lands in your GitHub inbox. Choose ' +
    '<em>Custom</em> and tick only <em>Releases</em>, and you get told when a library you depend on ships a new ' +
    'version and at no other time. That is the setting worth knowing: everything else is noise, and the failure mode ' +
    'is that you stop reading notifications entirely and then miss the one from your tutor.</p>' +
    '<p><strong>Fork = your own copy of someone else’s work.</strong> You cannot commit to a stranger’s repo, so ' +
    'forking gives you one you fully control, permanently linked back to the original. It is the legitimate way to ' +
    'learn from somebody’s project: fork it, break it, see what stops working. Module 10 uses the same button to ' +
    'contribute a fix back.</p>'
  },

  {type:'callout', variant:'tip', title:'Keyboard shortcuts that are worth the memorising',
   html:
    '<p><code>/</code> — focus search. <code>t</code> — file finder on any file list. <code>s</code> — also focuses ' +
    'search, from anywhere. <code>?</code> — show every shortcut for the page you are on, which is how you discover ' +
    'the rest without a tutorial.</p>' +
    '<p><code>g</code> then <code>c</code> — go to Code. <code>g</code> then <code>i</code> — Issues. <code>g</code> ' +
    'then <code>p</code> — Pull requests. Press them in sequence, not together. Once these are in your fingers you ' +
    'stop aiming at the tab row entirely.</p>' +
    '<p>And the party trick: press <code>.</code> on any repository. GitHub opens the whole thing in a full code ' +
    'editor inside your browser, with a file tree, multi-file editing and a commit box — no installation, no ' +
    'download. It is the same editor as VS Code. For editing three files at once it is far better than clicking the ' +
    'pencil three times, and it is the natural bridge to Module 10.</p>'
  },

  {type:'terms', title:'The words you now need',
   items:[
     {term:'Qualifier', html:'A <code>name:value</code> filter in a search query — <code>user:</code>, <code>repo:</code>, <code>language:</code>. Multiple qualifiers all have to match.'},
     {term:'Facet', html:'The Code / Repositories / Issues / Users tabs on a results page. Same query, different kind of object, separate count.'},
     {term:'Organization', html:'An account owned by a group rather than a person. <code>coursework</code> and <code>coursework</code> are two of them, and they own two of your seven listed repos.'},
     {term:'Fuzzy matching', html:'Matching your letters in order with gaps allowed, which is how <code>wk6</code> finds <code>week6.md</code>. Used by the file finder, not by search.'},
     {term:'Fragment', html:'The bit of a URL after <code>#</code>. On GitHub, <code>#L11</code> highlights line 11 and <code>#L10-L20</code> highlights a range.'},
     {term:'Blame', html:'A view showing, for each line of a file, the commit that last changed it and who wrote it. Reachable at <code>/blame/main/FILE</code>.'},
     {term:'Topic', html:'A tag the repo owner adds to their own repo. Browsable at <code>github.com/topics/NAME</code> and searchable with <code>topic:</code>.'},
     {term:'Contribution graph', html:'The grid of green squares on a profile. Counts commits to the default branch, plus issues, pull requests and reviews — and nothing on unmerged branches.'}
   ]
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Split your dashboard into its three rails and say what each is for — and why the repo list is ordered by recency, not importance',
     'Explain <strong>owner/repo</strong>, and why <strong>coursework/48213097</strong> and <strong>coursework/jordan-lee</strong> are owned by organizations rather than by you',
     'Write a search with qualifiers — <code>user:</code>, <code>repo:</code>, <code>filename:</code>, <code>is:issue</code> — and read the facet counts before clicking',
     'Use <code>t</code> for filenames and <code>/</code> for file contents, and know which of the two your question needs',
     'Read a GitHub URL segment by segment, and type <code>/commits/main</code>, <code>/blame/</code> or <code>/compare/</code> instead of hunting for a button',
     'Link to one exact line with <code>#L11</code>, and freeze that link with <code>y</code> so it never drifts',
     'Judge an unfamiliar repo on last-commit date, issues, README and licence before you look at the star count',
     'Say what your profile currently shows a stranger, and name the two fifteen-minute fixes: pinned repos with descriptions, and a profile README'
   ]
  }

  ]
});
