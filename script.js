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


getWorksResult = getWorks()


getWorksResult.then(data => {
 
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
})


// For modal
getWorksResult.then(data => {

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


  const btnAddPhoto = document.querySelector('.btn-add-photo');


  btnAddPhoto.addEventListener('click', () => {
    addProject()
  })


  function addProject() {
   
    const contentModal = document.querySelector('.content_modal');
    const gridModal = document.querySelector('.grid-modal');
    const titleModal = document.querySelector('.title_modal');
    const modal = document.querySelector('.modal');


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
    const inputFile = document.createElement('input')
    inputFile.setAttribute('type', 'file');
    inputFile.style.display = 'none'

    btnAddPhoto.addEventListener('click', () => {
      inputFile.click();
    })
    
    
    const divImageElement = document.createElement('div');
    divImageElement.id = 'selectedFile'
    divElement.appendChild(divImageElement)
    const imageSelectedElement = document.createElement('img');
    imageSelectedElement.classList.add('image-selected-element')
    divImageElement.appendChild(imageSelectedElement);

    inputFile.addEventListener('change',() => {
      
      const selectedFile = inputFile.files[0];
      console.log(selectedFile);
      const reader = new FileReader();

      reader.onload = function (event) {
        const content = event.target.result;
        imageSelectedElement.src = content;
      };

      reader.readAsDataURL(selectedFile)

      iconImageElement.remove('i');
      divBtn.remove('div');
      paragraphElement.remove('p');
    })

    const paragraphElement = document.createElement('p');
    paragraphElement.innerText = "jpg, png : 4mo max";
    paragraphElement.classList.add('supported-format')

    const divForm = document.createElement('div');
    divForm.classList.add('positioning-form')
    const formHTML = `
    <form id="form-add-project" action="#" method="post">
                <label for="title">Titre</label>
                <input class="bloc-form" type="text" name="title-form" id="title-form">
                
                <label class="category" for="Category">Catégorie</label>
                <select class="bloc-form" id="category-api"></select>

                
                <input class="confirm" type="submit" value="Valider">
    </form>
    `
    
    const footerModal = document.querySelector('.footer_modal');
    footerModal.remove('div');

    // Pour faire appel à l'api
    fetchCategory()


    contentModal.appendChild(iconArrowElement);
    gridModal.appendChild(divElement);
    divElement.appendChild(iconImageElement)
    divElement.appendChild(divBtn);
    divBtn.appendChild(btnAddPhoto);
    divBtn.appendChild(inputFile)
    divElement.appendChild(paragraphElement)
    divForm.innerHTML = formHTML;
    modal.appendChild(divForm)

  }

  
  async function fetchCategory() {
    
    try {
      
      const category = await fetch('http://localhost:5678/api/categories');
      let data = await category.json();
      
      data.forEach(category => {

        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        
        const categoryApi = document.querySelector('#category-api');
        categoryApi.appendChild(option)
  
      })
      
    } catch {
      console.log('erreur lors de la récupération des catégories')
    }
  }
