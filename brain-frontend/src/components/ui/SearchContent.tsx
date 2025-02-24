import { Close } from "../../icons/Close";
import { ContentSearchBar } from "./SEARCH_CONTENT/ContentSearchBar";
import { Card } from "./Card";
import { ContentSearchButton } from "./SEARCH_CONTENT/Contentsearchbutton";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface SearchContentProps {
  opensearch: boolean;
  onsearchclose: () => void;
}

export function SearchContent({ opensearch, onsearchclose }: SearchContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchcontent,setSearchContent]=useState([]);
  const [searchanalysis,setSearchAnalysis]=useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const token = localStorage.getItem("authorization");
  
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/search`,
        { query: searchQuery }, 
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log(response.data.searchResults);
      console.log(response.data.analysis);
      
      setSearchContent(response.data.searchResults);

  
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div>
      {opensearch && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white shadow-2xl p-6 rounded-2xl h-auto w-1/2 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <ContentSearchBar value={searchQuery} onChange={setSearchQuery} />
              <div className="flex items-center gap-8">
                <ContentSearchButton onClick={handleSearch} />
                <div className="cursor-pointer flex items-center gap-8 hover:text-red-500" onClick={onsearchclose}>
                  <Close size="large" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
            <div>
            <Card
              type="youtube"
              title="Sample Video"
              url="https://youtu.be/DrVHDc9OvG4?si=onZxngjZLhry3JhH"
            />
            </div>
            <div className="border-t border-gray-300 mt-4 pt-4">
              <h2 className="text-lg font-semibold mb-2">Extra Data on Internet</h2>
              <ul className="space-y-2">
                <li className="h-4 bg-gray-200 rounded"></li>
                <li className="h-4 bg-gray-200 rounded"></li>
                <li className="h-4 bg-gray-200 rounded"></li>
                <li className="h-4 bg-gray-200 rounded"></li>
              </ul>
            </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
