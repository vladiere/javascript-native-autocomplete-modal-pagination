const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");
let selectedSuggestionIndex = -1;
let itemsPerPage = 10;


const suggestions = []


autoCompleteSuggestions(suggestions)

fetchFruitsData();

const newItemsPerPage = () => {
    var selectBox = document.getElementById("selectCount");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    itemsPerPage = parseInt(selectedValue, 10);
    
    currentPage = 1;
    renderFruits();
}

