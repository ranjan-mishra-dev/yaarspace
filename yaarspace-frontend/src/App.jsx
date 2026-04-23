import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/ProfileSetup.jsx'
import Navbar from './components/Navbar.jsx'
import { Toaster } from "sonner";



const App = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
