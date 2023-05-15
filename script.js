// create a fetch function for works

async function getWorks() {
    
    try {
        
        // Recovery of the api
        const fetchWorks = await fetch('http://localhost:5678/api/works');
        const data = await fetchWorks.json();
        
        // Recovery class gallery
        const gallery = document.querySelector('.gallery');

        // Browse the table data
        for(let i = 0; i < data.length; i++) {

            const works = data[i];
            
            // Creation of figure
            const figureElement = document.createElement('figure');
            
            // Creation of img
            const imageElement = document.createElement("img");
            imageElement.src = works.imageUrl;
    
            // Creation of title
            const titleElement = document.createElement('figcaption')
            titleElement.innerText = works.title;

            // To display the elements
            gallery.appendChild(figureElement)
            figureElement.appendChild(imageElement)
            figureElement.appendChild(titleElement)
        }
    
    } catch(error) {
        console.error("Une erreur s'est produite")
    }
    
}
getWorks();