import './MoviesCard.css';
import { formatTime } from '../../utils/formatTime';
import ExternalLink from '../ExternalLink';
import Button from '../Button';
import { IMAGE_BASE_URL } from '../../constants/constants';

function MoviesCard({ card, isSaved, isSavedPage, onLikeClick, onUnlikeClick }) {
  const { duration, image, nameRU, trailerLink } = card;

  const handleLikeClick = () =>{
    onLikeClick && onLikeClick(card);
  }

  const handleUnlikeClick = () => {
    onUnlikeClick && onUnlikeClick(card);
  }

  return (
    <div className='movies-card'>
      <ExternalLink href={trailerLink} className='external-link movies-card__link'>
        <img 
          src={`${IMAGE_BASE_URL}${isSavedPage ? image: image.url}`}
          alt={nameRU}
          className='movies-card__image'>
        </img>
      </ExternalLink>
      {isSaved || isSavedPage ?
        <Button
          className={`movies-card__remove-button ${isSavedPage && 'movies-card__remove-button_type_saved-page'}`}
          onClick={handleUnlikeClick} />:
        <Button
          className='movies-card__save-button'
          title='Сохранить'
          onClick={handleLikeClick} />}
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