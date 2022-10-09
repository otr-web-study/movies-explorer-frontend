import { useState } from 'react';

import './SavedMovies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import { getMovies } from '../../data/fixtures';
import Footer from '../../components/Footer';

function MoviesSaved() {
  const [cards, setCards] = useState(getMovies(3));

  const handleSearchButtonClick = (searchString) => console.log(searchString)

  return (
    <Container className='container page__container container__saved-movies'>
      <div>
        <Header loggedIn={true} />
        <section className='saved-movies'>
          <SearchForm onSubmit={handleSearchButtonClick} />
          <MoviesCardList cards={cards} isSavedPage={true} />
        </section>
      </div>
      <Footer />
    </Container>
  );
}

export default MoviesSaved;