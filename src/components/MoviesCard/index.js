import './MoviesCard.css';
import { formatTime } from '../../utils/formatTime';
import ExternalLink from '../ExternalLink';
import Button from '../Button';

function MoviesCard({ card, isSaved, onClick }) {
  const { duration, image, nameRU, trailerLink } = card;

  const handleSaveButtonClick = () => {
    onClick(isSaved);
  }

  return (
    <div className='movies-card'>
      <ExternalLink href={trailerLink} className='external-link movies-card__link'>
        <img 
          src={`https://api.nomoreparties.co${image.url}`}
          alt={nameRU}
          className='movies-card__image'>
        </img>
      </ExternalLink>
      {isSaved ?
        <Button
          className='movies-card__remove-button'
          onClick={handleSaveButtonClick} />:
        <Button
          className='movies-card__save-button'
          title='Сохранить'
          onClick={handleSaveButtonClick} />}
      <div className='movies-card__container'>
        <p className='movies-card__caption'>
          {card.nameRU}
        </p>
        <p className='movies-card__duration'>
          {formatTime(duration)}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;