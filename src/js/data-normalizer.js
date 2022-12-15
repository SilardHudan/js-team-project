import noImg from '../images/noImageAvailable.jpg';
const BASE_URL = 'https://image.tmdb.org/t/p/';

export function decodeMoviesGenres(moviesData, genresMap) {
  const updatedMoviesData = moviesData.map(movieData => {
    const genres = movieData.genre_ids.map(genreId => ({
      id: genreId,
      name: genresMap[genreId],
    }));

    return { ...movieData, genres };
  });
  return updatedMoviesData;
}

export function normalizeMovieData(movieData, genresNum) {
  let normalizedMovieData = { ...movieData };
  const {
    poster_path,
    release_date,
    genres,
    overview,
    popularity,
    original_title,
  } = normalizedMovieData;

  normalizedMovieData['poster_path'] = poster_path
    ? `${BASE_URL}w500${poster_path}`
    : noImg;

  normalizedMovieData['release_date'] = release_date
    ? String(parseInt(release_date))
    : 'No date';

  if (overview === '') {
    normalizedMovieData['overview'] = 'Unfortunately no info yet';
  }

  if (popularity === '') {
    normalizedMovieData['popularity'] = 'No Info';
  }

  if (original_title === '') {
    normalizedMovieData['original_title'] = 'No Info';
  }

  if (genres.length === 0) {
    normalizedMovieData.genres = 'No genre';
  } else if (genres.length <= genresNum) {
    normalizedMovieData.genres = genres.map(({ name }) => name).join(', ');
  } else {
    normalizedMovieData.genres = `${genres[0].name}, ${genres[1].name}, Other`;
  }

  return normalizedMovieData;
}
