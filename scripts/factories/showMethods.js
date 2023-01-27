import lightbox from "../factories/lightbox.js";

export default {
  showData: function (instance) {
    this.showHeader(instance);
    instance.medias.forEach((media, index) => {
      this.showMedia(media, index, instance);
    });
    instance.showLikes();
  },

  showHeader: function (instance) {
    const infoHeader = document.querySelector(".photograph-header .containerInfo");
    const title = document.createElement("h1");
    title.textContent = instance.photographer.name;
    const loc = document.createElement("h3");
    loc.textContent = `${instance.photographer.city}, ${instance.photographer.country}`;
    const tagline = document.createElement("span");
    tagline.textContent = instance.photographer.tagline;
    infoHeader.appendChild(title);
    infoHeader.appendChild(loc);

    const headerImg = document.querySelector(
      ".photograph-header .containerImg"
    );

    const pic = `assets/photographers/${instance.photographer.portrait}`;
    const img = document.createElement("img");
    img.setAttribute("src", pic);
    img.setAttribute("alt", instance.photographer.name);

    headerImg.appendChild(img);
  },

  showMedia: function (media, index, instance) {
    const mediaSection = document.querySelector(".containerMedias");
    const card = document.createElement("div");
    card.classList.add("cardMedia");

    const containerImg = document.createElement("div");
    containerImg.classList.add("containerImg");
    if (media.image) {
      const mediaUrl = `assets/medias/${media.image}`;
      const mediaItem = document.createElement("img");
      mediaItem.dataset.index = index;
      mediaItem.setAttribute("tabindex", 0);

      mediaItem.addEventListener("click", (e) => {
        lightbox.showLightbox(e, instance);
      });
      mediaItem.addEventListener("focus", () => {
        mediaItem.addEventListener("keydown", (e) => {
          if (e.code == "Enter") {
            lightbox.showLightbox(e, instance);
          }
        });
      });

      mediaItem.setAttribute("src", mediaUrl);
      mediaItem.setAttribute("alt", media.title);
      containerImg.appendChild(mediaItem);
    } else {
      const mediaUrl = `assets/medias/${media.video}`;
      const mediaItem = document.createElement("video");
      mediaItem.dataset.index = index;
      mediaItem.controls = true;
      mediaItem.classList.add("media");

      mediaItem.addEventListener("click", (e) => {
        lightbox.showLightbox(e, instance);
      });

      mediaItem.setAttribute("src", mediaUrl);
      mediaItem.setAttribute("alt", media.title);
      mediaItem.setAttribute("data-index", index);
      containerImg.appendChild(mediaItem);
    }

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
        instance.likes += 1;
        like.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;
      } else {
        media.likes -= 1;
        instance.likes -= 1;
        like.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
      }
      instance.showLikes();
    });

    like.addEventListener("focus", () => {
      like.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
          like.classList.toggle("active");
          if (like.classList.contains("active")) {
            media.likes += 1;
            instance.likes += 1;
            like.innerHTML = `${media.likes} <i class="fa-solid fa-heart"></i>`;
          } else {
            media.likes -= 1;
            instance.likes -= 1;
            like.innerHTML = `${media.likes} <i class="fa-regular fa-heart"></i>`;
          }
          instance.showLikes();
        }
      });
    });

    subContain.appendChild(picTitle);
    subContain.appendChild(like);

    card.appendChild(containerImg);
    card.appendChild(subContain);

    mediaSection.appendChild(card);
  },

  showLikes: function (instance) {
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");

    const likes = document.createElement("span");
    likes.classList.add("likes");
    likes.innerHTML = `<i class="fa-solid fa-heart"></i> ${instance.likes}`;

    const priceDay = document.createElement("span");
    priceDay.classList.add("priceDay");
    priceDay.innerHTML = `<i class="fa-solid fa-dollar-sign"></i> ${instance.photographer.price}`;

    priceContainer.appendChild(likes);
    priceContainer.appendChild(priceDay);

    document.querySelector(".photograph-header").appendChild(priceContainer);
  },
 
};
