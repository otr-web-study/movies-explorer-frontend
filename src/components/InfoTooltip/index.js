import { useEffect } from 'react';

import './InfoTooltip.css';
import Button from '../Button';
import { ESC_KEY, ENTER_KEY } from '../../constants/constants';

function InfoTooltip({data, onClose}) {
  const { message='', isSuccess=false } = data;

  useEffect(() => {
    if (message) {
      const handleEscClose = (evt) => {
        if (evt.key ===  ESC_KEY || evt.key === ENTER_KEY) {
          evt.preventDefault();   
          onClose();
        }
      }

      window.addEventListener('keydown', handleEscClose);

      return () => window.removeEventListener('keydown', handleEscClose);
    }
  }, [message]);

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
        <div
          className={`info-tooltip__logo ${isSuccess ? 'info-tooltip__logo_type_success': 'info-tooltip__logo_type_fail'}`}>  
        </div>
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