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
}

const api = new Api({
  baseUrl: 'https://api.otrdiplom.nomoredomains.sbs',
  headers: {'Content-Type': 'application/json'},
});

export default api;