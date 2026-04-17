import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
