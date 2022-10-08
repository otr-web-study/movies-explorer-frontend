import './Main.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Promo from '../../components/Promo';
import AboutProject from '../../components/AboutProject';
import Techs from '../../components/Techs';
import AboutMe from '../../components/AboutMe';
import Portfolio from '../../components/Portfolio';

function Main({ loggedIn }) {
  return (
    <Container className='container page__container main'>
      <Header loggedIn={loggedIn} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </Container>
  )
}

export default Main;