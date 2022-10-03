import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import MoviesCardList from '../../components/MoviesCardList';
import { getMovies } from '../../data/fixtures';

function Movies() {
  const cards = getMovies(12);

  return (
    <Container className='container page__container'>
      <Header loggedIn={true} />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList cards={cards} />
      </section>
      <Footer />
    </Container>
  );
}

export default Movies;