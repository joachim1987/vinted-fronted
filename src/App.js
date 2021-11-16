import './App.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './components/CheckoutForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'
import Home from './pages/Home'
import Offer from './pages/Offer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Header from './components/Header'
import Publish from './pages/Publish'

function App() {
  const [token, setToken] = useState(Cookies.get('userToken') || null)
  const stripePromise = loadStripe(
    'pk_test_51JwTuNABMPdLCQCOfz5GPRRY9dBaeN70OGaTjoXpCi3l2nSJPumsWj5arEdHuDfE7BjGd9jN44gyMCw4GzgdCJ2c00UqjGdU8o',
  )

  const setUser = (token) => {
    if (token) {
      Cookies.set('userToken', token, { expires: 10 })
    } else {
      Cookies.remove('userToken')
    }
    setToken(token)
  }

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
      {/* Footer */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Router>
  )
}

export default App
