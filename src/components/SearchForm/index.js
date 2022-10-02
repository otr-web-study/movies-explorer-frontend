import { useState } from 'react';
import './SearchForm.css';
import Button from '../Button';
import InputError from '../InputError';
import FilterCheckbox from '../FilterCheckbox';

function SearchForm() {
  const [searchString, setSearchString] = useState('');
  const inputIsValid = false;

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  const handleSearchStringChange = (evt) => {
    setSearchString(evt.target.value);
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
          value={searchString || ''}
          onChange={handleSearchStringChange}
          className='search-form__input'
          placeholder='Фильм'
          name='search'
          id='search' />
        <Button className='search-form__button-submit' />
        <InputError className='search-form__error' isValid={inputIsValid} />
      </div>
      <FilterCheckbox title='Короткометражки' />
      <div className='search-form__underline'></div>
    </form>
  );
}

export default SearchForm;