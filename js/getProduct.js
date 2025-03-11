document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContainer = document.getElementById("productDetails");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetchProductDetails(productId);
  }

  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const product = await response.json();

      productDetailsContainer.innerHTML = `
        <div class="images d-flex gap-2">
          <div class="small-images d-flex flex-column gap-3 mx-auto  ">
            ${product.images
              .map(
                (image) => `<img src="${image}" alt="${product.title}" />`
              )
              .join("")}
          </div>
          <img src="${product.thumbnail}" alt="${product.title}" />
        </div>

        <div class="discreption p-sm-5 w-lg-50">
          <div class="tags py-2">
            <h1>${product.title}</h1>
            <div class="score text-warning">
              ${generateStars(product.rating)}
              <span class="text-dark">${product.rating.toFixed(1)}/5</span>
            </div>
            <h6 class="mt-3 fw-bold">$ ${product.price}</h6>
            <p class="text-secondary border-bottom py-3">${
              product.description
            }</p>
          </div>

          <div class="colors border-bottom py-2">
            <h6>Select Colors</h6>
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 p-3">
              <input type="color" class="circle-color m-1" value="#4F4631" title="Choose color" />
              <input type="color" class="circle-color m-1" value="#314F4A" title="Choose color" />
              <input type="color" class="circle-color m-1" value="#31344F" title="Choose color" />
            </div>
          </div>

          <div class="size border-bottom py-2">
            <h6>Choose Size</h6>
            <div class="sizes d-flex">
              <a href="" class="btn rounded-pill bg-light text-secondary w-100 py-2 gray-btn">Small</a>
              <a href="" class="btn rounded-pill bg-light text-secondary w-100 py-2 gray-btn">Medium</a>
              <a href="" class="btn rounded-pill bg-dark text-white w-100 py-2 gray-btn">Large</a>
              <a href="" class="btn rounded-pill bg-light text-secondary w-100 py-2 gray-btn">X-Large</a>
            </div>
          </div>

          <div class="add py-2 mt-3">
            <div class="sizes d-flex">
              <a href="" class="btn rounded-pill bg-light text-secondary w-100 py-2 gray-btn">- 1 +</a>
              <a href="" class="btn rounded-pill bg-dark text-white w-100 py-2 gray-btn">Add to Cart</a>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

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
