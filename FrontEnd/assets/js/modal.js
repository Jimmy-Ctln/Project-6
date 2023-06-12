import { getWorksResult } from "./script.js";
import { getWorks } from "./script.js";
import { baseUrl } from "./urlApi.js";
import { refreshGallery } from "./script.js";

const token = sessionStorage.getItem("token");
let createErrorImage = false;
let createErrorTitle = false;


// To generate the modal gallery
export function generateGaleryModal() {
  getWorksResult.then((data) => {
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

      const iconTrashElement = document.createElement("i");
      iconTrashElement.classList.add("fa-solid", "fa-trash-can");

      // Creation of title
      const paragraphElement = document.createElement("p");
      paragraphElement.innerText = "éditer";

      // To display the elements
      galleryModal.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(iconTrashElement);
      figureElement.appendChild(paragraphElement);

      iconTrashElement.addEventListener("click", function () {
        deleteProject(data[i].id);
        figureElement.remove(data[i]);
      });
    }
  });
}

// Close modal with buttons html
function CloseModal() {
  const btnCloseModal = document.querySelectorAll(".close-modal");

  btnCloseModal.forEach((btnClose) => {
    btnClose.addEventListener("click", function () {
      removeClassModal();
    });
  });
}
CloseModal();

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

// Delete projects
function deleteProject(id) {
  fetch(`${baseUrl}works/` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      refreshGallery();
      refreshGalleryModal();
    } else {
      console.log("erreur lors de la supppresion.");
    }
  });
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

  const iconArrowLeft = document.createElement("i");
  iconArrowLeft.classList.add("fa-solid", "fa-regular", "fa-arrow-left");
  iconArrowLeft.style.color = "black";

  // Click on the back arrow
  iconArrowLeft.addEventListener("click", function () {
    modalBack();
    refreshGalleryModal();
    ClickBtnAddPhotoModal();
    CloseModal();
    createErrorImage = false;
    createErrorTitle = false;
  });

  const iconImageElement = document.createElement("i");
  iconImageElement.classList.add("fa-regular", "fa-image", "icon-image");


  const divBtn = document.createElement("div");
  divBtn.classList.add("div-btn");
  const btnAddPhotoModal = document.createElement("button");
  btnAddPhotoModal.innerText = "+ Ajouter photo";
  btnAddPhotoModal.classList.add("btn-add");
  const inputFile = document.createElement("input");
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("name", "imageUrl");
  inputFile.id = "imageUrl";
  inputFile.style.display = "none";

  btnAddPhotoModal.addEventListener("click", () => {
    inputFile.click();
  });

  const divImageElement = document.createElement("div");
  divImageElement.id = "selectedFile";
  divElement.appendChild(divImageElement);
  const imageSelectedElement = document.createElement("img");
  imageSelectedElement.classList.add("image-selected-element");
  divImageElement.appendChild(imageSelectedElement);

    inputFile.addEventListener("change", () => {
      const selectedFile = inputFile.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const content = event.target.result;
        imageSelectedElement.src = content;
      };

      reader.readAsDataURL(selectedFile);

      iconImageElement.style.display='none';
      divBtn.style.display='none';
      paragraphElement.style.display='none';
    });

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
    
    contentModal.appendChild(iconArrowLeft);
    gridModal.appendChild(divElement);
    divElement.appendChild(iconImageElement);
    divElement.appendChild(divBtn);
    divBtn.appendChild(btnAddPhotoModal);
    divBtn.appendChild(inputFile);
    divElement.appendChild(paragraphElement);
    divForm.innerHTML = formHTML;
    modal.appendChild(divForm);
    

    
  const formAddNewProject = document.getElementById("form-add-project");

// Create form data for the form
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
        refreshGalleryModal();
        refreshGallery();
        resetForm()
      } else {
        console.log("erreur lors de l'envoi.");
      }
    });
  }

  // Check if it's ok before sending the form
  function checkInput() {
    let imageOK = false;
    let titleOK = false;
    const titleForm = formAddNewProject.elements["title"].value;

    const selectedFile = inputFile.files;

    if (selectedFile.length > 0) {
      imageOK = true;
    }

    if (titleForm !== "") {
      titleOK = true;
    }
    if (imageOK && titleOK === true) {
      fetchFormNewProject();
    } else {
      if (!imageOK) {
        createErrorForImage();
      }

      if (!titleOK) {
        createErrorForTitle();
      }
    }
  }

  function createErrorForTitle() {
    if (createErrorTitle === false) {
      const divError = document.querySelector(".errorMessageForm");
      const errorMessage = document.createElement("span");
      errorMessage.innerText = "Veuillez renseigner un titre";
      if (divError !== null) {
        divError.appendChild(errorMessage);
      }
      createErrorTitle = true;
    }
  }

  function createErrorForImage() {
    if (createErrorImage === false) {
      const divErrorInput = document.createElement("div");
      divErrorInput.classList.add("error-form-input");
      const ErrorMessageInput = document.createElement("span");
      ErrorMessageInput.innerText = "Veuillez sélectionner une image";
      divElement.appendChild(divErrorInput);
      divErrorInput.appendChild(ErrorMessageInput);
      createErrorImage = true;
    }
  }

  function changeColorSubmitForm() {
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
  changeColorSubmitForm();

  // Sends the form on click
  formAddNewProject.addEventListener("submit", function (event) {
    event.preventDefault();
    checkInput();
  });

  function resetForm() {
    removeClassModal()
    modalBack()
    // formAddNewProject.reset()
    createErrorImage = false;
    createErrorTitle = false;
    addNewProjectFromModal()
    CloseModal()
    fetchCategory()
  }

}

// When I click on the back arrow
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

// Generates categories in the form
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
function ClickBtnAddPhotoModal() {
  const btnAddPhotoModal = document.querySelector(".btn-add-photo");

  btnAddPhotoModal.addEventListener("click", () => {
    addNewProjectFromModal();
    fetchCategory();
  });
}
ClickBtnAddPhotoModal();

// Refreshes the modal after action
function refreshGalleryModal() {
  getWorks().then((data) => {
    const galleryModal = document.querySelector(".gallery_modal");

    if (galleryModal !== null) {
      // Manipulez le contenu de l'élément ici en toute sécurité
      galleryModal.innerHTML = "";
    }
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
      if (galleryModal !== null) {
        // Manipulez le contenu de l'élément ici en toute sécurité
        galleryModal.appendChild(figureElement);
      }
      figureElement.appendChild(imageElement);
      figureElement.appendChild(iconTrashCan);
      figureElement.appendChild(paragraphElement);

      iconTrashCan.addEventListener("click", function () {
        deleteProject(data[i].id);
        figureElement.remove(data[i]);
      });
    }
  });
}

