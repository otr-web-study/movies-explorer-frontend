import './Button.css';

function Button({className='', title, onClick, type='button', disabled, ariaLabel}) {
  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <button 
      className={`button ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}>
      {title}
    </button>
  );
}

export default Button;