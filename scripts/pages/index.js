    async function getPhotographers() {
        const response = await fetch("data/photographers.json");
        const photographers = await response.json();
        
        console.log(photographers);
        return photographers;
    };

    /* Asycn Function, Here we get back all the data we have Fetch previously   **
    ** Then for Each Photographers we created a Photograph Card                 */
    async function displayData(photographers) {
        const photographSection = document.querySelector(".photographer_section");

        photographers.forEach((photograph) => {
            const modelPhotograph = photographerFactory(photograph);
            const userCard = modelPhotograph.getUserCardDOM();
            photographSection.appendChild(userCard);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
