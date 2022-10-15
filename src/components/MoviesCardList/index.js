import './MoviesCardList.css';
import MoviesCard from '../MoviesCard';

function MoviesCardList({ movies, engine, isSavedPage, ...props }) {
  const cardsElement = movies.map(item => {
    const isSaved = isSavedPage || engine.getIsMovieSaved(item.id);

    return (
      <li key={isSavedPage ? item._id: item.id}>
        <MoviesCard card={item} isSaved={isSaved} isSavedPage={isSavedPage} {...props} />
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