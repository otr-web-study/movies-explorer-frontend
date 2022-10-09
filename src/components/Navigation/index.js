import Link from '../Link';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <Link href='/signup' className='link navigation__link'>
        Регистрация
      </Link>
      <Link 
        href='/signin'
        className='link navigation__link navigation__link_accented'>
        Войти
      </Link>
    </nav>
  )
}

export default Navigation