import type { Likes } from "../types/lp";
import { formatSimpleRelativeTime } from "../utils/formatSimpleRelaticeTime";



export const Card = ({ thumbnail, title, likes, published }: { thumbnail: string; title: string; likes: Likes[]; published: Date }) => {
  return (
    <div className="relative w-56 h-56 overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-110">
      <img
        className="w-full h-full object-cover transition-transform duration-300"
        src={thumbnail}
        alt={title}
      />


      <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50 flex p-3 justify-between items-end opacity-0 group-hover:opacity-100">
        <span>
            <h2 className="text-white text-md font-bold mb-2">
            {title}
            </h2>
            <p className="text-gray-300 text-sm">
            {formatSimpleRelativeTime(published)}
            </p>
        </span>
        
        <p className="flex-none text-gray-200 mt-2">
          ❤️ {likes.length}
        </p>
      </div>
    </div>
  );
};