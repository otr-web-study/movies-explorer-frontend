import { NavLink } from 'react-router-dom';
import './Link.css';

function LinkComponent({ children, href, exact, className, activeClassName, onClick }) {
  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <NavLink
      to={href}
      exact={exact}
      onClick={handleClick}
      activeClassName={activeClassName}
      className={className}>
      {children}
    </NavLink>
  )
}

export default LinkComponent;