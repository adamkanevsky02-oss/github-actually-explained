/* ============================================================================
   MODULE 03 — "Files, READMEs and making your first change"
   Owns teaching moments 1 (journal\week6.md), 2 (template scaffolding),
   3 (run-together degree line) and 4 (correletaed typo).
   Schema reference: build/modules/02-repo-anatomy.js
   ========================================================================== */

MODULES.push({
  id: 'files-and-readme',
  num: 3,
  title: 'Files, READMEs and making your first change',
  blurb: 'The pencil icon, the commit box, and the four things in your repo that are quietly wrong. By the end of this you will have fixed all of them.',
  goals: [
    'Write a README in Markdown without guessing — headings, bullets, bold, links and paragraph breaks',
    'Explain why two lines in your README render as one, and fix it two different ways',
    'Run the full edit loop in the browser: pencil, edit, commit message, commit, history',
    'Turn journal\\week6.md into a real journal/ folder, and say why GitHub has no “new folder” button'
  ],
  sections: [

  /* ====================================================================
     1. THE README
     ==================================================================== */
  {type:'prose', html:
    '<p class="tut-lead">Open a stranger’s repository and you get a list of filenames that mean nothing to ' +
    'you. That was GitHub in 2008, and it was a bad experience for everyone, so GitHub adopted a convention ' +
    'that already existed in software: a file called <code>README</code> that you are meant to read first. ' +
    'GitHub’s addition was to stop trusting people to open it, and render it automatically underneath the ' +
    'file list instead.</p>' +
    '<p>That is the entire mechanism. Name a file <code>README.md</code>, put it at the top level of the ' +
    'repo, and GitHub displays its contents on the repo’s front page, formatted, without anyone asking. It ' +
    'is not a setting. It is not something you turn on. It is a filename.</p>' +
    '<p>Which also means the reverse is true: rename it to <code>readme-notes.md</code> and the front page ' +
    'goes blank below the file list, with no error and no warning. Nothing broke — GitHub just stopped ' +
    'finding a file with the name it looks for.</p>'
  },

  {type:'prose', title:'What a good README actually answers',
   html:
    '<p>A README is not documentation and it is not an essay. It answers the questions a person has in the ' +
    'first ninety seconds, in the order they have them:</p>' +
    '<ul>' +
      '<li><strong>What is this?</strong> One sentence. Not “this repository contains files” — what the ' +
      'project is <em>for</em>.</li>' +
      '<li><strong>Who made it and in what context?</strong> Your name, the unit, the semester. On a ' +
      'coursework repo this is half the value.</li>' +
      '<li><strong>What is in here?</strong> A short list of the files or folders and what each one holds.</li>' +
      '<li><strong>What do I do with it?</strong> If there is anything to run, open or read first, say so.</li>' +
      '<li><strong>What state is it in?</strong> Finished, in progress, abandoned. Saves everyone the ' +
      'archaeology.</li>' +
    '</ul>' +
    '<p>Yours currently answers roughly one and a half of those, and two of the answers are still the ' +
    'assignment template’s example text. We will fix that in this module.</p>' +
    '<p>The reason to care is not tidiness. Your README is what a marker reads before they read anything ' +
    'else, and it is what a stranger reads <em>instead of</em> your files. On a repo you make public later, ' +
    'it is the only part most visitors will ever see.</p>'
  },

  {type:'callout', variant:'warn', title:'“No description, website, or topics provided”',
   html:
    '<p>That sentence sits in the About card on the right of your repo page, and it is a different thing ' +
    'from the README. The description is one line of text stored by GitHub itself, not a file in the repo.</p>' +
    '<p>It matters because the description is what travels. It shows next to the repo name on your profile, ' +
    'in search results, in the “Your repositories” list, and in a link preview when you paste the URL into ' +
    'a chat. The README does not appear in any of those places.</p>' +
    '<p>A repo with no description reads as abandoned — a name with nothing behind it. Fixing it is a ' +
    'thirty-second job: on the repo page, click the gear icon at the top of the About card, type ' +
    '<em>“the unit Trading and Dealing — desk profile and weekly trading journal”</em>, and save. Add the ' +
    'topics <code>finance</code> and <code>university</code> while you are there.</p>'
  },

  /* ====================================================================
     2. MARKDOWN FROM ZERO
     ==================================================================== */
  {type:'prose', title:'Markdown, taught from nothing',
   html:
    '<p>The <code>.md</code> on the end of <code>README.md</code> stands for Markdown. It is a way of ' +
    'writing formatted text using ordinary punctuation, invented in 2004 by John Gruber with one stated ' +
    'goal: a Markdown document should be readable as-is, by a human, with no rendering step. That goal ' +
    'explains every design decision in it, including the one that broke your degree line.</p>' +
    '<p>Word processors store formatting invisibly — bold is a hidden instruction wrapped around some ' +
    'characters. Markdown stores formatting <em>as</em> characters, so the file is plain text that any ' +
    'program can read, any tool can diff line by line, and Git can version properly. That is why every ' +
    'README on GitHub is Markdown and not a Word document.</p>' +
    '<p>Here is everything you need. Not a subset that will run out — this is genuinely enough to write ' +
    'any README you will ever write for coursework.</p>' +
    '<pre><code># A big heading      (one hash, the biggest — use once, at the top)\n' +
    '## A section heading (two hashes, smaller)\n' +
    '### A sub-heading    (three hashes, smaller again)\n' +
    '\n' +
    '- a bullet\n' +
    '- another bullet     (hyphen, then a SPACE, then the text)\n' +
    '\n' +
    '1. a numbered item\n' +
    '2. the next one\n' +
    '\n' +
    '**bold**             (two asterisks each side)\n' +
    '*italic*             (one asterisk each side)\n' +
    '`code`               (backticks — the key left of 1 on most keyboards)\n' +
    '\n' +
    '[link text](https://example.com)      (square brackets, then round)\n' +
    '\n' +
    '&gt; a quoted block      (greater-than sign, then a space)\n' +
    '\n' +
    '---                  (three hyphens on their own line = a horizontal rule)</code></pre>' +
    '<p>Two rules about the punctuation itself, because both catch people out. The space after ' +
    '<code>#</code> and after <code>-</code> is required — <code>#Heading</code> with no space is not a ' +
    'heading, it is the literal text “#Heading”. And the markers must sit at the <em>start</em> of the ' +
    'line; a hyphen halfway through a sentence is just a hyphen.</p>'
  },

  {type:'prose', title:'The rule that broke your README: blank lines control paragraphs',
   html:
    '<p>This is the one that matters, so read it slowly.</p>' +
    '<p><strong>In Markdown, pressing Enter once does not create a line break.</strong> Two lines of text ' +
    'with nothing but a single newline between them are treated as one paragraph, and rendered as one ' +
    'continuous line of prose. To start a new paragraph you leave a <strong>completely blank line</strong> ' +
    'between them.</p>' +
    '<p>That looks like a bug the first time it happens to you. It is deliberate, and the reason goes back ' +
    'to Markdown’s original goal. In 2004, plain-text email and code editors wrapped paragraphs at 70-odd ' +
    'characters by hand, so a single paragraph of prose was routinely typed across four or five physical ' +
    'lines. If Markdown honoured every newline, every one of those paragraphs would have rendered as a ' +
    'ragged column. So Markdown decided that where you happen to wrap a line is <em>your</em> business, ' +
    'and only a blank line means “new paragraph”.</p>' +
    '<p>There are two ways to force a line break inside one paragraph, and you should know both:</p>' +
    '<ul>' +
      '<li><strong>A blank line.</strong> Makes a new paragraph, with a gap of white space between the ' +
      'two. This is what you want almost every time.</li>' +
      '<li><strong>Two spaces at the end of the line</strong>, then Enter. Makes a hard line break with no ' +
      'gap — the next line starts directly underneath. It is invisible in your source, which is exactly ' +
      'why nobody discovers it by accident and why it is a nuisance to maintain.</li>' +
    '</ul>' +
    '<p>Now look at your own file with that in mind.</p>'
  },

  /* ====================================================================
     3. SCREEN A — SOURCE vs RENDERED
     ==================================================================== */
  {type:'prose', html:
    '<p>Below is your README shown two ways. <strong>Preview</strong> is what GitHub puts on your repo ' +
    'front page. <strong>Code</strong> is the actual characters in the file. The two toggle buttons at the ' +
    'top of the box are live — switch between them and watch which lines move.</p>'
  },

  {type:'screen',
   id:'md-source-preview',
   label:'README.md — the same file rendered and raw',
   url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md',
   initial:'preview',
   inertNote:'The live controls on this screen are the Preview / Code toggle and the numbered markers.',

   views:{

    preview:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
          '</div>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head">' +
            '<span class="gh-difftoggle" data-h="toggle"><button type="button" class="is-on" data-h="tab-preview">Preview</button>' +
            '<button type="button" data-h="tab-source">Code</button></span>' +
            '<span class="gh-muted" style="margin-left:10px">11 lines · 341 Bytes</span>' +
          '</div>' +
          '<div style="padding:24px 32px"><div class="gh-markdown">' +
            '<h1 data-h="pv-h1">Jordan Lee -- desk profile</h1>' +
            '<p data-h="pv-degree"><strong>Degree:</strong> Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor</p>' +
            '<h2 data-h="pv-h2">Markets I want to trade this semester</h2>' +
            '<ul><li>Index futures, FX majors</li><li data-h="pv-allabove">all of the above 2</li></ul>' +
            '<h2>One market story that hooked me</h2>' +
            '<p data-h="pv-story">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</p>' +
          '</div></div>' +
        '</div>' +
      '</div>'
    },

    source:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md?plain=1', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
          '</div>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head">' +
            '<span class="gh-difftoggle" data-h="toggle2"><button type="button" data-h="tab-preview">Preview</button>' +
            '<button type="button" class="is-on" data-h="tab-source">Code</button></span>' +
            '<span class="gh-muted" style="margin-left:10px">11 lines · 341 Bytes</span>' +
          '</div>' +
          '<table class="gh-blob__table"><tbody>' +
            '<tr data-h="src-h1"><td class="gh-blob__ln">1</td><td class="gh-blob__code"># Jordan Lee -- desk profile</td></tr>' +
            '<tr><td class="gh-blob__ln">2</td><td class="gh-blob__code"></td></tr>' +
            '<tr data-h="src-degree"><td class="gh-blob__ln">3</td><td class="gh-blob__code">**Degree:** Economics (Finance), year 3</td></tr>' +
            '<tr data-h="src-alias"><td class="gh-blob__ln">4</td><td class="gh-blob__code">*Trading alias:* e.g. IronCondor</td></tr>' +
            '<tr data-h="src-blank"><td class="gh-blob__ln">5</td><td class="gh-blob__code"></td></tr>' +
            '<tr data-h="src-h2"><td class="gh-blob__ln">6</td><td class="gh-blob__code">## Markets I want to trade this semester</td></tr>' +
            '<tr data-h="src-bullet"><td class="gh-blob__ln">7</td><td class="gh-blob__code">- Index futures, FX majors</td></tr>' +
            '<tr data-h="src-allabove"><td class="gh-blob__ln">8</td><td class="gh-blob__code">- all of the above 2</td></tr>' +
            '<tr><td class="gh-blob__ln">9</td><td class="gh-blob__code"></td></tr>' +
            '<tr><td class="gh-blob__ln">10</td><td class="gh-blob__code">## One market story that hooked me</td></tr>' +
            '<tr data-h="src-story"><td class="gh-blob__ln">11</td><td class="gh-blob__code">&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="tab-source"]', view:'source'},
     {on:'[data-h="tab-preview"]', view:'preview'}
   ],

   hotspots:[

    {sel:'[data-h="pv-degree"]', view:'preview', place:'right', title:'The degree line — one line, and it should be two',
     what:'<p>Your degree and your trading alias are printed as one continuous sentence: “Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor”. It reads as a run-on because it is a run-on.</p>',
     why:'<p>They are two separate lines in the file. Markdown joined them because only a blank line starts a new paragraph — a single newline is treated as an ordinary space.</p>',
     how:'<p>Click <strong>Code</strong> in the toggle above and look at lines 3 and 4. They are separate there and joined here. That gap between source and result is the whole lesson.</p>',
     fail:'<p>Left as-is, the one thing a marker reads first is a sentence that looks like you did not proofread it. It also swallows the <em>Trading alias</em> label, so the field reads like part of your degree.</p>',
     when:'<p>In about four minutes, when this module fixes it. And every time you write two consecutive lines in any Markdown file for the rest of your life.</p>'},

    {sel:'[data-h="pv-h1"]', view:'preview', place:'right', title:'The big heading with the line under it',
     what:'<p>The title of your README, rendered from a single <code>#</code> at the start of line 1. GitHub gives a top-level heading 32px type and a border underneath automatically.</p>',
     why:'<p>Headings give a document a skeleton a reader can skim. GitHub also builds the little table-of-contents menu on long READMEs directly from them, so headings are structure, not decoration.</p>',
     how:'<p>One <code>#</code> for the title, <code>##</code> for each section, <code>###</code> below that. Use exactly one <code>#</code> per file — it is the document’s name.</p>',
     fail:'<p>Forget the space after the hash and you get literal text reading “#Jordan Lee”, in body type, with no line under it. Nothing warns you; it just looks wrong.</p>',
     when:'<p>Line 1 of every README you write. Make it the project name, not “README”.</p>',
     note:'<p>The <code>--</code> in your title renders as two hyphens, not a dash. If you want a proper em dash, type the character itself: <code>—</code>. Markdown does not convert punctuation for you.</p>'},

    {sel:'[data-h="pv-allabove"]', view:'preview', place:'right', title:'“all of the above 2” — a leftover instruction',
     what:'<p>The second bullet under your markets heading. It is not an answer to anything; it is a fragment of the assignment template’s own wording that survived into your file.</p>',
     why:'<p>Templates are written with instructions and examples inline so you know what to type where. They only work if you delete the instructions as you replace them, and it is very easy to miss one.</p>',
     how:'<p>Replace it with a second real market: <code>- FX majors, especially AUD/USD</code>. Or delete the line entirely — two solid bullets beat three where one is noise.</p>',
     fail:'<p>A marker reading this sees the template text and knows exactly what happened. It is the same signal as leaving “Insert your name here” in an essay.</p>',
     when:'<p>Now, in the same edit that fixes the degree line. One commit, three fixes.</p>'},

    {sel:'[data-h="pv-story"]', view:'preview', place:'right', title:'The angle brackets around your flash-crash answer',
     what:'<p>Your answer is wrapped in <code>&lt;</code> and <code>&gt;</code>. Those came from the template as “put your answer between these markers”, and they are being printed on the page exactly as typed.</p>',
     why:'<p>Angle brackets are a real piece of Markdown syntax — they are how you drop raw HTML into a document. Markdown left yours alone here because <code>&lt;The 2010 flash crash…</code> is not a valid HTML tag, so it fell back to printing it. Different text inside those brackets can vanish entirely.</p>',
     how:'<p>Delete both brackets and keep the sentence. If you ever genuinely need a literal <code>&lt;</code>, write <code>&amp;lt;</code>.</p>',
     fail:'<p>This is the failure mode worth remembering: type <code>&lt;IronCondor&gt;</code> and Markdown reads it as an unknown HTML tag and renders <strong>nothing at all</strong>. Your text disappears from the page while sitting perfectly intact in the file, and you will hunt for a long time before suspecting the brackets.</p>',
     when:'<p>Any time text you definitely typed does not appear on the rendered page. Look for angle brackets first.</p>'},

    {sel:'[data-h="src-degree"]', view:'source', place:'right', title:'Line 3 in the source — where the trouble starts',
     what:'<p>The literal characters <code>**Degree:** Economics (Finance), year 3</code>. The double asterisks are the bold markers; everything between them renders bold and the asterisks themselves disappear.</p>',
     why:'<p>Markdown chose punctuation you would plausibly have used anyway. People were already typing *emphasis* in plain-text email long before Markdown existed — it standardised the habit rather than inventing a syntax.</p>',
     how:'<p><code>**bold**</code>, <code>*italic*</code>, and <code>***both***</code> if you must. The markers must touch the text: <code>** Degree **</code> with spaces inside does not work.</p>',
     fail:'<p>An unclosed marker leaks. One stray <code>**</code> and everything after it on the line turns bold, or the asterisks print as asterisks. Both look like a typo you did not notice.</p>',
     when:'<p>Every label in a README — <strong>Degree:</strong>, <strong>Unit:</strong>, <strong>Status:</strong> — is a bold run followed by plain text.</p>'},

    {sel:'[data-h="src-alias"]', view:'source', place:'left', title:'Line 4 — separate here, joined in the preview',
     what:'<p>A second, distinct line in the file. In the editor these are unambiguously two lines. On the rendered page they became one.</p>',
     why:'<p>Between line 3 and line 4 there is a single newline and nothing else. Markdown treats a lone newline as a space, so it glues the two together into one paragraph.</p>',
     how:'<p>Two fixes, both correct. Put a blank line between them — an actual empty line 4 — which makes two paragraphs with a gap. Or leave two trailing spaces at the end of line 3, which stacks them with no gap.</p>',
     fail:'<p>Adding more newlines than one but forgetting the line must be genuinely <em>empty</em>. A line containing a single space is not blank to Markdown, and the paragraphs stay joined while your source looks correct.</p>',
     when:'<p>Right now for this file, and again the first time you write an address, a list of key–value facts, or a poem in Markdown.</p>'},

    {sel:'[data-h="src-h2"]', view:'source', place:'right', title:'Line 6 — two hashes for a section',
     what:'<p><code>## Markets I want to trade this semester</code>. Two hashes: a second-level heading, 24px with its own bottom border.</p>',
     why:'<p>Heading levels are a hierarchy, not sizes you pick by taste. Screen readers and GitHub’s auto-generated contents menu both rely on them nesting properly.</p>',
     how:'<p>Descend one level at a time. <code>#</code> then <code>##</code> then <code>###</code>. Skipping from <code>#</code> straight to <code>####</code> because you liked the size is how documents become unnavigable.</p>',
     fail:'<p>Using bold text as a fake heading — <code>**Markets**</code> — looks similar and is structurally invisible. It will not appear in the contents menu and screen readers skip past it.</p>',
     when:'<p>Every section of every README. Yours has two; three or four would be better.</p>'},

    {sel:'[data-h="src-bullet"]', view:'source', place:'left', title:'Line 7 — a hyphen, a space, then the text',
     what:'<p><code>- Index futures, FX majors</code>. Hyphen, space, content. That is a bullet.</p>',
     why:'<p>The hyphen is what people already typed for lists in plain text. Markdown accepts <code>-</code>, <code>*</code> or <code>+</code> for exactly that reason. Pick one and be consistent.</p>',
     how:'<p>Nest a sub-bullet by indenting two spaces before the hyphen. Numbered lists use <code>1.</code>, <code>2.</code> — and Markdown renumbers them for you, so a list written entirely as <code>1.</code> still comes out 1, 2, 3.</p>',
     fail:'<p>Missing the space — <code>-US equities</code> — produces a plain paragraph starting with a hyphen, not a bullet. It is the single most common Markdown mistake.</p>',
     when:'<p>Any time a README lists things: files, markets, dependencies, weeks covered.</p>'},

    {sel:'[data-h="src-story"]', view:'source', place:'right', title:'Line 11 — and the typo hiding in it',
     what:'<p>The whole flash-crash answer on one long source line, brackets and all. Read to the end and there it is: <code>correletaed</code>.</p>',
     why:'<p>Long lines are normal and fine in Markdown. Because a single newline is not a break, you are free to write a whole paragraph on one physical line, and many people do.</p>',
     how:'<p>The typo is one character out of place and completely harmless — which makes it the ideal thing to practise the full edit-and-commit loop on. That is the next screen.</p>',
     fail:'<p>Nothing breaks. That is precisely the risk: small text errors in a README have zero consequences at the moment you make them and a real cost later, when the file is the first thing someone reads about you.</p>',
     when:'<p>In about two minutes. We are going to fix this exact word together, with a proper commit message, and watch it enter the history.</p>'}
   ]
  },

  /* ====================================================================
     4. TEACHING MOMENT 3 — THE DEGREE LINE
     ==================================================================== */
  {type:'callout', variant:'moment', title:'Teaching moment: the run-together degree line',
   html:
    '<p>You already spotted this. Your third commit is called <em>“Fix formatting in README for degree and ' +
    'trading alias”</em> — that is you, two hours ago, noticing the line looked wrong and going in to sort ' +
    'it out. That instinct was exactly right.</p>' +
    '<p>The fix did not take, because the thing that was wrong is invisible. You almost certainly put the ' +
    'two facts on two lines, saw them on two lines in the editor, committed, and found them still joined on ' +
    'the front page. Nothing you could see in the editor would have explained it.</p>' +
    '<p>The explanation is the paragraph rule: in Markdown a single newline is not a line break. Your lines ' +
    '3 and 4 have exactly one newline between them, so Markdown reads them as one paragraph typed across ' +
    'two lines and prints them as one. The gap has to be a genuinely empty line, or you need two spaces ' +
    'parked at the end of line 3 where no one can see them.</p>' +
    '<p>Which is to say: you diagnosed it correctly and the tool did not tell you the rule. That is the ' +
    'whole reason this tutorial exists.</p>'
  },

  {type:'compare', title:'The degree line: what you have, and what to type instead',
   left:{title:'Now — renders as one run-on line',
     html:'<pre><code>**Degree:** Economics (Finance), year 3\n' +
          '*Trading alias:* e.g. IronCondor</code></pre>' +
          '<p>One newline between them. Markdown reads that as a space and joins the two into a single ' +
          'paragraph.</p>' +
          '<p>Result on the page: <em>Degree: Economics (Finance), year 3 Trading alias: e.g. IronCondor</em> ' +
          '— with the alias label buried mid-sentence.</p>'},
   right:{title:'Fixed — a blank line makes two paragraphs',
     html:'<pre><code>**Degree:** Economics (Finance), year 3\n' +
          '\n' +
          '**Trading alias:** IronCondor</code></pre>' +
          '<p>Line 4 is now genuinely empty. Two paragraphs, rendered on two lines with a gap between ' +
          'them.</p>' +
          '<p>Also swapped: the italic label became bold so it matches <strong>Degree:</strong>, and ' +
          '“e.g.” is gone, because a real alias belongs there rather than the template’s example.</p>' +
          '<p>The alternative, if you want them stacked with no gap, is two trailing spaces at the end of ' +
          'the first line instead of the blank line. Same result visually, invisible in your source, and ' +
          'the reason experienced people prefer the blank line.</p>'}
  },

  /* ====================================================================
     5. TEACHING MOMENT 2 — TEMPLATE SCAFFOLDING
     ==================================================================== */
  {type:'callout', variant:'moment', title:'Teaching moment: the assignment template is still in your README',
   html:
    '<p>Three pieces of the original template survived into your file, and each one is doing a different ' +
    'kind of damage.</p>' +
    '<p><strong><code>e.g. IronCondor</code></strong> — the “e.g.” gives it away. That was the template ' +
    'showing you the <em>shape</em> of an answer, not asking you to keep it. As written, your README claims ' +
    'your trading alias is literally the phrase “e.g. IronCondor”.</p>' +
    '<p><strong><code>all of the above 2</code></strong> — a fragment of an instruction, sitting in a list ' +
    'of markets as if it were a market. It reads as a half-finished thought, because it is one.</p>' +
    '<p><strong>The <code>&lt;</code> and <code>&gt;</code> around the flash-crash answer</strong> — the ' +
    'template’s “fill this in” markers. In Markdown, angle brackets are the syntax for raw HTML, so leaving ' +
    'them there is not just untidy, it is actively risky. Yours happen to render because the text inside is ' +
    'not a valid tag. Put <code>&lt;IronCondor&gt;</code> in a Markdown file and the whole thing disappears ' +
    'from the page — present in the file, invisible on screen.</p>' +
    '<p>None of this is carelessness. It is the standard failure mode of filling in a template: you focus ' +
    'on writing the answer and the scaffolding around it becomes furniture you stop seeing.</p>'
  },

  {type:'prose', title:'Your README, corrected, in full',
   html:
    '<p>Here is the whole file with every one of those problems fixed. The paragraph breaks are real, the ' +
    'template text is gone, the brackets are gone, <code>correletaed</code> is spelled correctly, and there ' +
    'is a short section at the end describing what is in the repo — because a README that explains its own ' +
    'repo is doing its job.</p>' +
    '<pre><code># Jordan Lee — desk profile\n' +
    '\n' +
    '**Degree:** Economics (Finance), year 3\n' +
    '\n' +
    '**Trading alias:** IronCondor\n' +
    '\n' +
    '## Markets I want to trade this semester\n' +
    '\n' +
    '- Index futures\n' +
    '- FX majors, especially energy\n' +
    '\n' +
    '## One market story that hooked me\n' +
    '\n' +
    'The 2010 flash crash. Living through story and seeing how companies were\n' +
    'affected in real time, and how it correlated to their stock prices falling.\n' +
    '\n' +
    '## What is in this repo\n' +
    '\n' +
    '- `README.md` — this file: who I am and what I am trading this semester\n' +
    '- `journal/` — one Markdown file per week of the trading journal\n' +
    '\n' +
    'the unit Trading and Dealing, Semester 2 2026.</code></pre>' +
    '<p>A few choices in there worth naming. The markets are two separate bullets instead of one bullet ' +
    'containing a comma, because a list of two things should look like a list of two things. The story ' +
    'answer is wrapped across two source lines with no blank line between them — which, now that you know ' +
    'the rule, you can predict will render as one paragraph, and that is what you want. And the last ' +
    'section uses backticks around filenames, which renders them in monospace so a reader can tell a ' +
    'filename from a word.</p>'
  },

  /* ====================================================================
     6. SCREEN B — THE FULL EDIT LOOP (teaching moment 4)
     ==================================================================== */
  {type:'prose', title:'Now do it: the edit loop, end to end',
   html:
    '<p>Time to actually change something. We are going to fix <code>correletaed</code>, because it is the ' +
    'lowest-stakes change in your entire repo — one letter pair, no consequences, nothing to break. That ' +
    'makes it perfect for learning the loop on.</p>' +
    '<p>The screen below is genuinely wired. Start at the pencil icon, work through to the green ' +
    '<strong>Commit changes</strong> button, and the file list, the commit count and the history all update ' +
    'in front of you. The textarea is real — you can type in it.</p>' +
    '<p>Read the markers as you go; there are eleven and they follow the order you would click in.</p>'
  },

  {type:'screen',
   id:'edit-loop',
   label:'Fixing the typo: pencil → edit → commit → history',
   url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md',
   initial:'blob',
   inertNote:'Not wired in this lesson. The live path here is: pencil icon → the commit message field → the two radio choices → the green Commit changes button.',

   views:{

    /* ---------- 1. the file, with the pencil ---------- */
    blob:{ url:'github.com/jordan-lee/trading-journal-practice/blob/main/README.md', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
          '</div>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">Code</span>' +
            '<span class="gh-muted">|</span><span>Blame</span>' +
            '<span class="gh-muted" style="margin-left:8px">11 lines · 341 Bytes</span>' +
            '<span class="gh-blob__tools">' +
              '<span class="gh-btn gh-btn--invisible gh-btn--icon" data-h="pencil" title="Edit this file"><svg class="octicon"><use href="#oct-pencil"/></svg></span>' +
              '<span class="gh-btn gh-btn--invisible gh-btn--icon" data-h="trash" title="Delete this file"><svg class="octicon"><use href="#oct-trash"/></svg></span>' +
            '</span></div>' +
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
    },

    /* ---------- 2. the editor ---------- */
    edit:{ url:'github.com/jordan-lee/trading-journal-practice/edit/main/README.md', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">' +
          '<div class="gh-filepath">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span><span class="gh-filepath__cur">README.md</span>' +
            '<span class="gh-muted" style="font-size:12px">in main</span>' +
          '</div>' +
          '<span style="margin-left:auto;display:flex;gap:8px;align-items:center">' +
            '<span class="gh-btn" data-h="cancel-edit">Cancel changes</span>' +
            '<span class="gh-btn gh-btn--primary" data-h="commit-open">Commit changes…</span>' +
          '</span>' +
        '</div>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head">' +
            '<span class="gh-difftoggle"><button type="button" class="is-on" data-h="ed-tab-edit">Edit</button>' +
            '<button type="button" data-h="ed-tab-preview">Preview</button></span>' +
            '<span class="gh-blob__tools"><span class="gh-muted" style="font-size:12px">Soft wrap · Spaces · 2</span></span>' +
          '</div>' +
          '<div style="padding:8px" data-h="editor">' +
            '<textarea class="gh-input" spellcheck="false" style="width:100%;min-height:230px;font-family:var(--font-mono);font-size:12px;line-height:20px;resize:vertical">' +
              '# Jordan Lee -- desk profile\n\n**Degree:** Economics (Finance), year 3\n*Trading alias:* e.g. IronCondor\n\n' +
              '## Markets I want to trade this semester\n- Index futures, FX majors\n- all of the above 2\n\n' +
              '## One market story that hooked me\n&lt;The 2010 flash crash, Reading how the market fell nearly a thousand points in minutes and recovered the same day, and how little of it correletaed to anything in the real economy.&gt;</textarea>' +
          '</div>' +
        '</div>' +
        '<div class="gh-flash" style="margin-top:16px"><svg class="octicon"><use href="#oct-info"/></svg>' +
          '<span>Nothing here has been saved yet. Close this tab now and the edit is gone — an uncommitted ' +
          'change exists nowhere but in this browser.</span></div>' +
        '<div class="gh-blob" id="commit-box" style="margin-top:16px">' +
          '<div class="gh-blob__head"><span class="gh-b" style="color:var(--gh-fg-default)">Commit changes</span>' +
            '<span class="gh-muted" style="margin-left:8px;font-size:12px">1 file changed</span></div>' +
          '<div style="padding:16px">' +
            '<div class="gh-formrow" style="max-width:none" id="msgfield">' +
              '<span class="gh-formrow__label">Commit message</span>' +
              '<input class="gh-input" style="width:100%" data-h="commit-msg" value="Update README.md">' +
              '<div class="gh-formrow__hint">GitHub pre-filled this one for you. Click the box.</div>' +
            '</div>' +
            '<div class="gh-formrow" style="max-width:none">' +
              '<span class="gh-formrow__label">Extended description <span class="gh-muted" style="font-weight:400">(optional)</span></span>' +
              '<textarea class="gh-input" style="width:100%;min-height:56px;resize:vertical" data-h="commit-desc" placeholder="Add an optional extended description…"></textarea>' +
            '</div>' +
            '<div class="gh-radiorow is-on" data-h="radio-main"><span class="gh-radiorow__mark"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Commit directly to the <span class="gh-mono">main</span> branch</span>' +
              '<span class="gh-radiorow__sub" style="display:block">The change goes live on the official version straight away.</span></span></div>' +
            '<div class="gh-radiorow" data-h="radio-branch"><span class="gh-radiorow__mark"></span>' +
              '<span><span class="gh-radiorow__ttl" style="display:block">Create a <span class="gh-mono">new branch</span> for this commit and start a pull request</span>' +
              '<span class="gh-radiorow__sub" style="display:block">The change waits on a side copy until you merge it. Module 5.</span></span></div>' +
            '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">' +
              '<span class="gh-btn" data-h="commit-cancel">Cancel</span>' +
              '<span class="gh-btn gh-btn--primary" data-h="commit-do">Commit changes</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    },

    /* ---------- 3. after the commit ---------- */
    after:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-page">' +
        '<div class="gh-flash gh-flash--success" style="margin-bottom:16px" data-h="flash">' +
          '<svg class="octicon"><use href="#oct-check-circle"/></svg>' +
          '<span>Your changes have been committed to <b>main</b>.</span></div>' +
        '<div class="gh-repotoolbar">' +
          '<span class="gh-branchsel"><svg class="octicon"><use href="#oct-git-branch"/></svg><b>main</b>' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
          '<span class="gh-toolbar-right"><span class="gh-btn">Add file<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span>' +
            '<span class="gh-btn gh-btn--primary"><svg class="octicon"><use href="#oct-code"/></svg>Code' +
            '<svg class="octicon octicon--sm"><use href="#oct-triangle-down"/></svg></span></span>' +
        '</div>' +
        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head" data-h="newhead">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Fix correletaed typo in README</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">b71f0c2</span>' +
              '<span>·</span><span>just now</span>' +
              '<span class="gh-commitcount" data-h="newcount"><svg class="octicon"><use href="#oct-history"/></svg><b>6</b>&nbsp;Commits</span>' +
            '</span></div>' +
          '<div class="gh-filerow" data-h="row-readme-after"><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Fix correletaed typo in README</span>' +
            '<span class="gh-filerow__time">just now</span></div>' +
          '<div class="gh-filerow"><svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">journal\\week6.md</span>' +
            '<span class="gh-filerow__msg">Update journal\\week6.md</span>' +
            '<span class="gh-filerow__time">29 minutes ago</span></div>' +
        '</div>' +
        '<div class="gh-readmebox">' +
          '<div class="gh-readmebox__head"><h2><svg class="octicon"><use href="#oct-book"/></svg>README</h2></div>' +
          '<div class="gh-readmebox__body"><div class="gh-markdown">' +
            '<h1>Jordan Lee -- desk profile</h1>' +
            '<p><strong>Degree:</strong> Economics (Finance), year 3 <em>Trading alias:</em> e.g. IronCondor</p>' +
            '<h2>Markets I want to trade this semester</h2>' +
            '<ul><li>Index futures, FX majors</li><li>all of the above 2</li></ul>' +
            '<h2>One market story that hooked me</h2>' +
            '<p data-h="fixed-story">&lt;The 2010 flash crash, Living through story and seeing how companies were affected in real time, and how it correlated to their stock prices falling.&gt;</p>' +
          '</div></div>' +
        '</div>' +
      '</div>'
    },

    /* ---------- 4. the history, now six long ---------- */
    history:{ url:'github.com/jordan-lee/trading-journal-practice/commits/main', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">' +
          '<span class="gh-b" style="font-size:16px">Commits on main</span>' +
          '<span class="gh-btn" style="margin-left:auto" data-h="back-after">' +
            '<svg class="octicon"><use href="#oct-arrow-left"/></svg>Back to the repo</span></div>' +
        '<div class="gh-commitgroup"><div class="gh-commitgroup__date"><svg class="octicon"><use href="#oct-git-commit"/></svg>Commits on Aug 7, 2026</div>' +
        '<div class="gh-commitlist">' +
          '<div class="gh-commitrow" data-h="hist-new"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Fix correletaed typo in README</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed just now</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">b71f0c2</span></span></span></div>' +
          '<div class="gh-commitrow" data-h="hist-old"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Update journal\\week6.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 29 minutes ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">109d091</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Fix formatting in README for degree and trading alias</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 2 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">a4f21c8</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Update README.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">7b0e5da</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Create README.md</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">3c9d114</span></span></span></div>' +
          '<div class="gh-commitrow"><span class="gh-avatar gh-avatar--32" data-user="jordan-lee"></span>' +
            '<span class="gh-commitrow__main"><span class="gh-commitrow__title">Initial commit</span>' +
            '<span class="gh-commitrow__meta">jordan-lee committed 3 hours ago</span></span>' +
            '<span class="gh-commitrow__right"><span class="gh-shabox"><span class="gh-shabox__sha">e18b7f2</span></span></span></div>' +
        '</div></div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="pencil"]', view:'edit', explain:{title:'You are now in the editor, and nothing is saved',
       html:'<p>Look at the URL: it changed from <code>/blob/main/README.md</code> to ' +
            '<code>/edit/main/README.md</code>. <em>blob</em> means “show me this file”; <em>edit</em> means ' +
            '“let me change it”. Same file, different mode.</p>' +
            '<p>The line numbers are gone and the content is now sitting in a text box you can type into. ' +
            'Try it — change something. It is a real textarea.</p>' +
            '<p>Everything you do here lives in this browser tab and nowhere else. There is no autosave, no ' +
            'draft, no recovery. The green button at the top right is what turns your typing into a permanent ' +
            'part of the project.</p>'}},
     {on:'[data-h="commit-open"]', toast:'On the real site this pops the commit box up over the page. It is already open at the bottom of this screen so you can see every part of it at once — scroll down.'},
     {on:'[data-h="commit-cancel"]', view:'blob', toast:'Cancelled. Back to viewing the file, and nothing you typed survived — which is the point.'},
     {on:'[data-h="cancel-edit"]', view:'blob', toast:'Edit discarded. Back to viewing the file — and nothing you typed survived, which is the point.'},
     {on:'[data-h="commit-msg"]', once:true,
      replace:{target:'#msgfield', html:
        '<span class="gh-formrow__label">Commit message</span>' +
        '<input class="gh-input" style="width:100%" data-h="commit-msg" value="Fix correletaed typo in README">' +
        '<div class="gh-formrow__hint" style="color:var(--gh-success-fg)">Now it says what changed, in thirty characters.</div>'},
      toast:'Replaced GitHub’s default with a message that actually says something.'},
     {on:'[data-h="radio-branch"]',
      addClass:{target:'[data-h="radio-branch"]', class:'is-on'},
      removeClass:{target:'[data-h="radio-main"]', class:'is-on'},
      toast:'That would put the change on a side branch instead of main. Module 5 does this properly — switch back for now.'},
     {on:'[data-h="radio-main"]',
      addClass:{target:'[data-h="radio-main"]', class:'is-on'},
      removeClass:{target:'[data-h="radio-branch"]', class:'is-on'}},
     {on:'[data-h="commit-do"]', view:'after', explain:{title:'That was a commit. Here is exactly what changed.',
       html:'<p><strong>The file list header.</strong> The latest-commit bar now reads your message, ' +
            '<em>“Fix correletaed typo in README”</em>, with a brand-new ID <code>b71f0c2</code> and the ' +
            'time “just now”.</p>' +
            '<p><strong>The count.</strong> It says <b>6 Commits</b>. It said 5 a moment ago. Nothing was ' +
            'replaced — a row was added.</p>' +
            '<p><strong>The README row.</strong> Its message and timestamp updated, because this commit ' +
            'touched that file. <code>journal\\week6.md</code> still says “29 minutes ago”, because this ' +
            'commit did not touch it. Per-file timestamps, not per-repo.</p>' +
            '<p><strong>The rendered README.</strong> Scroll down: it says <em>correlated</em> now.</p>' +
            '<p>And the part you cannot see: the old spelling still exists. Commit <code>109d091</code> ' +
            'contains <em>correletaed</em> and always will. You did not overwrite anything — you added a ' +
            'newer version on top. Click <b>6 Commits</b> to see both sitting in the same list.</p>'}},
     {on:'[data-h="newcount"]', view:'history', explain:{title:'Six commits, and the typo is still in one of them',
       html:'<p>Top row is the one you just made. Second row, <code>109d091</code>, is the version with the ' +
            'typo in it — still there, still readable, still restorable.</p>' +
            '<p>This is the property that makes a repo different from a folder: correcting something does ' +
            'not erase the thing you corrected. The record shows both the mistake and the fix, in order, ' +
            'with times.</p>' +
            '<p>Now compare the message quality down the list. <em>“Update README.md”</em> and ' +
            '<em>“Update journal\\week6.md”</em> are the ones GitHub wrote for you. <em>“Fix formatting in ' +
            'README for degree and trading alias”</em> is one you wrote, and it is the only row in the ' +
            'bottom half that tells you anything.</p>'}},
     {on:'[data-h="back-after"]', view:'after'},
     {on:'[data-h="ed-tab-preview"]', toast:'Preview renders your Markdown before you commit it. Worth using every time — it is where you would have caught the degree line.'},
     {on:'[data-h="trash"]', toast:'The bin deletes the file. It is still a commit, and the file stays in the history — nothing on GitHub is truly deleted by this button.'}
   ],

   hotspots:[

    {sel:'[data-h="pencil"]', view:'blob', place:'top', title:'The pencil — start here',
     what:'<p>The edit button for the file you are looking at. It turns the read-only view into a text box you can type in, without downloading anything or installing Git.</p>',
     why:'<p>Git was built for people with a terminal. The pencil exists so someone with only a browser can still make a proper, recorded change — which is the entire reason your repo has five commits despite you never installing anything.</p>',
     how:'<p>Click it (it works here). You land in the editor with the whole file loaded and the cursor ready.</p>',
     fail:'<p>On a repository you do not have write access to, this icon quietly does something different: GitHub forks the repo to your account first and edits your copy. Very easy to miss, and then you wonder why your change is not on their project.</p>',
     when:'<p>Every small text change you will make this semester. For anything bigger than a paragraph, edit locally instead — this box has no spell-check worth the name and no undo history.</p>'},

    {sel:'[data-h="trash"]', view:'blob', place:'top', title:'The bin — deleting a file',
     what:'<p>Removes the file from the repository. It asks you for a commit message first, because deleting is a change like any other.</p>',
     why:'<p>Files stop being needed. Git treats “this file no longer exists” as just another recorded state, which is why the deletion has to be committed rather than just happening.</p>',
     how:'<p>Open the file → bin icon → confirm → write a message like <code>Remove unused draft notes</code> → Commit changes.</p>',
     fail:'<p>The thing everyone gets wrong: <strong>deleting a file does not delete it from history</strong>. Every previous version stays in every commit that contained it. If you ever commit a password or an API key, deleting the file afterwards fixes nothing at all.</p>',
     when:'<p>Rarely, and think for two seconds first. For a coursework repo, an outdated file is usually better renamed than removed.</p>'},

    {sel:'[data-h="editor"]', view:'edit', place:'top', title:'The editing box',
     what:'<p>A plain text box containing the entire file. Not a word processor: no fonts, no styling, no formatting toolbar. What you see is what is in the file.</p>',
     why:'<p>Markdown files are plain text, so the editor for them is a plain text box. Anything richer would have to invent hidden formatting, and hidden formatting is exactly what Markdown exists to avoid.</p>',
     how:'<p>Click in and type — it is a real textarea in this replica too. On the real site, <strong>Preview</strong> at the top shows you the rendered result before you commit.</p>',
     fail:'<p>Nothing here is saved as you type. No draft, no autosave, no “restore unsaved changes” when you come back. Close the tab mid-paragraph and the paragraph is gone.</p>',
     when:'<p>Fixing a typo, adding a bullet, pasting this week’s journal entry. Anything under about twenty lines.</p>',
     note:'<p>Use <strong>Preview</strong> before every commit that changes formatting. It costs one click and it is where you would have seen the degree line joining itself together.</p>'},

    {sel:'[data-h="commit-open"]', view:'edit', place:'bottom', title:'“Commit changes…” — the green button',
     what:'<p>The button that turns your typing into a permanent, recorded change. It does not commit immediately — it opens a box asking for a message first.</p>',
     why:'<p>Git refuses to record a change without a message. That is a deliberate design choice: a save point nobody can describe is a save point nobody can use six weeks later.</p>',
     how:'<p>On the real site, clicking it pops that box up over the page. This replica shows the box permanently open at the bottom of the screen instead, so you can read every part of it at once — scroll down to it.</p>',
     fail:'<p>Typing an edit and navigating away without pressing this. It is the most common way beginners lose work on GitHub, and there is no warning dialog on some browsers.</p>',
     when:'<p>The end of every edit. Green button, always, before you leave the page.</p>'},

    {sel:'[data-h="commit-msg"]', view:'edit', place:'right', title:'The commit message box — and what GitHub pre-fills',
     what:'<p>A one-line summary of what you just changed. GitHub pre-fills it with <code>Update README.md</code> so the button is never blocked.</p>',
     why:'<p>The pre-fill is a convenience that quietly costs you something. Four of your five existing commits say “Update” or “Create” plus a filename, because you accepted the default — and none of them tell you anything the file list did not already show.</p>',
     how:'<p>Click into the box (it is wired — try it) and watch the default become a message that says what actually happened.</p>',
     fail:'<p>Leaving the default on every commit. Your history becomes six rows of “Update README.md” and answering “when did I fix that?” means opening each one and reading the diff.</p>',
     when:'<p>Every commit. It costs five seconds and it is the only part of a commit written for a human.</p>'},

    {sel:'[data-h="commit-desc"]', view:'edit', place:'right', title:'The extended description',
     what:'<p>An optional second box for a longer explanation. The summary line answers “what”; this answers “why”, at whatever length it takes.</p>',
     why:'<p>Some changes need a paragraph — you tried something, it did not work, here is what you did instead. Git separates the two so tools can show a compact one-line history and still keep the detail.</p>',
     how:'<p>Leave it blank for a typo. Use it when the reason is not obvious from the change: <em>“Merged the two market bullets because the template asked for a list, not a sentence.”</em></p>',
     fail:'<p>Putting the whole explanation into the summary line instead. Long summaries get truncated in the file list and in the commit list, so the important half of your sentence is invisible where people actually read it.</p>',
     when:'<p>Maybe one commit in ten. Not for this one.</p>'},

    {sel:'[data-h="radio-main"]', view:'edit', place:'right', title:'“Commit directly to the main branch”',
     what:'<p>The selected option, and the one every edit you have ever made has used. Your change goes straight onto <code>main</code> — the official, current version of the project — the instant you press the green button.</p>',
     why:'<p>Working alone on a small repo, this is exactly right. There is nobody to review it and nothing depending on <code>main</code> staying stable, so a review step would be pure ceremony.</p>',
     how:'<p>It is selected by default. Leave it alone and press <strong>Commit changes</strong>.</p>',
     fail:'<p>On a shared repo, committing straight to <code>main</code> means your change is live before anyone has looked at it. It works until the day it does not, and then it has already broken whatever depended on it.</p>',
     when:'<p>Every edit you make on this repo this semester.</p>'},

    {sel:'[data-h="radio-branch"]', view:'edit', place:'right', title:'“Create a new branch and start a pull request”',
     what:'<p>The other option. Instead of changing <code>main</code>, GitHub makes a side copy of the project, puts your change on that, and offers to open a discussion about merging it back. Click it — the selection moves.</p>',
     why:'<p>Some changes should be visible and discussable before they become official. A branch lets you have the change fully written down and recorded without it being live.</p>',
     how:'<p>Select it, and GitHub invents a branch name like <code>jordan-lee-patch-1</code>. After committing you land on a “Compare &amp; pull request” screen instead of back on the repo.</p>',
     fail:'<p>Choosing this by accident and then wondering why your change is not on the front page. It is committed and it is safe — it is just on a branch nobody merged. This is the single most common “where did my change go” on GitHub.</p>',
     when:'<p>Module 5 and Module 6 use this properly. For today, leave <code>main</code> selected — click it again to switch back.</p>'},

    {sel:'[data-h="commit-do"]', view:'edit', place:'top', title:'The green “Commit changes” inside the box',
     what:'<p>The one that actually does it. Press this and the change is recorded permanently, with your message, your name and a timestamp.</p>',
     why:'<p>Two green buttons with the same words looks like a mistake, and it is not one. The first opens the box; this one confirms. The extra step exists because a commit cannot be quietly undone.</p>',
     how:'<p>Press it. The page redirects back to the repo and everything visible about the repo updates at once.</p>',
     fail:'<p>Nothing here is dangerous — a bad commit is fixed by making another commit. The only real trap is that in the browser, commit and push happen together, so the moment you press this it is on GitHub for anyone with access to see.</p>',
     when:'<p>Now. Press it and read what changed.</p>'},

    {sel:'[data-h="newhead"]', view:'after', place:'top', title:'What the commit did to the page',
     what:'<p>The latest-commit bar carries your message, your new SHA <code>b71f0c2</code>, “just now”, and a commit count that has gone from 5 to 6.</p>',
     why:'<p>GitHub puts the most recent change at the top of the front page because “is this alive, and what happened last?” is the first question anyone has about a repository.</p>',
     how:'<p>Click <b>6 Commits</b> (it works) to see the full history with your new commit on top of the old one.</p>',
     fail:'<p>Expecting your change to appear on your laptop too. It does not — a browser commit lives on GitHub only. If you had a local clone you would need to pull before your machine knew anything happened.</p>',
     when:'<p>Every time you commit. Glance at the count: if it did not go up, the commit did not happen.</p>'}
   ]
  },

  /* ====================================================================
     7. COMMIT MESSAGES
     ==================================================================== */
  {type:'prose', title:'How to write a commit message, and who reads them',
   html:
    '<p>The honest answer to “who reads commit messages” is: <strong>you, six weeks from now, at 2am, ' +
    'looking for the moment something broke</strong>. Not a marker, not a recruiter, not your group. You. ' +
    'And the version of you doing that reading has forgotten everything about today.</p>' +
    '<p>Which gives you the whole standard. A commit message is a note to a stranger who happens to share ' +
    'your name.</p>' +
    '<p>The convention, which is near-universal and worth adopting now:</p>' +
    '<ul>' +
      '<li><strong>Imperative mood.</strong> “Fix the typo”, not “Fixed the typo” or “Fixing typos”. The ' +
      'message completes the sentence “applying this commit will…”. It looks odd for a week and then ' +
      'stops.</li>' +
      '<li><strong>Around 50 characters</strong> for the summary line. It is not a hard limit, it is where ' +
      'GitHub starts truncating in narrow columns. Long messages get their tails cut off exactly where ' +
      'people read them.</li>' +
      '<li><strong>Say what and, where it is not obvious, why.</strong> “Fix correletaed typo in README” is ' +
      'what. “Split degree and alias onto separate lines so they render apart” is what plus why in one ' +
      'breath.</li>' +
      '<li><strong>No full stop at the end.</strong> It is a title, not a sentence. Minor, but it is the ' +
      'convention and consistency reads as care.</li>' +
    '</ul>' +
    '<p>You have already written one good one. <em>“Fix formatting in README for degree and trading ' +
    'alias”</em> is a genuinely good commit message — it names the file, the kind of change, and the ' +
    'specific fields affected. Six weeks from now that row is findable. Compare it to ' +
    '<em>“Update journal\\week6.md”</em>, which GitHub wrote, and which tells you a file changed — ' +
    'something the file list was already telling you.</p>'
  },

  {type:'compare', title:'The same commit, described two ways',
   left:{title:'What GitHub writes for you',
     html:'<pre><code>Update README.md\n' +
          'Update README.md\n' +
          'Update journal\\week6.md\n' +
          'Update README.md</code></pre>' +
          '<p>Four rows, no information. Every one of them tells you a file changed, which the file name ' +
          'beside it already said.</p>' +
          '<p>To find when you fixed a specific thing, you have to open each commit and read the diff. On ' +
          'four commits that is annoying. On sixty it is the reason people give up on their own history.</p>'},
   right:{title:'What you write in five extra seconds',
     html:'<pre><code>Add desk profile and markets section\n' +
          'Split degree and alias onto separate lines\n' +
          'Add week 6 journal entry\n' +
          'Fix correletaed typo in README</code></pre>' +
          '<p>Four rows that are a readable summary of the project’s life. You can answer “when did I ' +
          'write the week 6 entry?” without opening anything.</p>' +
          '<p>All imperative, all under fifty characters, none ending in a full stop. That is the entire ' +
          'convention, and you now know it.</p>'}
  },

  /* ====================================================================
     8. TEACHING MOMENT 1 — THE BACKSLASH
     ==================================================================== */
  {type:'callout', variant:'moment', title:'Teaching moment: journal\\week6.md is a file, not a folder — and here is the fix',
   html:
    '<p>Module 2 showed you the evidence. This module fixes it, and the fix takes about twenty seconds ' +
    'once you know the rule.</p>' +
    '<p><strong>The rule: GitHub creates folders from a forward slash <code>/</code> typed into the ' +
    'filename box, and from nothing else.</strong> Type <code>journal/week6.md</code> as a filename and ' +
    'GitHub makes a folder called <code>journal</code> with <code>week6.md</code> inside it. Type ' +
    '<code>journal\\week6.md</code> and you get one file whose name happens to contain a backslash, sitting ' +
    'at the top level next to README.md.</p>' +
    '<p>You typed the Windows separator, which is the natural thing to type if you have ever looked at a ' +
    'Windows file path. Git does not use it. Git paths use forward slashes on every operating system, ' +
    'including Windows, and to Git a backslash is just an ordinary character in a name — no different from ' +
    'a hyphen.</p>' +
    '<p>And notice what is <em>not</em> on the repo page: there is no “New folder” button. Not hidden, not ' +
    'in a menu — it does not exist. That absence is the next section, because it is the part that makes the ' +
    'rule make sense instead of just being a thing to memorise.</p>'
  },

  {type:'prose', title:'Why there is no “New folder” button anywhere on GitHub',
   html:
    '<p>Git does not have folders. It has files, and each file has a path. What you see as a folder is ' +
    'GitHub drawing a grouping around files whose paths happen to share a prefix.</p>' +
    '<p>So <code>journal/week6.md</code> is not “a file called week6.md inside a folder called journal”. It ' +
    'is one thing: a file whose full name is <code>journal/week6.md</code>. GitHub sees the slash, decides ' +
    'to draw a folder row called <code>journal</code>, and puts the file behind it. The folder is a display ' +
    'decision, not an object.</p>' +
    '<p>Two consequences follow immediately, and both surprise people:</p>' +
    '<ul>' +
      '<li><strong>An empty folder cannot exist.</strong> With no file inside, there is no path, so there ' +
      'is nothing for Git to record. This is why people put a placeholder file called <code>.gitkeep</code> ' +
      'inside folders they want to reserve — it is a pure workaround, not a feature.</li>' +
      '<li><strong>Deleting the last file deletes the folder.</strong> Not as a cleanup step — it happens ' +
      'the instant the last path with that prefix is gone, because there was never a folder to delete.</li>' +
    '</ul>' +
    '<p>Once you hold that, the interface stops looking like it is missing a button. A “New folder” button ' +
    'would have nothing to create.</p>'
  },

  {type:'compare', title:'One character, two completely different outcomes',
   left:{title:'journal\\week6.md — backslash',
     html:'<p><strong>One file.</strong> Its name, all of it, is <code>journal\\week6.md</code>. It sits at ' +
          'the top level of the repo with the grey document icon, sorted alphabetically among the files.</p>' +
          '<p>The URL gives it away: <code>…/blob/main/journal%5Cweek6.md</code>. <code>%5C</code> is how a ' +
          'URL spells a backslash, and no path separator ever appears as <code>%5C</code>.</p>' +
          '<p>Add <code>journal\\week7.md</code> next week and you get a <em>second</em> loose file. By week ' +
          '12 the repo root is a wall of near-identical names with no structure at all.</p>' +
          '<p>Clone it onto a Mac or a Linux machine and you get a file with a literal backslash in its ' +
          'name, which a great many tools refuse to open.</p>'},
   right:{title:'journal/week6.md — forward slash',
     html:'<p><strong>A folder and a file.</strong> The repo root shows a <code>journal</code> row with the ' +
          'blue folder icon, sorted above every file. Click it and <code>week6.md</code> is inside.</p>' +
          '<p>The URL reads <code>…/blob/main/journal/week6.md</code> — three clean steps, no escape ' +
          'codes.</p>' +
          '<p>Week 7 goes into the same folder automatically, just by typing the same prefix. The root ' +
          'stays two rows forever: <code>README.md</code> and <code>journal/</code>.</p>' +
          '<p>Works identically on every operating system, because forward slashes are what Git uses ' +
          'everywhere — including on Windows.</p>'}
  },

  {type:'steps', title:'Renaming it, click by click',
   items:[
     {label:'Open the file',
      html:'<p>On the repo front page, click <code>journal\\week6.md</code> in the file list. You land on ' +
           'the file view, with the content on screen and the path shown across the top.</p>'},
     {label:'Click the pencil',
      html:'<p>Top right of the file box, same icon you used for the typo. You are now in the editor, and ' +
           'the filename at the top has turned into an editable field — that is the part nobody notices.</p>'},
     {label:'Click into the filename field',
      html:'<p>The field contains <code>journal\\week6.md</code>. Put your cursor in it. Renaming a file on ' +
           'GitHub is done here, in the editor, not through a separate “Rename” command — there isn’t one.</p>'},
     {label:'Replace the backslash with a forward slash',
      html:'<p>Delete the <code>\\</code>, type <code>/</code>. The moment the slash lands, GitHub splits ' +
           'the field: <code>journal</code> jumps out to the left as a breadcrumb crumb and the field is ' +
           'left holding only <code>week6.md</code>. That visible split is GitHub telling you it has ' +
           'understood you mean a folder.</p>'},
     {label:'Scroll down and commit',
      html:'<p>Same commit box as before. Write something like <code>Move week 6 journal into journal ' +
           'folder</code>, leave <strong>Commit directly to main</strong> selected, press the green ' +
           'button.</p>'},
     {label:'Look at the file list',
      html:'<p>The loose file row is gone. In its place, above README.md, is a <code>journal</code> row ' +
           'with a blue folder icon. Same file, same contents, same history — new path.</p>'}
   ]
  },

  {type:'prose', html:
    '<p>Do it on the screen below. Click the filename field and watch the breadcrumb split, then commit and ' +
    'watch the file list turn into a folder.</p>'
  },

  /* ====================================================================
     9. SCREEN C — THE RENAME
     ==================================================================== */
  {type:'screen',
   id:'rename-journal',
   label:'Turning journal\\week6.md into a real journal folder',
   url:'github.com/jordan-lee/trading-journal-practice/edit/main/journal%5Cweek6.md',
   initial:'rename',
   inertNote:'The live parts of this screen are the filename field and the green Commit changes button.',

   views:{

    rename:{ url:'github.com/jordan-lee/trading-journal-practice/edit/main/journal%5Cweek6.md', html:
      '<div class="gh-page">' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">' +
          '<div class="gh-filepath" id="namebar" data-h="namebar">' +
            '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
            '<span class="gh-filepath__part">trading-journal-practice</span>' +
            '<span class="gh-muted">/</span>' +
            '<input class="gh-input gh-input--sm" data-h="namefield" style="width:230px;font-family:var(--font-mono)" value="journal\\week6.md">' +
            '<span class="gh-muted" style="font-size:12px">in main</span>' +
          '</div>' +
          '<span style="margin-left:auto;display:flex;gap:8px">' +
            '<span class="gh-btn">Cancel changes</span>' +
            '<span class="gh-btn gh-btn--primary" data-h="rename-commit">Commit changes…</span>' +
          '</span>' +
        '</div>' +
        '<p class="gh-muted" id="renamehint" style="font-size:12px;margin:0 0 14px">Click the filename box above and replace the <span class="gh-mono">\\</span> with a <span class="gh-mono">/</span>.</p>' +
        '<div class="gh-blob">' +
          '<div class="gh-blob__head">' +
            '<span class="gh-difftoggle"><button type="button" class="is-on">Edit</button>' +
            '<button type="button">Preview</button></span></div>' +
          '<div style="padding:8px">' +
            '<textarea class="gh-input" spellcheck="false" style="width:100%;min-height:130px;font-family:var(--font-mono);font-size:12px;line-height:20px;resize:vertical"># Week 6 journal\n\nNotes from this week go here.</textarea>' +
          '</div>' +
        '</div>' +
      '</div>'
    },

    renamed:{ url:'github.com/jordan-lee/trading-journal-practice', html:
      '<div class="gh-page">' +
        '<div class="gh-flash gh-flash--success" style="margin-bottom:16px">' +
          '<svg class="octicon"><use href="#oct-check-circle"/></svg>' +
          '<span>Your changes have been committed to <b>main</b>.</span></div>' +
        '<div class="gh-filebox">' +
          '<div class="gh-filebox__head">' +
            '<span class="gh-avatar gh-avatar--24" data-user="jordan-lee"></span>' +
            '<span class="gh-commitauthor">jordan-lee</span>' +
            '<span class="gh-commitmsg">Move week 6 journal into journal folder</span>' +
            '<span class="gh-commitmeta"><span class="gh-sha">d40ac93</span>' +
              '<span>·</span><span>just now</span>' +
              '<span class="gh-commitcount"><svg class="octicon"><use href="#oct-history"/></svg><b>7</b>&nbsp;Commits</span>' +
            '</span></div>' +
          '<div class="gh-filerow" data-h="folderrow">' +
            '<svg class="octicon gh-filerow__icon gh-filerow__icon--dir"><use href="#oct-file-directory-fill"/></svg>' +
            '<span class="gh-filerow__name">journal</span>' +
            '<span class="gh-filerow__msg">Move week 6 journal into journal folder</span>' +
            '<span class="gh-filerow__time">just now</span></div>' +
          '<div class="gh-filerow" data-h="readmerow-after">' +
            '<svg class="octicon gh-filerow__icon"><use href="#oct-file"/></svg>' +
            '<span class="gh-filerow__name">README.md</span>' +
            '<span class="gh-filerow__msg">Fix correletaed typo in README</span>' +
            '<span class="gh-filerow__time">2 minutes ago</span></div>' +
        '</div>' +
        '<div class="gh-flash" style="margin-top:16px"><svg class="octicon"><use href="#oct-light-bulb"/></svg>' +
          '<span>Folder rows sort above file rows and carry the message of the last commit that touched ' +
          'anything inside them. That is how you tell a folder from a file at a glance.</span></div>' +
      '</div>'
    }
   },

   actions:[
     {on:'[data-h="namefield"]', once:true,
      replace:{target:'#namebar', html:
        '<svg class="octicon" style="color:var(--gh-fg-muted)"><use href="#oct-file"/></svg>' +
        '<span class="gh-filepath__part">trading-journal-practice</span>' +
        '<span class="gh-muted">/</span>' +
        '<span class="gh-filepath__part" style="color:#54aeff">journal</span>' +
        '<span class="gh-muted">/</span>' +
        '<input class="gh-input gh-input--sm" data-h="namefield2" style="width:150px;font-family:var(--font-mono)" value="week6.md">' +
        '<span class="gh-muted" style="font-size:12px">in main</span>'},
      setText:{target:'#renamehint', text:'GitHub split the path the moment the slash landed. Nothing is committed yet — press the green button.'},
      explain:{title:'GitHub just split the name at the slash',
        html:'<p>A moment ago the field held <code>journal\\week6.md</code> as one lump of text. You typed a ' +
             'forward slash and GitHub immediately pulled <code>journal</code> out of the field and made it ' +
             'a breadcrumb crumb, leaving <code>week6.md</code> behind.</p>' +
             '<p>That split is the whole signal. It is GitHub saying “understood — that part is a folder”. ' +
             'With the backslash it never happened, and the absence of that split was the only warning you ' +
             'were ever going to get.</p>' +
             '<p>Nothing is committed yet. The file is still called <code>journal\\week6.md</code> in the ' +
             'repository until you press the green button.</p>'}},
     {on:'[data-h="rename-commit"]', view:'renamed', explain:{title:'A rename is a commit like any other',
       html:'<p>The file list has changed shape. The loose <code>journal\\week6.md</code> row is gone, and ' +
            'above README.md there is now a <code>journal</code> row with a blue folder icon. Click into it ' +
            'on the real site and <code>week6.md</code> is inside.</p>' +
            '<p>Git recorded this as an ordinary change — a path that used to exist no longer does, and a ' +
            'new path does. The commit count went up by one, the message you wrote is attached to it, and ' +
            'the old path is still visible in every commit before this one.</p>' +
            '<p>Next week you type <code>journal/week7.md</code> into the “Create new file” box and it lands ' +
            'in the same folder without you doing anything else. The structure maintains itself from here.</p>'}}
   ],

   hotspots:[

    {sel:'[data-h="namebar"]', view:'rename', place:'left', title:'The filename field — this is the rename tool',
     what:'<p>In the editor, the filename across the top is not a label. It is a text box, and changing it renames the file. Right now it holds <code>journal\\week6.md</code>.</p>',
     why:'<p>Renaming and editing are the same kind of change to Git — both alter the repository’s contents and both need to be committed. So GitHub put both in the same screen rather than inventing a separate rename flow.</p>',
     how:'<p>Click into the box (it is wired — try it) and replace the <code>\\</code> with a <code>/</code>. Watch what happens to the crumbs to the left of it.</p>',
     fail:'<p>Looking for “Rename” in a right-click menu or a kebab menu. There isn’t one, and people conclude GitHub cannot rename files. It can — it is just hidden inside the editor.</p>',
     when:'<p>Right now, to fix this file. Also any time a name turns out to be wrong, which is often, because naming things well on the first go is genuinely hard.</p>',
     note:'<p>Once the split happens, keep typing <code>/</code> characters and you can nest as deep as you like — <code>journal/2026/week6.md</code> creates two folders in one commit.</p>'},

    {sel:'[data-h="rename-commit"]', view:'rename', place:'bottom', title:'Committing the rename',
     what:'<p>The same green button as before. A rename is not a special operation with its own confirmation — it is a change to the repo, so it goes through the commit box like everything else.</p>',
     why:'<p>Because Git records paths, not folders, moving a file is genuinely the same kind of event as editing one. Treating them identically is what keeps the history a single readable list.</p>',
     how:'<p>Click it here and the rename lands. On the real site you would type a message first — <code>Move week 6 journal into journal folder</code> is a good one: imperative, specific, under fifty characters.</p>',
     fail:'<p>Renaming and then closing the tab without committing. The file keeps its old name and nothing tells you the rename evaporated.</p>',
     when:'<p>Immediately after the split. Do not leave the editor with a half-done rename in it.</p>'},

    {sel:'[data-h="folderrow"]', view:'renamed', place:'left', title:'The folder row — what you were trying to make',
     what:'<p>A <code>journal</code> row with a blue filled-folder icon, sitting above README.md. This is what the file list looks like when a path contains a forward slash.</p>',
     why:'<p>GitHub sorts folders above files and gives them a different coloured icon precisely so you can read structure at a glance without opening anything.</p>',
     how:'<p>Click it and the file list redraws showing the contents of <code>journal</code>, with a breadcrumb at the top to get back out.</p>',
     fail:'<p>Compare this to the row it replaced: grey document icon, sorted among the files, name containing a visible backslash. Those three differences were always on screen — knowing what they meant is the only thing that changed.</p>',
     when:'<p>Every week from now: week 7 through week 13 all land inside this one row instead of adding seven more lines to your repo root.</p>'},

    {sel:'[data-h="readmerow-after"]', view:'renamed', place:'left', title:'README.md, unaffected',
     what:'<p>Still there, still carrying the message from the typo fix you made earlier, timestamped separately.</p>',
     why:'<p>A commit records the whole project’s state, but the file list shows each file’s <em>own</em> last-touched commit. That is why two rows in the same repo show different messages and different times.</p>',
     how:'<p>Read the row left to right: name, the last commit that changed this file, when that was. Three facts per file, always in that order.</p>',
     fail:'<p>Reading mismatched timestamps as a sync problem. “just now” next to “2 minutes ago” is normal — it means one commit touched one file and not the other.</p>',
     when:'<p>Any time you want to know whether a specific file is stale, without digging through the full history.</p>'}
   ]
  },

  /* ====================================================================
     10. THE OTHER FILE OPERATIONS
     ==================================================================== */
  {type:'prose', title:'The three other things the “Add file” button does',
   html:
    '<p>Everything above was editing a file that already existed. There are three more operations you will ' +
    'need, and all of them live within one click of the repo front page.</p>' +
    '<h3>Create new file</h3>' +
    '<p><strong>Where:</strong> the grey <strong>Add file</strong> dropdown, top right of the file list, ' +
    'above the file box. First item.</p>' +
    '<p>You get a filename box and an empty text area. The filename box is the same one you just used for ' +
    'the rename, with the same slash rule — type <code>journal/week7.md</code> and the folder is handled ' +
    'for you. Then the same commit box, the same message field, the same green button.</p>' +
    '<p><strong>Get it wrong and:</strong> you forget the extension. A file called <code>week7</code> with ' +
    'no <code>.md</code> is stored fine but GitHub will not render the Markdown — it shows the raw ' +
    'characters, hashes and asterisks and all. Extensions are how GitHub decides how to display a file.</p>' +
    '<p><strong>You will use this</strong> every week of the semester, for the next journal entry.</p>' +
    '<h3>Upload files</h3>' +
    '<p><strong>Where:</strong> same <strong>Add file</strong> dropdown, second item. Drag files from your ' +
    'computer onto the page, or browse for them, then commit as usual.</p>' +
    '<p>This is how anything that is not text gets into a repo: a spreadsheet, a PDF, an exported chart, a ' +
    'CSV of prices. Git versions them, but it cannot show a line-by-line diff of a binary file — only that ' +
    'the file changed.</p>' +
    '<p><strong>Get it wrong and:</strong> the upload page has its own path box that defaults to wherever ' +
    'you were, so files land in the wrong folder. Size is the other trap — GitHub warns above 50MB and ' +
    'refuses above 100MB, and a big file stays in the history permanently even after you delete it.</p>' +
    '<p><strong>You will use this</strong> the first time the unit wants a spreadsheet of your trades ' +
    'alongside the journal.</p>' +
    '<h3>Delete a file</h3>' +
    '<p><strong>Where:</strong> not in the Add file menu. Open the file, then the bin icon next to the ' +
    'pencil. It behaves exactly like an edit — commit box, message, green button — because a deletion is a ' +
    'commit. Hotspot 2 on the edit screen above has the full story, including the part that matters most: ' +
    'deleting a file never removes it from the history.</p>'
  },

  {type:'terms', title:'The words this module added',
   items:[
     {term:'README.md', html:'The file GitHub renders automatically on a repo’s front page. It is a filename convention, not a setting — rename it and the front page goes blank.'},
     {term:'Markdown', html:'Plain-text formatting: <code>#</code> heading, <code>-</code> bullet, <code>**bold**</code>, <code>*italic*</code>, <code>`code`</code>, <code>[text](url)</code>. The <code>.md</code> extension.'},
     {term:'Paragraph break', html:'A completely empty line. One newline on its own is <em>not</em> a line break in Markdown — it renders as a space. This is what joined your degree and alias lines.'},
     {term:'Hard break', html:'Two spaces at the end of a line, then Enter. Forces a line break with no paragraph gap. Invisible in your source, which is why the blank line is usually the better choice.'},
     {term:'Blob', html:'Git’s word for a single file, visible in the URL: <code>/blob/main/README.md</code>. Its sibling <code>tree</code> means a folder.'},
     {term:'Path', html:'A file’s full name including every folder above it — <code>journal/week6.md</code>. Git stores paths, not folders, which is why folders appear and vanish on their own.'},
     {term:'Commit message', html:'The one-line summary attached to a commit. Imperative mood, roughly 50 characters, what and why, no full stop. Written for you in six weeks’ time.'},
     {term:'Extended description', html:'The optional second box under the commit message, for the paragraph of reasoning that does not fit in a title.'},
     {term:'Commit directly to main', html:'The default radio in the commit box: the change lands on the official version immediately. The alternative puts it on a new branch and opens a pull request instead.'}
   ]
  },

  {type:'callout', variant:'tip', title:'The four fixes, in one sitting',
   html:
    '<p>Everything this module covered applies to four real changes in your repo. Done in order they take ' +
    'about five minutes:</p>' +
    '<ol>' +
      '<li>Open <code>README.md</code> → pencil → paste the corrected version from the block above → ' +
      'commit as <code>Rewrite README with real answers and proper line breaks</code>. That clears the ' +
      'degree line, the template text, the angle brackets and the typo in one go.</li>' +
      '<li>Open <code>journal\\week6.md</code> → pencil → change the <code>\\</code> to <code>/</code> in ' +
      'the filename box → commit as <code>Move week 6 journal into journal folder</code>.</li>' +
      '<li>On the repo front page, click the gear on the <strong>About</strong> card → add a one-line ' +
      'description and the topics <code>finance</code> and <code>university</code>.</li>' +
      '<li>Look at your commit list afterwards. Two useful messages sitting on top of four useless ones — ' +
      'that is the difference this module was about.</li>' +
    '</ol>' +
    '<p>Leave the repo Private for now. Module 9 is where that decision gets made properly.</p>'
  },

  {type:'recap', title:'What you can now do',
   items:[
     'Say what a README is, why GitHub renders it automatically, and what a good one answers',
     'Write Markdown from memory — headings, bullets, bold, italic, code, links and quotes',
     'Explain why a single newline is not a line break, and fix a run-together line two different ways',
     'Spot leftover template text and know why <strong>&lt;angle brackets&gt;</strong> are dangerous in Markdown, not just untidy',
     'Run the full edit loop in the browser: pencil → edit → message → commit → watch the history grow',
     'Write a commit message someone can use: imperative, about 50 characters, what and why',
     'Say what “Commit directly to main” does, and what the other radio button would have done instead',
     'Rename <strong>journal\\week6.md</strong> to <strong>journal/week6.md</strong> and explain why GitHub has no “New folder” button',
     'Create a file, upload a file and delete a file — and know that deleting never removes it from history'
   ]
  }

  ]
});
