document.addEventListener('DOMContentLoaded', function () {
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  function openMenu() {
    navMenu.classList.add('show');
    hamburgerToggle.setAttribute('aria-expanded', 'true');
    hamburgerIcon.style.display = 'none';
    closeIcon.style.display = 'inline';
  }

  function closeMenu() {
    navMenu.classList.remove('show');
    hamburgerToggle.setAttribute('aria-expanded', 'false');
    hamburgerIcon.style.display = 'inline';
    closeIcon.style.display = 'none';
  }

  hamburgerToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('show')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', function (e) {
    const target = e.target;
    const clickedOutside = !navMenu.contains(target) && !hamburgerToggle.contains(target);

    if (clickedOutside && navMenu.classList.contains('show')) {
      closeMenu();
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
      closeMenu();
    }
  });
});
