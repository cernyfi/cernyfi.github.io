const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const body = document.body;

// Function to get the value of a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Check for saved theme in cookies
const savedTheme = getCookie('theme');

if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  themeText.textContent = 'Light Mode';
} else {
  themeText.textContent = 'Dark Mode';
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle the theme and save preference in a cookie
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    setCookie('theme', 'dark', 365); // Save for 1 year
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeText.textContent = 'Light Mode';
  } else {
    setCookie('theme', 'light', 365); // Save for 1 year
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Dark Mode';
  }
});
