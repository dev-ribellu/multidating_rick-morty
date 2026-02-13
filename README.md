# 💫 Multiverse Dating - Rencontres Interdimensionnelles

> Application de rencontres inspirée de Tinder, basée sur l'univers de Rick et Morty utilisant l'API Rick and Morty

## 📋 Description du Projet

Multiverse Dating est une application web interactive de type "dating app" permettant de découvrir les personnages de l'univers Rick et Morty à travers un système de swipe (glissé). Filtrez selon vos préférences, "swipez" sur les personnages qui vous plaisent et constituez votre collection de favoris à travers les dimensions ! L'application utilise l'API Rick and Morty pour récupérer et afficher les profils des personnages de manière aléatoire selon vos critères.

## 🎯 Concepts Techniques Mis en Œuvre

Ce projet démontre la maîtrise des concepts suivants :
- **Manipulation du DOM** - Création dynamique d'éléments, gestion des événements
- **Appels API asynchrones** - `fetch()` avec async/await, gestion de multiples pages
- **LocalStorage** - Stockage persistant des favoris avec sérialisation JSON
- **Gestion d'état** - Suivi du personnage actuel et des filtres appliqués
- **Programmation événementielle** - Listeners sur formulaires, boutons, radio buttons
- **Traitement de données** - Filtrage, dédoublonnage (Set), sélection aléatoire
- **UX interactive** - Animations CSS, transitions, sidebar, collapse
- **Gestion d'erreurs** - try/catch, gestion des réponses HTTP, fallbacks
- **Optimisation API** - Rate limiting, récupération intelligente des données

## 🚀 Fonctionnalités

### ✅ Fonctionnalités Principales

1. **Système de Préférences Avancé**
   - Filtrage par statut (vivant, mort, inconnu)
   - Filtrage par genre (homme, femme, sans genre, inconnu)
   - Filtrage par espèce (récupération dynamique de toutes les espèces disponibles)
   - Filtrage par localisation (récupération dynamique de toutes les locations)
   - Radio buttons désélectionnables pour plus de flexibilité
   - Section des préférences extensible/rétractable

2. **Système de Swipe (Type Tinder)**
   - Affichage aléatoire de personnages selon les filtres sélectionnés
   - Bouton "Dislike" (✕) - swipe à gauche pour passer au suivant
   - Bouton "Like" (❤) - swipe à droite pour ajouter aux favoris
   - Animations de transition lors des swipes
   - Chargement automatique du personnage suivant après un swipe

3. **Carte de Personnage Interactive**
   - Affichage du nom et de l'image du personnage
   - Informations détaillées : statut, espèce, genre, origine, localisation
   - Design type carte de profil "dating app"

4. **Système de Favoris Complet**
   - Ajout automatique aux favoris lors d'un swipe à droite
   - Stockage persistant avec `localStorage`
   - Sidebar latérale dédiée aux favoris
   - Bouton de suppression pour retirer des favoris
   - Affichage miniature avec informations clés
   - Prévention des doublons automatique

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique de l'application
- **CSS3** - Mise en forme, animations, transitions, responsive design
- **JavaScript ES6+** - Logique applicative complète
  - Fetch API - Appels HTTP asynchrones
  - Async/Await - Gestion de l'asynchronisme
  - LocalStorage - Persistance des favoris
  - Set - Dédoublonnage des espèces
  - Event Listeners - Interactivité
  - DOM Manipulation - Création dynamique de contenu
  - Array Methods - map, filter, find, forEach

## 📊 Fonctionnement de l'Application

### Flux Utilisateur

```
1. Chargement de la page
   └─> Récupération de toutes les espèces
   └─> Récupération de toutes les locations
   └─> Peuplement dynamique des filtres
   └─> Chargement des favoris depuis localStorage

2. Sélection des préférences
   └─> L'utilisateur choisit ses filtres (optionnels)
   └─> Soumission du formulaire

3. Affichage d'un personnage
   └─> Requête API avec filtres
   └─> Filtrage côté client (location)
   └─> Sélection aléatoire
   └─> Affichage de la carte

4. Interaction Swipe
   └─> Swipe Left: Passe au suivant
   └─> Swipe Right: Ajoute aux favoris + passe au suivant

5. Gestion des favoris
   └─> Consultation dans la sidebar
   └─> Suppression possible
   └─> Sauvegarde automatique dans localStorage
```

## 📦 Structure du Projet

```
multidating_rick-morty/
├── index.html              # Page principale de l'application
├── script/
│   └── preferences.js      # Logique JavaScript complète (filtres, swipe, favoris)
├── style/
│   ├── index.css           # Styles principaux
│   ├── index.css.backup    # Sauvegarde des styles
│   └── preference.css      # Styles pour la section des préférences
├── test/
│   ├── test.html           # Page de test
│   ├── test2.html          # Page de test secondaire
│   └── script/
│       └── finding.js      # Script de test
└── README.md               # Documentation du projet
```

## 🔗 API Utilisée

**Rick and Morty API**
- Documentation : https://rickandmortyapi.com/documentation
- Endpoint personnages : `https://rickandmortyapi.com/api/character`
- Endpoint locations : `https://rickandmortyapi.com/api/location`
- Paramètres de filtrage : `page`, `status`, `gender`, `species`, `name`

### Exemples de requêtes :
```javascript
// Récupérer des personnages avec filtres
fetch('https://rickandmortyapi.com/api/character?page=1&status=alive&gender=male')

// Récupérer toutes les locations
fetch('https://rickandmortyapi.com/api/location')

// Récupérer une page spécifique avec espèce
fetch('https://rickandmortyapi.com/api/character?page=2&species=Human')
```

### Structure de réponse :
```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      "origin": { "name": "Earth (C-137)" },
      "location": { "name": "Citadel of Ricks" },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```

## 💻 Installation et Utilisation

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd multidating_rick-morty
   ```

2. **Lancer l'application**
   - Ouvrir `index.html` dans un navigateur moderne
   - Ou utiliser un serveur local (recommandé) :
     ```bash
     # Avec Python
     python -m http.server 8000
     
     # Avec Node.js
     npx serve
     ```

3. **Accéder à l'application**
   - Ouvrir http://localhost:8000 dans votre navigateur

## 🎮 Guide d'Utilisation

### Démarrage Rapide

1. **Ouvrir l'application** - Lancez `index.html` dans votre navigateur
2. **Définir vos préférences** - Sélectionnez vos filtres (status, gender, species, location)
3. **Lancer la recherche** - Cliquez sur le bouton de recherche
4. **Swiper les personnages** :
   - ❤️ **Like** (bouton droit) - Ajoute le personnage aux favoris et passe au suivant
   - ✕ **Dislike** (bouton gauche) - Passe simplement au personnage suivant
5. **Consulter vos favoris** - Cliquez sur le bouton "❤️ Favoris" en haut pour ouvrir la sidebar
6. **Gérer vos favoris** - Utilisez le bouton 🗑️ pour retirer un favori

### Astuces

- **Retirer un filtre** : Cliquez à nouveau sur un radio button sélectionné pour le désélectionner
- **Réduire les préférences** : Cliquez sur le bouton ▼ pour replier la section des filtres
- **Aucun résultat ?** : Essayez d'assouplir vos critères en désélectionnant certains filtres

## 📝 Fonctionnalités Techniques Implémentées

### 🔧 Récupération Dynamique des Données

```javascript
// Récupération de toutes les espèces disponibles dans l'API
async function getAllSpecies() {
  // Parcourt toutes les pages pour récupérer toutes les espèces
  // Utilise un Set pour éviter les doublons
  // Gestion du rate limiting avec délais
}

// Récupération de toutes les locations
async function getAllLocations() {
  // Récupère la liste complète des locations depuis l'API
}
```

### 🔍 Système de Matching

```javascript
// Recherche de personnages selon les filtres
async function findMatchingCharacter(filters) {
  // Construction dynamique de l'URL avec URLSearchParams
  // Filtrage par status, gender, species (via API)
  // Filtrage par location (côté client)
  // Sélection aléatoire d'un personnage dans les résultats
}
```

### ❤️ Système de Swipe

```javascript
// Swipe à gauche (dislike)
function swipeLeft() {
  // Animation de carte
  // Chargement du personnage suivant
}

// Swipe à droite (like)
function swipeRight() {
  // Ajout aux favoris
  // Animation de carte
  // Chargement du personnage suivant
}
```

### 💾 Gestion des Favoris

```javascript
// Ajouter aux favoris
function addToFavorites(characterId) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Prévention des doublons
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Retirer des favoris
function removeFromFavorites(characterId) {
  // Filtrage et mise à jour du localStorage
}
```

## 🎨 Caractéristiques UX/UI

- **Interface Type "Dating App"** - Design inspiré de Tinder avec swipe gauche/droite
- **Sidebar Favoris** - Panneau latéral qui s'ouvre/ferme pour consulter les favoris
- **Préférences Rétractables** - Section des filtres extensible pour gagner de l'espace
- **Radio Buttons Désélectionnables** - Flexibilité pour retirer un filtre déjà sélectionné
- **Animations Fluides** - Transitions lors des swipes et affichage des cartes
- **Design Responsive** - Adaptation aux différentes tailles d'écran

## 🎨 Améliorations Possibles

- [ ] Barre de recherche par nom de personnage
- [ ] Mode sombre / clair
- [ ] Système de "super like" pour marquer des favoris spéciaux
- [ ] Export des favoris en JSON
- [ ] Comparaison de deux personnages favoris
- [ ] Système de "matching" avec score de compatibilité
- [ ] Historique des personnages déjà vus
- [ ] Statistiques de swipe (% like/dislike)
- [ ] Partage de profils favoris
- [ ] Swipe tactile sur mobile (gestes de glissement)

## 📚 Ressources Utiles

- [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation)
- [MDN - Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [MDN - LocalStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- [MDN - Dialog Element](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog)
- [MDN - URLSearchParams](https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams)

## ⚠️ Prérequis

- Navigateur moderne supportant ES6+ (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour accéder à l'API Rick and Morty)
- JavaScript activé

## ⚡ Performances

- **Chargement initial** : Récupération de ~800 personnages pour extraire toutes les espèces (~2-3 secondes)
- **Rate limiting** : Délai de 100ms entre les pages pour éviter la surcharge de l'API
- **Optimisation** : Utilisation de Set pour dédoublonnage en O(1)
- **Cache** : Les favoris sont stockés localement (pas de requête API pour y accéder)

## 🐛 Gestion des Erreurs

L'application gère les cas suivants :
- ✅ Aucun personnage trouvé avec les filtres (affichage d'un message)
- ✅ Erreur réseau (console.error et gestion gracieuse)
- ✅ Liste vide de favoris (affichage d'un message approprié)
- ✅ Prévention des doublons dans les favoris
- ✅ Erreurs HTTP lors de la récupération des données

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique.

## 👨‍💻 Auteur

Projet académique - Formation Développement Web
S3 - Multidating Rick & Morty

---

**Bon coding et bonnes rencontres interdimensionnelles ! 🚀✨**