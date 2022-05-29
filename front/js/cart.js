let addedProduct = JSON.parse(localStorage.getItem("stockedProducts")); // on recupere ce qu'il y a dans le local storage et on le stock dans une variable



  for ( let i=0; i < addedProduct.length; i++ ) {   // on s'apprête à itérer dans addedProduct avec un for  
    
    /* On reprend une fonction fetch basée afin d'aller chercher les informations en fonction de l'ID d'un produit. */
    const getProductById = async() => {
      await fetch(`http://localhost:3000/api/products/${addedProduct[i].addIdProduct}`) // On prend l'ID de notre Local Storage pour lui permettre de trouver le produit correspondant directement dans l'API.
      .then((response) => response.json()
      .then(json => product = json));  
      console.log(product) 

      console.log(product.imageUrl)
          
      let cartItems = document.getElementById("cart__items"); // On met dans une variable notre ID cart__items dans laquelle on va par la suitre créer les classes.
     
   /* Creation de l'article */
      let article = document.createElement ("article");  // On crée une variable pour nos articles.
      cartItems.appendChild(article); // On crée notre article comme enfant de notre cart__items précédement déclarée.
      article.className = "cart__item"
      article.setAttribute("data-id", addedProduct[i].addIdProduct); // On modifie l'attribut "data-id" de notre article pour y ajouter l'ID du produit stocké dans le local storage.
      article.setAttribute("data-color", addedProduct[i].addColors); //  on modifie l'attribut data-color pour y ajouter la couleur choisie et stockée dans le local storage.
    
    /* Creation de la div pour l'image */
      let divCartItemImg = document.createElement ("div");
      divCartItemImg.className = "cart__item__img";
      article.appendChild(divCartItemImg);
    /* Creation de l'image en elle même */ 
     let imageProducts = document.createElement ("img");
      imageProducts.setAttribute('src', product.imageUrl); // l'image vient ainsi directement de notre API
      imageProducts.setAttribute('alt', product.altTxt ) // Le texte alternatif vient directement de notre API
     divCartItemImg.appendChild(imageProducts); 
    
    /* Creation de la div qui contient les informations */
      let divCartItemContent = document.createElement ("div");
      divCartItemContent.className = "cart__item__content";
      article.appendChild(divCartItemContent);
    
    /* Creation de la div qui contient la description la couleur et le prix */
      let divcartItemContentDescription = document.createElement ("div");
      divcartItemContentDescription.className = "cart__item__content__description";
      divCartItemContent.appendChild(divcartItemContentDescription)

      let cartItemContentDescriptionH2 = document.createElement ("h2");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionH2);
      cartItemContentDescriptionH2.innerHTML = product.name ;  // Le nom vient directement de notre API

      let cartItemContentDescriptionPColor = document.createElement ("p");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionPColor);
      cartItemContentDescriptionPColor.innerHTML =addedProduct[i].addColors;  // La couleur vient de notre Local Storage

      let cartItemContentDescriptionPPrice = document.createElement ("p");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionPPrice);
      cartItemContentDescriptionPPrice.innerHTML = `${product.price} €` ;  // Le prix vient directement de l'API

    /* Creation de la div qui contient l'affichage de la quantité et le bouton de suppression */
      let divCartItemContentSettings = document.createElement ("div");
      divCartItemContentSettings.className = "cart__item__content__settings";
      divCartItemContent.appendChild(divCartItemContentSettings);

      let divCartItemContentSettingsQuantity = document.createElement ("div");
      divCartItemContentSettingsQuantity.className= "cart__item__content__settings__quantity";
      divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

    /* Création du texte "Qté*/  
      let cartItemContentSettingsQuantityP = document.createElement ("p");
      divCartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityP);
      cartItemContentSettingsQuantityP.innerHTML = "Qté :";

    /* Création de notre input ( dans lequel nos quantités sont ajoutées par défaut) */
      let itemQuantity = document.createElement("input");
      divCartItemContentSettingsQuantity.appendChild(itemQuantity); 
      itemQuantity.value = addedProduct[i].addQuantity;
      itemQuantity.className = "itemQuantity";
      itemQuantity.setAttribute("type", "number");
      itemQuantity.setAttribute("min", "1");
      itemQuantity.setAttribute("max", "100");
      itemQuantity.setAttribute("name", "itemQuantity");

    /* Création de la div accueillant le bouton de suppression*/  
      let divCartItemContentSettingsDelete = document.createElement("div");
      divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
      divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

    /*Création du bouton supprimer*/  
      let deleteItemP = document.createElement("p");
      deleteItemP.className = "deleteItem";
      divCartItemContentSettingsDelete.appendChild(deleteItemP);
      deleteItemP.innerHTML = "Supprimer";        
      
    /* Modification de la quantité */
      const quantityModif = () => {
        itemQuantity.addEventListener ("change", () => {
          console.log ("changement de quantity")
          addedProduct[i].addQuantity =  itemQuantity.value;
          localStorage.setItem("stockedProducts", JSON.stringify(addedProduct))          
        })  
      };
      quantityModif()   
      const deleteItem = () => {
        deleteItemP.addEventListener("click" , (e) => {
          e.preventDefault();
    // On commence par créer des constantes des éléments à filtrer ( dans l'itération). 
       let filteredId = addedProduct[i].addIdProduct;
        let filteredColor = addedProduct[i].addColors;

    // On applique la méthode filter, et on filtre ce qui correspond et ce qui ne correspond pas.
        filterProduct = addedProduct.filter( element => element.addIdProduct !== filteredId || element.addColors !== filteredColor);
        localStorage.setItem("stockedProducts", JSON.stringify(filterProduct)); // on modifie ou supprime la quantité dans le localStorage
      location.reload();
        });
      }
      deleteItem();

    // DEMANDER A WILFRIED POUR LE TABLEAU VIDE DANS LE LOCAL STORAGE

    }
    

    getProductById(); 
  };


  
 
 