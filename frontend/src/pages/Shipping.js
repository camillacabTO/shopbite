import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
// import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveShippingAddress } from '../actions/cartActions';

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [city, setCity] = useState(shippingAddress?.city || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      {/* ???? */}
      <h1>Shipping Information</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter destination address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter destination city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter destination postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter destination country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
