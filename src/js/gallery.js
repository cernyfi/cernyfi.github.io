// Photo lists are generated at build time (see src/_data/photos.js and
// src/_data/photo-dates.json) and injected into this page as
// window.__GALLERY_DATA__ - see gallery/index.njk.
const digitalImages = (window.__GALLERY_DATA__.digital || [])
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const filmImages = (window.__GALLERY_DATA__.film || [])
  .sort((a, b) => new Date(b.date) - new Date(a.date));

    // --- State ---
    let currentPhotoType = 'digital';
    let currentYear = '';
    let currentPhotoFilename = null;
    let currentImages = [];
    let currentImageIndex = 0;
    let groupedByYear = {};
    let photoLoadToken = 0;

    // --- URL Helpers ---
function parseUrl() {
    let path = window.location.pathname;
    let hash = window.location.hash;
    if (hash && hash.startsWith('#/')) path = hash.substring(1);

    const params = path.split('/').filter(p => p);

    const galleryIndex = params.indexOf('gallery');
    if (galleryIndex !== -1) {
        const rest = params.slice(galleryIndex + 1);
        if (rest[0] === 'digital' || rest[0] === 'film') currentPhotoType = rest[0];

        // rest[1] is either a 4-digit year, a filename (if no year given), or absent.
        if (rest[1] && /^\d{4}$/.test(rest[1])) {
            currentYear = rest[1];
            if (rest[2]) currentPhotoFilename = decodeURIComponent(rest[2]);
        } else if (rest[1]) {
            currentPhotoFilename = decodeURIComponent(rest[1]);
        }
    }
}


    function updateUrl() {
        const basePath = window.location.pathname.split('/gallery')[0];
        let path = `${basePath}/gallery/${currentPhotoType}`;
        if (currentYear) path += `/${currentYear}`;
        if (currentPhotoFilename) path += `/${encodeURIComponent(currentPhotoFilename)}`;
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
                    thumb.src = 'data:image/svg+xml;base64,...';
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
        currentPhotoFilename = image.name;
        updateUrl();

        const viewer = document.getElementById("fullscreen-viewer");
        const viewerImg = viewer.querySelector("img");
        const spinner = viewer.querySelector(".fullscreen-loading");

        viewer.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Show a spinner and hide the previous photo immediately, so
        // switching photos always gives visible feedback instead of a
        // frozen frame (or a black gap) while the full-resolution image
        // loads. A token guards against rapid next/prev clicks resolving
        // out of order.
        const token = ++photoLoadToken;
        spinner.style.display = "block";
        viewerImg.style.opacity = "0";

        const finishLoad = () => {
            if (token !== photoLoadToken) return;
            spinner.style.display = "none";
            viewerImg.style.opacity = "1";
        };
        viewerImg.onload = finishLoad;
        viewerImg.onerror = finishLoad;
        viewerImg.src = getFullPhotoPath(image);

        document.getElementById("fullscreen-date").textContent = new Date(image.date).toLocaleDateString();

        preloadNeighbors();
    }

    // Fetches the next and previous full-resolution photos in the background
    // so that by the time someone swipes/clicks to them, they're often
    // already cached and appear instantly instead of triggering a fresh load.
    function preloadNeighbors() {
        if (currentImages.length <= 1) return;
        const nextIdx = (currentImageIndex + 1) % currentImages.length;
        const prevIdx = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        [nextIdx, prevIdx].forEach(idx => {
            const preloadImg = new Image();
            preloadImg.src = getFullPhotoPath(currentImages[idx]);
        });
    }

    function closeFullscreen() {
        document.getElementById("fullscreen-viewer").style.display = "none";
        document.body.style.overflow = "auto";
    }

    function closeFullscreenAndUpdateUrl() {
        currentPhotoFilename = null;
        closeFullscreen();
        updateUrl();
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

    function renderAll() {
        updateCurrentImages(currentYear);
        populateYearFilter();
        renderGallery(currentYear);
        document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${currentPhotoType}-btn`).classList.add('active');
        document.getElementById('photo-type-toggle').dataset.active = currentPhotoType;
    }

    function switchPhotoType(type) {
        currentPhotoType = type;
        currentYear = '';
        currentPhotoFilename = null;
        closeFullscreen();
        updateUrl();
        renderAll();
    }

    function initializeGallery() {
        parseUrl();
        renderAll();

        if (currentPhotoFilename) {
            const found = currentImages.find(img => img.name === currentPhotoFilename);
            if (found) {
                openFullscreen(found); // also calls updateUrl()
                return;
            }
            // Filename in the URL doesn't match any known photo - drop it
            // rather than leaving a broken/misleading URL.
            currentPhotoFilename = null;
        }

        // Always settle on the clean pretty URL (e.g. /gallery/film/2025),
        // whether we arrived via a normal click or via the 404-page
        // redirect for a direct/refreshed link.
        updateUrl();
    }

    document.getElementById("digital-btn").addEventListener("click", () => switchPhotoType("digital"));
    document.getElementById("film-btn").addEventListener("click", () => switchPhotoType("film"));

    document.getElementById("yearFilter").addEventListener("change", (e) => {
        currentYear = e.target.value;
        currentPhotoFilename = null;
        updateUrl();
        renderGallery(currentYear);
    });

    document.getElementById("fullscreen-viewer").addEventListener("click", (e) => {
        if (e.target.id === "fullscreen-viewer") closeFullscreenAndUpdateUrl();
    });

    document.querySelector(".close-btn").addEventListener("click", closeFullscreenAndUpdateUrl);
    document.getElementById("fullscreen-prev").addEventListener("click", (e) => { e.stopPropagation(); showPreviousImage(); });
    document.getElementById("fullscreen-next").addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (document.getElementById("fullscreen-viewer").style.display === "flex") {
            if (e.key === "Escape") closeFullscreenAndUpdateUrl();
            if (e.key === "ArrowLeft") showPreviousImage();
            if (e.key === "ArrowRight") showNextImage();
        }
    });

    // Mobile navigation
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