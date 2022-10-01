import { Route, Switch } from 'react-router-dom'
import './App.css';
import Main from '../../pages/Main';
import Movies from '../../pages/Movies';

function App() {
  return (
    <div className='page'>
      <Switch>
        <Route exact path='/'>
          <Main loggedIn={true} />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
      </Switch>
    </div>
  )
}

export default App;