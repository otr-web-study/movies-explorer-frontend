import { useEffect } from 'react';
import './Preloader.css'
import { ENTER_KEY } from '../../constants/constants';

const Preloader = ({isMain}) => {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === ENTER_KEY) {
        evt.preventDefault();   
      }
    }

    window.addEventListener('keydown', handleEscClose);

    return () => window.removeEventListener('keydown', handleEscClose);
  })
  return (
    <div className='preloader'>
      <div className='preloader__container'>
        <span className='preloader__round'></span>
      </div>
      <div className={`preloader__cover ${isMain && 'preloader__cover_type_main'}`}></div>
    </div>
  )
};

export default Preloader
