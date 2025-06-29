// --- Image Data ---
const digitalImages = [
    { name: "IMG_1671.JPG", date: "2025-01-29" },
    { name: "IMG_1520.JPG", date: "2025-01-29" },
    { name: "IMG_1299.JPG", date: "2024-10-28" },
    { name: "8A27486A-12AD-40B0-A385-BAD6E49D10E7_1_201_a.jpeg", date: "2025-05-31" }
].map(img => {
    const year = new Date(img.date).getFullYear();
    return {
        ...img,
        year,
        preview: `/photos/thumbs/${year}/${img.name}`
    };
});

const filmImages = [
    { name: "film_001.jpg", date: "2024-08-15" },
    { name: "film_010.jpg", date: "2021-04-12" }
].map(img => {
    const year = new Date(img.date).getFullYear();
    return {
        ...img,
        year,
        preview: `/photos/thumbs/${year}/${img.name}`
    };
});

// --- State ---
let currentPhotoType = 'digital';
let currentYear = '';
let currentImages = [];
let currentImageIndex = 0;
let groupedByYear = {};

// --- URL Handling ---
function parseUrl() {
    const params = (window.location.hash || window.location.pathname).split('/').filter(Boolean);
    const galleryIndex = params.indexOf('gallery');
    if (params[galleryIndex + 1]) currentPhotoType = params[galleryIndex + 1];
    if (!isNaN(params[galleryIndex + 2])) currentYear = params[galleryIndex + 2];
}

function updateUrl() {
    const base = window.location.pathname.split('/gallery')[0];
    const yearPart = currentYear ? `/${currentYear}` : '';
    history.replaceState({}, '', `${base}/gallery/${currentPhotoType}${yearPart}`);
}

// --- Helpers ---
function getCurrentImages() {
    return currentPhotoType === 'digital' ? digitalImages : filmImages;
}

function getPhotoPath(name, year) {
    return currentPhotoType === 'digital' 
        ? `/photos/digital/${year}/${name}` 
        : `/photos/film/${name}`;
}

function groupImages(images) {
    return images.sort((a, b) => new Date(b.date) - new Date(a.date))
                 .reduce((acc, img) => {
                     const year = img.year;
                     acc[year] = acc[year] || [];
                     acc[year].push(img);
                     return acc;
                 }, {});
}

function populateYearFilter() {
    const filter = document.getElementById("yearFilter");
    filter.innerHTML = '<option value="">All Years</option>';
    Object.keys(groupedByYear).sort((a, b) => b - a).forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === currentYear) option.selected = true;
        filter.appendChild(option);
    });
}

    // --- Fullscreen Viewer ---
    function openFullscreen(image) {
        currentImageIndex = currentImages.findIndex(img => img.name === image.name);
        const viewer = document.getElementById("fullscreen-viewer");
        const viewerImg = viewer.querySelector("img");
        viewerImg.src = getFullPhotoPath(image);
        document.getElementById("fullscreen-date").textContent = new Date(image.date).toLocaleDateString();
        viewer.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeFullscreen() {
        document.getElementById("fullscreen-viewer").style.display = "none";
        document.body.style.overflow = "auto";
    }

    function showPreviousImage() {
        if (currentImages.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        openFullscreen(currentImages[currentImageIndex]);
    }

    function showNextImage() {
        if (currentImages.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        openFullscreen(currentImages[currentImageIndex]);
    }

    // --- Initialization ---
    function switchPhotoType(type) {
        currentPhotoType = type;
        currentYear = '';
        updateUrl();
        updateCurrentImages();
        populateYearFilter();
        renderGallery();
        document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${type}-btn`).classList.add('active');
    }

    function initializeGallery() {
        parseUrl();
        switchPhotoType(currentPhotoType);
        if (currentYear) renderGallery(currentYear);
    }

    // --- Event Listeners ---
    document.getElementById("digital-btn").addEventListener("click", () => switchPhotoType("digital"));
    document.getElementById("film-btn").addEventListener("click", () => switchPhotoType("film"));

    document.getElementById("yearFilter").addEventListener("change", (e) => {
        currentYear = e.target.value;
        updateUrl();
        renderGallery(currentYear);
    });

    document.getElementById("fullscreen-viewer").addEventListener("click", (e) => {
        if (e.target.id === "fullscreen-viewer") closeFullscreen();
    });

    document.querySelector(".close-btn").addEventListener("click", closeFullscreen);
    document.getElementById("fullscreen-prev").addEventListener("click", (e) => { e.stopPropagation(); showPreviousImage(); });
    document.getElementById("fullscreen-next").addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (document.getElementById("fullscreen-viewer").style.display === "flex") {
            if (e.key === "Escape") closeFullscreen();
            if (e.key === "ArrowLeft") showPreviousImage();
            if (e.key === "ArrowRight") showNextImage();
        }
    });

    // Swipe navigation
    (function setupTouchSwipe() {
        let startX = 0, endX = 0, threshold = 50;
        const img = document.querySelector("#fullscreen-viewer img");
        img.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
        img.addEventListener("touchmove", e => { endX = e.touches[0].clientX; });
        img.addEventListener("touchend", () => {
            const diff = endX - startX;
            if (Math.abs(diff) > threshold) diff > 0 ? showPreviousImage() : showNextImage();
            startX = endX = 0;
        });
    })();

    window.addEventListener("load", initializeGallery);
    window.addEventListener("hashchange", initializeGallery);
    window.addEventListener("popstate", initializeGallery);