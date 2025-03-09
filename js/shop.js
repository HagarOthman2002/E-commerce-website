document.addEventListener("DOMContentLoaded", function () {
  const shopContainer = document.getElementById("shopContainer");
  const paginationLinks = document.querySelectorAll(".pagination .page-link");
  let currentPage = 1;
  const productsPerPage = 6;
  let allProducts = [];

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      allProducts = await response.json();
      renderProducts(currentPage);
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
        <div class="col-md-4 d-flex">
          <div class="card border-0 shadow-sm h-100">
            <img src="${product.image}" class="card-img-top bg-light" alt="${
        product.title
      }" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <div class="score text-warning">
                ${generateStars(product.rating.rate)}
                <span class="text-dark">${product.rating.rate.toFixed(
                  1
                )}/5</span>
              </div>
              <p class="card-text fw-bold fs-5">$ ${product.price} </p>
              <a href="#" class="btn btn-dark mt-auto">View Product</a>
            </div>
          </div>
        </div>
      `;
    });
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



document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.innerHTML = `
    .card {
      height: 100%;
      width:300px;
    }


    .card img {
      height: 200px;
      object-fit: contain;
      width: 100%;
    }
  `;
  document.head.appendChild(style);
});
