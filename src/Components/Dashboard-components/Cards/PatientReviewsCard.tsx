import React, { useState } from "react";
// import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import userImage from "@assets/media/svgs/dashboard-svgs/userImage.svg";
import userReview from "@assets/media/svgs/dashboard-svgs/userReview.svg";
import flag from "@assets/media/svgs/dashboard-svgs/flag2.svg";
import RatingStars from "@components/Shared-components/RatingStars";
import { useApiMyReviews } from "@src/hooks/useMyReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiFlagReview } from "@src/api/ApiMyReviews";
import { Flag } from "lucide-react";
import FlagModal from "@components/Model/FlagModal";

interface PatientReviewsCardProps {
  filterValue: string;
}

const PatientReviewsCard: React.FC<PatientReviewsCardProps> = ({
  filterValue,
}) => {
  const sliders = [
    {
      image: userImage,
      userName: "Patricia M.",
      userHour: "5 hours ago",
      flagIcon: flag,
      review: "5.0",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
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
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      flagged: "Flagged",
    },
    {
      image: userImage,
      userName: "John D.",
      userHour: "10 hours ago",
      flagIcon: flag,
      review: "4.5",
      userIcon: userReview,
      sliderDesc:
        "Golden Years Rehab treated my mother like family. The staff was patient, kind, and always available. I could finally breathe knowing she was in good hands.",
      flagged: "Flagged",
    },
  ];

  const [flagModalOpen,setFlagModalOpen]=useState(true)

  const { data } = useApiMyReviews();
  console.log("____________", data);

  const queryClient=useQueryClient()

  const {
    mutateAsync: flagReviewMutation,
    // isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: (feedbackId) => ApiFlagReview(feedbackId),

    onSuccess: async () => {
      toast.success("Review Flagged Successfully");
      queryClient.invalidateQueries(["useApiMyReviews"]); // refetch list
    },
    onError: (error) => {
      // toast.error("Something Went Wrong");
    },
  });

  const handleFlagReview = async (feedbackId,reviewFlag) => {

    await flagReviewMutation(feedbackId);
  };

  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="bg-[#FAFAFA] rounded-[8px] p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-[10px] text-[#252525] text-[16px]">
              <img
                src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                  item?.patient?.image
                }`}
                alt="User"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />

              <p className=" font-bold mb-0.5">
                {item.patient?.first_name} {item.patient?.first_name}
              </p>
              <span className="text-[13px]">{item.userHour}</span>
            </div>

            {filterValue === "flagged" && (
              <div
                onClick={()=>handleFlagReview(item?.feedback?.id,item?.review_flag)}
                className="border  border-[#D3D3D3] rounded-[10px] px-[7px] py-[9.5px] flex items-center gap-2"
              >
                {item?.review_flag.length > 0 ? (
                  <img src={flag} alt="flag" className="w-[24px] h-[24px]" />
                ) : (
                  <Flag />
                )}
                <p className="text-[16px] text-[#252525]">{item.flagged}</p>
              </div>
            )}
          </div>
          {/* <FlagModal onDelete={()=>handleFlagReview(item?.feedback?.id,item?.review_flag)} isOpen={true} /> */}


          <div className="flex items-center gap-0.5 mb-2">
            <RatingStars value={item.review} isDisabled={true} />
            <p className="text-[16px] text-[#252525]">({item.rating})</p>
          </div>

          <div className="">
            <p className="text-[16px] text-[#252525] mb-4">“{item.content}”</p>
          </div>

          <div
            className="flex items-center gap-4 px-4 py-2.5 rounded-[5px]"
            style={item.comment ? { backgroundColor: "#EEF2F5" } : {}}
          >
            <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${
                item.care_provider.image
              }`}
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
