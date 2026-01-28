
//Recupérer toutes les espèces depuis l'API Rick and Morty
async function getAllSpecies() {
    let species =[];
    let page =1;
    let haveNextPage = true;

    while (haveNextpage) try {
        const reponsePage = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const dataPage = await reponsePage.json();
        dataPage.results.forEach(character => {
            if (character.species && !species.includes(character.species)) {
                species.push(character.species);
            }
        });
        if (dataPage.info.next) {
            page++;
        } else {
            haveNextPage = false;
        }
        
    } catch (error) {
        console.error('Erreur lors de la récupération des species:', error);
        return [];
    }
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
// Appeler la fonction pour remplir les préférences au chargement de la page
document.addEventListener('DOMContentLoaded', populatePreferences);