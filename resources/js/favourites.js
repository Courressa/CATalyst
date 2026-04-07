const favouriteContainer = document.getElementById('favourite-list');

const mockFavourites = [
    {
        id: "abys",
        name: "Abyssinian",
        image: "https://...",
        origin: "Ethiopia",
    },
    { 
        id: "per", 
        name: "Persian", 
        image: "https://...",
        origin: "Iran",
    },
];


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

        favouriteCard.innerHTML = `
            <img src="${favourite.image}" alt="${favourite.name}">
            <h3>${favourite.name}</h3>
            <p><strong>Origin:</strong> ${favourite.origin}</p>
        `;

        favouriteContainer.appendChild(favouriteCard);
    });
};

renderFavourites(mockFavourites);
