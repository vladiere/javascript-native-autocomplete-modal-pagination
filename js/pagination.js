const fruitsUrl = 'https://gist.githubusercontent.com/vladiere/746eb5e12a9b2ede74981f9062ed316b/raw/67efe3f6b04021ee14aae0ba40306c76702aea4a/fruits';
let currentPage = 1;
let fruitsData = [];

// Fetch fruits data from the URL
async function fetchFruitsData () {
    return fetch(fruitsUrl)
        .then(response => response.json())
        .then(data => {
          
            fruitsData = data.fruits;
            renderFruits();
        })
        .catch(error => console.error('Error fetching fruits data:', error));
}

// Render fruits based on the current page
function renderFruits() {
    const fruitsContainer = document.getElementById('fruit-container');
    fruitsContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const fruitsToShow = fruitsData.slice(start, end);
    let output = ''

    fruitsToShow.forEach(fruit => {
        suggestions.push(fruit.fruit)
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


    buttons.forEach(button => {
    button.addEventListener('click', event => {
        const button = event.target; // Reference to the clicked button
        const tableRow = button.closest('tr'); // Find the closest table row (parent element)
        const tableData = tableRow.querySelectorAll('td'); // Select all table cells within the row

        // Access the values of each table cell
        const fruit = tableData[0].textContent;
        const description = tableData[1].textContent;

        // Perform desired operations with the values
        console.log('Fruit:', fruit);
        console.log('Description:', description);

        showModal(fruit, description)
    });
    });

    renderPagination();
}

// Render pagination buttons
function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
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

