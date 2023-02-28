import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { createOrderReset } from '../reducers/orderReducer'
import { userDetailsReset } from '../reducers/userReducer'

const SubmitOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.userLogin)

  if (!cart.shippingAddress.address) {
    navigate('/shipping')
  } else if (!cart.paymentMethod) {
    navigate('/payment')
  }
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const itemsPrice = addDecimals(
    cart.itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
  const taxPrice = addDecimals(Number((0.13 * itemsPrice).toFixed(2)))
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const { order, success, error } = useSelector((state) => state.orderCreate)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (success) {
      navigate(`/order/${order._id}`)
      dispatch(createOrderReset())
      dispatch(userDetailsReset())
    }
  }, [success, navigate, order._id])

  const submitOrderHandler = () => {
    dispatch(
      createOrder({
        items: cart.itemsInCart,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    )
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Information</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method:</h2>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items in Order:</h2>
              {cart.itemsInCart.length === 0 ? (
                <Message>There is nothing in your cart</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.itemsInCart.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.itemsInCart === 0}
                  onClick={submitOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SubmitOrder
