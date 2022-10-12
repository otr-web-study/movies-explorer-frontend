import './Preloader.css'

const Preloader = ({isMain}) => {
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
