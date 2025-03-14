document.addEventListener("DOMContentLoaded", function () {
  const shopContainer = document.getElementById("shopContainer");
  const paginationContainer = document.querySelector(".pagination");
  const paginationLinks = document.querySelectorAll(".pagination .page-link");
  let currentPage = 1;
  let productsPerPage = window.innerWidth < 768 ? 100 : 9;
  let allProducts = [];

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      allProducts = data.products; // Extract products array
      renderProducts(currentPage);
      togglePagination();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderProducts(page) {
    shopContainer.innerHTML = "";
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    paginatedProducts.forEach((product) => {
      shopContainer.innerHTML += `
        <div class="col-md-6 col-lg-4 col-12 d-flex justify-content-center">
          <div class="card border-0 shadow-sm h-100">
            <img src="${product.thumbnail}" class="card-img-top bg-light" alt="${product.title}" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <div class="score text-warning">
                ${generateStars(product.rating)}
                <span class="text-dark">${product.rating.toFixed(1)}/5</span>
              </div>
              <p class="card-text fw-bold fs-5">$ ${product.price} </p>
              <a href="view.html?id=${product.id}" class="btn btn-light text-secondary mt-auto btn-hov">View Product</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  function togglePagination() {
    paginationContainer.style.display = window.innerWidth < 768 ? "none" : "flex";
  }

  paginationLinks.forEach((link) => {
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

  window.addEventListener("resize", function () {
    productsPerPage = window.innerWidth < 768 ? 100 : 9;
    renderProducts(1);
    togglePagination();
  });

  fetchProducts();
});

function generateStars(rating) {
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = 5 - fullStars - halfStar;

  return ("★".repeat(fullStars) + "½".repeat(halfStar) + "☆".repeat(emptyStars))
    .replace(/★/g, '<i class="fa-solid fa-star"></i>')
    .replace(/½/g, '<i class="fa-solid fa-star-half-stroke"></i>')
    .replace(/☆/g, '<i class="fa-regular fa-star"></i>');
}
