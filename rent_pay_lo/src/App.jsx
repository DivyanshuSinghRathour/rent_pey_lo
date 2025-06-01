// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './login_page'
import HomeScreen from './home_page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/home' Component={HomeScreen} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
