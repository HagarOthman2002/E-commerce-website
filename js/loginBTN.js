document.addEventListener("DOMContentLoaded", function () {
  ShowAuthBtn();
});

function ShowAuthBtn() {
  const token = localStorage.getItem("token");
  const loginButton = document.getElementById("loginButton");
  const userInfo = document.getElementById("userInfo");
  const cartIcon = document.getElementById("cartIcon");
  const userIcon = document.getElementById("userIcon");

  if (token) {
    userInfo.classList.remove("d-none");
    userInfo.classList.add("d-flex");
    loginButton.classList.remove("d-flex");
    loginButton.classList.add("d-none");

  } else {
    userInfo.classList.remove("d-flex");
    userInfo.classList.add("d-none");

    cartIcon.classList.add("d-none");
    userIcon.classList.add("d-none");
  }
}

function logOut() {
  const token = localStorage.getItem("token");

  if (token) {
    localStorage.removeItem("token");
    ShowAuthBtn();
    window.location.href = "index.html";
  }
}

document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    logOut();
  });
