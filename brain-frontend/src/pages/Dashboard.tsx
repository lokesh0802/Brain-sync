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
    const contents: { type: string; title: string; link: string }[] = useContent();
    console.log(contents)

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

            {contents.map((content) => (
                <Card type={content.type} title={content.title} url={content.link} />
            ))}
            {/* <Card 
  type="youtube"
  title="Sample Video"
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
/> */}
         {/* <Card type='youtube' title='title' url='https://youtu.be/DrVHDc9OvG4?si=onZxngjZLhry3JhH'/>
         <Card type='tweet' title='title' url='https://x.com/elonmusk/status/1893237503122907147'/> */}
        </div>
        

    </div>
       
         
        </div>
    </>
)
}

export default Dashboardrender
