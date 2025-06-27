document.addEventListener("DOMContentLoaded", function () {
      const reviewsContainer = document.getElementById("reviews-container");
      const loadMoreButton = document.getElementById("load-more");

      let allComments = [];
      let displayedCount = 0;
      const batchSize = 6;

      fetch("https://dummyjson.com/comments")
        .then((response) => response.json())
        .then((data) => {
          allComments = data.comments;
          displayReviews();
        })
        .catch((error) => console.error("Error fetching comments:", error));

      function displayReviews() {
        const nextBatch = allComments.slice(
          displayedCount,
          displayedCount + batchSize
        );
        nextBatch.forEach((comment) => {
          const reviewCard = document.createElement("div");
          reviewCard.classList.add("col-lg-6");
          reviewCard.innerHTML = `
        <div class="card rounded-3 p-5 h-100">
          <div class="score text-primary">
            <i class="fa-solid fa-heart"></i> 
            <span class="text-primary">${comment.likes} Likes</span>
          </div>
          <div class="name">
            <h3>${comment.user.username}</h3>
            <p>"${comment.body}"</p>
          </div>
        </div>
      `;
          reviewsContainer.appendChild(reviewCard);
        });

        displayedCount += batchSize;

        if (displayedCount >= allComments.length) {
          loadMoreButton.style.display = "none";
        }
      }

      loadMoreButton.addEventListener("click", displayReviews);
    });