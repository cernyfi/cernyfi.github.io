document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blog-list");
    const articles = Array.from(blogList.querySelectorAll("article"));

    // Sort posts by date (newest first)
    articles.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return dateB - dateA; // Newest first
    });

    // Format the date and update the post
    articles.forEach((article) => {
        const dateString = article.dataset.date;
        const dateObj = new Date(dateString);
        const formattedDate = formatDate(dateObj);
        const dateElement = article.querySelector(".post-date");
        dateElement.textContent = formattedDate;
    });

    // Re-append sorted articles to the blog list
    articles.forEach((article) => blogList.appendChild(article));
});

// Format the date as 'Month Year' (e.g., 'November 2024')
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
        
        // Check if query matches the title or the formatted date (Month Year)
        if (title.includes(query) || monthYear.includes(query)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}
