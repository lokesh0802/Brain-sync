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
    "primary": "bg-purple-400 text-white font-light shadow-purple-500/50 hover:bg-purple-500 transition-all",
    "secondary": "bg-purple-600 text-white font-bold shadow-purple-500/50 hover:bg-purple-700 transition-all",
};

const sizeStyle = { 
    "small": "py-1 px-2 text-sm rounded-sm min-w-[80px]",
    "medium": "py-2 px-3 text-md rounded-md min-w-[100px] md:min-w-[120px]",
    "large": "py-3 px-4 text-lg rounded-lg min-w-[140px] md:min-w-[160px]",
}

export const Button =(props:ButtonProps) => {
    return <button 
        onClick={props.onClick} 
        className={`${variantStyle[props.variant]} ${sizeStyle[props.size]} whitespace-nowrap`} 
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
