/*
   main.js
   Loads the JSON for each page through the template engine
   and handles the menu, timeline search and back-to-top button.
   */

document.addEventListener("DOMContentLoaded", function () {

  // Load the facts on the home page
  const factsBox = document.getElementById("facts");
  if (factsBox) {
    const factsEngine = new SimpleTemplateEngine("partials/facts-template.html");

    factsEngine.loadTemplate().then(function () {
      fetch("data/facts.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const check = validateItems(data.facts, ["stat", "label", "source", "sourceId"]);
          if (!check.valid) {
            factsBox.innerHTML = "<p>Sorry, the data could not be shown: " + check.message + "</p>";
            return;
          }

          factsEngine.renderTemplate("facts", { facts: data.facts });
          setUpFactButtons();
        })
        .catch(function () {
          factsBox.innerHTML = "<p>Sorry, could not load the facts.</p>";
        });
    });
  }

  // Load the timeline
  const timelineBox = document.getElementById("timeline");
  if (timelineBox) {
    const timelineEngine = new SimpleTemplateEngine("partials/timeline-template.html");

    timelineEngine.loadTemplate().then(function () {
      fetch("data/timeline.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const check = validateItems(data.events, ["year", "title", "description"]);
          if (!check.valid) {
            timelineBox.innerHTML = "<p>Sorry, the data could not be shown: " + check.message + "</p>";
            return;
          }

          timelineEngine.renderTemplate("timeline", { events: data.events });
        })
        .catch(function () {
          timelineBox.innerHTML = "<p>Sorry, could not load the timeline.</p>";
        });
    });
  }

  // Load the operators
  const operatorsBox = document.getElementById("operators");
  if (operatorsBox) {
    const operatorsEngine = new SimpleTemplateEngine("partials/operators-template.html");

    operatorsEngine.loadTemplate().then(function () {
      fetch("data/operators.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const check = validateItems(data.operators, ["name", "founded", "role"]);
          if (!check.valid) {
            operatorsBox.innerHTML = "<p>Sorry, the data could not be shown: " + check.message + "</p>";
            return;
          }

          operatorsEngine.renderTemplate("operators", { operators: data.operators });
        })
        .catch(function () {
          operatorsBox.innerHTML = "<p>Sorry, could not load the operators.</p>";
        });
    });
  }

  // Load the sources
  const sourcesBox = document.getElementById("sources");
  if (sourcesBox) {
    const sourcesEngine = new SimpleTemplateEngine("partials/sources-template.html");

    sourcesEngine.loadTemplate().then(function () {
      fetch("data/sources.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const check = validateItems(data.sources, ["id", "cite", "title", "url"]);
          if (!check.valid) {
            sourcesBox.innerHTML = "<p>Sorry, the data could not be shown: " + check.message + "</p>";
            return;
          }

          sourcesEngine.renderTemplate("sources", { sources: data.sources });
        })
        .catch(function () {
          sourcesBox.innerHTML = "<p>Sorry, could not load the sources.</p>";
        });
    });
  }

  // Mobile menu button
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        menu.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  // Timeline search
  const searchBox = document.getElementById("timeline-search");
  if (searchBox) {
    searchBox.addEventListener("input", function () {
      runTimelineSearch(searchBox.value);
    });

    searchBox.addEventListener("keydown", function (keyEvent) {
      // Enter did nothing before, so the box felt stuck
      if (keyEvent.key === "Enter") {
        keyEvent.preventDefault();
        goToFirstMatch();
      }
      if (keyEvent.key === "Escape") {
        searchBox.value = "";
        runTimelineSearch("");
      }
    });
  }

  // Back to top button
  const toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        toTop.style.display = "block";
      } else {
        toTop.style.display = "none";
      }
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

// filters the timeline. A number only matches the year, so typing 2018
// no longer matches the "(AFP, 2018)" citation on the 2015 event
function runTimelineSearch(value) {
  const query = value.trim().toLowerCase();
  const yearOnly = /^\d+$/.test(query);
  const allEvents = document.querySelectorAll("#timeline .event");
  let count = 0;

  allEvents.forEach(function (oneEvent) {
    const year = oneEvent.querySelector(".event-year").textContent.toLowerCase();
    const title = oneEvent.querySelector("h3").textContent.toLowerCase();
    const description = descriptionWithoutCitation(oneEvent);
    let match;

    if (query === "") {
      match = true;
    } else if (yearOnly) {
      match = year.startsWith(query);
    } else {
      match = title.includes(query) || description.includes(query);
    }

    if (match) {
      oneEvent.style.display = "";
      count = count + 1;
    } else {
      oneEvent.style.display = "none";
    }
  });

  const message = document.getElementById("no-result");
  if (message) {
    if (count === 0) {
      message.style.display = "block";
    } else {
      message.style.display = "none";
    }
  }
}

// the citation is a source credit, not part of the event, so it is left out
function descriptionWithoutCitation(oneEvent) {
  const paragraph = oneEvent.querySelector(".event-body p");
  if (!paragraph) {
    return "";
  }

  let text = paragraph.textContent.toLowerCase();
  const cite = paragraph.querySelector(".cite");
  if (cite) {
    text = text.replace(cite.textContent.toLowerCase(), "");
  }
  return text;
}

// Enter jumps to the first result instead of doing nothing
function goToFirstMatch() {
  const allEvents = document.querySelectorAll("#timeline .event");

  for (let i = 0; i < allEvents.length; i++) {
    if (allEvents[i].style.display !== "none") {
      allEvents[i].scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }
}

// each key fact hides its source until the visitor asks for it
function setUpFactButtons() {
  const buttons = document.querySelectorAll(".fact-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const source = button.parentElement.querySelector(".fact-source");
      if (!source) {
        return;
      }

      if (source.hidden) {
        source.hidden = false;
        button.textContent = "Hide source";
        button.setAttribute("aria-expanded", "true");
      } else {
        source.hidden = true;
        button.textContent = "Where is this from?";
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
}
