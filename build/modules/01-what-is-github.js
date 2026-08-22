/* ============================================================================
   MODULE 01 — "What Git and GitHub actually are"
   Owns: the mental model. Git vs GitHub, repo, commit, local vs remote,
   the change→commit→push loop, and the dashboard as the front door.
   Schema reference: build/modules/02-repo-anatomy.js
   ========================================================================== */

MODULES.push({
  id: 'what-is-github',
  num: 1,
  title: 'What Git and GitHub actually are',
  blurb: 'Two different things with confusingly similar names. Get this one distinction right and every button you have ever clicked without understanding suddenly has a reason.',
  goals: [
    'Explain the difference between Git and GitHub to a friend in about twenty seconds',
    'Say what a repository and a commit actually are, and why the history matters more than the files',
    'Describe the change → commit → push loop and know what each step moves, and where to',
    'Land on github.com and know what every part of the dashboard is for'
  ],
  sections: [

  /* ====================================================================
     1. START FROM THE PROBLEM
     ==================================================================== */
  {type:'prose', html:
    '<p class="tut-lead">Somewhere on your laptop there is a folder that looks like this: ' +
    '<code>essay.docx</code>, <code>essay_final.docx</code>, <code>essay_final_v2.docx</code>, ' +
    '<code>essay_FINAL_actually.docx</code>, <code>essay_FINAL_use_this_one.docx</code>. ' +
    'Everyone has that folder. It is not a personal failing — it is what happens when you try to solve a ' +
    'real problem with the only tool you had.</p>' +
    '<p>The problem is genuine. You changed something, it worked, and you wanted a way back to the version ' +
    'that worked in case the next change broke it. Saving over the top destroys the old version, so you ' +
    'invented a naming scheme instead. That naming scheme <em>is</em> version control. It is just version ' +
    'control done by hand, and it fails in four specific ways.</p>' +
    '<p>It cannot tell you <strong>what changed</strong> between v2 and FINAL — only that something did. ' +
    'It cannot tell you <strong>why</strong> you made the change, because a filename has no room for a ' +
    'reason. It cannot tell you <strong>when</strong>, beyond a modified date that a copy-paste silently ' +
    'destroys. And the moment a second person is involved, it collapses entirely: you both edit ' +
    '<code>FINAL</code>, you both email it back, and now there are two irreconcilable FINALs and no way to ' +
    'combine them except reading both and retyping.</p>' +
    '<p>Git is what that folder looks like when the problem is solved properly rather than by hand.</p>'
  },

  {type:'compare', title:'The same job, done two ways',
   left:{title:'Versioning by filename',
     html:'<p>Six files in a folder. The old versions are real files taking up real space, and you can never ' +
          'safely delete any of them because you are not certain which is which.</p>' +
          '<p>There is no record of what you changed or why. To find out, you open two documents side by side ' +
          'and read.</p>' +
          '<p>Two people working at once produces two conflicting files and a manual merge done by eye. ' +
          'Something always gets lost.</p>' +
          '<p>Your folder shows the mess. Someone opening it has to guess which file is the real one.</p>'},
   right:{title:'Versioning with Git',
     html:'<p>One file: <code>essay.docx</code>. Every previous version is stored invisibly beside it, ' +
          'compressed, and none of them clutter the folder.</p>' +
          '<p>Each saved version carries a message you wrote — “Rewrote the intro after the tutorial ' +
          'feedback” — plus your name and the exact time.</p>' +
          '<p>Two people can work at once, and Git combines both sets of changes line by line. Where it ' +
          'genuinely cannot decide, it stops and asks you rather than guessing.</p>' +
          '<p>Your folder shows only the current version. The history is one command or one click away when ' +
          'you want it, and invisible when you do not.</p>'}
  },

  /* ====================================================================
     2. THE DISTINCTION THAT MATTERS MOST
     ==================================================================== */
  {type:'prose', title:'Git is a program. GitHub is a website. They are not the same thing.',
   html:
    '<p>This is the single most important sentence in this tutorial, so it gets its own section.</p>' +
    '<p><strong>Git</strong> is a piece of software that runs on a computer. You install it, you point it ' +
    'at a folder, and from then on it watches that folder and records every version of every file in it. ' +
    'It has no website, no login, no account, no company. It works on a plane with the wifi off. It was ' +
    'written in 2005 and it would still work if every website on earth went dark tomorrow.</p>' +
    '<p><strong>GitHub</strong> is a company that runs a website. That website stores copies of ' +
    'Git-watched folders on its servers so that they are backed up, reachable from any machine, and ' +
    'shareable with other people. On top of that storage it built the things Git itself has no opinion ' +
    'about: a comment box, a to-do list, a review workflow, a profile page, automated job runners.</p>' +
    '<p>The relationship is the same as the one between <em>email</em> and <em>Gmail</em>. Email is a ' +
    'protocol; Gmail is one company’s website for using it. You can use email without Gmail. Gmail without ' +
    'email would be nothing. Git without GitHub is completely normal and extremely common. GitHub without ' +
    'Git does not exist — the whole site is a wrapper around it.</p>' +
    '<p>Why does this matter to you specifically? Because you have been clicking GitHub buttons and ' +
    'wondering why they behave oddly. Almost every one of those oddities is a Git rule leaking through the ' +
    'website. GitHub will not let you make an empty folder — that is Git’s rule, not GitHub’s. GitHub makes ' +
    'you type a message before you can save — Git’s rule. GitHub shows you a 7-character code called a SHA ' +
    'next to everything — that is a Git object ID. Once you know which layer a rule comes from, the ' +
    'interface stops feeling arbitrary.</p>'
  },

  {type:'callout', variant:'warn', title:'The twenty-second version, for when someone asks you',
   html:
    '<p>“Git is a program that keeps a complete history of every change made to a folder on your computer. ' +
    'GitHub is a website that hosts a copy of that folder online so it is backed up and other people can ' +
    'see it, plus a pile of collaboration tools built on top.”</p>' +
    '<p>If you can say that without reading it, module 1 has done its job. Everything else in this ' +
    'tutorial is detail hanging off that sentence.</p>'
  },

  /* ====================================================================
     3. THE TWO-COPIES DIAGRAM  (html escape hatch — inline SVG)
     ==================================================================== */
  {type:'html', html:
    '<h2>Where your work actually lives</h2>' +
    '<p>There are two copies of a Git project and it is worth seeing them drawn. The one on your machine ' +
    'is the <strong>local</strong> copy. The one on github.com is the <strong>remote</strong>. Neither is ' +
    'more real than the other — they are complete, independent copies that you deliberately sync.</p>' +
    '<svg viewBox="0 0 720 330" width="100%" role="img" ' +
      'aria-label="Diagram: your laptop on the left holds a working folder and a local repository; GitHub on the right holds the remote repository. Commit moves work into the local repository, push sends it to GitHub, pull brings it back." ' +
      'style="max-width:100%;height:auto;margin:6px 0 18px;font-family:var(--font-sans)">' +

      /* --- LEFT: laptop --- */
      '<rect x="4" y="34" width="290" height="252" rx="12" fill="#171a24" stroke="#2e3446" stroke-width="1.5"/>' +
      '<text x="20" y="24" fill="#e2e6f2" font-size="15" font-weight="700">Your laptop</text>' +
      '<text x="20" y="300" fill="#7b839b" font-size="12">No internet needed for anything in this box</text>' +

      '<rect x="26" y="58" width="246" height="72" rx="8" fill="#1b1f2b" stroke="#465071"/>' +
      '<text x="42" y="84" fill="#e2e6f2" font-size="13.5" font-weight="600">The working folder</text>' +
      '<text x="42" y="104" fill="#a0a8c0" font-size="12.5">README.md, journal files — the files you</text>' +
      '<text x="42" y="120" fill="#a0a8c0" font-size="12.5">actually open, edit and look at.</text>' +

      '<path d="M149 132 L149 176" stroke="#f2b544" stroke-width="2" fill="none" marker-end="url(#m1arrow-amber)"/>' +
      '<text x="160" y="160" fill="#f2b544" font-size="13" font-weight="700">commit</text>' +

      '<rect x="26" y="182" width="246" height="82" rx="8" fill="#1b1f2b" stroke="#465071"/>' +
      '<text x="42" y="208" fill="#e2e6f2" font-size="13.5" font-weight="600">The local repository (.git)</text>' +
      '<text x="42" y="228" fill="#a0a8c0" font-size="12.5">A hidden folder holding every version</text>' +
      '<text x="42" y="244" fill="#a0a8c0" font-size="12.5">that has ever been committed. Delete it</text>' +
      '<text x="42" y="260" fill="#a0a8c0" font-size="12.5">and the history is gone; the files stay.</text>' +

      /* --- RIGHT: GitHub --- */
      '<rect x="426" y="34" width="290" height="252" rx="12" fill="#0d1117" stroke="#30363d" stroke-width="1.5"/>' +
      '<text x="442" y="24" fill="#e2e6f2" font-size="15" font-weight="700">GitHub — github.com</text>' +
      '<text x="442" y="300" fill="#7b839b" font-size="12">Someone else’s computer, on the internet</text>' +

      '<rect x="448" y="92" width="246" height="112" rx="8" fill="#161b22" stroke="#30363d"/>' +
      '<text x="464" y="118" fill="#e6edf3" font-size="13.5" font-weight="600">The remote repository</text>' +
      '<text x="464" y="138" fill="#8b949e" font-size="12.5">jordan-lee /</text>' +
      '<text x="464" y="154" fill="#8b949e" font-size="12.5">trading-journal-practice</text>' +
      '<text x="464" y="176" fill="#8b949e" font-size="12.5">Same files, same history, on a</text>' +
      '<text x="464" y="192" fill="#8b949e" font-size="12.5">server, with a web page wrapped</text>' +

      /* --- ARROWS BETWEEN --- */
      '<path d="M280 158 L440 118" stroke="#f2b544" stroke-width="2" fill="none" marker-end="url(#m1arrow-amber)"/>' +
      '<text x="300" y="112" fill="#f2b544" font-size="13" font-weight="700">push</text>' +
      '<text x="300" y="128" fill="#7b839b" font-size="11.5">local → GitHub</text>' +

      '<path d="M440 214 L280 246" stroke="#4dd4c4" stroke-width="2" fill="none" marker-end="url(#m1arrow-teal)"/>' +
      '<text x="326" y="268" fill="#4dd4c4" font-size="13" font-weight="700">pull</text>' +
      '<text x="326" y="284" fill="#7b839b" font-size="11.5">GitHub → local</text>' +

      '<defs>' +
        '<marker id="m1arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
          '<path d="M0 0 L10 5 L0 10 z" fill="#f2b544"/></marker>' +
        '<marker id="m1arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
          '<path d="M0 0 L10 5 L0 10 z" fill="#4dd4c4"/></marker>' +
      '</defs>' +
    '</svg>' +
    '<p>Read the amber path top to bottom and then left to right: you edit files, you <strong>commit</strong> ' +
    'to record that edit in your local history, and you <strong>push</strong> to send the new commits up to ' +
    'GitHub. The teal arrow is the reverse — <strong>pull</strong> brings down commits that exist on GitHub ' +
    'but not on your machine, which is how you pick up a change made from another computer or by another ' +
    'person.</p>' +
    '<p>“In sync” means both boxes contain exactly the same list of commits. Out of sync is not an error, ' +
    'it is the normal state between doing work and sending it. Git tracks the gap precisely and will tell ' +
    'you things like “2 commits ahead, 1 behind”, which reads as: I have two you have not seen, you have ' +
    'one I have not seen.</p>'
  },

  {type:'callout', variant:'tip', title:'Your repo currently has only one of those two boxes',
   html:
    '<p>You created <code>trading-journal-practice</code> in the browser, and every change since has been made by ' +
    'clicking the pencil icon on github.com. So the right-hand box exists and the left-hand box does not. ' +
    'There is no copy on your laptop at all.</p>' +
    '<p>That is a perfectly legitimate way to use GitHub for a two-file coursework repo, and this whole ' +
    'tutorial teaches the browser workflow because that is the one you are actually using. When you edit ' +
    'in the browser, GitHub commits <em>on its own server</em> — the commit and the push happen in the same ' +
    'instant, which is exactly why the two steps have never felt like two steps to you.</p>' +
    '<p>The moment you download the repo with <strong>Code → Download ZIP</strong> or run ' +
    '<code>git clone</code>, the left box appears and the two steps separate. Knowing they were always two ' +
    'steps is what stops that being confusing when it happens.</p>'
  },

  /* ====================================================================
     4. REPOSITORY AND COMMIT
     ==================================================================== */
  {type:'prose', title:'A repository is a folder plus its memory',
   html:
    '<p>“Repository” is a heavy word for something ordinary. Take a normal folder, tell Git to watch it, and ' +
    'it becomes a repository — “repo” for short. Nothing about your files changes. What gets added is a ' +
    'hidden sub-folder called <code>.git</code> that accumulates every version of every file you ever ' +
    'commit.</p>' +
    '<p>“Tracked” is the word for a file Git is paying attention to. A file sitting in the folder that you ' +
    'have never committed is <em>untracked</em>: Git can see it but is not recording its history, and if you ' +
    'delete it, it is gone the way any file is gone. This distinction matters later, because it is possible ' +
    'to work for an hour on a file Git was never watching.</p>' +
    '<p>Here is the part that takes a while to sink in: <strong>the history is the valuable part, not the ' +
    'files</strong>. Your current files can be reconstructed from the history at any time. The history ' +
    'cannot be reconstructed from the current files. That asymmetry is why a repo is worth more than a ' +
    'Dropbox folder containing the same documents, and it is why deleting <code>.git</code> is the one ' +
    'genuinely destructive thing you can do to a project.</p>'
  },

  {type:'prose', title:'A commit is a save point with a note attached',
   html:
    '<p>You changed three files, it worked, and now you want a way back to exactly this if you break ' +
    'something tomorrow. That is a commit.</p>' +
    '<p>Compare the two actions honestly:</p>' +
    '<ul>' +
      '<li><strong>Cmd+S / Ctrl+S overwrites.</strong> The previous contents of the file cease to exist. ' +
      'The file has one state: now.</li>' +
      '<li><strong>Committing accumulates.</strong> The previous contents stay exactly where they were, and ' +
      'a new version is added on top. The project has as many states as you have commits, and you can stand ' +
      'in any of them.</li>' +
    '</ul>' +
    '<p>Every commit carries five things, and they are always the same five: <strong>who</strong> made it, ' +
    '<strong>when</strong>, a <strong>message</strong> in their own words, the <strong>exact content</strong> ' +
    'of every file at that instant, and a <strong>unique ID</strong> — the 40-character SHA you see ' +
    'shortened to seven, like <code>109d091</code>.</p>' +
    '<p>Commits are also chained. Each one records which commit came immediately before it, so the history ' +
    'is not a pile of snapshots but an ordered line you can walk backwards. That chain is why Git can answer ' +
    '“what changed between Tuesday and now” — it knows the route between the two points.</p>' +
    '<p>Your repo has five commits. That is five points in time you can return to, permanently, without ' +
    'having kept a single <code>_v2</code> file.</p>'
  },

  {type:'callout', variant:'info', title:'The finance version: a commit history is a trade blotter',
   html:
    '<p>A blotter is append-only. You do not go back and quietly amend yesterday’s fill because today’s ' +
    'number would look better — you write a new line. Every line is timestamped, attributed to a person, ' +
    'and carries a short note about what was done. The value of the whole document comes from the fact that ' +
    'nothing in it can be silently rewritten.</p>' +
    '<p>A commit history is built on exactly that principle, for exactly that reason. New work is a new ' +
    'entry; old entries stay. Author, timestamp, note, reference number — the same four columns. When ' +
    'something is wrong, you correct it forwards with another commit, and the record shows both the mistake ' +
    'and the correction.</p>' +
    '<p>The audit-trail framing also tells you what a <em>good</em> commit is. A blotter line reading ' +
    '“did a trade” is useless. So is a commit message reading “Update README.md”. Both need to say what and ' +
    'why, because both exist to be read by someone who was not there.</p>'
  },

  /* ====================================================================
     5. THE LOOP
     ==================================================================== */
  {type:'prose', title:'The loop you will repeat for the rest of your life',
   html:
    '<p>Almost everything anyone does with Git is one of two short sequences. Learn these two and you have ' +
    'the shape of the whole tool.</p>'
  },

  {type:'steps', title:'Working alone: change → commit → push',
   items:[
     {label:'Change', html:'<p>Edit a file. Add a file. Delete one. Nothing is recorded yet — at this point ' +
       'your change exists only as the current contents of the file, exactly as it would in Word. Walk away ' +
       'now and it is just an edit sitting on a disk.</p>'},
     {label:'Commit', html:'<p>Tell Git “record this state, and here is what I did and why”. Your local ' +
       'history gains one permanent entry. This is the step that makes the change survivable — from here on ' +
       'you can always get back to it. Note that committing moves nothing across the internet; a commit is ' +
       'a purely local act.</p>'},
     {label:'Push', html:'<p>Send any commits your local copy has that GitHub does not. Now the change is ' +
       'backed up, visible on the website, and available to anyone with access. Push moves commits, not ' +
       'files — if you never committed it, pushing will not send it.</p>'}
   ]
  },

  {type:'steps', title:'Working with anyone, or on two machines: pull → change → commit → push',
   items:[
     {label:'Pull', html:'<p>Before you start, bring down whatever landed on GitHub since you last looked. ' +
       'On a group project someone has probably changed something. Pulling first means you build on top of ' +
       'their work instead of beside it.</p>'},
     {label:'Change → Commit', html:'<p>Identical to before. Do your work; record it.</p>'},
     {label:'Push', html:'<p>Send it up. If someone else pushed while you were working, Git refuses the ' +
       'push rather than overwriting them, and tells you to pull first. That refusal is the single most ' +
       'valuable behaviour in Git and it is why a shared repo does not end in two conflicting FINALs.</p>'}
   ]
  },

  {type:'callout', variant:'warn', title:'Where beginners actually lose work',
   html:
    '<p>Not by using the wrong command. By stopping halfway through the loop.</p>' +
    '<p><strong>Changed but never committed.</strong> The edit exists nowhere but that one file on that one ' +
    'machine. Close the browser tab mid-edit on github.com and it is gone with no warning and no undo.</p>' +
    '<p><strong>Committed but never pushed.</strong> Your history is safe on your laptop and completely ' +
    'invisible on GitHub. This is the classic “I definitely submitted it” disaster — the work genuinely ' +
    'exists, and the marker genuinely cannot see it.</p>' +
    '<p>The habit that prevents both: after any piece of work you would be annoyed to redo, commit it and ' +
    'push it. Not at the end of the day. At the end of the thought.</p>'
  },

  /* ====================================================================
     6. THE DASHBOARD SCREEN
     ==================================================================== */
  {type:'prose', title:'The front door: what you see when you log in',
   html:
    '<p>Everything so far has been the model. Here is the actual page, rebuilt. This is github.com when you ' +
    'are signed in — your dashboard — and it is where every visit starts.</p>' +
    '<p>Click the numbered markers in any order, or press <strong>Walk me through it</strong> to be led ' +
    'through all eleven. The account menu under your avatar genuinely opens, and “Your repositories” inside ' +
    'it genuinely goes somewhere.</p>'
  },

  {type:'screen',
   id:'dashboard',
   label:'github.com — your dashboard, signed in as jordan-lee',
   url:'github.com',
   initial:'dash',
   inertNote:'That control is real on GitHub but inert in this lesson. The live parts here are the numbered markers, the “+” menu, your avatar menu and “Your repositories” inside it.',

   views:{

    /* ---------- THE DASHBOARD ---------- */
    dash:{ url:'github.com', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert aria-label="Menu"><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark" data-h="ghmark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox" data-h="topsearch"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type <span style="font-family:var(--font-mono)">/</span> to search</span>' +
          '<span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-topnav__actions">' +
          '<span class="gh-menuwrap">' +
            '<span class="gh-navbtn gh-navbtn--bordered" data-h="plusmenu"><svg class="octicon"><use href="#oct-plus"/></svg><svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
            '<div class="gh-menu gh-menu--right" id="plus-menu">' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-repo"/></svg>New repository</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-download"/></svg>Import repository</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-code"/></svg>New gist</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-organization"/></svg>New organization</div>' +
            '</div>' +
          '</span>' +
          '<span class="gh-navbtn" data-h="navissues" title="Issues"><svg class="octicon"><use href="#oct-issue-opened"/></svg></span>' +
          '<span class="gh-navbtn" data-h="navprs" title="Pull requests"><svg class="octicon"><use href="#oct-git-pull-request"/></svg></span>' +
          '<span class="gh-navbtn" data-h="navinbox" title="Inbox"><svg class="octicon"><use href="#oct-bell"/></svg><i class="gh-navbtn__dot"></i></span>' +
          '<span class="gh-menuwrap">' +
            '<span class="gh-avatar gh-avatar--32 gh-topnav__avatar" data-h="navavatar" data-user="jordan-lee"></span>' +
            '<div class="gh-menu gh-menu--right" id="acct-menu">' +
              '<div class="gh-menu__hd">Signed in as <b>jordan-lee</b></div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-people"/></svg>Your profile</div>' +
              '<div class="gh-menu__item" data-h="menu-yourrepos"><svg class="octicon"><use href="#oct-repo"/></svg>Your repositories</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-star"/></svg>Your stars</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-gear"/></svg>Settings</div>' +
              '<div class="gh-menu__item"><svg class="octicon"><use href="#oct-x"/></svg>Sign out</div>' +
            '</div>' +
          '</span>' +
        '</span>' +
      '</div>' +

      '<div class="gh-dash">' +

        /* ---- left rail ---- */
        '<div>' +
          '<div class="gh-dash__panel">' +
            '<div class="gh-dash__hd" data-h="toprepos-hd"><span>Top repositories</span>' +
              '<span style="margin-left:auto"><span class="gh-btn gh-btn--primary gh-btn--sm" data-h="newbtn">' +
                '<svg class="octicon octicon--sm"><use href="#oct-plus"/></svg>New</span></span></div>' +
            '<div class="gh-dash__search"><span class="gh-input gh-input--sm" style="display:block;color:var(--gh-fg-subtle)" data-h="findrepo">Find a repository…</span></div>' +
            '<div class="gh-toprepos">' +
              '<span class="gh-toprepo" data-h="repo-smartstudy"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="jordan-lee"></span><span>jordan-lee/study-planner</span></span>' +
              '<span class="gh-toprepo" data-h="repo-coursework"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="coursework"></span><span>coursework/48213097</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="jordan-lee"></span><span>jordan-lee/portfolio-site</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="jordan-lee"></span><span>jordan-lee/data-pipeline</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="coursework"></span><span>coursework/jordan-lee</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="jordan-lee"></span><span>jordan-lee/budget-tracker</span></span>' +
              '<span class="gh-toprepo"><span class="gh-avatar gh-avatar--sq gh-avatar--16" data-user="jordan-lee"></span><span>jordan-lee/budget-tracker-mobile</span></span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ---- centre feed ---- */
        '<div>' +
          '<div class="gh-dash__hd" data-h="homehd" style="padding-left:0;font-size:16px">Home</div>' +
          '<div class="gh-feeditem" data-h="feeditem1">' +
            '<div class="gh-feeditem__hd"><svg class="octicon"><use href="#oct-star"/></svg>' +
              '<span>Recommended for you <span class="gh-muted">· based on repositories you have starred</span></span></div>' +
            '<div class="gh-feeditem__bd">' +
              '<span class="gh-feedrepo" data-h="feedrepo1"><span class="gh-avatar gh-avatar--sq" data-user="ranaroussi"></span>ranaroussi/yfinance</span>' +
              '<p class="gh-feeditem__desc">Download market data from Yahoo! Finance’s API.</p>' +
              '<div class="gh-feeditem__meta"><span><span class="gh-langdot" style="background:#3572A5"></span>Python</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>18.2k</span>' +
                '<span>Updated 3 days ago</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="gh-feeditem">' +
            '<div class="gh-feeditem__hd"><svg class="octicon"><use href="#oct-graph"/></svg>' +
              '<span>Trending repository <span class="gh-muted">· in your network</span></span></div>' +
            '<div class="gh-feeditem__bd">' +
              '<span class="gh-feedrepo"><span class="gh-avatar gh-avatar--sq" data-user="stefan-jansen"></span>stefan-jansen/machine-learning-for-trading</span>' +
              '<p class="gh-feeditem__desc">Code and resources for a book on machine learning applied to trading strategies.</p>' +
              '<div class="gh-feeditem__meta"><span><span class="gh-langdot" style="background:#DA5B0B"></span>Jupyter Notebook</span>' +
                '<span><svg class="octicon octicon--sm"><use href="#oct-star"/></svg>14.6k</span>' +
                '<span>Updated 6 days ago</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* ---- right rail ---- */
        '<div class="gh-dash__right">' +
          '<div class="gh-dash__panel" style="padding:0 16px 12px" data-h="changelog">' +
            '<div class="gh-dash__hd" style="padding-left:0">Latest changes</div>' +
            '<div class="gh-changelog__item"><span class="gh-link">Repository rulesets now support push rules</span>' +
              '<span class="gh-changelog__date">Aug 6</span></div>' +
            '<div class="gh-changelog__item"><span class="gh-link">Markdown editor adds a live preview pane</span>' +
              '<span class="gh-changelog__date">Aug 4</span></div>' +
            '<div class="gh-changelog__item"><span class="gh-link">Actions runners are faster on private repos</span>' +
              '<span class="gh-changelog__date">Aug 1</span></div>' +
          '</div>' +
        '</div>' +

      '</div>'
    },

    /* ---------- YOUR REPOSITORIES ---------- */
    repos:{ url:'github.com/jordan-lee?tab=repositories', html:
      '<div class="gh-topnav">' +
        '<button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark" data-h="back-dash"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg>' +
          '<span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
      '</div>' +
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">' +
          '<h2 style="margin:0;font-size:20px;font-weight:600">Repositories owned by jordan-lee</h2>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-dash">' +
            '<svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the dashboard</span>' +
        '</div>' +
        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head"><span class="gh-muted">6 repositories · sorted by last updated</span></div>' +
          '<div class="gh-filerow" data-h="myrepo-finc"><svg class="octicon gh-filerow__icon"><use href="#oct-repo-locked"/></svg>' +
            '<span class="gh-filerow__name">trading-journal-practice</span><span class="gh-badge">Private</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated 29 minutes ago</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-repo"/></svg>' +
            '<span class="gh-filerow__name">study-planner</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated last week</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-repo-locked"/></svg>' +
            '<span class="gh-filerow__name">portfolio-site</span><span class="gh-badge">Private</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated 2 weeks ago</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-repo-locked"/></svg>' +
            '<span class="gh-filerow__name">data-pipeline</span><span class="gh-badge">Private</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated 3 weeks ago</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-repo"/></svg>' +
            '<span class="gh-filerow__name">budget-tracker</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated last month</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-repo"/></svg>' +
            '<span class="gh-filerow__name">budget-tracker-mobile</span>' +
            '<span class="gh-filerow__msg">No description provided</span>' +
            '<span class="gh-filerow__time">Updated last month</span></div>' +
        '</div>' +
      '</div>'
    }
   },

   /* ==================== INTERACTIONS ==================== */
   actions:[
     {on:'[data-h="plusmenu"]', toggle:{target:'#plus-menu', class:'is-open'}},
     {on:'[data-h="navavatar"]', toggle:{target:'#acct-menu', class:'is-open'}},
     {on:'[data-h="menu-yourrepos"]', view:'repos', explain:{title:'This is the list that never lies',
       html:'<p>The “Top repositories” rail is a shortlist. This page is the complete, definitive list of ' +
            'every repository your account owns — and there is <code>trading-journal-practice</code> at the top, ' +
            'because it is the one you touched most recently.</p>' +
            '<p>Two things worth noticing. The padlock icon and the <strong>Private</strong> badge appear on ' +
            'three of them, so you can see visibility at a glance without opening anything. And every row ' +
            'says “No description provided”, which is what a repo looks like when nobody has spent the ' +
            'thirty seconds to describe it. Module 3 fixes that for <code>trading-journal-practice</code>.</p>' +
            '<p>The URL is worth memorising: <code>github.com/<b>your-name</b>?tab=repositories</code>. It ' +
            'is the fastest route back to your own work from anywhere on the site.</p>'}},
     {on:'[data-h="back-dash"]', view:'dash'},
     {on:'[data-h="myrepo-finc"]', toast:'That opens the repo — which is exactly where Module 2 starts. Come back here first.'},
     {on:'[data-h="newbtn"]', toast:'“New” makes a brand-new repository. You already made <span style="font-family:var(--font-mono)">trading-journal-practice</span> this way.'},
     {on:'[data-h="repo-coursework"]', toast:'<span style="font-family:var(--font-mono)">coursework/48213097</span> is owned by <b>coursework</b>, not by you — it is a course account. You have access, you are not the owner.'},
     {on:'[data-h="topsearch"]', toast:'Search is Module 8. The keyboard shortcut is <span style="font-family:var(--font-mono)">/</span> from anywhere on the page.'}
   ],

   /* ==================== HOTSPOTS ==================== */
   hotspots:[

    {sel:'[data-h="ghmark"]', place:'bottom', title:'The GitHub mark — the home button',
     what:'<p>The cat-octopus logo in the top-left corner. On every page of the site it takes you back to this dashboard.</p>',
     why:'<p>GitHub is deep — repos inside accounts, files inside branches, comments inside pull requests. Somewhere in that depth you will get lost, and there has to be one thing on screen that always means “start again from the top”.</p>',
     how:'<p>Click it. If you are signed out it takes you to the marketing homepage instead, which is a quick way to check whether your session has expired.</p>',
     fail:'<p>People use the browser back button instead, twelve times, and end up somewhere they have already been. One click here beats twelve.</p>',
     when:'<p>Any moment you catch yourself thinking “how did I get here”. Also the fastest way to confirm you are logged in as the right account when you have two.</p>'},

    {sel:'[data-h="topsearch"]', place:'bottom', title:'The search box, and the “/” shortcut',
     what:'<p>One box that searches code, repositories, issues, pull requests, people and documentation. What it searches depends on where you are: inside a repo it narrows to that repo by default.</p>',
     why:'<p>There are hundreds of millions of repositories. Browsing is hopeless at that scale, so GitHub made search the fastest thing on the page and gave it a single-key shortcut.</p>',
     how:'<p>Click it, or press <code>/</code> from anywhere on the page. Type and hit Enter. Filters like <code>user:jordan-lee</code> narrow it to your own work.</p>',
     fail:'<p>Press <code>/</code> while your cursor is inside a text box and you will type a slash into your writing instead of opening search. Click on blank page background first.</p>',
     when:'<p>Six weeks from now when you need the R snippet you know you saw in someone’s repo and cannot remember whose.</p>'},

    {sel:'[data-h="plusmenu"]', place:'bottom', title:'The “+” menu — where new things get made',
     what:'<p>A four-item menu: New repository, Import repository, New gist, New organization. It opens — try it.</p>',
     why:'<p>Creating a repo used to require finding a button on your profile page. Putting it in the global bar means starting a new project is one click from anywhere on the site, which is the behaviour GitHub wants to encourage.</p>',
     how:'<p><strong>New repository</strong> → name it, choose Public or Private, tick “Add a README file”, press Create. That is the entire process, and it is how <code>trading-journal-practice</code> came into existence.</p>',
     fail:'<p>Making a second repo when you meant to add a file to an existing one. You end up with your work split across two places, both half-finished, and no memory of which is current.</p>',
     when:'<p>The next unit that asks for a GitHub link, or the first time you want somewhere to keep notes that is not a folder on one laptop.</p>',
     note:'<p>A <strong>gist</strong> is a single-file scrap with a URL — a snippet you want to send someone without making a whole repository for it. Genuinely useful; almost nobody discovers it.</p>'},

    {sel:'[data-h="navinbox"]', place:'bottom', title:'Notifications — the bell with the blue dot',
     what:'<p>Your GitHub inbox. The blue dot means something involving you has happened: a comment, a reply, a review request, a mention of your username.</p>',
     why:'<p>Conversation on GitHub happens inside issues and pull requests, which are scattered across repositories. Without one central inbox you would have to revisit every project you care about to check for replies.</p>',
     how:'<p>Click the bell. Items are grouped by repository; click one to jump to the exact comment, or tick it to mark it done and clear it out.</p>',
     fail:'<p>Ignore it for a month and it becomes a hundred unread items, at which point you stop opening it entirely and genuinely miss the message from your tutor.</p>',
     when:'<p>The first time a marker leaves a comment on your submitted repo, or the first time you post a question on someone else’s project and they answer.</p>'},

    {sel:'[data-h="navavatar"]', place:'left', title:'Your avatar — the “about me” menu',
     what:'<p>The menu for everything that belongs to <em>you</em> rather than to a project: your profile, your repositories, your stars, your account settings, sign out. It opens — click it.</p>',
     why:'<p>GitHub keeps two completely separate sets of settings: settings for a repository, and settings for a person. They cannot live in the same place, so there are two gear icons in two different menus.</p>',
     how:'<p>Click the avatar, then <strong>Your repositories</strong> — that one is wired up here and it goes somewhere useful. <strong>Your profile</strong> shows you what a stranger sees when they look you up.</p>',
     fail:'<p>Hunting in here for “make this repo public” and concluding GitHub has hidden it. That switch lives in the repository’s own Settings tab, not yours. Wrong gear, every time.</p>',
     when:'<p>Honestly, today: your public profile is the page a recruiter lands on if they search your name, and right now it is a blank grid with no pinned projects and no bio.</p>'},

    {sel:'[data-h="toprepos-hd"]', place:'bottom', title:'“Top repositories” — a shortlist, not the whole list',
     what:'<p>A quick-access rail of repositories you have touched recently or often. Yours shows seven, mixing repos you own with repos you merely have access to.</p>',
     why:'<p>Most people bounce between the same three or four projects. Putting those in the corner of the dashboard saves a search every single visit.</p>',
     how:'<p>Click any row to jump straight into that repository. The list re-sorts itself over time as what you work on changes, so it is not a stable ordering you can memorise.</p>',
     fail:'<p>Assuming this is every repo you have. It is not — it is a shortlist, and a repo missing from it has not been deleted. When you cannot see something here, go to the avatar menu → Your repositories, which is the complete list.</p>',
     when:'<p>Every time you sit down to work on one of your active projects. For anything older than a few weeks, use the full list instead.</p>',
     note:'<p>The green <strong>New</strong> button in this panel’s header makes a brand-new repository — the same action as the “+” menu, put where your eye already is. Learn the colour rule while you are here: <strong>green means the single most-encouraged action on the screen</strong>, and there is at most one per page. Green “Code” on a repo, green “New issue”, green “Commit changes”. Finding the green button is the fastest way to work out what a GitHub page wants you to do.</p>'},

    {sel:'[data-h="findrepo"]', place:'right', title:'The “Find a repository…” filter',
     what:'<p>A filter box that narrows the rail beneath it as you type. It matches on repository name only.</p>',
     why:'<p>Once your account has twenty-odd repos, a seven-row shortlist stops being enough and a full search is overkill. This is the middle option.</p>',
     how:'<p>Click it and type a fragment — <code>finc</code> is enough to surface <code>trading-journal-practice</code> even when it is not in the visible seven.</p>',
     fail:'<p>It only filters what your account can see, and only by name. Typing <code>trading</code> will not find a repo whose description mentions trading — descriptions are not searched here.</p>',
     when:'<p>Right now, if you want to reach your the unit repo in one keystroke instead of scrolling.</p>'},

    {sel:'[data-h="repo-smartstudy"]', place:'right', title:'A repository row — read it as owner/name',
     what:'<p>Every entry is written as <code>owner/repository</code>. This one is <code>jordan-lee</code> (the account) slash <code>study-planner</code> (the project).</p>',
     why:'<p>Repository names are not unique across GitHub — thousands of accounts have a repo called <code>portfolio</code>. The owner half is what makes the address unambiguous.</p>',
     how:'<p>Click a row to open that repo. Note the tiny square avatar on the left: it belongs to the <em>owner</em>, which is how you spot at a glance that <code>coursework/48213097</code> is not one of yours.</p>',
     fail:'<p>Sending a classmate “the trading-journal-practice repo”. There is no such thing without an owner, and even with one they cannot open yours, because it is Private.</p>',
     when:'<p>Every time you paste a GitHub link or quote a repo in a message. Owner plus name, or it is not an address.</p>'},

    {sel:'[data-h="homehd"]', place:'left', title:'The “Home” feed — GitHub’s suggestions',
     what:'<p>The middle column: activity from accounts you follow, plus repositories GitHub thinks you will like based on what you have starred and looked at.</p>',
     why:'<p>The best way to learn is reading other people’s work, and you cannot read what you never find. The feed exists to put unfamiliar projects in front of you.</p>',
     how:'<p>Scroll it. Star anything worth coming back to — starring both bookmarks it for you and teaches the feed what to show you next.</p>',
     fail:'<p>Treating it as important. Nothing in this column is about your work; it is recommendations. Beginners often land here, see nothing they recognise, and assume they are on the wrong page.</p>',
     when:'<p>Ten idle minutes when you want to see how someone else structured a finance project before you structure your own.</p>'},

    {sel:'[data-h="feedrepo1"]', place:'left', title:'What a recommended repository tells you',
     what:'<p>One card: the <code>owner/name</code>, a one-line description, the main programming language, the star count, and when it was last updated.</p>',
     why:'<p>Those five facts are enough to decide whether a project is worth ten minutes without opening it. GitHub surfaces exactly them, in exactly that order, everywhere it lists repositories.</p>',
     how:'<p>Read the update date first. “Updated 3 days ago” means alive; “Updated 4 years ago” means the code may not even run against current libraries any more.</p>',
     fail:'<p>Trusting the star count as a quality score. Stars measure popularity at some point in the past, and plenty of 20k-star projects have been abandoned since. Stars plus a recent update date is the signal; stars alone are not.</p>',
     when:'<p>The first time you go looking for a library to pull market data into Python rather than writing that plumbing yourself.</p>'},

    {sel:'[data-h="changelog"]', place:'left', title:'The changelog rail',
     what:'<p>GitHub’s own release notes — what the website itself shipped this week.</p>',
     why:'<p>GitHub changes its interface constantly, which is why a tutorial written two years ago describes buttons that have moved. This column is the company telling you what moved.</p>',
     how:'<p>Skim it when a button is not where you expected. There is a good chance the answer is here.</p>',
     fail:'<p>It is easy to mistake this for activity on your own projects, because it sits in the same visual language as the feed. Nothing in this column has anything to do with your repos.</p>',
     when:'<p>The day a screenshot in this tutorial no longer matches the real site. Check here before assuming you are on the wrong page.</p>'}
   ]
  },

  /* ====================================================================
     7. WHY ANY OF THIS EXISTS
     ==================================================================== */
  {type:'prose', title:'Why Git exists at all (two sentences of history, and they matter)',
   html:
    '<p>In 2005 the Linux operating system was being written by thousands of volunteers who had never met, ' +
    'and their process was: email your changes to a mailing list, where one exhausted maintainer read them ' +
    'and applied them by hand. It worked until it did not, and Linus Torvalds — who had started Linux — ' +
    'spent about two weeks writing a tool that could merge work from thousands of strangers without a ' +
    'central authority reading every line. That tool is Git.</p>' +
    '<p>Knowing that origin explains the parts of Git that otherwise look over-engineered. It is designed ' +
    'so that every person has a <strong>complete</strong> copy of the entire history, because in 2005 ' +
    'contributors were on dial-up and could not rely on a server being reachable. It is obsessive about ' +
    'never losing anything, because the alternative was a volunteer’s week of work vanishing. And it ' +
    'assumes conflict is normal rather than exceptional, because with thousands of contributors two people ' +
    'editing the same line is a Tuesday.</p>' +
    '<p>Then it escaped programming entirely, and the reason is boring: most valuable work is text that ' +
    'gets revised. Legislation is drafted on GitHub. Academic papers are written on it. Recipe collections, ' +
    'legal contract templates, government datasets, dictionaries, textbooks. Anything where “what changed, ' +
    'who changed it, and can we go back” is a real question turns out to be a thing Git handles better ' +
    'than a shared drive.</p>' +
    '<p>Which is also the honest answer to why your trading unit set this task. Nobody expects you to ' +
    'become a software engineer. They expect you to be able to keep an auditable record of your own work — ' +
    'and that skill outlives the unit.</p>'
  },

  {type:'prose', title:'What GitHub can do that has nothing to do with code',
   html:
    '<p>Everything below is a real, free feature of the account you already have. Module 10 goes through ' +
    'them properly; this is so you know they exist while you learn the basics.</p>' +
    '<ul>' +
      '<li><strong>Host a website.</strong> GitHub Pages turns a repo into a live public site at a real ' +
      'URL, free, with no server to rent. A personal page listing your projects is one afternoon of work.</li>' +
      '<li><strong>Track tasks.</strong> Issues are a to-do list that lives with the project instead of in ' +
      'an app you will abandon, with numbers, labels, assignees and a searchable history.</li>' +
      '<li><strong>Run jobs automatically.</strong> Actions runs work on GitHub’s computers on a schedule ' +
      'or whenever something changes — re-run a backtest every time the strategy file is edited, or fetch ' +
      'a price series every morning at nine.</li>' +
      '<li><strong>Be a portfolio.</strong> Your profile is a public page showing what you have built and ' +
      'how consistently. For anything quantitative, it is read more carefully than a CV bullet point.</li>' +
      '<li><strong>Collaborate on writing.</strong> Group reports, lecture notes, a shared glossary — ' +
      'anything in plain text gets the same line-by-line merging and the same permanent history as code.</li>' +
      '<li><strong>Store research and data.</strong> Datasets, spreadsheets, notebooks and the notes ' +
      'explaining them, versioned together, so “which version of the data produced this chart” has an ' +
      'answer.</li>' +
    '</ul>' +
    '<p>The common thread: none of these are separate products you sign up for. They are all just a ' +
    'repository, used differently.</p>'
  },

  /* ====================================================================
     8. VOCABULARY
     ==================================================================== */
  {type:'terms', title:'The thirteen words the rest of this tutorial assumes',
   items:[
     {term:'Repository (repo)', html:'One project: its files, plus the complete history of every committed change to those files. The unit everything on GitHub is built around.'},
     {term:'Commit', html:'One recorded save point. Carries an author, a timestamp, a message you wrote, the exact contents of every file at that moment, and a unique ID. Commits are added, never overwritten.'},
     {term:'Branch', html:'One parallel version of the project that you can change without affecting the others. A full working copy of everything, not a folder.'},
     {term:'main', html:'The name of the default branch — the official, current version of the project. Used to be called <code>master</code>; you will still see that on older repos.'},
     {term:'Remote', html:'A copy of the repository that lives somewhere other than your machine. Yours is on github.com and its nickname, by convention, is <code>origin</code>.'},
     {term:'Push', html:'Send commits from your copy up to the remote. Moves commits, not files — anything you did not commit does not travel.'},
     {term:'Pull', html:'Bring commits down from the remote into your copy, and update your files to match. The opposite direction to push.'},
     {term:'Clone', html:'Make the first local copy of a remote repository, history and all. You clone once; after that you pull.'},
     {term:'Merge', html:'Combine the changes from one branch into another. Git does it line by line and only asks you when two changes genuinely collide.'},
     {term:'Fork', html:'Your own copy of somebody else’s repository, under your account, that remembers where it came from so you can offer changes back.'},
     {term:'README', html:'A file named <code>README.md</code> that GitHub renders automatically on the repo’s front page. The project’s cover sheet. Module 3 rewrites yours.'},
     {term:'Markdown', html:'The plain-text formatting language READMEs are written in — <code>#</code> for a heading, <code>-</code> for a bullet, <code>**bold**</code>. The <code>.md</code> in <code>README.md</code>.'},
     {term:'SHA (hash)', html:'A commit’s 40-character fingerprint, shown shortened to seven: <code>109d091</code>. Generated from the content itself, so the same ID always means the same exact state. Not a sequence number — <code>109d091</code> is not “commit 109”.'}
   ]
  },

  {type:'callout', variant:'tip', title:'Do not try to memorise those',
   html:
    '<p>You will not retain thirteen definitions read once, and you do not need to. They are here so that ' +
    'when module 5 says “branch” you have somewhere to come back to.</p>' +
    '<p>The four that carry real weight — repository, commit, push, pull — get taught again properly with ' +
    'screens you can click, and they are the four that make everything else legible.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Explain the difference between <strong>Git</strong> (a program that records a folder’s history) and <strong>GitHub</strong> (a website that hosts those histories and adds collaboration)',
     'Say what a repository is, and why the history is worth more than the current files',
     'Describe a commit as a save point with an author, a timestamp, a message and a permanent ID — and say how it differs from Cmd+S',
     'Name the two copies (<strong>local</strong> and <strong>remote</strong>), and say what push and pull each move and in which direction',
     'Walk the loop out loud: change → commit → push, and pull → change → commit → push when anyone else is involved',
     'Land on github.com and name every panel: the top bar, the Top repositories rail, the Home feed, the changelog',
     'Find the complete list of your own repositories in two clicks, from anywhere on the site'
   ]
  }

  ]
});
