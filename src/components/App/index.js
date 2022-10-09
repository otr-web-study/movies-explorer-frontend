import { Route, Switch } from 'react-router-dom';

import './App.css';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import MoviesSaved from '../../pages/SavedMovies';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';
import InfoTooltip from '../InfoTooltip';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Main loggedIn={false} />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <MoviesSaved />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <InfoTooltip
        isOpen={false}
        onClose={()=>console.log('hello')}
        message="Hi, I'm an error message" />
    </div>
  )
}

export default App;