import { useState, useEffect } from 'react';
import './SideBar.css';
import Hamburger from '../Hamburger';
import Button from '../Button';
import LinkComponent from '../Link';
import Avatar from '../Avatar';

function SideBar() {
  const [isHamburgerToggle, setIsHamburgerToggle] = useState(false);

  const handleHamburgerToggle = () => {
    setIsHamburgerToggle(!isHamburgerToggle);
  }

  const handleResize = () => {
    if (window.innerWidth > 1279) {
      setIsHamburgerToggle(false);
    }
  };

  useEffect(() => {
    if (isHamburgerToggle) {
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isHamburgerToggle]);

  return (
    <>
      <Hamburger onClick={handleHamburgerToggle} />
      <div className={`sidebar__cover ${isHamburgerToggle && 'sidebar__cover_active'}`}></div>
      <div className={`sidebar ${isHamburgerToggle && 'sidebar_active'}`}>
        <Button className='sidebar__button' onClick={handleHamburgerToggle} />
        <nav className='sidebar__navigation'>
          <LinkComponent
            onClick={handleHamburgerToggle}
            href='/'
            exact
            className='link sidebar__link'
            activeClassName='sidebar__link_active'>Главная</LinkComponent>
          <LinkComponent
            onClick={handleHamburgerToggle}
            href='/movies'
            className='link sidebar__link'
            activeClassName='sidebar__link_active'>Фильмы</LinkComponent>
          <LinkComponent
            onClick={handleHamburgerToggle}
            href='/saved-movies'
            className='link sidebar__link'
            activeClassName='sidebar__link_active'>Сохраненные фильмы</LinkComponent>
          <LinkComponent
            onClick={handleHamburgerToggle}
            href='/profile'
            className='link sidebar__link sidebar__link_type_avatar'
            activeClassName='sidebar__link_active'>
              Аккаунт
            <Avatar />
          </LinkComponent>
        </nav>
      </div>
    </>
  );
}

export default SideBar;