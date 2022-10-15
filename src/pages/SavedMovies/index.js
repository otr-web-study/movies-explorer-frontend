import './SavedMovies.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import Footer from '../../components/Footer';

function MoviesSaved({engine, onSearch, ...props}) {
  return (
    <Container className='container page__container container__saved-movies'>
      <div>
        <Header loggedIn={true} />
        <section className='saved-movies'>
          <SearchForm onSubmit={onSearch} engine={engine} isSavedPage={true} />
          <MoviesCardList engine={engine} isSavedPage={true} {...props} />
        </section>
      </div>
      <Footer />
    </Container>
  );
}

export default MoviesSaved;