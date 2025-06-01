import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './login_page'
import HomeScreen from './home_page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}