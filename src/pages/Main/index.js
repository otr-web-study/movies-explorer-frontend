import './Main.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Promo from '../../components/Promo';
import AboutProject from '../../components/AboutProject';
import Techs from '../../components/Techs';

function Main({ loggedIn }) {
  return (
    <Container className='container page__container main'>
      <Header loggedIn={loggedIn} />
      <Promo />
      <Footer />
      <AboutProject />
      <Techs />
    </Container>
  )
}

export default Main;