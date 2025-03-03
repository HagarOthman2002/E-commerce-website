$(document).ready(function () {
  fetch("https://dummyjson.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      console.log(categories); 
      let categoryHTML = "";

      categories.forEach((category) => {
        categoryHTML += `
  <div class="category-item text-center  py-1 rounded text-capitalize fw-bolder text-white fs-3 mx-2">
    <span class="category-text">${category.name}</span>
  </div>`;
      });

      $(".category-slider").html(categoryHTML);
      $(".category-slider").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    })
    .catch((error) => console.log("Error fetching categories:", error));
});
