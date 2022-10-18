import { MAIN_BASE_URL } from '../constants/constants';

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

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password}),
    }).then(this._handleResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password}),
    }).then(this._handleResponse);
  }

  getUserData(jwt) {
    if (!jwt) {
      jwt = localStorage.getItem('jwt');
    }
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {...this._headers, ...{'Authorization': `Bearer ${jwt}`}}
    }).then(this._handleResponse);
  }

  updateUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers, ...{'Authorization': `Bearer ${localStorage.getItem('jwt')}`}},
      body: JSON.stringify(userData),
    }).then(this._handleResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {...this._headers, ...{'Authorization': `Bearer ${localStorage.getItem('jwt')}`}},
    }).then(this._handleResponse);
  }

  createMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {...this._headers, ...{'Authorization': `Bearer ${localStorage.getItem('jwt')}`}},
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {...this._headers, ...{'Authorization': `Bearer ${localStorage.getItem('jwt')}`}},
    }).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: MAIN_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export default api;