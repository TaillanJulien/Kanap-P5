let basket = localStorage.getItem("basket");
let basketArray = JSON.parse(basket);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res){
        if(res.ok){
            return res.json();
        }   
    })


    .then(function (value){
        for (let i=0; i<basketArray.length; i++){
            let mainContainer= document.querySelector('#cart__items');
            mainContainer.innerHTML +=
            `<article class="cart__item" data-id="${basketArray[i].id}" data-color="${basketArray[i].color}">
                <div class="cart__item__img">
                    <img src="${basketArray[i].imageUrl}" alt="${basketArray[i].altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${basketArray[i].id}</h2>
                        <p>${basketArray[i].color}</p>
                        <p>${basketArray[i].price}€</p>
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
    })
    

