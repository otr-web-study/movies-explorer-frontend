import './Main.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Promo from '../../components/Promo';
import AboutProject from '../../components/AboutProject';
import Techs from '../../components/Techs';
import AboutMe from '../../components/AboutMe';
import Portfolio from '../../components/Portfolio';
import Preloader from '../../components/Preloader/Preloader';

function Main({isPending}) {
  return (
    <>
      {isPending ?
        <Preloader isMain={true} />:
        <Container className='container page__container main'>
          <Header />
          <main>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </main>
          <Footer />
        </Container>
      }
    </>
  )
}

export default Main;