import { Close } from "../../icons/Close";
import { ContentSearchBar } from "./SEARCH_CONTENT/ContentSearchBar";
import { Card } from "./Card";
import { ContentSearchButton } from "./SEARCH_CONTENT/Contentsearchbutton";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { SearchLoader } from "./SEARCH_CONTENT/SearchLoader";

interface SearchContentProps {
  opensearch: boolean;
  onsearchclose: () => void;
}
interface Content {
  type: "youtube" | "tweet";
  title: string;
  link: string;
  description?: string;
  analysis?: string;
}
interface SearchContentProps {
  description?: string;
  analysis?: string;
}

export function SearchContent({ opensearch, onsearchclose }: SearchContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchcontent, setSearchContent] = useState<Content[]>([]);
  const [contentfound, setContentFound] = useState(false);
  const [aicontentfound, setAicontentFound] = useState(false);
  const [searchanalysis, setSearchAnalysis] = useState<SearchContentProps[]>([]);
  const [loading, setLoading] = useState(false);
  


  const handleSearch = async () => {
        if (!searchQuery.trim()) return;
      
        try {
          const token = localStorage.getItem("authorization");
          setLoading(true);
      
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/search`,
            { query: searchQuery },
            {
              headers: {
                authorization: token,
              },
            }
          );
      
          // Extract response data
          const { analysis, searchResults } = response.data;
      
          // Convert `searchResults` to an array if it's an object
          const searchResultsArray = Array.isArray(searchResults)
            ? searchResults
            : [searchResults]; // ✅ Ensure it's an array
    
            // also convert searchanalysis to array
            const searchAnalysisArray = Array.isArray(analysis)
            ? analysis
            : [analysis]; // ✅ Ensure it
          // Set state variables
          searchResultsArray[0].type= searchResultsArray[0].type.replace("twitter", "tweet");
          setSearchAnalysis(searchAnalysisArray);
    
    
          console.log("Search Analysis Array converted from object:", searchAnalysisArray);
          setSearchContent(searchResultsArray);
          if(searchAnalysisArray.length > 0){
            // console.log(searchAnalysisArray[0].description);
            console.log(searchAnalysisArray[0].analysis);
          }
          
          console.log("Search Results Array:", searchResultsArray);
          // debug
          if (searchResultsArray.length > 0) {
            console.log(searchResultsArray[0].title); // ✅ "Honey Singh Song"
            console.log(searchResultsArray[0].link);  // ✅ "https://youtu.be/W8x6Dwyj0-A?si=v11a0RL1H6mh_paZ"
            console.log(searchResultsArray[0].description); // ✅ "Honey Singh new songs"
            console.log(searchResultsArray[0].type);  // ✅ "youtube"
          }
      
          setLoading(false);
          setContentFound(searchResultsArray.length > 0);
          setAicontentFound(true);
        } catch (err) {
          console.error("Search error:", err);
          setLoading(false);
        }
  };
  
  return (
    <div>
      {opensearch && (
        <div className="fixed inset-0 bg-gray-900/95 z-50 flex justify-center items-start sm:items-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white shadow-2xl p-4 sm:p-6 h-auto rounded-2xl w-full max-w-3xl flex flex-col items-center transition-all duration-300 my-2 sm:my-0">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-3 w-full">
              <div className="flex-grow">
                <ContentSearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="flex items-center justify-end gap-3">
                <ContentSearchButton onClick={handleSearch} />
                <div className="cursor-pointer hover:text-red-500" onClick={onsearchclose}>
                  <Close size="large" />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
              {loading && <div className="flex items-center h-40 justify-center"><SearchLoader /></div>}
              {!loading && contentfound && (
                <div className="w-full md:w-1/2 flex justify-center p-2">
                  <Card type={searchcontent[0].type} title={searchcontent[0]?.title} url={searchcontent[0]?.link} />
                </div>
              )}
              {!loading && aicontentfound && (
                <div className="w-full md:w-1/2 max-h-[450px] border-t md:border-t-0 md:border-l border-gray-300 md:pl-4 mt-4 md:mt-0 pt-4 md:pt-0">
                  <h2 className="text-lg font-semibold mb-3">Extra Data on Internet</h2>
                  <div className="overflow-y-auto pr-2 h-[calc(100%-2rem)] scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200">
                    <p className="text-gray-700 leading-relaxed">{searchanalysis[0]?.analysis}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
