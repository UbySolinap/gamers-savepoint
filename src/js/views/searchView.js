class SearchView {
  _parentElement = document.querySelector(".search");
  _results = document.querySelector(".results");

  getQuery() {
    const query = this._parentElement.querySelector(".search-field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search-field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderError(message) {
    const markup = `
    <div class="error">
      <p class="error-logo"><i class="fa-solid fa-triangle-exclamation"></i></p>
      <p><em>${message}</em></p>
    </div>
    `;
    this._clear();
    this._results.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._results.innerHTML = "";
  }
}

export default new SearchView();
