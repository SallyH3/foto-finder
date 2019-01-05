var addToAlbumButton = document.getElementById('add-to-album');
var showButton = document.querySelector('.show-button');
var cardSection = document.querySelector('.card-section');
var input = document.querySelector('.choose-input');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

addToAlbumButton.addEventListener('click', createElement);
window.addEventListener('load', createCards);
// cardSection.addEventListener('click', deletePhoto);
// cardSection.addEventListener('keyup', saveOnReturn);

function saveNewCard() {
var titleInput = document.querySelector('#title').value;
var captionInput = document.querySelector('#caption').value;
var photoObj = new Photo(titleInput, captionInput, reader.result);
  imagesArray.push(photoObj);
  // imagesArray.push(photoObj);
  photoObj.saveToStorage(imagesArray);
  // photoObj.saveToStorage(imagesArray);
  createCards();
  showRecentCards();
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
        <img class='delete-button' src='delete.svg' onclick='deletePhoto(${photoObj.id})'>
          <button class="icon-buttons favorite-button favorite-${photoObj.favorite}"></button>
        </section>
  </section>`
  cardSection.innerHTML = card + cardSection.innerHTML;
});
}

function deletePhoto(photoId) {
  saveNewCard();
  var photo = imagesArray.find(function(photo) {
    return photo.id === photoId
  });
  var index = imagesArray.indexOf(photo);
  imagesArray.splice(index, 1);
  photo.deleteFromStorage(imagesArray);
  var deleteCard = document.getElementById(photoId.toString());
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

function removeAllCards() {
  cardSection.innerHTML = '';
}

function showRecentCards() {
  removeAllCards();
  if (imagesArray.length <= 10) {
    createCards(imagesArray);
    disableButton(showButton);
  } else {
    enableButton(showButton);
    var shownArray = imagesArray.slice(imagesArray.length - 10, imagesArray.length); 
    createCards(shownArray);
    showButton.innerText = 'Show More...';
  }
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function findIndexNumber(objId) {
  return imagesArray.findIndex(function(photo) {
  return photo.id === parseInt(objId)
  });
}

function favoriteCard() {
  var index = findIndexNumber(event.target.parentElement.parentElement.dataset.id);
  imagesArray[index].updateFavorite();
  imagesArray[index].saveToStorage(imagesArray);
  favoritesCount();
  if (imagesArray[index].favorite) {
    event.target.classList.add('favorite-true');
  } else {
    event.target.classList.remove('favorite-true');
  }
}

// function saveOnReturn(e) {
//   var cardTitle = e.target.closest('.photo-card').firstChild.nextElementSibling.innerText;
//   var cardCaption = e.target.closest('.photo-card').firstChild.nextElementSibling.nextElementSibling.innerText;
//   var cardId = parseInt(e.target.closest('.photo-card').getAttribute('id'));
//   if(e.keyCode === 13) {
//     imagesArray.forEach(function (image) {
//       if(image.id === imageId) {
//         image.updateContent(cardTitle, cardCaption, cardArray);
//       }
//     });
//   }
// }



