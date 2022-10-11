import { Route, Switch } from 'react-router-dom';
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
import { checkAndSetJWT, checkAndSetUserData } from '../../utils/utils';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPendingServerResponse, setIsPendingServerResponse] = useState(false);
  const [InfoTooltipData, setInfoTooltipData] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserData(jwt)
        .then((data) => {
          if (data) {
            setCurrentUser(data);
            history.push('/movies');
          }
        })
        .catch(err => {console.log(err)});
    }
  }, []);

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
      .catch(err => setInfoTooltipData({data: err}))
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
      .catch(err => setInfoTooltipData({data: err}))
      .finally(() => {setIsPendingServerResponse(false)});
  }

  const handleLogout = () => {
    localStorage.setItem('jwt', '');
    setCurrentUser({});
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={false} />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>
          <Route path='/signin'>
            <Login />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies} />
          <ProtectedRoute
            path='/saved-movies'
            component={MoviesSaved} />
          <ProtectedRoute
            path='/profile'
            component={Profile} />
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={false}
          onClose={()=>console.log('hello')}
          message="Hi, I'm an error message" />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;