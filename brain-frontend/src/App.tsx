import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/Buttons'
import { Plusicon } from './icons/Plusicon'
import { Shareicon } from './icons/Shareicon'

function App() {

  return (
    <>
    <Button startIcon={<Shareicon size='medium' />} variant='secondary' text='Share'/>
    <Button startIcon={<Plusicon size='medium'/>} variant='primary'  text='Add Content'/>

    

    
    </>
  )
}

export default App
