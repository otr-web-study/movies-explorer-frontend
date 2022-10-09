import './AuthForm.css';
import LinkComponent from '../../components/Link';
import Button from '../../components/Button';

function AuthForm({name, children, onSubmit, submitTitle, caption, href, linkTitle, isValid}) {
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
      <div className='auth-form__elements'>
        {children}
      </div>
      <div className='auth-form__footer'>
        <Button
          className={`auth-form__button-submit ${!isValid && 'auth-form__button-submit_inactive'}`}
          title={submitTitle}
          type='submit'
          disabled={!isValid} />
        <div className='auth-form__container'>
          <p className='auth-form_text'>
            {caption}
          </p>
          <LinkComponent href={href} className='link auth-form__link'>
            {linkTitle}
          </LinkComponent>
        </div>
      </div>
    </form>
  );
}

export default AuthForm;