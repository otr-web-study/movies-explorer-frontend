import './AboutMe.css';
import image from '../../images/Python.jpg';
import Title from '../Title';
import ExternalLink from '../ExternalLink';

function AboutMe() {
  return (
    <section className='about-me'>
      <Title className='title about-me__title'>Студент</Title>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Олег</h3>
          <p className='about-me__specialization'>Full-stack разработчик, 43 года</p>
          <p className='about-me__text'>
            Родился, вырос, женился, работал, развелся, учусь, счастлив.
            А если серьезно, работал 1С-разработчиком, решил переквалифицироваться
            и вот я уже пишу второй диплом по новой специальности :&#x29;
          </p>
          <ExternalLink
            href='https://github.com/otr-web-study'
            className='external-link about-me__link'>
            Github
          </ExternalLink>
        </div>
        <img className='about-me__image' alt='Фото студента' src={image}></img>
      </div>
    </section>
  );
}

export default AboutMe;