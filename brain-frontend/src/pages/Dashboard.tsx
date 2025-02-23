import React from 'react'
import { useState } from 'react'
import Card from '../components/ui/Card'
import { Button } from '../components/ui/Buttons'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { AddContent } from '../components/ui/AddContent'
import Sidebar from '../components/ui/Sidebar'

function Dashboardrender() {
    const [modalopen, setmodalOpen] = useState(false)

    return (
    <>
    <div >
    <Sidebar />
    <div className='p-4 ml-72 min-h-screen bg-[#e3e2e2]'>
    <AddContent open={modalopen} onClose={() => {setmodalOpen(false)}} />
        <div className='flex gap-4 p-4  justify-end '>
        <Button 
                variant='primary' 
                size='medium' 
                text='Share'
                startIcon={<Shareicon size='medium'/>}/>
            <Button 
                variant='secondary' 
                size='medium' 
                text='Add Content'
                onClick={() => {setmodalOpen(true)}}
                startIcon={<Plusicon size='medium'/>}/>
           
        </div>
        <div  className='flex gap-4 '>

        <Card 
            type='tweet' 
            title='project' 
            url='https://x.com/elonmusk/status/1892818147834536253' 
          
          />
          <Card 
            type='youtube' 
            title='tourt' 
            url='https://www.youtube.com/watch?v=nvNN_O2tP6Q'
          />
        </div>
        

    </div>
       
         
        </div>
    </>
)
}

export default Dashboardrender
