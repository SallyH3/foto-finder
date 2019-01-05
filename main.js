var photosArray = [];
var addToAlbumButton = document.getElementById('add-to-album');
var cardSection = document.querySelector('.card-section');
var input = document.querySelector('.choose-input');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

addToAlbumButton.addEventListener('click', createElement);
// window.addEventListener('load', persistCardsOnPageLoad);

window.addEventListener('load', createCards);
// addToAlbumButton.addEventListener('click', createElement);

function saveNewCard(event) {
event.preventDefault();
var titleInput = document.querySelector('#title').value;
var captionInput = document.querySelector('#caption').value;
console.log(captionInput)
var photoObj = new Photo(titleInput, captionInput, reader.result);
  imagesArr.push(photoObj);
  // photosArray.push(photoObj);
  photoObj.saveToStorage(imagesArr);
  // photoObj.saveToStorage(photosArray);
  createCards();
}

function createCards() {
  var array = JSON.parse(localStorage.getItem('photos'));
  array.forEach(function(photoObj, i) {
    console.log(photoObj) 
    var card =
  `<section class="photo-card" data-id=${photoObj.id}>
  <p class = "title">${photoObj.title}</p>
  <label class="photo-label" for="change-photo${i}">
          <img class="photo" src="${photoObj.file}" alt="user uploaded photo">
        </label>
        <input class="choose-input photoObj-photo" type="file" accept="image/*" name="change-photo" id="change-photo${i}">
        <p class="text caption">${photoObj.caption}</p>
        <section class="photoObj-footer">
          <button class="icon-buttons delete-button"></button>
          <button class="icon-buttons favorite-button favorite-${photoObj.favorite}"></button>
        </section>
  </section>`
  cardSection.innerHTML = card + cardSection.innerHTML;
});
}

// code below is from Travis, instructor

function appendPhotos() {
  console.log(imagesArr)
  imagesArr.forEach(function (photo) {
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
  imagesArr.push(newPhoto)
  newPhoto.saveToStorage(imagesArr)
  // add persistCardsOnPageLoad invoking here
}

