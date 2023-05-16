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
