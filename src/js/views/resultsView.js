import AddGameView from "./addGameView";

class ResultsView {
  _parentElement = document.querySelector(".results");
  _data;

  render(data) {
    // Clear the existing render first if there is.
    this._clearField();

    this._data = data;
    const markups = this._data.map((markup) => this._generateMarkup(markup));

    // Render each data in the array
    markups.forEach((markup) =>
      this._parentElement.insertAdjacentHTML("beforeend", markup)
    );
  }

  _generateMarkup(data) {
    let platforms;
    if (data.platforms === "-") platforms = "-";
    else platforms = data.platforms[0].join("] [");

    return `
      <li class="preview list-group-item d-flex w-100">
          <img class="search-fig" src="${data.background_image}" alt="${data.name}" />
          <div class="search-data">
              <a href="#${data.id}" data-id="${data.id}" class="search-name">${data.name} - <strong>(${data.released})</strong></a>
              <p class="search-platforms"><em>[${platforms}]</em></p>
          </div>
      </li>   
      `;
  }

  _clearField() {
    this._parentElement.innerHTML = "";
  }
}

export default new ResultsView();
