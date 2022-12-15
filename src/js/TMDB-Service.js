import axios from 'axios';

export default class TMDB_Service {
  static KEY = 'e8f4d647cde955cba1306001955cfd97';
  static BASE_URL = 'https://api.themoviedb.org/3/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.genresMap = [];
  }

  async getGenres() {
    const queryParams = {
      api_key: TMDB_Service.KEY,
      language: 'en-US',
    };

    const response = await axios.get(
      TMDB_Service.BASE_URL + 'genre/movie/list',
      {
        params: queryParams,
      }
    );
    const { genres } = response.data;
    this.genresMap = genres.reduce(
      (acc, genre) => ({ ...acc, ...{ [genre.id]: genre.name } }),
      {}
    );
  }

  async fetchMovies() {
    const additionalURL =
      this.searchQuery === '' ? 'trending/movie/week' : 'search/movie';

    const queryParams = {
      api_key: TMDB_Service.KEY,
      page: this.page,
    };
    if (this.searchQuery !== '') queryParams.query = this.searchQuery;

    const response = await axios.get(TMDB_Service.BASE_URL + additionalURL, {
      params: queryParams,
    });

    return response.data;
  }

  async fetchMovie(id) {
    const additionalURL = `movie/${id}`;
    const queryParams = {
      api_key: TMDB_Service.KEY,
    };

    const response = await axios.get(TMDB_Service.BASE_URL + additionalURL, {
      params: queryParams,
    });

    return response.data;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  set currentPage(newPage) {
    this.page = newPage;
  }

  resetPage() {
    this.page = 1;
  }
}
