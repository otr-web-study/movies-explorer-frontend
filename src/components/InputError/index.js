import './InputError.css';

function InputError({ isValid, className='', errorMessage }) {
  return (
    <span 
      className={`input-error ${!isValid && 'input-error_active'} ${className}`}>
      {!isValid && errorMessage}
    </span>
  );
}

export default InputError;