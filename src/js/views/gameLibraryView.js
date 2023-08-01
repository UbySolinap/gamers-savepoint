class gameLibraryView {
  _parentElement = document.querySelector(".my-games");
  _noGames = document.querySelector(".no-games");

  addHandlerLoadGame(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }

  render(data) {
    let gameStatus, gameStatusSymbol;
    if (data.gameStatus === "Playing") {
      gameStatus = "game-playing";
      gameStatusSymbol = `<i class="fa-solid fa-play"></i>`;
    }
    if (data.gameStatus === "Finished") {
      gameStatus = "game-finished";
      gameStatusSymbol = `<i class="fa-solid fa-check"></i>`;
    }
    if (data.gameStatus === "Backlog") {
      gameStatus = "game-backlog";
      gameStatusSymbol = `<i class="fa-regular fa-rectangle-list"></i>`;
    }

    const markup = this._generateMarkup(data, gameStatus, gameStatusSymbol);

    // Remove the initial display of the library
    this._removeExistingElement(this._noGames);

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup(data, gameStatus, gameStatusSymbol) {
    return `
    <li class="game list-group-item d-flex w-100">
        <img class="game-child game-fig" src="${data.background_image}" alt="${data.name}" />
        <div class="game-child game-data">
            <p class="game-info game-name"><strong>${data.name}</strong> </p>
            <p class="game-info game-boxes"><span class="game-platform">${data.platform}</span> <span class="game-status ${gameStatus}">${data.gameStatus} ${gameStatusSymbol}</span></p>
            <p class="game-info game-time">Gameplay <i class="fa-regular fa-clock"></i> : ${data.hours} hours</p>
            <p class="game-info date-added">Date Added: ${data.date}</p>
            <button type="button" class="game-info btn btn-delete" data-id="${data.id}"><i class="fa-regular fa-rectangle-xmark"></i></button>
        </div>
    </li>
    `;
  }

  _removeExistingElement(element) {
    if (element) {
      element.remove();
    }
  }

  clearField() {
    this._parentElement.innerHTML = "";
  }
}

export default new gameLibraryView();
