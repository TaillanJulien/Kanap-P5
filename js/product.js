function confirmAddBasketDOM (quantityProduct,nameProduct,colorProduct){
        let messageConfirm = document.createElement("div");
        messageConfirm.style.minWidth = "200px";
        messageConfirm.style.padding = "20px";
        messageConfirm.style.position = "absolute";
        messageConfirm.style.top = "100px";
        messageConfirm.style.marginTop = "15px"
        messageConfirm.style.borderRadius = "40px";
        messageConfirm.style.backgroundColor = "white";
        messageConfirm.style.color = "black";
        messageConfirm.style.fontWeight = "400"
        messageConfirm.textContent = `${quantityProduct} ${nameProduct} de couleur ${colorProduct} ajouté avec succés !`;
        document.querySelector(".item__content__addButton").style.position = "relative"
        document.querySelector(".item__content__addButton").appendChild(messageConfirm);
    
        return setTimeout(function () {messageConfirm.style.display="none"}, 3000);
    }

// Récupération de l'id du produit

    let param = new URLSearchParams(document.location.search);
    let id = param.get("id");

    fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => {
            return res.json();
        })
        .then(function(value){

            let Name = value.name;

// Création des éléments dans le DOM

            let productImg = document.querySelector('.item__img');
                productImg.innerHTML += `<img src="${value.imageUrl}" alt="${value.altTxt}">`;

            let productName = document.querySelector('#title');
                productName.textContent = Name;

            let productPrice = document.querySelector('#price');
                productPrice.textContent = value.price;

            let productDescription = document.querySelector('#description');
                productDescription.textContent = value.description;

// Personnalisation de l'article

        for(let i of value.colors){
            let productColor = document.createElement("option");
            productColor.value = i;
            productColor.textContent = `${i}`;
            document.querySelector('#colors').append(productColor);
        }

// Ajout au panier

        let addToCart = document.querySelector("#addToCart");
        addToCart.addEventListener('click', () => {
                let userQuantityProduct = document.querySelector("#quantity").value; 
                let userColorProduct = document.querySelector("#colors").value;

// Le produit choisi par l'utilisateur {objet}

        let userProduct = {                                                 
                id : id,
                name : value.name, 
                quantity : userQuantityProduct,
                color : userColorProduct,
                price : productPrice,
        }
    
// Recuperation du panier

        let basketUser = localStorage.getItem("basket");

        // Couleur vide

                if(userProduct.color == ""){
                    alert("Merci de saisir une couleur");
                }

        // Quantité vide

                else if (userProduct.quantity == 0){
                    alert("Merci de saisir une quantité");
                }

        // Quantité négative ou supérieure à 100

                else if (userProduct.quantity < 0 || userProduct.quantity > 100){
                    alert("Quantité incorrecte, merci de choisir entre 1 et 100 ")
                }

                
        else{

        // Aucun produit dans le panier

                if(basketUser === null){
                        basket = [];
                        confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
                        basket.push(userProduct);                                       
                        localStorage.setItem("basket", JSON.stringify(basket));    
                }

        // Un produit est déjà présent dans le panier

                else{
                        basket = JSON.parse(basketUser);

                        basket = basket.filter(function (element, index){

            // Si un doublon je n'ajoute pas le produit

                if(userProduct.id === element.id && userProduct.color === element.color){
                    confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
                    return false;
                }

            // Si pas de doublon alors j'ajoute le produit

                else{
                    confirmAddBasketDOM(userQuantityProduct,Name,userColorProduct);
                    return true;
                }
            })

        // Ajout et stockage du produit

            basket.push(userProduct);
            localStorage.setItem("basket", JSON.stringify(basket));
        }            
    }
})
})
        .catch(function(err){
                alert("Une erreure est survenue " + err);
})






