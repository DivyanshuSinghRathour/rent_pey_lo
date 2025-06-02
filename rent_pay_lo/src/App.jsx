import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './home_page'
import LoginScreen from './login_page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/home' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App