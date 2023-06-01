import { generateGaleryModal } from "./modal.js";
import { triggerModal } from "./modal.js";
import { addNewProjectFromModal } from "./modal.js";
import { fetchCategory } from "./modal.js";

let data;
let getWorksResult = null;

// create a fetch function for works
async function getWorks() {
  try {
    // Recovery of the api
    const fetchWorks = await fetch("http://localhost:5678/api/works");
    data = await fetchWorks.json();
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite");
  }
}

getWorksResult = getWorks();

getWorksResult.then((data) => {
  // Recovery class gallery
  const gallery = document.querySelector(".gallery");
  const btnTous = document.querySelector(".btn-tous");
  const btnObjets = document.querySelector(".btn-objets");
  const btnAppartements = document.querySelector(".btn-appartements");
  const bntHotelsEtRestaurants = document.querySelector(
    ".btn-hotelsetrestaurants"
  );

  function generateGallery(data) {
    gallery.innerHTML = "";

    // Browse the table data
    for (let i = 0; i < data.length; i++) {
      // Creation of figure
      const figureElement = document.createElement("figure");

      // Creation of img
      const imageElement = document.createElement("img");
      imageElement.src = data[i].imageUrl;

      // Creation of title
      const titleElement = document.createElement("figcaption");
      titleElement.innerText = data[i].title;

      // To display the elements
      gallery.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(titleElement);
    }
  }
  generateGallery(data);

  function filterElement(categoryName) {
    const filterElement = data.filter(
      (obj) => obj.category.name === categoryName
    );
    console.log(filterElement);
    gallery.innerHTML = "";
    generateGallery(filterElement);
  }

  btnTous.addEventListener("click", () => {
    generateGallery(data);
  });

  btnObjets.addEventListener("click", () => {
    filterElement("Objets");
  });

  btnAppartements.addEventListener("click", () => {
    filterElement("Appartements");
  });

  bntHotelsEtRestaurants.addEventListener("click", () => {
    filterElement("Hotels & restaurants");
  });
});

// For modal
getWorksResult.then((data) => {
  // Function to generate the modal gallery (from modal.js)
  generateGaleryModal(data);
});

// change for connect
function userLogin() {
  if (sessionStorage.getItem("userId")) {
    let login = document.querySelector(".login");
    login.innerHTML = "logout";
    let editBar = document.querySelector(".edit_bar");
    editBar.style.display = "flex";
    let filterBtn = document.querySelector(".buttons");
    filterBtn.style.display = "none";
    createEdit();
  }
}
userLogin();

// change for disconnect
function logout() {
  let login = document.querySelector(".login");
  login.addEventListener("click", () => {
    if ((login.innerHTML = "logout")) {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      login.innerHTML = "login";
      location.reload();
    } else {
      window.location.href = "/FrontEnd/login.html";
    }
  });
}
logout();

// adding "modifier"
function createEdit() {
  // Recovering classes
  const parentEdit = document.querySelectorAll(".parent-edit");

  for (let i = 0; i < parentEdit.length; i++) {
    let idEdit = "edit" + i;
    const divElement = document.createElement("div");
    divElement.id = idEdit;
    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", "fa-pen-to-square");
    iconElement.style.color = "black";
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = "modifier";

    parentEdit[i].appendChild(divElement);
    divElement.appendChild(iconElement);
    divElement.appendChild(paragraphElement);
  }

  const btnModal = document.querySelector(".btn-modal");
  const divElement = document.createElement("div");
  divElement.id = "edit2";
  const iconElement = document.createElement("i");
  iconElement.classList.add("fa-solid", "fa-pen-to-square");
  iconElement.style.color = "black";
  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = "modifer";
  paragraphElement.classList.add("modal-trigger");

  btnModal.appendChild(divElement);
  divElement.appendChild(iconElement);
  divElement.appendChild(paragraphElement);
}

// OPEN AND CLOSE MODALE
triggerModal();

// for adding project

const btnAddPhoto = document.querySelector(".btn-add-photo");

btnAddPhoto.addEventListener("click", () => {
  addNewProjectFromModal();
  fetchCategory();
});
