import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../styles/FilterSidebar.scss';
import Rupee from './Rupee';

const FilterSidebar = ({
  category,
  rating,
  price,
  pages,
  setCategory,
  setRating,
  setPrice,
  setPages,
  close,
}) => {
  return (
    <div className='filter-sidebar'>
      <Row className='m-4 py-3' style={{ borderBottom: '0.5px solid #e5e5e5' }}>
        <Col xs={10}>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setCategory('');
              setPrice(10000);
              setRating('');
              setPages(10000);
            }}
          >
            <u>Clear Filters</u>
          </p>
        </Col>
        <Col xs={2}>
          <i
            className='fas fa-times'
            style={{ cursor: 'pointer' }}
            onClick={close}
          ></i>
        </Col>
      </Row>

      <Row className='m-3 py-3 px-5'>
        <Row>Category</Row>
        <Row className='filter__item__container py-4'>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setCategory('novels')}
            active={category === 'novels'}
          >
            Novels
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setCategory('comics')}
            active={category === 'comics'}
          >
            Comics
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setCategory('educational')}
            active={category === 'educational'}
          >
            Educational
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setCategory('biography')}
            active={category === 'biography'}
          >
            Biography
          </Button>
        </Row>
      </Row>

      <Row
        className='m-3 py-3 px-5'
        style={{ borderBottom: '0.5px solid #e5e5e5' }}
      >
        <Row>Price</Row>
        <Row className='py-4'>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPrice(100)}
            active={price === 100}
          >
            <Rupee />
            100
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPrice(200)}
            active={price === 200}
          >
            <Rupee />
            200
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPrice(500)}
            active={price === 500}
          >
            <Rupee />
            500
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPrice(1000)}
            active={price === 1000}
          >
            <Rupee />
            1000
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPrice(10000)}
            active={price === 10000}
          >
            <Rupee />
            1000+
          </Button>
        </Row>
      </Row>

      <Row
        className='m-3 py-3 px-5'
        style={{ borderBottom: '0.5px solid #e5e5e5' }}
      >
        <Row>Ratings</Row>
        <Row className='py-4'>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setRating(4)}
            active={rating === 4}
          >
            4<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i> &
            above
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setRating(3)}
            active={rating === 3}
          >
            3<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i> &
            above
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setRating(2)}
            active={rating === 2}
          >
            2<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i>&
            above
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setRating(1)}
            active={rating === 1}
          >
            1<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i> &
            above
          </Button>
        </Row>
      </Row>

      <Row
        className='m-3 py-3 px-5'
        style={{ borderBottom: '0.5px solid #e5e5e5' }}
      >
        <Row>Pages</Row>
        <Row className='py-4'>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPages(100)}
            active={pages === 100}
          >
            100
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPages(200)}
            active={pages === 200}
          >
            200
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPages(500)}
            active={pages === 500}
          >
            500
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPages(1000)}
            active={pages === 1000}
          >
            1000
          </Button>
          <Button
            type='button'
            className='filter__items'
            onClick={() => setPages(10000)}
            active={pages === 10000}
          >
            1000+
          </Button>
        </Row>
      </Row>
    </div>
  );
};

export default FilterSidebar;
