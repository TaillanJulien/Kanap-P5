// Récupération du panier

let basket = localStorage.getItem("basket");
let basketArray = JSON.parse(basket);

// Récupération informations produits

async function getProductById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            return res.json();
        })
        .catch((err) => {
            alert('Une erreur est survenue : ' + err)
        })
        .then((response) => {
            return response;
        })
}

// Fonction pour afficher panier utilisateur

async function userCart(){

    // Si panier vide
    
    if (basketArray === null || basketArray == 0){
        alert("Votre panier est vide.");
        window.location.href = 'index.html'
    } 
    
    // Si produits présents dans le panier
    
    else {
        for (let i=0; i<basketArray.length; i++){
            let mainContainer = document.querySelector('#cart__items');
            let userProduct = await getProductById(basketArray[i].id); 
            mainContainer.innerHTML +=
            `<article class="cart__item" data-id="${basketArray[i].id}" data-color="${basketArray[i].color}">
                <div class="cart__item__img">
                    <img src="${userProduct.imageUrl}" alt="${userProduct.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${userProduct.name}</h2>
                        <p>${basketArray[i].color}</p>
                        <p>${userProduct.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                         <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketArray[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`
        }
        
    // Prix total du panier / Quantité totale de produits dans le panier

        let totalQuantity = 0;
        let totalPrice = 0;

        for (i = 0; i < basketArray.length; i++) {
            const product = await getProductById(basketArray[i].id);
            totalQuantity += parseInt(basketArray[i].quantity);
            totalPrice += parseInt(product.price * basketArray[i].quantity);
        }

        document.querySelector("#totalQuantity").textContent = `${totalQuantity}`;
        document.querySelector("#totalPrice").textContent = `${totalPrice}`;

    }
}

userCart();
    

