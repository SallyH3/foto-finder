// GLOBAL VARIABLES

var localPhotos = [];
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumButton = document.getElementById('add-to-album');
var cardSection = document.querySelector('.card-section');
var input = document.querySelector('.choose-input');
var reader = new FileReader();
// var showButton = document.querySelector('.show-button');
// var searchInput = document.querySelector('.search-input');
// var viewFavoritesButton = document.getElementById('js-view-favorites');
// var favoritesCounterButton = document.querySelector('.js-favorite-counter');

// EVENT LISTENERS

// searchInput.addEventListener('input', liveSearchFilter);
addToAlbumButton.addEventListener('click', createElement);
window.addEventListener('load', createCards);
window.addEventListener('load', displayNoneOnCardSection);
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

function saveNewCard() {
var titleInput = document.querySelector('#title').value;
var captionInput = document.querySelector('#caption').value;
var photoObj = new Photo(titleInput, captionInput, reader.result);
  localPhotos.push(photoObj);
  photoObj.saveToStorage(localPhotos);
  createCards();
}

function enableDisableAddToAlbum() {
  var titleInput = parseInt(document.querySelector('#title'));
  var captionInput = parseInt(document.querySelector('#caption'));
  if((titleInput.value != '' || captionInput.value != '') && input.files.length >= 1) {
    addToAlbumButton.disabled = false;
  }
}

function createCards() {
  // var array = JSON.parse(localStorage.getItem('photos'));
  imagesArray.forEach(function(photoObj, i) {
  var newPhotoObj = new Photo (photoObj.title, photoObj.caption, photoObj.file, photoObj.favorite, photoObj.id);
  localPhotos.push(newPhotoObj);
    var card =
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
  var photoId = parseInt(event.target.closest('.photo-card').dataset.id);
  localPhotos.forEach(function(photo){
    if(photo.id === photoId) {
      photo.favorite = !photo.favorite;
      photo.updatePhoto(photo.title, photo.caption, photo.favorite);
      photo.saveToStorage(localPhotos);
      event.target.classList.replace(`favorite-${!photo.favorite}`, `favorite-${photo.favorite}`);
    }
  })
}

function displayNoneOnCardSection() {
  var cardPlaceholder = document.querySelector('.card-placeholder');
  if(input.files.length >= 1) {
    cardPlaceholder.style.innerText = 'none';
  }
}

function deletePhoto(target) {
  var cardId = target.parentElement.parentElement.dataset.id;
  var card = imagesArray.find(function(card) {
    return parseInt(cardId) === card.id
  });
  var photoObj = new Photo(card.title, card.caption, reader.result);
  var index = imagesArray.indexOf(card);
  imagesArray.splice(index, 1);
  photoObj.deleteFromStorage(imagesArray);
  var deleteCard = document.getElementById(cardId);
  target.closest('.photo-card').remove();
}


function createElement(e) {
  e.preventDefault();
  // console.log(input.files[0])
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = saveNewCard;
  }
}

function saveOnReturn(e) {
  var cardId = parseInt(e.target.closest('.photo-card').getAttribute('data-id'));
  var card = localPhotos.find(function(card, index) {
    return cardId === card.id
  });
  var index = imagesArray.indexOf(card);
  var cardTitle = e.target.closest('.photo-card').firstChild.nextElementSibling.innerText;
  var cardCaption = e.target.closest('.photo-card').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
  card.updatePhoto(cardTitle, cardCaption, card.favorite);
  var newPhotosArray = localPhotos.splice(index, 1, card);
  if(e.keyCode === 13) {
    localPhotos = newPhotosArray;
    card.saveToStorage(newPhotosArray);
  }
}

// function appendPhotos() {
//   console.log(imagesArray)
//   imagesArray.forEach(function (photo) {
//     cardSection.innerHTML += `<img src=${photo.file} />`
//   })
// }

// function addPhoto(e) {
//   // console.log(e.target.result);
//   var newPhoto = new Photo('mock-title', 'mock-caption', e.target.result);
//   cardSection.innerHTML += `<img src=${e.target.result} />`;
//   imagesArray.push(newPhoto)
//   newPhoto.saveToStorage(imagesArray)
// }



// function removeAllCards() {
//   cardSection.innerHTML = '';
// }

// function liveSearchFilter() {
//   removeAllCards();
//   var searchCurrentText = searchInput.value;
//   var filteredCards = imagesArray.filter(function (photo) {
//     return photo.title.includes(searchCurrentText) || photo.caption.includes(searchCurrentText)
//   });
//   filteredCards.forEach(function(photo) {
//     createCards(photo);
//   });
// }
