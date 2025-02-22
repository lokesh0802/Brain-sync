import './App.css'
import Loader from './components/Loader/Openproject'
import LoginandSignup from './components/ui/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/ui/Sidebar'
import { Card } from './components/ui/Card'
import Render from './components/ui/Render'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signup" element={<LoginandSignup />} />
        <Route 
          path="/sidebar" 
          element={<Render />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App