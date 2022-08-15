// Récupération des produits dans l'API.

fetch('http://localhost:3000/api/products')
    
    .then((res) => {
        return res.json();
    })

// Création des éléments dans le DOM pour chaque éléments.
    
    .then(function(data) {
        const cards = document.querySelector("#items");
        data.forEach(element => {
            cards.innerHTML += 
            `<a href ="./product.html?id=${element._id}"> 
                <article>
                    <img src="${element.imageUrl}" alt="${element.altTxt}"> 
                    <h3> ${element.name}</h3> 
                    <p> ${element.description} </p> 
                </article> 
            </a> `;      
        })
    })
    .catch((err) => {
        alert("Une erreur est survenue : " + err);
    });