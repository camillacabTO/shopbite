import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className='mb-2'>
      <Form.Control
        type='text'
        name='query'
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search a Product'
        className='mr-sm-2 ml-sm-6 py-3'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='py-1'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
