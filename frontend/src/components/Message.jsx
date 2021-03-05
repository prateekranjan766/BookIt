import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ children, variant = 'danger' }) => {
  return (
    <Alert
      variant={variant}
      className='mx-auto default-font my-5'
      style={{ width: '70%' }}
    >
      {children}
    </Alert>
  );
};

export default Message;
