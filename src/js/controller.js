import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchResultView from './view/searchResultView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import recipeFormView from './view/recipeFormView.js';
// if (module.hot) {
//   module.hot.accept();
// }
const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    searchResultView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchRes = async function () {
  try {
    searchResultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearch(query);
    // searchResultView.render(model.state.search.results);
    searchResultView.render(model.getSearchResultPage(1));
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (goToPage) {
  model.state.search.page = goToPage;
  searchResultView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.state.recipe.bookmarked;
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    recipeFormView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    recipeFormView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      recipeFormView.toggleWindow();
    }, 2.5 * 1000);
  } catch (error) {
    console.log(error);
    recipeFormView.renderError(error.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controllSearchRes);
  paginationView.addHandlerClick(controlPagination);
  recipeFormView.addHandlerUploadForm(controllAddRecipe);
};
init();
