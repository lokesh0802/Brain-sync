import { BACKEND_URL } from "../../config";
import { Close } from "../../icons/Close";
import { Button } from "./Buttons";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  YOUTUBE = "youtube",
  TWITTER = "tweet",
  PROJECT = "project"
}

export function AddContent({ open, onClose }: AddContentProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [contentType, setContentType] = useState(ContentType.YOUTUBE);

  const addContent = async () => {
    const titleadd = titleRef.current?.value;
    const linkadd = linkRef.current?.value;
    const descriptionadd = descriptionRef.current?.value;

    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        throw new Error("No authorization token found");
      }

      const response = await axios.post(
        BACKEND_URL + "/api/v1/content",
        {
          title: titleadd,
          link: contentType === "project" ? undefined : linkadd,
          description: descriptionadd,
          type: contentType,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // onClose();

      alert("Content added successfully");
      console.log(response);
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white drop-shadow-xl opacity-100 p-6 rounded-2xl h-auto w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-600">
                Add Content
              </h2>
              <div onClick={onClose} className="cursor-pointer">
                <Close size="medium" />
              </div>
            </div>

            {/* Content Type Selector */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setContentType(ContentType.YOUTUBE)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300
                  ${
                    contentType === "youtube"
                      ? "bg-red-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                YouTube
              </button>
              <button
                onClick={() => setContentType(ContentType.TWITTER)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300
                  ${
                    contentType === "tweet"
                      ? "bg-blue-400 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Twitter
              </button>
              <button
                onClick={() => setContentType(ContentType.PROJECT)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300
                  ${
                    contentType === "project"
                      ? "bg-purple-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Project
              </button>
            </div>

            <div className="flex gap-4 flex-col justify-center w-full">
              <input
                ref={titleRef}
                placeholder="Title"
                className="text-black border-2 w-full border-purple-400 rounded-lg py-2 px-4
                  bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600
                  transition-all duration-300"
              />
              
              {contentType !== "project" && (
                <input
                  ref={linkRef}
                  placeholder={contentType === "youtube" ? "YouTube URL" : "Tweet URL"}
                  className="text-black border-2 w-full border-purple-400 rounded-lg py-2 px-4
                    bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600
                    transition-all duration-300"
                />
              )}
              
              {contentType === "project" ? (
                <textarea
                  ref={descriptionRef}
                  placeholder="Project Description"
                  className="text-black border-2 w-full border-purple-400 rounded-lg py-2 px-4
                    bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600
                    transition-all duration-300 h-32 resize-none"
                />
              ) : (
                <input
                  ref={descriptionRef as any}
                  placeholder="Description"
                  className="text-black border-2 w-full border-purple-400 rounded-lg py-2 px-4
                    bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600
                    transition-all duration-300"
                />
              )}
            </div>

            <div className="flex pt-4 gap-3 justify-end">
              <Button
                onClick={onClose}
                variant="primary"
                size="medium"
                text="Cancel"
              />
              <Button
                onClick={addContent}
                variant="secondary"
                size="medium"
                text="Submit"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
