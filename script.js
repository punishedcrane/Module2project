const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let productsData = []; 

async function fetchProduct() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const products = await response.json();
        productsData = products; 
        displayProducts(products);
    } catch (error) {
        console.log(error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = ""; 
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-lg-3 d-flex">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="Camera image">
                    <div class="card-body shadow bg-white rounded">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text text-muted">${product.description.slice(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold">$${product.price}</span>
                            <a href="productDetails.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}


function searchProducts() {
    const query = searchInput.value.toLowerCase().trim();
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}


searchButton.addEventListener("click", searchProducts);

fetchProduct();
