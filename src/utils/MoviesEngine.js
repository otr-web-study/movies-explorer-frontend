import {
  DURATION_SHORT_MOVIE,
  MESSAGE_NOTHING_FOUND,
  WIDTH_DESKTOP,
  WIDTH_MIDDLE,
  MOVIES_LIMIT,
} from '../constants/constants';

class MoviesEngine {
  constructor() {
    this._movies = [];
    this._savedMovies = [];
    this._filteredMovies = [];
    this._orderedSavedIDS = [];
    this._searchMoviesString = '';
    this._onlyShortMovies = false;
    this._searchSavedMoviesString = '';
    this._onlyShortSavedMovies = false;
    this._moviesLimit = 0;
    this._moviesMore = 0;
  }

  _getLimitSelector(windowSize) {
    if (windowSize >= WIDTH_DESKTOP) {
      return 'DESKTOP';
    } else if (windowSize >= WIDTH_MIDDLE) {
      return 'MIDDLE';
    }
    return 'MOBILE';
  }

  setLimitMovies(windowSize) {
    const limit = MOVIES_LIMIT[this._getLimitSelector(windowSize)];
    this._moviesLimit = limit.COUNT;
    this._moviesMore = limit.MORE;
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

  searchMovies(searchString, onlyShort, handleError) {
    this._searchMoviesString = searchString;
    this._onlyShortMovies = onlyShort;
    this._filteredMovies = this._searchInCollection(this._movies, searchString, onlyShort);
    if (!this._filteredMovies.length && handleError) {
      handleError(MESSAGE_NOTHING_FOUND);
    }
    return this._filteredMovies.slice(0, this._moviesLimit);
  }

  searchSavedMovies(searchString, onlyShort, handleError) {
    this._searchSavedMoviesString = searchString;
    this._onlyShortSavedMovies = onlyShort;
    const result = this._searchInCollection(this._savedMovies, searchString, onlyShort);
    if (!result.length && handleError) {
      handleError(MESSAGE_NOTHING_FOUND);
    }
    return result
  }

  _searchInCollection(collection, searchString, onlyShort) {
    return collection.filter(item => {
      return !onlyShort && 
        (item.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchString.toLowerCase())) ||
        onlyShort && item.duration <= DURATION_SHORT_MOVIE &&
        (item.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchString.toLowerCase()));
    });
  }

  getMoreMovies(currentCount) {
    return this._filteredMovies.slice(currentCount, currentCount + this._moviesMore);
  }

  getIsMoreMovies(lengthState) {
    return this._filteredMovies.length > lengthState;
  }

  getSearchMoviesString() {
    return this._searchMoviesString;
  }

  getOnlyShortMovies() {
    return this._onlyShortMovies;
  }

  getSearchSavedMoviesString() {
    return this._searchSavedMoviesString;
  }

  getOnlyShortSavedMovies() {
    return this._onlyShortSavedMovies;
  }

  getIsMovieSaved(id) {
    return this._orderedSavedIDS[id];
  }
}

const engine = new MoviesEngine();

export default engine;