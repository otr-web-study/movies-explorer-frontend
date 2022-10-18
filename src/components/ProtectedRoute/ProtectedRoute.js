import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';


const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = Boolean(useContext(CurrentUser)._id);

  return (
    <Route>
      {() => loggedIn ? <Component {...props} />: <Redirect to="/" />}
    </Route>
  );
};

export default ProtectedRoute;