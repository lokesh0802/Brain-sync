import { ReactElement } from "react";

interface SidebaritemsProps {
    text: string;
    icon: ReactElement;
}

export const Sidebaritems = ({text, icon}: SidebaritemsProps) => {
    return (
        <div>

            <div className="
            flex gap-4 items-center 
            w-full p-3 rounded-lg
            bg-white 
            transition-all duration-300 ease-in-out
            hover:bg-gray-50 
            hover:shadow-lg
            hover:scale-[1.02]
            hover:translate-x-1
            cursor-pointer
            group
        ">
            <div className="transform transition-transform duration-300 group-hover:scale-110 text-gray-600 group-hover:text-purple-600">
                {icon}
            </div>
            <span className="font-medium text-gray-700 group-hover:text-purple-700 transition-colors duration-300">
                {text}
            </span>
        </div>

        </div>
        
    );
};