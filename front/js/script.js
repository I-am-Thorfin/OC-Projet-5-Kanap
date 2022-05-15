////* Fonction visant à charger l'api *////
const getProductsListing = async () => {
    await fetch(`http://localhost:3000/api/products`) // "Await" pour attendre que les informations nous soient données et utilisation de la méthode fetch pour aller chercher l'API
        .then(response => response.json()
            .then(JSON => products = JSON)); // Réccupération des données de l'API et passage en format JSON.    
        console.log(`Tableau des Produits:`, products); // On sort les infos de la console ( utiles pour bien s'assurer que nos informations de l'API sont bien reçues.)
};



getProductsListing();// On pose la fonction pour la charger et obtenir les données depuis l'API. 



