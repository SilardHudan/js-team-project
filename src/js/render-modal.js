import * as basicLightbox from 'basiclightbox';
import createModalMarkup from '../templates/modal-markup';
import { normalizeMovieData } from './data-normalizer';
import {
  LS_QUEUE,
  LS_WATCHED,
  BTN_WATCHED_ADD,
  BTN_WATCHED_REMOVE,
  BTN_QUEUE_ADD,
  BTN_QUEUE_REMOVE,
} from './constants';
import { checkMovieIsInList, toggleMovieInList } from './LS-service';

export default function renderModal(movieDataToRender, action) {
  const normalizedMovieData = normalizeMovieData(movieDataToRender, 10);
  const { id: movieId } = normalizedMovieData;

  const movieInWatched = checkMovieIsInList(movieId, LS_WATCHED);
  const movieInQueue = checkMovieIsInList(movieId, LS_QUEUE);

  const modal = basicLightbox.create(
    createModalMarkup(normalizedMovieData, movieInWatched, movieInQueue),
    {
      onShow: modal => {
        window.addEventListener('keydown', escapeKeyCloseModal);
        window.addEventListener('click', clickForCloseModal);
        modal.element().querySelector('.modal__close').onclick = modal.close;
        document.body.classList.toggle('modal-open');
      },
      onClose: modal => {
        window.removeEventListener('keydown', escapeKeyCloseModal);
        window.removeEventListener('click', clickForCloseModal);
        document.body.classList.toggle('modal-open');
      },
    }
  );

  function escapeKeyCloseModal(event) {
    if (event.code === 'Escape') {
      if (!modal.element().classList.contains('visually-hidden')) {
        modal.close();
      }
    }
  }

  function clickForCloseModal(event) {
    if (event.target.classList.value === 'basicLightbox__placeholder') {
      modal.close();
    }
  }

  modal.show();

  const addToWatchedBtnRef = document.querySelector('[data-watched]');
  const addToQueueBtnRef = document.querySelector('[data-queue]');

  addToWatchedBtnRef.addEventListener('click', onWatchedBtnClick);
  addToQueueBtnRef.addEventListener('click', onQueueBtnClick);

  function onWatchedBtnClick(e) {
    toggleMovieInList(movieDataToRender, LS_WATCHED);
    toggleWatchedBtnLabel(e.target);
    if (action) action();
  }

  function onQueueBtnClick(e) {
    toggleMovieInList(movieDataToRender, LS_QUEUE);
    toggleQueueBtnLabel(e.target);
    if (action) action();
  }

  function toggleWatchedBtnLabel(btnRef) {
    btnRef.textContent === BTN_WATCHED_ADD
      ? (btnRef.textContent = BTN_WATCHED_REMOVE)
      : (btnRef.textContent = BTN_WATCHED_ADD);
  }

  function toggleQueueBtnLabel(btnRef) {
    btnRef.textContent === BTN_QUEUE_ADD
      ? (btnRef.textContent = BTN_QUEUE_REMOVE)
      : (btnRef.textContent = BTN_QUEUE_ADD);
  }
}
