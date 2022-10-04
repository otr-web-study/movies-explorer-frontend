import './Movies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import Button from '../../components/Button';
import { getMovies } from '../../data/fixtures';

function Movies() {
  const cards = getMovies(12);

  const handleMoreButtonClick = () => {
    console.log('еще')
  }

  return (
    <Container className='container page__container'>
      <Header loggedIn={true} />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList cards={cards} />
        <Button 
          title='Ещё' 
          className='movies__button-more'
          onClick={handleMoreButtonClick} />
      </section>
      <Footer />
    </Container>
  );
}

export default Movies;