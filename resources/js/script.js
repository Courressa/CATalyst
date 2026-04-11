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
    const welcomeContainer = document.getElementById('welcome');
    const fourCatImages = document.querySelectorAll('.four-cats');
    const randomIndices = fourRandomNumbers();

    // Clear any previous images (prevents duplicates if script runs twice)
    welcomeContainer.querySelectorAll('img').forEach(img => img.remove());

    // Add 10 random images to the welcome section
    imageUrls.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Adorable cat';
        img.classList.add('welcome-image');
        welcomeContainer.appendChild(img);
    })

    // Set the 4 specific images for the design sections
    fourCatImages.forEach((cat, index) => {
        if (imageUrls[randomIndices[index]] != undefined) {
            cat.src = imageUrls[randomIndices[index]];
        }
    });
    
}

getImages();