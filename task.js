const galleryContainerRef = document.querySelector('.js-tags');

galleryContainerRef.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
    const currentActiveBtn = document.querySelector('.tags__btn--active');
    // if (carrentActiveBtn) {
    //     currentActiveBtn.classList.remove('tags__btn--active');
    // }
    carrentActiveBtn?.currentActiveBtn.classList.remove('tags__btn--active');
    const nextActiveBtn = event.target;
    nextActiveBtn.classList.add('tags__btn--active');
    selectTag = nextActiveBtn.dataset.vatue;
}