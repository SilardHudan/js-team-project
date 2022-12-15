import TMDB_Service from './TMDB-Service';
import createMoviesMarkup from '../templates/movies-markup';
import refs from './refs';
import renderPagination from './render-pagination';
import renderModal from './render-modal';
import { decodeMoviesGenres } from './data-normalizer';
import showMessage from './show-message';
import showSpinner from './spinner';
import backToTop from './scroll-to-top';

refs.searchForm.addEventListener('submit', onSearch);
refs.paginationContainer.addEventListener('click', onPaginationClick);
refs.moviesContainer.addEventListener('click', onMovieCardClick);

const tmdbService = new TMDB_Service();
tmdbService.getGenres();

setTimeout(getMovies, 200);

async function getMovies() {
  try {
    const { results, page, total_pages } = await tmdbService.fetchMovies();
    if (results.length === 0) {
      showMessage();
      tmdbService.query = '';
      getMovies();
      return;
    }
    renderMovies(results);
    renderPagination(page, total_pages, refs.paginationContainer);
  } catch (error) {
    console.log('this is error!', error);
  }
}

async function onMovieCardClick(e) {
  const targetEl = e.target.closest('li');
  if (!targetEl) return;

  try {
    const movieId = Number(targetEl.dataset.movieId);
    const movieData = await tmdbService.fetchMovie(movieId);
    // console.log(movieData);
    renderModal(movieData);
  } catch (error) {
    console.log(error);
  }
}

function renderMovies(moviesData) {
  const decodedMoviesData = decodeMoviesGenres(
    moviesData,
    tmdbService.genresMap
  );
  refs.moviesContainer.innerHTML = createMoviesMarkup(
    removeRaring(decodedMoviesData)
  );
}

function removeRaring(moviesData) {
  const noRatingData = moviesData.reduce(
    (acc, movieData) => (acc = [...acc, { ...movieData, vote_average: 0 }]),
    []
  );
  return noRatingData;
}

function onPaginationClick(e) {
  backToTop();
  const target = e.target.closest('button');
  if (!target) return;

  if (target.dataset.page) {
    tmdbService.currentPage = Number(target.dataset.page);
  }
  if (target.dataset.pageStep) {
    tmdbService.currentPage =
      tmdbService.page + Number(target.dataset.pageStep);
  }
  getMovies();
}

function onSearch(e) {
  e.preventDefault();
  showSpinner();

  const newQuery = e.currentTarget.searchQuery.value;

  tmdbService.query = newQuery.trim();
  tmdbService.resetPage();
  getMovies();
}
