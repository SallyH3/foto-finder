var addToAlbumButton = document.getElementById('add-to-album');
var showButton = document.querySelector('.show-button');
var cardSection = document.querySelector('.card-section');
var input = document.querySelector('.choose-input');
var faveCounter = 0;
var viewFavoritesButton = document.getElementById('js-view-favorites');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

addToAlbumButton.addEventListener('click', createElement);
window.addEventListener('load', createCards);

cardSection.addEventListener('keyup', saveOnReturn);
cardSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    deletePhoto(event);
  } 
});


function saveNewCard() {
var titleInput = document.querySelector('#title').value;
var captionInput = document.querySelector('#caption').value;
var photoObj = new Photo(titleInput, captionInput, reader.result);
  imagesArray.push(photoObj);
  // imagesArray.push(photoObj);
  photoObj.saveToStorage(imagesArray);
  // photoObj.saveToStorage(imagesArray);
  createCards();
}

function createCards() {
  var array = JSON.parse(localStorage.getItem('photos'));
  imagesArray.forEach(function(photoObj, i) { 
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
  cardSection.insertAdjacentHTML('afterbegin', card);
});
}

function deletePhoto(cardId) {
  var card = imagesArray.find(function(card) {
    return card.id === cardId
  });
  var index = imagesArray.indexOf(card);
  imagesArray.splice(index, 1);
  card.deleteFromStorage(imagesArray);
  var deleteCard = document.getElementById(cardId.toString());
  deleteCard.closest('.photo-card').remove();
}

function appendPhotos() {
  console.log(imagesArray)
  imagesArray.forEach(function (photo) {
    cardSection.innerHTML += `<img src=${photo.file} />`
  })
}

function createElement(e) {
  e.preventDefault();
  // console.log(input.files[0])
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = saveNewCard;
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo('mock-title', 'mock-caption', e.target.result);
  cardSection.innerHTML += `<img src=${e.target.result} />`;
  imagesArray.push(newPhoto)
  newPhoto.saveToStorage(imagesArray)
}

function saveOnReturn(e) {
  var cardTitle = e.target.closest('.photo-card').firstChild.nextElementSibling.innerText;
  var cardCaption = e.target.closest('.photo-card').firstChild.nextElementSibling.nextElementSibling.innerText;
  var cardId = parseInt(e.target.closest('.photo-card').getAttribute('id'));
  if(e.keyCode === 13) {
    imagesArray.forEach(function (photo) {
      if(photo.id === photoId) {
        photo.updatePhoto(cardTitle, cardCaption, imagesArray);
      }
    });
  }
}



