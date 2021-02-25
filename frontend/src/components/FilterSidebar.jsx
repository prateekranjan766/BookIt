import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../styles/FilterSidebar.scss';
import Rupee from './Rupee';

const FilterSidebar = (props) => {
  return (
    <div className='filter-sidebar'>
      <Row className='m-4 py-3' style={{ borderBottom: '0.5px solid #e5e5e5' }}>
        <Col xs={10}>
          <p>
            <u>Clear Filters</u>
          </p>
        </Col>
        <Col xs={2}>
          <i
            className='fas fa-times'
            style={{ cursor: 'pointer' }}
            onClick={props.close}
          ></i>
        </Col>
      </Row>

      <Row className='m-3 py-3 px-5'>
        <Row>Category</Row>
        <Row className='filter__item__container py-4'>
          <Button type='button' className='filter__items'>
            Novels
          </Button>
          <Button type='button' className='filter__items'>
            Comics
          </Button>
          <Button type='button' className='filter__items'>
            Educational
          </Button>
          <Button type='button' className='filter__items'>
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
          <Button type='button' className='filter__items'>
            <Rupee />
            100
          </Button>
          <Button type='button' className='filter__items'>
            <Rupee />
            200
          </Button>
          <Button type='button' className='filter__items'>
            <Rupee />
            500
          </Button>
          <Button type='button' className='filter__items'>
            <Rupee />
            1000
          </Button>
          <Button type='button' className='filter__items'>
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
          <Button type='button' className='filter__items'>
            4<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i> &
            above
          </Button>
          <Button type='button' className='filter__items'>
            3<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i> &
            above
          </Button>
          <Button type='button' className='filter__items'>
            2<i style={{ fontSize: '.9rem' }} className='fas fa-star'></i>&
            above
          </Button>
          <Button type='button' className='filter__items'>
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
          <Button type='button' className='filter__items'>
            100
          </Button>
          <Button type='button' className='filter__items'>
            200
          </Button>
          <Button type='button' className='filter__items'>
            500
          </Button>
          <Button type='button' className='filter__items'>
            1000
          </Button>
          <Button type='button' className='filter__items'>
            1000+
          </Button>
        </Row>
      </Row>
    </div>
  );
};

export default FilterSidebar;
