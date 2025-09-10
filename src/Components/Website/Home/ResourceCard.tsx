import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Calndar from "@assets/media/svgs/dashboard-svgs/calendar.svg"
interface ResourceCardProps {
  title: string;
  category: string;
  image: string;
  readTime: string;
  link: string;
}

const ResourceCard = ({
  title,
  category,
  image,
  readTime,
  link,
}: ResourceCardProps) => {
  return (
    <Link
      to={link}
      className="group w-full flex flex-col justify-between gap-5 rounded-lg overflow-hidden  transition-shadow duration-300"
    >
      <div className=" bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full !w-[376px] !min-h-[215px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-0">
        <div className="flex items-center text-xs text-blue-500 font-medium mb-2">
          {/* <span className="bg-blue-100 px-2 py-1 rounded">{category}</span> */}
          <span><img src={Calndar} alt="" /></span>
          <span className="text-[#252525] font-normal text-[15px] px-2 py-1 rounded">10 December 2025</span>

        </div>
        <h3 className="font-bold text-[22px] text-gray-900 mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="font-normal text-[16px] text-[#252525]">
          Limited Travel Deals Domestic and International flights Limited deals
          on both local and international flights …
        </p>
        <div className="flex items-center text-sm ">
          <span>{readTime}</span>
        </div>
        <div className="mt-3">
          <span className="text-[#2DB3FF]  text-[16px] font-semibold ">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;
