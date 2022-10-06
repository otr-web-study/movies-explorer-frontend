import './NotFound.css';
import Container from '../../components/Container';
import Button from '../../components/Button';

function NotFound() {
  const handleButtonBackClick = () => {

  }
  return (
    <Container className='container page__container'>
      <section className='not-found'>
        <div className='not-found__elements'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__text'>Страница не найдена</p>
        </div>
        <Button
          title='Назад'
          className='not-found__button-back'
          onClick={handleButtonBackClick} />
      </section>
    </Container>
  );
}

export default NotFound;