import { cardPhotographer } from '../factories/photographersFactory.js';

class AllPhotographers {
  constructor() {
    this.data = [];
  }

  async getPhotographers() {
    const response = await fetch("./data/photographers.json");
    const res = await response.json();
    this.data = res.photographers;
    this.displayData();
    console.log(this.data);
  }

  displayData() {
    const photographers = this.data;
    const photographsSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
      const photographerModel = cardPhotographer(photographer);
      photographsSection.appendChild(photographerModel);
    });
  }
}

const photographers = new AllPhotographers();
photographers.getPhotographers();
  
    
  
