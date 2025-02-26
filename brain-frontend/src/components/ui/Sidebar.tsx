import React, { useState } from 'react'
import { Twitter } from '../../icons/Twitter'
import { Sidebaritems } from './Sidebaritems'
import Yotube from '../../icons/Yotube'
import Brainicon from '../../icons/Brainicon'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onTypeSelect?: (type: "youtube" | "tweet" | "project" | "all") => void;
}

function Sidebar({ isOpen, onClose, onTypeSelect }: Props) {
    const [selectedType, setSelectedType] = useState<"youtube" | "tweet" | "project" | "all">("all");

    const handleTypeSelect = (type: "youtube" | "tweet" | "project" | "all") => {
        setSelectedType(type);
        onTypeSelect?.(type);
    };
    return (
        <div className={`h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 fixed left-0 top-0 transition-transform duration-300
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            w-72 z-50 shadow-lg backdrop-blur-sm`}>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all"
            >
                <span className="transform hover:rotate-90 transition-transform duration-300">✕</span>
            </button>
            <div className='flex text-2xl font-bold pl-4 pt-4 items-center text-gray-800'>
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100">
                    <Brainicon width="40px" height="40px"/>
                </div>
                <span className="ml-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Brain Sync
                </span>
            </div>
            <div className='flex flex-col p-4 mt-4 justify-center gap-4'>
                <Sidebaritems 
                    text='All' 
                    icon={<Brainicon width="24px" height="24px" />}
                    onClick={() => handleTypeSelect("all")}
                    isSelected={selectedType === "all"}
                />
                <Sidebaritems 
                    text='Twitter' 
                    icon={<Twitter />}
                    onClick={() => handleTypeSelect("tweet")}
                    isSelected={selectedType === "tweet"}
                />
                <Sidebaritems 
                    text='Youtube' 
                    icon={<Yotube />}
                    onClick={() => handleTypeSelect("youtube")}
                    isSelected={selectedType === "youtube"}
                />
                <Sidebaritems 
                    text='Projects' 
                    icon={<Brainicon width="24px" height="24px" />}
                    onClick={() => handleTypeSelect("project")}
                    isSelected={selectedType === "project"}
                />
            </div>

        </div>
    )
}

export default Sidebar
