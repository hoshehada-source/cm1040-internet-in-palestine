# The Internet in Palestine

A five-page, data-driven website about how internet and mobile access developed
in Palestine between 2006 and 2026.

**Live site:** https://internet-in-palestine.netlify.app
**Designs:** https://internet-in-palestine-wireframes.netlify.app
(low fidelity) · https://internet-in-palestine-wireframes.netlify.app/hifi/ (high fidelity)

Built with plain HTML, CSS and JavaScript. No frameworks, no libraries, no build step.

---

## What it does

**A custom template engine.** Content is kept out of the markup, in seven JSON
datasets, and rendered by a small engine written for this project
(`js/template-engine.js`). It handles `{{variable}}`, `{{#each}}` loops and
`{{#if}}` / `{{else}}` conditions, and escapes values at the template boundary.

**JSON validation before render.** `validateItems()` (`js/validate.js`) checks
that the data is a non-empty array and that every item carries the fields the
template needs. If something is missing, the page shows a readable message
instead of rendering half of itself.

**A keyboard-accessible chart.** The internet-use chart on the home page is
built from real HTML buttons, not canvas or SVG, so every bar can be reached
with Tab, activated with Enter, and announced by a screen reader. It has a
value scale down the side and its own label per bar.

**A browser-side speed test.** The *Test Your Connection* page measures the
visitor's download speed with `fetch()` and `performance.now()`, runs three
times and takes the median, then compares the result with published national
figures for Palestine and the UAE. Nothing is sent to an outside service.

**Theme and text size.** A dark theme and a larger-text option, both saved in
`localStorage` so the choice carries between pages.

---

## Standards

| | |
| --- | --- |
| Lighthouse accessibility | 100 on all five pages |
| W3C Nu HTML Checker | no errors or warnings |
| Layout | mobile-first CSS, one breakpoint at 768px |
| Tested on | Chrome and Safari (macOS), iPhone, Android |
| Verified manually | VoiceOver and keyboard-only navigation |

Skip link, ARIA labelling, visible focus outlines, and a 24px minimum touch
target on the chart bars.

---

## Structure

```
website/
  index.html  timeline.html  operators.html  test-connection.html  sources.html
  css/style.css
  js/     template-engine.js  validate.js  main.js  chart.js
          speed.js  test-connection.js  theme.js  text-size.js
  data/   seven JSON datasets
  partials/  the templates the engine loads
  img/
  VERSION-HISTORY.md   credits.md   README.md
wireframes/
  the five low-fidelity wireframes
  hifi/   the same five pages in high fidelity
```

## Running it locally

The JavaScript loads the JSON over HTTP, so opening `index.html` straight from
the file system will not work. Serve the `website` folder instead:

```bash
cd website
python3 -m http.server 8000
```

Then open http://localhost:8000. The Live Server extension in VS Code does the
same thing.

---

## Sources and credits

Every figure on the site links to a cited source, listed on the Sources page
(World Bank, DataReportal, PCBS, AFP, Reuters, UNESCO, ACM, IANA).
Photographs and operator logos are credited in
[`website/credits.md`](website/credits.md).

The Palestinian flag graphic is my own.

---

## About this project

Coursework for CM1040 Web Development, University of London, September 2026.
Written by Huda Shehada.

It is here as part of my portfolio. Please do not submit any of it as your own
work.
