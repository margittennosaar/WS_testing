// Utility function to debounce function
const debounce = (fn, delay = 300) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Sorts the games by date of adding to hall of fame
const sortGames = (games, descending = true) => {
  const sorted = games.sort((a, b) => {
    const { added_to_hall_of_fame: aAdded } = a;
    const { added_to_hall_of_fame: bAdded } = b;

    const aDate = new Date(aAdded);
    const bDate = new Date(bAdded);

    return aDate - bDate;
  });

  if (descending) return sorted.reverse();

  return sorted;
};

// Sorts the hall of fame by score
const sortHallOfFame = (hallOfFame, descending = true) => {
  const sorted = hallOfFame.sort((a, b) => {
    if (a["score"] < b["score"]) return -1;
    if (a["score"] > b["score"]) return 1;
    return 0;
  });

  if (descending) return sorted.reverse();

  return sorted;
};
