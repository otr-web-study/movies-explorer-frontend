import './Login.css';
import Container from '../../components/Container';
import InputError from '../../components/InputError';
import AuthForm from '../../components/AuthForm';
import Preloader from '../../components/Preloader/Preloader';
import { useInputWithValidation, useFormValid } from '../../utils/formValidators';
import Logo from '../../components/Logo';

function Login({onSubmit, isPending}) {
  const email = useInputWithValidation('');
  const password = useInputWithValidation('');

  const isFormValid = useFormValid([email, password]);

  const handleSubmit = () => {
    onSubmit(email.value, password.value);
  }

  return (
    <Container className='container page__container'>
      <section className='register'>
        <AuthForm
          onSubmit={handleSubmit}
          name='registerForm'
          id='registerForm'
          submitTitle='Войти'
          caption='Ещё не зарегистрированы?'
          href='/signup'
          linkTitle='Регистрация'
          isValid={isFormValid}>
          <div className='auth-form__elements'>
            <Logo className='auth-form__logo' />
            <h1 className='auth-form__title'>
              Рады видеть!
            </h1>
            <label className='auth-form__label'>
              E-mail
            </label>
            <input
              value={email.value}
              onChange={email.onChange}
              className='auth-form__input'
              required
              autoComplete='off'
              type='email'
              name='email'
              id='email' />
            <InputError 
              isValid={email.isValid}
              errorMessage={email.validationMessage} />
            <label className='auth-form__label'>
              Пароль
            </label>
            <input
              value={password.value}
              onChange={password.onChange}
              className='auth-form__input auth-form__input_type_password'
              required
              type='password'
              name='password'
              id='password' />
            <InputError 
              isValid={password.isValid}
              errorMessage={password.validationMessage} />
          </div>
        </AuthForm>
      </section>
      {isPending && <Preloader />}
    </Container>
  );
}

export default Login;