import { Link } from 'react-router-dom';
import './NavigationMain.css';

function NavigationMain() {
  return (
    <nav className='navigation-main'>
      <Link to='signup' className='navigation-main__link'>Регистрация</Link>
      <Link 
        to='signin'
        className='navigation-main__link navigation-main__link_accented'>
        Войти
      </Link>
    </nav>
  )
}

export default NavigationMain