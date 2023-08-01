class deleteGameView {
    _parentElement = document.querySelector('.my-games');
    _deleteForm = document.querySelector('.delete-window');
    _btnCancel = document.querySelector('.no-button');
    _overlay = document.querySelector('.overlay');

    addhandlerDeleteGame(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const selected = e.target.closest('.btn-delete')

            if (!selected) return;

            const id = selected.dataset.id;

            handler(id)
        })
    }


}

export default new deleteGameView()