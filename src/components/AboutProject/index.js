import './AboutProject.css';
import Title from '../Title';

function AboutProject() {
  return (
    <section className='about-project'>
      <Title className='title about-project__title'>О проекте</Title>
      <ul className='about-project__table'>
        <li>
          <h3 className='about-project__heading'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className='about-project__heading'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые 
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__timeline'>
        <p className='about-project__time-text about-project__time-text_accented'>
          1 неделя
        </p>
        <p className='about-project__time-text'>
          4 недели
        </p>
        <p className='about-project__time-caption'>
          Back-end
        </p>
        <p className='about-project__time-caption'>
          Front-end
        </p>
      </div>
    </section>
  );
}

export default AboutProject;