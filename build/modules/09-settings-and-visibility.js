/* ============================================================================
   MODULE 09 — "Settings, visibility and not leaking things"
   Owns TEACHING MOMENT #5 (BRIEF.md §4.5): the repo is Private.
   ========================================================================== */

MODULES.push({
  id: 'settings-and-visibility',
  num: 9,
  title: 'Settings, visibility and not leaking things',
  blurb: 'Your repo is Private, which is currently the right answer and will not be forever. This module is the decision, the switch, and the small number of things that are genuinely expensive to get wrong.',
  goals: [
    'Say exactly who can see <strong>trading-journal-practice</strong> today, and what changes the moment it goes public',
    'Change a repository’s visibility, and explain why GitHub makes you type its name to confirm',
    'Keep a password, an API key or a <code>.env</code> file out of a repo — and know what to do first if one gets in',
    'Find the settings that matter at repo level and at account level, and stop confusing the two'
  ],
  sections: [

  {type:'prose', html:
    '<p class="tut-lead">There are only two ways a student gets hurt by GitHub. One is publishing something that ' +
    'should have stayed private. The other is keeping something private that needed to be seen — a link you sent a ' +
    'tutor that opens a 404 for them, a portfolio nobody can look at.</p>' +
    '<p>Both are the same setting, pointed in opposite directions. So this module is not a tour of every checkbox. ' +
    'It is the visibility decision, the two or three things that are genuinely expensive to leak, and the handful of ' +
    'account settings that stop you being locked out of your own work.</p>' +
    '<p>Nothing here is meant to scare you. Every one of these mistakes is recoverable if you catch it, and the ' +
    'catching is mostly a matter of knowing which order to do things in.</p>'
  },

  {type:'callout', variant:'moment', title:'Teaching moment: your repo is Private, and it says so on the page',
   html:
    '<p>The grey <strong>Private</strong> pill next to <code>trading-journal-practice</code> is not a suggestion or a ' +
    'placeholder. It is the answer to “who can open this?” and the answer is: you, signed in, and nobody else at all.</p>' +
    '<p>Not your classmates. Not your tutor, even if you send them the exact link — they get GitHub’s 404 page, which ' +
    'says the repository does not exist rather than “you do not have access”, because GitHub refuses to confirm that a ' +
    'private repo exists to someone who cannot see it. Not a recruiter. Not Google. It also does not appear on your ' +
    'own public profile, which is why your profile currently looks emptier than your semester has been.</p>' +
    '<p>For unmarked coursework, that is the correct setting and you should leave it alone. The rest of this module ' +
    'is about the day that stops being true, and about what has to be checked before you flip it.</p>'
  },

  {type:'prose', title:'Why Private is right for now, and wrong later',
   html:
    '<p><strong>Right now: academic integrity.</strong> A public repo containing your assignment is a public copy of ' +
    'your assignment. Anyone can find it, and at most universities the person who <em>published</em> the work carries ' +
    'the consequence alongside whoever copied it — plagiarism policies usually cover facilitating as well as ' +
    'committing. Nothing about GitHub protects you here; the file list is the evidence, and the commit timestamps ' +
    'prove you published it first. Private until it is marked is not paranoia, it is the default a sensible person ' +
    'picks.</p>' +
    '<p><strong>Later: a private repo does nothing for you.</strong> A GitHub profile is one of the few pieces of ' +
    'evidence you can hand someone that is not a claim about yourself. A private repo contributes nothing to it — no ' +
    'README anyone can read, no visible commit history, no proof you worked steadily rather than in one night.</p>' +
    '<p>So it is a timing decision, not a permanent one, and it has an obvious trigger: results are released. What ' +
    'matters is that when you do flip it, you know exactly what flips with it.</p>'
  },

  {type:'compare', title:'The visibility decision, both ways round',
   left:{title:'Flipping it public now, because portfolios matter',
     html:'<p>Your unit is still running and the work is still being marked. A public repo of a live assessment is ' +
          'discoverable by search — including by other students in your cohort, who did not have to ask you.</p>' +
          '<p>And the repo is not ready to be seen anyway. The README still says <em>e.g. IronCondor</em> and ' +
          '<em>all of the above 2</em>, there is a file called <code>journal\\week6.md</code>, and the About box is ' +
          'blank. Public means a stranger reads that version first, and there is no second first impression.</p>' +
          '<p>Worst case, you make it public, notice, and make it private again — which does not retract anything. ' +
          'Anything already fetched, cloned or cached stays fetched.</p>'},
   right:{title:'Private now, public deliberately, once',
     html:'<p>Leave it Private until the unit is marked. That costs you nothing: your commit history is still being ' +
          'recorded, and private contributions can still fill in your profile graph with one settings checkbox.</p>' +
          '<p>Meanwhile build the portfolio piece that carries no risk at all: a <strong>public profile README</strong> ' +
          '(Module 8, hotspot 13) and a description plus topics on your repos. Those are visible immediately and ' +
          'reveal nothing you are being graded on.</p>' +
          '<p>Then, after results: fix the README, rename the backslash file, add a description, and flip it once. ' +
          'The repo a recruiter finds is the finished one, and the messy history underneath it reads as ' +
          'evidence of work rather than as a mess.</p>'}
  },

  /* ==================== SCREEN 1 — THE SETTINGS PAGES ==================== */
  {type:'prose', title:'Walking the repository settings',
   html:
    '<p>Settings is the last tab on the repo tab row, and you only see it on repos you own or administer. The left ' +
    'nav inside it groups about twenty pages into four blocks. Four of those pages are worth your time this year; ' +
    'the rest exist for projects far larger than yours.</p>' +
    '<p>This screen is the top of <strong>General</strong>, plus two of the pages you will genuinely open. Click the ' +
    'nav items — Collaborators and Branches both work.</p>'
  },

  {type:'screen',
   id:'repo-settings',
   label:'Settings → General, Collaborators, and Branches',
   url:'github.com/jordan-lee/trading-journal-practice/settings',
   initial:'general',
   inertNote:'Inert in this lesson. The live parts are the left nav — General, Collaborators and Branches all switch — plus the numbered markers.',

   views:{

    /* ---------- GENERAL ---------- */
    general:{ url:'github.com/jordan-lee/trading-journal-practice/settings', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32 gh-topnav__avatar" data-h="acctavatar" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span>' +
        '<span class="gh-badge" data-h="privbadge">Private</span></div></div>' +
        '<nav class="gh-tabnav"><span class="gh-tab"><svg class="octicon"><use href="#oct-code"/></svg>Code</span><span class="gh-tab"><svg class="octicon"><use href="#oct-issue-opened"/></svg>Issues</span><span class="gh-tab"><svg class="octicon"><use href="#oct-git-pull-request"/></svg>Pull requests</span><span class="gh-tab"><svg class="octicon"><use href="#oct-rocket"/></svg>Agents</span><span class="gh-tab"><svg class="octicon"><use href="#oct-play"/></svg>Actions</span><span class="gh-tab"><svg class="octicon"><use href="#oct-table"/></svg>Projects</span><span class="gh-tab"><svg class="octicon"><use href="#oct-shield"/></svg>Security and quality</span><span class="gh-tab"><svg class="octicon"><use href="#oct-graph"/></svg>Insights</span><span class="gh-tab gh-tab--active" data-h="settingstab"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</span></nav></div>' +
      '<div class="gh-page"><div class="gh-settings">' +

        '<div class="gh-settings__nav" data-h="settingsnav">' +
          '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-gear"/></svg>General</span>' +
          '<span class="gh-settings__navsec">Access</span>' +
          '<span class="gh-settings__navitem" data-h="nav-collab"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Collaborators</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Moderation options</span>' +
          '<span class="gh-settings__navsec">Code and automation</span>' +
          '<span class="gh-settings__navitem" data-h="nav-branches"><svg class="octicon octicon--sm"><use href="#oct-git-branch"/></svg>Branches</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-tag"/></svg>Tags</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-play"/></svg>Actions</span>' +
          '<span class="gh-settings__navitem" data-h="nav-pages"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Pages</span>' +
          '<span class="gh-settings__navsec">Security</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-shield"/></svg>Code security</span>' +
          '<span class="gh-settings__navitem" data-h="nav-secrets"><svg class="octicon octicon--sm"><use href="#oct-lock"/></svg>Secrets and variables</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-link-external"/></svg>Deploy keys</span>' +
        '</div>' +

        '<div>' +
          '<h2 class="gh-settings__h">General</h2>' +

          '<div class="gh-formrow" data-h="reponamefield">' +
            '<span class="gh-formrow__label">Repository name</span>' +
            '<span class="gh-input" style="display:block">trading-journal-practice</span>' +
            '<span class="gh-btn gh-btn--sm" style="margin-top:8px;display:inline-flex">Rename</span>' +
            '<div class="gh-formrow__hint">Renaming redirects old links — until somebody else claims the old name.</div>' +
          '</div>' +

          '<h3 class="gh-settings__h2">Default branch</h3>' +
          '<div class="gh-formrow" data-h="defaultbranch">' +
            '<span style="display:inline-flex;align-items:center;gap:8px">' +
              '<span class="gh-btn"><svg class="octicon"><use href="#oct-git-branch"/></svg>main</span>' +
              '<span class="gh-btn gh-btn--sm"><svg class="octicon octicon--sm"><use href="#oct-sync"/></svg>Switch to another branch</span></span>' +
            '<div class="gh-formrow__hint">The branch shown on the front page, and the target of every new pull request.</div>' +
          '</div>' +

          '<h3 class="gh-settings__h2">Features</h3>' +
          '<div data-h="features">' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark is-checked" style="border-radius:3px;border-color:var(--gh-accent-emphasis);background:var(--gh-accent-emphasis)"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Issues</span>' +
              '<span class="gh-radiorow__sub" style="display:block">On. The to-do list that lives with the project — Module 7.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Wikis</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Off. A separate page set for documentation too long for a README.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Discussions</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Off. A forum, for questions that are not bugs and have no “done”.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark is-checked" style="border-radius:3px;border-color:var(--gh-accent-emphasis);background:var(--gh-accent-emphasis)"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Projects</span>' +
              '<span class="gh-radiorow__sub" style="display:block">On. The kanban board built from your issues.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Preserve this repository</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Off. Includes the repo in GitHub’s long-term archive programme.</span></span></div>' +
          '</div>' +

          '<div class="gh-flash" style="margin-top:20px"><svg class="octicon"><use href="#oct-info"/></svg>' +
            '<span>The real page continues past here with Pull Requests options, Archives, and — at the very bottom — ' +
            'the Danger Zone. That gets its own screen further down, because it deserves one.</span></div>' +
        '</div>' +

      '</div></div>'
    },

    /* ---------- COLLABORATORS ---------- */
    collaborators:{ url:'github.com/jordan-lee/trading-journal-practice/settings/access', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-settings">' +
        '<div class="gh-settings__nav">' +
          '<span class="gh-settings__navitem" data-h="nav-general"><svg class="octicon octicon--sm"><use href="#oct-gear"/></svg>General</span>' +
          '<span class="gh-settings__navsec">Access</span>' +
          '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Collaborators</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-comment"/></svg>Moderation options</span>' +
          '<span class="gh-settings__navsec">Code and automation</span>' +
          '<span class="gh-settings__navitem" data-h="nav-branches"><svg class="octicon octicon--sm"><use href="#oct-git-branch"/></svg>Branches</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-play"/></svg>Actions</span>' +
        '</div>' +
        '<div>' +
          '<h2 class="gh-settings__h">Collaborators</h2>' +
          '<div class="gh-flash gh-flash--warn" style="margin-bottom:16px"><svg class="octicon"><use href="#oct-alert"/></svg>' +
            '<span>This repository is private. Anyone you add here can read <em>everything</em> in it, including the ' +
            'full commit history.</span></div>' +
          '<div class="gh-listbox" data-h="collablist">' +
            '<div class="gh-listbox__head"><span>Manage access</span>' +
              '<span style="margin-left:auto"><span class="gh-btn gh-btn--primary gh-btn--sm" data-h="addpeople">Add people</span></span></div>' +
            '<div class="gh-listrow">' +
              '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-listrow__main"><span class="gh-listrow__title" style="display:block;font-size:14px">jordan-lee</span>' +
                '<span class="gh-listrow__meta" style="display:block">You created this repository</span></span>' +
              '<span class="gh-listrow__right" data-h="rolepill"><span class="gh-btn gh-btn--sm">Admin<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
            '</div>' +
          '</div>' +
          '<h3 class="gh-settings__h2">What the access levels mean</h3>' +
          '<div class="gh-markdown" style="font-size:13px">' +
            '<ul>' +
            '<li><b>Read</b> — can see everything and comment. What you give a tutor or a marker.</li>' +
            '<li><b>Triage</b> — read, plus managing issues and pull requests without changing any files.</li>' +
            '<li><b>Write</b> — can push commits and merge. What a group partner needs.</li>' +
            '<li><b>Maintain</b> — write, plus most settings, but not deletion or visibility.</li>' +
            '<li><b>Admin</b> — everything, including making it public and deleting it. Give this to nobody on a coursework repo.</li>' +
            '</ul></div>' +
        '</div>' +
      '</div></div>'
    },

    /* ---------- BRANCHES ---------- */
    branches:{ url:'github.com/jordan-lee/trading-journal-practice/settings/branches', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page"><div class="gh-settings">' +
        '<div class="gh-settings__nav">' +
          '<span class="gh-settings__navitem" data-h="nav-general"><svg class="octicon octicon--sm"><use href="#oct-gear"/></svg>General</span>' +
          '<span class="gh-settings__navsec">Access</span>' +
          '<span class="gh-settings__navitem" data-h="nav-collab"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Collaborators</span>' +
          '<span class="gh-settings__navsec">Code and automation</span>' +
          '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-git-branch"/></svg>Branches</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-play"/></svg>Actions</span>' +
        '</div>' +
        '<div>' +
          '<h2 class="gh-settings__h">Branch protection rules</h2>' +
          '<div class="gh-blankslate gh-blankslate--dashed" data-h="norules">' +
            '<svg class="octicon"><use href="#oct-shield"/></svg>' +
            '<h3>No rules are set up for this repository</h3>' +
            '<p>Nothing currently stops a commit going straight into main.</p>' +
            '<span class="gh-btn gh-btn--primary" data-h="addrule">Add branch protection rule</span>' +
          '</div>' +
          '<h3 class="gh-settings__h2">What a rule on <span class="gh-mono">main</span> would enforce</h3>' +
          '<div data-h="ruleoptions">' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Require a pull request before merging</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Direct pushes to main are rejected. Every change has to arrive as a PR — Module 6.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Require approvals</span>' +
              '<span class="gh-radiorow__sub" style="display:block">At least one other person has to click Approve before Merge unlocks.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Require status checks to pass</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Automated checks must be green first — the Actions runs from Module 10.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark" style="border-radius:3px"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Do not allow bypassing the above settings</span>' +
              '<span class="gh-radiorow__sub" style="display:block">The rules apply to admins too — including you.</span></span></div>' +
          '</div>' +
        '</div>' +
      '</div></div>'
    }
   },

   actions:[
     {on:'[data-h="nav-collab"]', view:'collaborators', explain:{title:'Access is a per-repository thing',
       html:'<p>Adding somebody here gives them access to <em>this repo only</em>. It is not a friendship and it is ' +
            'not account-wide — the same person can have Write on one of your repos and no access at all to the next.</p>' +
            '<p>The invite has to be accepted. Until they click the email, they appear as “pending” and still cannot ' +
            'see anything, which is the usual reason a group partner says “I cannot open it”.</p>' +
            '<p>And note what it does <em>not</em> do: adding a collaborator does not add them to the Contributors ' +
            'card on the front page. That list is built from merged commits, so it records who did the work rather ' +
            'than who had the key.</p>'}},
     {on:'[data-h="nav-branches"]', view:'branches', explain:{title:'This is why some repos refuse a direct push',
       html:'<p>Module 6 showed you pull requests as a good habit. Branch protection is the same idea enforced by the ' +
            'server: with “Require a pull request before merging” switched on, committing straight to <code>main</code> ' +
            'is rejected outright, whoever you are.</p>' +
            '<p>Your repo has no rules, which is why the pencil icon lets you edit README.md on main with no ceremony. ' +
            'On any shared project that would be reckless, so shared projects turn this on.</p>' +
            '<p>If you ever hit “protected branch hook declined” or GitHub greys out the Commit button, this page is ' +
            'the reason — and the fix is to make a branch and open a PR, not to fight it.</p>'}},
     {on:'[data-h="nav-general"]', view:'general'},
     {on:'[data-h="nav-pages"]', toast:'Pages turns this repo into a free website. That is Module 10, and it has its own screen.'},
     {on:'[data-h="nav-secrets"]', toast:'Secrets and variables stores encrypted values for automated jobs — never for things your own files need to read.'},
     {on:'[data-h="settingstab"]', toast:'You are already on Settings. Note the orange underline — this tab only appears on repos you own or administer.'},
     {on:'[data-h="addpeople"]', toast:'On the real page this opens a username search. Type their <b>exact</b> GitHub username, not their name.'},
     {on:'[data-h="addrule"]', toast:'A rule needs a branch name pattern — <span class="gh-mono">main</span> — and then the checkboxes listed below.'}
   ],

   hotspots:[

    {sel:'[data-h="settingsnav"]', place:'right', title:'The settings left nav — four blocks, four jobs',
     what:'<p>About twenty pages, grouped: <strong>General</strong> (identity and features), <strong>Access</strong> (who can do what), <strong>Code and automation</strong> (branches, Actions, Pages), <strong>Security</strong> (scanning, secrets, keys).</p>',
     why:'<p>A repository can be a two-file coursework folder or a piece of infrastructure with two hundred contributors. The same settings screen has to serve both, so GitHub grouped the pages instead of ranking them.</p>',
     how:'<p>Four of these matter to you this year: <em>General</em> for the name and the Danger Zone, <em>Collaborators</em> for group work, <em>Branches</em> if you ever protect main, <em>Pages</em> to publish a website. Click Collaborators or Branches now — both work.</p>',
     fail:'<p>Looking here for your own account settings — your email, your password, two-factor. Those are under your avatar, top right. This entire page is about the project, not about you.</p>',
     when:'<p>Twice a semester, realistically: once when you add a group member, once when you decide about visibility.</p>'},

    {sel:'[data-h="privbadge"]', place:'right', title:'The Private badge, from the settings side',
     what:'<p>The same pill you saw in Module 2, still saying the same thing: this repository is visible to you and to nobody else.</p>',
     why:'<p>GitHub shows visibility on every page of a repo rather than only in settings, because the cost of being wrong about it is asymmetric. Thinking something is private when it is public is the expensive direction.</p>',
     how:'<p>Read it before you paste a link to anyone, and read it before you commit anything you would not want indexed. It is the single most useful two seconds on the page.</p>',
     fail:'<p>Sending a tutor the link while this says Private. They get GitHub’s 404 page — “this is not the web page you are looking for” — which reads like a broken link rather than a permissions problem, so neither of you diagnoses it.</p>',
     when:'<p>Right now, before you submit anything. If the unit wants a link, either add the marker as a collaborator with Read access or ask what they actually want.</p>'},

    {sel:'[data-h="reponamefield"]', place:'right', title:'Repository name — and what renaming costs',
     what:'<p>The name half of <code>owner/repo</code>. Changing it here changes every URL that points at this project.</p>',
     why:'<p>People outgrow names. GitHub allows the rename and installs a redirect from the old address, so existing links keep working rather than breaking the instant you tidy up.</p>',
     how:'<p>Type the new name, click Rename. Lowercase, hyphens instead of spaces, and something you will recognise in two years — <code>trading-journal-2026</code> beats <code>practice</code>.</p>',
     fail:'<p>The redirect is not permanent protection. If you rename this to something else and then somebody — including you — creates a new repo with the old name, the redirect dies and every old link 404s.</p>',
     when:'<p>Before you make it public, not after. Rename while three people have the link, not while thirty do.</p>'},

    {sel:'[data-h="defaultbranch"]', place:'right', title:'Default branch',
     what:'<p>Which branch is “the project” — the one the front page shows, the one search indexes, and the one every new pull request targets by default.</p>',
     why:'<p>A repo can hold many branches with no inherent ranking. Something has to be designated official, or GitHub would not know which version to show a visitor.</p>',
     how:'<p>Leave it as <code>main</code>. You would only change it on an old repo still using the name <code>master</code>, or when a project deliberately develops on a branch called <code>develop</code>.</p>',
     fail:'<p>Switching it retargets every open pull request and can leave people’s local copies pointing at a branch that is no longer the trunk. It is a coordination problem, not a click.</p>',
     when:'<p>Almost never. It is here so that when you see “default branch” in an error message you know which branch is meant.</p>'},

    {sel:'[data-h="features"]', place:'right', title:'Features — the toggles that add and remove whole tabs',
     what:'<p>Switches for Issues, Wikis, Discussions, Projects. Turning one off removes its tab from the repo entirely.</p>',
     why:'<p>Most repos need two or three of these and are cluttered by the rest. Rather than shipping a fixed set, GitHub lets each project decide which rooms exist.</p>',
     how:'<p>Untick anything you will never use — Wikis and Discussions, on a repo this size. Ticking Issues back on later restores the tab and everything that was ever in it; nothing is deleted by hiding it.</p>',
     fail:'<p>Turning Issues off on a public repo means nobody has any way to report a problem to you. On a shared project people conclude you are not interested rather than that you clicked a checkbox.</p>',
     when:'<p>Once, when you create a repo. Two minutes of tidying that stops you scrolling past three empty tabs for a year.</p>'},

    {sel:'[data-h="collablist"]', view:'collaborators', place:'left', title:'Collaborators — adding a human to a repository',
     what:'<p>The list of accounts with access to this repo beyond you, each with a role that decides what they may do.</p>',
     why:'<p>Private means private, so shared work needs an explicit list of exceptions. Roles exist because “can see it” and “can delete it” should not be the same permission.</p>',
     how:'<p><strong>Add people</strong> → type their exact GitHub username → choose a role → they get an email invitation they have to accept. Until they accept, they see nothing.</p>',
     fail:'<p>Two failures, both common. Searching by real name and inviting the wrong stranger with a similar handle — always ask for the username. And giving a group partner <em>Admin</em> when they needed <em>Write</em>: Admin includes deleting the repository.</p>',
     when:'<p>The first group assignment where the work lives in a repo. Also the way to let a marker see a private repo without making it public: add them as Read.</p>'},

    {sel:'[data-h="rolepill"]', view:'collaborators', place:'left', title:'The role dropdown — Read, Triage, Write, Maintain, Admin',
     what:'<p>Five levels of access, each a superset of the one before. You are Admin because you created the repo.</p>',
     why:'<p>Access is not one thing. A marker needs to read; a partner needs to push; almost nobody else needs to be able to change the repository’s visibility or delete it.</p>',
     how:'<p>Default to the smallest level that lets the person do their job: Read for anyone reviewing, Write for anyone contributing. You can change it afterwards without re-inviting them.</p>',
     fail:'<p>Handing out Admin “to keep things simple”. An Admin can flip the repo public, transfer it to their own account, or delete it — and none of those need your approval.</p>',
     when:'<p>Every time you add somebody. It takes one extra click and it is the entire point of the feature.</p>'},

    {sel:'[data-h="norules"]', view:'branches', place:'left', title:'Branch protection — why some repos refuse a direct push',
     what:'<p>Server-side rules attached to a branch name. With none set, as here, anyone with Write access can commit straight into <code>main</code>.</p>',
     why:'<p>Good habits are unreliable at 2am before a deadline. Protection turns “we agreed to use pull requests” into something the server enforces whether or not anyone remembers.</p>',
     how:'<p>Add a rule, name the branch pattern <code>main</code>, and tick the boxes listed below this panel. The most common single setting is “Require a pull request before merging”.</p>',
     fail:'<p>This is what is happening when GitHub greys out the Commit button, or the web editor says a change cannot be committed to this branch. It is not a bug and it is not your permissions — it is a rule, and the answer is a branch plus a PR.</p>',
     when:'<p>Not on a solo coursework repo — it would only slow you down. The moment a second person has Write access, turn it on.</p>'},

    {sel:'[data-h="ruleoptions"]', view:'branches', place:'left', title:'The four rules that matter',
     what:'<p>Require a PR · require an approval · require checks to pass · apply the rules to admins as well.</p>',
     why:'<p>Each one closes a specific hole: no unreviewed change, no unread change, no broken change, and no “rules for thee” exception for whoever owns the repo.</p>',
     how:'<p>On a two-person project, the first and the last are enough. Requiring approvals on a solo repo makes it impossible to merge your own work, which is a trap people set for themselves.</p>',
     fail:'<p>Ticking “require approvals” alone on a repo where you are the only collaborator. GitHub will not let you approve your own pull request, so nothing can ever be merged and you have locked yourself out of your own main branch.</p>',
     when:'<p>Group assignment, week one, before anybody has written anything. Retrofitting rules after a mess is far more annoying than starting with them.</p>'}
   ]
  },

  /* ==================== WHAT PUBLIC EXPOSES ==================== */
  {type:'prose', title:'What “public” actually exposes',
   html:
    '<p>People picture public as “the files are readable”. It is considerably more than that, and the extra parts are ' +
    'where the surprises live.</p>' +
    '<ul>' +
    '<li><strong>Every file, on every branch</strong> — including the branch you made, abandoned and forgot about.</li>' +
    '<li><strong>Every commit, forever.</strong> Not the current version of each file: every version there has ever ' +
    'been, each one addressable by its own URL.</li>' +
    '<li><strong>Every commit message</strong>, including the ones you dashed off at 1am and the ones GitHub wrote ' +
    'for you.</li>' +
    '<li><strong>Every issue, comment and pull request</strong>, including ones you closed.</li>' +
    '<li><strong>The email address on each commit</strong>, unless you turn on commit email privacy — see the ' +
    'account settings below. This is how strangers end up with your personal email from a repo you published in ' +
    'first year.</li>' +
    '<li><strong>Timestamps for all of it</strong>, which is usually fine and occasionally not: the history is an ' +
    'honest record of when you did the work.</li>' +
    '</ul>' +
    '<p>None of that is sinister. It is the same permanence that makes version control useful — the audit trail that ' +
    'lets you prove what a file said last Tuesday is the same audit trail that keeps a bad commit message alive. You ' +
    'just want to have decided, rather than found out.</p>'
  },

  {type:'callout', variant:'warn', title:'Going private again does not un-publish anything',
   html:
    '<p>Flipping a repo back to Private stops <em>new</em> people finding it. It does not retract what was already ' +
    'out. Anything cloned, forked, scraped or cached during the public window stays exactly where it went, and you ' +
    'have no way to reach it.</p>' +
    '<p>The same logic applies one level down: <strong>deleting a file does not remove it from history</strong>. The ' +
    'commit that added it is still there, still viewable, still linkable. Deleting is a new commit that says “this ' +
    'file is gone from here onwards” — it is not an eraser.</p>' +
    '<p>Which is the whole reason the next section exists. If a secret has been committed, the fix is never “delete ' +
    'the file”.</p>'
  },

  /* ==================== SECRETS ==================== */
  {type:'prose', title:'Secrets: the one mistake that actually costs money',
   html:
    '<p>A secret is anything that proves you are you to a computer: an API key, a password, a database connection ' +
    'string, an access token, the contents of a <code>.env</code> file. They end up in repositories because they ' +
    'have to sit next to the code that uses them, and the easiest place to put them is in the code itself.</p>' +
    '<p>Two facts make this expensive rather than embarrassing. First, the commit history keeps the key after you ' +
    'delete the file — the old version is one click away in the commit that added it. Second, automated scanners ' +
    'watch public GitHub continuously and have been observed using leaked cloud keys within a minute or two of the ' +
    'push. This is not a story about someone reading your repo; it is a story about a program that never sleeps.</p>' +
    '<p>The bill for a leaked cloud key is not theoretical either. People have woken up to five-figure invoices from ' +
    'crypto mining run on their account. You are unlikely to be running cloud infrastructure this semester, but you ' +
    'are quite likely to get an API key for market data, and the habit is what you are learning.</p>'
  },

  {type:'steps', title:'If a key does get committed — the order matters more than the speed',
   items:[
     {label:'Rotate the key first. Before anything else.',
      html:'<p>Go to whoever issued it — the data provider, the cloud console — and revoke or regenerate it. This is ' +
           'the only step that actually stops the damage, because it makes the leaked value useless.</p>' +
           '<p>Do this <em>before</em> you touch the repository, because cleaning the repo takes minutes and a bot ' +
           'takes seconds. Cleaning first is doing the slow half of the job while the fast half of the attack is ' +
           'already running.</p>'},
     {label:'Then deal with the repository',
      html:'<p>Now remove the value from the files and commit. If the repo is private and only you have ever cloned ' +
           'it, that is genuinely enough — the old commit is still there but nobody can reach it.</p>' +
           '<p>If it was public, assume the value is gone forever and that scrubbing history is about tidiness, not ' +
           'safety. Rewriting history properly needs command-line tools, which is outside this tutorial — and it is ' +
           'the wrong priority anyway, because you already rotated the key.</p>'},
     {label:'Stop it happening again',
      html:'<p>Add a <code>.gitignore</code> so the file cannot be committed by accident, and move the value into ' +
           'something the file does not contain. Which is the next section.</p>'},
     {label:'Check what else is in there',
      html:'<p>Search your own account for the usual shapes: <code>user:jordan-lee password</code>, ' +
           '<code>user:jordan-lee api_key</code>, <code>user:jordan-lee filename:.env</code>. ' +
           'Module 8 taught you the qualifiers; this is one of the better uses for them.</p>'}
   ]
  },

  {type:'prose', title:'.gitignore, and the two safety nets GitHub gives you',
   html:
    '<p><code>.gitignore</code> is a plain text file in the root of your repo listing patterns that Git should ' +
    'pretend do not exist. One pattern per line: <code>.env</code>, <code>*.log</code>, <code>secrets/</code>, ' +
    '<code>.DS_Store</code>. Anything matching is never offered for committing, so it cannot be swept in by ' +
    'accident.</p>' +
    '<p>It exists because the alternative is remembering, every single time, not to include a file. The whole point ' +
    'is to move that decision from your attention to a file that is itself version-controlled and shared with ' +
    'everyone on the project. When you create a repository GitHub offers a dropdown of ready-made templates — pick ' +
    'the one for your language and it comes with the usual suspects already listed.</p>' +
    '<p>Its limit is worth stating plainly: <code>.gitignore</code> only stops files that are <em>not yet</em> ' +
    'tracked. Adding <code>.env</code> to it after you have already committed <code>.env</code> does nothing at all ' +
    '— the file is already in, and the history still holds it.</p>' +
    '<p>Two GitHub features back you up. <strong>Secret scanning</strong> looks for recognisable key formats and ' +
    'alerts you — and, for many providers, tells the provider so they can revoke the key themselves. ' +
    '<strong>Push protection</strong> goes further and blocks the push before the secret lands, with a message ' +
    'telling you what it found. Both are on by default for public repositories now. Treat them as a smoke alarm: ' +
    'excellent to have, not a reason to leave the stove unattended. They only recognise patterns they know, so your ' +
    'university login pasted into a note is invisible to them.</p>'
  },

  {type:'callout', variant:'tip', title:'Where a secret should live instead',
   html:
    '<p>Three answers, in order of how likely you are to need them. <strong>An environment variable on your own ' +
    'machine</strong> — the code reads it at run time and the value never enters a file. <strong>A ' +
    '<code>.env</code> file that is listed in <code>.gitignore</code></strong> — convenient, local, never ' +
    'committed. <strong>Settings → Secrets and variables → Actions</strong> — encrypted storage GitHub can hand to ' +
    'an automated job, which is the only one of the three that lives on GitHub at all.</p>' +
    '<p>That last one is worth understanding rather than memorising: values you put there are write-only. You can ' +
    'replace one, you cannot read it back, and it does not appear in logs. It exists for automation, not for your ' +
    'own files to read.</p>'
  },

  /* ==================== SCREEN 2 — THE DANGER ZONE ==================== */
  {type:'prose', title:'The Danger Zone, and the switch itself',
   html:
    '<p>The bottom of Settings → General is a red-bordered box containing every action that cannot be quietly ' +
    'undone. It is at the bottom, it is red, and two of its four buttons make you type the repository’s full name ' +
    'before they will do anything.</p>' +
    '<p>That confirmation step is not GitHub being awkward. Typing <code>jordan-lee/trading-journal-practice</code> ' +
    'takes about four seconds, and four seconds is roughly the amount of deliberate attention needed to stop a ' +
    'muscle-memory click. The friction <em>is</em> the feature.</p>' +
    '<p>Walk it through below. Clicking <strong>Change visibility</strong> opens the real flow, and the confirm ' +
    'button actually flips the repo — safely, in the replica.</p>'
  },

  {type:'screen',
   id:'danger-zone',
   label:'Settings → General → Danger Zone — changing visibility for real',
   url:'github.com/jordan-lee/trading-journal-practice/settings',
   initial:'danger',
   inertNote:'Inert here. The live path is: Change visibility → I want to make this repository public → the red confirm button.',

   views:{

    danger:{ url:'github.com/jordan-lee/trading-journal-practice/settings', html:
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
        '<span class="gh-badge">Private</span></div></div></div>' +
      '<div class="gh-page"><div class="gh-settings">' +
        '<div class="gh-settings__nav">' +
          '<span class="gh-settings__navitem is-on"><svg class="octicon octicon--sm"><use href="#oct-gear"/></svg>General</span>' +
          '<span class="gh-settings__navsec">Access</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-people"/></svg>Collaborators</span>' +
          '<span class="gh-settings__navsec">Code and automation</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-git-branch"/></svg>Branches</span>' +
          '<span class="gh-settings__navitem"><svg class="octicon octicon--sm"><use href="#oct-book"/></svg>Pages</span>' +
        '</div>' +
        '<div>' +
          '<span class="gh-muted" style="font-size:12px">Settings → General, scrolled to the bottom</span>' +
          '<div class="gh-danger" data-h="dangerbox">' +
            '<div class="gh-danger__hd" data-h="dangerhd"><svg class="octicon octicon--sm"><use href="#oct-alert"/></svg> Danger Zone</div>' +
            '<div class="gh-danger__row" data-h="row-visibility">' +
              '<span><span class="gh-danger__ttl" style="display:block">Change repository visibility</span>' +
              '<span class="gh-danger__sub" style="display:block">This repository is currently private.</span></span>' +
              '<span class="gh-btn gh-btn--danger" data-h="btn-visibility">Change visibility</span>' +
            '</div>' +
            '<div class="gh-danger__row" data-h="row-transfer">' +
              '<span><span class="gh-danger__ttl" style="display:block">Transfer ownership</span>' +
              '<span class="gh-danger__sub" style="display:block">Transfer this repository to another user or to an organization.</span></span>' +
              '<span class="gh-btn gh-btn--danger">Transfer</span>' +
            '</div>' +
            '<div class="gh-danger__row" data-h="row-archive">' +
              '<span><span class="gh-danger__ttl" style="display:block">Archive this repository</span>' +
              '<span class="gh-danger__sub" style="display:block">Mark this repository as read-only. It stays visible, nothing can change.</span></span>' +
              '<span class="gh-btn gh-btn--danger">Archive this repository</span>' +
            '</div>' +
            '<div class="gh-danger__row" data-h="row-delete">' +
              '<span><span class="gh-danger__ttl" style="display:block">Delete this repository</span>' +
              '<span class="gh-danger__sub" style="display:block">Deleting cannot be undone. Please be certain.</span></span>' +
              '<span class="gh-btn gh-btn--danger">Delete this repository</span>' +
            '</div>' +
          '</div>' +
          '<div id="vis-dialog"></div>' +
        '</div>' +
      '</div></div>'
    },

    publicview:{ url:'github.com/jordan-lee/trading-journal-practice', html:
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
        '<span class="gh-badge" data-h="publicbadge">Public</span></div>' +
        '<div class="gh-repohead__actions">' +
          '<span class="gh-btn" data-h="back-danger"><svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the Danger Zone</span>' +
        '</div></div></div>' +
      '<div class="gh-page">' +
        '<div class="gh-flash gh-flash--success" style="margin-bottom:16px"><svg class="octicon"><use href="#oct-check-circle"/></svg>' +
          '<span>Repository visibility changed to <b>public</b>.</span></div>' +
        '<div class="gh-flash gh-flash--warn" data-h="nowpublic" style="margin-bottom:20px"><svg class="octicon"><use href="#oct-alert"/></svg>' +
          '<span>All five commits, both files, every commit message and the email address attached to each commit ' +
          'are now readable by anyone on the internet, signed in or not — and search engines will index this page.</span></div>' +
        '<div class="gh-layout"><div>' +
          '<div class="gh-filebox">' +
            '<div class="gh-filebox__head">' +
              '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
              '<span class="gh-commitauthor">jordan-lee</span>' +
              '<span class="gh-commitmsg">Update journal\\week6.md</span>' +
              '<span class="gh-commitmeta"><span class="gh-sha">109d091</span><span>·</span><span>29 minutes ago</span>' +
                '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>5</b>&nbsp;Commits</span></span>' +
            '</div>' +
            '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
              '<span class="gh-filerow__name">README.md</span>' +
              '<span class="gh-filerow__msg">Fix formatting in README for degree and trading alias</span>' +
              '<span class="gh-filerow__time">2 hours ago</span></div>' +
            '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
              '<span class="gh-filerow__name">journal\\week6.md</span>' +
              '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
              '<span class="gh-filerow__time">29 minutes ago</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="gh-side">' +
          '<div class="gh-sidecard" data-h="licencecard">' +
            '<div class="gh-sidecard__hd"><h2>About</h2></div>' +
            '<p class="gh-sidecard__empty">No description, website, or topics provided.</p>' +
            '<div class="gh-metalist">' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-book"/></svg>Readme</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-alert"/></svg>No licence</span>' +
              '<span class="gh-metarow"><svg class="octicon"><use href="#oct-star"/></svg><b>0</b>&nbsp;stars</span>' +
            '</div>' +
          '</div>' +
        '</div></div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="btn-visibility"]',
      replace:{target:'#vis-dialog', html:
        '<div style="border:1px solid var(--gh-border-default);border-radius:6px;margin-top:20px;overflow:hidden;background:var(--gh-canvas-overlay)">' +
          '<div style="padding:12px 16px;border-bottom:1px solid var(--gh-border-default);font-weight:600">Change repository visibility</div>' +
          '<div style="padding:16px">' +
            '<div class="gh-radiorow is-on"><span class="gh-radiorow__mark"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Make private</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Only you and people you explicitly share with can see this repository. This is the current setting.</span></span></div>' +
            '<div class="gh-radiorow"><span class="gh-radiorow__mark"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Make public</span>' +
              '<span class="gh-radiorow__sub" style="display:block">Anyone on the internet can see this repository. You choose who can commit.</span></span></div>' +
            '<div class="gh-flash gh-flash--warn" style="margin:14px 0"><svg class="octicon"><use href="#oct-alert"/></svg>' +
              '<span>Making this repository public will make all of its commits, issues and files visible to ' +
              'everyone. Check for secrets, credentials and anything you are still being marked on.</span></div>' +
            '<span class="gh-btn gh-btn--danger" data-h="vis-step2">I want to make this repository public</span>' +
          '</div>' +
        '</div>'},
      toast:'GitHub asks twice. This is the first ask.'},

     {on:'[data-h="vis-step2"]',
      replace:{target:'#vis-dialog', html:
        '<div style="border:1px solid var(--gh-danger-fg);border-radius:6px;margin-top:20px;overflow:hidden;background:var(--gh-canvas-overlay)">' +
          '<div style="padding:12px 16px;border-bottom:1px solid var(--gh-danger-fg);font-weight:600;color:var(--gh-danger-fg)">' +
            'Are you absolutely sure?</div>' +
          '<div style="padding:16px">' +
            '<p style="margin:0 0 12px;font-size:13px;color:var(--gh-fg-muted)">This repository will become public and ' +
            'appear in search results. Everything in its history becomes readable. This cannot be reversed for ' +
            'anything already copied.</p>' +
            '<div style="font-size:13px;margin-bottom:6px">To confirm, type ' +
              '<span class="gh-mono" style="color:var(--gh-fg-default)">jordan-lee/trading-journal-practice</span> below:</div>' +
            '<span class="gh-input" data-h="confirmbox" style="display:block;font-family:var(--font-mono);font-size:12px">' +
              'jordan-lee/trading-journal-practice</span>' +
            '<span class="gh-btn gh-btn--danger gh-btn--block" style="margin-top:12px" data-h="vis-confirm">' +
              'I understand, change repository visibility</span>' +
          '</div>' +
        '</div>'},
      toast:'Now type the full name. Four seconds of friction, on purpose.'},

     {on:'[data-h="vis-confirm"]', view:'publicview',
      explain:{title:'That repository is now on the public internet',
       html:'<p>The badge in the header changed from Private to Public, and that single word changed the audience for ' +
            'five commits, two files, every commit message, and the email address recorded against each commit.</p>' +
            '<p>Read what is now visible to a stranger, and notice how little of it you would have chosen to show: a ' +
            'README that still says <em>e.g. IronCondor</em>, a file called <code>journal\\week6.md</code>, a commit ' +
            'called “Update journal\\week6.md”, an About box saying no description, and — in the sidebar — ' +
            '<strong>no licence</strong>, which legally means nobody may reuse any of it.</p>' +
            '<p>Nothing here is dangerous. There are no keys in this repo. But this is exactly the state most people ' +
            'publish in, and it is the argument for doing the tidy-up <em>before</em> you flip the switch rather ' +
            'than after.</p>' +
            '<p>Press <strong>Reset</strong> above the frame to put it back to Private.</p>'}},

     {on:'[data-h="back-danger"]', view:'danger'},
     {on:'[data-h="row-transfer"]', toast:'Transfer hands the repo to another account. You lose it — and on a coursework repo you almost never want this.'},
     {on:'[data-h="row-archive"]', toast:'Archive makes a repo read-only but still visible. It is the honest way to say “finished, not abandoned”.'},
     {on:'[data-h="row-delete"]', toast:'Delete is permanent. Not a recycle bin, not a 30-day window. Gone.'}
   ],

   hotspots:[

    {sel:'[data-h="dangerhd"]', place:'right', title:'Why there is a Danger Zone at all',
     what:'<p>A red-bordered box at the bottom of the settings page holding every action that is irreversible or changes who can see your work.</p>',
     why:'<p>Destructive actions sitting among ordinary ones get clicked by accident. Putting them in a visually distinct box, at the far end of a long page, means you can only reach them on purpose.</p>',
     how:'<p>Scroll to the bottom of Settings → General. Nothing in here happens on a single click; every button opens a confirmation of some kind.</p>',
     fail:'<p>Confidently clicking through the confirmations because you assume there is an undo. For Delete there is not — no recycle bin, no thirty-day window.</p>',
     when:'<p>Twice, ever, for a repo like this: when you change its visibility, and possibly when you archive it at the end of the year.</p>'},

    {sel:'[data-h="row-visibility"]', place:'left', title:'Change repository visibility — the switch itself',
     what:'<p>The control that moves this repo between Private and Public. One word, and the audience goes from one person to everyone.</p>',
     why:'<p>GitHub began as a place to publish code openly; private repos were added for work that is not ready. Both are legitimate, so the choice had to be reversible — and it is, in the sense that the setting flips, not in the sense that publication can be recalled.</p>',
     how:'<p>Click it (it works). GitHub asks twice: first pick Public, then confirm by typing <code>jordan-lee/trading-journal-practice</code> in full. Walk through it and watch the badge in the header change.</p>',
     fail:'<p>Flipping it to check what it looks like, then flipping back. In between, anyone — including automated scrapers — could have taken a copy, and nothing you do afterwards reaches them.</p>',
     when:'<p>Once, after this unit is marked, and only after you have fixed the README, renamed the backslash file, added a description, and searched the repo for anything that looks like a key.</p>',
     note:'<p>The typing step is why GitHub asks for the <em>full</em> <code>owner/repo</code> name. It is long enough that you cannot do it absent-mindedly, which is the entire design goal.</p>'},

    {sel:'[data-h="row-transfer"]', place:'left', title:'Transfer ownership',
     what:'<p>Hands the repository to another account or organization. The repo moves, the history moves, and you stop owning it.</p>',
     why:'<p>Projects outgrow the person who started them, and personal repos need a route into a team account without losing their history or their issues.</p>',
     how:'<p>Type the destination account, confirm with the repo name. GitHub redirects the old URL, and you keep access only if the new owner grants it.</p>',
     fail:'<p>Transferring instead of adding a collaborator. You do not need to give a group partner your repo — you need to give them Write access. Transfer is not a sharing mechanism.</p>',
     when:'<p>Realistically never at university. It exists so you recognise it and do not click it while looking for the visibility switch above it.</p>'},

    {sel:'[data-h="row-archive"]', place:'left', title:'Archive this repository',
     what:'<p>Freezes a repo as read-only: still visible, still cloneable, but nothing can be committed, and no issue or pull request can be opened.</p>',
     why:'<p>An abandoned project and a finished project look identical from outside, and visitors waste time filing issues nobody will read. Archiving is a way to say “complete, not maintained” without deleting anything.</p>',
     how:'<p>Archive from here; a banner appears at the top of the repo saying it is archived. You can unarchive later — this one genuinely is reversible.</p>',
     fail:'<p>Archiving a repo you are still being marked on. Read-only means read-only: you would have to unarchive before you could fix a single typo.</p>',
     when:'<p>End of the year, on <code>trading-journal-practice</code>. It keeps the work on your profile as evidence while making it clear the unit is over.</p>'},

    {sel:'[data-h="row-delete"]', place:'left', title:'Delete this repository',
     what:'<p>Permanently removes the repository, its files, its entire history, its issues and its pull requests.</p>',
     why:'<p>Sometimes a repo really was a mistake — created twice, created with the wrong name, created public when it should have been private. Deletion has to exist for that.</p>',
     how:'<p>Confirm by typing the full <code>owner/repo</code> name. GitHub support can sometimes restore a repository within about ninety days, but only for the account owner and never reliably. Plan as if it cannot.</p>',
     fail:'<p>Deleting a repo to “clean up your profile” and taking a year of contribution history with it. Archive does the same job visually and keeps everything.</p>',
     when:'<p>The day after you create <code>trading-journal-practice-2</code> by mistake. Almost never otherwise — and never as a fix for something embarrassing in your history, because Archive is the honest version of that.</p>'},

    {sel:'[data-h="publicbadge"]', view:'publicview', place:'right', title:'The badge now says Public',
     what:'<p>The same pill in the same place, one word different, and the whole meaning of the page has changed.</p>',
     why:'<p>GitHub keeps visibility in the header rather than hiding it in settings precisely so that this moment is impossible to miss — you cannot open the repo without seeing which mode it is in.</p>',
     how:'<p>Check it every time you are about to commit something you have not thought about. Two seconds, top of every page.</p>',
     fail:'<p>The subtle version: you flip a repo public, forget, and six months later commit a config file with a database URL in it into what you still think of as your private notes repo.</p>',
     when:'<p>Right now, mentally. When you flip this for real, go and look at the repo while signed out — a private browser window is the only reliable way to see what a stranger sees.</p>'},

    {sel:'[data-h="licencecard"]', view:'publicview', place:'left', title:'“No licence” — and why that is not the same as free to use',
     what:'<p>The About sidebar reports the repository’s licence. Yours has none, which under copyright law means all rights reserved.</p>',
     why:'<p>Copyright is automatic. Publishing something does not grant anyone permission to use it, so open-source projects attach an explicit licence saying what people may do. Without one, “public” means readable and nothing else.</p>',
     how:'<p>Add file → Create new file → name it <code>LICENSE</code> → GitHub offers a licence picker. <strong>MIT</strong> is the usual choice: do anything, keep the notice, no warranty. <strong>Apache 2.0</strong> is MIT plus explicit patent terms. <strong>GPL</strong> requires anything built on it to be open too.</p>',
     fail:'<p>Assuming public GitHub code is yours to reuse. A repo with no licence file is legally off-limits, however inviting it looks — and that includes other students copying yours.</p>',
     when:'<p>Whenever you publish something you would be pleased for someone to build on. For a marked assignment, leaving it unlicensed is the deliberate answer.</p>'}
   ]
  },

  /* ==================== ACCOUNT-LEVEL SETTINGS ==================== */
  {type:'prose', title:'The account settings that actually matter to you',
   html:
    '<p>Everything above was the repository’s settings. These are yours, and they live under your avatar in the top ' +
    'right — the second gear from Module 2. Four are worth ten minutes each.</p>' +
    '<p><strong>Two-factor authentication.</strong> A second proof of identity when you sign in, usually a six-digit ' +
    'code from an app on your phone. GitHub now requires it for accounts that contribute code, which sounds ' +
    'bureaucratic until you consider what an attacker with your account could do: publish a private repo, push a ' +
    'commit under your name, and delete the lot. Turn it on at <em>Settings → Password and authentication</em>, and ' +
    '<strong>save the recovery codes somewhere that is not your phone</strong>. The way people lose GitHub accounts ' +
    'permanently is losing the phone and never having saved those codes.</p>' +
    '<p><strong>Commit email privacy.</strong> Every commit records an email address, and on a public repo that ' +
    'address is visible to everyone. <em>Settings → Emails → Keep my email addresses private</em> gives you a ' +
    '<code>@users.noreply.github.com</code> address that GitHub uses instead. Tick it before your first public repo, ' +
    'not after — it does not rewrite commits you have already made.</p>' +
    '<p><strong>SSH keys and personal access tokens.</strong> You will meet these the first time you try to use Git ' +
    'from a terminal and it refuses your password. GitHub stopped accepting passwords for Git operations in 2021, ' +
    'because a password is one secret that unlocks everything and cannot be scoped. The replacements are ' +
    'per-machine or per-purpose: an <strong>SSH key</strong> is a pair of files, one on your laptop and one ' +
    'registered with GitHub, so that laptop is trusted and no other; a <strong>personal access token</strong> is a ' +
    'long generated string you use in place of a password, which you can limit to certain repos and certain actions ' +
    'and revoke on its own. Neither is something you need this semester — but knowing <em>why</em> the password ' +
    'stopped working saves you the twenty minutes everyone else loses to it. And a token is a secret, which puts it ' +
    'squarely under everything in the section above.</p>' +
    '<p><strong>Notifications.</strong> <em>Settings → Notifications</em> decides what reaches your email and what ' +
    'stays in the GitHub inbox. The useful configuration is: email for things where you are @mentioned or asked to ' +
    'review, inbox only for everything else. The failure mode is not missing a notification, it is getting so many ' +
    'that you stop reading any of them.</p>'
  },

  {type:'terms', title:'The words you now need',
   items:[
     {term:'Visibility', html:'Public or Private. Public means the entire internet with no login; Private means you plus anyone you explicitly add.'},
     {term:'Danger Zone', html:'The red box at the bottom of Settings → General: change visibility, transfer, archive, delete.'},
     {term:'Archive', html:'Freeze a repo as read-only while keeping it visible. Reversible — unlike deletion.'},
     {term:'Collaborator', html:'An account you have granted access to one specific repository, at one of five levels from Read to Admin.'},
     {term:'Branch protection', html:'Server-enforced rules on a branch — for example, refusing any commit that did not arrive through a pull request.'},
     {term:'Secret', html:'Anything that proves identity to a machine: API key, token, password, database URL, the contents of a <code>.env</code> file.'},
     {term:'.gitignore', html:'A file listing patterns Git should never track. Prevents accidents; does nothing about files already committed.'},
     {term:'Push protection', html:'GitHub blocking a push that contains a recognisable secret. A safety net over the habit, not a replacement for it.'},
     {term:'Two-factor authentication', html:'A second proof of identity at sign-in. Required by GitHub for contributors — and useless if you lose the recovery codes.'},
     {term:'Licence', html:'The file that grants other people permission to use your work. No licence file means all rights reserved.'}
   ]
  },

  {type:'callout', variant:'tip', title:'What to actually do about your repo, this week',
   html:
    '<p><strong>Leave it Private until the unit is marked.</strong> That is the decision, and it needs no further ' +
    'thought until results come out.</p>' +
    '<p><strong>Fill in the About box.</strong> Gear icon on the sidebar, one line — “the unit trading journal and ' +
    'desk profile” — plus two topics such as <code>finance</code> and <code>university</code>. Thirty seconds, and ' +
    'it stops the repo looking abandoned the moment it does become visible.</p>' +
    '<p><strong>Build the public thing that carries no risk.</strong> A profile README at ' +
    '<code>jordan-lee/jordan-lee</code> is a public portfolio page that reveals nothing you are ' +
    'being graded on. It is the highest-return fifteen minutes available to you right now.</p>' +
    '<p><strong>Then, after results:</strong> fix the README placeholders, rename <code>journal\\week6.md</code>, ' +
    'and flip visibility once — deliberately, having read what is in the history first.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Say precisely who can see <strong>trading-journal-practice</strong> today, and why a link you send a tutor returns a 404 rather than a permissions message',
     'Make the visibility decision on purpose — private while it is being marked, public once it is worth showing',
     'Change visibility through Settings → General → Danger Zone, and explain why GitHub makes you type the full repo name',
     'List what public actually exposes: every branch, every commit, every message, every issue, and your commit email unless you turn that off',
     'Explain why deleting a file does not remove it from history, and why going private again retracts nothing',
     'Handle a leaked key in the right order — rotate first, clean up second — and prevent the next one with <code>.gitignore</code>',
     'Add a collaborator at the smallest access level that does the job, and say what branch protection would stop them doing',
     'Turn on two-factor authentication and commit email privacy, and say why a password no longer works for Git',
     'Read the About sidebar’s licence line and know that “no licence” means nobody may legally reuse your work'
   ]
  }

  ]
});
