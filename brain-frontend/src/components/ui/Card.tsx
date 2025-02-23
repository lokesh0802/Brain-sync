// import React, { useEffect, useRef } from "react";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//     title: string;
//     type: "youtube" | "tweet";
//     url: string;
// }

// export function Card(props: CardProps) {
//   const tweetContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (props.type === "tweet") {
//       // @ts-ignore
//       if (window.twttr) {
//         // @ts-ignore
//         window.twttr.widgets.load();
//         // @ts-ignore
//         window.twttr.events.bind('rendered', function (event) {
//           if (tweetContainerRef.current) {
//             const tweetFrame = tweetContainerRef.current.querySelector('iframe');
//             if (tweetFrame) {
//               tweetFrame.style.width = '260px';
//               tweetFrame.style.maxHeight = '300px';
//               tweetFrame.style.transform = 'scale(0.9)';
//               tweetFrame.style.transformOrigin = 'top center';
//             }
//           }
//         });
//       }
//     }
//   }, [props.type]);

//   return (
//     <div>
//       <div className={`m-2 rounded-3xl w-72 shadow-2xl border-gray-400 border ${props.type === 'youtube' ? 'h-90 ' : ''}`}>
//         {/* Header */}
//         <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//           <div className="flex gap-4 pl-2 justify-center items-center text-md">
//             <div className="text-gray-500"><Plusicon size="medium"/></div>
//             {props.title}
//           </div>
//           <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//             <div><Shareicon size="medium" /></div>
//             <div><Deleteicon size="medium" /></div>
//           </div>
//         </div>
        
//         {/* YouTube section with full height */}
//         {props.type === "youtube" && (
//   <div className="w-72 h-40 pr-2">
//     <iframe
//       className="w-full h-40 pl-1.5"
//       width="560"
//       height="315"
//       src={props.url.replace("watch?v=", "embed/")}
//       title="YouTube video player"
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       referrerPolicy="strict-origin-when-cross-origin"
//       allowFullScreen
//     ></iframe>
//   </div>
// )}

//         {/* Compact Tweet section */}
//         {props.type === "tweet" && (
//           <div 
//             ref={tweetContainerRef}
//             className="w-72 flex justify-center items-start overflow-hidden"
//           >
//             <blockquote 
//               className="twitter-tweet" 
//               data-theme="light"
//               data-width="260"
//               data-dnt="true"
//               data-cards="hidden"
//               data-conversation="none"
//               data-chrome="transparent nofooter"
//             >
//               <a href={props.url.replace("x.com", "twitter.com")}></a>
//             </blockquote>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;
// import React, { useEffect } from "react";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//   title: string;
//   type: "youtube" | "tweet";
//   url: string;
//   tweetContent?: string;  // Add tweetContent for direct text display
// }

// export function Card(props: CardProps) {
//   useEffect(() => {
//     // Load Twitter widget script dynamically to render embedded tweets
//     if (props.type === "tweet") {
//       const script = document.createElement("script");
//       script.src = "https://platform.twitter.com/widgets.js";
//       script.async = true;
//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script); // Clean up the script when component unmounts
//       };
//     }
//   }, [props.type]);

//   return (
//     <div>
//       <div className={`m-2 rounded-3xl w-72 shadow-2xl border-gray-400 border ${props.type === "youtube" ? "h-90 " : ""}`}>
//         {/* Header */}
//         <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//           <div className="flex gap-4 pl-2 justify-center items-center text-md">
//             <div className="text-gray-500"><Plusicon size="medium" /></div>
//             {props.title}
//           </div>
//           <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//             <div><Shareicon size="medium" /></div>
//             <div><Deleteicon size="medium" /></div>
//           </div>
//         </div>

//         {/* YouTube section with full height */}
//         {props.type === "youtube" && (
//           <div className="w-72 h-40 pr-2">
//             <iframe
//               className="w-full h-40 pl-1.5"
//               width="560"
//               height="315"
//               src={props.url.replace("watch?v=", "embed/")}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}

//         {/* Tweet section with embedded tweet */}
//         {props.type === "tweet" && (
//           <div className="w-72 flex justify-center items-start overflow-hidden p-2">
//             <blockquote 
//   className="twitter-tweet"
//   data-theme="light"
//   data-width="260"
//   data-dnt="true"
//   data-conversation="none"
//   data-chrome="transparent nofooter"
// >
//   <a href={props.url.replace("x.com", "twitter.com")}></a>
// </blockquote>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;



// -----------------------------
// import React from "react";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//   title: string;
//   type: "youtube" | "tweet" |string  ;
//   url: string;
//   tweetContent?: string;  // Add tweetContent for direct text display
// }

// export function Card(props: CardProps) {
//   return (
//     <div>
//       <div className={`m-2 rounded-3xl w-72 shadow-2xl min-h-48 border-gray-400 bg-white border ${props.type === "youtube" ? "h-90 " : ""}`}>
//         {/* Header */}
//         <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//           <div className="flex gap-4 pl-2 justify-center items-center text-md">
//             <div className="text-gray-500"><Plusicon size="medium" /></div>
//             {props.title}
//           </div>
//           <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//             <div><Shareicon size="medium" /></div>
//             <div><Deleteicon size="medium" /></div>
//           </div>
//         </div>

//         {/* YouTube section with full height */}
//         {props.type === "youtube" && (
//           <div className="w-72 h-40 pr-2">
//             <iframe
//               className="w-full h-40 pl-1.5"
//               width="560"
//               height="315"
//               src={props.url.replace("watch?v=", "embed/")}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}

//         {/* Tweet section with embedded tweet */}
//         {props.type === "tweet" && (
//           <div className="w-72 flex justify-center items-start overflow-hidden p-2">
//             <blockquote 
//               className="twitter-tweet"
//               data-theme="light"
//               data-width="260"
//               data-dnt="true"
//               data-conversation="none"
//               data-chrome="transparent nofooter"
//             >
//               <a href={props.url?.replace("x.com", "twitter.com")}></a>
//             </blockquote>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;

// ------------------yotube is working-----------------------
// import React, { useEffect } from "react";
// import { Plusicon } from "../../icons/Plusicon";
// import { Shareicon } from "../../icons/Shareicon";
// import { Deleteicon } from "../../icons/Deleteicon";

// interface CardProps {
//   title: string;
//   type: "youtube" | "tweet";
//   url: string;
//   tweetContent?: string;  // Add tweetContent for direct text display
// }

// export function Card(props: CardProps) {
//   useEffect(() => {
//     // Load Twitter widget script dynamically to render embedded tweets
//     if (props.type === "tweet") {
//       const script = document.createElement("script");
//       script.src = "https://platform.twitter.com/widgets.js";
//       script.async = true;
//       document.body.appendChild(script);

//       return () => {
//         document.body.removeChild(script); // Clean up the script when component unmounts
//       };
//     }
//   }, [props.type]);

//   const getYouTubeEmbedUrl = (url: string) => {
//     // Extract the video ID from the YouTube URL
//     const videoId = url.split("youtu.be/")[1]?.split("?")[0] || url.split("v=")[1]?.split("&")[0];
//     return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
//   };

//   return (
//     <div>
//       <div className={`m-2 rounded-3xl w-72 shadow-2xl border-gray-400 border ${props.type === "youtube" ? "h-90 " : ""}`}>
//         {/* Header */}
//         <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
//           <div className="flex gap-4 pl-2 justify-center items-center text-md">
//             <div className="text-gray-500"><Plusicon size="medium" /></div>
//             {props.title}
//           </div>
//           <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
//             <div><Shareicon size="medium" /></div>
//             <div><Deleteicon size="medium" /></div>
//           </div>
//         </div>

//         {/* YouTube section with full height */}
//         {props.type === "youtube" && (
//           <div className="w-72 h-40 pr-2">
//             <iframe
//               className="w-full h-full pl-1.5"
//               src={getYouTubeEmbedUrl(props.url)}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}

//         {/* Tweet section with embedded tweet */}
//         {props.type === "tweet" && (
//           <div className="w-72 flex justify-center items-start overflow-hidden p-2">
//             <blockquote
//               className="twitter-tweet"
//               data-theme="light"
//               data-width="260"
//               data-dnt="true"
//               data-conversation="none"
//               data-chrome="transparent nofooter"
//             >
//               <a href={props.url.replace("x.com", "twitter.com")}></a>
//             </blockquote>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;




// ---------------try--------------
import React, { useEffect, useRef } from "react";

// Extend the Window interface to include the twttr property
declare global {
  interface Window {
    twttr: any;
  }
}

import { Plusicon } from "../../icons/Plusicon";
import { Shareicon } from "../../icons/Shareicon";
import { Deleteicon } from "../../icons/Deleteicon";

interface CardProps {
  title: string;
  type: "youtube" | "tweet";
  url: string;
  tweetContent?: string; // Optional for direct tweet text display
}

export function Card(props: CardProps) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.type === "tweet") {
      // Ensure widgets.js is loaded
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => embedTweet();
        return () => {
          // Cleanup if needed (optional)
          // document.body.removeChild(script);
        };
      } else {
        embedTweet();
      }
    }
  }, [props.type, props.url]);

  const embedTweet = () => {
    if (window.twttr?.widgets && tweetRef.current) {
      // Extract Tweet ID from URL
      const tweetId = props.url.split('/status/')[1]?.split('?')[0];
      if (!tweetId) return;

      // Clear previous content
      tweetRef.current.innerHTML = '';

      // Create the tweet
      window.twttr.widgets.createTweet(
        tweetId,
        tweetRef.current,
        {
          theme: "light", // Can be "dark" if preferred
          width: 260,     // Matches your previous width
          conversation: "none", // Hide conversation thread
          cards: "visible",     // Show media cards
          align: "center",      // Center the tweet
          dnt: true            // Respect Do Not Track
        }
      ).then((el: HTMLElement) => {
        console.log(`Tweet ${tweetId} embedded successfully`);
      }).catch((error: any) => {
        console.error("Error embedding tweet:", error);
        if (tweetRef.current) {
          tweetRef.current.innerHTML = "Failed to load tweet";
        }
      });
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0] || url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div>
      <div className={`m-2 rounded-3xl w-72 shadow-2xl border-gray-400 border ${props.type === "youtube" ? "h-90" : ""}`}>
        {/* Header */}
        <div className="flex gap-2 p-2 items-center justify-between h-10 w-72">
          <div className="flex gap-4 pl-2 justify-center items-center text-md">
            <div className="text-gray-500"><Plusicon size="medium" /></div>
            {props.title}
          </div>
          <div className="flex gap-4 pr-2 text-gray-500 justify-center items-center">
            <div><Shareicon size="medium" /></div>
            <div><Deleteicon size="medium" /></div>
          </div>
        </div>

        {/* YouTube section */}
        {props.type === "youtube" && (
          <div className="w-72 h-40 pr-2">
            <iframe
              className="w-full h-full pl-1.5"
              src={getYouTubeEmbedUrl(props.url)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Tweet section */}
        {props.type === "tweet" && (
          <div
            ref={tweetRef}
            className="w-72 flex justify-center items-start overflow-hidden p-2 min-h-[200px]" // Added min-height for visibility
          >
            {/* Tweet will be dynamically inserted here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;