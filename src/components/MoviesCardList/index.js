import './MoviesCardList.css';
import MoviesCard from '../MoviesCard';

function MoviesCardList({ movies, engine, isSavedPage }) {
  const cardsElement = movies.map(item => {
    const isSaved = engine.getIsMovieSaved(item.id);

    return (
      <li key={item.id}>
        <MoviesCard card={item} isSaved={isSaved} isSavedPage={isSavedPage} />
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