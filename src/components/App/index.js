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
import moviesApi from '../../utils/MoviesApi'
import { checkAndSetJWT, checkAndSetUserData, getErrorMessage } from '../../utils/utils';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPendingServerResponse, setIsPendingServerResponse] = useState(true);
  const [InfoTooltipMessage, setInfoTooltipMessage] = useState('');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    console.log(path);
    const jwt = localStorage.getItem('jwt');

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
    console.log(err.text);
    const message = getErrorMessage(err);

    if (message) {
      setInfoTooltipMessage(message);
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
      .finally(() => {setIsPendingServerResponse(false)});
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
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleChangeProfile = (userData) => {
    console.log(userData);
  }

  const handleLogout = () => {
    localStorage.setItem('jwt', '');
    setCurrentUser({});
    history.push('/');
  }

  const handleCloseInfoTooltip = () => {
    setInfoTooltipMessage('');
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
            component={Movies} />
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
          message={InfoTooltipMessage}
          onClose={handleCloseInfoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;