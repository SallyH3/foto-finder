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
    // var arrayJSON = JSON.stringify(array);
    // localStorage.setItem('array', arrayJSON);
  }

  deleteFromStorage(){

  }

  updatePhoto() {

  }
}