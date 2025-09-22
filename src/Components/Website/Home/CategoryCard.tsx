import { Link, Navigate, useNavigate } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}
import dummyPost from "@assets/media/images/dashboard-images/postFallback.png"
const CategoryCard = ({ id, title, image, url_key,categoryName }: CategoryCardProps) => {
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role_type;
  const handleCategory = () => {
    if (userRole == "PATIENT") {
      navigate(`/patient/web/category?id=${id}&category=${categoryName}`);
    }
    if (userRole == "CARE_PROVIDER") {
      navigate(`/web/category?id=${id}&category=${categoryName}`);
    }

    navigate(`/web/category?id=${id}&category=${categoryName}`)
  };
  return (
    <p
      // to={link}oncli
      onClick={handleCategory}
      className="group cursor-pointer relative overflow-hidden rounded-lg  hover:shadow-md transition-shadow duration-300"
    >
      <div className="aspect-square w-full overflow-hidden ">
        <img
          src={`${image ? image : dummyPost}`}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-center font-medium text-black md:text-[18px] text-[14px] group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
      </div>
    </p>
  );
};

export default CategoryCard;
