/* ============================================================================
   MODULE 04 — "Commits: the save points that never disappear"
   Owns: what a commit contains, the SHA, reading history, reading a diff,
   revert vs reset, blame, why history is the product.
   Continuity: SHAs pinned by module 2 — e18b7f2, 3c9d114, 7b0e5da, a4f21c8,
   109d091 (oldest → newest). Today is Aug 7, 2026.
   ========================================================================== */

MODULES.push({
  id: 'commits-and-history',
  num: 4,
  title: 'Commits: the save points that never disappear',
  blurb: 'Module 3 showed you how to make a commit. This one shows you how to read five of them, how to see exactly what changed inside one, and why the pile of them is worth more than the files.',
  goals: [
    'Say what is actually stored inside a commit, and why that makes history impossible to quietly rewrite',
    'Read a commit ID, know why it looks like nonsense, and use one to point somebody at an exact version',
    'Read a diff line by line — red, green, the @@ header, unified versus split — without guessing',
    'Answer “when did this break?”, “which version did I submit?” and “who wrote this and why?” using the right GitHub screen for each'
  ],
  sections: [

  /* ============================ OPENING ============================ */
  {type:'prose', html:
    '<p class="tut-lead">Your repo has five commits in it. You made all five, and you can probably remember what two ' +
    'of them were about. In six weeks you will remember none of them — and it will not matter, because the repo ' +
    'remembers for you, in a form nobody can quietly edit afterwards.</p>' +
    '<p>That is the actual product here. The files on the front page are just the newest layer. The history ' +
    'underneath is the thing that makes GitHub different from a folder on your laptop, and it is the part almost ' +
    'nobody learns to read.</p>' +
    '<p>This module is about reading. Module 3 taught you the clicks that produce a commit. Here you learn what ' +
    'those clicks actually built, and how to interrogate it later when something has gone wrong and you are the ' +
    'only person who can work out when.</p>'
  },

  {type:'prose', title:'What is actually inside a commit',
   html:
    '<p>The natural assumption is that a commit is a photocopy of the whole project — five commits, five copies of ' +
    'your README, stacked up like drafts in a folder. That is not how it works, and the difference is what makes ' +
    'the history trustworthy.</p>' +
    '<p>A commit records <strong>a set of changes</strong> — which lines in which files went in, and which came out ' +
    '— and bolts five pieces of metadata onto them:</p>' +
    '<ul>' +
      '<li><strong>An author.</strong> The account that made the change. Yours all say <code>jordan-lee</code>.</li>' +
      '<li><strong>A timestamp.</strong> The exact moment it was recorded, not the moment you started working.</li>' +
      '<li><strong>A message.</strong> The sentence you typed to explain why. Or the sentence GitHub typed for you ' +
      'when you did not.</li>' +
      '<li><strong>A unique ID.</strong> A 40-character string like <code>109d091…</code>, generated from the ' +
      'content itself.</li>' +
      '<li><strong>A pointer to the commit that came before it.</strong> Its parent.</li>' +
    '</ul>' +
    '<p>That last one is doing almost all of the work. Each commit knows its parent, that parent knows its parent, ' +
    'and so on back to the first one you ever made. Five commits are not five loose items in a list — they are a ' +
    'chain, and every link names the one behind it.</p>' +
    '<p>Two things fall out of that chain, and they are the reason this module exists. First, GitHub can ' +
    '<em>reconstruct</em> any point in the past: start at the beginning and replay the changes until you reach the ' +
    'commit you asked for. Second, nothing can vanish silently. If you removed a commit from the middle, every ' +
    'commit after it would be pointing at something that is not there, and the whole chain would visibly break. ' +
    'Which is why the normal way to undo something is to <strong>add</strong> a commit that reverses it, leaving ' +
    'both on the record.</p>'
  },

  {type:'callout', variant:'info', title:'A commit log is an append-only audit trail',
   html:
    '<p>You already know this shape from a trade blotter. Every entry is timestamped, attributed to somebody, and ' +
    'sequential. You do not go back and quietly alter Tuesday’s fill because the price looked better on Thursday — ' +
    'you book a correcting entry today, dated today, and both rows stay visible forever. The correction is part of ' +
    'the record, not a replacement for it.</p>' +
    '<p>A commit history works the same way and for the same reason: so that six weeks later nobody has to trust ' +
    'anybody’s memory. The parent-pointer chain is what makes it tamper-evident rather than merely tidy — you ' +
    'cannot edit an old entry without the entries after it visibly failing to line up.</p>' +
    '<p>That is the last finance analogy in this tutorial. It earns its place here because the mechanism is ' +
    'genuinely the same one, not because the words sound similar.</p>'
  },

  /* ==================== SCREEN 1: HISTORY + DIFF + BROWSE ==================== */
  {type:'prose', title:'Your five commits, and what is inside one of them',
   html:
    '<p>Below is your real commit history, rebuilt and clickable. Three pages live inside it: the list of commits, ' +
    'the detail page for one commit (with the diff), and the repo as it looked back at an older commit.</p>' +
    '<p>Two clicks are worth making deliberately. Click the row that says <strong>Fix formatting in README for ' +
    'degree and trading alias</strong> — that opens the change you actually made, rendered as a diff. And click ' +
    'the <code>&lt;&gt;</code> button on the <strong>Create README.md</strong> row, which drops you into the repo ' +
    'as it existed three hours ago.</p>'
  },

  {type:'screen',
   id:'commit-history',
   label:'github.com/jordan-lee/trading-journal-practice/commits/main — your history, the diff, and time travel',
   url:'github.com/jordan-lee/trading-journal-practice/commits/main',
   initial:'commits',
   inertNote:'That control is real on GitHub but inert in this lesson. The live parts here are the commit rows, the <code>&lt;&gt;</code> browse buttons, the copy-SHA buttons and the Unified/Split toggle.',

   views:{

    /* ---------------- COMMIT HISTORY ---------------- */
    commits:{ url:'github.com/jordan-lee/trading-journal-practice/commits/main', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div></div></div>' +

      '<div class="gh-page">' +
        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel" data-h="hist-branch"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-muted" style="margin-left:8px">Commits on main</span>' +
          '<span class="gh-toolbar-right"><span class="gh-btn" data-h="hist-allbranches">All branches</span>' +
          '<span class="gh-btn" data-inert><svg class="octicon"><use href="#oct-people"/></svg>All users</span></span>' +
        '</div>' +

        '<div class="gh-commitgroup">' +
          '<div class="gh-commitgroup__date" data-h="datehead"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits on Aug 7, 2026</div>' +
          '<div class="gh-commitlist" id="commit-list">' +

            '<div class="gh-commitrow" data-h="row-109d091">' +
              '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-commitrow__main">' +
                '<span class="gh-commitrow__title" data-h="msg-bad">Update journal\\week6.md</span>' +
                '<span class="gh-commitrow__meta" data-h="rowmeta">jordan-lee committed 29 minutes ago</span>' +
              '</span>' +
              '<span class="gh-commitrow__right">' +
                '<span class="gh-verified">Verified</span>' +
                '<span class="gh-shabox" data-h="shabox">' +
                  '<button class="gh-copybtn" type="button" data-h="copy-109d091"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                  '<span class="gh-shabox__sha">109d091</span></span>' +
                '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="browse-109d091" title="Browse the repository at this point in the history"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg></span>' +
              '</span>' +
            '</div>' +

            '<div class="gh-commitrow" data-h="row-a4f21c8">' +
              '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-commitrow__main">' +
                '<span class="gh-commitrow__title" data-h="msg-good">Fix formatting in README for degree and trading alias</span>' +
                '<span class="gh-commitrow__meta">jordan-lee committed 2 hours ago</span>' +
              '</span>' +
              '<span class="gh-commitrow__right">' +
                '<span class="gh-verified">Verified</span>' +
                '<span class="gh-shabox">' +
                  '<button class="gh-copybtn" type="button" data-h="copy-a4f21c8"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                  '<span class="gh-shabox__sha">a4f21c8</span></span>' +
                '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="browse-a4f21c8" title="Browse the repository at this point in the history"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg></span>' +
              '</span>' +
            '</div>' +

            '<div class="gh-commitrow" data-h="row-7b0e5da">' +
              '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-commitrow__main">' +
                '<span class="gh-commitrow__title">Update README.md</span>' +
                '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span>' +
              '</span>' +
              '<span class="gh-commitrow__right">' +
                '<span class="gh-verified" data-h="verified">Verified</span>' +
                '<span class="gh-shabox">' +
                  '<button class="gh-copybtn" type="button" data-h="copy-7b0e5da"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                  '<span class="gh-shabox__sha">7b0e5da</span></span>' +
                '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="browse-7b0e5da" title="Browse the repository at this point in the history"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg></span>' +
              '</span>' +
            '</div>' +

            '<div class="gh-commitrow" data-h="row-3c9d114">' +
              '<span class="gh-avatar gh-avatar--32" data-h="rowavatar" data-user="jordan-lee"></span>' +
              '<span class="gh-commitrow__main">' +
                '<span class="gh-commitrow__title">Create README.md</span>' +
                '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span>' +
              '</span>' +
              '<span class="gh-commitrow__right">' +
                '<span class="gh-verified">Verified</span>' +
                '<span class="gh-shabox">' +
                  '<button class="gh-copybtn" type="button" data-h="copy-3c9d114"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                  '<span class="gh-shabox__sha">3c9d114</span></span>' +
                '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="browse-3c9d114" title="Browse the repository at this point in the history"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg></span>' +
              '</span>' +
            '</div>' +

            '<div class="gh-commitrow" data-h="row-e18b7f2">' +
              '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
              '<span class="gh-commitrow__main">' +
                '<span class="gh-commitrow__title">Initial commit</span>' +
                '<span class="gh-commitrow__meta" data-h="rootmeta">jordan-lee committed 3 hours ago</span>' +
              '</span>' +
              '<span class="gh-commitrow__right">' +
                '<span class="gh-verified">Verified</span>' +
                '<span class="gh-shabox">' +
                  '<button class="gh-copybtn" type="button" data-h="copy-e18b7f2"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                  '<span class="gh-shabox__sha">e18b7f2</span></span>' +
                '<span class="gh-btn gh-btn--sm gh-btn--icon" data-h="browse-e18b7f2" title="Browse the repository at this point in the history"><svg class="octicon octicon--sm"><use href="#oct-code"/></svg></span>' +
              '</span>' +
            '</div>' +

          '</div>' +
        '</div>' +
      '</div>'
    },

    /* ---------------- ONE COMMIT, WITH THE DIFF ---------------- */
    diff:{ url:'github.com/jordan-lee/trading-journal-practice/commit/a4f21c8', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div>' +
        '<div class="gh-repohead__actions"><span class="gh-btn" data-h="back-history">' +
          '<svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the commit list</span></div></div></div>' +

      '<div class="gh-page">' +
        '<div style="border:1px solid var(--gh-border-default);border-radius:6px;background:var(--gh-canvas-default);padding:16px;margin-bottom:16px">' +
          '<div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap">' +
            '<h2 style="font-size:20px;font-weight:600;margin:0;flex:1;min-width:220px;color:var(--gh-fg-default)" data-h="d-title">Fix formatting in README for degree and trading alias</h2>' +
            '<span class="gh-btn" data-h="d-browsefiles"><svg class="octicon"><use href="#oct-code"/></svg>Browse files</span>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:8px;margin-top:14px;flex-wrap:wrap;font-size:12px;color:var(--gh-fg-muted);border-top:1px solid var(--gh-border-muted);padding-top:12px">' +
            '<span class="gh-avatar gh-avatar--20" data-user="jordan-lee"></span>' +
            '<span class="gh-b" style="color:var(--gh-fg-default)">jordan-lee</span>' +
            '<span>committed 2 hours ago</span>' +
            '<span class="gh-verified">Verified</span>' +
            '<span style="margin-left:auto;display:flex;align-items:center;gap:8px;flex-wrap:wrap" data-h="d-parent">' +
              '<span>1 parent</span><span class="gh-sha">7b0e5da</span>' +
              '<span class="gh-muted">commit</span>' +
              '<span class="gh-shabox">' +
                '<button class="gh-copybtn" type="button" data-h="d-copysha"><svg class="octicon octicon--sm"><use href="#oct-copy"/></svg></button>' +
                '<span class="gh-shabox__sha">a4f21c8</span></span>' +
            '</span>' +
          '</div>' +
        '</div>' +

        '<p class="gh-muted" style="font-size:14px;margin:0 0 12px" data-h="d-summary">' +
          'Showing <b style="color:var(--gh-fg-default)">1 changed file</b> with ' +
          '<b style="color:var(--gh-success-fg)">2 additions</b> and ' +
          '<b style="color:var(--gh-danger-fg)">1 deletion</b>.</p>' +

        '<div class="gh-diff">' +
          '<div class="gh-diff__head">' +
            '<svg class="octicon"><use href="#oct-file"/></svg>' +
            '<span class="gh-mono" data-h="d-filename">README.md</span>' +
            '<span class="gh-diff__stat" data-h="d-stat"><span class="add">+2</span>&nbsp;<span class="del">&minus;1</span></span>' +
            '<span class="gh-diff__tools">' +
              '<span class="gh-difftoggle" data-h="d-toggle">' +
                '<button type="button" class="is-on" data-h="d-unified">Unified</button>' +
                '<button type="button" data-h="d-split">Split</button>' +
              '</span>' +
              '<span class="gh-btn gh-btn--sm" data-h="d-viewfile">View file</span>' +
            '</span>' +
          '</div>' +
          '<div id="diffbody">' +
            '<table class="gh-difftable"><tbody>' +
              '<tr class="gh-diffrow--hunk" data-h="d-hunk"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">@@ -1,5 +1,6 @@</td></tr>' +
              '<tr><td class="gh-diff__ln">1</td><td class="gh-diff__ln">1</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code"># Jordan Lee -- desk profile</td></tr>' +
              '<tr><td class="gh-diff__ln">2</td><td class="gh-diff__ln">2</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
              '<tr class="gh-diffrow--del" data-h="d-del"><td class="gh-diff__ln">3</td><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__sign">-</td><td class="gh-diff__code">**Degree:** Economics (Finance), year 3<span class="gh-diffword-del"> *Trading alias:* e.g. IronCondor</span></td></tr>' +
              '<tr class="gh-diffrow--add" data-h="d-add1"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">3</td><td class="gh-diff__sign">+</td><td class="gh-diff__code">**Degree:** Economics (Finance), year 3</td></tr>' +
              '<tr class="gh-diffrow--add" data-h="d-add2"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">4</td><td class="gh-diff__sign">+</td><td class="gh-diff__code"><span class="gh-diffword-add">*Trading alias:* e.g. IronCondor</span></td></tr>' +
              '<tr><td class="gh-diff__ln">4</td><td class="gh-diff__ln">5</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
              '<tr><td class="gh-diff__ln">5</td><td class="gh-diff__ln">6</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">## Markets I want to trade this semester</td></tr>' +
            '</tbody></table>' +
          '</div>' +
        '</div>' +
      '</div>'
    },

    /* ---------------- THE REPO AS IT WAS AT 3c9d114 ---------------- */
    browse:{ url:'github.com/jordan-lee/trading-journal-practice/tree/3c9d114', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-repohead"><div class="gh-repohead__row"><div class="gh-breadcrumb">' +
        '<span class="gh-avatar gh-avatar--sq gh-avatar--24" data-user="jordan-lee"></span>' +
        '<span class="gh-breadcrumb__owner">jordan-lee</span><span class="gh-breadcrumb__sep">/</span>' +
        '<span class="gh-breadcrumb__repo">trading-journal-practice</span><span class="gh-badge">Private</span></div>' +
        '<div class="gh-repohead__actions"><span class="gh-btn" data-h="back-history">' +
          '<svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the commit list</span></div></div></div>' +

      '<div class="gh-page">' +
        '<div class="gh-flash gh-flash--warn" data-h="b-flash">' +
          '<svg class="octicon"><use href="#oct-history"/></svg>' +
          '<div>You are viewing this repository at commit <span class="gh-mono">3c9d114</span>. ' +
          'This is a read-only snapshot of the past — the files below are how they were three hours ago, ' +
          'not how they are now.</div>' +
        '</div>' +

        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel" data-h="b-refpicker"><svg class="octicon"><use href="#oct-git-commit"/></svg><b>3c9d114</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-refstats"><span class="gh-refstat" data-inert><svg class="octicon"><use href="#oct-git-branch"/></svg><b>1</b>&nbsp;Branch</span></span>' +
        '</div>' +

        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Create README.md</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">3c9d114</span>' +
            '<span>·</span><span>3 hours ago</span>' +
            '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>2</b>&nbsp;Commits</span></span>' +
          '</div>' +
          '<div class="gh-filerow" data-h="b-readme">' +
            '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Create README.md</span>' +
            '<span class="gh-filerow__time">3 hours ago</span>' +
          '</div>' +
        '</div>' +

        '<div class="gh-blankslate gh-blankslate--dashed" data-h="b-missing" style="margin-top:16px">' +
          '<svg class="octicon"><use href="#oct-file"/></svg>' +
          '<h3>No journal file here</h3>' +
          '<p>At this point in history <span class="gh-mono">journal\\week6.md</span> did not exist yet. ' +
          'It shows up later in the chain, which is exactly what the history is for.</p>' +
        '</div>' +
      '</div>'
    }
   },

   /* ==================== INTERACTIONS ==================== */
   actions:[
     /* browse buttons must be listed BEFORE the row actions — the first match wins */
     {on:'[data-h="browse-3c9d114"]', view:'browse', explain:{title:'You just travelled backwards, safely',
       html:'<p>The URL changed from <code>/commits/main</code> to <code>/tree/3c9d114</code>. You are now looking ' +
            'at the entire repository as it existed at that commit — the file list, the README, all of it.</p>' +
            '<p>Two things to notice. The commit counter says <strong>2 Commits</strong>, not 5, because at that ' +
            'moment only two had happened. And <code>journal\\week6.md</code> is not in the file list, because it ' +
            'had not been created yet.</p>' +
            '<p>Nothing has changed and nothing is at risk. This is a read-only view of the past, which is why ' +
            'GitHub puts a warning bar at the top — people land here from a link, edit something, and get confused ' +
            'about where their change went. Use the button at the top right to come back to the present.</p>'}},
     {on:'[data-h="browse-109d091"]', toast:'That would show the repo exactly as it is now — <span style="font-family:var(--font-mono)">109d091</span> is the latest commit. Try the one on <span style="font-family:var(--font-mono)">3c9d114</span> instead.'},
     {on:'[data-h="browse-a4f21c8"]', toast:'Wired up on the <span style="font-family:var(--font-mono)">3c9d114</span> row in this lesson — click the <span style="font-family:var(--font-mono)">&lt;&gt;</span> button on “Create README.md”.'},
     {on:'[data-h="browse-7b0e5da"]', toast:'Wired up on the <span style="font-family:var(--font-mono)">3c9d114</span> row in this lesson — click the <span style="font-family:var(--font-mono)">&lt;&gt;</span> button on “Create README.md”.'},
     {on:'[data-h="browse-e18b7f2"]', toast:'That is the very first commit — an empty repo with nothing in it yet.'},

     {on:'[data-h="copy-a4f21c8"]', toast:'Copied <span style="font-family:var(--font-mono)">a4f21c8b93e7d2044f6c1ae58d3b90cc7e412a6f</span> — all 40 characters, not the 7 you can see.'},
     {on:'[data-h="copy-109d091"]', toast:'Copied <span style="font-family:var(--font-mono)">109d091f4b2a8c6d3e07…</span> — the full 40-character commit ID.'},
     {on:'[data-h="copy-7b0e5da"]', toast:'Copied the full 40-character ID for <span style="font-family:var(--font-mono)">7b0e5da</span>.'},
     {on:'[data-h="copy-3c9d114"]', toast:'Copied the full 40-character ID for <span style="font-family:var(--font-mono)">3c9d114</span>.'},
     {on:'[data-h="copy-e18b7f2"]', toast:'Copied the full 40-character ID for <span style="font-family:var(--font-mono)">e18b7f2</span>.'},

     {on:'[data-h="row-a4f21c8"]', view:'diff', explain:{title:'This is what that commit actually changed',
       html:'<p>The URL is now <code>/commit/a4f21c8</code> — one commit, on its own page. The top block is the ' +
            'metadata: your message as the heading, who committed it, when, its own ID on the right, and the ID of ' +
            'its <strong>parent</strong> (<code>7b0e5da</code>) on the left of that.</p>' +
            '<p>Underneath is the diff: every line that changed, and nothing else. One red line came out, two green ' +
            'lines went in. Nine-tenths of the file is not shown, because nine-tenths of the file did not change.</p>' +
            '<p>Markers 12 to 18 walk you through how to read it. The <strong>Unified / Split</strong> toggle in ' +
            'the file header genuinely works — press both and see which one you find easier.</p>'}},
     {on:'[data-h="row-109d091"]', toast:'That commit only touched <span style="font-family:var(--font-mono)">journal\\week6.md</span>. The interesting diff in this lesson is the README one — click the “Fix formatting…” row.'},
     {on:'[data-h="row-7b0e5da"]', toast:'Click the “Fix formatting in README…” row instead — that is the diff this lesson takes apart.'},
     {on:'[data-h="row-3c9d114"]', toast:'“Create README.md” added the whole file at once, so its diff is 11 green lines and nothing red. Try the “Fix formatting…” row for a more interesting one.'},
     {on:'[data-h="row-e18b7f2"]', toast:'The first commit has no parent, so there is nothing to compare it against. Every repo has exactly one of these.'},

     {on:'[data-h="d-split"]',
      addClass:{target:'[data-h="d-split"]', class:'is-on'},
      removeClass:{target:'[data-h="d-unified"]', class:'is-on'},
      replace:{target:'#diffbody', html:
        '<table class="gh-difftable"><tbody>' +
          '<tr class="gh-diffrow--hunk" data-h="d-hunk"><td class="gh-diff__code" colspan="6">@@ -1,5 +1,6 @@</td></tr>' +
          '<tr><td class="gh-diff__ln">1</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code"># Jordan Lee -- desk profile</td>' +
              '<td class="gh-diff__ln">1</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code"># Jordan Lee -- desk profile</td></tr>' +
          '<tr><td class="gh-diff__ln">2</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td>' +
              '<td class="gh-diff__ln">2</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
          '<tr data-h="d-del">' +
              '<td class="gh-diff__ln" style="background:rgba(248,81,73,.15);color:var(--gh-fg-default)">3</td>' +
              '<td class="gh-diff__sign" style="background:var(--gh-diff-del);color:var(--gh-danger-fg)">-</td>' +
              '<td class="gh-diff__code" style="background:var(--gh-diff-del)">**Degree:** Economics (Finance), year 3<span class="gh-diffword-del"> *Trading alias:* e.g. IronCondor</span></td>' +
              '<td class="gh-diff__ln" style="background:rgba(63,185,80,.15);color:var(--gh-fg-default)">3</td>' +
              '<td class="gh-diff__sign" style="background:var(--gh-diff-add);color:var(--gh-success-fg)">+</td>' +
              '<td class="gh-diff__code" style="background:var(--gh-diff-add)">**Degree:** Economics (Finance), year 3</td></tr>' +
          '<tr data-h="d-add1">' +
              '<td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td>' +
              '<td class="gh-diff__ln" style="background:rgba(63,185,80,.15);color:var(--gh-fg-default)">4</td>' +
              '<td class="gh-diff__sign" style="background:var(--gh-diff-add);color:var(--gh-success-fg)">+</td>' +
              '<td class="gh-diff__code" style="background:var(--gh-diff-add)"><span class="gh-diffword-add">*Trading alias:* e.g. IronCondor</span></td></tr>' +
          '<tr><td class="gh-diff__ln">4</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td>' +
              '<td class="gh-diff__ln">5</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
          '<tr><td class="gh-diff__ln">5</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">## Markets I want to trade this semester</td>' +
              '<td class="gh-diff__ln">6</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">## Markets I want to trade this semester</td></tr>' +
        '</tbody></table>'},
      explain:{title:'Same change, two ways of drawing it',
       html:'<p>Split view puts the old file in the left column and the new file in the right column, lined up row ' +
            'by row. Nothing about the commit changed — this is purely how the page draws it.</p>' +
            '<p>Split is easier when a line was <em>edited</em> and you want to see the before and after next to ' +
            'each other. Unified is easier when a lot was added or deleted outright, because you are not reading ' +
            'half-empty columns, and it is the only one that fits comfortably on a phone.</p>' +
            '<p>Most people pick one and stay there. Try both on a real change before you decide which one you are.</p>'}},

     {on:'[data-h="d-unified"]',
      addClass:{target:'[data-h="d-unified"]', class:'is-on'},
      removeClass:{target:'[data-h="d-split"]', class:'is-on'},
      replace:{target:'#diffbody', html:
        '<table class="gh-difftable"><tbody>' +
          '<tr class="gh-diffrow--hunk" data-h="d-hunk"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">@@ -1,5 +1,6 @@</td></tr>' +
          '<tr><td class="gh-diff__ln">1</td><td class="gh-diff__ln">1</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code"># Jordan Lee -- desk profile</td></tr>' +
          '<tr><td class="gh-diff__ln">2</td><td class="gh-diff__ln">2</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
          '<tr class="gh-diffrow--del" data-h="d-del"><td class="gh-diff__ln">3</td><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__sign">-</td><td class="gh-diff__code">**Degree:** Economics (Finance), year 3<span class="gh-diffword-del"> *Trading alias:* e.g. IronCondor</span></td></tr>' +
          '<tr class="gh-diffrow--add" data-h="d-add1"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">3</td><td class="gh-diff__sign">+</td><td class="gh-diff__code">**Degree:** Economics (Finance), year 3</td></tr>' +
          '<tr class="gh-diffrow--add" data-h="d-add2"><td class="gh-diff__ln">&nbsp;</td><td class="gh-diff__ln">4</td><td class="gh-diff__sign">+</td><td class="gh-diff__code"><span class="gh-diffword-add">*Trading alias:* e.g. IronCondor</span></td></tr>' +
          '<tr><td class="gh-diff__ln">4</td><td class="gh-diff__ln">5</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">&nbsp;</td></tr>' +
          '<tr><td class="gh-diff__ln">5</td><td class="gh-diff__ln">6</td><td class="gh-diff__sign">&nbsp;</td><td class="gh-diff__code">## Markets I want to trade this semester</td></tr>' +
        '</tbody></table>'},
      toast:'Back to unified — one column, deletions above additions.'},

     {on:'[data-h="d-copysha"]', toast:'Copied <span style="font-family:var(--font-mono)">a4f21c8b93e7d2044f6c1ae58d3b90cc7e412a6f</span>. Paste that anywhere on GitHub and it turns into a link to this exact commit.'},
     {on:'[data-h="d-browsefiles"]', view:'browse', toast:'“Browse files” is the same time-travel button, taken from the commit’s own page.'},
     {on:'[data-h="back-history"]', view:'commits'},
     {on:'[data-h="hist-allbranches"]', toast:'Right now this shows the same five commits, because you have one branch. Module 5 changes that.'},
     {on:'[data-h="b-readme"]', toast:'That would open README.md as it was at <span style="font-family:var(--font-mono)">3c9d114</span> — before the formatting fix, with the degree and trading-alias text still on one line.'}
   ],

   /* ==================== HOTSPOTS ==================== */
   hotspots:[

    {sel:'[data-h="datehead"]', view:'commits', place:'left', title:'“Commits on Aug 7, 2026” — the date group',
     what:'<p>GitHub groups the history by calendar day, newest day first, and puts a header on each group. All five of your commits landed on the same afternoon, so you only get one header.</p>',
     why:'<p>A flat list of a thousand commits is unreadable. Days are the unit people actually think in — “what did we ship on Monday?” — so the list is chopped into days before you ever see it.</p>',
     how:'<p>Nothing to click. Read downwards: within a day the newest commit is at the top, and the days themselves run newest to oldest as you scroll.</p>',
     fail:'<p>Reading it upside down. This list is not chronological in the direction a diary is — the top row is the most recent thing that happened, not the first. Getting that backwards makes “when did it break?” unanswerable.</p>',
     when:'<p>Week 11, when you want to know what you did in the two days before a submission and can scroll straight to those date headers instead of reading every row.</p>'},

    {sel:'[data-h="rowavatar"]', view:'commits', place:'left', title:'The author avatar',
     what:'<p>The picture of the account that made the commit. Every commit is attributed to exactly one author, and GitHub draws their avatar at the start of the row.</p>',
     why:'<p>On any project with more than one person, “who did this?” is the first question and it needs answering without reading. A face on the left is faster than a username in the middle.</p>',
     how:'<p>Click an avatar to open that person’s profile and see everything else they have committed. On your repo it is you five times over.</p>',
     fail:'<p>The author is whoever the commit says it is, and on a repo you control that can be edited. On a shared project treat it as strong evidence, not proof — the <strong>Verified</strong> badge next to the SHA is the part that is cryptographically checked.</p>',
     when:'<p>A group assignment where the marker asks who contributed what. The avatars answer it in one scroll.</p>'},

    {sel:'[data-h="msg-bad"]', view:'commits', place:'left', title:'“Update journal\\week6.md” — a message that says nothing',
     what:'<p>The commit message. This one you did not write: when you edit a file on github.com and leave the message box alone, GitHub fills it in with <em>Update</em> plus the filename and commits that.</p>',
     why:'<p>Git refuses to record a commit with no message at all, because a change with no explanation is nearly useless later. GitHub’s autogenerated default exists so the web editor never blocks you — not because it is a good message.</p>',
     how:'<p>You cannot repair it now. What you do instead is type your own next time, in the box under the editor, before you press the green button. Module 3 covers the writing; this module is about the reading.</p>',
     fail:'<p>Here is the failure, concretely. In week 11 you scroll this list looking for the commit where your journal answers were still the good ones. Every row says “Update journal\\week6.md”. The list tells you a file changed twelve times and nothing about what any of those changes were, so you have to open all twelve diffs.</p>',
     when:'<p>Every single time you edit a file in the browser. The message box is two seconds of typing and it is the only part of a commit your future self actually reads.</p>'},

    {sel:'[data-h="msg-good"]', view:'commits', place:'left', title:'“Fix formatting in README for degree and trading alias” — a message that works',
     what:'<p>The same field, filled in by you. Verb first, then what, then where. Somebody who has never seen this repo knows what happened in that commit without opening it.</p>',
     why:'<p>The message is the index of the history. A diff tells you <em>what</em> changed; only the message can tell you <em>why</em>, and “why” is the thing you cannot reconstruct from the code six weeks later.</p>',
     how:'<p>Read a history top to bottom and see whether it reads as a story. Yours reads: started the repo, made a README, filled it in, tried to fix its formatting, updated the journal. Four of those five sentences are useful.</p>',
     fail:'<p>The message can also lie. This commit says the formatting was fixed. Open the diff (marker 12 onwards) and you will see it split one line into two source lines — which Markdown still renders as a single run-on line. The record is honest about what changed; only the sentence claims it worked.</p>',
     when:'<p>Whenever you are hunting for a specific past state. You search the messages first, and only open diffs when a message looks promising.</p>'},

    {sel:'[data-h="rowmeta"]', view:'commits', place:'bottom', title:'“committed 29 minutes ago” — relative time',
     what:'<p>How long ago the commit was recorded, phrased in human units. Hover the text on real GitHub and it turns into the exact timestamp, down to the minute and time zone.</p>',
     why:'<p>“29 minutes ago” answers “is this current?” instantly. An absolute date makes you do arithmetic. GitHub shows the useful one by default and hides the precise one behind a hover.</p>',
     how:'<p>Hover for the exact time. For anything you need to quote — a submission deadline, for instance — use the exact timestamp, not the relative one, because the relative one changes every time the page loads.</p>',
     fail:'<p>Relative times drift into vagueness fast. Everything older than a month collapses into “last month”, and “last year” could be fourteen months. If precision matters, hover.</p>',
     when:'<p>The moment a deadline is contested. “Committed 3 hours ago” proves nothing; the exact timestamp underneath it does, and it is recorded whether or not you thought to check.</p>'},

    {sel:'[data-h="shabox"]', view:'commits', place:'top', title:'109d091 — the commit ID, and why it looks like nonsense',
     what:'<p>The unique fingerprint of that one commit, shown as its first 7 characters. The real thing is 40 characters of hexadecimal — <code>109d091f4b2a8c6d3e07…</code> — and it is called a SHA, after the algorithm that produces it.</p>',
     why:'<p>Every save point needs a name that can never be reused or duplicated, including across computers that have never spoken to each other. Git generates the name <em>from the content of the commit itself</em>, so the same ID can never mean two different things — change one character anywhere and you get a completely different ID.</p>',
     how:'<p>GitHub shows 7 characters because that is comfortably enough to be unique in a repo this size, and 40 is unreadable. Anywhere GitHub accepts a SHA, the short form works.</p>',
     fail:'<p>Assuming it counts. <code>109d091</code> is not “commit 109”, and it tells you nothing about order — a commit made a second later gets an ID that could sort anywhere. Only the timestamps and the parent chain give you order.</p>',
     when:'<p>Emailing a tutor: “the version at <code>a4f21c8</code>” is exact and permanent. “The version from Tuesday afternoon” is not.</p>'},

    {sel:'[data-h="copy-109d091"]', view:'commits', place:'top', title:'The copy-SHA button',
     what:'<p>A one-click copy of the <strong>full 40-character</strong> ID onto your clipboard — not the 7 you can see. Click it and watch the toast.</p>',
     why:'<p>Nobody can transcribe 40 characters of hex without a mistake, and a single wrong character makes the ID point at nothing. The button exists because manual copying of this specific string has a near-100% error rate.</p>',
     how:'<p>Click the little copy icon in the grey box. Then paste it into a message, an issue comment, or the end of a GitHub URL. Pasted into any GitHub comment box, a bare SHA turns itself into a link to the commit.</p>',
     fail:'<p>Selecting the visible 7 characters with your mouse instead. That works inside this repo, but paste it into another tool — or a repo big enough for collisions — and it resolves to nothing, with a confusing error.</p>',
     when:'<p>Any time you need to say “this exact version” to another human, or to yourself in a note you will read after the exam.</p>'},

    {sel:'[data-h="browse-3c9d114"]', view:'commits', place:'right', title:'The &lt;&gt; button — browse the repo at this point in history',
     what:'<p>Opens the entire repository as it existed at that commit. Not the diff — the whole thing, files and README and all, frozen at that moment. Click it; the screen changes.</p>',
     why:'<p>A diff shows you one step. Sometimes you need the whole staircase: “what did the project look like before I started breaking it?” Rebuilding that by reading diffs backwards is miserable, so GitHub does the replay for you.</p>',
     how:'<p>Click the <code>&lt;&gt;</code> icon on any commit row. The URL becomes <code>/tree/&lt;sha&gt;</code>, and a warning bar appears telling you that you are in the past.</p>',
     fail:'<p>Forgetting you are there. The page looks almost identical to the normal repo, so people browse back in time, click the pencil to edit a file, and get confused when GitHub insists on putting their edit somewhere else. Check for the warning bar before you edit anything.</p>',
     when:'<p>“It worked on Tuesday.” Find Tuesday’s commit, click this, and read the working version with your own eyes instead of guessing what you changed.</p>'},

    {sel:'[data-h="verified"]', view:'commits', place:'left', title:'The “Verified” badge',
     what:'<p>A green badge saying GitHub can cryptographically prove this commit came from the account it claims to. Commits made through the website are always signed by GitHub, so all of yours have it.</p>',
     why:'<p>The author field in a commit is just text — anyone can put anybody’s name in it. Signing exists so that on public projects a claim of authorship can actually be checked rather than believed.</p>',
     how:'<p>Nothing to do here. Commits you make in the browser get this automatically. Commits made from your own laptop only get it if you set up a signing key, which is a later-life problem.</p>',
     fail:'<p>Treating <em>unverified</em> as suspicious. Most commits on GitHub are unverified and completely legitimate — it means unsigned, not forged. The badge is evidence when present, not an accusation when absent.</p>',
     when:'<p>Reviewing a contribution to a project that matters, where “did this really come from who it says?” is a question you are entitled to ask.</p>'},

    {sel:'[data-h="rootmeta"]', view:'commits', place:'bottom', title:'“Initial commit” — the bottom of the chain',
     what:'<p>The oldest commit in the repo, created automatically when you ticked “Add a README file” at repo-creation time. It is the only commit with no parent.</p>',
     why:'<p>The chain has to start somewhere. Every other commit points backwards at one before it; this one points at nothing, which is how Git knows it has reached the beginning.</p>',
     how:'<p>Scroll to the bottom of any history to find it. On someone else’s repo it tells you the true age of the project, which is often years older than the latest activity suggests.</p>',
     fail:'<p>It has no parent, so it has nothing to be compared against — its “diff” is just every line of every file it introduced, all green. That is normal and not a sign anything is wrong.</p>',
     when:'<p>Sizing up an unfamiliar library: first commit 2011, last commit 2019, and you now know both that it is mature and that it is abandoned.</p>'},

    {sel:'[data-h="hist-allbranches"]', view:'commits', place:'bottom', title:'The branch filter on the history',
     what:'<p>This history is not “everything that ever happened” — it is everything that happened on <code>main</code>. The picker to the left says which branch you are reading, and this button widens it to all of them.</p>',
     why:'<p>Once a repo has parallel branches, a single flat history would interleave unrelated work and become meaningless. The default is to show you the official line only.</p>',
     how:'<p>Change the branch in the picker to read a different line of history. Yours shows the same five commits either way, because you have exactly one branch.</p>',
     fail:'<p>Panicking because a commit you definitely made is not in the list. It almost certainly is — on a different branch. This filter is the single most common reason a commit appears to have vanished.</p>',
     when:'<p>Right after Module 5, the first time you commit to a branch and then wonder why <code>main</code>’s history looks untouched.</p>'},

    /* ---------- the diff view ---------- */
    {sel:'[data-h="d-title"]', view:'diff', place:'left', title:'The commit page: your message as the headline',
     what:'<p>One commit gets a whole page. Your message becomes the page heading, and everything underneath is the evidence for it.</p>',
     why:'<p>A commit is the smallest unit anyone reviews, argues about or reverts. Giving it its own URL means it can be linked to, quoted in an issue, and discussed in isolation.</p>',
     how:'<p>You reached this by clicking a row in the history. You can also reach it by pasting <code>/commit/a4f21c8</code> onto the end of any repo URL.</p>',
     fail:'<p>A message that describes the intention and a diff that shows something else — exactly what happened here. The heading claims the formatting was fixed; the diff below shows a change that Markdown ignores. Read both, always.</p>',
     when:'<p>Any time you want to send somebody one specific change rather than “go look at my repo”.</p>'},

    {sel:'[data-h="d-parent"]', view:'diff', place:'left', title:'“1 parent 7b0e5da” — the link backwards',
     what:'<p>The ID of the commit that came immediately before this one. That is the pointer that turns a pile of commits into a chain.</p>',
     why:'<p>A diff is meaningless without a “compared to what”. The parent <em>is</em> the “what” — everything red and green below is the difference between <code>7b0e5da</code> and <code>a4f21c8</code>, and nothing else.</p>',
     how:'<p>Click a parent SHA to jump to that commit and read the step before this one. Do it repeatedly and you are walking backwards through the project’s life.</p>',
     fail:'<p>A commit can have <em>two</em> parents. That is a merge commit — the moment two branches were joined — and its diff is confusing because it is being compared to two things at once. Module 5 explains where those come from.</p>',
     when:'<p>Bisecting a problem by hand: land on a broken commit, follow parents backwards, and find the last one that was fine.</p>'},

    {sel:'[data-h="d-summary"]', view:'diff', place:'bottom', title:'“1 changed file with 2 additions and 1 deletion”',
     what:'<p>The size of the commit in one sentence: how many files it touched, and how many lines went in and out.</p>',
     why:'<p>Before you read anything you want to know whether this is a typo fix or a rewrite. Three numbers give you that, and reviewers use them to decide what to read first.</p>',
     how:'<p>Read it as a smell test. One file, three lines: safe, read it in ten seconds. Forty files, 3,000 lines: something big happened and you should be suspicious of the message.</p>',
     fail:'<p>Git counts an <em>edited</em> line as one deletion plus one addition, because it works in whole lines. Changing a single character in a 200-character line shows as “+1 −1”, not as a one-character change. The numbers measure lines touched, not effort.</p>',
     when:'<p>Scanning a stranger’s pull request. A change described as “small fix” that says “+1,200 −40” deserves a much closer look.</p>'},

    {sel:'[data-h="d-hunk"]', view:'diff', place:'right', title:'@@ -1,5 +1,6 @@ — the hunk header',
     what:'<p>A blue-tinted signpost meaning “what follows is a section from around here in the file”. The first pair is the old file — from line 1, 5 lines. The second is the new file — from line 1, 6 lines. The <code>-</code> means before and the <code>+</code> means after.</p>',
     why:'<p>Showing an entire 900-line file to explain a three-line change wastes everyone’s attention. Git shows only the changed lines plus about three lines either side for context, and the hunk header tells you where in the file that fragment came from.</p>',
     how:'<p>Read the numbers when you need to know <em>where</em> you are. On real GitHub there is an expander at the left of this row: click it to reveal the hidden lines above or below, a chunk at a time.</p>',
     fail:'<p>Assuming the file only has 6 lines because that is all you can see. Your README has 11. A diff is a keyhole, not the room — reach for <strong>View file</strong> when you need the whole thing.</p>',
     when:'<p>A big commit with four separate hunks in one file. The headers are how you tell which part of the file each cluster of changes belongs to.</p>',
     note:'<p>The word is genuinely “hunk”. It is Git’s own term for one contiguous block of changed lines, and it shows up in error messages, so it is worth recognising rather than admiring.</p>'},

    {sel:'[data-h="d-del"]', view:'diff', place:'right', title:'The red line with the minus — what came out',
     what:'<p>A line that existed before this commit and does not exist after it. Red background, a <code>-</code> in the sign column, and a number in the left gutter but not the right — because it has no line number in the new file. It does not exist there.</p>',
     why:'<p>Colour and sign say the same thing twice on purpose. Red-green is fast but useless to roughly one in twelve men, so the <code>+</code>/<code>-</code> characters carry the meaning independently.</p>',
     how:'<p>The darker red patch inside the line is <strong>word-level highlighting</strong>: GitHub noticed the two lines are mostly the same and shaded only the part that actually moved. Read the pale red for “this line changed” and the dark red for “this is the bit that changed”.</p>',
     fail:'<p>Reading red as “deleted from the project”. This text is not gone — it is right below in green, on a line of its own. Red only ever means “not present in this version any more”, which very often means “moved” or “edited”.</p>',
     when:'<p>Reviewing your own change before you commit it. The red block is where you check you have not deleted something you still needed.</p>'},

    {sel:'[data-h="d-add1"]', view:'diff', place:'right', title:'The green lines with the plus — what went in',
     what:'<p>Lines that exist after this commit and did not exist before. Green background, a <code>+</code>, and a number in the <em>right</em> gutter only.</p>',
     why:'<p>Git compares files line by line, because a line is a unit humans naturally edit and it makes conflicts between two people’s work resolvable. Everything else about diffs follows from that one decision.</p>',
     how:'<p>Count what happened here: one line out, two lines in. That is why the summary says <strong>+2 −1</strong> for what you would describe as “I split a line in half”.</p>',
     fail:'<p>Because Git thinks in whole lines, a document written as one enormous paragraph produces a diff where changing a comma shows the entire paragraph as deleted and re-added. That is why people writing prose in Markdown often start each sentence on its own line.</p>',
     when:'<p>Every review you ever do. Green is the new work; red is what it displaced. Read green first, then check what red it cost.</p>'},

    {sel:'[data-h="d-toggle"]', view:'diff', place:'left', title:'Unified / Split — two ways of drawing the same change',
     what:'<p>A working toggle. <strong>Unified</strong> (on now) stacks deletions above additions in a single column. <strong>Split</strong> puts the old file on the left and the new file on the right.</p>',
     why:'<p>Neither view wins. Unified reads like a story and survives narrow screens; split makes an <em>edited</em> line obvious because before and after sit side by side. GitHub declined to choose for you.</p>',
     how:'<p>Press <strong>Split</strong>, read the same change again, then press <strong>Unified</strong>. Both buttons are wired up here. On real GitHub the choice sticks to your account across every repo.</p>',
     fail:'<p>Split on a phone or a narrow window is genuinely unreadable — two columns of monospace text in half a screen each. If a diff looks like word soup, switch to unified before you conclude the change is complicated.</p>',
     when:'<p>Reviewing a change where somebody rewrote a paragraph. Split shows you the old and new sentence on the same row; unified makes you hold the old one in your head.</p>'},

    {sel:'[data-h="d-viewfile"]', view:'diff', place:'top', title:'“View file” — the escape from the keyhole',
     what:'<p>Opens the whole file as it stood <em>at this commit</em> — not as it is today. Every file in a diff has one of these.</p>',
     why:'<p>Three lines of context is often not enough to judge whether a change is right. This is the shortest path from “what changed” to “what does the file actually look like now”.</p>',
     how:'<p>Click it on the file header. You land on the blob view with the commit pinned, so the URL contains the SHA rather than <code>main</code>.</p>',
     fail:'<p>Assuming it shows the current file. It shows the file at that commit, which may be many changes behind. If you edit from there, GitHub has to reconcile it with the present, and that is where confusion starts.</p>',
     when:'<p>Any diff where you find yourself asking “yes, but what is above this?” — that question is exactly what this button is for.</p>'},

    /* ---------- the browse-at-a-point view ---------- */
    {sel:'[data-h="b-flash"]', view:'browse', place:'bottom', title:'The warning bar: you are in the past',
     what:'<p>GitHub’s way of saying this page is a historical snapshot, not the live repo. It appears whenever the URL pins a specific commit instead of a branch.</p>',
     why:'<p>The past looks exactly like the present — same layout, same file list — so without a banner people genuinely do not notice. Editing from here is the classic beginner accident, and the bar is the guard rail.</p>',
     how:'<p>Read the SHA in the bar to know exactly where you are. To return to the present, click the repo name in the breadcrumb or the button at the top right.</p>',
     fail:'<p>Bookmarking a <code>/tree/&lt;sha&gt;</code> URL as “my repo”. It will still work in a year and it will still show you today — permanently frozen — while you wonder why none of your new work appears.</p>',
     when:'<p>Any time you follow a link from a commit, an old issue comment or a message from a classmate. Check the bar before you believe what you are looking at.</p>'},

    {sel:'[data-h="b-missing"]', view:'browse', place:'top', title:'What is missing here is the point',
     what:'<p>At commit <code>3c9d114</code> your repo contained one file. The commit counter says 2, not 5. <code>journal\\week6.md</code> does not exist, because you had not made it yet.</p>',
     why:'<p>This is the proof that the history is real rather than decorative. GitHub is not showing you a saved copy of this page — it replayed the chain from the beginning and rebuilt the repo as of that link in it.</p>',
     how:'<p>Compare against the current front page: two files, five commits. The difference between those two screens is everything that happened in the last three hours.</p>',
     fail:'<p>Reading a missing file as a deleted file. Nothing was deleted — you are standing at a moment before it was born. A deletion would show as a red block in the diff of some later commit.</p>',
     when:'<p>“I know I wrote that paragraph somewhere.” Walk back through commits until it reappears, and now you know which commit removed it and what its message claimed.</p>'}
   ]
  },

  /* ============================ AFTER THE SCREEN ============================ */
  {type:'prose', title:'Reading a diff, condensed',
   html:
    '<p>Diffs are the one genuinely new skill in this module. Everything else on GitHub is a list of things; a diff ' +
    'is a notation, and notations have to be learnt once. Here is the whole notation.</p>' +
    '<ul>' +
      '<li><strong>Red, with a <code>-</code>:</strong> this line was in the file before and is not in it after.</li>' +
      '<li><strong>Green, with a <code>+</code>:</strong> this line is in the file after and was not in it before.</li>' +
      '<li><strong>No colour, no sign:</strong> unchanged context, shown only so you can see where you are.</li>' +
      '<li><strong>One red immediately followed by one green:</strong> a line that was edited. Git has no concept of ' +
      '“edited” — it can only say removed and added, so an edit always appears as one of each.</li>' +
      '<li><strong>Darker patches inside a line:</strong> word-level highlighting. GitHub worked out which part of ' +
      'the line actually differs and shaded only that.</li>' +
      '<li><strong>Two gutter columns:</strong> old line number on the left, new line number on the right. A red ' +
      'line has no right-hand number; a green line has no left-hand one.</li>' +
      '<li><strong><code>@@ -1,5 +1,6 @@</code>:</strong> the hunk header. Old file from line 1 for 5 lines; new ' +
      'file from line 1 for 6 lines.</li>' +
    '</ul>' +
    '<p>The one idea underneath all of that: <strong>Git thinks in lines</strong>. Not in words, not in paragraphs, ' +
    'not in meaning. It compares two versions of a file line by line and reports which lines differ.</p>' +
    '<p>That has a practical consequence for you specifically, because you write Markdown rather than code. If you ' +
    'write a 200-word answer as one long line, then fix one typo in it, the diff will show the entire 200 words as ' +
    'deleted and the entire 200 words as re-added, and nobody — including you — will be able to see what actually ' +
    'changed. Start each sentence on a new line in your journal files and every future diff becomes readable. ' +
    'Markdown joins them back together when it renders, so the output looks identical.</p>'
  },

  {type:'callout', variant:'moment', title:'Your “Fix formatting” commit is the perfect diff to learn on',
   html:
    '<p>The commit <em>Fix formatting in README for degree and trading alias</em> did something real: it took the ' +
    'one line holding both your degree and your trading alias and split it into two lines in the source.</p>' +
    '<p>The diff is honest about that. One line out, two lines in. But the rendered README on your repo’s front ' +
    'page <em>still</em> shows them run together, because in Markdown a single newline is not a line break — you ' +
    'need a blank line between the two, or two spaces at the end of the first one.</p>' +
    '<p>So the message says “Fix formatting”, the diff shows a genuine change, and the page still looks wrong. That ' +
    'is not a contradiction; it is why you read diffs instead of trusting messages. Module 3 owns the actual fix.</p>'
  },

  {type:'prose', title:'What the history is actually for',
   html:
    '<p>Three questions come up over and over. Each has a specific GitHub feature attached, and knowing which one ' +
    'to reach for is most of the value of this module.</p>' +
    '<h3>“It broke and I do not know when.”</h3>' +
    '<p>Open <code>/commits/main</code>, find the most recent commit from a time when it worked, and click the ' +
    '<code>&lt;&gt;</code> button on that row to see the whole project as it was. If it works there, the damage is ' +
    'somewhere between that commit and now — and you can halve the range by checking the commit in the middle, ' +
    'then halving again. Six commits take three checks. A hundred take seven.</p>' +
    '<h3>“Which version did I submit?”</h3>' +
    '<p>Sort by the timestamps and find the last commit before the deadline. That is what you submitted, whatever ' +
    'you have done since. If you want it to be findable without arithmetic, put a <strong>tag</strong> on it — ' +
    'Releases → Create a new release → name the tag something like <code>submitted-week6</code>. A tag is a ' +
    'permanent human-readable label stuck to one commit, and it survives everything you do afterwards.</p>' +
    '<h3>“Who changed this line, and why?”</h3>' +
    '<p>Open the file and switch to the <strong>Blame</strong> view. It answers the question line by line rather ' +
    'than commit by commit, which is the right shape when you already know <em>where</em> the problem is and need ' +
    'to know <em>when</em> it arrived. That is the screen below.</p>'
  },

  /* ==================== SCREEN 2: BLAME ==================== */
  {type:'screen',
   id:'blame-view',
   label:'github.com/jordan-lee/trading-journal-practice/blame/main/README.md — every line, and the commit that put it there',
   url:'github.com/jordan-lee/trading-journal-practice/blame/main/README.md',
   initial:'blame',
   inertNote:'That control is real on GitHub but inert here. The live parts of this screen are the Code / Blame tabs.',

   views:{
    blame:{ url:'github.com/jordan-lee/trading-journal-practice/blame/main/README.md', html:
      '<div class="gh-topnav"><button class="gh-topnav__hamburger" type="button" data-inert><svg class="octicon"><use href="#oct-three-bars"/></svg></button>' +
        '<span class="gh-topnav__mark"><svg class="octicon"><use href="#oct-mark-github"/></svg></span>' +
        '<span class="gh-searchbox"><svg class="octicon"><use href="#oct-search"/></svg><span class="gh-searchbox__ph">Type / to search</span><span class="gh-searchbox__slash">/</span></span>' +
        '<span class="gh-topnav__spacer"></span>' +
        '<span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span></div>' +

      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part" data-inert>trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
          '</div>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head">' +
            '<span data-h="tab-code" style="cursor:pointer">Code</span>' +
            '<span class="gh-muted">|</span>' +
            '<span class="gh-b" data-h="tab-blame" style="color:var(--gh-fg-default)">Blame</span>' +
            '<span class="gh-muted" style="margin-left:8px">11 lines · 3 commits</span>' +
          '</div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr data-h="bl-row1">' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top">' +
                '<span class="gh-avatar gh-avatar--16" data-user="jordan-lee"></span> ' +
                '<span class="gh-mono" data-h="bl-sha">3c9d114</span> ' +
                '<span class="gh-link">Create README.md</span></td>' +
              '<td class="gh-blob__ln">1</td><td class="gh-blob__code"># Jordan Lee -- desk profile</td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">2</td><td class="gh-blob__code"></td></tr>' +
            '<tr data-h="bl-row3">' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top">' +
                '<span class="gh-avatar gh-avatar--16" data-user="jordan-lee"></span> ' +
                '<span class="gh-mono">a4f21c8</span> ' +
                '<span class="gh-link">Fix formatting in README for degree…</span></td>' +
              '<td class="gh-blob__ln">3</td><td class="gh-blob__code">**Degree:** Economics (Finance), year 3</td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">4</td><td class="gh-blob__code">*Trading alias:* e.g. IronCondor</td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">5</td><td class="gh-blob__code"></td></tr>' +
            '<tr data-h="bl-row6">' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top">' +
                '<span class="gh-avatar gh-avatar--16" data-user="jordan-lee"></span> ' +
                '<span class="gh-mono">7b0e5da</span> ' +
                '<span class="gh-link">Update README.md</span></td>' +
              '<td class="gh-blob__ln">6</td><td class="gh-blob__code">## Markets I want to trade this semester</td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">7</td><td class="gh-blob__code">- Index futures, FX majors</td></tr>' +
            '<tr data-h="bl-row8">' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">8</td><td class="gh-blob__code">- all of the above 2</td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">9</td><td class="gh-blob__code"></td></tr>' +
            '<tr>' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">10</td><td class="gh-blob__code">## One market story that hooked me</td></tr>' +
            '<tr data-h="bl-row11">' +
              '<td style="width:1%;white-space:nowrap;padding:0 12px;border-right:1px solid var(--gh-border-muted);font-size:12px;color:var(--gh-fg-muted);vertical-align:top"></td>' +
              '<td class="gh-blob__ln">11</td><td class="gh-blob__code">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="tab-code"]', toast:'On real GitHub that drops the left column and gives you the plain file. Blame and Code are the same file, drawn with and without the history attached.'},
     {on:'[data-h="tab-blame"]', toast:'You are already on Blame — that is what the left column of commits is.'},
     {on:'[data-h="bl-sha"]', toast:'Clicking a SHA here opens that commit’s own page, with the diff. Blame is a launchpad into history, not a dead end.'}
   ],

   hotspots:[
    {sel:'[data-h="tab-blame"]', place:'top', title:'The Blame tab, and why it is called that',
     what:'<p>The same file, with a column bolted on the left saying which commit last touched each individual line, and who wrote it.</p>',
     why:'<p>The commit list answers “what happened, in order”. It cannot answer “this one line is wrong — when did it get like this?” without you opening every diff. Blame inverts the index: it goes line by line instead of commit by commit.</p>',
     how:'<p>Open any file and click <strong>Blame</strong> in the header, next to Code. Every line now carries the commit that introduced its current version.</p>',
     fail:'<p>Blame only shows the <em>most recent</em> commit to touch each line. A line rewritten five times shows only the fifth. There is a “view blame prior to this change” control on real GitHub for digging further back.</p>',
     when:'<p>Week 10, staring at a line in your journal file that contradicts your notes, wanting to know which sitting produced it.</p>',
     note:'<p>The name is literal — the underlying Git command is <code>blame</code>, and it was named as a joke about finding who to hold responsible. In practice it is used far more often to find who to <em>ask</em>. On a team, blame is how you locate the one person who remembers why a strange line exists.</p>'},

    {sel:'[data-h="bl-row1"]', place:'left', title:'A blamed line: 3c9d114 “Create README.md”',
     what:'<p>Line 1 has carried the same text since the commit that created the file. The left column names that commit, its message and its author.</p>',
     why:'<p>Attribution per line is the finest grain GitHub offers. It is the difference between “somebody changed this file at some point” and “this exact sentence arrived in this exact commit”.</p>',
     how:'<p>Click the commit message in the left column to open that commit and read its full diff. Blame tells you where to look; the commit page tells you what happened.</p>',
     fail:'<p>Blame follows lines, not meaning. Reformat a file — reindent it, rewrap it — and every line now blames <em>that</em> commit, burying the real history under a cosmetic one. This is why “tidy up whitespace” commits are kept separate from real changes.</p>',
     when:'<p>Reading anybody’s project, including your own, when a line makes no sense and you want the commit message that explains it.</p>'},

    {sel:'[data-h="bl-row3"]', place:'left', title:'Line 3 blames your formatting commit',
     what:'<p>Line 3 was last touched by <code>a4f21c8</code> — the commit whose diff you read a moment ago. Line 4 came from the same commit, so GitHub leaves its label blank rather than repeating itself.</p>',
     why:'<p>Repeating the same commit label on twenty consecutive lines would be noise. Blank means “same as the block above”, which is why blame reads as bands of colour on a real file.</p>',
     how:'<p>Read the bands. A file with four distinct bands has four eras; a file that is one solid band was written once and never revisited.</p>',
     fail:'<p>Reading a blank left column as “nobody wrote this line”. It means the line above owns it too. Every line in a committed file has an author, always.</p>',
     when:'<p>Judging how volatile a file is before you edit it. Many thin bands means many people keep changing this, so tread carefully.</p>'},

    {sel:'[data-h="bl-row8"]', place:'left', title:'Line 8 — where the placeholder came from',
     what:'<p><code>- all of the above 2</code> traces back to <code>7b0e5da</code>, the commit named “Update README.md”. That is a GitHub-generated message, so the record tells you when this arrived and nothing about why.</p>',
     why:'<p>This is the clearest possible argument for writing your own commit messages. Blame is only as informative as the messages it surfaces, and it surfaced a useless one.</p>',
     how:'<p>When blame hands you a message like this, the fallback is the diff: open <code>7b0e5da</code> and read what else changed in the same commit. Neighbouring changes are often the context the message failed to give.</p>',
     fail:'<p>Concluding the line was deliberate. It is template scaffolding you never replaced — and neither blame nor the diff can tell you that, because both record what happened, not what you meant.</p>',
     when:'<p>Right now: this is one of the two placeholders still sitting in your README, alongside <em>e.g. IronCondor</em>.</p>'},

    {sel:'[data-h="bl-row11"]', place:'left', title:'Line 11 — a whole paragraph on one line',
     what:'<p>Your entire flash-crash answer is a single line of the file, so blame can only attribute the whole paragraph to one commit. There is no finer detail available.</p>',
     why:'<p>Everything Git does is line-based, and blame inherits that completely. The granularity of your history is decided by how you break your lines, before you commit anything.</p>',
     how:'<p>Break long prose at sentence boundaries — one sentence, one line. Markdown still renders it as a single flowing paragraph, and now each sentence gets its own blame entry and its own diff line.</p>',
     fail:'<p>Leave it as one line and every future edit to that answer, however small, shows up as “the entire paragraph was replaced”. Fixing <code>correletaed</code> to <code>correlated</code> will produce a diff that highlights 160 characters to change three.</p>',
     when:'<p>The next journal entry you write. It costs nothing to press Enter at the end of each sentence and it makes every diff you produce for the rest of semester readable.</p>'}
   ]
  },

  /* ============================ FEARS, DEFUSED ============================ */
  {type:'prose', title:'“Can I delete a commit?” and other things that sound scarier than they are',
   html:
    '<p>The reason people are nervous around history is that it feels permanent in a threatening way. It is ' +
    'permanent — that is the feature — but almost everything you would want to undo has a safe, ordinary answer.</p>' +
    '<h3>You committed something wrong. Can you take it back?</h3>' +
    '<p>You <strong>revert</strong> it. GitHub adds a <em>new</em> commit that applies the exact opposite of the old ' +
    'one: every line the original added gets removed, every line it removed comes back. The project ends up in the ' +
    'state it was in before — and the history now contains both the mistake and the correction, in order.</p>' +
    '<p>That sounds like clutter. It is the opposite: it is the record telling the truth. The mistake happened. ' +
    'Pretending otherwise is how two people end up with different ideas of what the project even is.</p>' +
    '<h3>Revert versus reset</h3>' +
    '<ul>' +
      '<li><strong>Revert</strong> adds a commit that undoes an earlier one. Both stay visible. Safe on shared ' +
      'work, safe by default, and the only one of the two that GitHub offers you as a button in the browser.</li>' +
      '<li><strong>Reset</strong> moves the branch pointer backwards so that recent commits are no longer part of ' +
      'the story. It rewrites what the history claims happened. It is a local-Git operation, it is not something ' +
      'you can do by clicking on github.com, and on anything anyone else has already seen it causes real damage — ' +
      'their copy and yours now disagree about the past.</li>' +
    '</ul>' +
    '<p>The short version: reverting is booking a correcting entry. Resetting is going back and altering the ' +
    'original one. You will use the first constantly and should not touch the second for a long time.</p>' +
    '<h3>You committed something embarrassing</h3>' +
    '<p>It stays. Deleting the file in a later commit removes it from the <em>current</em> version and leaves it ' +
    'sitting in the history where anyone with access can read it. That is fine for a badly worded sentence and ' +
    'genuinely serious for anything secret.</p>'
  },

  {type:'callout', variant:'danger', title:'The one case where “history is permanent” is a problem',
   html:
    '<p>If you ever commit a password, an API key, a token, a database URL, or a spreadsheet full of somebody ' +
    'else’s personal data, deleting the file afterwards does not help. The old version is still in the chain, ' +
    'reachable by anyone who can read the repo, forever.</p>' +
    '<p>The correct response is to treat the secret as compromised and change it — revoke the key, rotate the ' +
    'password — rather than to try to scrub the history. Removing something from a commit chain is possible and ' +
    'it is genuinely difficult, and while you are attempting it the key is still live.</p>' +
    '<p>Your repo is Private, so the audience is currently just you. Module 9 covers what changes the day you make ' +
    'it Public, and it is the module to read before you flip that switch.</p>'
  },

  {type:'compare', title:'Two histories, six months later',
   left:{title:'A history of autogenerated messages',
     html:'<p><code>Update README.md</code> · <code>Update README.md</code> · <code>Update journal\\week6.md</code> · ' +
          '<code>Update README.md</code> · <code>Update journal\\week6.md</code></p>' +
          '<p>Every row tells you a file changed. Not one tells you what changed or why. The history has become an ' +
          'access log.</p>' +
          '<p>To find anything you now have to open diffs one by one and read them, which for twenty commits is ' +
          'twenty minutes of work that a good message would have saved entirely.</p>' +
          '<p>Worse, you cannot search it. Searching commit messages for <code>alias</code> returns nothing, ' +
          'because the word only exists inside diffs.</p>'},
   right:{title:'A history somebody wrote on purpose',
     html:'<p><code>Add week 6 journal entry on the RBA rate decision</code> · <code>Replace README ' +
          'placeholders with real answers</code> · <code>Fix correletaed typo in flash-crash paragraph</code> · ' +
          '<code>Split degree and trading alias onto separate lines</code></p>' +
          '<p>You can read that list and reconstruct the semester without opening a single diff. That is the whole ' +
          'test of a commit message.</p>' +
          '<p>It is also searchable. Six weeks later, “where did I write about the rate decision?” is one search ' +
          'of the commit messages away.</p>' +
          '<p>Module 3 owns how to write these. What matters here is knowing what you are optimising for: the ' +
          'person reading the list, who is almost always you.</p>'}
  },

  {type:'terms', title:'The words this module gave you',
   items:[
     {term:'Commit', html:'One recorded change: a set of line-level edits, plus an author, a timestamp, a message, a unique ID, and a pointer to its parent.'},
     {term:'SHA / commit hash', html:'A commit’s 40-character fingerprint, generated from its content and shown as the first 7 — <code>a4f21c8</code>. Not a sequence number.'},
     {term:'Parent', html:'The commit immediately before this one. The pointer that turns a pile of commits into a chain, and the thing a diff is measured against.'},
     {term:'Diff', html:'The line-by-line difference between two versions. Red minus lines came out, green plus lines went in.'},
     {term:'Hunk', html:'One contiguous block of changed lines plus a few lines of context, introduced by a <code>@@ … @@</code> header.'},
     {term:'Unified / Split', html:'Two ways of drawing the same diff. Unified is one column; split puts old and new side by side.'},
     {term:'Blame', html:'A file view that labels every line with the commit that last changed it. Named as a joke; used to find who to ask.'},
     {term:'Revert', html:'Undo a commit by adding a new commit that reverses it. Both remain in the history. The safe undo, and a button on GitHub.'},
     {term:'Reset', html:'Move the branch pointer backwards so recent commits fall out of the story. Rewrites history, not available in the web UI, dangerous on shared work.'},
     {term:'Tag', html:'A permanent human-readable label attached to one commit — <code>submitted-week6</code>. The answer to “which version did I hand in?”'}
   ]
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Say what is stored in a commit — changes, author, timestamp, message, ID, parent — and why the parent pointer makes the chain tamper-evident',
     'Read a SHA like <strong>a4f21c8</strong>, explain why it is 40 characters shown as 7, and copy the full one with the button',
     'Read the commit history page: date groups, author, message, relative time, the SHA box and the <strong>&lt;&gt;</strong> browse-at-this-point button',
     'Read a diff properly — red minus, green plus, edited lines as one of each, word-level highlighting, the <strong>@@</strong> hunk header, unified versus split',
     'Explain why Git thinks in lines, and why that means you should start each sentence on its own line in Markdown',
     'Pick the right tool for “when did it break?”, “which version did I submit?” and “who wrote this line?”',
     'Explain revert versus reset, and why a secret committed once is compromised even after you delete the file'
   ]
  }

  ]
});
