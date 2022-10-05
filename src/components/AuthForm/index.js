import './AuthForm.css';
import Logo from '../../components/Logo';

function AuthForm({name, title, children, onSubmit}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <form 
      className='auth-form'
      onSubmit={handleSubmit}
      name={name}
      id={name}
      noValidate>
      <Logo className='auth-form__logo' />
      <h1 className='auth-form__title'>
        {title}
      </h1>
      {children}
    </form>
  );
}

export default AuthForm;