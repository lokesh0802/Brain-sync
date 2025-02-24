import React, { useState } from 'react';
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
  const contents: { type: "youtube" | "tweet"; title: string; link: string }[] = useContent();

  console.log('Contents from useContent:', contents);
  function setvalue(){
    setSearchOpen(true);
  }

  return (
    <>
      <div className="flex">
        
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-[#e3e2e2] flex-1">
          <AddContent open={modalOpen} onClose={() => setModalOpen(false)} />
          
          {/* Buttons */}
          <div className="flex gap-4 p-4 justify-between">
          <div className='font-bold text-3xl '>All Notes</div>
          <div className="flex gap-4">
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
          <div className="flex flex-wrap gap-4">
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
    width: 200px;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    top: 0;
    right: 0;
    transition: .9s ease;
  }

  .search button[type="submit"]:hover {
    transform: scale(1.1);
    color: rgb(255, 255, 255);
    background-color: purple;
  }`;

export default Dashboardrender;
