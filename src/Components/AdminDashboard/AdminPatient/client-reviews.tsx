
import React from "react";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import RatingStars from "@components/shared-components/rating-stars";
import close from "@assets/media/svgs/dashboard-svgs/close-circle.svg"

interface ClientReviewsProps {
  filterValue: string;
}

const ClientReviews: React.FC<ClientReviewsProps> = ({ filterValue }) => {
  const sliders = [
    {
      image: userImage,
      userName: "Patricia M.",
      userHour: "5 hours ago",
      flagIcon: flag,
      review: "5.0",
      userIcon: userReview,
      img1: close,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available.I could finally breathe knowing that she was in good hands",
      flagged: "Flagged",
      comment: "Thank you so much for your honest feedback.😊🙏",
    },
    {
      image: userImage,
      userName: "John D.",
      userHour: "10 hours ago",
      flagIcon: flag,
      review: "5.0",
      userIcon: userReview,
      img1: close,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available.I could finally breathe knowing that she was in good hands",
      flagged: "Flagged",
    },
  ];

  return (
    <>
     <div className="flex gap-5">
       {sliders.map((item, index) => (
        <div key={index} className="bg-[#FAFAFA] rounded-[8px] p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[18px]">
              <img
                src={item.image}
                alt="User"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div className="flex gap-2.5 text-[#252525] text-[16px]">
                <p className=" font-bold mb-0.5">{item.userName}</p>
                <p className="">{item.userHour}</p>
              </div>
            </div>
            <div className="border rounded-[5px] p-2">
              <span>Deleted Review</span>
              <img src={item.img1} alt="" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <RatingStars value={item.review} isDisabled={true} />
            <p className="text-[16px] text-[#252525]">({item.review})</p>
          </div>

          <div>
            <p className="text-[16px] text-[#252525] ">“{item.sliderDesc}”</p>
          </div>
        </div>
      ))}
     </div>
    </>
  );
};

export default ClientReviews;
