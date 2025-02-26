import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size:"small" | "medium" | "large";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    
     
}
const variantStyle = {
    "primary": "bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-medium shadow-md hover:from-indigo-500 hover:to-purple-600 active:shadow-inner transition-all",
    "secondary": "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 active:shadow-inner transition-all",
};

const sizeStyle = { 
    "small": "py-1.5 px-3 text-sm rounded-lg min-w-[90px]",
    "medium": "py-2 px-4 text-md rounded-lg min-w-[110px] md:min-w-[130px]",
    "large": "py-3 px-5 text-lg rounded-lg min-w-[150px] md:min-w-[170px]",
}

export const Button =(props:ButtonProps) => {
    return <button 
        onClick={props.onClick} 
        className={`${variantStyle[props.variant]} ${sizeStyle[props.size]} whitespace-nowrap hover:shadow-lg active:scale-[0.98]`} 
    >
        <div className="flex items-center justify-center gap-2 cursor-pointer w-full">
            {props.startIcon}
            <div className="px-1">
                {props.text}
            </div>
            {props.endIcon}
        </div>
        
        </button>
    

}
