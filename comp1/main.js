// Constants
const GAMES_PER_PAGE = 20;

// Global variables
let games;
let filteredGameCount;
let search;

// Get search input
const searchInput = document.getElementById("search-game");

// Get the templates
const gameTemplate = document.getElementById("game-template");
const paginationTemplate = document.getElementById("pagination-template");

// Get the container for games and pagination
const gameContainer = document.getElementById("game-container");
const paginationContainer = document.getElementById("pagination-container");

// Get params from URL
const params = new URLSearchParams(window.location.search);
const page = Number(params.get("page")) || 1;
search = params.get("search") || "";

// Recreate pagination
const refreshPagination = () => {
  if (!games) return;

  const totalPages = Math.ceil(filteredGameCount / GAMES_PER_PAGE);

  // Remove previous pagination buttons
  paginationContainer.innerHTML = "";

  // Create button for each page
  for (let i = 0; i < totalPages; i++) {
    const paginationPage = i + 1;

    const paginationId = `pagination-${paginationPage}`;

    const paginationNode = paginationTemplate.cloneNode(true);

    paginationNode.textContent = paginationPage;
    paginationNode.setAttribute("id", paginationId);

    const paginationParams = new URLSearchParams();
    paginationParams.set("page", paginationPage);
    if (search) paginationParams.set("search", search);

    paginationNode.setAttribute("href", `?${paginationParams.toString()}`);

    if (paginationPage === page) {
      paginationNode.setAttribute("data-active", "true");
    }

    paginationContainer.append(paginationNode);
  }
};

// Refilter and recreate the game elements
const refreshGames = () => {
  if (!games) return;

  let filteredGames = games;

  filteredGames = applySearchToGames(filteredGames);
  filteredGameCount = filteredGames.length;

  filteredGames = sortGames(filteredGames);
  filteredGames = applyPaginationToGames(filteredGames);

  console.log(filteredGames);

  // Remove old games from game container
  gameContainer.innerHTML = "";

  // Create game elements
  filteredGames.forEach((game) => {
    const {
      ID,
      game_image,
      game_name: { fi: game_name_fi, en: game_name_en },
      hall_of_fame,
    } = game;

    const gameNode = gameTemplate.cloneNode(true);

    const gameNodeId = `game-${ID}`;
    gameNode.setAttribute("id", gameNodeId);
    gameNode.setAttribute("href", `peli.html?id=${ID}`);

    gameContainer.appendChild(gameNode);

    // Add game information to the element
    const gameImage = document.querySelector(`#${gameNodeId} #image`);
    const gameName = document.querySelector(`#${gameNodeId} #game-name`);
    const bestUserScore = document.querySelector(`#${gameNodeId} #user-score`);

    const sortedHallOfFame = sortHallOfFame(hall_of_fame);
    const bestHallOfFame = sortedHallOfFame[0];

    const { username, score } = bestHallOfFame;

    gameImage.setAttribute("src", game_image || "https://placehold.co/100x100");
    gameName.textContent = game_name_fi;
    bestUserScore.textContent = `${score} - ${username}`;
  });

  refreshPagination();
};

// Filter the games by search value
const applySearchToGames = (games) => {
  if (!search) return games;

  const filtered = games.filter((game) => {
    const {
      game_name: { fi: game_name_fi, en: game_name_en },
    } = game;

    return game_name_fi.toLowerCase().includes(search.toLowerCase());
  });

  return filtered;
};

// Get the games from the correct page
const applyPaginationToGames = (games) => {
  const paginatedGames = games.slice(
    (page - 1) * GAMES_PER_PAGE,
    page * GAMES_PER_PAGE
  );
  return paginatedGames;
};

// Handle the search input value changing
searchInput.addEventListener("input", (e) => {
  debounce((value) => {
    search = value;
    refreshGames();
  })(e.target.value);
});

window.onload = () => {
  // Set the input field value on page reload if it is found from query
  searchInput.value = search;

  // Fetch games.json from server
  fetch("assets/games.json")
    .then((res) => res.json())
    .then((json) => {
      games = json["games"];
      refreshGames();
    });
};
