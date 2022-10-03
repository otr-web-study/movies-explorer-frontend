import './MoviesCard.css';

function MoviesCard({card}) {
  return (
    <div className='movies-card'>
      <img 
        src={`https://api.nomoreparties.co${card.image.url}`}
        alt={card.nameRU}
        className='movies-card__image'></img>
      <div className='movies-card__container'>
        <caption className='movies-card__caption'>
          {card.nameRU}
        </caption>
        <p className='movies-card__duration'>
          {card.duration}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;