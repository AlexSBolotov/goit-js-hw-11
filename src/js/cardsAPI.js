import axios from 'axios/dist/browser/axios.cjs';
import { BASE_URL, API_KEY } from './const';

export class CardsAPI {
  constructor() {
    this.query = null;
    this.page = 1;
  }
  settingUrl() {
    return {
      key: API_KEY,
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
    const res = await axios.get(`${BASE_URL}?${params}`);
    return res.data;
  }
}
