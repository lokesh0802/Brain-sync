import './App.css'
import Loader from './components/Loader/Openproject'
import LoginandSignup from './components/ui/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/ui/Sidebar'
import { Card } from './components/ui/Card'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signup" element={<LoginandSignup />} />
        <Route 
          path="/sidebar" 
          element={
            <div className='flex'>
              <Card 
                type='tweet' 
                title='project' 
                url='https://x.com/p_____dot/status/1893018043543965831' 
                // url='https://x.com/AntiLeftTakes/status/1893114601694453853'
              />
              <Card 
                type='youtube' 
                title='tourt' 
                url='https://www.youtube.com/watch?v=nvNN_O2tP6Q'
              />
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App