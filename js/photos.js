
    // Select all gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    // Create a lightbox div to show larger image
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Create an image element to display in the lightbox
            const fullImage = document.createElement('img');
            fullImage.src = img.src;
            lightbox.innerHTML = '';
            lightbox.appendChild(fullImage);
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox when clicked
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });