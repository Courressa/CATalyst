const favouriteContainer = document.getElementById('favourite-list');
let favouriteBreeds = JSON.parse(localStorage.getItem('favouriteBreeds')) || [];

async function getFavBreedsImages(breedId, breedName, cardElement) {
    const urlToFetch = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`;

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            const favoriteImagesContainer = cardElement.querySelector('.favourite-images');

            console.log('Fetched breed image:', jsonResponse);
            jsonResponse.forEach(imageData => {
                const imageElement = document.createElement('img');
                
                imageElement.src = imageData.url;
                imageElement.alt = `${breedName}`;

                favoriteImagesContainer.appendChild(imageElement);
            });
        }
    } catch (error) {
        console.log('Failed to fetch cat breed images:', error);
    }
};

let removedFavInterval = null;

const renderFavourites = (favourites) => {
    favouriteContainer.innerHTML = ''; // Clear existing favourites

    if (favourites.length === 0) {
        favouriteContainer.innerHTML = `
        <p>No favourites added as yet.</p>
        <p>Explore the <a href="breeds.html">breeds page</a> to add some!</p>
        `;
        return;
    }

    favourites.forEach(favourite => {
        const favouriteCard = document.createElement('div');
        favouriteCard.classList.add('favourite-card');
        const altName = favourite.alt_names ? favourite.alt_names : "None";

        favouriteCard.innerHTML = `
            <img
                src="https://cdn2.thecatapi.com/images/${favourite.reference_image_id}.jpg" 
                alt=" ${favourite.name}"
            >
            <div class="favourite-card-content">
                <div class="favourite-card-icons">
                    <div class="favorite-icon">
                        <i class="fa-solid fa-heart fa-lg liked"></i>
                    </div>
                    <h3>${favourite.name}</h3>
                    <div class="info-arrow">
                        <i class="fa-solid fa-caret-down fa-2xl"></i>
                    </div>
                </div>
                <div class="favourite-info">
                    <p>${favourite.description}</p>
                    <p><strong>Origin:</strong> ${favourite.origin}</p>
                    <p><strong>A.K.A.:</strong> ${altName}</p>
                    <p><strong>Temperament:</strong> ${favourite.temperament}</p>
                    <p><strong>Life Span:</strong> ${favourite.life_span} years</p>
                    <p><strong>Intelligence:</strong> ${favourite.intelligence}/5</p>
                    <p><strong>Energy Level:</strong> ${favourite.energy_level}/5</p>
                    <p><strong>Affection Level:</strong> ${favourite.affection_level}/5</p>
                    <p><strong>Shedding Level:</strong> ${favourite.shedding_level}/5</p>
                    <p><strong>Child Friendly:</strong> ${favourite.child_friendly}/5</p>
                    <p><strong>Stranger Friendly:</strong> ${favourite.stranger_friendly}/5</p>
                    <p><strong>Dog Friendly:</strong> ${favourite.dog_friendly}/5</p>
                    
                    <div class="favourite-images">
                        <!-- Image elements will be dynamically inserted here -->
                    </div>
                </div>
            </div>
            
        `;
        

        const arrow = favouriteCard.querySelector('.info-arrow');
        const favouriteInfo = favouriteCard.querySelector('.favourite-info');
        const favouriteIcon = favouriteCard.querySelector('.favorite-icon i');

        arrow.addEventListener('click', () => {
            favouriteInfo.classList.toggle('visible');
            arrow.classList.toggle('rotated');

            if (!favouriteCard.dataset.imagesLoaded) {
                getFavBreedsImages(favourite.id, favourite.name, favouriteCard);

                // Mark images as loaded to prevent refetching on subsequent clicks
                favouriteCard.dataset.imagesLoaded = 'true'; 
            }
        });

        // Clear any existing interval before starting a new one
        if (removedFavInterval) clearInterval(removedFavInterval);

        favouriteIcon.addEventListener('click', () => {
            favouriteIcon.classList.remove('liked');
            
            // Remove breed from favourites if unliked
            const index = favouriteBreeds.findIndex(fav => fav.id === favourite.id);
                
            if (index !== -1) {
                console.log("Removed favourite!!!");
                favouriteBreeds.splice(index, 1);
                localStorage.setItem('favouriteBreeds', JSON.stringify(favouriteBreeds));
                
                favouriteCard.classList.add('removed');

                

                removedFavInterval = setInterval(() => {
                    renderFavourites(favouriteBreeds);
                }, 350);
            }
        });

        favouriteContainer.appendChild(favouriteCard);
    });
};

renderFavourites(favouriteBreeds);
