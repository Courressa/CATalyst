const breedsContainer = document.getElementById('breed-list');

const mockBreeds = [
    {
        id: "abys",
        name: "Abyssinian",
        description: "A highly active and playful breed...",
        image: "https://...",
        origin: "Ethiopia",
        temperament: "Active, Energetic, Playful"
    },
    {
        id: "beng",
        name: "Bengal",
        description: "Highly energetic and intelligent...",
        image: "https://...",
        origin: "United States",
        temperament: "Energetic, Intelligent, Playful"
    },
    { 
        id: "per", 
        name: "Persian", 
        description: "A docile and affectionate breed.", 
        image: "https://...",
        origin: "Iran",
        temperament: "Calm, Gentle, Affectionate"
    },
    {   
        id: "sia", 
        name: "Siamese",
        description: "A vocal and social breed.",
        image: "https://...",
        origin: "Thailand",
        temperament: "Affectionate, Intelligent, Playful"
    },
];

const renderBreeds = (breeds) => {
    breedsContainer.innerHTML = '';

    breeds.forEach(breed => {
        const breedCard = document.createElement('div');
        breedCard.classList.add('breed-card');

        breedCard.innerHTML = `
            <img src="${breed.image}" alt="${breed.name}">
            <h3>${breed.name}</h3>

            <div class="info-arrow">
                <span>▼</span>
            </div>
            <div class="breed-info">
                <p>${breed.description}</p>
                <p><strong>Origin:</strong> ${breed.origin}</p>
                <p><strong>Temperament:</strong> ${breed.temperament}</p>
            </div>
        `;

        const arrow = breedCard.querySelector('.info-arrow');
        const breedInfo = breedCard.querySelector('.breed-info');
        
        arrow.addEventListener('click', () => {
            breedInfo.classList.toggle('visible');
            arrow.classList.toggle('rotated');
        });

        breedsContainer.appendChild(breedCard);
    });

}

renderBreeds(mockBreeds);