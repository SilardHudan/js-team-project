import paginationMarkup from '../templates/pagination-markup';

export default function renderPagination(currentPage, totalPages, container) {
  container.innerHTML = paginationMarkup(currentPage, totalPages);
}