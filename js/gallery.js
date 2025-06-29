const digitalImages = [
        { name: "IMG_1671.JPG", date: "2025-01-29" },
        { name: "IMG_1520.JPG", date: "2025-01-29" },
        { name: "IMG_1299.JPG", date: "2024-10-28" },
        // ... (rest of your digitalImages)
    ].map(img => ({ ...img, year: new Date(img.date).getFullYear() }));

    const filmImages = [
        { name: "film_001.jpg", date: "2024-08-15" },
        { name: "film_010.jpg", date: "2021-04-12" },
        // ... (rest of your filmImages)
    ].map(img => ({ ...img, year: new Date(img.date).getFullYear() }));

    // --- State ---
    let currentPhotoType = 'digital';
    let currentYear = '';
    let currentImages = [];
    let currentImageIndex = 0;
    let groupedByYear = {};

    // --- URL Helpers ---
    function parseUrl() {
        const path = window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        const galleryIndex = segments.indexOf('gallery');
        if (galleryIndex !== -1) {
            currentPhotoType = segments[galleryIndex + 1] || 'digital';
            const yearCandidate = segments[galleryIndex + 2];
            if (yearCandidate && /^\d{4}$/.test(yearCandidate)) {
                currentYear = yearCandidate;
            }
        }
    }

    function updateUrl() {
        const basePath = window.location.pathname.split('/gallery')[0];
        let path = `${basePath}/gallery/${currentPhotoType}`;
        if (currentYear) path += `/${currentYear}`;
        window.history.replaceState({}, '', path);
    }

    // --- Path Builder ---
    function getPhotoPath(image) {
        if (currentPhotoType === 'digital') {
            return `/photos/thumbs/digital/${image.year}/${image.name}`;
        } else {
            return `/photos/thumbs/film/${image.year}/${image.name}`;
        }
    }

    function getFullPhotoPath(image) {
        if (currentPhotoType === 'digital') {
            return `/photos/digital/${image.year}/${image.name}`;
        } else {
            return `/photos/film/${image.year}/${image.name}`;
        }
    }

    // --- Grouping ---
    function groupImagesByYear(images) {
        return images.reduce((acc, img) => {
            const year = img.year;
            acc[year] = acc[year] || [];
            acc[year].push(img);
            return acc;
        }, {});
    }

    function updateCurrentImages(filterYear = "") {
        const images = currentPhotoType === 'digital' ? digitalImages : filmImages;
        groupedByYear = groupImagesByYear(images);
        currentImages = filterYear ? groupedByYear[filterYear] || [] :
            Object.values(groupedByYear).flat();
    }

    // --- Rendering ---
    function renderGallery(yearFilter = "") {
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = "";
        updateCurrentImages(yearFilter);
        const years = Object.keys(groupedByYear).sort((a, b) => b - a);

        (yearFilter ? [yearFilter] : years).forEach(year => {
            const images = groupedByYear[year];
            if (!images) return;

            const section = document.createElement("div");
            section.className = "year-group";

            const title = document.createElement("div");
            title.className = "year-title";
            title.textContent = year;

            const grid = document.createElement("div");
            grid.className = "year-grid";

            images.forEach((img, index) => {
                const card = document.createElement("div");
                card.className = "photo-card";
                card.dataset.filename = img.name;

                const thumb = document.createElement("img");
                thumb.src = getPhotoPath(img);
                thumb.alt = img.name;
                thumb.loading = "lazy";
                thumb.onerror = () => {
                    thumb.src = 'data:image/svg+xml;base64,...'; // Optional fallback
                    thumb.alt = 'Image not found';
                };

                const label = document.createElement("div");
                label.className = "photo-date";
                label.textContent = new Date(img.date).toLocaleDateString();

                card.appendChild(thumb);
                card.appendChild(label);
                card.addEventListener("click", () => openFullscreen(img));

                grid.appendChild(card);
            });

            section.appendChild(title);
            section.appendChild(grid);
            gallery.appendChild(section);
        });
    }

    function populateYearFilter() {
        const yearFilter = document.getElementById("yearFilter");
        yearFilter.innerHTML = '<option value="">All Years</option>';
        const years = Object.keys(groupedByYear).sort((a, b) => b - a);
        years.forEach(year => {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            if (year === currentYear) option.selected = true;
            yearFilter.appendChild(option);
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