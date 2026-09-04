/*
   chart.js
   Bar chart for the home page. Loads internet-usage.json,
   checks it, draws bars as buttons
   Click a bar to see the exact number. */

document.addEventListener("DOMContentLoaded", function () {
  const chartBox = document.getElementById("usage-chart");
  const caption = document.getElementById("chart-caption");

  if (!chartBox) return;

  fetch("data/internet-usage.json")
    .then(function (response) { return response.json(); })
    .then(function (dataset) {
      const items = dataset.data;

      const check = validateItems(items, ["year", "value"]);
      if (!check.valid) {
        chartBox.innerHTML = "<p>Sorry, the chart data is not correct: " + check.message + "</p>";
        return;
      }

      chartBox.innerHTML = buildSimpleChart(items);

      const bars = chartBox.querySelectorAll(".bar-btn");
      bars.forEach(function (bar) {
        bar.addEventListener("click", function () {
          // reset all bars then highlight the one clicked
          bars.forEach(function (b) { b.style.background = "#0c7a43"; });
          this.style.background = "#c9a24b";

          const year = this.getAttribute("data-year");
          const value = this.getAttribute("data-value");
          if (caption) {
            caption.textContent = year + ": about " + value + "% of the population used the internet.";
          }
        });
      });
    })
    .catch(function () {
      chartBox.innerHTML = "<p>Sorry, could not load the chart data.</p>";
    });
});

// builds the row of bar buttons from the {year, value} list
function buildSimpleChart(items) {
  let html = '<div class="bars">';

  items.forEach(function (item, i) {
    // value is already 0-100 so it can go straight in as the height %
    html += '<button type="button" class="bar-btn" data-year="' + item.year + '" data-value="' + item.value +
      '" style="height:' + item.value + '%;" aria-label="' + item.year + ': ' + item.value + ' percent">';

    // label every other year, otherwise they overlap
    if (i % 2 === 0) {
      html += '<span class="bar-year">' + item.year + '</span>';
    }
    html += '</button>';
  });

  html += '</div>';
  return html;
}