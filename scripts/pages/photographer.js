import formularSecur from "../utils/formularSecur.js";

class OnePhotographer {
  //here is constructor of my class
  constructor() {
    this.photographer = null;
    this.likes = 0;
    this.medias = [];
    this.lightbox = this
    this.indexLightbox = 0;
    getPhotographer();
    this.eInit();
  }

  eInit() {
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      formularSecur.checkForm(this);
      document.getElementById("contactForm").reset();
    });

    document.getElementById("filtre").addEventListener("change", (e) => {
      this.sortBy(e.target.value);
    });
  
    document.getElementById("filtre").addEventListener("click", (e) => {
      this.sortBy(e.target.value);
    });
  
    document.getElementById("closeLightbox").addEventListener("click", () => {
      this.closeLightbox();
    });
    document.getElementById("prevBox").addEventListener("click", () => {
      this.navLightbox("prev");
    });
    document.getElementById("nextBox").addEventListener("click", () => {
      this.navLightbox("next");
    });
    document.addEventListener("keydown", (event) => {
      if (event.code == "ArrowLeft") {
        this.navLightbox("prev");
      } else if (event.code == "ArrowRight") {
        this.navLightbox("next");
      } else if (event.code == "Escape") {
        this.closeLightbox();
      }
    });
  }


  // Display lightbox when an media is clicked
  showLightbox(e) {
    const lightbox = document.getElementsByClassName("lightbox")[0];
    this.indexLightbox = parseInt(e.target.dataset.index);
    this.buildLightbox();
    lightbox.classList.add("active");
  }

  // Set the source of lightbox (image or video)
  buildLightbox() {
    const boxImg = document.getElementById("boxImg");
    const boxVid = document.getElementById("boxVid");
    const title = document.getElementById("lightboxTitle");

    const media = this.medias[this.indexLightbox];

    title.innerHTML = media.title;
    if (media.image) {
      const urlMedia = `assets/medias/${media.image}`;
      boxImg.setAttribute("src", urlMedia);
      boxImg.setAttribute("alt", media.title);

      boxVid.classList.remove("active");
      boxImg.classList.add("active");
    } else {
      const urlMedia = `assets/medias/${media.video}`;
      boxVid.setAttribute("src", urlMedia);
      boxVid.setAttribute("alt", media.title);

      boxImg.classList.remove("active");
      boxVid.classList.add("active");
    }
  }

  // Close lightbox
  closeLightbox() {
    const lightbox = document.getElementsByClassName("lightbox")[0];
    lightbox.classList.remove("active");
  }

  // Navigate through lightbox (previous or next media)
  navLightbox (nav) {
    if (nav === "prev") {
      this.indexLightbox -= 1;
      if (this.indexLightbox < 0) {
        this.indexLightbox = this.medias.length - 1;
      }
    } else {
      this.indexLightbox += 1;
      if (this.indexLightbox > this.medias.length - 1) {
        this.indexLightbox = 0;
      }
    }
    this.buildLightbox();
  }

  sortOrder = function (settings) {
    return function (x, y) {
      if (x[settings] < y[settings]) {
        return -1;
      }
      if (x[settings] > y[settings]) {
        return 1;
      }
      return 0;
    };
  };
  sortBy = function (param) {
    if (param === "popular") {
      this.medias = this.medias.sort(this.sortOrder(param));
    } else {
      this.medias = this.medias.sort(this.sortOrder(param)).reverse();
    }
    document.querySelector(".containerMedias").innerHTML = "";
    this.medias.forEach((media, index) => {
      this.showMedia(media, index);
    });
  };

}

// Function to return ID contain in URL
function idUrlCatch() {
  const str = window.location.href;
  const url = new URL(str);
  if (url.searchParams.get("id")) {
    const id = url.searchParams.get("id");
    return id;
  }
}

const getPhotographer = async function getPhotographer() {
  const response = await fetch("./data/photographers.json");
  const res = await response.json();
  const id = idUrlCatch();
  res.photographers.forEach((photographerData) => {
    if (photographerData.id == id) {
      photographer.photographer = photographerData;
      res.media.forEach((media) => {
        if (media.photographerId == photographer.photographer.id) {
          photographer.medias.push(media);
          photographer.likes += media.likes;
        }
      });
      photographer.medias = photographer.medias.sort(photographer.sortOrder("popular"));
     
    }
  });
  photographer.showData();
};

const photographer = new OnePhotographer();

photographer.showData = function () {
  this.showHeader();
  this.medias.forEach((media, index) => {
    this.showMedia(media, index);
  });
  this.showLikes();
};

photographer.showHeader = function () {
  const infoHeader = document.querySelector(".photograph-header .containerInfo");
  const title = document.createElement("h1");
  title.textContent = this.photographer.name;
  const loc = document.createElement("h3");
  loc.textContent = `${this.photographer.city}, ${this.photographer.country}`;
  const tagline = document.createElement("span");
  tagline.textContent = this.photographer.tagline;
  infoHeader.appendChild(title);
  infoHeader.appendChild(loc);

  const headerImg = document.querySelector(".photograph-header .containerImg");
  const pic = `assets/photographers/${this.photographer.portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", pic);
  img.setAttribute("alt", this.photographer.name);

  headerImg.appendChild(img);
};

photographer.showMedia = function (media, index) {
  const mediaSection = document.querySelector(".containerMedias");
  const card = document.createElement("div");
  card.classList.add("cardMedia");

  const containerImg = document.createElement("div");
  containerImg.classList.add("containerImg");

  const mediaItem = document.createElement(media.image ? "img" : "video");
  mediaItem.dataset.index = index;
  mediaItem.classList.add("media");
  mediaItem.setAttribute("tabindex", 0);
  mediaItem.setAttribute("alt", media.title);

  if (media.image) {
    mediaItem.setAttribute("src", `assets/medias/${media.image}`);
    mediaItem.addEventListener("click", (e) => {
      photographer.lightbox.showLightbox(e);
    });
    mediaItem.addEventListener("focus", () => {
      mediaItem.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
          photographer.lightbox.showLightbox(e);
        }
      });
    });
  } else {
    mediaItem.controls = true;
    mediaItem.setAttribute("src", `assets/medias/${media.video}`);
    mediaItem.addEventListener("click", (e) => {
      photographer.lightbox.showLightbox(e);
    });
  }

  containerImg.appendChild(mediaItem);

  const subContain = document.createElement("div");
  subContain.classList.add("subContain");

  const picTitle = document.createElement("h3");
  picTitle.textContent = media.title;

  const like = document.createElement("span");

  like.setAttribute("tabindex", 0);
  like.classList.add("like");
  like.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
  like.addEventListener("click", () => {
    like.classList.toggle("active");
    if (like.classList.contains("active")) {
      media.likes += 1;
      this.likes += 1;
      like.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;
    } else {
      media.likes -= 1;
      this.likes -= 1;
      like.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
    }
    this.showLikes();
  });

  like.addEventListener("focus", () => {
    like.addEventListener("keydown", (event) => {
      if (event.code == "Enter") {
        like.classList.toggle("active");
        if (like.classList.contains("active")) {
          media.likes += 1;
          this.likes += 1;
          like.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;
        } else {
          media.likes -= 1;
          this.likes -= 1;
          like.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
        }
        this.showLikes();
      }
    });
  });

  subContain.appendChild(picTitle);
  subContain.appendChild(like);

  card.appendChild(containerImg);
  card.appendChild(subContain);

  mediaSection.appendChild(card);
};

photographer.showLikes = function () {
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("priceContainer");

  const likes = document.createElement("span");
  likes.classList.add("likes");
  likes.innerHTML = `<i class="fa-solid fa-heart"></i> ${this.likes}`;

  const priceDay = document.createElement("span");
  priceDay.classList.add("priceDay");
  priceDay.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${this.photographer.price}`;

  priceContainer.appendChild(likes);
  priceContainer.appendChild(priceDay);

  document.querySelector(".photograph-header").appendChild(priceContainer);
};


