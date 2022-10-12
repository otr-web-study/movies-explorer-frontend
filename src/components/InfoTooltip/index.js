import { useEffect } from 'react';

import './InfoTooltip.css';
import Button from '../Button';

function InfoTooltip({message, onClose}) {
  const ESC_KEY = 'Escape';

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key ===  ESC_KEY) {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscClose);

    return () => window.removeEventListener('keydown', handleEscClose);
  }, []);

  const handlePopupMouseDown = (evt) => {
    if (evt.target.classList.contains('info-tooltip__close-button')
        || evt.target.classList.contains('info-tooltip__close-button-form')
        || evt.target.classList.contains('info-tooltip')) {
      onClose();
    }
  };

  return (
    <div 
      className={`info-tooltip ${message && 'info-tooltip_opened'}`}
      onMouseDown={handlePopupMouseDown}>
      <div className='info-tooltip__container'>
        <div className='info-tooltip__logo'></div>
        <h2 className='info-tooltip__title'>
          {message}
        </h2>
        <Button 
          className='info-tooltip__close-button-form'
          title='Закрыть'/>
        <Button 
          className='info-tooltip__close-button' 
          type='button' 
          ariaLabel='Закрыть'/>
      </div>
    </div>
  );
}

export default InfoTooltip;