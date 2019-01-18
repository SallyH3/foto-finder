// GLOBAL VARIABLES

var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumButton = document.getElementById('add-to-album');
var cardSection = document.querySelector('.card-section');
var input = document.querySelector('.choose-input');
var reader = new FileReader();
var showButton = document.querySelector('.show-button');
var searchInput = document.querySelector('.search-input');

// EVENT LISTENERS

showButton.addEventListener('click', showLess);
searchInput.addEventListener('input', liveSearchFilter);
addToAlbumButton.addEventListener('click', createElement);
window.addEventListener('load', loadPage(imagesArray));
window.addEventListener('input', enableDisableAddToAlbum);
cardSection.addEventListener('keyup', saveOnReturn);
cardSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    deletePhoto(event.target);
  } else if (event.target.classList.contains('favorite-button')) {
    persistFavorite();
  }
});

//FUNCTIONS

function loadPage(array) {
  imagesArray = [];
  array.forEach((image) => {
    const photoObj = new Photo(image.title, image.caption, image.file, image.favorite, image.id);
    imagesArray.push(photoObj)
  });
  createCards(imagesArray);
  displayNoneOnCardSection();
}

function saveNewCard() {
const titleInput = document.querySelector('#title').value;
const captionInput = document.querySelector('#caption').value;
const photoObj = new Photo(titleInput, captionInput, reader.result);
  imagesArray.push(photoObj);
  photoObj.saveToStorage(imagesArray);
  createCards(imagesArray);
  displayNoneOnCardSection();
}

function enableDisableAddToAlbum() {
  const titleInput = parseInt(document.querySelector('#title'));
  const captionInput = parseInt(document.querySelector('#caption'));
  if((titleInput.value != '' || captionInput.value != '') && input.files.length >= 1) {
    addToAlbumButton.disabled = false;
  }
}

function createCards(arr) {
  removeAllCards();
  arr.forEach((photoObj, i) => {
  const newPhotoObj = new Photo (photoObj.title, photoObj.caption, photoObj.file, photoObj.favorite, photoObj.id);
    const card =
  `<section class="photo-card" data-id=${photoObj.id}>
  <p contenteditable = true class = "title">${photoObj.title}</p>
  <label class="photo-label" for="change-photo${i}">
          <img class="photo" src="${photoObj.file}" alt="user uploaded photo">
        </label>
        <input class="choose-input photoObj-photo" type="file" accept="image/*" name="change-photo" id="change-photo${i}">
        <p contenteditable = true = class = "text caption">${photoObj.caption}</p>
        <section class="card-footer">
          <button class="icon-buttons delete-button"></button>
          <button class="icon-buttons favorite-button favorite-${photoObj.favorite}"></button>
        </section>
  </section>`
  cardSection.innerHTML = card + cardSection.innerHTML;
});
}

function persistFavorite() {
  const photoId = parseInt(event.target.closest('.photo-card').dataset.id);
  imagesArray.forEach((photo) => {
    switch(true) {
      case photo.id === photoId :
      photo.favorite = !photo.favorite;
      photo.updatePhoto(photo.title, photo.caption, photo.favorite);
      photo.saveToStorage(imagesArray);
      event.target.classList.replace(`favorite-${!photo.favorite}`, `favorite-${photo.favorite}`);
      break;
    }
  });
}

function displayNoneOnCardSection() {
  const cardPlaceholder = document.querySelector('.card-placeholder');
  switch (true) {
    case imagesArray.length >= 1 :
    cardPlaceholder.classList.add('hide-placeholder');
    break;
    default :
    cardPlaceholder.classList.remove('hide-placeholder');
  }
}

function deletePhoto(target) {
  $(document).ready(() => {
  const cardId = target.parentElement.parentElement.dataset.id;
  const card = imagesArray.find((card) => {
    return parseInt(cardId) === card.id
  });
  const photoObj = new Photo(card.title, card.caption, reader.result);
  const index = imagesArray.indexOf(card);
  imagesArray.splice(index, 1);
  photoObj.deleteFromStorage(imagesArray);
  $(target).closest('.photo-card').remove();
  displayNoneOnCardSection();
  });
}

function createElement(e) {
  e.preventDefault();
  switch (input.files[0]) {
    case input.files[0] :
    reader.readAsDataURL(input.files[0]);
    reader.onload = saveNewCard;
    break;
  }
}

function saveOnReturn(event) {
  $(document).ready(() => {
    const cardId = parseInt(event.target.closest('.photo-card').getAttribute('data-id'));
    const card = imagesArray.find((card) => {
    return cardId === card.id
  });
    const cardTitle = $('.photo-card').find('.title').first().text();
    const cardCaption = $('.photo-card').find('.caption').first().text();
    card.updatePhoto(cardTitle, cardCaption, card.favorite);
  switch (event.keycode === 13) {
    case event.keyCode === 13 :
    card.saveToStorage(imagesArray);
    break;
  }
  });
}

function removeAllCards() {
  cardSection.innerHTML = '';
}

function liveSearchFilter() {
  removeAllCards();
  const searchCurrentText = searchInput.value;
  const filteredCards = imagesArray.filter((photo) => {
    return photo.title.toLowerCase().includes(searchCurrentText.toLowerCase()) || photo.caption.toLowerCase().includes(searchCurrentText.toLowerCase());
  });
  createCards(filteredCards);
}

function showLess() {
  const slicedCards = imagesArray.slice(-10);
  imagesArray.forEach((photo) => {
    createCards(slicedCards);
  if(showButton.innertext === 'Show Less' && imagesArray.length > 10) {
   return slicedCards;
  }
  });
}