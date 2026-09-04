/*  test-connection.js
   "Test your connection" page. Times the visitor's download
   speed, loads real benchmark numbers for Palestine + UAE, and
   works out how long a 500MB file would take at each speed. */

let pageBenchmarks = null;
let mySpeedMbps = null;

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("measure-btn");
  const result = document.getElementById("my-speed-result");

  if (button) {
    button.addEventListener("click", function () {
      result.textContent = "Measuring...";
      measureMySpeed(result);
    });
  }

  loadBenchmarks();
});

// downloads the test file once, times it, pushes the result to the list
function downloadOnce(measurements) {
  const testFile = "speed-test-file.bin?cachebust=" + Date.now() + "-" + measurements.length;
  const startTime = performance.now();

  return fetch(testFile)
    .then(function (response) { return response.blob(); })
    .then(function (blob) {
      const endTime = performance.now();
      const seconds = (endTime - startTime) / 1000;
      const bits = blob.size * 8;
      const mbps = (bits / seconds) / 1000000;
      measurements.push({ mbps: mbps, seconds: seconds });
    });
}

// runs the download 3 times and uses the middle result, so one
// unusually fast/slow request doesn't throw the whole number off
function measureMySpeed(result) {
  const measurements = [];

  result.textContent = "Measuring... test 1 of 3...";

  downloadOnce(measurements)
    .then(function () {
      result.textContent = "Measuring... test 2 of 3...";
      return downloadOnce(measurements);
    })
    .then(function () {
      result.textContent = "Measuring... test 3 of 3...";
      return downloadOnce(measurements);
    })
    .then(function () {
      showResult(result, measurements);
    })
    .catch(function () {
      result.textContent = "Sorry, could not measure your speed right now.";
    });
}

// sorts the 3 results and picks the middle (median) one
function showResult(result, measurements) {
  measurements.sort(function (a, b) { return a.mbps - b.mbps; });
  const median = measurements[Math.floor(measurements.length / 2)];

  // if it finished this fast it's probably running locally, not a real number
  if (median.seconds < 0.02) {
    result.textContent = "That was too fast to measure reliably - this usually " +
      "happens when the site is running on a local server rather than online.";
    return;
  }

  mySpeedMbps = median.mbps;
  result.textContent = "Your estimated download speed: about " + median.mbps.toFixed(2) + " Mbps.";

  updateCalculator();
}

function loadBenchmarks() {
  const box = document.getElementById("compare-box");
  if (!box) return;

  fetch("data/connection-compare.json")
    .then(function (response) { return response.json(); })
    .then(function (dataset) {
      const items = dataset.benchmarks;

      const check = validateItems(items, ["place", "mbps", "period", "sourceCite", "sourceId"]);
      if (!check.valid) {
        box.innerHTML = "<p>Sorry, the comparison data is not correct: " + check.message + "</p>";
        return;
      }

      pageBenchmarks = items;
      box.innerHTML = buildBenchmarkBars(items);
      updateCalculator();
    })
    .catch(function () {
      box.innerHTML = "<p>Sorry, could not load the comparison data.</p>";
    });
}

// builds the labelled bars, scaled against the fastest one in the list
function buildBenchmarkBars(items) {
  let maxSpeed = 0;
  items.forEach(function (item) {
    if (item.mbps > maxSpeed) {
      maxSpeed = item.mbps;
    }
  });

  let html = "";
  items.forEach(function (item) {
    const percent = (item.mbps / maxSpeed) * 100;
    html += '<p class="bench-label">' + item.place + ": " + item.mbps + " Mbps benchmark, " +
      item.period + " (" +
      '<a class="cite" href="sources.html#src-' + item.sourceId + '">' + item.sourceCite + "</a>)</p>";
    html += '<div class="sim-track"><div class="sim-bar" style="width:' + percent + '%;"></div></div>';
  });

  return html;
}

// converts a speed into a "1m 3s" style time for a 500MB file
function downloadTimeText(mbps) {
  const fileSizeBits = 500 * 8 * 1000000;
  const speedBps = mbps * 1000000;
  const totalSeconds = fileSizeBits / speedBps;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  if (minutes === 0) {
    return seconds + "s";
  }
  return minutes + "m " + seconds + "s";
}

// need my speed + the benchmarks before there's anything to compare
function updateCalculator() {
  const calcBox = document.getElementById("calc-box");
  if (!calcBox || !pageBenchmarks || mySpeedMbps === null) return;

  let html = '<ul class="calc-list">';
  html += "<li>Your speed: <strong>" + downloadTimeText(mySpeedMbps) + "</strong></li>";

  pageBenchmarks.forEach(function (item) {
    html += "<li>" + item.place + ": <strong>" + downloadTimeText(item.mbps) + "</strong></li>";
  });

  html += "</ul>";
  calcBox.innerHTML = html;
}