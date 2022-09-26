import './Main.css';
import Container from '../../components/Container';


function Main({ loggedIn }) {
  return (
    <Container className='main' loggedIn={loggedIn}>
      <div>
        hello, world
      </div>
    </Container>
  )
}

export default Main;