const id = new URL(window.location.href).searchParams.get("id"); 
console.log(id);

const orderId = document.getElementById('orderId'); 
orderId.innerHTML = id; // On affiche notre numéro de commande en fonction de notre Id 

localStorage.clear(); // On vide le local storage 
