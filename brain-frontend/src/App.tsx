import './App.css'
import Loader from './components/Loader/Openproject'
import LoginandSignup from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboardrender from '../src/pages/Dashboard'
import { Nopage } from './pages/Nopage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signup" element={<LoginandSignup />} />
        <Route 
          path="/sidebar" 
          element={<Dashboardrender />} 
        />
        <Route path='*' element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App