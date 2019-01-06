class Photo {
  constructor(title, caption, file, favorite, id) {
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite || false;
    this.id = id || Date.now();
  }

  saveToStorage(array) {
    localStorage.setItem('photos', JSON.stringify(array));
  }
  
 deleteFromStorage(imagesArray) {
    localStorage.setItem('photos', JSON.stringify(imagesArray));
  }

 updatePhoto(title, caption) {
    this.title = title;
    this.caption = caption;
  }
}