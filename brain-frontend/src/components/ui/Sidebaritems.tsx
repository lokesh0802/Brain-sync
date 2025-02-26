import { ReactElement } from "react";

interface SidebaritemsProps {
    text: string;
    icon: ReactElement;
    onClick: () => void;
    isSelected?: boolean;
}

export const Sidebaritems = ({text, icon, onClick, isSelected}: SidebaritemsProps) => {
    return (
        <div>

            <div className="
            flex gap-4 items-center 
            w-full p-3 rounded-xl
            ${isSelected ? 'bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md border-indigo-100' : 'bg-white/50 border-transparent'}
            transition-all duration-300 ease-in-out
            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50
            hover:shadow-md
            hover:scale-[1.02]
            hover:translate-x-1
            cursor-pointer
            group
            border border-transparent
            hover:border-indigo-100
        " onClick={onClick}>
            <div className="transform transition-transform duration-300 group-hover:scale-110 text-gray-500 group-hover:text-indigo-600">
                {icon}
            </div>
            <span className="font-medium text-gray-600 group-hover:text-indigo-700 transition-colors duration-300">
                {text}
            </span>
        </div>

        </div>
        
    );
};
