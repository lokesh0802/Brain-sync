import React from 'react'
import { useState } from 'react'
import Card from '../components/ui/Card'
import { Button } from '../components/ui/Buttons'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { AddContent } from '../components/ui/AddContent'
import Sidebar from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'

function Dashboardrender() {
    const [modalopen, setmodalOpen] = useState(false);
    // i will get all cards from the backend and render them here
    const contents=useContent();

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

        {contents.map(({type,title,url})=><Card type={type} title={title} url={url} />)}
         
        </div>
        

    </div>
       
         
        </div>
    </>
)
}

export default Dashboardrender
