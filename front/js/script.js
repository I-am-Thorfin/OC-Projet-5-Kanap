////* Fonction visant à charger l'api *////
const getProductsListing = async () => {
    await fetch(`http://localhost:3000/api/products`) // "Await" pour attendre que les informations nous soient données et utilisation de la méthode fetch pour aller chercher l'API
        .then(response => response.json()
            .then(JSON => productsListing = JSON)); // Réccupération des données de l'API et passage en format JSON.    
        console.log(`Tableau des Produits:`, productsListing); // On sort les infos de la console ( utiles pour bien s'assurer que nos informations de l'API sont bien reçues.)
};

/* Création de la fonction visant à créer les éléments HTML et les liés aux données de l'API. */
const showProductsListing = async() => {  // Création d'une fonction asynchrone qui attend les informations de getProductsListing
    await getProductsListing(); 
    
        for (let i=0; i < productsListing.length; i++) { 
           
           const items = document.getElementById(`items`); //On selectionne l'ID Item présent dans le html et on l'assigne à une variable Items en la selectionnant. 

           /* Les Liens*/
           const productLink = document.createElement(`a`); // On déclare une variable et on lui assigne la création d'un élément "a". 
           productLink.setAttribute('href', `product.html?id=${productsListing[i]._id}` // On modifie l'attribut href.
           );
           items.appendChild(productLink); //On ajoute notre lien comme enfant de "items"
           
           /* La balise Article */
           const productArticle = document.createElement(`article`); // On déclare une variable et on lui assigne la création d'un article
           productLink.appendChild(productArticle); // on ajoute notre article comme enfant de notre lien précédemment créé
                      
           /* Les Images */
           const productImages = document.createElement(`img`); // On déclare une variable et on lui assigne la création d'une balise img
           productImages.setAttribute(`src`, productsListing[i].imageUrl); // On modifie l'attribut src afin d'y ajouter l'url de l'image voulu 
           productImages.setAttribute(`alt`, productsListing[i].altTxt); // On modifie l'attribut alt et on y ajoute le texte voulu
           productArticle.appendChild(productImages); // on crée notre balise img comme enfant de notre article précédement créé
           
           /*Les Titres*/ 
           const title = document.createElement(`h3`); // On déclare une variable et on lui assigne la création d'un h3
           title.innerHTML = productsListing[i].name; // On modifie le contenu de notre h3 afin d'y mettre le nom de notre article
           productArticle.appendChild(title); // On créé notre titre h3 comme enfant de notre article

           /* Le texte */
           const productDescription = document.createElement(`p`); // On déclare une variable et on lui assigne la création d'un paragraphe p
           productDescription.innerHTML = productsListing[i].description; // on modifie le contenu de notre paragraphe en y installant la description de notre article.
           productArticle.appendChild(productDescription); // On crée notre paragraphe p comme enfant de notre article
    } 
};


showProductsListing();