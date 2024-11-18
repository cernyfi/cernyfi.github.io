const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  themeText.textContent = 'Light Mode';
} else {
  themeText.textContent = 'Dark Mode';
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle the theme and save preference
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeText.textContent = 'Dark Mode';
  }
});


  document.getElementById("share-btn").addEventListener("click", () => {
    const pageUrl = window.location.href;
    const pageTitle = document.title;

    if (navigator.share) {
      navigator.share({
        title: pageTitle,
        url: pageUrl
      }).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      navigator.clipboard.writeText(pageUrl).then(() => {
        alert("Link copied to clipboard!");
      }).catch((error) => {
        console.error("Error copying link:", error);
      });
    }
  });

