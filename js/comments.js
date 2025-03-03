$(document).ready(function () {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.comments);
        let commentsHTML = "";

        data.comments.forEach((comment) => {
          commentsHTML += `
        <div class="box p-4">
          <div class="card rounded-3 p-5">
            <div class="likes text-primary">
              <i class="fa-solid fa-thumbs-up"></i> <span>${comment.likes}</span>
            </div>
            <div class="name">
              <h3>${comment.user.username}</h3>
              <p>"${comment.body}"</p>
            </div>
          </div>
        </div>
      `;
        });

        $(".slickSlider").html(commentsHTML);

        $(".slickSlider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1 },
            },
          ],
        });

        $(".fa-arrow-left").click(function () {
          $(".slickSlider").slick("slickPrev");
        });

        $(".fa-arrow-right").click(function () {
          $(".slickSlider").slick("slickNext");
        });
      })
      .catch((error) => console.error("Error fetching comments:", error));
  });