// searchParams.get, pour avoir réccupérer l'ID dans l'URL actuelle. 

let idProduct = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
console.log(`ID de notre produit : ${idProduct}`);

// fonction pour récuperer les données de l'api avec l'id du produit ( URL + idProduct) 
const getProductById = async() => {
  await fetch(`http://localhost:3000/api/products/${idProduct}`) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id dans un "template litterals"
  .then((response) => response.json()
  .then(json => product = json));      
};


//*Puisque l'ensemble de nos ID sont déjà définies dans le HTML, on met l'ensemble de nos ID et de nos selecteurs dans des variables*//
let itemImage     = document.querySelector(".item__img"); // on réccupère le selecteur .item__img.
let title       = document.getElementById("title"); // on récupéré l'id title du document HTML
let price       = document.getElementById("price"); // on récupére l'id price du document HTML
let description = document.getElementById("description"); // on récupére l'id description du document HTML




getProductById(); // On appelle la fonction précédente pour récupérer les données de l'API

// fonction pour intégrer dynamiquement ce qu'on réccupère de l'API afin de le faire apparaître dynamiquement sur la page.
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

let pushProductArrayToLocalStorage = JSON.parse(localStorage.getItem("stockedProducts")); // 


console.log(pushProductArrayToLocalStorage)

/*Fonction réagissant au clic*/

const addToBasket = () => {

  clickAddToCart.addEventListener("click", ()=>{   

    if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value != 0) { // On définit la condition. Si la quantité d'article est supérieure à 0 et inférieure ou égale à 100 ET si la couleur n'est pas inexistante ( 0 ) alors... 
  
      const addColorQuantityandID = Object.assign( {} ,  //  Via Object.assign, on ajoute a un objet vide les propriétés qu'on veut envoyer dans le LocalStorage ainsi que la totalité des propriétés de l'objet produit
      {addIdProduct: `${idProduct}`, // On ajoute l'ID réccupéré
      addColors: `${colorChoice.value}`, // On ajoute la couleur choisie 
      addQuantity: `${quantityofProduct.value}`}, // On ajoute la quantité souhaitée    
      );
    console.log ("test" + addColorQuantityandID)
    
    const addToLocalStorage = () => { // On créé la fonction visant à ajouter des produits dans le localstorage
      pushProductArrayToLocalStorage.push(addColorQuantityandID); //On utilise la méthode push
      localStorage.setItem("stockedProducts", JSON.stringify(pushProductArrayToLocalStorage)); // Et on push nos quantités, couleurs et ID avec une clé "stockedProducts".
    };
    
        if (pushProductArrayToLocalStorage) { console.log("Si contenu déjà présent dans le storage, contenu ajouté :" + pushProductArrayToLocalStorage)
        console.log ()
      
      
      }

        else ( pushProductArrayToLocalStorage = [] )

 

   addToLocalStorage ()
    
    

    

//* fonction pour ajouter les éléments identiques au local Storage *//



    


      

      


      alert("Vos articles ont bien été ajoutés au panier");   
    } 

    else { 
      alert("Merci de veiller à choisir une quantité comprise en 1 et 100 ainsi qu'à définir la couleur de votre article"); 
    } 


  })

}




addToBasket()







