/* Fetch 10 random cat images from The Cat API */
async function getImages() {
    const urlToFetch = 'https://api.thecatapi.com/v1/images/search?limit=10'

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            const imageUrls = jsonResponse.map(image => image.url);
            renderHomeImages(imageUrls);
        }

    } catch (error) {
        console.log('Failed to fetch cat images:', error);
    }
}

/* Generate an array of 4 unique random indices */
const fourRandomNumbers = () => {
    const indices = [];
    while (indices.length < 4) {
        const randomNum = Math.floor(Math.random() * 10);
        if (!indices.includes(randomNum)) {
            indices.push(randomNum);
        };
    };

    return indices;
};

/* Render images on the home page */
const renderHomeImages = (imageUrls) => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const fourCatImages = document.querySelectorAll('.four-cats');
    const randomIndices = fourRandomNumbers();

    // Clear any previous images (prevents duplicates if script runs twice)
    slideshowContainer.querySelectorAll('img').forEach(img => img.remove());

    // Add 10 random images to the welcome section
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Adorable cat';
        img.classList.add('slideshow-image');

        slideshowContainer.appendChild(img);
    })

    // Set the 4 specific images for the design sections
    fourCatImages.forEach((cat, index) => {
        if (imageUrls[randomIndices[index]] != undefined) {
            cat.src = imageUrls[randomIndices[index]];
        }
    });
    
    slideshowContainer.style.transition = 'transform 1.5s ease-in-out';
    startSlideshow();
}

/* Add slideshow functionality */
let currentIndex = 0;
let slideshowInterval = null;

const startSlideshow = () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const slideshowImages = document.querySelectorAll('.slideshow-image');

    // No images to show if there are less than 2 images
    if (slideshowImages.length < 2) return; 

    // Clear any existing interval before starting a new one
    if (slideshowInterval) clearInterval(slideshowInterval); 

    currentIndex = 0;

    // Show the first image immediately
    slideshowContainer.style.transform = 'translateX(0)';

    slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slideshowImages.length;

        // Move the slideshow container to show the next image
        slideshowContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 5000); // Change image every 5 seconds
};

document.addEventListener('DOMContentLoaded', () => {
    getImages();
});