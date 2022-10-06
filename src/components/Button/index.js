import './Button.css';

function Button({ className='', title, onClick, type, disabled }) {
  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <button 
      className={`button ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}>
      {title}
    </button>
  );
}

export default Button;