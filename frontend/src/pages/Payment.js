import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = () => {
  const { shippingAddress } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!shippingAddress.address) {
    navigate('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('CreditCard')

  const onOptionChange = (e) => {
    setPaymentMethod((prev) => e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/submitorder')
  }

  return (
    <FormContainer>
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method:</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={onOptionChange}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Credit Card'
              name='paymentMethod'
              value='CreditCard'
              checked={paymentMethod === 'CreditCard'}
              onChange={onOptionChange}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Proceed
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
