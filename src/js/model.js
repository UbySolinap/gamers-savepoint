import {
  URL,
  API_KEY,
  GAME_DESCRIPTION_LIMIT,
  MONTH_NAME,
  OBJ_KEYS,
  NO_IMAGE,
} from "./configuration.js";

export const state = {
  games: [],
  search: {
    results: [],
    form: [],
  },
};

export const loadSearch = async function (query) {
  try {
    // For loading the game search results
    const res = await fetch(`${URL}?key=${API_KEY}&search=${query}`);
    const data = await res.json();
    // console.log(data);
    if (data.count === 0)
      throw new Error(
        "There is no existing game with that name. Please input a valid game."
      );

    // Adding the search results to the state
    state.search.results = data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released ? game.released.split("-")[0] : "-",
        platforms: game.platforms
          ? [game.platforms.map((pf) => pf.platform.name)]
          : "-",
        background_image: game.background_image
          ? game.background_image
          : NO_IMAGE,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

export const loadForm = async function (id) {
  try {
    const res = await fetch(`${URL}/${id}?key=${API_KEY}`);
    if (!res.ok)
      throw new Error("Game doesn't exist, Try to search for other games.");
    const data = await res.json();
    // console.log(data);

    // Clear the existing contents of the form first.
    state.search.form = [];

    // Limit the text characters in the game description.
    const initialGameDescription = data.description_raw;
    const firstGameDescription = initialGameDescription
      .split(".")[0]
      .replace(/[^a-zA-Z0-9 ]/g, "");

    const secondGameDescription = initialGameDescription
      .split(".")[1]
      .replace(/[^a-zA-Z0-9 ]/g, "");

    let finalGameDescription =
      firstGameDescription + ". " + secondGameDescription;

    if (finalGameDescription.length > GAME_DESCRIPTION_LIMIT) {
      finalGameDescription =
        finalGameDescription.substring(0, GAME_DESCRIPTION_LIMIT) + "...";
    }

    // Add the selected game to the form state to display it in add game modal
    state.search.form = {
      id: data.id,
      name: data.name,
      released: data.released ? data.released.split("-")[0] : "-",
      description: finalGameDescription,
      platforms: [data.platforms.map((pf) => pf.platform.name)],
      background_image: data.background_image
        ? data.background_image
        : NO_IMAGE,
    };
  } catch (err) {
    console.error(err);
  }
};

export const addGame = async function (gameData) {
  try {
    const formData = gameData;

    // Getting the name of the selected game
    const name = document.querySelector(".game-title").textContent.slice(0, -9);
    const img = document.querySelector(".form-img").src;

    // Get the current date added
    const now = new Date();
    const date = `${
      MONTH_NAME[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;

    // Generate a unique ID
    const id = generateUID()

    // Joining the 2 arrays to get our desirable data
    const initialData = [id, name, img, date];
    const game = initialData.concat(formData);
    // console.log(game);



    // Convert array to Object with custom keys
    const gameObj = Object.fromEntries(
      OBJ_KEYS.map((key, val) => [key, game[val]])
    );

    // Adding in the state
    state.games.push(gameObj);

    console.log(state.games);

    // Add the games to local storage
    saveGameLibrary();
  } catch (err) {
    console.error(err);
  }
};

export const deleteGame = async function(id) {
  try {
    let gameToDelete

    // Checks the games array and find the id of the game that will be deleted.
    state.games.forEach(game => {
      if (game.id === id) gameToDelete = game
    })

    // Get the index of the target array
    const index = state.games.indexOf(gameToDelete)
    
    const deleted = state.games.splice(index, 1)

    // update local storage
    saveGameLibrary();
  } catch(err) {
    console.error(err)
  }
}

const saveGameLibrary = function () {
  localStorage.setItem("games", JSON.stringify(state.games));
};

const generateUID = function() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const init = function () {
  const storage = localStorage.getItem("games");
  // This will convert the string to an object
  if (storage) state.games = JSON.parse(storage);
  console.log(state.games);
};

init();

const clearLibrary = function () {
  localStorage.clear('games');
};