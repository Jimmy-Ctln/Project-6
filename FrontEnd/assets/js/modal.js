import { getWorksResult } from "./script.js";

// Function to generate the modal gallery on the main page

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
      console.log("click" + data[i].id);
      deleteProject(data[i].id);
    });
  }
});
}

function deleteProject(id) {
  let token = sessionStorage.getItem("token");

  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  // Faire une mise à jour getWorks;
}

// Open/Close modal

export function triggerModal() {
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", function () {
      toggleModal(), desactivateHomePage();
    })
  );
}

// Faire un evenement qui sépare ouvrir et fermer

export function toggleModal() {
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.classList.toggle("active");
}

// Desactivate home-page for modal
export function desactivateHomePage() {
  const body = document.querySelector("body");
  body.classList.toggle("modal-open");
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

  iconArrowElement.addEventListener('click', function() {
    modalBack();
    generateGaleryModal();
    clickBtnAddPhoto()
  })

  
  const iconImageElement = document.createElement("i");
  iconImageElement.classList.add("fa-regular", "fa-image", "icon-image");

  const divBtn = document.createElement("div");
  divBtn.classList.add("div-btn");
  const btnAddPhoto = document.createElement("button");
  btnAddPhoto.innerText = "+ Ajouter photo";
  btnAddPhoto.classList.add("btn-add");
  const inputFile = document.createElement("input");
  inputFile.setAttribute("type", "file");
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

  inputFile.addEventListener("change", () => {
    const selectedFile = inputFile.files[0];
    console.log(selectedFile);
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

  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = "jpg, png : 4mo max";
  paragraphElement.classList.add("supported-format");

  const divForm = document.createElement("div");
  divForm.classList.add("positioning-form");
  const formHTML = `
    <form id="form-add-project" action="#" method="post">
        <label for="title">Titre</label>
        <input class="bloc-form" type="text" name="title-form" id="title-form">
        
        <label class="category" for="Category">Catégorie</label>
        <select class="bloc-form" id="category-api"></select>

        
        <input class="confirm" type="submit" value="Valider">
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

  const formAddNewProject = document.getElementById('form-add-project');
  console.log(formAddNewProject)

  // Ajouter la fonction pour le form ici
 
}


export function modalBack() {
  
  const modal = document.querySelector('.modal');

  modal.innerHTML = `
  <div class="content_modal">
    <h3 class="title_modal">Galerie photo</h3>
    <i class="fa-solid fa-xmark modal-trigger"></i>
  </div>
  <div class="grid-modal">
    <div class="gallery_modal"></div>
  </div>
  <div class="modal-bar"></div>
  <div class="footer_modal">
    <button class="btn-add-photo">Ajouter une photo</button>
    <p class="delete-gallery">Supprimer la galerie</p>
  </div>`
  
}

// Pour récupérer l'id du form permettant l'ajout d'un nouveau projet
// const formAddNewProject = document.getElementById('form-add-project');
// console.log(formAddNewProject)
//  == null
// Peut être un problème de priorité ?

// formAddNewProject.addEventListener('submit', function(event) {
//   event.preventDefault()
//   formContent()
//   fetchFormNewProject()
// })

async function fetchCategory() {
  try {
    const category = await fetch("http://localhost:5678/api/categories");
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
clickBtnAddPhoto()

function formContent() {

  // const formAddNewProject = document.getElementById('form-add-project');
  
  
  const newProjectForm = {};
  
  const titleForm = formAddNewProject.elements['title-form'].value;
  const categoryForm = formAddNewProject.elements['category-api'].value;
  
  newProjectForm.title = titleForm;
  newProjectForm.name = categoryForm;
}


// function for send new project with api
async function fetchFormNewProject() {

  const fetchNewProject = await fetch('http://localhost:5678/api/categories', {

    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProjectForm),
  })
  
  
}

function sendNewProject() {
 
  const formAddNewProject = document.getElementById('form-add-project');
      
}
sendNewProject()

