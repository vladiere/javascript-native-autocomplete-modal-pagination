
const autoCompleteSuggestions = (suggestions) => {
    
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
