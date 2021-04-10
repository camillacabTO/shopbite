import React from 'react'
import products from '../products'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const ProductDetails = ({ match }) => {
  const product = products.find(prod => prod._id === match.params.id)
  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        {/* btn btn-secondary */}
        Go Back
      </Link>
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
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='primary btn-block'
                  type='button'
                  disabled={product.countInStock <= 0}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetails
