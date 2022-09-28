import Footer from '../Footer';
import Header from '../Header';
import './Container.css';

function Container({ children, className, loggedIn }) {
  return (
    <div className={className}>
      <Header loggedIn={loggedIn} />
      {children}
      <Footer />
    </div>
  );
}

export default Container