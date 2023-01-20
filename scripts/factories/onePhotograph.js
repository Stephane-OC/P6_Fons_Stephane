import showMethods from "../factories/showMethods.js";
import formularSecur from "../factories/formularSecur.js";

/*  onePhotographer class uses instantiation to create an object who is a photographer    **
 **  Constructor Function called when a new instance of class is created                   **
 **  and init properties of object, "This" Keyword refer to current instance of class      */
export default class OnePhotographer {
  //here is constructor of my class
  constructor() {
    this.photographer = null;
    this.medias = [];
    this.likes = 0;
    this.getPhotographer();
    this.eInit();
  }

  eInit() {
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      formularSecur.checkForm(this);
    });
  }

  /* Function fetch one photographer with his id                           **
   ** Fetches data from file './data/photographers.json'                    **
   ** Parses data and loops through photographers array                     **
   ** If ID of photographer matches id passed in url,                       **
   ** Photographer's details and medias are stored in respective variables  */

  async getPhotographer() {
    const response = await fetch("./data/photographers.json");
    const res = await response.json();
    const id = this.idUrlCatch();
    res.photographers.forEach((photographer) => {
      if (photographer.id == id) {
        this.photographer = photographer;
        res.media.forEach((media) => {
          if (media.photographerId == this.photographer.id) {
            this.medias.push(media);
            this.likes += media.likes;
          }
        });
      }
    });
    showMethods.showData(this);
    showMethods.showLikes(this);
  }

  //Function to return ID contain in URL
  idUrlCatch() {
    const str = window.location.href;
    const url = new URL(str);
    if (url.searchParams.get("id")) {
      const id = url.searchParams.get("id");
      return id;
    }
  }

  //showData function from showMethods passes current instance of class as parameter
  showData() {
    showMethods.showData(this);
    showMethods.showLikes(this);
  }
  //showHeader function from showMethods passes current instance of class as parameter
  showHeader() {
    showMethods.showHeader(this);
  }
  /*  showMedia function from showMethods passes media,       **
   **  Index and current instance of class as parameters for   **
   **  Media object to be displayed                            **
   **  Index of media object in medias array                   */
  showMedia(media, index) {
    showMethods.showMedia(media, index, this);
  }
  //showLikes function from showMethods passes instance of class as parameter
  showLikes() {
    showMethods.showLikes(this);
  }
}
