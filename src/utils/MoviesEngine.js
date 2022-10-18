import {
  DURATION_SHORT_MOVIE,
  MESSAGE_NOTHING_FOUND,
  WIDTH_DESKTOP,
  WIDTH_MIDDLE,
  WIDTH_MOBILE,
  COUNT_CARDS_DESKTOP_WIDTH,
  COUNT_CARDS_MIDDLE_WIDTH,
  COUNT_CARDS_MOBILE_WIDTH,
  COUNT_CARDS_DESKTOP_WIDTH_MORE,
  COUNT_CARDS_MIDDLE_WIDTH_MORE,
  COUNT_CARDS_MOBILE_WIDTH_MORE,
} from '../constants/constants';

class MoviesEngine {
  constructor() {
    this._movies = [];
    this._savedMovies = [];
    this._filteredMovies = [];
    this._savedIDS = [];
    this._searchMoviesString = '';
    this._onlyShortMovies = false;
    this._searchSavedMoviesString = '';
    this._onlyShortSavedMovies = false;
    this._moviesLimit = 0;
    this._moviesMore = 0;

    this.restoreState();
  }

  _getWidthSelector(windowSize) {
    if (windowSize >= WIDTH_DESKTOP) {
      return WIDTH_DESKTOP;
    } else if (windowSize >= WIDTH_MIDDLE) {
      return WIDTH_MIDDLE;
    }
    return WIDTH_MOBILE;
  }

  setLimitMovies(windowSize) {
    switch(this._getWidthSelector(windowSize)) {
    case WIDTH_DESKTOP:
      this._moviesLimit = COUNT_CARDS_DESKTOP_WIDTH;
      this._moviesMore = COUNT_CARDS_DESKTOP_WIDTH_MORE;
      break;
    case WIDTH_MIDDLE:
      this._moviesLimit = COUNT_CARDS_MIDDLE_WIDTH;
      this._moviesMore = COUNT_CARDS_MIDDLE_WIDTH_MORE;
      break;
    case WIDTH_MOBILE:
      this._moviesLimit = COUNT_CARDS_MOBILE_WIDTH;
      this._moviesMore = COUNT_CARDS_MOBILE_WIDTH_MORE;
    }
  }

  isDataReceived() {
    return this._movies.length !== 0;
  }

  loadMovies(movies) {
    this._movies = movies;
    return Promise.resolve();
  }

  loadSavedMovies(savedMovies) {
    this._savedMovies = savedMovies;
    this._savedIDS = this._savedMovies.reduce((res, item) => {
      res[item.movieId] = true;
      return res;
    }, []);
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

  getStoredMovies() {
    return this._filteredMovies.slice(0, this._moviesLimit);
  }

  getSavedMovies() {
    return this._searchInCollection(this._savedMovies, this._searchSavedMoviesString, this._onlyShortSavedMovies);
  }

  _searchInCollection(collection, searchString, onlyShort) {
    return collection.filter(item => {
      return this._isMovieMatched(item, searchString, onlyShort);
    });
  }

  _isMovieMatched(movie, searchString, onlyShort) {
    return !onlyShort && 
      (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchString.toLowerCase())) ||
      onlyShort && movie.duration <= DURATION_SHORT_MOVIE &&
      (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchString.toLowerCase()));
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
    return this._savedIDS[id];
  }

  getIdsForDelete(card) {
    if (card._id && card.movieId) {
      return [card._id, card.movieId];
    }

    const savedCard = this._savedMovies.find(item => item.movieId === card.id);
    return [savedCard._id, savedCard.movieId];
  }

  handleDeleteMovie(id) {
    this._savedIDS[id] = false;
    this._savedMovies = this._savedMovies.filter(item => item.movieId !== id);
  }

  getNewMovieForSave(movie) {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: movie.image.formats.thumbnail.url,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      movieId: movie.id,
    };
  }

  handleSaveMovie(newMovie) {
    this._savedMovies.push(newMovie);
    this._savedIDS[newMovie.movieId] = true;
  }

  saveState() {
    const state = {
      searchString: this._searchMoviesString,
      onlyShort: this._onlyShortMovies,
      filteredMovies: this._filteredMovies,
    }

    localStorage.setItem('state', JSON.stringify(state));
  }

  restoreState() {
    const storedState = localStorage.getItem('state');
    if (!storedState) {
      return;
    }

    const state = JSON.parse(storedState);
    this._searchMoviesString = state.searchString;
    this._onlyShortMovies = state.onlyShort;
    this._filteredMovies = state.filteredMovies;
  }

  logout() {
    localStorage.clear();
    this._movies = [];
    this._savedMovies = [];
    this._filteredMovies = [];
    this._savedIDS = [];
    this._searchMoviesString = '';
    this._onlyShortMovies = false;
    this._searchSavedMoviesString = '';
    this._onlyShortSavedMovies = false;
  }
}

const engine = new MoviesEngine();

export default engine;