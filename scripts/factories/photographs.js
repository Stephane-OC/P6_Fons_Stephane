export default class AllPhotographers {
  // constructor to initialize data array and call getPhotographers method
  constructor() {
    this.data = [];
    this.getPhotographers();
  }

  // async method to fetch photographs data from json file
  async getPhotographers() {
    const response = await fetch("./data/photographers.json");
    const res = await response.json();
    this.data = res.photographers;
    this.displayData();
    console.log(this.data);
  }

  // method to display fetched data in HTML
  displayData() {
    const photographers = this.data;
    const photographsSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
      const photographerModel = this.cardPhotographer(photographer);
      photographsSection.appendChild(photographerModel);
    });
  }

  /* cardPhotographer function creates an HTML template for a photographer card **
   * It takes in an object 'data' with properties for card                       **
   * Function creates HTML elements, sets their attributes and content,          **
   * and appends them to parent element 'article'                                **
   * Completed 'article' element is returned as result of Function               */

  cardPhotographer(data) {
    const { portrait, name, country, city, tagline, price, id } = data;

    const article = document.createElement("article");

    const linkP = document.createElement("a");
    linkP.href = `photographer.html?id=${id}`;

    const pic = `assets/photographers/${portrait}`;
    const imgContain = document.createElement("div");
    imgContain.classList.add("containerImg");
    const img = document.createElement("img");
    img.classList.add("cover");
    img.setAttribute("src", pic);
    img.setAttribute("alt", name);
    //regarder si je le garde///////////
    img.classList.add("cover");
    imgContain.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    linkP.appendChild(imgContain);
    linkP.appendChild(h2);

    const loc = document.createElement("h3");
    loc.textContent = `${city}, ${country}`;

    const taglineItem = document.createElement("h4");
    taglineItem.textContent = tagline;

    const priceElement = document.createElement("span");
    priceElement.textContent = `${price}€/jours`;

    article.appendChild(linkP);
    article.appendChild(loc);
    article.appendChild(taglineItem);
    article.appendChild(priceElement);
    return article;
  }
}
