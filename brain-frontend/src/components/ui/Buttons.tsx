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
    "primary": "bg-purple-300 text-white",
    "secondary": "bg-purple-600 text-white",  // ✅ Now visible
};

const sizeStyle = { 
    "small": "py-1 px-2 text-sm rounded-sm",
    "medium": "py-2 px-4 text-md rounded-md",
    "large": "py-y px-8 text-xl rounded-lg",
}

export const Button =(props:ButtonProps) => {
    return <button className={`${variantStyle[props.variant]}  ${sizeStyle[props.size]}`} >
        <div className="flex items-center">
            {props.startIcon}
            <div className="pl-2 pr-2">
                {props.text}
            </div>
            {props.endIcon}
        </div>
        
        </button>
    

}

