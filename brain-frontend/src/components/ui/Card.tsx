// import React from "react";
// import TweetEmbed from "react-tweet-embed";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//   title: string;
//   type: "youtube" | "tweet";
//   url: string;
// }

// export function Card({ title, type, url }: CardProps) {
//   const getYouTubeEmbedUrl = (url: string) => {
//     const videoId = url.includes("youtu.be/")
//       ? url.split("youtu.be/")[1]?.split("?")[0]
//       : url.split("v=")[1]?.split("&")[0];
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
//   };

//   const getTweetId = (url: string) => {
//     const match = url.match(/status\/(\d+)/);
//     return match ? match[1] : "";
//   };

//   return (
//     <div className="m-2 rounded-3xl w-72 shadow-2xl border-gray-400 border bg-white">
//       <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//         <div className="flex gap-4 pl-2 justify-center items-center text-md">
//           <div className="text-gray-500">
//             <Plusicon size="medium" />
//           </div>
//           {title}
//         </div>
//         <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//           <div>
//             <Shareicon size="medium" />
//           </div>
//           <div>
//             <Deleteicon size="medium" />
//           </div>
//         </div>
//       </div>
      
//       {type === "youtube" && (
//         <div className="w-72 h-40 pr-2">
//           <iframe
//             className="w-full h-full pl-1.5"
//             src={getYouTubeEmbedUrl(url)}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}
      
//       {type === "tweet" && (

//       )}
//       <TweetEmbed tweetId={getTweetId(url)} />
      
//     </div>
//   );
// }

// export default Card;
// import React from "react";
// import TweetEmbed from "react-tweet-embed";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//   title: string;
//   type: "youtube" | "tweet";
//   url: string;
  
// }

// export function Card({ title, type, url }: CardProps) {
//   // console.log(type)
//   const getYouTubeEmbedUrl = (url: string) => {
//     const videoId = url.includes("youtu.be/") 
//       ? url.split("youtu.be/")[1]?.split("?")[0] 
//       : url.split("v=")[1]?.split("&")[0];
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
//   };

//   const getTweetId = (url: string) => {
//     const match = url.match(/status\/(\d+)/);
//     return match ? match[1] : "";
//   };

//   // console.log("URL:", url); // Log to check the value of url
//   // console.log("Tweet ID:", getTweetId(url)); // Log to check if Tweet ID is extracted

//   return (
//     <div className="m-2 rounded-3xl w-72 h-90 shadow-2xl border-gray-400 border bg-white">
//       <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//         <div className="flex gap-4 pl-2 justify-center items-center text-md">
//           <div className="text-gray-500">
//             <Plusicon size="medium" />
//           </div>
//           {title}
//         </div>
//         <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//           <div>
//             <Shareicon size="medium" />
//           </div>
//           <div>
//             <Deleteicon size="medium" />
//           </div>
//         </div>
//       </div>

//       {type === "youtube" && (
//         <div className="w-72 h-40 pr-2">
//           <iframe
//             className="w-full h-full pl-1.5"
//             src={getYouTubeEmbedUrl(url)}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}

//       {type === "tweet" && getTweetId(url) && (
//         <TweetEmbed tweetId={getTweetId(url)} />
//       )}
//     </div>
//   );
// }

// export default Card;

import React from "react";
import TweetEmbed from "react-tweet-embed";
import { Plusicon } from "../../icons/Plusicon";
import { Shareicon } from "../../icons/Shareicon";
import { Deleteicon } from "../../icons/Deleteicon";

interface CardProps {
  title: string;
  type: "youtube" | "tweet";
  url: string;
  description?: string;
}

export function Card({ title, type, url, description }: CardProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.includes("youtu.be/") 
      ? url.split("youtu.be/")[1]?.split("?")[0] 
      : url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const getTweetId = (url: string) => {
    if (!url) return "";
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="m-2 rounded-3xl w-full shadow-2xl border-gray-400 border bg-white">
      <div className="flex gap-2 p-2 items-center justify-between h-10 w-full">
        <div className="flex gap-4 pl-2 justify-center items-center text-md">
          <div className="text-gray-500">
            <Plusicon size="medium" />
          </div>
          {title}
        </div>
        <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
          <div>
            <Shareicon size="medium" />
          </div>
          <div>
            <Deleteicon size="medium" />
          </div>
        </div>
      </div>

      {type === "youtube" && url && (
        <div className="w-full aspect-video pr-2">
          <iframe
            className="w-full h-full pl-1.5 rounded-lg"
            src={getYouTubeEmbedUrl(url)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {type === "tweet" && url && getTweetId(url) && (
        <div className="w-full overflow-hidden">
          <TweetEmbed tweetId={getTweetId(url)} />
        </div>
      )}

      {description && (
        <div className="p-4">
          <p className="text-gray-700 break-words">{description}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
