let basket = localStorage.getItem("basket");
let basketArray = JSON.parse(basket);

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

async function userCart(){
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
                    <p>€</p>
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
}

userCart();
    

