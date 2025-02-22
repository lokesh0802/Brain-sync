import './App.css'
import Loader from './components/Loader/Openproject'
import LoginandSignup from './components/ui/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/ui/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signup" element={<LoginandSignup />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App