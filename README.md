# 💫 Multiverse Dating - Rencontres Interdimensionnelles

> Application de rencontres basée sur l'univers de Rick et Morty utilisant l'API Rick and Morty

## 📋 Description du Projet

Multiverse Dating est une application web interactive permettant de naviguer et filtrer les personnages de l'univers Rick et Morty pour trouver votre match parfait à travers les dimensions ! L'application utilise l'API Rick and Morty pour récupérer et afficher les profils des personnages.

## 🎯 Objectifs Pédagogiques

Ce projet est un TP final qui couvre les concepts suivants :
- Manipulation du DOM avec JavaScript
- Appels API avec `fetch()`
- Gestion du stockage local avec `localStorage`
- Utilisation de l'élément HTML `<dialog>`
- Manipulation des paramètres d'URL avec `URLSearchParams`
- JavaScript asynchrone (async/await, Promises)

## 🚀 Fonctionnalités

### ✅ Fonctionnalités Principales

1. **Affichage des personnages** (Section 1)
   - Récupération des données depuis l'API Rick and Morty
   - Affichage de 20 personnages par page
   - Informations affichées : nom, image, statut, espèce, genre, origine

2. **Système de filtres** (Section 2)
   - Filtrage par statut (vivant, mort, inconnu)
   - Filtrage par genre (homme, femme, sans genre, inconnu)
   - Filtres multiples combinables
   - Mise à jour des paramètres d'URL

3. **Pagination** (Section 3)
   - Navigation entre les pages de résultats
   - Boutons Précédent/Suivant
   - Gestion de l'état de pagination dans l'URL

4. **Système de favoris** (Bonus)
   - Ajout/suppression de personnages aux favoris
   - Stockage persistant avec `localStorage`
   - Affichage dans une boîte de dialogue modale
   - Indication visuelle des favoris

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Mise en forme et responsive design
- **JavaScript ES6+** - Logique applicative
  - Fetch API
  - Async/Await
  - LocalStorage
  - URLSearchParams
  - DOM Manipulation

## 📦 Structure du Projet

```
multidating_rick-morty/
├── index.html          # Page principale
├── script/
│   └── finding.js      # Logique JavaScript
├── README.md           # Documentation
└── TP Final.pdf        # Énoncé du projet
```

## 🔗 API Utilisée

**Rick and Morty API**
- Documentation : https://rickandmortyapi.com/documentation
- Endpoint principal : `https://rickandmortyapi.com/api/character`
- Paramètres disponibles : `page`, `status`, `gender`, `species`, `name`

### Exemple de requête :
```javascript
fetch('https://rickandmortyapi.com/api/character?page=1&status=alive&gender=male')
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

## 📝 Guide d'Implémentation

### Section 1 : Affichage des Personnages

```javascript
// Récupérer et afficher les personnages
async function fetchCharacters(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  // Afficher les résultats
}
```

### Section 2 : Filtres

```javascript
// Gérer les filtres
function applyFilters() {
  const status = document.getElementById('status').value;
  const gender = document.getElementById('gender').value;
  // Construire l'URL avec URLSearchParams
}
```

### Section 3 : Pagination

```javascript
// Gérer la pagination
function setupPagination(info) {
  const { prev, next } = info;
  // Créer les boutons de navigation
}
```

### Bonus : Favoris

```javascript
// Système de favoris
function toggleFavorite(character) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // Ajouter/retirer des favoris
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
```

## 🎨 Améliorations Possibles

- [ ] Barre de recherche par nom
- [ ] Filtres additionnels (espèce, origine)
- [ ] Animations et transitions
- [ ] Mode sombre
- [ ] Export des favoris
- [ ] Comparaison de personnages
- [ ] Système de "matching" aléatoire

## 📚 Ressources Utiles

- [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation)
- [MDN - Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [MDN - LocalStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- [MDN - Dialog Element](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog)
- [MDN - URLSearchParams](https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams)

## ⚠️ Prérequis

- Navigateur moderne supportant ES6+ (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour accéder à l'API)

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique.

## 👨‍💻 Auteur

Projet réalisé dans le cadre du TP Final - Multiverse Dating

---

**Bon coding et bonnes rencontres interdimensionnelles ! 🚀✨**