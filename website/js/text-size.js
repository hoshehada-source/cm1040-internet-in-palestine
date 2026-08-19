/* ============================================================
   text-size.js
   Lets the visitor make the text on this page bigger, for
   easier reading, by clicking the "A+" button.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("text-size-toggle");
  if (!button) {
    return; // this page has no text-size button
  }

  button.addEventListener("click", function () {
    const currentSize = document.documentElement.getAttribute("data-text-size");
    let newSize;

    if (currentSize === "large") {
      newSize = "normal";
    } else {
      newSize = "large";
    }

    document.documentElement.setAttribute("data-text-size", newSize);

    if (newSize === "large") {
      button.textContent = "A-";
      button.setAttribute("aria-label", "Use normal text size");
    } else {
      button.textContent = "A+";
      button.setAttribute("aria-label", "Use larger text size");
    }
  });
});
