import { MOVIES_BASE_URL } from '../constants/constants';

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text()
      .then((text) => Promise.reject({status: res.status, text}));
  }

  getMovies() {
    return fetch(this._baseUrl, { headers: this._headers })
      .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: MOVIES_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export default api;