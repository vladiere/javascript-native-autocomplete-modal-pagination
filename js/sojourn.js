(function (global) {
  // Private variables
  let fruitsData = [];
  let currentPage = 1;// Assuming 10 items per page

  // Private functions
  function autoCompleteSuggestions(suggestions) {
        searchInput.addEventListener("input", () => {
            const inputText = searchInput.value.toLowerCase();
            const filteredSuggestions = suggestions.filter(
                (suggestion) => suggestion.toLowerCase().startsWith(inputText)
            );

            if (inputText === '') {
                suggestionsList.innerHTML = "";
            } else {
                suggestionsList.innerHTML = "";
                filteredSuggestions.forEach((suggestion, index) => {
                    const suggestionElement = document.createElement("div");
                    suggestionElement.innerText = suggestion;
                    suggestionElement.addEventListener("click", () => {
                        searchInput.value = suggestion;
                        suggestionsList.innerHTML = "";
                        selectedSuggestionIndex = -1;
                    });
                        suggestionsList.appendChild(suggestionElement);
                    if (index === selectedSuggestionIndex) {
                        suggestionElement.classList.add("selected");
                    }
                });
            }
            
        });
    
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                const suggestions = suggestionsList.querySelectorAll("div");
                if (event.key === "ArrowUp") {
                selectedSuggestionIndex =
                    selectedSuggestionIndex <= 0
                    ? suggestions.length - 1
                    : selectedSuggestionIndex - 1;
                } else if (event.key === "ArrowDown") {
                selectedSuggestionIndex =
                    selectedSuggestionIndex >= suggestions.length - 1
                    ? 0
                    : selectedSuggestionIndex + 1;
                }
                suggestions.forEach((suggestion, index) => {
                if (index === selectedSuggestionIndex) {
                    suggestion.classList.add("selected");
                    searchInput.value = suggestion.innerText;
                    suggestion.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    });
                } else {
                    suggestion.classList.remove("selected");
                }
                });
            }
            else if (event.key === "Enter") {
                const selectedSuggestion = suggestionsList.querySelector(".selected");
                if (selectedSuggestion) {
                searchInput.value = selectedSuggestion.innerText;
                suggestionsList.innerHTML = "";
                selectedSuggestionIndex = -1;
                }
            }
        });
  }

  const fruitsUrl = 'https://gist.githubusercontent.com/vladiere/746eb5e12a9b2ede74981f9062ed316b/raw/67efe3f6b04021ee14aae0ba40306c76702aea4a/fruits';

  async function fetchFruitsData() {
    return fetch(fruitsUrl)
      .then((response) => response.json())
      .then((data) => {
        fruitsData = data.fruits;
        renderFruits();
      })
      .catch((error) =>
        console.error('Error fetching fruits data:', error)
      );
  }

  function renderFruits() {
    const fruitsContainer = document.getElementById('fruit-container');
    fruitsContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const fruitsToShow = fruitsData.slice(start, end);
    let output = '';

    fruitsToShow.forEach((fruit) => {
      suggestions.push(fruit.fruit);
      output += `
        <tr>
            <td>${fruit.fruit}</td>
            <td>${fruit.description}</td>
            <td>
                <button class="delete" id="delete">Show</button>
            </td>
        </tr>
      `;
    });

    fruitsContainer.innerHTML = output;

    const table = document.querySelector('table');
    const buttons = table.querySelectorAll('button');

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const button = event.target; // Reference to the clicked button
        const tableRow = button.closest('tr'); // Find the closest table row (parent element)
        const tableData = tableRow.querySelectorAll('td'); // Select all table cells within the row

        // Access the values of each table cell
        const fruit = tableData[0].textContent;
        const description = tableData[1].textContent;

        // Perform desired operations with the values
        console.log('Fruit:', fruit);
        console.log('Description:', description);

        showModal(fruit, description);
      });
    });

    renderPagination();
  }

  function renderPagination() {
    const paginationContainer = document.getElementById(
      'pagination-container'
    );
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(fruitsData.length / itemsPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderFruits();
      }
    });
    paginationContainer.appendChild(prevButton);

    for (let page = 1; page <= totalPages; page++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = page;

      if (page === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = page;
        renderFruits();
      });
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderFruits();
      }
    });

    paginationContainer.appendChild(nextButton);
    }
    
    function modal() {
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
    }

    function showModal(contentHeader, contentBody) {
        
        const modalElement = document.querySelector('.modal');
        // Get the button elements
        const cancelButton = document.querySelector('.cancel-button');

        // Get content header element
        const content = document.querySelector('.delete-dialog');
        content.querySelector('h2').textContent = contentHeader;
        content.querySelector('p').textContent = contentBody;

        function handleCancelClick() {
        modalElement.classList.remove('show-modal');
        cancelButton.removeEventListener('click', handleCancelClick);
        }

        // Attach event listeners to buttons
        cancelButton.addEventListener('click', handleCancelClick);
        // Display the modal
        modalElement.classList.add('show-modal');
    }

  // Public API
  const FruitLibrary = {
        autoCompleteSuggestions,
        fetchFruitsData,
        modal
  };

  // Expose the FruitLibrary to the global object
  global.FruitLibrary = FruitLibrary;
})(window);
