document.addEventListener("DOMContentLoaded", function () {
  fetch("https://dummyjson.com/products?limit=4&sortBy=rating&order=desc") 
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("topSellingContainer");
      let productsHTML = "";

      data.products.forEach((product) => {
        productsHTML += `
          <div class="col-6 col-md-4 col-lg-3 text-center">
            <img src="${product.thumbnail}" alt="${
          product.title
        }" class="rounded-4 w-100 p-3" />
            <h6>${product.title}</h6>
            <div class="score text-warning">
              ${generateStars(product.rating)}
              <span class="text-dark">${product.rating.toFixed(1)}/5</span>
            </div>
            <h6 class="mt-3">$${product.price}</h6>
          </div>
        `;
      });

      container.innerHTML = productsHTML;
    })
    .catch((error) =>
      console.error("Error fetching top selling products:", error)
    );

  function generateStars(rating) {
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStar;
    return (
      "★".repeat(fullStars) +
      "½".repeat(halfStar) +
      "☆".repeat(emptyStars)
    )
      .replace(/★/g, '<i class="fa-solid fa-star"></i>')
      .replace(/½/g, '<i class="fa-solid fa-star-half-stroke"></i>')
      .replace(/☆/g, '<i class="fa-regular fa-star"></i>');
  }
});
