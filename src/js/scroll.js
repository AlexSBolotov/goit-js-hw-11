import '../css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { CardsAPI } from './cardsAPI';
import galleryCardTmplt from '../templates/galleryCardTmplt.hbs';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  cardContainer: document.querySelector('.gallery'),
  addMoreBtn: document.querySelector('.load-more'),
};
refs.addMoreBtn.classList.add('is-hidden');

const options = {
  root: null,
  rootMargin: '0px 0px 600px 0px',
  threshold: 1,
};
const observer = new IntersectionObserver(onScrollAddMore, options);

const cardsAPI = new CardsAPI();
let totalPages = null;

refs.searchFormEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();

  cardsAPI.page = 1;
  cardsAPI.query = e.target.elements.searchQuery.value;

  try {
    const res = await cardsAPI.getCards();
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
    return;
  }
  observer.observe(refs.addMoreBtn);
}
function onScrollAddMore(entries) {
  if (entries[0].isIntersecting) {
    addMoreCards();
  }
}
function onFetchError(err) {
  clearMarkup();
  Notify.failure(err.message);
}

async function addMoreCards() {
  cardsAPI.page += 1;

  const res = await cardsAPI.getCards();

  renderMarkup(res.hits);

  if (cardsAPI.page === totalPages) {
    observer.unobserve(refs.addMoreBtn);

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
