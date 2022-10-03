import './MoviesCardList.css';
import MoviesCard from '../MoviesCard';

function MoviesCardList({ cards }) {
  const cardsElement = cards.map(item => {
    return (
      <li key={item.id}>
        <MoviesCard card={item} />
      </li>
    )});

  return (
    <>
      <ul className='card-list'>
        {cardsElement}
      </ul>
    </>
  );
}

export default MoviesCardList;