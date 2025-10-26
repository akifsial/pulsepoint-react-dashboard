import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Calndar from "@assets/media/svgs/dashboard-svgs/calendar.svg"
import Dummy from "@assets/media/images/dummyUser.png"
import { format } from "date-fns";


interface ResourceCardProps {
  title: string;
  category: string;
  image: string;
  readTime: string;
  link: string;
}

const ResourceCard = ({
  title,
  content,
  category,
  image,
  readTime,
  id,
  link,
  featured_image,
  date
}: ResourceCardProps) => {

const formattedDate = date
  ? new Date(date).toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
  : "";


  return (
    <Link
      to={`/blog/${id}`}
      className="group w-full flex flex-col justify-between gap-5 rounded-lg overflow-hidden  transition-shadow duration-300"
    >
      <div className=" bg-gray-100">
        <img
          src={featured_image?.url}
          className="!w-full h-[150px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-0">
        <div className="flex items-center text-xs text-blue-500 font-medium mb-2">
          <span><img src={Calndar} alt="" /></span>
          <span className="text-[#252525] font-normal text-[15px] px-2 py-1 rounded">{formattedDate}</span>

        </div>
        <h3 className="font-bold text-[22px] text-gray-900 mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="font-normal text-[16px] text-[#252525]">
         {content}
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
