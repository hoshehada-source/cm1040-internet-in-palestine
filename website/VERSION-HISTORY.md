# Version history — The Internet in Palestine
## v0.1 — Static structure
Home, Timeline, Operators pages, plain HTML, one stylesheet. Content hard-coded for now.

## v0.2 — JSON data + my own template engine
Moved content into facts.json, timeline.json, operators.json. Wrote a small template
engine ({{ }} + regex), used fetch() to load the JSON.

## v0.3 — JSON validation
Checks the data is a list and has the required fields before rendering.

## v0.4 — Responsive design + accessibility
Mobile-first CSS, 768px breakpoint. Skip link, aria labels, aria-current on nav.

## v0.5 — Images + neutral, sourced language
Original SVG images with alt text. Reworded content into a factual, sourced tone
(AFP, Reuters, DataReportal, IANA).

## v0.6 — Interactivity
Search/filter box on the Timeline page. Back-to-top button.

## v0.7 — Sources page + clickable citations
New Sources page from sources.json. Inline citations now link to it.

## v0.8 — Refocused the content on my lifetime
Timeline narrowed to 2009–2026 . Added COVID-19, the 2022 4G/5G
framework, 2024 usage figures.

## v0.9 — Real media and initial validation
Real credited photos and operator logos. Ran W3C validation + achecks.org, fixed
what came up.

## v1.0 — Theme, text size, template-engine rewrite
Dark/light toggle, larger-text toggle.
Rebuilt the template engine with loadTemplate() and separate files in partials/.

## v1.1 — Data visualisation: internet use over time
Bar chart on the Home page (World Bank data, IT.NET.USER.ZS). HTML buttons + CSS
heights, keyboard-accessible. Count-up animation for the Key Facts numbers.

## v1.2 — Historical internet speed simulator
Click a year, see the real published internet speed at that time. Only years with
a checked source (Akamai, PCBS, DataReportal/Ookla).

## v1.3 — "Test Your Connection" page
Visitors estimate their own download speed, compare to Palestine/UAE benchmarks.
Added a calculator for how long a 500 MB file would take.

## v1.4 — Code quality review
var to const/let across all JS files. Added defer to script tags. Removed the
count-up animation.

## v1.5 — Testing: Lighthouse and W3C validation
Fixed a touch-target issue on the Home page chart (95 → 100 accessibility, all
pages now 100). Optimised images Lighthouse flagged. W3C Nu Html Checker: fixed!.

## v1.6 — Data accuracy check and version control
Fixed the MTIT founding year and removed an inaccurate PTRA claim. Updated the Test
Your Connection benchmarks to the latest figures. Set up git, pushed to a private
GitHub repository.

## v1.7 — Theme and text size remembered between pages
Moving between pages reset the dark theme and the larger text back to the default.
Saved both choices in localStorage so they carry over. Tidied the comments at the
top of each JS file.
