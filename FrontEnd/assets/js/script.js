import { generateGalleryModal } from "./modal.js";
import { addClassModal } from "./modal.js";
import { baseUrl } from "./urlApi.js";
let getWorksResult = null;

// create a fetch function for works
export async function getWorks() {
  try {
    // Recovery of the api
    let data;
    const fetchWorks = await fetch(`${baseUrl}works`);
    data = await fetchWorks.json();
    return data;
  } catch (error) {
    console.error("Une erreur s'est produite");
  }
}

getWorksResult = getWorks();

getWorksResult.then((data) => {
 
  // to generate the gallery and galleryModal
  generateGallery(data);
  generateGalleryModal(data);

  const gallery = document.querySelector(".gallery");
  const btnTous = document.querySelector(".btn-tous");

  btnTous.addEventListener("click", () => {
    generateGallery(data);
  });

// function for filtering work
  function filterElement(categoryName) {
    const filterElement = data.filter(
      (obj) => obj.category.name === categoryName
    );
    gallery.innerHTML = "";
    generateGallery(filterElement);
  }
  
  function fetchCategory() {
    fetch(`${baseUrl}categories`)
    .then(response => response.json())
    .then(data => {
      data.forEach((category) => {

        const buttons = document.querySelector(".buttons");
        const btn = document.createElement("button");
        btn.id = category.name;
        btn.textContent = category.name;
        btn.classList.add("filter-btn");
  
        buttons.appendChild(btn);
        
      })
      
      const btnObjets = document.getElementById('Objets');
      const btnAppartements = document.getElementById('Appartements');
      const bntHotelsEtRestaurants = document.getElementById('Hotels & restaurants')
      
      btnObjets.addEventListener('click', () => {
        filterElement('Objets')
      })
    
      btnAppartements.addEventListener("click", () => {
        filterElement("Appartements");
      });
    
      bntHotelsEtRestaurants.addEventListener("click", () => {
        filterElement("Hotels & restaurants");
      });

    })
  }
  fetchCategory()
});

// change for connect
function userLogin() {
  if (sessionStorage.getItem("token")) {
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

// change for disconnect with button "logout"
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

// Add edit buttons when logged in
function createEdit() {
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
  paragraphElement.classList.add("btn-open-modal");

  btnModal.appendChild(divElement);
  divElement.appendChild(iconElement);
  divElement.appendChild(paragraphElement);

  const btnOpenModal = document.querySelector(".btn-open-modal");

  btnOpenModal.addEventListener("click", () => {
    addClassModal();
  });
}

function generateGallery(data) {
  const gallery = document.querySelector(".gallery");

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

// Refresh the gallery
export function refreshGallery() {
  getWorks().then(generateGallery);
}