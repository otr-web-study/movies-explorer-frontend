import './FilterCheckbox.css';

function FilterCheckbox({ title, onClick }) {
  const handleClick = () => {
    onClick && onClick();
  }

  return (
    <div className='filter-checkbox'>
      <label onClick={handleClick} className='filter-checkbox__switch'>
        <input type='checkbox' className='filter-checkbox__input'></input>
        <span className='filter-checkbox__slider'></span>
      </label>
      <span className='filter-checkbox__title'>{title || ''}</span>
    </div>
  );
}

export default FilterCheckbox;