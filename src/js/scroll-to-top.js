import refs from './refs';

refs.goTopBtn.addEventListener('click', backToTop);
window.addEventListener('scroll', trackScroll);

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goTopBtn.classList.add('back-to-top-show');
  }

  if (scrolled < coords) {
    refs.goTopBtn.classList.remove('back-to-top-show');
  }
}

export default function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
