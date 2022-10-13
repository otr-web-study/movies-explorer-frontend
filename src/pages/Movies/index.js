import './Movies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import Button from '../../components/Button';
import Preloader from '../../components/Preloader/Preloader';

function Movies({engine, onSearch, isPending}) {
  const cards = engine.getMoviesState();
  const isMoreMovies = engine.getIsMoreMovies();

  const handleMoreButtonClick = () => {
    console.log('еще')
  }

  return (
    <Container className='container page__container container__movies'>
      <div>
        <Header />
        <section className='movies'>
          <SearchForm onSubmit={onSearch} engine={engine} />
          <MoviesCardList cards={cards} />
          {isMoreMovies && <Button 
            title='Ещё' 
            className='movies__button-more'
            onClick={handleMoreButtonClick} />}
          {isPending && <Preloader />}
        </section>
      </div>
      <Footer />
    </Container>
  );
}

export default Movies;