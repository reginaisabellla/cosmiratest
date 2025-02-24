// Get products from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const products = JSON.parse(decodeURIComponent(urlParams.get("products")) || "[]");

// Select product grid container
const productGrid = document.querySelector(".product-grid");

// Clear previous results
productGrid.innerHTML = "";

// Display matched products
if (products.length > 0) {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='../assests/img/placeholder.png'">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
        `;

        productGrid.appendChild(productCard);
    });
} else {
    productGrid.innerHTML = "<p>No matches found. Try again with different options.</p>";
}
