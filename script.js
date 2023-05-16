let data;

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
getWorks();

// Once the function is validated.
getWorks().then(() => {
  
    // Recovery class gallery
  const gallery = document.querySelector(".gallery");

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

  const btnTous = document.querySelector(".btn-tous");
  btnTous.addEventListener("click", () => {
    generateGallery(data);
  });

  const btnObjets = document.querySelector(".btn-objets");

  btnObjets.addEventListener('click', () => {
    const filterObject = data.filter(obj => obj.category.name === "Objets");
    console.log(filterObject);
    gallery.innerHTML = "";
    generateGallery(filterObject);
  });

    const btnAppartements = document.querySelector('.btn-appartements');

    btnAppartements.addEventListener('click', () => {
        const filterAppartements = data.filter(obj => obj.category.name === "Appartements");
        console.log(filterAppartements);
        gallery.innerHTML="";
        generateGallery(filterAppartements);
    })

    const bntHotelsEtRestaurants = document.querySelector('.btn-hotelsetrestaurants');

    bntHotelsEtRestaurants.addEventListener('click', () => {
        const filterHotelsEtRestaurants = data.filter(obj => obj.category.name === "Hotels & restaurants")
        console.log(filterHotelsEtRestaurants)
        gallery.innerHTML= "";
        generateGallery(filterHotelsEtRestaurants);

    })
  
});
