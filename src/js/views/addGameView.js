class AddGameView {
  _overlay = document.querySelector(".overlay");
  _modal = document.querySelector(".add-game-window");
  _upload = document.querySelector(".upload");
  _uploadField = document.querySelector(".upload-modal");
  _results = document.querySelector(".results");
  _briefDescription = document.querySelector(".brief-description");

  _platform = document.querySelector("#platform");
  _status = document.querySelector("#status");

  _btnClose = document.querySelector(".btn-close-modal");

  constructor() {
    this._addHandlerHideWindow();
  }

  addHandlerAddForm(handler) {
    // This will check first if the user has already searched for a game
    this._results.addEventListener("click", (e) => {
      const selected = e.target.closest(".search-name");

      if (!selected) return;

      const id = +selected.dataset.id;

      handler(id);
    });
  }

  addHandlerAddGame(handler) {
    this._upload.addEventListener("submit", (e) => {
      e.preventDefault();
      // Getting the needed data
      const platform = document.querySelector("#platform");
      const status = document.querySelector("#status");
      const hours = this._upload.elements["hours"].value;

      if (platform.value === "" || status.value === "" || hours === "") {
        alert("Please fill all the necessary data.");
      } else {
        // Gettign all the data in a form then makes it an array
        const data = [platform.value, status.value, hours];
        handler(data);
      }
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._modal.classList.toggle("hidden");
  }

  toggleForm() {
    this._upload.classList.toggle("hidden");
  }

  _removeExistingElement(element) {
    if (element) {
      element.remove();
    }
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  render(data) {
    const success = document.querySelector(".success");

    // Checks first if the form is hidden
    if (this._upload.classList.contains("hidden")) this.toggleForm();

    this._removeExistingElement(success);

    const markup = `
        <div class="upload-image upload-child">
          <img class="form-img" src="${data.background_image}" alt="${data.name}">
        </div>
        <div class="upload-info upload-child">
          <h3 class="game-title">${data.name} - <strong>(${data.released})</strong></h3>
          <p>${data.description}</p>
        </div>
      `;

    this._briefDescription.innerHTML = "";

    this._briefDescription.insertAdjacentHTML("afterbegin", markup);
  }

  populateDropDown(data) {
    // Checks first if there is an existing content of the platform then clear the existing contents of the select and the input hours.
    if (this._platform) {
      this._platform.innerHTML = `<option value="" selected disabled>Which platform?</option>`;
      this._upload.elements["hours"].value = "";
      this._status.value = "";
    }

    const options = data.platforms[0];
    // Creates an option for "Other" platform.
    options.push("Other");

    // Adding a dropdown item
    for (let i = 0; i < options.length; i++) {
      // Creating the element first
      const option = options[i];
      const el = document.createElement("option");
      el.textContent = option;
      el.value = option;
      // Append the element to the dropdown
      this._platform.appendChild(el);
    }
  }

  renderSuccess() {
    // Hides the description and the form
    this.toggleForm();

    this._briefDescription.innerHTML = "";

    const markup = `
    <div class="success">
      <p class="success-logo"><i class="fa-solid fa-circle-check"></i></p>
      <p><em>Game is successfully added to your library.</em></p>
    </div>
    `;
    this._uploadField.insertAdjacentHTML("afterbegin", markup);
  }
}



export default new AddGameView();
