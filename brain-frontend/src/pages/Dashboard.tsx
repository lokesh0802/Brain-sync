import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Buttons';
import { Plusicon } from '../icons/Plusicon';
import { Shareicon } from '../icons/Shareicon';
import { AddContent } from '../components/ui/AddContent';
import Sidebar from '../components/ui/Sidebar';
import { useContent } from '../hooks/useContent';

function Dashboardrender() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents: { type: "youtube" | "tweet"; title: string; link: string }[] = useContent();

  console.log('Contents from useContent:', contents);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-[#e3e2e2] flex-1">
          <AddContent open={modalOpen} onClose={() => setModalOpen(false)} />
          
          {/* Buttons */}
          <div className="flex gap-4 p-4 justify-end">
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

export default Dashboardrender;