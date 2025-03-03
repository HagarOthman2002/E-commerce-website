document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const loginButton = document.querySelector('header a[href="index.html"]');

    if (token && loginButton) {
      loginButton.remove();
    }
  });