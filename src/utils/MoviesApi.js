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
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {'Content-Type': 'application/json'},
});

export default api;