import './Button.css';

function Button({ className, title, onClick, type }) {
  return (
    <button 
      className={`button ${className || ''}`}
      onClick={onClick}
      type={type}>
      {title}
    </button>
  );
}

export default Button;