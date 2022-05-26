let addedProduct = JSON.parse(localStorage.getItem("stockedProducts")); // on recupere ce qu'il y a dans le local storage

  for ( let i=0; i < addedProduct.length; i++ ) {       
    const getProductById = async() => {
      await fetch(`http://localhost:3000/api/products/${addedProduct[i].addIdProduct}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id dans un "template litterals"
      .then((response) => response.json()
      .then(json => product = json));  
      console.log(product) 

      console.log(product.imageUrl)
          
      let cartItems = document.getElementById("cart__items"); // On met dans une variable notre ID cart__items dans laquelle on va par la suitre créer les classes.
     
   /*Creation de l'article */
      let article = document.createElement ("article");  // On crée une variable pour nos articles.
      cartItems.appendChild(article); // On crée notre article comme enfant de notre cart__items précédement déclarée.
      article.className = "cart__item"
      article.setAttribute("data-id", addedProduct[i].addIdProduct); // On modifie l'attribut "data-id" de notre article pour y ajouter l'ID du produit stocké dans le local storage.
      article.setAttribute("data-color", addedProduct[i].addColors); //  on modifie l'attribut data-color pour y ajouter la couleur choisie et stockée dans le local storage.

    
    /*Creation de la div pour l'image */
      let divCartItemImg = document.createElement ("div");
      divCartItemImg.className = "cart__item__img";
      article.appendChild(divCartItemImg);
    /*Creation de l'image en elle même */ 
     let imageProducts = document.createElement ("img");
      imageProducts.setAttribute('src', product.imageUrl);
      imageProducts.setAttribute('alt', product.altTxt )
     divCartItemImg.appendChild(imageProducts); 
    
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
      cartItemContentDescriptionH2.innerHTML = product.name ;

      let cartItemContentDescriptionPColor = document.createElement ("p");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionPColor);
      cartItemContentDescriptionPColor.innerHTML =addedProduct[i].addColors;

      let cartItemContentDescriptionPPrice = document.createElement ("p");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionPPrice);
      cartItemContentDescriptionPPrice.innerHTML = `${product.price} €` ;

    /*Creation de la div qui contient l'affichage de la quantité et le bouton de suppression*/
      let divCartItemContentSettings = document.createElement ("div");
      divCartItemContentSettings.className = "cart__item__content__settings";
      divCartItemContent.appendChild(divCartItemContentSettings);

      let divCartItemContentSettingsQuantity = document.createElement ("div");
      divCartItemContentSettingsQuantity.className= "cart__item__content__settings__quantity";
      divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

      let cartItemContentSettingsQuantityP = document.createElement ("p");
      divCartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityP);
      cartItemContentSettingsQuantityP.innerHTML = "Qté :";

      let itemQuantity = document.createElement("input");
      divCartItemContentSettingsQuantity.appendChild(itemQuantity); 
      itemQuantity.value = addedProduct[i].addQuantity;
      itemQuantity.className = "itemQuantity";
      itemQuantity.setAttribute("type", "number");
      itemQuantity.setAttribute("min", "1");
      itemQuantity.setAttribute("max", "100");
      itemQuantity.setAttribute("name", "itemQuantity");
    
      let divCartItemContentSettingsDelete = document.createElement("div");
      divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
      divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

// ajout d'un p qui va contenir le bouton "Supprimer"   
      let deleteItemP = document.createElement("p");
      deleteItemP.className = "deleteItem";
      divCartItemContentSettingsDelete.appendChild(deleteItemP);
      deleteItemP.innerHTML = "Supprimer";
    }
    getProductById(); 
  };


  

 