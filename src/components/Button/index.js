import './Button.css';

function Button({ className, title, onClick, type }) {
  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <button 
      className={`button ${className || ''}`}
      onClick={handleClick}
      type={type}>
      {title}
    </button>
  );
}

export default Button;