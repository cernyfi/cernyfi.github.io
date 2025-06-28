        const digitalImages = [
            { name: "IMG_1671.JPG", date: "2025-01-29" },
            // ... (rest of your digitalImages array)
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

    const rotator = document.getElementById('rotator');
  let isForward = true;
        document.getElementById('digital-btn').addEventListener('click', () => toggleRotation());
        document.getElementById('film-btn').addEventListener('click', () => toggleRotation());
  function toggleRotation() {
    const icon = rotator.querySelector('i');
    
    if (isForward) {
      icon.classList.remove('fa-rotate');
      icon.classList.add('fa-rotate-right'); // visually same icon
      icon.classList.remove('rotate-forward');
      icon.classList.add('rotate-backward');
    } else {
      icon.classList.remove('fa-rotate-right');
      icon.classList.add('fa-rotate');
      icon.classList.remove('rotate-backward');
      icon.classList.add('rotate-forward');
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