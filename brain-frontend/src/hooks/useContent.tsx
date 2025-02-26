import { BACKEND_URL } from '../config'
import { useState, useEffect } from "react";
import axios from "axios";

interface Content {
  _id: string;
  type: "youtube" | "tweet" | "project";
  title: string;
  link?: string;
  description: string;
  icon?: React.ReactNode;
}

export function useContent() {
  const [content, setContent] = useState<Content[]>([]);

  const deleteContent = async (contentId: string) => {
    try {
      const token = localStorage.getItem("authorization");
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          authorization: token,
        },
      });
      // Refresh content after deletion
      fetchContent();
    } catch (err) {
      console.error("Error deleting content:", err);
    }
  };
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
  

  useEffect(() => {
    fetchContent();
    const intervalId = setInterval(() => {
      fetchContent();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    }

    // fetchContent();
  }, []); 
  // console.log(content)
  return { content, deleteContent };
}
