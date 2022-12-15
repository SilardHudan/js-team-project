const refs = {
  teamContainer: document.querySelector('.team-container'),
  openModalBtn: document.querySelector('[data-modal-team-open]'),
  closeModalBtn: document.querySelector('[data-modal-team-close]'),
  teamModal: document.querySelector('[data-modal-team]'),
  searchForm: document.querySelector('[data-search]'),
  moviesContainer: document.querySelector('[data-movies]'),
  paginationContainer: document.querySelector('[data-pages]'),
  movieModal: document.querySelector('[data-movie-modal]'),
  movieModalCloseBtn: document.querySelector('[data-movie-modal-close]'),
  switcher: document.querySelector('.switcher-toggle'),
  spinner: document.getElementById('page-preloader'),
  errorOutput: document.querySelector('[data-message]'),
  goTopBtn: document.querySelector('[data-go-to-top]'),
};

export default refs;
