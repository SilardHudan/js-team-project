import { normalizeMovieData } from '../js/data-normalizer';

export default function createMoviesMarkup(moviesData) {
  return moviesData.reduce((acc, movie) => {
    const normalizedMovieData = normalizeMovieData(movie, 3);
    const { id, genres, poster_path, release_date, title, vote_average } =
      normalizedMovieData;

    const rating = vote_average
      ? `<span class="card__rating   ">${vote_average.toFixed(1)}</span>`
      : '';

    return `${acc}
      <li class="card__film"  data-movie-id="${id}">
        <img class="card__img"src="${poster_path}" alt="${title} movie poster" >
        <div class="card__info">
        <h2 class="card__title">${title}</h2>
        <p class="card__text">
        <span class="card__genre">${genres}</span>
        <span class="card__release">${release_date}</span>${rating}
        </p>
        </div>
      </li>
      `;
  }, '');
}
