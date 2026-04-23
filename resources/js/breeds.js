const breedsContainer = document.getElementById('breed-list');
let favouriteBreeds = JSON.parse(localStorage.getItem('favouriteBreeds')) || [];

async function getBreeds() {
    const urlToFetch = 'https://api.thecatapi.com/v1/breeds';

    try {
        const response = await fetch(urlToFetch);

        if (response.ok) {
            const jsonResponse = await response.json();
            renderBreeds(jsonResponse);
        }
    } catch (error) {
        console.log('Failed to fetch cat breeds:', error);
    };
};

const saveFavouritesToLocalStorage = () => {
    localStorage.setItem('favouriteBreeds', JSON.stringify(favouriteBreeds));
};

const renderBreeds = (breeds) => {
    breedsContainer.innerHTML = '';

    if (breeds.length === 0) {
        breedsContainer.innerHTML = `
        <p>No breeds found.</p>
        <p>Try refreshing the page or check back later!</p>
        `;
        return;
    };

    breeds.forEach(breed => {
        const breedCard = document.createElement('div');
        breedCard.classList.add('breed-card');

        breedCard.innerHTML = `
            <img 
                src="https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg"
                alt="${breed.name}"
            >
            <div>
                <h3>${breed.name}</h3>
                <div class="breed-card-icons">
                    <div class="info-arrow">
                        <i class="fa-solid fa-caret-down fa-2xl"></i>
                    </div>
                    <div class="favorite-icon">
                        <i class="fa-solid fa-heart fa-lg"></i>
                    </div>
                </div>
                <div class="breed-info">
                    <p>${breed.description}</p>
                    <p><strong>Origin:</strong> ${breed.origin}</p>
                    <p><strong>Temperament:</strong> ${breed.temperament}</p>
                </div>
            </div>

            
        `;

        const arrow = breedCard.querySelector('.info-arrow');
        const breedInfo = breedCard.querySelector('.breed-info');
        const favoriteIcon = breedCard.querySelector('.favorite-icon i');
        
        arrow.addEventListener('click', () => {
            breedInfo.classList.toggle('visible');
            arrow.classList.toggle('rotated');
        });

        favoriteIcon.addEventListener('click', () => {
            favoriteIcon.classList.toggle('liked');

            if (favoriteIcon.classList.contains('liked')) {
                favouriteBreeds.push(breed);
            } else {
                // Remove breed from favourites if unliked
                const index = favouriteBreeds.findIndex(fav => fav.id === breed.id);
                
                if (index !== -1) {
                    favouriteBreeds.splice(index, 1);
                }
            }; 

            saveFavouritesToLocalStorage();
        });

        if (favouriteBreeds.some(fav => fav.id === breed.id) && !favoriteIcon.classList.contains('liked')) {
            favoriteIcon.classList.add('liked');
        }

        breedsContainer.appendChild(breedCard);
    });
};

getBreeds();
