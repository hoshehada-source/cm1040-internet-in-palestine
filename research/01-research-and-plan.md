# Stage 1 — Background Research and Planning
**Module:** CM1040 Web Development
**Student:** Huda Shehada
**Website topic:** The internet in Palestine, during my lifetime (2006–2026)

---

## A. Background research — fact sheet and notes

I chose Palestine because it is where my family is from and because its recent internet
history is a clear, well-documented story. The brief asks for the history "during your own
lifetime", so I focused on the period from 2006 (the year I was born) to 2026, and treated
the earlier years only as background.

### Background before my lifetime (context only)
- **1994** — PALNET, the first internet service provider in Palestine (ACM, 2000).
- **1995** — Paltel (Palestine Telecommunications Company) founded.
- **1999** — Jawwal, the first Palestinian mobile operator, created by Paltel.
- **2000** — the **.ps** country domain goes live, with gov.ps first (IANA, 2000).

### Key events during my lifetime (2006–2026) — the focus
| Year | Event | Source |
|------|-------|--------|
| 2009 | Wataniya (now Ooredoo) launches — a second mobile operator | — |
| 2015 | Agreement on the 2100 MHz frequency band (opens the way to 3G) | AFP, 2018 |
| 2017 | Ooredoo begins operating in Gaza | — |
| 2018 | **3G reaches the West Bank** (23 Jan); Gaza not included | AFP, 2018 |
| 2019 | ~71% online, but only ~7% had fixed broadband — mostly mobile access | World Bank, 2021 |
| 2020 | COVID-19 school closures → distance learning; internet becomes essential | UNESCO, 2020 |
| 2021 | World Bank "Digital West Bank and Gaza" project ($20m for fibre + e-gov) | World Bank, 2021 |
| 2022 | Israel–PA framework for future 4G and 5G | Reuters, 2026 |
| 2024 | ~88.6% online (4.82m users); ~4.46m mobile connections | DataReportal, 2024 |
| 2026 | **4G upgrade for the West Bank approved** | Reuters, 2026 |

### Notes / the main theme
The story during my lifetime is mostly about **mobile access and its pace**: 3G arrived only
in 2018, later than in many countries, and access has long been mobile-first rather than
fixed-broadband. One reason often given is that Palestinian operators license their radio
frequencies through arrangements with Israel. Despite this, internet use is now high (~88.6%).
This is a clear real-world example of the **digital divide** discussed in the module.

---

## B. Plan for each page of the website

The site has **four pages**. Part of every page is generated from a JSON data file using a
template engine, so the content is data-driven.

| Page | Content | Rendered from JSON |
|------|---------|--------------------|
| **Home** (`index.html`) | Short intro + key-fact cards + a background section | `facts.json` |
| **Timeline** (`timeline.html`) | The main story: events 2009–2026, plus a search box and a side note | `timeline.json` |
| **Operators** (`operators.html`) | The main organisations (Paltel, Jawwal, Ooredoo, MTIT regulator) + access today | `operators.json` |
| **Sources** (`sources.html`) | The reference list; in-text citations link here | `sources.json` |

**Template engine:** the simple engine I built myself in JavaScript (`{{ }}` placeholders +
a regular expression), no external library, because the brief requires the JavaScript to
fetch the JSON over HTTP at run time. A validation function checks the required fields before
anything is rendered.

---

## C. Media plan (with sources / credits)

To avoid copyright problems, the images on the site are **original SVG graphics I created
myself**, so they can be freely used and are credited as my own work:

| Media | Where | Credit |
|-------|-------|--------|
| Palestine flag | Home hero | Original SVG, created by me (the flag design itself is a public national symbol) |
| Mobile-tower illustration | Timeline side note | Original SVG, created by me |
| Operator name badges (Paltel, Jawwal, Ooredoo, MTIT) | Operators page | Original SVG badges I designed (I did **not** use the companies' copyrighted logos) |

All **text facts** are cited to published sources on the Sources page (see the reference list
in the report). If any real photo or logo is added later, I will download it from an official
source and cite it as editorial use.

---

## D. Plan for the later stages (project-management techniques)

I used a **staged plan with milestones** plus a small **Kanban board** (To Do → In Progress →
Done), and I kept a **version history** (v0.1 → v1.0) recording what changed at each step and
why — both techniques covered in the module.

| Stage | Deliverable | Milestone |
|-------|-------------|-----------|
| 1 | This research + plan | done |
| 2 | Wireframes (desktop + mobile) + feedback from people | feedback collected, changes made |
| 3 | Build the 4 pages (JSON + template engine + validation + interactivity) | site runs on Live Server |
| 4 | HTML validation + accessibility tests (before/after) | issues fixed |
| 5 | Report (max 1500 words) + zipped code | submitted on Coursera |

**Main risk:** the JSON + template step. **Mitigation:** build each page with plain HTML first,
then add the JSON rendering, so any problem is easy to locate.

---

## Sources (full details on the site's Sources page and in the report)
ACM (2000) · IANA (2000) · AFP/Phys.org (2018) · UNESCO (2020) · World Bank (2021) ·
DataReportal (2024) · Reuters/Jerusalem Post (2026).
