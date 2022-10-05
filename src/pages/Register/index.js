import './Register.css';
import Container from '../../components/Container';
import InputError from '../../components/InputError';
import AuthForm from '../../components/AuthForm';
import Button from '../../components/Button';
import { useInputWithValidation, useFormValid } from '../../utils/formValidators';
import LinkComponent from '../../components/Link';

function Register({onSubmit}) {
  const name = useInputWithValidation('');
  const email = useInputWithValidation('');
  const password = useInputWithValidation('');

  return (
    <Container className='container page__container'>
      <section className='register'>
        <AuthForm
          title='Добро пожаловать!' 
          onSubmit={onSubmit}
          name='registerForm'
          id='registerForm'>
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
            name='name'
            id='name' />
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
            name='name'
            id='name' />
          <InputError 
            isValid={password.isValid}
            errorMessage={password.validationMessage} />
          <Button
            className='auth-form__button-submit'
            title='Зарегистрироваться'
            type='submit' />
          <div className='auth-form__container'>
            <p className='auth-form_text'>
              Уже зарегистрированы?
            </p>
            <LinkComponent href='/signin' className='link auth-form__link'>
              Войти
            </LinkComponent>
          </div>
        </AuthForm>
      </section>
    </Container>
  );
}

export default Register;