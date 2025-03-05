document.addEventListener("DOMContentLoaded", function () {
    function animateCount(element, target, duration) {
      let start = 0;
      let increment = target / (duration / 10);

      let counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(counter);
        }
        element.textContent = Math.floor(start).toLocaleString();
      }, 10);
    }

    const counters = document.querySelectorAll(".statistics p");

    const targets = [200, 2000, 30000];

    counters.forEach((counter, index) => {
      animateCount(counter, targets[index], 2000);
    });
  });