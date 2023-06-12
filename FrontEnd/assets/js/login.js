const formLog = document.querySelector("form");
let errorMessage = false;
const delai = 800;
const userForm = {};

function retrieveFormContent() {
  const email = formLog.elements["email"].value;
  const password = formLog.elements["password"].value;
  userForm.email = email;
  userForm.password = password;
}


// Sends a request in post
function fetchUsers() {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  }).then((response) => {
    if (response.ok) {
      return response.json()

        .then((data) => {
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("token", data.token);
          window.location.href = "./index.html";
        });
    } else {
      connectionError();
    }
  });
}

// Click on submit to send the form content
formLog.addEventListener("submit", function (event) {
  event.preventDefault();
  retrieveFormContent();
  fetchUsers();
});

// To display error messages
function connectionError() {
  if (errorMessage === false) {
    const submit = document.querySelector(".style-btn");
    const divElement = document.createElement("div");
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = "Erreur dans l’identifiant ou le mot de passe";
    paragraphElement.classList.add("error-Login");
    errorMessage = true;

    submit.insertAdjacentElement("beforebegin", divElement);
    divElement.appendChild(paragraphElement);

    setTimeout(function () {
      formLog.reset();
      errorMessage = false;
      paragraphElement.innerText = "";
    }, delai);
  }
}
