/*
   theme.js
   Lets the visitor switch this page between light and dark
   mode by clicking the button in the navigation, and remembers
   the choice so it stays the same on the next page.
   */

// put the saved theme back before the rest of the page runs
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("theme-toggle");
  if (!button) {
    return; // this page has no theme button
  }

  showThemeOnButton(button, document.documentElement.getAttribute("data-theme"));

  button.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme;

    if (currentTheme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    showThemeOnButton(button, newTheme);
  });
});

// keeps the button icon and label matching the theme that is showing
function showThemeOnButton(button, theme) {
  if (theme === "dark") {
    button.textContent = "☀️";
    button.setAttribute("aria-label", "Switch to light mode");
  } else {
    button.textContent = "🌙";
    button.setAttribute("aria-label", "Switch to dark mode");
  }
}
