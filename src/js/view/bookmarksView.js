import View from './view';
import previewView from './previewView';
class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark found! Find a nice recipe and bookmark it :)';
  _successMessage = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new BookmarksView();
