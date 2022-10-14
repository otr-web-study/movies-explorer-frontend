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
        .catch(err => handleError(err))
        .finally(() => setIsPendingServerResponse(false));
    } else {
      setIsPendingServerResponse(false);
    }
  }, []);

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
    localStorage.setItem('jwt', '');
    setCurrentUser({});
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
      Promise.all([mainApi.getMovies(), moviesApi.getMovies()])
        .then(([savedMovies, movies]) => engine.loadData(savedMovies, movies))
        .then(() => engine.searchMovies(searchString, onlyShort, handleError))
        .then((newMovies) => setMovies(newMovies))
        .catch(() => handleError(MESSAGE_API_ERROR))
        .finally(() => setIsPendingServerResponse(false));
    }
  }

  const handleMoreClick = () => {
    setMovies([...movies, ...engine.getMoreMovies(movies.length)]);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main isPending={isPendingServerResponse} />
          </Route>
          <Route 
            path='/signup'>
            <Register
              onSubmit={handleRegister}
              isPending={isPendingServerResponse} />
          </Route>
          <Route path='/signin'>
            <Login
              onSubmit={handleLogin}
              isPending={isPendingServerResponse} />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            engine={engine}
            movies={movies}
            onSearch={handleSearchMovies}
            onMoreClick={handleMoreClick}
            isPending={isPendingServerResponse} />
          <ProtectedRoute
            path='/saved-movies'
            component={MoviesSaved} />
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