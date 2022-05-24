let addedProduct = JSON.parse(localStorage.getItem("stockedProducts")); // on recupere ce qu'il y a dans le local storage


const getProductsListing = async () => {
  await fetch(`http://localhost:3000/api/products`) // "Await" pour attendre que les informations nous soient données et utilisation de la méthode fetch pour aller chercher l'API
      .then(response => response.json()
          .then(JSON => productsListing = JSON)); // Réccupération des données de l'API et passage en format JSON.    
      console.log(`Tableau des Produits:`, productsListing); // On sort les infos de la console ( utiles pour bien s'assurer que nos informations de l'API sont bien reçues.)
};
getProductsListing ()


const showProductInChart = () => { 
       
   for (let i=0; i < addedProduct.length; i++ ) 

   {
    let cartItems = document.getElementById("cart__items"); // On met dans une variable notre ID cart__items dans laquelle on va par la suitre créer les classes.
    
    /*Creation de l'article */
    let article = document.createElement ("article");  // On crée une variable pour nos articles.
    cartItems.appendChild(article); // On crée notre article comme enfant de notre cart__items précédement déclarée.
    article.setAttribute("data-id", addedProduct[i].addIdProduct); // On modifie l'attribut "data-id" de notre article pour y ajouter l'ID du produit stocké dans le local storage.
    article.setAttribute("data-color", addedProduct[i].addColors); //  on modifie l'attribut data-color pour y ajouter la couleur choisie et stockée dans le local storage.
    
    /*Creation de la div pour l'image */
    let divCartItemImg = document.createElement ("div");
    divCartItemImg.className = "cart__item__img";
    article.appendChild(divCartItemImg);
    /*Creation de l'image en elle même */ 
    let imageProducts = document.createElement ("img");
    imageProducts.setAttribute("src", "" );
    imageProducts.setAttribute("alt", "TEXTE ALT PAR ICI" ) 
    
    /*Creation de la div qui contient les informations*/
    let divCartItemContent = document.createElement ("div");
    divCartItemContent.className = "cart__item__content";
    article.appendChild(divCartItemContent);
    
    /*Creation de la div qui contient la description la couleur et le prix*/
    let divcartItemContentDescription = document.createElement ("div");
    divcartItemContentDescription.className = "cart__item__content__description";
    divCartItemContent.appendChild(divcartItemContentDescription)

    let cartItemContentDescriptionH2 = document.createElement ("h2");
    divcartItemContentDescription.appendChild(cartItemContentDescriptionH2);
    cartItemContentDescriptionH2.innerHTML = "titre à ajouter ici" ;

    let cartItemContentDescriptionPColor = document.createElement ("p");
    divcartItemContentDescription.appendChild(cartItemContentDescriptionPColor);
    cartItemContentDescriptionPColor.innerHTML =addedProduct[i].addColors;

    let cartItemContentDescriptionPPrice = document.createElement ("p");
    divcartItemContentDescription.appendChild(cartItemContentDescriptionPPrice);
    cartItemContentDescriptionPPrice.innerHTML = "prix";

    /*Creation de la div qui contient l'affichage de la quantité et le bouton de suppression*/
    let divCartItemContentSettings = document.createElement ("div");
    divCartItemContentSettings.className = "cart__item__content__settings__quantity";
    divCartItemContent.appendChild(divCartItemContentSettings);

    let divCartItemContentSettingsQuantity = document.createElement ("div");
    divCartItemContentSettingsQuantity.className= "cart__item__content__settings__quantity";
    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

    let cartItemContentSettingsQuantityP = document.createElement ("p");
    divCartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityP);
    cartItemContentSettingsQuantityP.innerHTML = "Quantité :";

    // à suivre : ajout de la quantité de manière dynamique dans l'Input. 

    // à suivre : ajout du bouton supprimer

    }


}

showProductInChart()


