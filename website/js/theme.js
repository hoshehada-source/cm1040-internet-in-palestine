/* 
   theme.js
   Lets the visitor switch this page between light and dark
   mode by clicking the button in the navigation.
   */

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("theme-toggle");
  if (!button) {
    return; // this page has no theme button
  }

  button.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme;

    if (currentTheme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === "dark") {
      button.textContent = "☀️";
      button.setAttribute("aria-label", "Switch to light mode");
    } else {
      button.textContent = "🌙";
      button.setAttribute("aria-label", "Switch to dark mode");
    }
  });
});
