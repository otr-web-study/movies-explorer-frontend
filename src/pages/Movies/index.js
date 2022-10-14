import { useEffect } from 'react';
import './Movies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import Button from '../../components/Button';
import Preloader from '../../components/Preloader/Preloader';

function Movies({engine, movies, isPending, onSearch, onMoreClick}) {
  const isMoreMovies = engine.getIsMoreMovies(movies.length);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    engine.setLimitMovies(window.innerWidth);
  }

  return (
    <Container className='container page__container container__movies'>
      <div>
        <Header />
        <section className='movies'>
          <SearchForm onSubmit={onSearch} engine={engine} />
          <MoviesCardList movies={movies} engine={engine} />
          {isMoreMovies && <Button 
            title='Ещё' 
            className='movies__button-more'
            onClick={onMoreClick} />}
          {isPending && <Preloader />}
        </section>
      </div>
      <Footer />
    </Container>
  );
}

export default Movies;