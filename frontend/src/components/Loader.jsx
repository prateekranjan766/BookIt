import React from 'react';
import { Spinner, Row } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      className='mx-auto my-5 d-block'
      style={{ height: '5rem', width: '5rem' }}
    />
  );
};

export default Loader;
