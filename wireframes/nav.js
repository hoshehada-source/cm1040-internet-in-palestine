// Makes the wireframe hamburger button open/close the menu on mobile,
// so you can navigate between the wireframe pages (same idea as the real site).
document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav ul');
  if (button && menu) {
    button.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }
});
