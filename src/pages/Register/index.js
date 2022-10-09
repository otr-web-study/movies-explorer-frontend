import './Register.css';
import Container from '../../components/Container';
import InputError from '../../components/InputError';
import AuthForm from '../../components/AuthForm';
import { useInputWithValidation, useFormValid } from '../../utils/formValidators';
import Logo from '../../components/Logo';

function Register({onSubmit}) {
  const name = useInputWithValidation('');
  const email = useInputWithValidation('');
  const password = useInputWithValidation('');

  const [isFormValid] = useFormValid([name, email, password]);

  return (
    <Container className='container page__container'>
      <section className='register'>
        <AuthForm
          onSubmit={onSubmit}
          name='registerForm'
          id='registerForm'
          submitTitle='Зарегистрироваться'
          caption='Уже зарегистрированы?'
          href='/signin'
          linkTitle='Войти'
          isValid={isFormValid}>
          <div className='auth-form__elements'>
            <Logo className='auth-form__logo' />
            <h1 className='auth-form__title'>
              Добро пожаловать!
            </h1>
            <label className='auth-form__label'>
              Имя
            </label>
            <input
              value={name.value}
              onChange={name.onChange}
              className='auth-form__input'
              required
              autoComplete='off'
              name='name'
              id='name' />
            <InputError 
              isValid={name.isValid}
              errorMessage={name.validationMessage} />
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
    </Container>
  );
}

export default Register;