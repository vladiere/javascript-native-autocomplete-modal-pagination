const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");
const selectCount = document.querySelector('#selectCount')
let selectedSuggestionIndex = -1;
let itemsPerPage = 10;


const suggestions = []


autoCompleteSuggestions(suggestions)

fetchFruitsData();

selectCount.addEventListener('click', function (e) {
    if (e.target.tagName === 'OPTION') { 
        itemsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderFruits();
    }
})

