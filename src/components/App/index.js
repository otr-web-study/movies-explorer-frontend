import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import MoviesSaved from '../../pages/SavedMovies';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';
import InfoTooltip from '../InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthProtectedRoute from '../AuthProtectedRoute';
import { CurrentUser as CurrentUserContext } from '../../contexts/CurrentUser'
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { checkAndSetJWT, checkAndSetUserData, getErrorMessage } from '../../utils/utils';
import { MESSAGE_USER_DATA_UPDATED, MESSAGE_API_ERROR } from '../../constants/constants';
import engine from '../../utils/MoviesEngine';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPendingServerResponse, setIsPendingServerResponse] = useState(true);
  const [InfoTooltipData, setInfoTooltipData] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');

    engine.setLimitMovies(window.innerWidth);

    if (jwt) {
      mainApi.getUserData(jwt)
        .then((data) => {
          if (data) {
            setCurrentUser(data);
            history.push(path);      
          }
        })
        .catch(err => {
          setCurrentUser({});
          setSavedMovies([]);
          setMovies([]);
          engine.logout();
          handleError(err);
        })
        .finally(() => setIsPendingServerResponse(false));
    } else {
      setIsPendingServerResponse(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser._id) {
      setMovies(engine.getStoredMovies());
      mainApi.getMovies()
        .then((movies) => engine.loadSavedMovies(movies))
        .then(() => setSavedMovies(engine.getSavedMovies()))
    }

  }, [currentUser._id]);

  const handleError = (err) => {
    const message = getErrorMessage(err);

    if (message) {
      setInfoTooltipData({message});
    }
  }

  const handleRegister = (name, email, password) => {
    setIsPendingServerResponse(true);
    
    mainApi.register(name, email, password)
      .then(() => mainApi.login(email, password))
      .then((data) => checkAndSetJWT(data))
      .then(() => mainApi.getUserData())
      .then((userData) => {
        checkAndSetUserData(userData, setCurrentUser);
        history.push('/movies');
      })
      .catch(err => handleError(err))
      .finally(() => setIsPendingServerResponse(false));
  }

  const handleLogin = (email, password) => {
    setIsPendingServerResponse(true);

    mainApi.login(email, password)
      .then((data) => checkAndSetJWT(data))
      .then(() => mainApi.getUserData())
      .then((userData) => {
        checkAndSetUserData(userData, setCurrentUser);
        history.push('/movies');
      })
      .catch(err => handleError(err))
      .finally(() => setIsPendingServerResponse(false));
  }

  const handleChangeProfile = (userData) => {
    setIsPendingServerResponse(true);

    mainApi.updateUserData(userData)
      .then((newUserData) => {
        checkAndSetUserData(newUserData, setCurrentUser);
        setInfoTooltipData({message: MESSAGE_USER_DATA_UPDATED, isSuccess: true});
      })
      .catch(err => handleError(err))
      .finally(() => setIsPendingServerResponse(false));
  }

  const handleLogout = () => {
    setCurrentUser({});
    setSavedMovies([]);
    setMovies([]);
    engine.logout();
    history.push('/');
  }

  const handleCloseInfoTooltip = () => {
    setInfoTooltipData({});
  }

  const handleSearchMovies = (searchString, onlyShort) => {
    if (engine.isDataReceived()) {
      setMovies(engine.searchMovies(searchString, onlyShort, handleError));
    } else {
      setIsPendingServerResponse(true);
      moviesApi.getMovies()
        .then((movies) => engine.loadMovies(movies))
        .then(() => setMovies(engine.searchMovies(searchString, onlyShort, handleError)))
        .then(() => engine.saveState())
        .catch(() => handleError(MESSAGE_API_ERROR))
        .finally(() => setIsPendingServerResponse(false));
    }
  }

  const handleSearchSavedMovies = (searchString, onlyShort) => {
    setSavedMovies(engine.searchSavedMovies(searchString, onlyShort, handleError));
  }

  const handleMoreClick = () => {
    setMovies([...movies, ...engine.getMoreMovies(movies.length)]);
  }

  const handleLikeClick = (card) => {
    setIsPendingServerResponse(true);

    mainApi.createMovie(engine.getNewMovieForSave(card))
      .then((newSavedMovie) => engine.handleSaveMovie(newSavedMovie))
      .then(() => setSavedMovies(engine.getSavedMovies()))
      .catch((err) => handleError(err))
      .finally(() => setIsPendingServerResponse(false));
  }

  const handleUnlikeClick = (card) => {
    setIsPendingServerResponse(true);

    const [id, movieId] = engine.getIdsForDelete(card);

    mainApi.deleteMovie(id)
      .then(() => engine.handleDeleteMovie(movieId))
      .then(() => setSavedMovies(engine.getSavedMovies()))
      .catch((err) => handleError(err))
      .finally(() => setIsPendingServerResponse(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main isPending={isPendingServerResponse} />
          </Route>
          <AuthProtectedRoute 
            path='/signup'
            component={Register}
            onSubmit={handleRegister}
            handleError={handleError}
            isPending={isPendingServerResponse} />
          <AuthProtectedRoute 
            path='/signin'
            component={Login}
            onSubmit={handleLogin}
            handleError={handleError}
            isPending={isPendingServerResponse} />
          <ProtectedRoute
            path='/movies'
            component={Movies}
            engine={engine}
            movies={movies}
            onSearch={handleSearchMovies}
            onMoreClick={handleMoreClick}
            onLikeClick={handleLikeClick}
            onUnlikeClick={handleUnlikeClick}
            isPending={isPendingServerResponse} />
          <ProtectedRoute
            path='/saved-movies'
            component={MoviesSaved}
            engine={engine}
            movies={savedMovies}
            onSearch={handleSearchSavedMovies}
            onUnlikeClick={handleUnlikeClick} />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            onSubmit={handleChangeProfile}
            onLogout={handleLogout}
            isPending={isPendingServerResponse} />
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          data={InfoTooltipData}
          onClose={handleCloseInfoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;