const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainerRef = document.querySelector('.js-gallery');
const lightboxDivRef = document.querySelector('.lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const closeButtonRef = document.querySelector('[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

function createGalleryMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
      <a
        class="gallery__link"
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`
  }).join('');
};

function addMarkupGallery() {
  const markupGallery = createGalleryMarkup(galleryItems);
  galleryContainerRef.insertAdjacentHTML('afterbegin', markupGallery);
};

addMarkupGallery();

galleryContainerRef.addEventListener('click', onGalleryContainerClick);
closeButtonRef.addEventListener('click', onCloseModal);
overlayRef.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onKeyboard);

let currentImgUrl;
let currentImgIndex;

function onGalleryContainerClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return
  };

  event.stopPropagation();
  currentImgUrl = event.target.dataset.source;

  for (let i = 0; i < galleryItems.length; i += 1) {
    if (galleryItems[i].original === currentImgUrl) {
      currentImgIndex = i;
    }
  }

  showlightbox()
};

function showlightbox() {
  lightboxDivRef.classList.add('is-open');
  lightboxImgRef.src = currentImgUrl;
}

function onCloseModal() {
  lightboxDivRef.classList.remove('is-open');
  currentImgUrl = '';
  lightboxImgRef.src = currentImgUrl;
};

function onKeyboard(event) {
  if (event.key === "Escape") {
    onCloseModal();
  } else if (event.code === 'ArrowRight') {
    showNextImg()
  } else if (event.code === 'ArrowLeft') {
    showPreviousImg()
  }
};

function showNextImg() {
  if (currentImgIndex + 1 < galleryItems.length) {
    lightboxImgRef.src = galleryItems[currentImgIndex + 1].original;
    currentImgIndex += 1;
  }
}

function showPreviousImg() {
  if (currentImgIndex - 1 >= 0) {
    lightboxImgRef.src = galleryItems[currentImgIndex - 1].original;
    currentImgIndex -= 1;
  }
}