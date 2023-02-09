import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { loginUser } from '../actions/userActions';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/';
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
    // if user already logged, redirect to router in the query params, if no redirect value, go to home page
  }, [navigate, redirect, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading === 'pending' ? <Loader /> : null}
      <Form onSubmit={submitHandler}>
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
          <Form.Label>Enter Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Are You a New Customer?{'  '}
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            {/* delete this? */}
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
