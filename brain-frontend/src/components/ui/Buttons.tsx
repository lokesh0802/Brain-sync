import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size:"small" | "medium" | "large";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
     
}
export const Button =(props:ButtonProps) => {
    return <button>Click me</button>

}

