let data;
let token = sessionStorage.getItem('token');
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

// Pour stocker le resultat de getWorks
getWorksResult = getWorks()

console.log(getWorksResult)

// Once the function is validated.

// La je refait appel à la fonction, il ne faut pas
getWorks().then(() => {
  // Recovery class gallery
  const gallery = document.querySelector(".gallery");
  const btnTous = document.querySelector(".btn-tous");
  const btnObjets = document.querySelector(".btn-objets");
  const btnAppartements = document.querySelector(".btn-appartements");
  const bntHotelsEtRestaurants = document.querySelector(".btn-hotelsetrestaurants");

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
getWorks().then(() => {

  const galleryModal = document.querySelector('.gallery_modal');
  
  // function generateGalleryModal(data) {
  //   galleryModal.innerHTML = "";

    // Browse the table data
    for (let i = 0; i < data.length; i++) {

      // Creation of figure
      const figureElement = document.createElement("figure");
      figureElement.classList.add('figure-modal');
      figureElement.id = data[i].id;
      
      // Creation of img
      const imageElement = document.createElement("img");
      imageElement.classList.add('img-galery')
      imageElement.src = data[i].imageUrl;

      const iconElement = document.createElement('i');
      iconElement.classList.add('fa-solid', 'fa-trash-can');

      // Creation of title
      const paragraphElement = document.createElement("p");
      paragraphElement.innerText = "éditer";

      // To display the elements
      galleryModal.appendChild(figureElement);
      figureElement.appendChild(imageElement);
      figureElement.appendChild(iconElement)
      figureElement.appendChild(paragraphElement);
      
      iconElement.addEventListener('click', function() {
        console.log('click' + data[i].id)
        deleteProject(i);
      })
    }
  // }
  // generateGalleryModal(data);
  
})

// delete project modal

function deleteProject(i) {
  
  fetch('http://localhost:5678/api/works/'+ data[i].id, {

    method : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Projet supprimé !')
    } else {
      console.log('Projet non supprimé')
    }
  })
}


// change for connect
function userLogin() {
  
  if(sessionStorage.getItem('userId')) {
    
    let login = document.querySelector('.login');
    login.innerHTML="logout"
    let editBar = document.querySelector('.edit_bar')
    editBar.style.display = 'flex'
    let filterBtn = document.querySelector('.buttons')
    filterBtn.style.display='none'
    createEdit()
  }
}
userLogin()

// change for disconnect 
function logout() {
  let login = document.querySelector('.login');
  login.addEventListener('click', () => {
    
    if(login.innerHTML="logout") {
        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("token")
        login.innerHTML="login"
        location.reload()
    } else {
      window.location.href = "/FrontEnd/login.html"
    }
  })
}
logout()

// adding "modifier"
function createEdit() {
  
  // Recovering classes
  const parentEdit = document.querySelectorAll('.parent-edit')

  for (let i = 0; i < parentEdit.length; i++) {
  
    let idEdit = 'edit' + i;
    const divElement = document.createElement('div');
    divElement.id = idEdit
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', 'fa-pen-to-square');
    iconElement.style.color = 'black';
    const paragraphElement = document.createElement('p');
    paragraphElement.innerText = "modifier";
    
    parentEdit[i].appendChild(divElement)
    divElement.appendChild(iconElement)
    divElement.appendChild(paragraphElement)
  }

  const btnModal = document.querySelector('.btn-modal');
  const divElement = document.createElement('div');
  divElement.id = 'edit2';
  const iconElement = document.createElement('i');
  iconElement.classList.add('fa-solid', 'fa-pen-to-square');
  iconElement.style.color = 'black';
  const paragraphElement = document.createElement('p');
  paragraphElement.innerText = "modifer";
  paragraphElement.classList.add('modal-trigger');

  btnModal.appendChild(divElement);
  divElement.appendChild(iconElement)
  divElement.appendChild(paragraphElement)

}

// Open/Close modal
const modalContainer = document.querySelector('.modal-container');
const modalTriggers = document.querySelectorAll('.modal-trigger');

modalTriggers.forEach(trigger => trigger.addEventListener('click', function() {
  toggleModal(),
  desactivateHomePage();
}));

function toggleModal() {
  modalContainer.classList.toggle("active")
}

// Desactivate home-page for modal
const body = document.querySelector('body');

function desactivateHomePage() {
  body.classList.toggle('modal-open');
}


// for adding project

  const addPhoto = document.querySelector('.btn-add-photo');

  addPhoto.addEventListener('click', () => {
    addProject()
  })

  function addProject() {
    
    const contentModal = document.querySelector('.content_modal');
    const gridModal = document.querySelector('.grid-modal');
    const titleModal = document.querySelector('.title_modal');
    const deleteGallery = document.querySelector('.delete-gallery');

    titleModal.innerText = 'Ajout photo';
    gridModal.innerHTML="";
    
    const divElement = document.createElement('div');
    divElement.classList.add('rectangle-modal')
    
    const iconArrowElement = document.createElement('i');
    iconArrowElement.classList.add('fa-solid', 'fa-regular', 'fa-arrow-left');
    iconArrowElement.style.color = 'black';
    
    const iconImageElement = document.createElement('i');
    iconImageElement.classList.add('fa-regular', 'fa-image', 'icon-image');

    const divBtn = document.createElement('div');
    divBtn.classList.add('div-btn')
    const btnAddPhoto = document.createElement('button');
    btnAddPhoto.innerText = '+ Ajouter photo';
    btnAddPhoto.classList.add('btn-add');

    const paragraphElement = document.createElement('p');
    paragraphElement.innerText = "jpg, png : 4mo max";
    paragraphElement.classList.add('supported-format')

    deleteGallery.remove('p');

    contentModal.appendChild(iconArrowElement);
    gridModal.appendChild(divElement);
    divElement.appendChild(iconImageElement)
    divElement.appendChild(divBtn);
    divBtn.appendChild(btnAddPhoto);
    divElement.appendChild(paragraphElement)
  }
