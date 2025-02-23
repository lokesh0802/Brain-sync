import React from 'react'
import { Twitter } from '../../icons/Twitter'
import { Sidebaritems } from './Sidebaritems'
import Yotube from '../../icons/Yotube'
import Brainicon from '../../icons/Brainicon'

interface Props {}

function Sidebar(props: Props) {
    const {} = props

    return (
        <div className='h-screen  w-72 bg-[#fbf8f8] border-r-2 fixed left-0 top-0 ' >
            <div className='flex text-2xl font-bold  pl-4 items-center'>
                <Brainicon width="60px" height="60px"/>

                Brain Sync
            </div>
            <div className='flex flex-col p-4 justify-center gap-4 '>
                <Sidebaritems text='Twitter' icon={<Twitter />}/>
                <Sidebaritems text='Youtube' icon={<Yotube />}/>
                {/* <Sidebaritems text='Instagram' icon={<Brainicon />}/> */}
                </div>

        </div>
    )
}

export default Sidebar
