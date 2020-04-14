import './styles.css';
import refs from './js/refs.js';
import apiService from './js/services/apiService';
import imageTemplate from './templates/imageTemplate.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.form.addEventListener('keydown', handlerInput);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', handlerClickImage);

function handlerInput(e) {
  if (e.keyCode === 13) {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.query;

    clearListImages();

    apiService.resetPage();
    apiService.searchQuery = input.value;
    apiService.fetchImage().then(insertListImages);
    input.value = '';
  }
}

function handlerClickImage(e) {
  if (e.target.nodeName === 'IMG') {
    const largeImageURL = e.target.dataset.action;
    basicLightbox
      .create(
        `
    <img src="${largeImageURL}" width="1200" height="960">`,
      )
      .show();
  }
}

function loadMoreBtnHandler(e) {
  apiService
    .fetchImage()
    .then(insertListImages)
    .finally(() => scroll());
}

function insertListImages(images) {
  const markup = imageTemplate(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListImages() {
  refs.gallery.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
}
