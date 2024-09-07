// Constants
const RESULTS_TO_SHOW = 20;

// Global variables
let games;
let search;

// Get search input
const searchInput = document.getElementById("search-player");

// Get the templates
const resultTemplate = document.getElementById("result-template");

// Get the container for results
const resultContainer = document.getElementById("result-container");

// Get params from URL
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")) || 1;

// Update the game information to the page
const updatePageInformation = () => {
  const game = findGame(games, id);

  if (!game) return;

  const {
    game_name: { fi: game_name_fi, en: game_name_en },
    hall_of_fame,
  } = game;

  document.title = `${game_name_fi} - Retro Game House`;

  // Add the game name to the page
  const gameNameNode = document.getElementById("game-name");
  gameNameNode.innerText = game_name_fi;

  // Filter the hall of fame results
  let filteredResults = hall_of_fame.slice(0, RESULTS_TO_SHOW);
  filteredResults = sortHallOfFame(hall_of_fame);
  filteredResults = addPlacementToResults(filteredResults);
  filteredResults = searchResults(filteredResults);

  // Clear previous result elements
  resultContainer.innerHTML = "";

  // Create the result elements
  filteredResults.forEach((result) => {
    const { username, score, date_time, placement } = result;

    const resultId = `${username}-${score}`;

    const resultNode = resultTemplate.cloneNode(true);
    resultNode.setAttribute("id", resultId);

    // Highlight top 3 results
    if (placement <= 3) resultNode.setAttribute("data-highlight", "true");

    resultContainer.appendChild(resultNode);

    // Add the result information to the element
    const placementElement = document.querySelector(`#${resultId} #placement`);
    const usernameElement = document.querySelector(`#${resultId} #username`);
    const scoreDateElement = document.querySelector(`#${resultId} #score-date`);

    const dateTime = new Date(date_time);

    placementElement.textContent = `${placement}.`;
    usernameElement.textContent = username;
    scoreDateElement.textContent = `${score} - ${dateTime.toLocaleDateString()}`;
  });
};

// Add index as placement to results
// Note: Sort before running this :)
const addPlacementToResults = (results) => {
  const added = results.map((result, i) => ({ ...result, placement: i + 1 }));
  return added;
};

// Find game by id
const findGame = (games, id) => {
  const filtered = games.filter((game) => {
    const { ID } = game;
    return ID === id;
  });

  if (!filtered) return;

  return filtered[0];
};

// Filter the hall of fame by search value
const searchResults = (results) => {
  if (!search) return results;

  const filtered = results.filter((result) => {
    const { username } = result;

    return username.toLowerCase().includes(search.toLowerCase());
  });

  return filtered;
};

// Handle the search input value changing
searchInput.addEventListener("input", (e) => {
  debounce((value) => {
    search = value;
    updatePageInformation();
  })(e.target.value);
});

window.onload = () => {
  // Fetch games.json from server
  fetch("assets/games.json")
    .then((res) => res.json())
    .then((json) => {
      games = json["games"];
      updatePageInformation();
    });
};
