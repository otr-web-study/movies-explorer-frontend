import './MoviesCardList.css';
import MoviesCard from '../MoviesCard';

function MoviesCardList({ cards }) {
  const cardsElement = cards.map(item => {
    const isSaved = item.id % 4 === 0;

    return (
      <li key={item.id}>
        <MoviesCard card={item} isSaved={isSaved} />
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