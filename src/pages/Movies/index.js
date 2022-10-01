import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';

function Movies() {
  return (
    <Container className='container page__container'>
      <Header loggedIn={true} />
      <section className='movies'>
        <SearchForm />
      </section>
      <Footer />
    </Container>
  );
}

export default Movies;