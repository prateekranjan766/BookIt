import React from 'react';
import { Row } from 'react-bootstrap';

const BookDetails = ({
  category,
  genre,
  language,
  weight,
  pages,
  authors,
  dimensions,
}) => {
  return (
    <div className='d-flex flex-column default-font py-5 px-4 mx-1'>
      <Row>
        <strong>Language:</strong> <p className='mx-2'>{language}</p>
      </Row>
      <Row>
        <strong>Weight (in g): </strong>
        <p className='mx-2'>{weight}</p>
      </Row>
      <Row>
        <strong>Genre:</strong>
        <p className='mx-2'>{genre}</p>
      </Row>
      <Row>
        <strong>Author(s):</strong>
        {authors.map((author) => (
          <p key={author} className='mx-2'>
            {author}
            {','}
          </p>
        ))}
      </Row>
      <Row>
        <strong>Pages:</strong>
        <p className='mx-2'>{pages}</p>
      </Row>
      <Row>
        <strong>Category:</strong>
        <p className='mx-2'>{category}</p>
      </Row>
      <Row>
        <strong>Dimensions (in cm):</strong>
        <p className='mx-2'>{`${dimensions.length} x ${dimensions.breadth} x ${dimensions.height}`}</p>
      </Row>
    </div>
  );
};

export default BookDetails;
