import React from 'react';
import { FormControl } from 'react-bootstrap';

const SearchBox = () => {
  return (
    <div className='searchbox__container'>
      <FormControl
        className='searchbox'
        placeholder='What are you looking for?'
      ></FormControl>
      <i className='fas fa-search searchbox__icon'></i>
    </div>
  );
};

export default SearchBox;
