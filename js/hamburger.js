document.addEventListener('DOMContentLoaded', function () {
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const pageNameSpan = document.getElementById('current-page-name');



  
  // Map filenames to page names (adjust as needed)
  const pageNames = {
    '': 'Home', // root path (cernyfi.github.io or cernyfi.github.io/)
    '/gallery/': 'Gallery',
    '/contact/': 'Contact',
  };

  const currentPath = window.location.pathname.split("/").pop();
  const currentPageName = pageNames[currentPath] || 'Page';
  pageNameSpan.textContent = currentPageName;

  hamburgerToggle.addEventListener('click', function (e) {
  const isMenuShown = navMenu.classList.toggle('show');

  if (isMenuShown) {
    hamburgerIcon.style.display = 'none';
    closeIcon.style.display = 'inline';

    // Hide the page name text when close icon shows
    pageNameSpan.style.display = 'none';
  } else {
    // Show hamburger icon, hide close icon
    hamburgerIcon.style.display = 'inline';
    closeIcon.style.display = 'none';

    // Show the page name text when hamburger icon shows
    pageNameSpan.style.display = 'inline';
  }
});

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    const target = e.target;
const clickedOutside = !navMenu.contains(event.target) && !hamburgerToggle.contains(event.target);

  if (clickedOutside) {
    navMenu.classList.remove('show');
    hamburgerIcon.style.display = 'inline';
    closeIcon.style.display = 'none';
    pageNameSpan.style.display = 'inline'; // ✅ Fix: show text again
  }
    // If menu is open and click is outside navMenu and hamburgerToggle
    if (navMenu.classList.contains('show') &&
        !navMenu.contains(target) &&
        !hamburgerToggle.contains(target)) {

      navMenu.classList.remove('show');

      // Reset icons
      hamburgerIcon.style.display = 'inline';
      closeIcon.style.display = 'none';
    }
  });
});