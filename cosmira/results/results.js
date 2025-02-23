// Get products from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const products = JSON.parse(decodeURIComponent(urlParams.get('products')));

// Render matched products
const productGrid = document.querySelector('.product-grid');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Brand: ${product.brand}</p>
    `;

    productGrid.appendChild(productCard);
});
