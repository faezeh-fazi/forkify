import View from './view';
import icons from '../../img/icons.svg';

class RecipeFormView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successMessage = 'Recipe was successfully uploaded!'

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowForm() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideForm() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUploadForm(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)]
      const data = Object.fromEntries(dataArray)
      handler(data)
    });
  }

  _generateMarkup() {}
}

export default new RecipeFormView();
