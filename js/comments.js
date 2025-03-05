$(document).ready(function () {
  $("#loadingSpinner").show();

  fetch("https://dummyjson.com/comments")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.comments);
      let commentsHTML = "";
      data.comments.forEach((comment) => {
        commentsHTML += `
        <div class="box p-4">
          <div class="card p-4" style="width: 100%; min-height: 200px; border-radius:15px">
            <div class="likes text-primary">
              <i class="fa-solid fa-thumbs-up"></i> <span>${comment.likes}</span>
            </div>
            <div class="name">
              <div class="d-flex align-items-center">
                 <h3 class="py-2">${comment.user.username}.  </h3>
                 <i class="fa-solid fa-circle-check text-success"></i>
              </div>
              <p class="text-secondary">"${comment.body}"</p>
            </div>
          </div>
        </div>
      `;
      });

    
      $("#loadingSpinner").hide();
      $(".slickSlider").html(commentsHTML);


      $(".slickSlider").slick({
        slidesToShow: 3, 
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "15%",
        responsive: [
          {
            breakpoint: 1024, 
            settings: {
              slidesToShow: 2, 
              centerPadding: "10%", 
            },
          },
          {
            breakpoint: 768, 
            settings: {
              slidesToShow: 1, 
              centerPadding: "0",
            },
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
    .catch((error) => {
      console.error("Error fetching comments:", error);
  
      $("#loadingSpinner").html(
        `<p class="text-danger">Failed to load comments. Please try again later.</p>`
      );
    });
});