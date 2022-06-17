let addedProduct = JSON.parse(localStorage.getItem("stockedProducts")); // on recupere ce qu'il y a dans le local storage et on le stock dans une variable
let getTotalQuantity = []; // On déclare une variable getTotalQuanty qui nous servira dans le calcul du nombre total d'articles dans le panier
let getTotalPrice = []; // On déclare une variable getTotalPrice qui nous servira dans le calcul du prix total.
let products = [] // On créé un tableau products dans lequel on finira par Push nos ID pour l'order.







const displayCart = () => {

  
  for ( let i=0; i < addedProduct.length; i++ ) {   // on s'apprête à itérer dans addedProduct avec un for  

    /* On reprend une fonction fetch basée afin d'aller chercher les informations en fonction de l'ID d'un produit. */
    const getProductById = async() => {
      await fetch(`http://localhost:3000/api/products/${addedProduct[i].addIdProduct}`) // On prend l'ID de notre Local Storage pour lui permettre de trouver le produit correspondant directement dans l'API. 
      .then((response) => response.json()
      .then(json => product = json));  
      console.log(product) 

              
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
      
      let pricePerArticle = product.price*addedProduct[i].addQuantity
      let cartItemContentDescriptionPPrice = document.createElement ("p");
      divcartItemContentDescription.appendChild(cartItemContentDescriptionPPrice);
      cartItemContentDescriptionPPrice.innerHTML = `${pricePerArticle} €` ;  // Le prix vient directement de l'API

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
          console.log ("changement de quantity");
          addedProduct[i].addQuantity =  itemQuantity.value;
          localStorage.setItem("stockedProducts", JSON.stringify(addedProduct));
          location.reload();          
        })  
      };
      quantityModif();

    /* Suppression d'un article via la méthode Filter */  
      const deleteItem = () => {
        deleteItemP.addEventListener("click" , (e) => {
          e.preventDefault();
    // On commence par créer des constantes des éléments à filtrer ( dans l'itération). 
          let filteredId = addedProduct[i].addIdProduct;
          let filteredColor = addedProduct[i].addColors;

    // On applique la méthode filter, et on filtre ce qui correspond et ce qui ne correspond pas.
          filterProduct = addedProduct.filter( element => element.addIdProduct !== filteredId || element.addColors !== filteredColor); // application de la méthode filtrer
          localStorage.setItem("stockedProducts", JSON.stringify(filterProduct)); // Envoi des nouvelles infos filtrés vers le local storage.
          location.reload(); // Rechargement afin de mettre à jour la page au clic
        });
      }
      deleteItem();

    
    /* BAS DE TABLEAU ; GESTION QUANTITE TOTALE ET PRIX TOTAL. */

        const reducer = (accumulator, currentValue) => accumulator + currentValue;  // On déclate la méthode reducer, qu'on utilisera par la suite.
        
        /* Quantité totale : */
        
        let quantityPerArticle = parseFloat(addedProduct[i].addQuantity); // On définit la quantité totale en utilisant ParseFloat pour être sûr qu'il s'agit bien d'un nombre. Puisqu'on itère dans la boucle for, on obtiendra autant de valeur que d'articles dans le panier
        getTotalQuantity.push(quantityPerArticle) // On push nos quantités dans un dans le tableau de notre variable "getTotalQuantity"
        const additionOfAllQuantities = getTotalQuantity.reduce(reducer,0); // on applique la méthode reducer qui va additionner l'ensemble de nos quantité.

        console.log (additionOfAllQuantities)

        totalQuantity = additionOfAllQuantities; // On définit la quantité dans une variable dans une variable
        let productTotalQuantity = document.getElementById('totalQuantity'); // On désigne l'ID dans notre HTML
        productTotalQuantity.innerHTML = totalQuantity; // On injecte notre "totalQuantity précédemment défini"
      
        /* Prix totale : */

        let totalPricePerArticle = product.price*addedProduct[i].addQuantity; // On définit le prix total par article en multipliant le prix des produits tiré de l'API avec l'itération de la quantité
        getTotalPrice.push(totalPricePerArticle) // On envoie nos prix par article dans le tableau "getTotalPrice"
        const additionOfAllPrices = getTotalPrice.reduce(reducer,0); // On applique la méthode reducer pour faire le calcul et obtenir l'addition de tous nos prix pour avoir le prix total.

        console.log (additionOfAllPrices)

        totalPrice = additionOfAllPrices; // On définit notre prix dans une variable
        let productTotalPrice = document.getElementById('totalPrice'); // On désigne l'ID dans notre HTML
        productTotalPrice.innerHTML = totalPrice; // On injecte notre "totalPrice précédemment défini"   
    };
    
    
  
    /* Début formulaire*/

    /* Formulaire */


    let formFirstName = document.getElementById("firstName");
    let formFirstNameErrorMsg = document.getElementById("firstNameErrorMsg") ; 
    let regexFormFirstName = /^[a-zA-ZÀ-ú\-\s]+$/;


    let formLastName = document.getElementById("lastName");
    let formLastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    let regexFormLastName = /^[a-zA-ZÀ-ú\-\s]+$/;


    let formAddress = document.getElementById("address");
    let formAddressErrorMsg = document.getElementById("addressErrorMsg");
    let regexFormAddress = /^[a-zA-ZÀ-ú0-9\-\s]+$/;


    let formTown = document.getElementById("city");   
    let formTownErrorMsg = document.getElementById("cityErrorMsg");
    let regexFormTown = /^[a-zA-ZÀ-ú\-\s]+$/;


    let formMail = document.getElementById("email");
    let formMailErrorMsg = document.getElementById("emailErrorMsg");
    let regexFormMail = /^[a-zA-ZÀ-ú0-9-._]+[@]{1}[a-zA-Z0-9-._]+[.]{1}[a-zA-Z]+$/;

    let btnSubmit = document.getElementById("order");


    btnSubmit.addEventListener("click", function(event){
      event.preventDefault()

      let formCheckIsOk = false;

      /* Le Prénom */
      if ( formFirstName.value === "" )
        {
        formFirstName.style.border = "red 2px solid";
        formFirstNameErrorMsg.innerHTML = "&#10006; Veuillez compléter ce champ SVP. ";
        formCheckIsOk = false;
        console.log("Le champ prénom n'est pas rempli ");
        }
      else if (
        formFirstName.value.match(regexFormFirstName) === null )  { 
        formFirstName.style.border = "red 2px solid"
        formFirstNameErrorMsg.innerHTML = "&#10006; Ce champ ne doit pas contenir de chiffres."
        formCheckIsOk = false
        console.log(" Le champ rempli ne respecte pas les conditions ( utilisation de chiffres ou de caractères non conformes) ")
        }

      else {
        formFirstNameErrorMsg.innerHTML = ""
        formFirstName.style.border = "green 2px solid"
        formCheckIsOk = true
        console.log(" Prénom bien renseigné. FormCheckIsOk = TRUE ")
      }

      /* Le Nom */
      if ( formLastName.value === "" )
        {
        formLastName.style.border = "red 2px solid";
        formLastNameErrorMsg.innerHTML = "&#10006; Veuillez compléter ce champ SVP. "
        formCheckIsOk = false;
        console.log(" Le champ nom n'est pas rempli ")
        }
      else if (
        formLastName.value.match(regexFormLastName) === null )  { 
        formLastName.style.border = "red 2px solid"
        formLastNameErrorMsg.innerHTML = "&#10006; Ce champ ne doit pas contenir de chiffres."
        formCheckIsOk = false
        console.log(" Le champ rempli ne respecte pas les conditions ( utilisation de chiffres ou de caractères non conformes) ")
        }

      else {
        formLastNameErrorMsg.innerHTML = ""
        formLastName.style.border = "green 2px solid"
        formCheckIsOk = true
        console.log(" Nom bien renseigné. FormCheckIsOk = TRUE ")
      }

      /* L'Adresse */
      if ( formAddress.value === "" )
        {
        formAddress.style.border = "red 2px solid";
        formAddressErrorMsg.innerHTML = "&#10006; Veuillez compléter ce champ SVP. "
        formCheckIsOk = false;
        console.log(" Le champ Adresse n'est pas rempli ")
        }
      else if (
        formAddress.value.match(regexFormAddress) === null )  { 
        formAddress.style.border = "red 2px solid"
        formAddressErrorMsg.innerHTML = "&#10006; Ce champ ne doit pas contenir de chiffres."
        formCheckIsOk = false
        console.log(" Le champ rempli ne respecte pas les conditions ( utilisation de chiffres ou de caractères non conformes) ")
        }

      else {
        formAddressErrorMsg.innerHTML = ""
        formAddress.style.border = "green 2px solid"
        formCheckIsOk = true
        console.log(" Adresse bien renseignée. FormCheckIsOk = TRUE ")
      }

      /* La ville */
      
      if ( formTown.value === "" )
      {
      formTown.style.border = "red 2px solid";
      formTownErrorMsg.innerHTML = "&#10006; Veuillez compléter ce champ SVP. ";
      formCheckIsOk = false;
      console.log(" Le champ Ville n'est pas rempli ");
      }
      else if (
      formTown.value.match(regexFormTown) === null )  { 
      formTown.style.border = "red 2px solid";
      formTownErrorMsg.innerHTML = "&#10006; Ce champ ne doit pas contenir de chiffres.";
      formCheckIsOk = false;
      console.log(" Le champ rempli ne respecte pas les conditions ( utilisation de chiffres ou de caractères non conformes) ");
      }

      else {
      formTownErrorMsg.innerHTML = "";
      formTown.style.border = "green 2px solid";
      formCheckIsOk = true;
      console.log(" Ville bien renseignée. FormCheckIsOk = TRUE ");
      }

      /*L'Email*/

      if ( formMail.value === "" )
      {
        formMail.style.border = "red 2px solid";
        formMailErrorMsg.innerHTML = "&#10006; Veuillez compléter ce champ SVP. ";
      formCheckIsOk = false;
      console.log(" Le champ Email n'est pas rempli ");
      }
      else if (
        formMail.value.match(regexFormMail) === null )  { 
        formMail.style.border = "red 2px solid";
        formMailErrorMsg.innerHTML = "&#10006; Ce champ ne doit pas contenir une adresse mail valide : ****@****.*** ";
        formCheckIsOk = false;
        console.log(" Le champ rempli ne respecte pas les conditions ( utilisation de chiffres ou de caractères non conformes) ");
      }

      else {
        formMailErrorMsg.innerHTML = ""
        formMail.style.border = "green 2px solid"
        formCheckIsOk = true
        console.log(" Email bien renseignée. FormCheckIsOk = TRUE ")
      }
        
      /* Envoi de nos infos après le clic */

      if (formCheckIsOk == true) {  // si nos conditions des Regex sont "true"
        
        
        
        
      
        products.push(addedProduct[i].addIdProduct)

        

        
        const firstName = formFirstName.value
        const lastName = formLastName.value
        const address = formAddress.value
        const city = formTown.value
        const email = formMail.value

        let contact ={ firstName, lastName, address, city, email }
            

        console.log("test "+ products)

        

        
        const promise =  {
          method: 'POST',
          body: JSON.stringify(
            {
              contact,
              products
            }
          ),
          headers: {
              'Content-Type': 'application/json',
          }
        }

      fetch("http://localhost:3000/api/products/order", promise)
      .then(response => response.json())
      .then(data => {
      localStorage.setItem('orderId', data.orderId);
      document.location.href = 'confirmation.html?id='+ data.orderId;
      console.log(data.orderId);
      });
        


      } 
    });

    /* fin formulaire */


    getProductById(); 
  };



}




displayCart()















