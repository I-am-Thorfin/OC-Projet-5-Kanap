const id = new URL(window.location.href).searchParams.get("id"); // On réccupére l'order ID en utilisant Search Params
console.log(id);

const orderId = document.getElementById('orderId'); // On définit une variable pour pointer l'élément ordrerId dans le HTML
orderId.innerHTML = id; // On modifie notre html en complétant l'ID orderId avec notre variable id précédemment définie 

localStorage.clear(); // On vide le local storage 
