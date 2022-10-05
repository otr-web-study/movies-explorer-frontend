import './SearchForm.css';
import Button from '../Button';
import InputError from '../InputError';
import FilterCheckbox from '../FilterCheckbox';
import { useInputRefWithValidation, useFormValid } from '../../utils/formValidators';

function SearchForm({ onSubmit }) {
  const searchString = useInputRefWithValidation('');
  const [isFormValid] = useFormValid([searchString]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    searchString.checkValidity();
    if (!isFormValid) {
      return;
    }
    onSubmit(searchString);
  }

  return (
    <form 
      className='search-form'
      onSubmit={handleSubmit}
      name='searchForm'
      id='searchForm'
      noValidate>
      <div className='search-form__container'>
        <input
          ref={searchString.ref}
          onChange={searchString.onChange}
          className='search-form__input'
          placeholder='Фильм'
          required
          name='search'
          id='search' />
        <Button className='search-form__button-submit' />
        <InputError 
          className='search-form__error'
          isValid={searchString.isValid}
          errorMessage={searchString.validationMessage} />
      </div>
      <FilterCheckbox title='Короткометражки' />
      <div className='search-form__underline'></div>
    </form>
  );
}

export default SearchForm;