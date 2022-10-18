import './FilterCheckbox.css';

function FilterCheckbox({ title='', value, onChange }) {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__switch'>
        <input 
          checked={value}
          onChange={onChange}
          type='checkbox'
          className='filter-checkbox__input'></input>
        <span className='filter-checkbox__slider'></span>
      </label>
      <span className='filter-checkbox__title'>{title}</span>
    </div>
  );
}

export default FilterCheckbox;