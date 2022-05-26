// searchParams.get, pour avoir réccupérer l'ID dans l'URL actuelle. 

let idProduct = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
console.log(`ID de notre produit : ${idProduct}`);

// fonction pour récuperer les données de l'api avec l'id du produit ( URL + idProduct) 
const getProductById = async() => {
  await fetch(`http://localhost:3000/api/products/${idProduct}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id dans un "template litterals"
  .then((response) => response.json()
  .then(json => product = json));      
};
getProductById(); // On appelle la fonction précédente pour récupérer les données de l'API


// fonction pour intégrer dynamiquement ce qu'on réccupère de l'API afin de le faire apparaître dynamiquement sur la page.
const showProduct = async() => { 
    await getProductById(); 

        /* Modification du titre de la page */
        dynamicPageTitle = `Kanap - Canapé ${product.name}`;
        document.title = dynamicPageTitle;
        
        /* Image du produit*/
        let itemImage     = document.querySelector(".item__img"); // on cible le selecteur .item__img.
        let imageProduct = document.createElement("img");
        imageProduct.setAttribute('src', product.imageUrl);
        imageProduct.setAttribute('alt', product.altTxt);
        itemImage.appendChild(imageProduct);

        /*Ajout du titre*/
        let title       = document.getElementById("title"); // On cible notre élément titre
        title.innerHTML = product.name;

        /*Ajout du Price*/
        let price       = document.getElementById("price"); // on récupére l'id price du document HTML
        price.innerHTML = product.price;

        /**Ajout de la Description */
        let description = document.getElementById("description"); // on récupére l'id description du document HTML
        description.innerHTML = product.description;

        /*Ajout de l'input de choix de couleur*/
        for (let i=0; i < product.colors.length; i++) {

          let color = document.createElement("option");
          color.setAttribute('value', product.colors[i]);
          color.innerHTML = product.colors[i];
          colorChoice.appendChild(color); //PS: la valise "colorChoice est déclarée en dehors de cette fonction puisque sa valeur sera utile dans la globalité du codage.
        }    
                
};

showProduct();

/* FONCTION POUR ENVOYER TOUT CE QU'ON VEUT VERS LE LOCAL STORAGE */
const clickAddToCart = document.getElementById("addToCart"); // On stocke l'id du bouton AddtoCart dans une constante qu'on utilisera pour repérer un click, plus tard.
const quantityofProduct = document.getElementById("quantity"); // On stocke la quantité dans une constante à partir de l'ID "quantity"
const colorChoice = document.getElementById("colors"); // On stocke les choix de couleur dans une constante à partir de l'ID "colors"
let productArrayToLocalStorage = JSON.parse(localStorage.getItem("stockedProducts")); // 

/*Fonction réagissant au clic*/

const addToBasket = () => {

  clickAddToCart.addEventListener("click", ()=>{   

    if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value != 0) { // On définit la condition. Si la quantité d'article est supérieure à 0 et inférieure ou égale à 100 ET si la couleur n'est pas inexistante ( 0 ) alors... 
  
      const addColorQuantityandID = Object.assign( {} ,  //  Via Object.assign, on ajoute a un objet vide les propriétés qu'on veut envoyer dans le LocalStorage ainsi que la totalité des propriétés de l'objet produit
      {addIdProduct: `${idProduct}`, // On ajoute l'ID réccupéré
      addColors: `${colorChoice.value}`, // On ajoute la couleur choisie 
      addQuantity: `${quantityofProduct.value}`}, // On ajoute la quantité souhaitée    
      );
      console.log (addColorQuantityandID)
    
      const pushToLocalStorage = () => { // On créé la fonction visant à ajouter des produits dans le localstorage
       productArrayToLocalStorage.push(addColorQuantityandID); //On utilise la méthode push
        localStorage.setItem("stockedProducts", JSON.stringify(productArrayToLocalStorage)); // Et on push nos quantités, couleurs et ID avec une clé "stockedProducts".
      };
        if (productArrayToLocalStorage) { 
          console.log(productArrayToLocalStorage)
        }
        else ( productArrayToLocalStorage = [] )

         
// fonction pour ajouter un produit ou modifier la quantité dans le localstorage.
      addToBasketOrChangeQuantity(productArrayToLocalStorage, idProduct, colorChoice.value); // On déclare notre fonction afin qu'elle soit opérante.
      function addToBasketOrChangeQuantity (productArrayToLocalStorage, idProduct, addColors) { 
        let checkCart       = productArrayToLocalStorage;
        let sameProduct = checkCart.find(element => element.addIdProduct == idProduct && element.addColors == addColors); // On utilise la méthode find qui permet d'associer des valeurs similaires.
      // Si sameProduct n'est pas indéfini ( Comprendre par là "si le produit avec l'ID et la couleur existe déjà )
        if(sameProduct != undefined) {
          sameProduct.addQuantity= parseFloat(sameProduct.addQuantity)+parseFloat(quantityofProduct.value); // On défini alors que notre quantité sera égale à notre quantité déjà défini, à laquelle on ajoutera la quantité choisie.
          console.log(sameProduct.addQuantity);
          localStorage.setItem("stockedProducts", JSON.stringify(productArrayToLocalStorage));
          console.log("Quantité(s) modifiée(s) dans le Local Storage");
          }
      // Sinon ( comprendre par là "sinon, s'il n'est pas dans le local Storage")
        else {
          pushToLocalStorage (); // alors on envoie notre fonction d'envoie d'une nouvelle itération ( notre article avec une couleur et/ou une ID nouvelle) dans le Local Storage
          console.log("Ajout de l'article dans le local storage");
            }
      };

      alert("Vos articles ont bien été ajoutés au panier");   
    } 
    else if ( quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value == 0 ) {
      alert("Merci de choisir une couleur à votre article.");
    }  

    else if ( (quantity.value < 100 || quantity.value == 0) && colors.value != 0 ) {
      alert("Merci de choisir une quantité comprise entre 1 et 100.");
    } 

    else { 
      alert("Merci de veiller à choisir une quantité comprise en 1 et 100 ainsi qu'à définir la couleur de votre article"); 
    } 
  })
}
addToBasket()












