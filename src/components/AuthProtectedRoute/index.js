import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';
import { MESSAGE_ALREADY_AUTHORIZED } from '../../constants/constants';


const AuthProtectedRoute = ({ component: Component, handleError, ...props }) => {
  const loggedIn = Boolean(useContext(CurrentUser)._id);

  loggedIn && setTimeout(() => handleError(MESSAGE_ALREADY_AUTHORIZED), 100);

  return (
    <Route>
      {() => !loggedIn ? <Component {...props} />: <Redirect to="/movies" />}
    </Route>
  );
};

export default AuthProtectedRoute;