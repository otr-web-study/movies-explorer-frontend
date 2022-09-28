import { useState } from 'react';
import './NavigationExt.css';
import Link from '../Link';
import Avatar from '../Avatar';

function NavigationExt() {
  const [isHamburgerToggle, setIsHamburgerToggle] = useState(false);

  const handleHamburgerToggle = () => {
    setIsHamburgerToggle(!isHamburgerToggle);
  }

  return (
    <>
      <nav className='navigation-ext'>
        <Link 
          href='/movies'
          className='link navigation-ext__link'
          activeClassName='navigation-ext__link_active'>Фильмы</Link>
        <Link
          href='/saved-movies'
          className='link navigation-ext__link'
          activeClassName='navigation-ext__link_active'>Сохраненные фильмы</Link>
        <Link
          href='/profile'
          className='link navigation-ext__link navigation-ext__link_type_avatar'>
          Аккаунт
          <Avatar />
        </Link>
      </nav>
    </>
  )
}

export default NavigationExt