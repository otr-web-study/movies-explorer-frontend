import './Portfolio.css';
import ExternalLink from '../ExternalLink';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__container'>
        <li className='portfolio__item'>
          <ExternalLink 
            href='https://otr-web-study.github.io/how-to-learn/'
            className='external-link portfolio__link'>
            Статичный сайт
            <span>&#8599;</span>
          </ExternalLink>
        </li>
        <li className='portfolio__item'>
          <ExternalLink 
            href='https://otr-web-study.github.io/my-third-project/'
            className='external-link portfolio__link'>
            Адаптивный сайт
            <span>&#8599;</span>
          </ExternalLink>
        </li>
        <li className='portfolio__item'>
          <ExternalLink 
            href='https://frontend.otrproject.nomoredomains.sbs'
            className='external-link portfolio__link'>
            Одностраничное приложение
            <span>&#8599;</span>
          </ExternalLink>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;