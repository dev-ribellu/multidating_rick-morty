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
