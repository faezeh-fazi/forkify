import previewView from './previewView';
import View from './view';

class SearchResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found!';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new SearchResultView();
