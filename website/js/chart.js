/*
   chart.js
   Bar chart for the home page. Loads internet-usage.json,
   checks it, draws bars as buttons.
   Click a bar to see the exact number.
   */

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
          bars.forEach(function (b) { b.classList.remove("active"); });
          this.classList.add("active");

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
  let html = '<div class="chart-area">';

  // value scale on the left, so the bars can be read without clicking one.
  // hidden from screen readers because every bar already carries its own label
  html += '<ul class="y-axis" aria-hidden="true">';
  html += '<li>100%</li><li>75%</li><li>50%</li><li>25%</li><li>0%</li>';
  html += '</ul>';

  html += '<div class="bars">';

  items.forEach(function (item) {
    // value is already 0-100 so it can go straight in as the height %
    html += '<button type="button" class="bar-btn" data-year="' + item.year + '" data-value="' + item.value +
      '" style="height:' + item.value + '%;" aria-label="' + item.year + ': ' + item.value + ' percent">';

    html += '<span class="bar-value">' + item.value + '</span>';
    html += '<span class="bar-year">' + item.year + '</span>';
    html += '</button>';
  });

  html += '</div></div>';
  return html;
}