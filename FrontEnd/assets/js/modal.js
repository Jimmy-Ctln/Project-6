import { getWorksResult } from "./script.js";
import { getWorks } from "./script.js";
import { baseUrl } from "./urlApi.js";

const token = sessionStorage.getItem("token");
// console.log(`Bearer ${token}`)
// Function to generate the modal gallery on the main page

export function generateGaleryModal() {
  getWorksResult.then((data) => {
    const galleryModal = document.querySelector(".gallery_modal");

    // // Check le nombre d'élèment dans le tableau
    // console.log(data)

    // Browse the table data
    for (let i = 0; i < data.length; i++) {
      // Creation of figure
      const figureElement = document.createElement("figure");
      figureElement.classList.add("figure-modal");
      figureElement.id = data[i].id;

      // Creation of img
      const imageElement = document.createElement("img");
      imageElement.classList.add("img-galery");
      imageElement.src = data[i].imageUrl;

      const iconElement = document.createElement("i");
      iconElement.classList.add("fa-solid", "fa-trash-can");

      // Creation of title
      const paragraphElement = document.createElement("p");
      paragraphElement.innerText = "éditer";

      // To display the elements
      galleryModal.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(iconElement);
      figureElement.appendChild(paragraphElement);

      iconElement.addEventListener("click", function () {
        // console.log("click" + data[i].id);
        // figureElement.remove(data[i]);
        deleteProject(data[i].id);
      });

      function deleteProject(id) {
        fetch(`${baseUrl}works/` + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.ok) {
            console.log("Suppresion validé !");
            figureElement.remove(data[i]);
          } else {
            console.log("erreur lors de la supppresion.");
          }
        });
      }
    }
  });
}

function refreshGaleryModalBack() {
  getWorks().then((data) => {
    const galleryModal = document.querySelector(".gallery_modal");

    // Browse the table data
    for (let i = 0; i < data.length; i++) {
      // Creation of figure
      const figureElement = document.createElement("figure");
      figureElement.classList.add("figure-modal");
      figureElement.id = data[i].id;

      // Creation of img
      const imageElement = document.createElement("img");
      imageElement.classList.add("img-galery");
      imageElement.src = data[i].imageUrl;

      const iconTrashCan = document.createElement("i");
      iconTrashCan.classList.add("fa-solid", "fa-trash-can");

      // Creation of title
      const paragraphElement = document.createElement("p");
      paragraphElement.innerText = "éditer";

      // To display the elements
      galleryModal.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(iconTrashCan);
      figureElement.appendChild(paragraphElement);

      iconTrashCan.addEventListener("click", function () {
        deleteProject(data[i].id);
      });

      function deleteProject(id) {
        fetch(`${baseUrl}works/` + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.ok) {
            console.log("Suppresion validé !");
            figureElement.remove(data[i]);
          } else {
            console.log("erreur lors de la supppresion.");
          }
        });
      }
    }
  });
}

// Close modal

function btnCloseModal() {
  const btnCloseModal = document.querySelectorAll(".close-modal");

  btnCloseModal.forEach((btnClose) => {
    btnClose.addEventListener("click", function () {
      removeClassModal();
      location.reload();
    });
  });
}
btnCloseModal();

// To add the active class to open the modal

export function addClassModal() {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.add("active");
  const body = document.querySelector("body");
  body.classList.add("modal-open");
}

// To remove the active class to close the modal

function removeClassModal() {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.remove("active");
  const body = document.querySelector("body");
  body.classList.remove("modal-open");
}

// Adding a new project from modal
export function addNewProjectFromModal() {
  const contentModal = document.querySelector(".content_modal");
  const gridModal = document.querySelector(".grid-modal");
  const titleModal = document.querySelector(".title_modal");
  const modal = document.querySelector(".modal");

  titleModal.innerText = "Ajout photo";
  gridModal.innerHTML = "";

  const divElement = document.createElement("div");
  divElement.classList.add("rectangle-modal");

  const iconArrowElement = document.createElement("i");
  iconArrowElement.classList.add("fa-solid", "fa-regular", "fa-arrow-left");
  iconArrowElement.style.color = "black";

  // Click on the back arrow
  iconArrowElement.addEventListener("click", function () {
    modalBack();
    refreshGaleryModalBack();
    clickBtnAddPhoto();
    btnCloseModal();
  });

  const iconImageElement = document.createElement("i");
  iconImageElement.classList.add("fa-regular", "fa-image", "icon-image");

  const divBtn = document.createElement("div");
  divBtn.classList.add("div-btn");
  const btnAddPhoto = document.createElement("button");
  btnAddPhoto.innerText = "+ Ajouter photo";
  btnAddPhoto.classList.add("btn-add");
  const inputFile = document.createElement("input");
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("name", "imageUrl");
  inputFile.id = "imageUrl";
  inputFile.style.display = "none";

  btnAddPhoto.addEventListener("click", () => {
    inputFile.click();
  });

  const divImageElement = document.createElement("div");
  divImageElement.id = "selectedFile";
  divElement.appendChild(divImageElement);
  const imageSelectedElement = document.createElement("img");
  imageSelectedElement.classList.add("image-selected-element");
  divImageElement.appendChild(imageSelectedElement);

  function imageSelected() {
    inputFile.addEventListener("change", () => {
      const selectedFile = inputFile.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const content = event.target.result;
        imageSelectedElement.src = content;
      };

      reader.readAsDataURL(selectedFile);

      iconImageElement.remove("i");
      divBtn.remove("div");
      paragraphElement.remove("p");
    });
  }
  imageSelected();

  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = "jpg, png : 4mo max";
  paragraphElement.classList.add("supported-format");

  const divForm = document.createElement("div");
  divForm.classList.add("positioning-form");
  const formHTML = `
    <form id="form-add-project" action="#" method="post">
        <label for="title">Titre</label>
        <input class="bloc-form" type="text" name="title" id="title-form">
        <div class="errorMessageForm"></div>
        
        <label class="category" for="Category">Catégorie</label>
        <select class="bloc-form" id="category-api" name="categoryId"></select>

        
        <input class="confirm-btn" type="submit" value="Valider">
    </form>
    `;

  const footerModal = document.querySelector(".footer_modal");
  footerModal.remove("div");

  contentModal.appendChild(iconArrowElement);
  gridModal.appendChild(divElement);
  divElement.appendChild(iconImageElement);
  divElement.appendChild(divBtn);
  divBtn.appendChild(btnAddPhoto);
  divBtn.appendChild(inputFile);
  divElement.appendChild(paragraphElement);
  divForm.innerHTML = formHTML;
  modal.appendChild(divForm);

  const formAddNewProject = document.getElementById("form-add-project");

  function formDataProject() {
    const formData = new FormData();
    const titleForm = formAddNewProject.elements["title"].value;

    const categoryFormId = formAddNewProject.elements["categoryId"].value;

    const selectedFile = inputFile.files[0];

    formData.append("image", selectedFile, "image");
    formData.append("title", titleForm);
    formData.append("category", categoryFormId);

    return formData;
  }

  // function for send new project with api
  function fetchFormNewProject() {
    fetch(`${baseUrl}works`, {
      method: "POST",
      body: formDataProject(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Projet validé et envoyé !");
        return response.json();
      } else {
        console.log("erreur lors de l'envoi.");
      }
    });
  }

  function checkInput() {
    let conditionImage = false;
    let conditionTitle = false;
    const titleForm = formAddNewProject.elements["title"].value;
    
    const selectedFile = inputFile.files;

    if (selectedFile.length > 0) {
      conditionImage = true;
      console.log('image ok')
    }
    
    if (titleForm !== "") {
      conditionTitle = true;
    }
    if (conditionImage && conditionTitle === true) {
      fetchFormNewProject();
    } else {
      
      if (!conditionImage) {
        createErrorForImage();
      }

      if (!conditionTitle) {
        CreateErrorForTitle();
      }
    }
  }

  function changeColorBtnForm() {
    let conditionImage = false;
    let conditionTitle = false;

    const titleForm = formAddNewProject.elements["title"];
    const inputFile = document.getElementById("imageUrl");
    const confirmBtn = document.querySelector(".confirm-btn");

    inputFile.addEventListener("change", function () {
      if (inputFile.files.length > 0) {
        conditionImage = true;
      }
      if (conditionImage && conditionTitle === true) {
        confirmBtn.style.backgroundColor = "#1D6154";
      } else {
        confirmBtn.style.backgroundColor = "#A7A7A7";
      }
    });

    titleForm.addEventListener("input", function () {
      const titleFormValue = titleForm.value;

      if (titleFormValue !== "") {
        conditionTitle = true;
      }
      if (conditionImage && conditionTitle === true) {
        confirmBtn.style.backgroundColor = "#1D6154";
      } else {
        confirmBtn.style.backgroundColor = "#A7A7A7";
      }
    });
  }
  changeColorBtnForm();

  function CreateErrorForTitle() {
    const divError = document.querySelector(".errorMessageForm");
    const errorMessage = document.createElement("span");
    errorMessage.innerText = "Veuillez renseigner un titre";
    divError.appendChild(errorMessage);
  }

  function createErrorForImage() {
    const divErrorInput = document.createElement("div");
    divErrorInput.classList.add("error-form-input");
    const ErrorMessageInput = document.createElement("span");
    ErrorMessageInput.innerText = "Veuillez sélectionner une image";
    divElement.appendChild(divErrorInput);
    divErrorInput.appendChild(ErrorMessageInput);
  }

  formAddNewProject.addEventListener("submit", function (event) {
    event.preventDefault();
    checkInput();
  });
}

export function modalBack() {
  const modal = document.querySelector(".modal");

  modal.innerHTML = `
  <div class="content_modal">
    <h3 class="title_modal">Galerie photo</h3>
    <i class="fa-solid fa-xmark close-modal"></i>
  </div>
  <div class="grid-modal">
    <div class="gallery_modal"></div>
  </div>
  <div class="modal-bar"></div>
  <div class="footer_modal">
    <button class="btn-add-photo">Ajouter une photo</button>
    <p class="delete-gallery">Supprimer la galerie</p>
  </div>`;
}

async function fetchCategory() {
  try {
    const category = await fetch(`${baseUrl}categories`);
    let data = await category.json();

    data.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;

      const categoryApi = document.querySelector("#category-api");
      categoryApi.appendChild(option);
    });
  } catch {
    console.log("erreur lors de la récupération des catégories");
  }
}

// Click on the button to generate the modal page + api call
function clickBtnAddPhoto() {
  const btnAddPhoto = document.querySelector(".btn-add-photo");

  btnAddPhoto.addEventListener("click", () => {
    addNewProjectFromModal();
    fetchCategory();
  });
}
clickBtnAddPhoto();
