import React from "react";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import RatingStars from "@components/Shared-components/RatingStars";

interface PatientReviewsCardProps {
  filterValue: string;
}

const PatientReviewsCard: React.FC<PatientReviewsCardProps> = ({ filterValue }) => {
  const sliders = [
    {
      image: userImage,
      userName: "Patricia M.",
      userHour: "5 hours ago",
      flagIcon: flag,
      review: "5.0",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available.",
      flagged: "Flagged",
      comment: "Thank you so much for your honest feedback.😊🙏",
    },
    {
      image: userImage,
      userName: "John D.",
      userHour: "10 hours ago",
      flagIcon: flag,
      review: "4.5",
      userIcon: userReview,
      sliderDesc:
        "The facility was clean, and staff was attentive. My only complaint is the food quality.",
      flagged: "Flagged",
    },
  ];

  return (
    <>
      {sliders.map((item, index) => (
        <div key={index} className="bg-[#FAFAFA] rounded-[8px] p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[10px]">
              <img
                src={item.image}
                alt="User"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div>
                <p className="text-[#252525] text-[16px] font-bold mb-0.5">{item.userName}</p>
                <p className="text-[#252525] text-[16px]">{item.userHour}</p>
              </div>
            </div>

            {filterValue === "flagged" && (
              <div className="border border-[#D3D3D3] rounded-[10px] px-2 py-3 flex items-center gap-2">
                <img src={item.flagIcon} alt="flag" className="w-[24px] h-[24px]" />
                <p className="text-[16px] text-[#252525]">{item.flagged}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <RatingStars value={item.review} isDisabled={true} />
            <p className="text-[16px] text-[#252525]">({item.review})</p>
          </div>

          <div>
            <p className="text-[16px] text-[#252525] mb-4">“{item.sliderDesc}”</p>
          </div>

          <div
            className="flex items-center gap-4 px-4 py-2.5 rounded-[5px]"
            style={item.comment ? { backgroundColor: "#EEF2F5" } : {}}
          >
            <img
              src={item.userIcon}
              alt=""
              className="w-[43px] h-[43px] object-cover rounded-full"
            />

            {item.comment ? (
              <p>{item.comment}</p>
            ) : (
              <input
                type="text"
                placeholder="Add a reply"
                className="w-full bg-white outline-0 border-[1px] rounded-[5px] p-2.5 text-sm"
                style={{ borderColor: "#D3D3D3" }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PatientReviewsCard;
