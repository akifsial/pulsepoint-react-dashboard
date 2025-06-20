import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfessionalCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  profileLink: string;
}

const ProfessionalCard = ({ name, title, image, rating, profileLink }: ProfessionalCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{title}</p>
        
        <div className="flex items-center mb-3">
          {renderStars(rating)}
          <span className="ml-2 text-sm font-medium text-gray-900">{rating}</span>
        </div>
        
        <Link
          to={profileLink}
          className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfessionalCard;