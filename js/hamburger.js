document.addEventListener('DOMContentLoaded', function () {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
  
    hamburgerToggle.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });
  });