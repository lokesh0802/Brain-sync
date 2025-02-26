import { BACKEND_URL } from '../config'
import { useState, useEffect } from "react";
import axios from "axios";
interface Content {
  type: "youtube" | "tweet";
  title: string;
  link: string;
  description: string;
}

export function useContent():Content[] {
  const [content, setContent] = useState([]);
  

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("authorization");

        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            authorization: token,
          },
        });

        // console.log(response);
        setContent(response.data.contents); 
        console.log("lokesh")
        console.log(response.data.contents)
        

      } catch (err) {
        console.log(err);
        setContent([]); 
      }
    };

    fetchContent();
  }, []); 
  // console.log(content)
  return content;
}
