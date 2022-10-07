import { useHistory } from 'react-router-dom';

import './NotFound.css';
import Container from '../../components/Container';
import Button from '../../components/Button';

function NotFound() {
  const history = useHistory();
  
  const handleButtonBackClick = () => {
    history.goBack();
  }

  return (
    <Container className='container page__container'>
      <section className='not-found'>
        <div className='not-found__elements'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__text'>Страница не найдена</p>
          <Button
            title='Назад'
            className='not-found__button-back'
            onClick={handleButtonBackClick} />
        </div>
      </section>
    </Container>
  );
}

export default NotFound;