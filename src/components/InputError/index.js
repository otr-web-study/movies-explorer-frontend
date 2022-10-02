import './InputError.css';

function InputError({ isValid, className }) {
  return (
    <span 
      className={`input-error ${!isValid && 'input-error_active'} ${className || ''}`}>
      {!isValid && 'some error'}
    </span>
  );
}

export default InputError;