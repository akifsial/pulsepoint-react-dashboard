import { Bookmark } from "lucide-react";
import Tick from "@assets/media/svgs/patient-db-svgs/tick-circle.svg";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import { useState } from "react";
import HospitalHeader from "@components/hospital-header";
import { useCareProviderSingle } from "@src/hooks/use-dashboard";
import { ApiSavedCareProviders } from "@src/api/api-dashboard";
import toast from "react-hot-toast";
import backArrow from "@assets/media/svgs/dashboard-svgs/arrow-left.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import UnSavedModal from "@components/model/un-saved-modal";
import SavedModal from "@components/model/saved-modal";
import { useNavigate, useParams } from "react-router-dom";
import HospitalProfileCard from "@components/hospital-profile-card";
import ContactInformationCard from "@components/contact-information-card";
import RatingsReviewsSection from "@components/review/ratings-reviews-section";
import TopBar from "@components/website/layout/top-bar";
import UtilityRow from "@components/website/layout/utility-row";
import { useGetBlogs } from "@src/hooks/use-website";

interface HospitalProfileCardProps {
  name: string;
  imageUrl: string;
  email: string;
  specialty: string;
  description: string;
  id: number;
}

export default function CareProviderProfile({
  name,
  imageUrl,
  email,
  specialty,
  description,
}: // id,
HospitalProfileCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams<{ id: string }>();

  // const providerId=JSON.parse(localStorage.getItem("userInfo")).id
  const { data } = useCareProviderSingle(id);
  const queryClient = useQueryClient();
  const [unSavedModal, setUnSavedModal] = useState();
  const [savedModal, setSavedModal] = useState(false);

  // Example services data; replace or populate as needed

  const {
    mutateAsync: savedCareProvidersMutation,
    isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: () => ApiSavedCareProviders({ care_provider_id: data?.id }),

    onSuccess: async () => {
      if (data?.is_saved_by_patients) {
        toast.success("Care Provider Unsaved Successfully");
      } else {
        toast.success("Care Provider Saved Successfully");
      }
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleBookmarkToggle = async () => {
    if (savedCareProvidersPending) return;

    setIsBookmarked(!isBookmarked);

    if (data?.is_saved_by_patients == true) {
      // agar already saved hai → Unsave modal dikhana
      setUnSavedModal(true);
      return;
    }

    // agar abhi tak saved nahi hai → SaveModal dikhana
    handleSaveClick();
  };

  const handleSaved = async () => {
    await savedCareProvidersMutation();
    setUnSavedModal(false);
  };



  const handleSaveClick = () => {
    if (savedCareProvidersPending) return;
    // Pehle modal kholna
    setSavedModal(true);
  };

  // jab modal me confirm ho
  const handleConfirmSave = async () => {
    await savedCareProvidersMutation();
    setSavedModal(false);
  };

  const navigate = useNavigate();

  const userType = JSON.parse(localStorage.getItem("userInfo")).role_type;

  const handleBackFeed = () => {
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl">
      <TopBar />
      <UtilityRow />
      <main className="  max-w-7xl mx-auto md:px-4 md:px-6 px-0 lg:px-8 md:pt-12 pt-4 pb-6">
        <div
          className="flex mt-5  items-center gap-2.5 cursor-pointer pb-4 bg-transparent sticky top-0 z-10"
          onClick={() => handleBackFeed()}
        >
          <img src={backArrow} alt="backArrow" />
          <h2 className="text-xl font-semibold text-[#252525]  font-[Space Grotesk]">
            Back to Web
          </h2>
        </div>
        {/* Hospital Profile and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
          <HospitalProfileCard
            name={""}
            imageUrl={""}
            email={""}
            specialty={""}
            description={""}
            id={id}
          />
          <ContactInformationCard
            address={""}
            phone={""}
            weekdayHours={""}
            weekendHours={""}
            id={id}
          />
        </div>
        <RatingsReviewsSection rating={data?.ratingData?.avg_rating} id={id} />
      </main>
    </div>
  );
}
