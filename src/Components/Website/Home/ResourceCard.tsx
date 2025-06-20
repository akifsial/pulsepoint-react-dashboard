import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

interface ResourceCardProps {
  title: string;
  category: string;
  image: string;
  readTime: string;
  link: string;
}

const ResourceCard = ({ title, category, image, readTime, link }: ResourceCardProps) => {
  return (
    <Link 
      to={link}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-xs text-blue-500 font-medium mb-2">
          <span className="bg-blue-100 px-2 py-1 rounded">{category}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{readTime}</span>
        </div>
        <div className="mt-3">
          <span className="text-blue-500 text-sm font-medium group-hover:text-blue-600">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard;