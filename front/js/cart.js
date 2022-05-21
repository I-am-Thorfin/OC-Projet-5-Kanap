let addProduct = JSON.parse(localStorage.getItem("stockedproducts")); // on recupere ce qu'il y a dans le local storage
console.log(addProduct);

const getProductsListing = async () => {
  await fetch(`http://localhost:3000/api/products`) // "Await" pour attendre que les informations nous soient données et utilisation de la méthode fetch pour aller chercher l'API
      .then(response => response.json()
          .then(JSON => productsListing = JSON)); // Réccupération des données de l'API et passage en format JSON.    
      console.log(`Tableau des Produits:`, productsListing); // On sort les infos de la console ( utiles pour bien s'assurer que nos informations de l'API sont bien reçues.)
};
getProductsListing ()


