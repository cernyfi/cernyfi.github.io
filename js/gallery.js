const digitalImages = [
    { name: "IMG_1671.JPG", date: "2025-01-29" },
    { name: "IMG_1520.JPG", date: "2025-01-29" },
    { name: "IMG_1299.JPG", date: "2024-10-28" },
    { name: "IMG_1289.JPG", date: "2024-10-28" },
    { name: "IMG_1284.JPG", date: "2024-10-27" },
    { name: "IMG_1198.JPG", date: "2024-11-17" },
    { name: "IMG_0816.JPG", date: "2024-07-14" },
    { name: "IMG_0771.JPG", date: "2024-07-13" },
    { name: "IMG_0749.JPG", date: "2024-07-13" },
    { name: "IMG_0730.JPG", date: "2024-07-12" },
    { name: "IMG_0559.JPG", date: "2024-07-11" },
    { name: "IMG_0485.JPG", date: "2024-07-10" },
    { name: "IMG_0397.JPG", date: "2024-07-10" },
    { name: "IMG_0113.jpg", date: "2024-06-30" },
    { name: "20250309_104603.jpg", date: "2025-03-09" },
    { name: "20250308_133542.jpg", date: "2025-03-08" },
    { name: "20250306_114451.jpg", date: "2025-03-06" },
    { name: "20241228_122604.jpg", date: "2024-12-28" },
    { name: "20241227_150515.jpg", date: "2024-12-27" },
    { name: "20210607_150806.jpg", date: "2021-06-07" },
    { name: "20180717_115952.jpg", date: "2018-07-17" },
    { name: "20170710_220646.jpg", date: "2017-07-10" },
    { name: "CRW_5505.jpg", date: "2022-07-12" },
    { name: "CRW_5524.jpg", date: "2022-07-12" },
    { name: "CRW_5550.jpg", date: "2022-07-12" },
    { name: "CRW_5599.jpg", date: "2022-07-12" },
    { name: "CRW_5600.jpg", date: "2022-07-12" },
    { name: "CRW_5666.jpg", date: "2022-07-13" },
    { name: "CRW_5705 (2).jpg", date: "2022-07-15" },
    { name: "CRW_5759.jpg", date: "2022-07-15" },
    { name: "CRW_5769.jpg", date: "2022-07-15" },
    { name: "CRW_5780.jpg", date: "2022-07-15" },
    { name: "CRW_5816.jpg", date: "2022-07-16" },
    { name: "CRW_5860.jpg", date: "2022-07-17" },
    { name: "CRW_5902.jpg", date: "2022-07-17" },
    { name: "CRW_5919.jpg", date: "2022-07-18" },
    { name: "CRW_5927.jpg", date: "2022-07-18" },
    { name: "CRW_6004.jpg", date: "2022-07-19" },
    { name: "CRW_6091.jpg", date: "2022-07-20" },
    { name: "CRW_6142.jpg", date: "2022-07-20" },
    { name: "CRW_6168.jpg", date: "2022-07-20" },
    { name: "CRW_6173.jpg", date: "2022-07-20" },
    { name: "CRW_6778.jpg", date: "2023-07-13" },
    { name: "CRW_6817.jpg", date: "2023-07-13" },
    { name: "CRW_6829.jpg", date: "2023-07-13" },
    { name: "CRW_6844.jpg", date: "2023-07-13" },
    { name: "CRW_6910.jpg", date: "2023-07-16" },
    { name: "CRW_6934.jpg", date: "2023-07-16" },
    { name: "CRW_6973.jpg", date: "2023-07-16" },
    { name: "CRW_7018.jpg", date: "2023-07-18" },
    { name: "CRW_7059.jpg", date: "2022-08-20" },
    { name: "CRW_7063.jpg", date: "2022-08-20" },
    { name: "CRW_7072.jpg", date: "2022-08-20" },
    { name: "IMG_1853.JPG", date: "2025-03-14" },
    { name: "IMG_1861.JPG", date: "2025-03-14" },
    { name: "IMG_1895.JPG", date: "2025-03-14" },
    { name: "IMG_1912.JPG", date: "2025-03-14" },
    { name: "IMG_1915.JPG", date: "2025-03-14" },
    { name: "IMG_20240709_165137.jpg", date: "2024-07-09" },
    { name: "IMG_3976.JPG", date: "2019-01-01" },
    { name: "IMG_4021.JPG", date: "2019-01-01" },
    { name: "IMG_4025.JPG", date: "2019-01-01" },
    { name: "IMG_2047.JPG", date: "2025-05-08"},
    { name: "IMG_2035.JPG", date: "2025-05-08"},
    { name: "IMG_2038.JPG", date: "2025-05-08"},
    { name: "IMG_2187.JPG", date: "2025-06-27"},
    { name: "IMG_2188.jpeg", date: "2025-06-28"},
    { name: "IMG_2218.jpeg", date: "2025-06-28"},
    { name: "IMG_2226.jpeg", date: "2025-06-28"},
    { name: "IMG_2239.jpeg", date: "2025-06-28"},
    { name: "IMG_2244.jpeg", date: "2025-06-28"},
    { name: "IMG_2247.jpeg", date: "2025-06-28"},
    { name: "IMG_2261.jpeg", date: "2025-06-28"},
    { name: "IMG_2267.jpeg", date: "2025-06-28"},
    { name: "IMG_2275.jpeg", date: "2025-06-28"},
    { name: "IMG_2277.jpeg", date: "2025-06-28"},
    { name: "IMG_2283.jpeg", date: "2025-06-28"},
    { name: "IMG_2285.jpeg", date: "2025-06-28"},
    { name: "IMG_2291.jpeg", date: "2025-06-28"},
    { name: "IMG_2296.jpeg", date: "2025-06-28"},
    { name: "IMG_2319.jpeg", date: "2025-06-28"},
    { name: "8A27486A-12AD-40B0-A385-BAD6E49D10E7_1_201_a.jpeg", date: "2025-05-31"}
].map(img => ({ ...img, year: new Date(img.date).getFullYear() }));

const filmImages = [
    { name: "img1.png", date: "2025-07-01" },
    { name: "img5.png", date: "2025-07-01" },
    { name: "img6.png", date: "2025-07-01" },
    { name: "img8.png", date: "2025-07-01" },
    { name: "img16.png", date: "2025-07-01" },
    { name: "img17.png", date: "2025-07-01" },
    { name: "img021.png", date: "2025-07-01" },
    { name: "img23.png", date: "2025-07-01" },
    { name: "img024.png", date: "2025-07-01" },
].map(img => ({ ...img, year: new Date(img.date).getFullYear() }));

    // --- State ---
    let currentPhotoType = 'digital';
    let currentYear = '';
    let currentImages = [];
    let currentImageIndex = 0;
    let groupedByYear = {};

    // --- URL Helpers ---
function parseUrl() {
    let path = window.location.pathname;
    let hash = window.location.hash;
    if (hash && hash.startsWith('#/')) path = hash.substring(1);

    const params = path.split('/').filter(p => p);

    const galleryIndex = params.indexOf('gallery');
    if (galleryIndex !== -1) {
        const photoType = params[galleryIndex + 1];
        const year = params[galleryIndex + 2];
        if (photoType === 'digital' || photoType === 'film') currentPhotoType = photoType;
        if (year && !isNaN(year)) currentYear = year;
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