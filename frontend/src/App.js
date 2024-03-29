import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import SubmitOrder from './pages/SubmitOrder'
import Order from './pages/Order'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/search/:query/page/:pageNum' element={<Home />} />
            <Route path='/search/:query' element={<Home />} />
            <Route path='/page/:pageNum' element={<Home />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart/:id?' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/submitorder' element={<SubmitOrder />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
