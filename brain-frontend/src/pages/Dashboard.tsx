import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Buttons';
import { Plusicon } from '../icons/Plusicon';
// import { Shareicon } from '../icons/Shareicon';
import { AddContent } from '../components/ui/AddContent';
import Sidebar from '../components/ui/Sidebar';

import { useContent } from '../hooks/useContent';


import styled from 'styled-components';
import {SearchContent} from '../components/ui/SearchContent';


function Dashboardrender() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedType, setSelectedType] = useState<"youtube" | "tweet" | "project" | "all">("all");

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setSidebarOpen(!isMobileView);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const contents: { type: "youtube" | "tweet" | "project"; title: string; link?: string; description: string; icon?: React.ReactNode }[] = useContent();

  console.log('Contents from useContent:', contents);
  function setvalue(){
    setSearchOpen(true);
  }


  return (
    <>
      <div className="flex relative">
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            onTypeSelect={setSelectedType}
          />
        <div className={`p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex-1 transition-all duration-300
          ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
          {isMobile && (
            <button 
              className="mb-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰ Menu
            </button>
          )}
          <AddContent open={modalOpen} onClose={() => setModalOpen(false)} />
          
          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 p-4 justify-between">
            <div className='font-bold text-3xl'>All Notes</div>
            <div className="flex flex-col sm:flex-row gap-4">
          <StyledWrapper>
            <div className="search">
            <input placeholder="Search..." type="text"  />
            <button type="submit" onClick={setvalue}>Go</button>
          </div>
          </StyledWrapper>
          <SearchContent opensearch={searchOpen} onsearchclose={() => setSearchOpen(false)} />
          {/* <Button
              variant="primary"
              size="medium"
              text="Share"
              onClick={() => async()=>{
                console.log("share")
                const response=await axios.post("http://localhost:3000/api/v1/brain/share", {
                  share:"true"
                },{
                  headers:{
                    "Authorization":localStorage.getItem("authorization")
                  }
                });
                const shareurl= `http://localhost:5173/share/${response.data.hash}`;
                alert(shareurl);
                copy(shareurl);

              }}
              startIcon={<Shareicon size="medium" />}
            /> */}
            <Button
              variant="secondary"
              size="medium"
              text="Add Content"
              onClick={() => setModalOpen(true)}
              startIcon={<Plusicon size="medium" />}
            />

          </div>
            
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contents
              .filter(content => selectedType === "all" || content.type === selectedType)
              .map((content, index) => (
              <Card
                key={index}
                type={content.type}
                title={content.title}
                url={content.link}
                description={content.description}
              />
            ))}
            {/* <Card
              type="youtube"
              title="Sample Video"
              url="https://youtu.be/DrVHDc9OvG4?si=onZxngjZLhry3JhH"
            />
            <Card
              type="tweet"
              title="Elon Tweet"
              url="https://x.com/elonmusk/status/1893237503122907147"
            />
            <Card title="Elon Musk Tweet" type="tweet" url="https://x.com/elonmusk/status/1893237503122907147" /> */}

          </div>
        </div>
      </div>
    </>
  );
}
const StyledWrapper = styled.div`
  .search {
    display: inline-block;
    position: relative;
  }

  .search input[type="text"] {
    width: 100%;
    min-width: 200px;
    max-width: 400px;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 640px) {
    .search {
      width: 100%;
    }
    .search input[type="text"] {
      width: 100%;
      max-width: none;
    }
  }

  .search button[type="submit"] {
    background: linear-gradient(to right, #6366f1, #a855f7);
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }

  .search button[type="submit"]:hover {
    background: linear-gradient(to right, #4f46e5, #9333ea);
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
  }`;

export default Dashboardrender;
