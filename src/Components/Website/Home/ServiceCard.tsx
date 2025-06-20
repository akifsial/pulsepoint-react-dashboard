import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
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
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <Link
            to={link}
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;