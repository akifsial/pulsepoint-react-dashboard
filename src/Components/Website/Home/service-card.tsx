import { useState } from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Kitne characters tak short description dikhani hai
  const previewLength = 120;
  const shouldTruncate = description.length > previewLength;

  const displayedText = isExpanded
    ? description
    : description.slice(0, previewLength) + (shouldTruncate ? "..." : "");

  return (
    <div className="bg-white rounded-lg overflow-hidden duration-300">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={image}
            alt={title}
            className="h-48 md:h-full w-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            {displayedText}
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#2DB3FF] cursor-pointer hover:underline hover:text-blue-600 font-semibold text-sm focus:outline-none"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}

          {/* Optional link below description */}
          {/* <Link
            to={link}
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm mt-3"
          >
            Go to Service
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
