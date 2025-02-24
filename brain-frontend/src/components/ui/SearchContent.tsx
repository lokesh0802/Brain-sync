// import { Close } from "../../icons/Close";
// import { ContentSearchBar } from "./SEARCH_CONTENT/ContentSearchBar";
// import { Card } from "./Card";
// import { ContentSearchButton } from "./SEARCH_CONTENT/Contentsearchbutton";
// import { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";
// import { SearchLoader } from "../ui/SEARCH_CONTENT/SearchLoader";
// import { div } from "framer-motion/client";

// interface SearchContentProps {
//   opensearch: boolean;
//   onsearchclose: () => void;
// }

// export function SearchContent({ opensearch, onsearchclose }: SearchContentProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchcontent, setSearchContent] = useState([]);
//   const [contentfound,setContentFound] = useState(false);
//   const [aicontentfound,setAicontentFound] = useState(false);
//   const [searchanalysis, setSearchAnalysis] = useState([]);
//   const [loading , setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;
    
//     try {
//       const token = localStorage.getItem("authorization");
//       setLoading(true);
  
//       const response = await axios.post(
//         `${BACKEND_URL}/api/v1/search`,
//         { query: searchQuery }, 
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );
//       console.log(response.data.analysis);
//       console.log(response.data.searchResults);
//       setSearchAnalysis(response.data.analysis);
//       setSearchContent(response.data.searchResults);
//       setLoading(false)
//       setContentFound(true);
//       setAicontentFound(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   return (
//     <div>
//       {opensearch && (
//         <div className="fixed inset-0 bg-gray-900 opacity-90 z-50 flex justify-center items-center p-4">
//           <div className="bg-white shadow-2xl p-6 rounded-2xl w-full max-w-3xl transition-all duration-300">
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
//               <ContentSearchBar value={searchQuery} onChange={setSearchQuery} />
//               <div className="flex items-center gap-4">
//                 <ContentSearchButton onClick={handleSearch} />
//                 <div
//                   className="cursor-pointer hover:text-red-500"
//                   onClick={onsearchclose}
//                 >
//                   <Close size="large" />
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row gap-4">

//               {loading && <div className="flex items-center justify-center"><SearchLoader /></div>
//               }
//               {contentfound && <div className="w-full md:w-1/2">
//                 <Card
//                   type="youtube"
//                   title="Sample Video"
//                   url="https://youtu.be/DrVHDc9OvG4?si=onZxngjZLhry3JhH"
//                 />
//               </div>}
//               {aicontentfound &&<div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-300 pt-4 md:pl-4">
//                 <h2 className="text-lg font-semibold mb-2">Extra Data on Internet</h2>
//                 <ul className="space-y-2">
//                   <li className="h-4 bg-gray-200 rounded"></li>
//                   <li className="h-4 bg-gray-200 rounded"></li>
//                   <li className="h-4 bg-gray-200 rounded"></li>
//                   <li className="h-4 bg-gray-200 rounded"></li>
//                 </ul>
//               </div>}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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

export function SearchContent({ opensearch, onsearchclose }: SearchContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchcontent, setSearchContent] = useState([]);
  const [contentfound, setContentFound] = useState(false);
  const [aicontentfound, setAicontentFound] = useState(false);
  const [searchanalysis, setSearchAnalysis] = useState([]);
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
      console.log(response.data.analysis);
      console.log(response.data.searchResults);
      setSearchAnalysis(response.data.analysis);
      setSearchContent(response.data.searchResults);
      setLoading(false);
      setContentFound(true);
      setAicontentFound(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {opensearch && (
        <div className="fixed inset-0 bg-gray-900 opacity-90 z-50 flex justify-center items-center p-4">
          <div className="bg-white shadow-2xl p-6 rounded-2xl w-full max-w-3xl flex flex-col items-center transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 w-full">
              <ContentSearchBar value={searchQuery} onChange={setSearchQuery} />
              <div className="flex items-center gap-4">
                <ContentSearchButton onClick={handleSearch} />
                <div
                  className="cursor-pointer hover:text-red-500"
                  onClick={onsearchclose}
                >
                  <Close size="large" />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
              {loading && <div className="flex items-center h-40 justify-center"><SearchLoader /></div>}
              {contentfound && (
                <div className="w-full md:w-1/2 flex justify-center">
                  <Card
                    type="youtube"
                    title="Sample Video"
                    url="https://youtu.be/DrVHDc9OvG4?si=onZxngjZLhry3JhH"
                  />
                </div>
              )}
              {aicontentfound && (
                <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-300 pt-4 md:pl-4 text-center">
                  <h2 className="text-lg font-semibold mb-2">Extra Data on Internet</h2>
                  <ul className="space-y-2">
                    <li className="h-4 bg-gray-200 rounded"></li>
                    <li className="h-4 bg-gray-200 rounded"></li>
                    <li className="h-4 bg-gray-200 rounded"></li>
                    <li className="h-4 bg-gray-200 rounded"></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
