import { Route, Switch } from 'react-router-dom'
import './App.css';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';
import MoviesSaved from '../../pages/SavedMovies';
import Register from '../../pages/Register';

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
      </Switch>
    </div>
  )
}

export default App;