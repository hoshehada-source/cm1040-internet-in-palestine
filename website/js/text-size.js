/*
   text-size.js
   Lets the visitor make the text on this page bigger, for
   easier reading, by clicking the "A+" button, and remembers
   the choice on the next page.
   */

// put the saved size back before the rest of the page runs
const savedSize = localStorage.getItem("text-size");
if (savedSize) {
  document.documentElement.setAttribute("data-text-size", savedSize);
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("text-size-toggle");
  if (!button) {
    return; // this page has no text-size button
  }

  showSizeOnButton(button, document.documentElement.getAttribute("data-text-size"));

  button.addEventListener("click", function () {
    const currentSize = document.documentElement.getAttribute("data-text-size");
    let newSize;

    if (currentSize === "large") {
      newSize = "normal";
    } else {
      newSize = "large";
    }

    document.documentElement.setAttribute("data-text-size", newSize);
    localStorage.setItem("text-size", newSize);

    showSizeOnButton(button, newSize);
  });
});

// updates the button to match the size
function showSizeOnButton(button, size) {
  if (size === "large") {
    button.textContent = "A-";
    button.setAttribute("aria-label", "Use normal text size");
  } else {
    button.textContent = "A+";
    button.setAttribute("aria-label", "Use larger text size");
  }
}
