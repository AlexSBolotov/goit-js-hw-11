export class cardsAPI {
  static #BASE_URL = 'https://pixabay.com/api/';
  static #API_KEY = '35145991-8e435058d664d73dd92e9cfc9';

  static query = null;
  static page = 1;
  static perPage = 40;

  static getCards(query) {
    const params = new URLSearchParams({
      key: cardsAPI.#API_KEY,
      q: query,
      page: cardsAPI.page,
      per_page: cardsAPI.perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    return fetch(`${cardsAPI.#BASE_URL}?${params}`).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}

// const BASE_URL = 'https://restcountries.com/v3.1/';
// export function fetchCountries(query) {
//   return fetch(
//     `${BASE_URL}/name/${query}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// .catch(err => {
//   console.log(err);
//   if (err.message === 404) {
//     console.log(err);
//   }
// });
