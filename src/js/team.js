import { teamCards } from './team-card.js';
import teamCardItem from '../templates/team-templat.hbs';
import refs from './refs';

createTeamMarkup(teamCards);
function createTeamMarkup(teamCards) {
  const markup = teamCardItem(teamCards);
  return (refs.teamContainer.innerHTML = markup);
}

refs.openModalBtn.addEventListener('click', clickTeamModal);
refs.closeModalBtn.addEventListener('click', clickTeamModal);

export default function clickTeamModal(evt) {
  evt.preventDefault();
  document.body.classList.toggle('modal-open');
  refs.teamModal.classList.toggle('is-hidden');
}

[...document.querySelectorAll(`.team__item`)].forEach(teamCard => {
  teamCard.addEventListener('click', () => {
    teamCard.classList.toggle('click-card');
  });
});
