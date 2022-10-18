import { useContext, useEffect } from 'react';
import './Profile.css';
import Container from '../../components/Container';
import Header from '../../components/Header';
import InputError from '../../components/InputError';
import Button from '../../components/Button';
import Preloader from '../../components/Preloader/Preloader';
import { CurrentUser } from '../../contexts/CurrentUser';
import { useInputWithValidation, useFormValid } from '../../utils/formValidators';
import { USERNAME_PATTERN } from '../../constants/constants';

function Profile({onSubmit, onLogout, isPending}) {
  const name = useInputWithValidation('');
  const email = useInputWithValidation('');

  const currentUser = useContext(CurrentUser);

  useEffect(() => {
    name.setValue(currentUser.name || '');
    email.setValue(currentUser.email || '');
  }, [currentUser]);

  const isFormValid = useFormValid([name, email]) && 
    (name.value !== currentUser.name || email.value !== currentUser.email);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({name: name.value, email: email.value});
  }

  return (
    <Container className='container page__container'>
      <Header loggedIn={true} />
      <form 
        className='profile'
        onSubmit={handleSubmit}
        name='profile'
        id='profile'
        noValidate>
        <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <label className='profile__label'>
          Имя
          <input
            value={name.value}
            onChange={name.onChange}
            className='profile__input'
            required
            minLength='2'
            maxLength='30'
            pattern={USERNAME_PATTERN}
            autoComplete='off'
            name='name'
            placeholder='Имя'
            id='name'></input>
        </label>
        <InputError
          isValid={isFormValid}
          className='profile__input-error'
          errorMessage={name.validationMessage} />
        <label className='profile__label'>
          E-mail
          <input
            value={email.value}
            onChange={email.onChange}
            className='profile__input'
            required
            autoComplete='off'
            type='email'
            name='email'
            placeholder='E-mail'
            id='email'></input>
        </label>
        <InputError
          isValid={isFormValid}
          className='profile__input-error'
          errorMessage={email.validationMessage} />
        <Button
          className={`profile__button-submit ${!isFormValid && 'profile__button-submit_inactive'}`}
          title='Редактировать'
          type='submit'
          disabled={!isFormValid} />
        <Button
          className='profile__button-logout'
          title='Выйти из аккаунта'
          onClick={onLogout} />
        {isPending && <Preloader />}
      </form>
    </Container>
  );
}

export default Profile;