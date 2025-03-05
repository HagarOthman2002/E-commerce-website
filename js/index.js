document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    isValid &= validateField("name", "nameError", "Username is required.");
    isValid &= validateField(
      "password",
      "passwordError",
      "Password must be at least 6 characters long.",
      validatePassword
    );

    if (isValid) {
      loginUser();
    }
  });

  function validateField(fieldId, errorId, errorMessage, validator = (val) => val.trim() !== "") {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const isValid = validator(value);

    if (isValid) {
      showSuccess(field, errorId);
    } else {
      showError(field, errorId, errorMessage);
    }

    return isValid;
  }

  function showError(field, errorId, message) {
    document.getElementById(errorId).textContent = message;
    field.style.border = "2px solid red";
  }

  function showSuccess(field, errorId) {
    document.getElementById(errorId).textContent = "";
    field.style.border = "2px solid green";
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((error) => (error.textContent = ""));
    document.querySelectorAll("input").forEach((input) => (input.style.border = ""));
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  ["name", "password"].forEach((fieldId) => {
    document.getElementById(fieldId).addEventListener("blur", function () {
      validateField(
        fieldId,
        fieldId + "Error",
        fieldId === "password" ? "Password must be at least 6 characters long." : "Username is required.",
        fieldId === "password" ? validatePassword : undefined
      );
    });
  });

  function loginUser() {
    const username = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Invalid username or password.");
      }
      return res.json();
    })
    .then(data => {
  
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      window.location.href = 'main.html';
   
    })
    .catch(error => {
      showError(document.getElementById("password"), "passwordError", error.message);
    });
  }

  // function refreshToken() {
  //   fetch('https://dummyjson.com/auth/refresh', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       refreshToken: localStorage.getItem("token"),
  //       expiresInMins: 30
  //     }),
  //     credentials: 'include'
  //   })
  //   .then(res => res.json())
  //   .then(data => {

  //     localStorage.setItem("token", data.accessToken);
  //   })
  //   .catch(error => console.error("Token refresh failed:", error));
  // }
});