document.addEventListener('DOMContentLoaded', function () {
    const modal = `
    <div class="modal">
        <div class="modal-overlay ">
            <div class="delete-dialog">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this item?</p>
                <div class="buttons">
                    <button class="cancel-button">Close</button>
                </div>
            </div>
        </div>
    </div>`;

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(modal, 'text/html');
    const modalElement = parsedHTML.body.firstChild;

    // Append the modal to the body
    document.body.appendChild(modalElement);
})

function showModal (contentHeader, contentBody) {

    const modalElement = document.querySelector('.modal');
    // Get the button elements
    const cancelButton = document.querySelector('.cancel-button');

    // Get content header element
    const content = document.querySelector('.delete-dialog');
    content.querySelector('h2').textContent = contentHeader
    content.querySelector('p').textContent = contentBody

    function handleCancelClick() {
        modalElement.classList.remove('show-modal');
        cancelButton.removeEventListener('click', handleCancelClick);
    }

    // Attach event listeners to buttons
    cancelButton.addEventListener('click', handleCancelClick);
    // Display the modal
    modalElement.classList.add('show-modal');
}