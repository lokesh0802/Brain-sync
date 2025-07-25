import React from "react";
import TweetEmbed from "react-tweet-embed";
import { Deleteicon } from "../../icons/Deleteicon";
import Yotube from "../../icons/Yotube";
import { Twitter } from "../../icons/Twitter";
import { Document } from "../../icons/Document";

interface CardProps {
  title: string;
  type: "youtube" | "tweet" | "project";
  url?: string;
  description?: string;
  icon?: React.ReactNode;
  onDelete?: () => void;
}

export function Card({ title, type, url, description, icon, onDelete }: CardProps) {
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
    <div className="m-2 rounded-2xl w-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:border-indigo-100 h-fit">
      <div className="flex gap-2 p-3 items-center justify-between border-b border-gray-50">
        <div className="flex gap-3 items-center text-md">
          {type === "project" ? (
            icon || <Document size="medium" />
          ) : type === "youtube" ? (
            <Yotube />
          ) : (
            <Twitter />
          )}
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        <div className="flex gap-3 text-gray-400">
          <div 
            className="hover:text-red-500 transition-colors cursor-pointer"
            onClick={onDelete}
          >
            <Deleteicon size="medium" />
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Content section */}
        <div className="space-y-2">
          {type === "youtube" && url ? (
            <div className="w-full aspect-video p-2">
              <iframe
                className="w-full h-full rounded-xl shadow-sm bg-gray-50"
                src={getYouTubeEmbedUrl(url)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : type === "tweet" && url && getTweetId(url) ? (
            <div className="w-full overflow-hidden p-2">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <TweetEmbed tweetId={getTweetId(url)} />
              </div>
            </div>
          ) : null}

          {/* Description section */}
          {description && (
            <div className={`
              p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-t border-gray-100
              ${type === "project" ? "max-h-[300px] overflow-y-auto" : ""}
            `}>
              <p className="text-gray-600 break-words text-sm leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
