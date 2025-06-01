import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './login_page'
import HomeScreen from './home_page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App