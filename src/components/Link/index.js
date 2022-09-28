import { NavLink } from 'react-router-dom';
import './Link.css';

function LinkComponent({ children, href, className, activeClassName }) {
  return (
    <NavLink to={href} activeClassName={activeClassName} className={className}>
      {children}
    </NavLink>
  )
}

export default LinkComponent;