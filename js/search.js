document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const articles = Array.from(blogList.querySelectorAll("article"));

    articles.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return dateB - dateA; // Newest first
    });

    articles.forEach((article) => {
        const dateString = article.dataset.date;
        const dateObj = new Date(dateString);
        const formattedDate = formatDate(dateObj);
        const dateElement = article.querySelector(".post-date");
        dateElement.textContent = formattedDate;
    });

    articles.forEach((article) => blogList.appendChild(article));
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
}

function filterPosts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const articles = document.querySelectorAll("#blog-list article");

    articles.forEach((article) => {
        const title = article.dataset.title.toLowerCase();
        const dateString = article.dataset.date;
        const dateObj = new Date(dateString);
        const monthYear = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }).toLowerCase(); // Format "Month Year"
        
        if (title.includes(query) || monthYear.includes(query)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}
