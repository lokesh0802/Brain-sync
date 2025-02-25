// import { BACKEND_URL } from '../config'
// import { useState, useEffect } from "react";
// import axios from "axios";
// interface Content {
//   type: "youtube" | "tweet";
//   title: string;
//   link: string;
//   description?: string;
//   analysis?: string;
// }

// export function useSearchContent():Content[] {
//   const [content, setContent] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchcontent, setSearchContent] = useState([]);
//   const [contentfound, setContentFound] = useState(false);
//   const [aicontentfound, setAicontentFound] = useState(false);
//   const [searchanalysis, setSearchAnalysis] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleSearch = async () => {
//         if (!searchQuery.trim()) return;
    
//         try {
//           const token = localStorage.getItem("authorization");
//           setLoading(true);
    
//           const response = await axios.post(
//             `${BACKEND_URL}/api/v1/search`,
//             { query: searchQuery },
//             {
//               headers: {
//                 authorization: token,
//               },
//             }
//           );

//         } catch (err) {
//           console.error(err);
//         }
//       };
//   }, []); 
//   // console.log(content)
//   return content;
// }
