import { useState } from 'react';
import './SearchForm.css';
import Button from '../Button';

function SearchForm() {
  const [searchString, setSearchString] = useState('');
  const inputIsValid = true;

  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  return (
    <form 
      className='search-form'
      onSubmit={handleSubmit}
      name='searchForm'
      id='searchForm'
      noValidate>
      <div className='search-form__container'>
        <div>
          <input
            value={searchString}
            className='search-form__input'
            placeholder='Фильм'
            name='search'
            id='search' />
          <span className={`search-form__error ${!inputIsValid && 'search-form__error_active'}`}>
            {!inputIsValid && 'some error'}
          </span>
        </div>
        <Button className='search-form__button-submit' title='&#164612;'/>
      </div>

    </form>
  );
}

export default SearchForm;