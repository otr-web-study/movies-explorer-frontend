import './Footer.css';
import ExternalLink from '../ExternalLink';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__container'>
        <p className='footer__copyright'>
          &copy; 2022
        </p>
        <nav>
          <ul className='footer_links'>
            <li>
              <ExternalLink 
                href='https://practicum.yandex.ru/'
                className='external-link footer__link'>Яндекс.Практикум</ExternalLink>
            </li>
            <li>
              <ExternalLink 
                href='https://github.com/otr-web-study'
                className='external-link footer__link'>Github</ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;