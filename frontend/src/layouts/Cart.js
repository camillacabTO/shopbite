import React, { useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const [searchParams] = useSearchParams();
  const qty = searchParams.get('qty') ? searchParams.get('qty') : 1;
  const navigate = useNavigate();
  const { id: productID } = useParams();
  const dispatch = useDispatch();
  const { itemsInCart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const handleCheckout = () => {
    navigate('/login?redirect=shipping');
    // if user is logged in will go to shipping, if not, to the login page
  };

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {itemsInCart.length === 0 ? (
          <>
            <Message>There is no item in your cart</Message>
            <Message>
              <Link to='/'>Go Back to Home Page</Link>
            </Message>
          </>
        ) : (
          <ListGroup variant='flush'>
            {itemsInCart.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((item) => (
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeItemHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal</h2>
              <p>
                Number of Items:{' '}
                {itemsInCart.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p>
                $
                {itemsInCart
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={itemsInCart.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
