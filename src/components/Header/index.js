import { useState } from 'react';
import './Header.css';
import Navigation from '../Navigation';
import NavigationMain from '../NavigationMain';
import Logo from '../Logo';

function Header( { loggedIn }) {
  const [isHamburgerToggle, setIsHamburgerToggle] = useState(false);

  const handleHamburgerToggle = () => {
    setIsHamburgerToggle(!isHamburgerToggle);
  }

  return (
    <header className='header'>
      <Logo />
      {loggedIn ? <Navigation isActive={isHamburgerToggle}/>: <NavigationMain />}
    </header>
  );
}

export default Header;
