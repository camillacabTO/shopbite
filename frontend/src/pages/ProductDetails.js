import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, createReview } from '../actions/productActions';
import { addReviewReset } from '../reducers/productsReducer';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    success: createReviewSuccess,
    loading: createReviewLoading,
    error: createReviewError,
  } = useSelector((state) => state.addReview);

  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (createReviewSuccess) {
      setRating(0);
      setComment('');
    }
    dispatch(fetchProductDetails(id));
    if (!product._id) {
      //fetch product details and reset review state
      // dispatch(fetchProductDetails(id));
      dispatch(addReviewReset());
    }
  }, [product._id, dispatch, id, createReviewSuccess]);

  const submitHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`);
    //pass prod id and qty (query string)
  };

  const addReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        {/* btn btn-secondary */}
        Go Back
      </Link>
      {loading === 'pending' ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                className='rounded'
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numOfReviews={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: <br /> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.numInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.numInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.numInStock).keys()].map(
                              (num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={submitHandler}
                      className='primary btn-block'
                      type='button'
                      disabled={product.numInStock <= 0}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {/* add reviews */}
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No Reviews for this product</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating
                      rating={review.rating}
                      umOfReviews={`${product.numReviews}`}
                    />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review:</h2>
                  {createReviewSuccess && (
                    <Message variant='success'>
                      Your Review has been submitted!
                    </Message>
                  )}
                  {createReviewLoading === 'pending' ? (
                    <Loader />
                  ) : (
                    createReviewError && (
                      <Message variant='danger'>{createReviewError}</Message>
                    )
                  )}

                  {user ? (
                    <Form onSubmit={addReviewSubmitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select an option</option>
                          <option value='1'>1 star - Poor</option>
                          <option value='2'>2 stars - Fair</option>
                          <option value='3'>3 stars - Good</option>
                          <option value='4'>4 stars - Very Good</option>
                          <option value='5'>5 stars - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Leave a Comment:</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={createReviewLoading === 'pending'}
                        type='submit'
                        variant='primary'
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>login</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
