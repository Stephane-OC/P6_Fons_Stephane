
export default class AllPhotographers {

    constructor() {
      this.data = [];
      this.getPhotographers();
    }
  

    async getPhotographers() {
      const response = await fetch('./data/photographers.json');
      const res = await response.json();
      this.data = res.photographers;
      this.displayData();
      console.log(this.data);
    }
  

    displayData() {
      const photographers = this.data;
      const photographsSection = document.querySelector('.photographer_section');
  
      photographers.forEach((photographer) => {
        const photographerModel = this.cardPhotographer(photographer);
        photographsSection.appendChild(photographerModel);
      });
    }
  
    cardPhotographer(data) {
      const {portrait, name, country, city, tagline, price, id} = data;
  
      const article = document.createElement('article');
  
      const linkP = document.createElement('a');
      linkP.href = `photographer.html?id=${id}`;
  
      const pic = `assets/photographers/${portrait}`;
      const imgContain = document.createElement('div');
      imgContain.classList.add('containerImg');
      const img = document.createElement('img');
      img.setAttribute('src', pic);
      img.setAttribute('alt', name);
      imgContain.appendChild(img);
  
      const h2 = document.createElement('h2');
      h2.textContent = name;
  
      linkP.appendChild(imgContain);
      linkP.appendChild(h2);
  
      const loc = document.createElement('h3');
      loc.textContent = `${city}, ${country}`;
  
      const taglineItem = document.createElement('h4');
      taglineItem.textContent = tagline;
  
      const priceElement = document.createElement('span');
      priceElement.textContent = `${price}€/jours`;
  
      article.appendChild(linkP);
      article.appendChild(loc);
      article.appendChild(taglineItem);
      article.appendChild(priceElement);
      return (article);
    }
  }