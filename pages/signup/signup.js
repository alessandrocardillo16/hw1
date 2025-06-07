const formStatus = {
  name: false,
  surname: false,
  email: false,
  password: false,
  confirmPassword: false,
  allow: false,
};

function checkName(event) {
  const input = event.currentTarget;
  formStatus[input.name] = input.value.length > 0;
  if (formStatus[input.name]) {
    input.parentNode.classList.remove("errorj");
  } else {
    input.parentNode.classList.add("errorj");
  }
}

function checkSurname(event) {
  const input = event.currentTarget;
  formStatus[input.name] = input.value.length > 0;
  if (formStatus[input.name]) {
    input.parentNode.classList.remove("errorj");
  } else {
    input.parentNode.classList.add("errorj");
  }
}

function jsonCheckEmail(json) {
  formStatus.email = !json.exists;
  if (formStatus.email) {
    document.querySelector(".email").classList.remove("errorj");
    document.querySelector(".email span").textContent = "";
  } else {
    document.querySelector(".email span").textContent = "Email già utilizzata";
    document.querySelector(".email").classList.add("errorj");
  }
}

function fetchResponse(response) {
  if (!response.ok) return null;
  return response.json();
}

function checkEmail(event) {
  const emailInput = document.querySelector(".email input");
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(emailInput.value).toLowerCase()
    )
  ) {
    document.querySelector(".email span").textContent = "Email non valida";
    document.querySelector(".email").classList.add("errorj");
    formStatus.email = false;
  } else {
    fetch(
      "/hw1/APIs/check_email.php?q=" +
        encodeURIComponent(String(emailInput.value).toLowerCase())
    )
      .then(fetchResponse)
      .then(jsonCheckEmail);
  }
}

function checkPassword(event) {
  const passwordInput = document.querySelector(".password input");
  formStatus.password = passwordInput.value.length >= 8;
  if (formStatus.password) {
    document.querySelector(".password").classList.remove("errorj");
  } else {
    document.querySelector(".password").classList.add("errorj");
  }
}

function checkConfirmPassword(event) {
  const confirmPasswordInput = document.querySelector(
    ".confirm_password input"
  );
  console.log(document.querySelector(".password input").value);

  formStatus.confirmPassword =
    confirmPasswordInput.value ===
    document.querySelector(".password input").value;
  console.log(formStatus.confirmPassword);

  if (formStatus.confirmPassword) {
    document.querySelector(".confirm_password").classList.remove("errorj");
  } else {
    document.querySelector(".confirm_password").classList.add("errorj");
  }
}

function checkSignup(event) {
  const checkbox = document.querySelector(".allow input");
  formStatus[checkbox.name] = checkbox.checked;
  if (
    Object.keys(formStatus).length !== 6 ||
    Object.values(formStatus).includes(false)
  ) {
    event.preventDefault();
    console.log(formStatus);
  }
}

document.querySelector(".name input").addEventListener("blur", checkName);
document.querySelector(".surname input").addEventListener("blur", checkSurname);
document.querySelector(".email input").addEventListener("blur", checkEmail);
document
  .querySelector(".password input")
  .addEventListener("blur", checkPassword);
document
  .querySelector(".confirm_password input")
  .addEventListener("blur", checkConfirmPassword);
document.querySelector("form").addEventListener("submit", checkSignup);
