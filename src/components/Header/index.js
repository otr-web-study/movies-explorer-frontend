import './Header.css';
import Navigation from '../Navigation';
import NavigationExt from '../NavigationExt';
import Logo from '../Logo';

function Header( { loggedIn }) {
  return (
    <header className='header'>
      <Logo />
      {
        loggedIn ? 
          <NavigationExt />: 
          <Navigation />
      }
    </header>
  );
}

export default Header;
