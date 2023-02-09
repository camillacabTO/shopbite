import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';

// import CheckoutSteps from '../components/CheckoutSteps'
// import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    navigate('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/submitorder');
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 step3 /> */}
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method:</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Proceed
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
