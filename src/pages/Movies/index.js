import { useState, useEffect } from 'react';

import './Movies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import Button from '../../components/Button';
import Preloader from '../../components/Preloader/Preloader';
import { getMovies } from '../../data/fixtures';

function Movies() {
  const [isPending, setIsPending] = useState(false);
  const [cards, setCards] = useState([]);
  const [isMoreMovies, setIsMoreMovies] = useState(false);

  const handleMoreButtonClick = () => {
    console.log('еще')
  }

  const handleSearchButtonClick = (searchString) => {
    setIsPending(true);

    setTimeout(() => {
      console.log(searchString);
      setCards(getMovies(12));
      setIsMoreMovies(true);
      setIsPending(false);
    }, 2000);
  }

  useEffect(() => handleSearchButtonClick('tst'), [])

  return (
    <Container className='container page__container container__movies'>
      <div>
        <Header />
        <section className='movies'>
          <SearchForm onSubmit={handleSearchButtonClick} />
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