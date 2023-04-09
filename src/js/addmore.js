import '../css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { CardsAPI } from './cardsAPI.js';
import galleryCardTmplt from '../templates/galleryCardTmplt.hbs';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  cardContainer: document.querySelector('.gallery'),
  addMoreBtn: document.querySelector('.load-more'),
};
showBtn('none');

const cardsAPI = new CardsAPI();
let totalPages = null;

refs.searchFormEl.addEventListener('submit', onFormSubmit);
refs.addMoreBtn.addEventListener('click', onAddMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
  showBtn('none');

  cardsAPI.page = 1;
  cardsAPI.query = e.target.elements.searchQuery.value;

  try {
    const res = await cardsAPI.getCards(cardsAPI.query);
    onFetchSucces(res);
  } catch (err) {
    onFetchError(err);
  }
}
function onFetchSucces(res) {
  if (res.total === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  totalPages = Math.ceil(res.totalHits / 40);
  Notify.success(`Hooray! We found ${res.totalHits} images.`);
  renderMarkup(res.hits);

  refs.searchFormEl.reset();
  if (res.totalHits <= 40) {
    showBtn('none');
    return;
  }
  showBtn('block');
}

function onFetchError(err) {
  clearMarkup();
  Notify.failure(err.message);
}

async function onAddMoreBtnClick(e) {
  cardsAPI.page += 1;
  const res = await cardsAPI.getCards(cardsAPI.query);
  renderMarkup(res.hits);

  if (cardsAPI.page === totalPages) {
    showBtn('none');
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }
}
function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}
function renderMarkup(data) {
  const markup = data.map(card => galleryCardTmplt(card)).join('');
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250',
  });
  gallery.refresh();
}
function showBtn(status) {
  refs.addMoreBtn.style.display = status;
}
