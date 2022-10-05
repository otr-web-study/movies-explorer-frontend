import './Preloader.css'

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
      <div className='preloader__cover'></div>
    </div>
  )
};

export default Preloader
