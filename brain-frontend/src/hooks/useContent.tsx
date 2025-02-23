import { BACKEND_URL } from '../config'
import { useState, useEffect } from "react";
import axios from "axios";


export function useContent() {
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

        console.log(response);
        setContent(response.data.contents); 
        

      } catch (err) {
        console.log(err);
        setContent([]); 
      }
    };

    fetchContent();
  }, []); 
  console.log(content)
  return content;
}
