import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { fetchProducts } from '../actions/productActions';
import SearchBar from '../components/SearchBar';
import { useParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  const { page } = useParams();
  const pageNum = page || 1;
  const { query } = useParams();

  useEffect(() => {
    dispatch(fetchProducts(query, pageNum));
  }, [dispatch, query, pageNum]);

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
    </>
  );
};

export default Home;
