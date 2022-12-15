export function checkMovieIsInList(movieId, listName) {
  const moviesList = JSON.parse(localStorage.getItem(listName));
  if (!moviesList) {
    return false;
  }
  const movieIsInList = moviesList.some(({ id }) => id === movieId);
  return movieIsInList;
}

export function toggleMovieInList(movieData, listName) {
  checkMovieIsInList(movieData.id, listName)
    ? removeMovieFromList(movieData.id, listName)
    : addMovieToList(movieData, listName);
}

function addMovieToList(movieData, listName) {
  const prevList = JSON.parse(localStorage.getItem(listName));
  let newList = [];

  if (prevList) {
    newList = [...prevList, movieData];
  } else {
    newList = [movieData];
  }

  localStorage.setItem(listName, JSON.stringify(newList));
}

function removeMovieFromList(idToRemove, listName) {
  const prevList = JSON.parse(localStorage.getItem(listName));
  if (!prevList) return;

  const newList = prevList.filter(({ id }) => id !== idToRemove);

  localStorage.setItem(listName, JSON.stringify(newList));
}
