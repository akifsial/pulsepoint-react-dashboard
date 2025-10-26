import { ArrowRight, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DummyUser from "@assets/media/images/dummyUser.png";
import Button from "../shared/button";

interface ProfessionalCardProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  profileLink: string;
}

const ProfessionalCard = ({
  id,
  organization_name,
  last_name,
  total_rating,
  title,
  image,
  rating,
  profileLink,
}: ProfessionalCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-[#D5D5D5] fill-current"
        }`}
      />
    ));
  };

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="bg-[#F5F5F5] rounded-lg p-[20px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-row gap-2 justify-start items-center text-center">
        <img
          src={
            image
              ? `${import.meta.env.VITE_APP_API_IMG_URL}${image}`
              : DummyUser
          }
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <div className="">
          <h3 className="font-semibold text-start text-[16px] text-black mb-0">
            {" "}
            {organization_name}{" "}
          </h3>
          <p className="text-[14px] text-start text-normal text-black mb-3">
            {"Geriatric Specialist"}
          </p>
        </div>

      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {renderStars(total_rating)}
          <span className="ml-2 text-sm font-medium text-gray-900">
            {total_rating}
          </span>
        </div>

        {userInfo?.role_type == "PATIENT" ||
        userInfo?.role_type == "CARE_PROVIDER" ? (
          <Button
            className="!bg-black cursor-pointer flex items-center space-x-2"
            onClick={() =>
              userInfo?.role_type == "PATIENT"
                ? navigate(`/patient/care-provider/profile/${id}`)
                : navigate(`/care-provider/profile/${id}`)
            }
          >
            <span>Profile</span>
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfessionalCard;
