//Recupérer toutes les espèces depuis l'API Rick and Morty
async function getAllSpecies() {
    let species = new Set(); // Utiliser un Set pour éviter les doublons
    let page = 1;
    let haveNextPage = true;

    while (haveNextPage) {
        try {
            const reponsePage = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            
            if (!reponsePage.ok) {
                console.warn(`Erreur HTTP ${reponsePage.status} à la page ${page}`);
                break;
            }
            
            const dataPage = await reponsePage.json();
            
            dataPage.results.forEach(character => {
                if (character.species) {
                    species.add(character.species);
                }
            });
            
            if (dataPage.info.next) {
                page++;
                // Ajouter un délai pour éviter le rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            } else {
                haveNextPage = false;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des species:', error);
            haveNextPage = false;
        }
    }
    
    return Array.from(species).sort();
}

//Recupérer toutes les locations possibles depuis l'API Rick and Morty
async function getAllLocations() {

    try {
        const response = await fetch('https://rickandmortyapi.com/api/location');
        const data = await response.json();
        return data.results.map(location => location.name);
    } catch (error) {
        console.error('Erreur lors de la récupération des locations:', error);
        return [];
    }

}

//Remplir les options des selecteurs dans le formulaire
async function populatePreferences() {
    const speciesSelect = document.getElementById('species');
    const locationsSelect = document.getElementById('location');

    // Récupérer toutes les species
    const species = await getAllSpecies();

    // Vérifier que species n'est pas vide
    if (!species || species.length === 0) {
        console.warn('Aucune espèce récupérée');
        return;
    }

    // Vider la list box
    speciesSelect.innerHTML = '';

    // Ajouter les options
    species.forEach(specie => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'species';
        radio.value = specie;
        
        const span = document.createElement('span');
        span.textContent = specie;
        
        label.appendChild(radio);
        label.appendChild(span);
        speciesSelect.appendChild(label);
    });

    // Récupérer et remplir les locations
    const locations = await getAllLocations();
    
    if (locations && locations.length > 0) {
        locationsSelect.innerHTML = '';
        
        locations.forEach(location => {
            const label = document.createElement('label');
            label.className = 'checkbox-item';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'location';
            radio.value = location;
            
            const span = document.createElement('span');
            span.textContent = location;
            
            label.appendChild(radio);
            label.appendChild(span);
            locationsSelect.appendChild(label);
        });
    }

    console.log(`${species.length} espèces chargées:`, species);
    console.log(`${locations?.length || 0} locations chargées`);
}

// Fonction pour récupérer un personnage selon les critères
async function findMatchingCharacter(filters) {
    let url = 'https://rickandmortyapi.com/api/character/?';
    const params = [];

    // N'ajouter le filtre que si quelque chose est sélectionné
    if (filters.status.length > 0) {
        params.push(`status=${filters.status[0]}`);
    }
    if (filters.gender.length > 0) {
        params.push(`gender=${filters.gender[0]}`);
    }
    if (filters.species.length > 0) {
        params.push(`species=${filters.species[0]}`);
    }

    url += params.join('&');

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            // Filtrer par location si nécessaire (seulement si une location est sélectionnée)
            let filteredResults = data.results;
            if (filters.location.length > 0) {
                filteredResults = data.results.filter(char => 
                    filters.location.includes(char.location.name)
                );
            }

            if (filteredResults.length > 0) {
                // Sélectionner un personnage aléatoire
                const randomIndex = Math.floor(Math.random() * filteredResults.length);
                return filteredResults[randomIndex];
            }
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la recherche de personnage:', error);
        return null;
    }
}

// Fonction pour afficher le personnage
function displayCharacter(character) {
    let resultDiv = document.getElementById('result');

    if (!character) {
        resultDiv.innerHTML = '<p class="no-result">Aucun personnage trouvé avec ces critères.</p>';
        return;
    }

    resultDiv.innerHTML = `
        <div class="character-card">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <div class="character-info">
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
            </div>
            <div class="swipe-buttons">
                <button onclick="swipeLeft()" class="swipe-btn dislike-btn">✕</button>
                <button onclick="swipeRight()" class="swipe-btn like-btn">❤</button>
            </div>
        </div>
    `;
    
    // Stocker le personnage actuel pour pouvoir l'ajouter aux favoris
    window.currentCharacter = character;
    window.currentFilters = window.currentFilters || {};
}

// Fonction pour swiper à gauche (dislike)
function swipeLeft() {
    const card = document.querySelector('.character-card');
    if (!card) return;
    
    card.classList.add('swipe-left');
    
    setTimeout(() => {
        loadNewCharacter();
    }, 300);
}

// Fonction pour swiper à droite (like)
function swipeRight() {
    const card = document.querySelector('.character-card');
    if (!card || !window.currentCharacter) return;
    
    // Ajouter aux favoris
    addToFavorites(window.currentCharacter.id);
    
    card.classList.add('swipe-right');
    
    setTimeout(() => {
        loadNewCharacter();
    }, 300);
}

// Fonction pour charger un nouveau personnage
function loadNewCharacter() {
    if (window.currentFilters) {
        findMatchingCharacter(window.currentFilters).then(character => {
            displayCharacter(character);
        });
    }
}

// Fonction pour ajouter un personnage aux favoris
function addToFavorites(characterId) {
    const character = window.currentCharacter;
    if (!character) return;
    
    // Récupérer les favoris existants
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Vérifier si le personnage n'est pas déjà dans les favoris
    if (favorites.find(fav => fav.id === character.id)) {
        return; // Ne pas afficher d'alerte pour une meilleure UX
    }
    
    // Ajouter le personnage
    favorites.push(character);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    displayFavorites();
}

// Fonction pour afficher les favoris
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="no-favorites">Aucun favori pour le moment</p>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map(char => `
        <div class="favorite-card">
            <img src="${char.image}" alt="${char.name}">
            <div class="favorite-info">
                <h3>${char.name}</h3>
                <p>${char.species} - ${char.status}</p>
                <button onclick="removeFromFavorites(${char.id})" class="remove-btn">🗑️ Retirer</button>
            </div>
        </div>
    `).join('');
}

// Fonction pour retirer un personnage des favoris
function removeFromFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(fav => fav.id !== characterId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Fonction pour ouvrir/fermer le panneau latéral
function toggleSidebar() {
    const sidebar = document.getElementById('favoritesSidebar');
    sidebar.classList.toggle('open');
}

// Gérer la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault();

    const statusChecked = document.querySelector('#status input[type="radio"]:checked');
    const genderChecked = document.querySelector('#gender input[type="radio"]:checked');
    const speciesChecked = document.querySelector('#species input[type="radio"]:checked');
    const locationChecked = document.querySelector('#location input[type="radio"]:checked');

    const filters = {
        status: statusChecked ? [statusChecked.value] : [],
        gender: genderChecked ? [genderChecked.value] : [],
        species: speciesChecked ? [speciesChecked.value] : [],
        location: locationChecked ? [locationChecked.value] : []
    };
    
    // Stocker les filtres pour les prochains swipes
    window.currentFilters = filters;

    findMatchingCharacter(filters).then(character => {
        displayCharacter(character);
    });
}

// Fonction pour réduire/déplier les préférences
function togglePreferencesCollapse() {
    const form = document.getElementById('preferencesForm');
    const toggleBtn = document.getElementById('togglePreferences');
    
    form.classList.toggle('collapsed');
    toggleBtn.textContent = form.classList.contains('collapsed') ? '▶' : '▼';
}

// Appeler la fonction pour remplir les préférences au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    populatePreferences();
    
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
    
    // Gérer l'ouverture/fermeture du panneau des favoris
    const toggleBtn = document.getElementById('toggleFavorites');
    const closeBtn = document.getElementById('closeSidebar');
    
    toggleBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    
    // Gérer le collapse des préférences
    const togglePrefsBtn = document.getElementById('togglePreferences');
    togglePrefsBtn.addEventListener('click', togglePreferencesCollapse);
    
    // Permettre la désélection des radio buttons
    enableRadioDeselection();
    
    // Afficher les favoris au chargement
    displayFavorites();
});

// Fonction pour permettre la désélection des radio buttons
function enableRadioDeselection() {
    let lastChecked = {};
    
    document.addEventListener('click', (e) => {
        if (e.target.type === 'radio') {
            const name = e.target.name;
            
            if (lastChecked[name] === e.target) {
                e.target.checked = false;
                lastChecked[name] = null;
            } else {
                lastChecked[name] = e.target;
            }
        }
    });
}