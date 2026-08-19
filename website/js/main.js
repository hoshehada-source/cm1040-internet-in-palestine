/* ============================================================
   main.js
   Loads each template, fetches its matching JSON file, checks it,
   then renders it. Also the nav toggle, timeline search and the
   back-to-top button.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ===== Load the facts on the home page =====
  const factsBox = document.getElementById("facts");
  if (factsBox) {
    const factsEngine = new SimpleTemplateEngine("partials/facts-template.html");

    factsEngine.loadTemplate().then(function () {
      fetch("data/facts.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const check = validateItems(data.facts, ["stat", "label"]);
          if (!check.valid) {
            factsBox.innerHTML = "<p>Sorry, the data could not be shown: " + check.message + "</p>";
            return;
          }

          factsEngine.renderTemplate("facts", { facts: data.facts });
        })
        .catch(function (error) {
          factsBox.innerHTML = "<p>Sorry, could not load the facts.</p>";
        });
    });
  }

  // ===== Load the timeline =====
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
        .catch(function (error) {
          timelineBox.innerHTML = "<p>Sorry, could not load the timeline.</p>";
        });
    });
  }

  // ===== Load the operators =====
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
        .catch(function (error) {
          operatorsBox.innerHTML = "<p>Sorry, could not load the operators.</p>";
        });
    });
  }

  // ===== Load the sources =====
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
        .catch(function (error) {
          sourcesBox.innerHTML = "<p>Sorry, could not load the sources.</p>";
        });
    });
  }

  // ===== Mobile menu button =====
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

  // ===== Timeline search =====
  const searchBox = document.getElementById("timeline-search");
  if (searchBox) {
    searchBox.addEventListener("input", function () {
      const word = searchBox.value.toLowerCase();
      const allEvents = document.querySelectorAll("#timeline .event");
      let count = 0;

      allEvents.forEach(function (oneEvent) {
        const eventText = oneEvent.textContent.toLowerCase();
        if (eventText.includes(word)) {
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
    });
  }

  // ===== Back to top button =====
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
