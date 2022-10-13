import { DURATION_SHORT_MOVIE } from '../constants/constants';

class MoviesEngine {
  constructor(movies, savedMovies, setMovies, setSavedMovies) {
    this._moviesState = movies;
    this._savedMoviesState = savedMovies;
    this._setMovies = setMovies;
    this._setSavedMovies = setSavedMovies;
    this._movies = [];
    this._savedMovies = [];
    this._filteredMovies = [];
    this._orderedSavedMovies = [];
    this._searchString = '';
    this._onlyShort = false;
  }

  isDataReceived() {
    return this._movies.length !== 0;
  }

  loadData(savedMovies, movies) {
    this._movies = movies;
    this._savedMovies = savedMovies;
    this._orderedSavedMovies = this._savedMovies.reduce((res, item) => {
      res[item.movieId] = true;
      return res;
    }, [])
    return Promise.resolve();
  }

  searchMovies(searchString, onlyShort) {
    this._searchString = searchString;
    this._onlyShort = onlyShort;
    this._filteredMovies = this._movies.filter(item => {
      return !this._onlyShort && 
        (item.nameRU.toLowerCase().includes(this._searchString.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(this._searchString.toLowerCase())) ||
        this._onlyShort && item.duration <= DURATION_SHORT_MOVIE &&
        (item.nameRU.toLowerCase().includes(this._searchString.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(this._searchString.toLowerCase()));
    });
    this._setMovies(this._filteredMovies.slice(0, 12));
  }

  getMoviesState() {
    return this._moviesState;
  }

  getIsMoreMovies() {
    return this._filteredMovies.length > this._moviesState.length;
  }

  getSearchString() {
    return this._searchString;
  }

  getOnlyShort() {
    return this._onlyShort;
  }
}

export default MoviesEngine;