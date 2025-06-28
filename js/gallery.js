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
    { name: "8A27486A-12AD-40B0-A385-BAD6E49D10E7_1_201_a.jpeg", date: "2025-05-31"}
        ];

        const filmImages = [
            { name: "film_001.jpg", date: "2024-08-15" },
            // ... (rest of your filmImages array)
            { name: "film_010.jpg", date: "2021-04-12" }
        ];

        // --- State ---
        let currentPhotoType = 'digital';
        let currentYear = '';
        let currentImages = [];
        let currentImageIndex = 0;
        let groupedByYear = {};

        // --- URL Handling ---
        function parseUrl() {
            let path = window.location.pathname;
            let hash = window.location.hash;
            if (hash && hash.startsWith('#/')) path = hash.substring(1);
            const params = path.split('/').filter(p => p);
            let galleryIndex = params.indexOf('gallery');
            if (galleryIndex === -1 && window.location.pathname.includes('/gallery/')) galleryIndex = -1;
            const photoType = params[galleryIndex + 1];
            const year = params[galleryIndex + 2];
            if (photoType === 'digital' || photoType === 'film') currentPhotoType = photoType;
            if (year && !isNaN(year)) currentYear = year;
        }

        function updateUrl() {
            const basePath = window.location.pathname.split('/gallery')[0];
            let newPath = `${basePath}/gallery/${currentPhotoType}`;
            if (currentYear) newPath += `/${currentYear}`;
            window.history.replaceState({}, '', newPath);
        }

        // --- Helpers ---
        function getCurrentImages() {
            return currentPhotoType === 'digital' ? digitalImages : filmImages;
        }

        function getPhotoPath(imageName) {
            return `/photos/${currentPhotoType}/${imageName}`;
        }

        function groupImagesByYear(images) {
            return images
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .reduce((acc, img) => {
                    const year = new Date(img.date).getFullYear();
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(img);
                    return acc;
                }, {});
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

        function updateCurrentImages(filterYear = "") {
            currentImages = [];
            const yearsToShow = filterYear ? [filterYear] : Object.keys(groupedByYear).sort((a, b) => b - a);
            yearsToShow.forEach(year => {
                if (groupedByYear[year]) currentImages.push(...groupedByYear[year]);
            });
        }

        // --- Gallery Rendering ---
        function renderGallery(filterYear = "") {
            const gallery = document.getElementById("gallery");
            gallery.innerHTML = "";
            updateCurrentImages(filterYear);
            const yearsToShow = filterYear ? [filterYear] : Object.keys(groupedByYear).sort((a, b) => b - a);

            yearsToShow.forEach(year => {
                if (!groupedByYear[year]) return;
                const section = document.createElement("div");
                section.className = "year-group";
                const title = document.createElement("div");
                title.className = "year-title";
                title.textContent = year;
                const grid = document.createElement("div");
                grid.className = "year-grid";
                groupedByYear[year].forEach(img => {
                    const card = document.createElement("div");
                    card.className = "photo-card";
                    card.dataset.filename = img.name;
                    const image = document.createElement("img");
                    image.src = getPhotoPath(img.name);
                    image.alt = img.name;
                    image.loading = "lazy";
                    image.onerror = function() {
                        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                        this.alt = 'Image not found';
                    };
                    const label = document.createElement("div");
                    label.className = "photo-date";
                    label.textContent = new Date(img.date).toLocaleDateString();
                    card.appendChild(image);
                    card.appendChild(label);
                    grid.appendChild(card);
                    card.addEventListener("click", (e) => {
                        e.preventDefault();
                        const imageIndex = currentImages.findIndex(item => item.name === img.name);
                        openFullscreen(imageIndex);
                    });
                });
                section.appendChild(title);
                section.appendChild(grid);
                gallery.appendChild(section);
            });
        }

      const rotator = document.getElementById('dividor');
  let isForward = true;

  document.getElementById('digital-btn').addEventListener('click', toggleRotation);
  document.getElementById('film-btn').addEventListener('click', toggleRotation);

  function toggleRotation() {
    const icon = rotator.querySelector('i');

    // Clear previous animation class to retrigger it
    icon.classList.remove('rotate-forward', 'rotate-backward');

    void icon.offsetWidth; // Force reflow to restart animation

    if (isForward) {
      icon.classList.add('rotate-forward');
    } else {
      icon.classList.add('rotate-backward');
    }

    isForward = !isForward;
  }
        // --- Photo Type Switch ---
        function switchPhotoType(type) {
            currentPhotoType = type;
            currentYear = '';
            document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`${type}-btn`).classList.add('active');
            groupedByYear = groupImagesByYear(getCurrentImages());
            populateYearFilter();
            renderGallery();
            updateUrl();
        }

        // --- Fullscreen Viewer ---
        function openFullscreen(imageIndex) {
            currentImageIndex = imageIndex;
            const img = currentImages[currentImageIndex];
            const viewer = document.getElementById("fullscreen-viewer");
            const viewerImg = viewer.querySelector("img");
            const dateElement = document.getElementById("fullscreen-date");
            viewerImg.src = getPhotoPath(img.name);
            dateElement.textContent = new Date(img.date).toLocaleDateString();
            viewer.style.display = "flex";
            document.body.style.overflow = "hidden";
        }

        function showPreviousImage() {
            if (currentImages.length > 1) {
                currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                openFullscreen(currentImageIndex);
            }
        }

        function showNextImage() {
            if (currentImages.length > 1) {
                currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                openFullscreen(currentImageIndex);
            }
        }

        function closeFullscreen() {
            const viewer = document.getElementById("fullscreen-viewer");
            viewer.style.display = "none";
            document.body.style.overflow = "auto";
        }

        // --- Initialization ---
        function initializeGallery() {
            parseUrl();
            groupedByYear = groupImagesByYear(getCurrentImages());
            populateYearFilter();
            renderGallery(currentYear);
            document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`${currentPhotoType}-btn`).classList.add('active');
        }

        // --- Event Listeners ---
        document.getElementById('digital-btn').addEventListener('click', () => switchPhotoType('digital'));
        document.getElementById('film-btn').addEventListener('click', () => switchPhotoType('film'));
        document.getElementById("yearFilter").addEventListener("change", (e) => {
            currentYear = e.target.value;
            renderGallery(currentYear);
            updateUrl();
        });

        // Fullscreen viewer events
        document.getElementById("fullscreen-viewer").addEventListener("click", (e) => {
            if (e.target.id === "fullscreen-viewer") closeFullscreen();
        });
        document.querySelector(".close-btn").addEventListener("click", closeFullscreen);
        document.getElementById("fullscreen-prev").addEventListener("click", (e) => {
            e.stopPropagation();
            showPreviousImage();
        });
        document.getElementById("fullscreen-next").addEventListener("click", (e) => {
            e.stopPropagation();
            showNextImage();
        });
        document.querySelector("#fullscreen-viewer img").addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            const viewer = document.getElementById("fullscreen-viewer");
            if (viewer.style.display === "flex") {
                switch(e.key) {
                    case "Escape": closeFullscreen(); break;
                    case "ArrowLeft": showPreviousImage(); break;
                    case "ArrowRight": showNextImage(); break;
                }
            }
        });

        // Mobile navigation (swipe)
        (function() {
            let touchStartX = 0;
            let touchEndX = 0;
            const threshold = 50;
            const viewer = document.getElementById("fullscreen-viewer");
            const img = viewer.querySelector("img");
            img.addEventListener("touchstart", function(e) {
                if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
            });
            img.addEventListener("touchmove", function(e) {
                if (e.touches.length === 1) touchEndX = e.touches[0].clientX;
            });
            img.addEventListener("touchend", function(e) {
                if (touchStartX && touchEndX) {
                    const diff = touchEndX - touchStartX;
                    if (Math.abs(diff) > threshold) {
                        if (diff > 0) showPreviousImage();
                        else showNextImage();
                    }
                }
                touchStartX = 0;
                touchEndX = 0;
            });
        })();

        // Initialize on page load
        initializeGallery();

        // Listen for hash and popstate changes
        window.addEventListener('hashchange', function() {
            parseUrl();
            groupedByYear = groupImagesByYear(getCurrentImages());
            populateYearFilter();
            renderGallery(currentYear);
            document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`${currentPhotoType}-btn`).classList.add('active');
        });
        window.addEventListener('popstate', function() {
            parseUrl();
            groupedByYear = groupImagesByYear(getCurrentImages());
            populateYearFilter();
            renderGallery(currentYear);
            document.querySelectorAll('.photo-type-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`${currentPhotoType}-btn`).classList.add('active');
        });