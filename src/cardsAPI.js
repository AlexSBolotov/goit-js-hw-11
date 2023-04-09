export class CardsAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '35145991-8e435058d664d73dd92e9cfc9';
  constructor() {
    this.query = null;
    this.page = 1;
  }
  settingUrl() {
    return {
      key: CardsAPI.API_KEY,
      q: this.query,
      page: this.page,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
  }
  async getCards(query) {
    const params = new URLSearchParams(this.settingUrl());
    const res = await fetch(`${CardsAPI.BASE_URL}?${params}`);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const cards = await res.json();
    return cards;
  }
}
