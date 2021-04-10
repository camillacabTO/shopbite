import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './layouts/Home'
import ProductDetails from './layouts/ProductDetails'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' exact component={Home} />
          <Route path='/product/:id' exact component={ProductDetails} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
