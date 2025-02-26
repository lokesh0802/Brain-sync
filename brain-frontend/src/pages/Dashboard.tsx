import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Buttons';
import { Plusicon } from '../icons/Plusicon';
import { Shareicon } from '../icons/Shareicon';
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
  const contents: { type: "youtube" | "tweet"; title: string; link: string }[] = useContent();

  console.log('Contents from useContent:', contents);
  function setvalue(){
    setSearchOpen(true);
  }
  function sharelink(){
    
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
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className={`p-4 min-h-screen bg-[#e3e2e2] flex-1 transition-all duration-300
          ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
          {isMobile && (
            <button 
              className="mb-4 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
          <Button
              variant="primary"
              size="medium"
              text="Share"
              onClick={() => console.log('Share')}
              startIcon={<Shareicon size="medium" />}
            />
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
            {contents.map((content, index) => (
              <Card
                key={index}
                type={content.type}
                title={content.title}
                url={content.link}
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
    background-color: purple;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    transition: .3s ease;
  }

  .search button[type="submit"]:hover {
    transform: scale(1.1);
    color: rgb(255, 255, 255);
    background-color: purple;
  }`;

export default Dashboardrender;
