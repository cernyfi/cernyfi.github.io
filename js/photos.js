
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const fullImage = document.createElement('img');
            fullImage.src = img.src;
            lightbox.innerHTML = '';
            lightbox.appendChild(fullImage);
            lightbox.style.display = 'flex';
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });