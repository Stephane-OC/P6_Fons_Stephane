/*  showMethods module that make functions displayed data of a specific photographer   **
**  Functions use the DOM API to create and append elements                            **
**  Instance parameter passed functions refers to OnePhotographer class                */

export default {
    showData: function(instance) {
        this.showHeader(instance);
        instance.medias.forEach((media, index) => {
          this.showMedia(media, index, instance);
        });
    },
    
    showHeader: function(instance) {
        
        const infoHeader = document.querySelector('.photograph-header .containerInfo');
        const title = document.createElement('h1');
        title.textContent = instance.photographer.name;
        const loc = document.createElement('h3');
        loc.textContent = `${instance.photographer.city}, ${instance.photographer.country}`;
        const tagline = document.createElement('span');
        tagline.textContent = instance.photographer.tagline;
        infoHeader.appendChild(title);
        infoHeader.appendChild(loc);
    
        const headerImg = document.querySelector('.photograph-header .containerImg',);
    
        const pic = `assets/photographers/${instance.photographer.portrait}`;
        const img = document.createElement('img');
        img.setAttribute('src', pic);
        img.setAttribute('alt', instance.photographer.name);
    
        headerImg.appendChild(img);
    },
    
    showMedia: function(media, index, instance) {

        const mediaSection = document.querySelector('.containerMedias');
        const card = document.createElement('div');
        card.classList.add('cardMedia');
        
        const containerImg = document.createElement('div');
        containerImg.classList.add('containerImg');
        if (media.image) {
          const mediaUrl = `assets/medias/${media.image}`;
          const mediaItem = document.createElement('img');
          mediaItem.dataset.index = index;
          mediaItem.setAttribute('tabindex', 0);
          
  
          mediaItem.setAttribute('src', mediaUrl);
          mediaItem.setAttribute('alt', media.title);
          containerImg.appendChild(mediaItem);
        } 
        else {
          const mediaUrl = `assets/medias/${media.video}`;
          const mediaItem = document.createElement('video');
          mediaItem.dataset.index = index;
          
          mediaItem.setAttribute('src', mediaUrl);
          mediaItem.setAttribute('alt', media.title);
          containerImg.appendChild(mediaItem);
        }
        
        const subContain = document.createElement('div');
        subContain.classList.add('subContain');
        
        const picTitle = document.createElement('h3');
        picTitle.textContent= media.title;
    
        subContain.appendChild(picTitle);
    
        card.appendChild(containerImg);
        card.appendChild(subContain);
    
        mediaSection.appendChild(card);
    }
}