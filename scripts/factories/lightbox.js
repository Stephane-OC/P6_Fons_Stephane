export default {
  // Initialize lightbox
  init: function (instance) {
    this.instance = instance;
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
  },

  // Display lightbox when an media is clicked
  showLightbox: function (e) {
    const lightbox = document.getElementsByClassName("lightbox")[0];
    this.instance.indexLightbox = parseInt(e.target.dataset.index);
    this.buildLightbox();
    lightbox.classList.add("active");
  },

  // Set the source of lightbox (image or video)
  buildLightbox: function () {
    const boxImg = document.getElementById("boxImg");
    const boxVid = document.getElementById("boxVid");
    const title = document.getElementById("lightboxTitle");

    const media = this.instance.medias[this.instance.indexLightbox];

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
  },

  // Close lightbox
  closeLightbox: function () {
    const lightbox = document.getElementsByClassName("lightbox")[0];
    lightbox.classList.remove("active");
  },

  // Navigate through lightbox (previous or next media)
  navLightbox: function (nav) {
    if (nav === "prev") {
      this.instance.indexLightbox -= 1;
      if (this.instance.indexLightbox < 0) {
        this.instance.indexLightbox = this.instance.medias.length - 1;
      }
    } else {
      this.instance.indexLightbox += 1;
      if (this.instance.indexLightbox > this.instance.medias.length - 1) {
        this.instance.indexLightbox = 0;
      }
    }
    this.buildLightbox();
  },
};
