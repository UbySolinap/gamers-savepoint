import * as model from "./model.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import addGameView from "./views/addGameView.js";
import gameLibraryView from "./views/gameLibraryView.js";
import deleteGameView from "./views/deleteGameView.js";

const controlShowResult = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();

    // For loading the game search results
    await model.loadSearch(query);

    // Pushing all the results markup to an array
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
    searchView.renderError(err.message);
  }
};

const controlShowModal = async function (id) {
  try {
    // Send to model the selected game data
    await model.loadForm(id);
    // console.log(model.state.search.form);

    // Toggle the modal
    addGameView.toggleWindow();

    // show the add game form and render game data
    addGameView.render(model.state.search.form);

    // Add items to the dropdown
    addGameView.populateDropDown(model.state.search.form);
  } catch (err) {
    console.error(err);
  }
};

const controlAddGame = async function (game) {
  try {
    // Add the game to your library
    await model.addGame(game);

    // Render a success message
    addGameView.renderSuccess();

    // Clear the existing rendered games first
    gameLibraryView.clearField();

    // Render the game
    renderGameLibrary()
  } catch (err) {
    console.error(err);
  }
};

const controlLoadGame = async function () {
  try {
    // Load existing games
    renderGameLibrary()
  } catch (err) {
    console.error(err);
  }
};

const controlDeleteGame = async function (id) {
  try {
    if (window.confirm("Do you really want to delete this game from your library?")) {
      // Delete game
      model.deleteGame(id)

      // Clear the existing rendered games first
      gameLibraryView.clearField()

      renderGameLibrary()
    } 
  } catch(err) {
    console.error(err)
  }
}

const renderGameLibrary = function() {
  model.state.games.map((game) => gameLibraryView.render(game));
}

const init = function () {
  searchView.addHandlerSearch(controlShowResult);
  addGameView.addHandlerAddForm(controlShowModal);
  addGameView.addHandlerAddGame(controlAddGame);
  gameLibraryView.addHandlerLoadGame(controlLoadGame);
  deleteGameView.addhandlerDeleteGame(controlDeleteGame)
};
init();
