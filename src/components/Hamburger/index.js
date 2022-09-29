import './Hamburger.css'

function Hamburger({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='hamburger'>
      <div className='hamburger__button'></div>
    </div>
  );
}

export default Hamburger;