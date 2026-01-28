async function findMatches(preferences) {
    // Construire l'URL avec les filtres
    const baseUrl = 'https://rickandmortyapi.com/api/character/';
    const params = new URLSearchParams();
    
    // Ajouter les filtres selon les préférences
    
    if (preferences.status && preferences.status.length > 0) {
        
        params.append('status', preferences.status[0]);
    }
    
    if (preferences.gender && preferences.gender.length > 0) {
        
        params.append('gender', preferences.gender[0]);
    }
    
    
    const url = `${baseUrl}?${params.toString()}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        let matches = data.results || [];
        
        // Filtrer davantage si plusieurs statuts ou genres sont sélectionnés
        if (preferences.status && preferences.status.length > 1) {
            matches = matches.filter(character => 
                preferences.status.includes(character.status.toLowerCase())
            );
        }
        
        if (preferences.gender && preferences.gender.length > 1) {
            matches = matches.filter(character => 
                preferences.gender.includes(character.gender.toLowerCase())
            );
        }
        
        return matches;
    } catch (error) {
        console.error('Error fetching matches:', error);
        return [];
    }
}

// Fonction pour récupérer toutes les espèces (species) uniques
async function getAllSpecies() {
    const speciesSet = new Set();
    let page = 1;
    let hasNextPage = true;

    try {
        // Parcourir toutes les pages de personnages
        while (hasNextPage) {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            
            // Ajouter chaque species au Set (évite les doublons)
            data.results.forEach(character => {
                if (character.species) {
                    speciesSet.add(character.species);
                }
            });
            
            // Vérifier s'il y a une page suivante
            hasNextPage = data.info.next !== null;
            page++;
        }

        // Convertir le Set en tableau et trier alphabétiquement
        return Array.from(speciesSet).sort();
    } catch (error) {
        console.error('Erreur lors de la récupération des species:', error);
        return [];
    }
}

// Fonction pour peupler le select des species
async function populateSpeciesSelect() {
    const speciesSelect = document.getElementById('species');
    
    if (!speciesSelect) {
        console.error('Element species select non trouvé');
        return;
    }

    // Afficher un message de chargement
    speciesSelect.innerHTML = '<option>Chargement...</option>';
    
    // Récupérer toutes les species
    const species = await getAllSpecies();
    
    // Vider le select
    speciesSelect.innerHTML = '';
    
    // Ajouter les options
    species.forEach(specie => {
        const option = document.createElement('option');
        option.value = specie;
        option.textContent = specie;
        speciesSelect.appendChild(option);
    });
    
    console.log(`${species.length} espèces chargées:`, species);
}

// Charger les species au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    populateSpeciesSelect();
});
