import { Route, Switch } from 'react-router-dom'
import './App.css';
import Main from '../../pages/Main';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main loggedIn={true} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;