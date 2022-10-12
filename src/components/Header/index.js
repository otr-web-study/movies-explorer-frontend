import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';
import './Header.css';
import Navigation from '../Navigation';
import NavigationExt from '../NavigationExt';
import Logo from '../Logo';

function Header() {
  const loggedIn = Boolean(useContext(CurrentUser)._id);

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