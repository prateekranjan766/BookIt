import React, { useState } from 'react';
import { FormControl, Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/books/search/${keyword}`);
    } else {
      history.push('/books');
    }
  };

  return (
    <div className='searchbox__container'>
      <Form onSubmit={submitHandler}>
        <FormControl
          type='text'
          className='searchbox'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='What are you looking for?'
        ></FormControl>
        <Button
          type='submit'
          className='searchbox__icon rounded-circle'
          variant='light'
        >
          <i className='fas fa-search'></i>
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
