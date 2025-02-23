import { BACKEND_URL } from "../../config";
import { Close } from "../../icons/Close";
import { Button } from "./Buttons";
import axios from "axios";
import { useRef } from "react";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
}

export function AddContent({ open, onClose }: AddContentProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

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
          link: linkadd,
          description: descriptionadd,
        },
        {
          headers: {
            authorization: token
          }
        }
      );
  
      alert("Content added successfully");
      console.log(response)
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    }
  }
  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-80 z-50 flex justify-center items-center">
          <div className="bg-white drop-shadow-xl opacity-100 p-4 rounded-2xl h-80 w-70">
            <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
              <Close size="medium"    />
              </div>
            </div>
            <div className="flex gap-4 flex-col justify-center w-full pt-4">
                <Input ref={titleRef} placeholder={'Title'} />
                <Input ref={linkRef} placeholder={'Link'} />
                <Input ref={descriptionRef} placeholder={'Description'} />
            </div>
            <div className="flex pt-2 justify-end">
            <Button 
            onClick={addContent}
                variant='secondary' 
                size='medium' 
                text='Submit' />

            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

function Input(props: any) {
    return (
        <input
        placeholder={props.placeholder}
        ref={props.ref}
        name="text"
        type={props.type}
        className="text-black border-2 w-full border-purple-400 rounded-lg py-2 pt-1 px-6 bg-transparent  focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
    );
}
