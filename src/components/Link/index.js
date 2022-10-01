import { NavLink } from 'react-router-dom';
import './Link.css';

function LinkComponent({ children, href, exact, className, activeClassName }) {
  return (
    <NavLink to={href} exact={exact} activeClassName={activeClassName} className={className}>
      {children}
    </NavLink>
  )
}

export default LinkComponent;