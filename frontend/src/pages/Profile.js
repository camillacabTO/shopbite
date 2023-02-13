import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { userUpdateReset } from '../reducers/userReducer.js';
import { useNavigate } from 'react-router-dom';
import { listUserOrders } from '../actions/orderActions';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    loading,
    error,
    user: userDetails,
  } = useSelector((state) => state.userDetails);

  const { user: userLoginInfo } = useSelector((state) => state.userLogin);
  const { updated } = useSelector((state) => state.userUpdate);
  const {
    loading: ordersLoading,
    error: ordersError,
    orders,
  } = useSelector((state) => state.orderListUser);

  useEffect(() => {
    if (!userLoginInfo) {
      // check if user is logged in using the userLoginReducer
      navigate('/login');
    } else {
      if (!userDetails || !userDetails.name || updated) {
        dispatch(userUpdateReset());
        dispatch(getUserDetails('profile'));
        //hit the end point api/users/profile (to fetch the profile of current user)
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
        dispatch(listUserOrders());
      }
    }
  }, [dispatch, userDetails, navigate, userLoginInfo, updated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }
    dispatch(updateUserProfile({ id: userDetails._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {updated && <Message variant='success'>Profile Updated</Message>}
        {loading === 'pending' ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update Profile
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading === 'pending' ? (
          <Loader />
        ) : ordersError ? (
          <Message variant='danger'>{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PLACED AT</th>
                <th>TOTAL</th>
                <th>PAYMENT STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        See Order Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
