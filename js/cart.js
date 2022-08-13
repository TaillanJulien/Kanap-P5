// Récupération du panier utilisateur

let basket = localStorage.getItem("basket");
let itemsInLocalStorage = JSON.parse(basket);

// Récupération des données de l'API

async function getProductById(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            return res.json();
        })
        .catch((err) => {
            alert("Une erreur est survenue -> " + err)
        })
        .then((response) => {
            return response;
        });
}

// Fonction pour afficher le contenu du panier

async function displayCart() {

    const parser = new DOMParser();
    const positionEmptyCart = document.getElementById("cart__items");
    let cartArray = [];

    // Si le localstorage est vide

    if (itemsInLocalStorage === null || itemsInLocalStorage == 0) {
        positionEmptyCart.textContent = "Votre panier est vide : retour à la page d'accueil.";
        window.location.href = 'index.html'
    } 
    
    // Si produits dans le panier

    else {
        
        for (i = 0; i < itemsInLocalStorage.length; i++) {
            const product = await getProductById(itemsInLocalStorage[i].id);
            const totalPriceItem = (product.price *= itemsInLocalStorage[i].quantity);
            cartArray += 
            `<article class="cart__item" data-id=${itemsInLocalStorage[i].id}>
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${itemsInLocalStorage[i].color}</p>
                        <p id="prix_${i}">${totalPriceItem} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemsInLocalStorage[i].quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p data-id= ${itemsInLocalStorage[i].id} data-color= ${itemsInLocalStorage[i].color} class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
        }

        // Prix total du panier / Quantité totale de produits dans le panier

        let totalQuantity = 0;
        let totalPrice = 0;

        for (i = 0; i < itemsInLocalStorage.length; i++) {
            const article = await getProductById(itemsInLocalStorage[i].id);
            totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
            totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
        }

        document.getElementById("totalQuantity").innerHTML = totalQuantity;
        document.getElementById("totalPrice").innerHTML = totalPrice;

        if (i == itemsInLocalStorage.length) {
            const displayBasket = parser.parseFromString(cartArray, "text/html");
            positionEmptyCart.appendChild(displayBasket.body);
            changeQuantity();
            deleteItem();
        }
    }
}

displayCart();

// Fonction pour recharger le panier

async function reloadCart() {

    let basket = localStorage.getItem("basket");
    let itemsInLocalStorage = JSON.parse(basket);

    let totalQuantity = 0;
    let totalPrice = 0;

    for (i = 0; i < itemsInLocalStorage.length; i++) {
        const article = await getProductById(itemsInLocalStorage[i].id);
        totalQuantity += parseInt(itemsInLocalStorage[i].quantity);
        totalPrice += parseInt(article.price * itemsInLocalStorage[i].quantity);
        console.log(parseInt(article.price * itemsInLocalStorage[i].quantity));
        document.getElementById("prix_" + i).innerHTML = article.price * itemsInLocalStorage[i].quantity + " €";
    }

    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}

// Fonction pour la modification de la quantité

function changeQuantity() {

    const quantityInputs = document.querySelectorAll(".itemQuantity");
        quantityInputs.forEach((quantityInput) => {
            quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
                const inputValue = event.target.value;
                const dataId = event.target.getAttribute("data-id");
                const dataColor = event.target.getAttribute("data-color");
                let basket = localStorage.getItem("basket");
                let items = JSON.parse(basket);

            items = items.map((item, index) => {
                if (item.id === dataId && item.color === dataColor) {
                    item.quantity = inputValue;
                }
                return item;
            });

            if (inputValue > 100 || inputValue < 1) {
                alert("Quantité incorrecte : doit etre comprise entre 1 et 100");
                return;
            }

            let newBasket = JSON.stringify(items);
            localStorage.setItem("basket", newBasket);
            reloadCart();
        });
    });
}

// Fonction pour suppression d'un article

function deleteItem() {

    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const deleteId = event.target.getAttribute("data-id");
            const deleteColor = event.target.getAttribute("data-color");
            itemsInLocalStorage = itemsInLocalStorage.filter(
                (element) => !(element.id == deleteId && element.color == deleteColor));
            console.log(itemsInLocalStorage);
            deleteConfirm = window.confirm(
                "Etes vous sûr de vouloir supprimer cet article ?"
            );
            if (deleteConfirm == true) {
                localStorage.setItem("basket", JSON.stringify(itemsInLocalStorage));
                alert("Article supprimé avec succès");
                const card = deleteButton.closest(".cart__item");
                card.remove();
                reloadCart();
            } else {
                alert("Article non supprimé");
            }

            const deleteKanap = JSON.parse(localStorage.getItem("basket"));

            if (deleteKanap.length === 0) {
                localStorage.removeItem("basket");
                alert('Panier vide, retour à l\'accueil.');
                window.location.href = "index.html";
            }
        });
    });
}

// Formulaire utilisateur

    // Variables regex

    let nameRegEx = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
    let addressRegEx = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
    let emailRegEx = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,}$/;

    // Récupération champs formulaire

    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const address = document.querySelector('#address');
    const city = document.querySelector('#city');
    const email = document.querySelector('#email');

    // Validation prénom

    firstName.addEventListener("input", (event) => {
        event.preventDefault();
        if (nameRegEx.test(firstName.value) == false || firstName.value == ""){
            document.querySelector("#firstNameErrorMsg").innerHTML = "Prénom non valide";
        return false;
        }
        else {
            document.querySelector("#firstNameErrorMsg").innerHTML = "";
        return true;
        }
    });

    // Validation nom de famille

    lastName.addEventListener("input", (event) => {
        event.preventDefault();
        if (nameRegEx.test(lastName.value) == false || lastName.value == ""){
            document.querySelector("#lastNameErrorMsg").innerHTML = "Nom non valide";
        return false;
        }
        else {
            document.querySelector("#lastNameErrorMsg").innerHTML = "";
        return true;
        }
    });

    // Validation adresse postale

    address.addEventListener("input", (event) => {
        event.preventDefault();
        if (addressRegEx.test(address.value) == false || address.value == ""){
            document.querySelector("#addressErrorMsg").innerHTML = "Adresse non valide";
        return false;
        }
        else {
            document.querySelector("#addressErrorMsg").innerHTML = "";
        return true;
        }
    });

    // Validation ville

    city.addEventListener("input", (event) => {
        event.preventDefault();
        if (nameRegEx.test(city.value) == false || city.value == ""){
            document.querySelector("#cityErrorMsg").innerHTML = "Ville non valide";
        return false;
        }
        else {
            document.querySelector("#cityErrorMsg").innerHTML = "";
        return true;
        }
    });

    // Validation adresse mail

    email.addEventListener("input", (event) => {
        event.preventDefault();
        if (emailRegEx.test(email.value) == false || email.value == ""){
            document.querySelector("#emailErrorMsg").innerHTML = "Email non valide";
        return false;
        }
        else {
        document.querySelector("#emailErrorMsg").innerHTML = "";
        return true;
        }
    });

// Passer commande

let order = document.getElementById("order");
order.addEventListener("click", (e) => {
    e.preventDefault();

    // Objet avec données utilisateur

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    // Si données non remplies

    if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
    ) {
        window.confirm("Merci de renseigner vos coordonnées pour passer la commande.");
    } 
    
    // Si données mal remplies

    else if (
        nameRegEx.test(firstName.value) == false ||
        nameRegEx.test(lastName.value) == false ||
        addressRegEx.test(address.value) == false ||
        nameRegEx.test(city.value) == false ||
        emailRegEx.test(email.value) == false
    ) {
        window.confirm("Merci de renseigner correctement vos coordonnées.");
    } 
    
    // Si prêts à passer la commande

    else {
        let products = [];
        itemsInLocalStorage.forEach((order) => {
            products.push(order.id);
        });

        let pageOrder = {
            contact,
            products
        };

        // Appel à l'api order pour envoyer les tableaux
        
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(pageOrder),
        })
            .then((res) => {
                return res.json();
            })
            .then((confirm) => {
                window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
                localStorage.clear();
            })
            .catch((error) => {
                console.log("une erreur est survenue");
            });
    }
});






