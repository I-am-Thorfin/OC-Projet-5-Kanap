////* Fonction visant à charger l'api *////
const getProductsListing = async () => {
    await fetch(`http://localhost:3000/api/products`) // "Await" pour attendre que les informations nous soient données et utilisation de la méthode fetch pour aller chercher l'API
        .then(response => response.json()
            .then(JSON => products = JSON)); // Réccupération des données de l'API et passage en format JSON.    
        console.log(`Tableau des Produits:`, products); // On sort les infos de la console ( utiles pour bien s'assurer que nos informations de l'API sont bien reçues.)
};

/* Création de la fonction visant à créer les éléments HTML et les liés aux données de l'API. */
const showProductsListing = async() => {  // Création d'une fonction asynchrone qui attend les informations de getProductsListing
    await getProductsListing(); 
    
        
};


showProductsListing();