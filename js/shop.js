document.addEventListener("DOMContentLoaded", function () {
    const shopContainer = document.getElementById("shopContainer");
    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    let currentPage = 1;
    const productsPerPage = 6;
    let allProducts = [];
  
    // Fetch all products once
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        renderProducts(currentPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
    // Function to render products for the current page
    function renderProducts(page) {
      shopContainer.innerHTML = ""; // Clear previous products
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = allProducts.slice(startIndex, endIndex);
  
      paginatedProducts.forEach(product => {
        shopContainer.innerHTML += `
          <div class="col-md-4 d-flex">
    <div class="card border-0 shadow-sm h-100">
      <img src="${product.image}" class="card-img-top" alt="${product.title}" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text text-muted">${product.price} USD</p>
        <a href="#" class="btn btn-dark mt-auto">View Product</a>
      </div>
    </div>
  </div>
  
        `;
      });
    }
  
    // Handle Pagination Clicks
    paginationLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const pageText = this.textContent.trim();
  
        if (pageText === "Next" && currentPage < Math.ceil(allProducts.length / productsPerPage)) {
          currentPage++;
        } else if (pageText === "Previous" && currentPage > 1) {
          currentPage--;
        } else if (!isNaN(parseInt(pageText))) {
          currentPage = parseInt(pageText);
        }
  
        renderProducts(currentPage);
      });
    });
  
    // Initial Fetch
    fetchProducts();
  });