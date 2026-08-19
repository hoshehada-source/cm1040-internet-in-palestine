# The Internet in Palestine — CM1040 Website

A four-page website about the history of the internet in Palestine (2006–2026).
Some of the content on every page is rendered from JSON data files using a template
engine written in plain JavaScript (no external library). The home page also shows
a small chart of real World Bank internet-use data, and every page has a dark/light
theme switch and a text-size switch.

## How to run it
The JavaScript loads the JSON and template files over HTTP, so the site must be
**served**, not opened straight from the file system.

1. Open this `website` folder in **VS Code**.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` → **"Open with Live Server"**.
4. The site opens at something like `http://127.0.0.1:5500/index.html`.

## File structure
```
website/
├── index.html · timeline.html · operators.html · sources.html
├── css/style.css
├── js/
│   ├── template-engine.js   The {{ }} template engine (built from scratch)
│   ├── validate.js          JSON data validation
│   ├── main.js              Loads a template, fetches JSON, validates it, renders it
│   ├── chart.js             Draws the internet-use chart from data/internet-usage.json
│   ├── theme.js             Dark / light mode switch
│   └── text-size.js         Larger text switch
├── partials/  facts-template.html · timeline-template.html · operators-template.html · sources-template.html
├── data/  facts.json · timeline.json · operators.json · sources.json · internet-usage.json
├── img/   (flag, tower photo, Jerusalem photo, operator logos)
├── credits.md               Media credits
└── VERSION-HISTORY.md
```

## How the JSON rendering works
1. `main.js` creates a `SimpleTemplateEngine` for a section and calls `loadTemplate()`,
   which uses `fetch()` to load the matching file from `partials/`.
2. Once the template is loaded, `main.js` uses `fetch()` again to load the JSON data file.
3. `validate.js` checks that the data is a list and that every item has the required fields.
4. `template-engine.js` fills in the template: `{{key}}` is replaced by a value,
   `{{#each list}} ... {{/each}}` repeats a block for each item in an array, and
   `{{#if key}} ... {{else}} ... {{/if}}` shows content conditionally.

## Note on data
To add a new timeline event, operator or fact, just add an object to the matching JSON file
in `data/` — the HTML does not need to change.
