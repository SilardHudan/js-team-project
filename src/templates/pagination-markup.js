export default function paginationMarkup(currentPage, totalPages) {
  let minPage = currentPage - 2;
  let maxPage = currentPage + 2;

  if (minPage < 1) {
    minPage = 1;
    maxPage = 5 > totalPages ? totalPages : 5;
  }

  if (maxPage > totalPages) {
    maxPage = totalPages;
    minPage = totalPages - 5 < 2 ? 1 : totalPages - 4;
  }

  let pages = '';
  for (let i = minPage; i <= maxPage; i += 1) {
    const btnClass =
      i === currentPage ? 'class="pagination-btn current-page"' : '';
    pages += `<button ${btnClass} data-page="${i}" class="pagination-btn">${i}</button>`;
  }

  const firstPage =
    minPage > 1
      ? `<button data-page="1" class="pagination-btn">1</button>`
      : '';
  const lastPage =
    maxPage < totalPages
      ? `<button data-page="${totalPages}" class="pagination-btn">${totalPages}</button>`
      : '';

  const firstSeparator = minPage > 2 ? '<span class="span-btn">...</span>' : '';
  const lastSeparator =
    maxPage < totalPages - 1 ? '<span class="span-btn">...</span>' : '';

  const goBackBtn =
    currentPage === 1
      ? `<button disabled class="pagination-btn disabled"><svg class="arrow__icon" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.334 16h-18.668M16 25.334l-9.334-9.334 9.334-9.334"></path>
              </svg></button>`
      : `<button data-page-step="-1" class="pagination-btn"><svg class="arrow__icon" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.334 16h-18.668M16 25.334l-9.334-9.334 9.334-9.334"></path>
              </svg></button>`;
  const goForwardBtn =
    currentPage === totalPages
      ? `<button disabled class="pagination-btn disabled"><svg class="arrow__icon" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.666 16h18.668M16 25.334l9.334-9.334-9.334-9.334"></path>
              </svg></button>`
      : `<button data-page-step="1" class="pagination-btn"><svg class="arrow__icon" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.666 16h18.668M16 25.334l9.334-9.334-9.334-9.334"></path>
              </svg></button>`;

  return (
    goBackBtn +
    firstPage +
    firstSeparator +
    pages +
    lastSeparator +
    lastPage +
    goForwardBtn
  );
}
