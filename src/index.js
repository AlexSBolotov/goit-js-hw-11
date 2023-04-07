import './css/styles.css';
import { Notify } from 'notiflix';
import { CardsAPI } from './cardsAPI.js';
import galleryCardTmplt from './templates/galleryCardTmplt.hbs';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  cardContainer: document.querySelector('.gallery'),
  addMoreBtn: document.querySelector('.load-more'),
};
const cardsAPI = new CardsAPI();
let totalPages = null;
// console.log(cardsAPI);

refs.addMoreBtn.style.display = 'none';
refs.searchFormEl.addEventListener('submit', onFormSubmit);
refs.addMoreBtn.addEventListener('click', onAddMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
  refs.addMoreBtn.style.display = 'none';

  cardsAPI.page = 1;
  cardsAPI.query = e.target.elements.searchQuery.value;

  cardsAPI.getCards(cardsAPI.query).then(onFetchSucces).catch(onFetchError);
}
function onFetchSucces(res) {
  if (res.total === 0) {
    throw new Error(res.status);
  }
  totalPages = Math.ceil(res.totalHits / 40);
  Notify.success(`Hooray! We found ${res.totalHits} images.`);
  renderMarkup(res.hits);
  refs.searchFormEl.reset();
  refs.addMoreBtn.style.display = 'block';
}

function onFetchError() {
  clearMarkup();
  Notify.failure('There is no matches!');
}

function onAddMoreBtnClick(e) {
  cardsAPI.page += 1;
  cardsAPI.getCards(cardsAPI.query).then(res => renderMarkup(res.hits));
  if (cardsAPI.page === totalPages) {
    refs.addMoreBtn.style.display = 'none';
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }
}
function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}
function renderMarkup(data) {
  const markup = data.map(card => galleryCardTmplt(card)).join('');
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}
