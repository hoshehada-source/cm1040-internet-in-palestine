# Version history — The Internet in Palestine

This file records how the website was developed in stages. Each version shows
what was added and why I moved on to the next one. (This supports the
development-process section of my report.)

## v0.1 — Static structure
- Built the three pages (Home, Timeline, Operators) as plain HTML with hard-coded
  content, plus a basic stylesheet.
- I wanted the layout right first before anything else. But the content was repeated
  in every HTML file, which got annoying to update, so next I moved it out.

## v0.2 — JSON data + my own template engine
- Moved the content into three JSON files (facts.json, timeline.json, operators.json).
- Wrote a small template engine in JavaScript (using `{{ }}` and a regular expression),
  and used `fetch()` to load the JSON over HTTP and render it.
- Data loads dynamically now, but at this point nothing was checking it was actually
  correct before showing it.

## v0.3 — JSON validation
- Added a validation function that checks the data is a list and that every item has the
  required fields before it is rendered; otherwise a short message is shown.
- Worked fine on desktop, but I hadn't touched mobile yet.

## v0.4 — Responsive design + accessibility
- Made the CSS mobile-first with a 768px breakpoint (navigation collapses, cards stack).
- Added accessibility features: a skip link, `aria` labels, and `aria-current` on the nav.
- Pages looked quite plain at this point, so images were next.

## v0.5 — Images + neutral, sourced language
- Added original SVG images: the flag, a mobile-tower illustration, and name badges for the
  operators, each with `alt` text.
- Feedback said the wording should sound more neutral and academic, not like a blog post,
  so I reworded the pages into a factual tone, with each claim attributed to a source
  (AFP, Reuters, DataReportal, IANA).
- Someone who reviewed it said it felt too static, needed something to interact with.

## v0.6 — Interactivity
- Added a search / filter box on the Timeline page (shows only events that match what the
  user types) and a "back to top" button that appears on scroll.
- Now the site actually responds to the user, not just displays content at them.

## v0.7 — Sources page (JSON-driven) + clickable citations
- Added a fourth page, "Sources", built from a new `sources.json` file using the same template
  engine, so the reference list is data-driven like the rest of the site.
- Added "Sources" as a fourth item in the navigation on every page.
- Turned the in-text citations, such as (Reuters, 2026), into links that jump to the matching
  entry on the Sources page.
- Content, interactivity and references were all in place now, so this felt like a good point
  to test everything properly.

## v0.8 — Refocused the content on my lifetime
- Adjusted the timeline to focus on developments during my lifetime (I was born in 2006), from
  2009 to 2026, as the brief requires ("during your own lifetime"). The 1990s founding is now kept
  only as brief background.
- Added recent, present-day events: COVID-19 and online learning in 2020, the 2022 4G/5G
  framework, and 2024 usage figures.
- This matches the brief better now.

## v0.9 — Real media and initial validation
- Replaced the placeholder graphics with real, credited media: the operator logos, a
  telecommunications-tower photo (Unsplash) and a Jerusalem panorama (Wikimedia, CC BY-SA 4.0).
- Ran HTML validation (W3C) and an accessibility check (achecks.org), and fixed the issues found.
- Passing its checks at this point, but still mostly just showing information - not much for a
  visitor to actually do beyond searching the timeline.

## v1.0 — Theme, text size, and a template-engine rewrite
- Added a dark/light mode toggle and a larger-text toggle, both using CSS custom
  properties, with no `localStorage` (kept deliberately simple - resets each visit).
- Rebuilt the template engine to use `loadTemplate()` with separate template files in
  `partials/`, instead of templates written inline in each page, so it works the same
  way as the reference material covered in the module.
- Functionally done at this stage, but no data visualisation anywhere - just cards, lists
  and text.

## v1.1 — Data visualisation: internet use over time
- Added a bar chart on the Home page showing the real percentage of people online in
  Palestine each year (World Bank Open Data, indicator IT.NET.USER.ZS), built from plain
  HTML buttons and CSS heights rather than SVG, so it stays keyboard-accessible.
- Added a count-up animation for the "Key facts" numbers, using `IntersectionObserver`,
  and respecting `prefers-reduced-motion`.
- The chart shows how many people were online, but not how fast their connection actually
  was. That felt like a gap in the story.

## v1.2 — Historical internet speed simulator
- Added a second Home-page feature: click a year to see the real, published internet
  connection speed in Palestine at that time (2009, 2010, 2017, 2021, 2022, 2024, 2025).
- Only years with a genuine, checked source are included (AKAMAI, PCBS, DataReportal/Ookla)
  - no estimated or invented values for the missing years.
- These numbers were interesting but still static - nothing let a visitor relate them to
  a real connection today, including their own.

## v1.3 — "Test Your Connection" page
- Added a fifth page: visitors can estimate their own download speed (timed against a file
  already on this site, with no outside service involved), then see it next to real, matched
  benchmark figures for Palestine and the UAE (both median fixed download speed, Ookla via
  DataReportal, January 2025 - so the comparison is fair).
- Added a download-time calculator that turns the three speeds into how long a 500 MB file
  would take, and a short note on the page explaining what the numbers do and do not mean
  (an ethical-presentation concern from Topic 9: not letting a real number create a
  misleading impression).
- Updated the navigation and footer sitemap on every page to include the new page, and added
  three new sources to the Sources page for the data used.

## v1.4 — Code quality review
- Went through every JavaScript file and changed `var` to `const` or `let` (around 86
  declarations across 8 files), matching the modern style already used in the reference
  template engine rather than mixing two different styles across the project.
- Added `defer` to every `<script>` tag so the browser can download them while it is still
  parsing the page, instead of pausing to run each one straight away.
- Reviewed the codebase for anything that looked more complex than it needed to be.
  Removed the count-up number animation (it used `IntersectionObserver` and
  `requestAnimationFrame`) because it added noticeable complexity for a small visual
  effect. Replaced a recursive function in the speed-test code with a plain, sequential
  chain of `.then()` calls, matching the style already used in the rest of the site.
- Code was cleaner after this, but I still hadn't actually run the validation and
  accessibility tools the coursework asks for.

## v1.5 — Testing: Lighthouse and W3C validation
- Ran Lighthouse on all five pages. Found that the chart bars on the Home page were too
  small to count as proper touch targets; fixed this with a minimum width and horizontal
  scrolling (accessibility score 95 -> 100). All five pages now score 100 for accessibility.
- Optimised images after Lighthouse flagged them: resized `tower.jpg` and `mtit.jpg` to
  the size they are actually shown at (158 KB -> 16 KB, and 33 KB -> 15 KB), converted the
  header photo to WebP (178 KB -> 110 KB), and added `width`/`height` and `loading="lazy"`
  to below-the-fold images to reduce layout shift.
- Restyled the Sources page entries to use the same card look (background, padding,
  rounded corners, shadow) as the rest of the site, instead of plain text with a
  coloured line.
- Ran the W3C Nu Html Checker on all five pages. All five passed with no errors or
  warnings.
- Code and markup were tested at this point, but I still needed to double-check a
  couple of facts on the Operators page against outside sources.

## v1.6 — Data accuracy check and version control
- Checked the facts on the Operators page against outside sources. The founding year
  given for the Ministry of Telecommunications (MTIT) did not match reliable sources, and
  a claim that a regulatory authority (PTRA) was "added in 2009" turned out to be
  inaccurate - PTRA was proposed in a 2009 law but was never actually established.
  Corrected the year and removed the unverifiable claim.
- Updated the Test Your Connection benchmarks to the most recent matching figures for
  Palestine and the UAE (end of 2025, from the same DataReportal/Ookla report), closer to
  the date visitors will actually be using the page.
- Set up a git repository to track changes to the project, with a `.gitignore` for system
  files, and pushed it to a private GitHub repository.
