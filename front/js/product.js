// searchParams.get // pour avoir réccupérer l'ID dans l'URL actuelle. 

//  fetch avec le http://localhost:3000/api/products/" + idProduct // pour charger les infos de l'API et pouvoir ressortir l'ensemble des infos sur le produit par la suite.

// For etc etc pour créer à nouveau les éléments qu'on veut afficher, qu'on rechargera de manière dynamique en fonction de l'API. 

let idProduct = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
console.log(idProduct);
//Récupération des sélecteurs css et des id du HTML pour après

let itemImage     = document.querySelector(".item__img"); // on récupére le selecteur css pour pouvoir mettre l'image après
let title       = document.getElementById("title"); // on récupéré l'id title du document HTML
let price       = document.getElementById("price"); // on récupére l'id price du document HTML
let description = document.getElementById("description"); // on récupére l'id description du document HTML


// fonction pour récuperer les données de l'api avec l'id du produit
const getProductById = async() => {
    await fetch(`http://localhost:3000/api/products/${idProduct}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id dans un "template litterals"
    .then((response) => response.json()
    .then(json => product = json));      
};

getProductById(); // On appelle la fonction précédente pour récupérer les données de l'API

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const showProduct = async() => { 
    await getProductById(); 

        /* Modification du titre de la page */
        dynamicPageTitle = `Kanap - Canapé ${product.name}`;
        document.title = dynamicPageTitle;
        
        /* Image du produit*/
        let imageProduct = document.createElement("img");
        imageProduct.setAttribute('src', product.imageUrl);
        imageProduct.setAttribute('alt', product.altTxt);
        itemImage.appendChild(imageProduct);

        // on ajoute le nom
        title.innerHTML = product.name;

        // on ajoute les prix
        price.innerHTML = product.price;

        // on ajout la description
        description.innerHTML = product.description;

        // On va chercher les couleurs du tableau colors avec une boucle for et on créait l'html
        for (let i=0; i < product.colors.length; i++) {

          let color = document.createElement("option");
          color.setAttribute('value', product.colors[i]);
          color.innerHTML = product.colors[i];
          colorChoice.appendChild(color);
        }

 
};
showProduct();

/* FONCTION POUR ENVOYER TOUT CE QU'ON VEUT VERS LE LOCAL STORAGE */

const clickAddToCart = document.getElementById("addToCart"); // On stocke l'id du bouton AddtoCart dans une constante qu'on utilisera pour repérer un click, plus tard.
const quantityofProduct = document.getElementById("quantity"); // On stocke la quantité dans une constante à partir de l'ID "quantity"
let colorChoice = document.getElementById("colors"); // On stocke les choix de couleur dans une constante à partir de l'ID "colors"

let localStorageProductArray = JSON.parse(localStorage.getItem("NAME")); // 



/*Fonction réagissant au clic*/
clickAddToCart.addEventListener("click", (event)=>{

  if (colorChoice.value == 0) { console.log ('Pas de couleur bro')}

  if ( quantityofProduct.value < 1 ) { console.log (`La quantité n'est pas bonne`)} 

console.log(colorChoice.value, quantityofProduct.value, idProduct, product)

})






// Fonction pour envoyer dans le local storage, basé sur l'evenement 'click" ou submit

//PS : Penser à ne surtout pas envoyer le prix dans le localstorage. ( Utiliser parse json ??) 