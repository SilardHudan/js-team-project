const refs = {
  libraryMoviesContainer: document.querySelector('[data-user-library]'),
  libraryMoviesPagination: document.querySelector(
    '[data-user-library-pagination]'
  ),
  libraryWatchedBtn: document.querySelector('[data-library="watched"]'),
  libraryQueueBtn: document.querySelector('[data-library="queue"]'),
  emptyLibraryMessage: document.querySelector('[data-empty-message]'),
  openModalBtn: document.querySelector('[data-modal-team-open]'),
  closeModalBtn: document.querySelector('[data-modal-team-close]'),
  switcher: document.querySelector('.switcher-toggle'),
};

export default refs;
