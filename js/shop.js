document.addEventListener("DOMContentLoaded", function () {
  const shopContainer = document.getElementById("shopContainer");
  const paginationContainer = document.querySelector(".pagination"); // Select pagination
  const paginationLinks = document.querySelectorAll(".pagination .page-link");
  let currentPage = 1;
  let productsPerPage = window.innerWidth < 768 ? 100 : 9; // Show all on small screens
  let allProducts = [];

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      allProducts = await response.json();
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
            <img src="${product.image}" class="card-img-top bg-light" alt="${product.title}" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <div class="score text-warning">
                ${generateStars(product.rating.rate)}
                <span class="text-dark">${product.rating.rate.toFixed(1)}/5</span>
              </div>
              <p class="card-text fw-bold fs-5">$ ${product.price} </p>
              <a href="#" class="btn btn-light text-secondary mt-auto btn-hov">View Product</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  function togglePagination() {
    if (window.innerWidth < 768) {
      paginationContainer.style.display = "none"; // Hide pagination on small screens
    } else {
      paginationContainer.style.display = "flex"; // Show pagination on large screens
    }
  }

  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const pageText = this.textContent.trim();

      if (
        pageText === "Next" &&
        currentPage < Math.ceil(allProducts.length / productsPerPage)
      ) {
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
    productsPerPage = window.innerWidth < 768 ? 100 : 9; // Recalculate per page count
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
