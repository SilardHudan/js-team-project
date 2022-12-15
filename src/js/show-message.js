import refs from './refs.js';

export default function showMessage() {
  refs.errorOutput.classList.remove('visually-hidden');

  setTimeout(() => {
    refs.errorOutput.classList.add('visually-hidden');
  }, 2000);
}
