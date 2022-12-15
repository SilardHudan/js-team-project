import refs from './refs';

export default function showSpinner() {
  refs.spinner.classList.remove('done');

  setTimeout(() => {
    refs.spinner.classList.add('done');
  }, 500);
}

document.body.onload = showSpinner;
