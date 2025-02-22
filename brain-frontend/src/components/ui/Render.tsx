import React from 'react'
import Card from './Card'
import { Button } from './Buttons'
import { Plusicon } from '../../icons/Plusicon'
import { Shareicon } from '../../icons/Shareicon'


interface Props {}

function Render(props: Props) {
    const {} = props

    return (
        <>
        <div className=''>
            <div className='flex gap-4 p-4  justify-end'>
            <Button 
                    variant='primary' 
                    size='medium' 
                    text='Share'
                    startIcon={<Shareicon size='medium'/>}/>
                <Button 
                    variant='secondary' 
                    size='medium' 
                    text='Add Content'
                    startIcon={<Plusicon size='medium'/>}/>
               
            </div>
            <div className='flex  '>
            <Card 
                type='tweet' 
                title='project' 
                url='https://x.com/elonmusk/status/1892818147834536253' 
                // url='https://x.com/AntiLeftTakes/status/1893114601694453853'
              />
              <Card 
                type='youtube' 
                title='tourt' 
                url='https://www.youtube.com/watch?v=nvNN_O2tP6Q'
              />

            </div>
             
            </div>
        </>
    )
}

export default Render
