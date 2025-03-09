document.addEventListener("DOMContentLoaded", function () {
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const progress = document.querySelector(".progress");
  const minPriceDisplay = document.getElementById("min-price");
  const maxPriceDisplay = document.getElementById("max-price");

  const minPrice = parseInt(rangeMin.min);
  const maxPrice = parseInt(rangeMax.max);

  function updateSlider() {
    let minValue = parseInt(rangeMin.value);
    let maxValue = parseInt(rangeMax.value);

    if (maxValue - minValue < 1000) {
      if (event.target === rangeMin) {
        rangeMin.value = maxValue - 100;
      } else {
        rangeMax.value = minValue + 100;
      }
    }

    let minPercentage =
      ((rangeMin.value - minPrice) / (maxPrice - minPrice)) * 100;
    let maxPercentage =
      ((rangeMax.value - minPrice) / (maxPrice - minPrice)) * 100;
    progress.style.left = minPercentage + "%";
    progress.style.right = 100 - maxPercentage + "%";

    minPriceDisplay.textContent = `$${rangeMin.value}`;
    maxPriceDisplay.textContent = `$${rangeMax.value}`;
  }

  rangeMin.addEventListener("input", updateSlider);
  rangeMax.addEventListener("input", updateSlider);

  updateSlider(); // Initialize the slider UI on page load
});
