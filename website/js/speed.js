/* ============================================================
   speed.js
   Historical speed simulator. Loads internet-speed.json, click a
   year to see a bar for the real speed that year. Only years with
   an actual published number are here - no guessed values.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const simBox = document.getElementById("speed-sim");

  if (!simBox) return;

  fetch("data/internet-speed.json")
    .then(function (response) { return response.json(); })
    .then(function (dataset) {
      const items = dataset.data;

      const check = validateItems(items, ["year", "mbps", "sourceCite", "sourceId"]);
      if (!check.valid) {
        simBox.innerHTML = "<p>Sorry, the speed data is not correct: " + check.message + "</p>";
        return;
      }

      simBox.innerHTML = buildSpeedSimulator(items);
      setUpSpeedButtons(items);
    })
    .catch(function () {
      simBox.innerHTML = "<p>Sorry, could not load the speed data.</p>";
    });
});

// builds the year buttons + the empty progress bar
function buildSpeedSimulator(items) {
  let html = '<div class="sim-buttons">';

  items.forEach(function (item) {
    html += '<button type="button" class="sim-year-btn" data-year="' + item.year + '">' + item.year + '</button>';
  });

  html += '</div>';
  html += '<div class="sim-track"><div id="sim-bar" class="sim-bar"></div></div>';
  html += '<p id="sim-result" class="message" aria-live="polite">Click a year to see the internet speed at that time.</p>';

  return html;
}

// adds the click handlers once the buttons are in the page
function setUpSpeedButtons(items) {
  const buttons = document.querySelectorAll(".sim-year-btn");
  const bar = document.getElementById("sim-bar");
  const result = document.getElementById("sim-result");

  // fastest year = 100% bar, everything else relative to it
  let maxSpeed = 0;
  items.forEach(function (item) {
    if (item.mbps > maxSpeed) {
      maxSpeed = item.mbps;
    }
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // reset active state on all buttons then mark this one
      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");

      const year = button.getAttribute("data-year");
      const match = findItemByYear(items, year);
      if (!match) return;

      const percent = (match.mbps / maxSpeed) * 100;
      bar.style.width = percent + "%";

      result.innerHTML = year + ": about " + match.mbps + " Mbps (" +
        '<a class="cite" href="sources.html#src-' + match.sourceId + '">' + match.sourceCite + "</a>)";
    });
  });
}

// finds the item matching the clicked year
function findItemByYear(items, year) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].year === year) {
      return items[i];
    }
  }
  return null;
}
