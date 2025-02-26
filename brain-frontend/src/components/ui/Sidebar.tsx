import React, { useState } from 'react'
import { Twitter } from '../../icons/Twitter'
import { Sidebaritems } from './Sidebaritems'
import Yotube from '../../icons/Yotube'
import Brainicon from '../../icons/Brainicon'

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: Props) {
    return (
        <div className={`h-screen bg-[#fbf8f8] border-r-2 fixed left-0 top-0 transition-transform duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            w-72 z-50 shadow-lg`}>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
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
