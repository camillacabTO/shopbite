import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { fetchProducts } from '../actions/productActions'

const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  //selects a piece of the global state(store/reducer)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <h1>Featured Items</h1>
      {loading ? ( // if its loading
        <Loader />
      ) : error ? ( // if not loading but there is an error
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product._id} m={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Home
