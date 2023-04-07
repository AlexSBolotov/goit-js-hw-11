import './css/styles.css';
import { Notify } from 'notiflix';
import { cardsAPI } from './cardsAPI';
import galleryCardTmplt from './templates/galleryCardTmplt.hbs';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  cardContainer: document.querySelector('.gallery'),
  addMoreBtn: document.querySelector('.load-more'),
};
// let query = null;
refs.addMoreBtn.style.display = 'none';
refs.searchFormEl.addEventListener('submit', onFormSubmit);
refs.addMoreBtn.addEventListener('click', onAddMoreBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  let query = e.target.elements.searchQuery.value;
  cardsAPI.query = query;
  cardsAPI
    .getCards(query)
    .then(res => {
      renderMarkup(res.hits);
      refs.addMoreBtn.style.display = 'block';
    })
    .catch(() => {
      clearMarkup();
      Notify.failure('There is no matches!');
    });

  // page += 1;
}
function onAddMoreBtnClick(e) {
  console.log('Hello');
  cardsAPI.page += 1;
  cardsAPI.getCards(query).then(res => renderMarkup(res.hits));
}
function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}
function renderMarkup(data) {
  const markup = data.map(card => galleryCardTmplt(card)).join('');
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}
// import { fetchCountries } from './fetchCountries.js';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import countriesTmplt from './templates/countriesTmplt.hbs';
// import countryTmplt from './templates/countryTmplt.hbs';

// const inputEl = document.querySelector('#search-box');
// const countryBox = document.querySelector('.country-info');
// const countriesList = document.querySelector('.country-list');
// const DEBOUNCE_DELAY = 300;

// inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));

// function onInputEl(e) {
//   let query = e.target.value.trim();
//   if (query === '') {
//     clearMarkup();
//     return;
//   }
//   fetchCountries(query).then(onSuccess).catch(onError);
// }

// function onSuccess(data) {
//   if (data.length > 10) {
//     clearMarkup();
//     Notify.info('Too many matches found. Please enter a more specific name.');
//   } else {
//     clearMarkup();
//     createMarkup(data);
//   }
// }

// function onError() {
//   clearMarkup();
//   Notify.failure('Oops, there is no country with that name');
// }

// function createMarkup(data) {
//   if (data.length === 1) {
//     countryBox.insertAdjacentHTML('beforeend', countryTmplt(data[0]));
//   } else {
//     countriesList.insertAdjacentHTML('beforeend', countriesTmplt(data));
//   }
// }

// function clearMarkup() {
//   countryBox.innerHTML = '';
//   countriesList.innerHTML = '';
// }
