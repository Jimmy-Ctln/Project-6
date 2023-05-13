const gallery = document.querySelector('.gallery');

async function getWorks() {
    
    try {
        const fetchWorks = await fetch('http://localhost:5678/api/works');
        const data  = await fetchWorks.json();

        console.log(data);
    
    } catch(error) {
        console.error("Une erreur s'est produite")
    }
}
getWorks();