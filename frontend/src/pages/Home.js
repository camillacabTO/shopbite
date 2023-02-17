import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { fetchProducts } from '../actions/productActions'
import SearchBar from '../components/SearchBar'
import { useParams } from 'react-router-dom'
import PaginationTool from '../components/PaginationTool'

const Home = () => {
  const dispatch = useDispatch()
  const { loading, error, products, totalPages, page } = useSelector(
    (state) => state.productList
  )
  const { pageNum } = useParams()
  const pageNumber = pageNum || 1
  const { query } = useParams()

  useEffect(() => {
    dispatch(fetchProducts(query, pageNumber))
  }, [dispatch, query, pageNumber])

  return (
    <>
      <h1>Featured Items</h1>
      <SearchBar />
      {loading === 'pending' ? ( // if its loading
        <Loader />
      ) : error ? ( // if not loading but there is an error
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} m={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <PaginationTool
        totalPages={totalPages}
        page={page}
        query={query ? query : ''}
      />
    </>
  )
}

export default Home
