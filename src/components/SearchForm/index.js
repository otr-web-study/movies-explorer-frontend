import { useState, useEffect } from 'react';
import './SearchForm.css';
import Button from '../Button';
import InputError from '../InputError';
import FilterCheckbox from '../FilterCheckbox';
import { useInputRefWithValidation, useFormValid } from '../../utils/formValidators';

function SearchForm({ onSubmit, engine }) {
  const searchString = useInputRefWithValidation('');
  const [onlyShort, setOnlyShort] = useState(false);
  const [isFormValid] = useFormValid([searchString]);

  useEffect(() => {
    searchString.ref.current.value = engine.getSearchMoviesString() || '';
    setOnlyShort(engine.getOnlyShortMovies());
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    searchString.checkValidity();
    if (!isFormValid) {
      return;
    }
    onSubmit(searchString.ref.current.value, onlyShort);
  }

  const handleCheckboxChange = () => {
    const value = !onlyShort;
    setOnlyShort(value);
    if (searchString.ref.current.value) {
      onSubmit(searchString.ref.current.value, value);
    }
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
          autoComplete='off'
          name='search'
          id='search' />
        <Button 
          className='search-form__button-submit'
          type='submit' />
        <InputError 
          className='search-form__error'
          isValid={searchString.isValid}
          errorMessage={searchString.validationMessage} />
      </div>
      <FilterCheckbox 
        title='Короткометражки'
        onChange={handleCheckboxChange}
        value={onlyShort} />
      <div className='search-form__underline'></div>
    </form>
  );
}

export default SearchForm;