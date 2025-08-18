import { Bookmark } from "lucide-react";
import Tick from "@assets/media/svgs/patient-db-svgs/tick-circle.svg";
import ProfilePic from "@assets/media/svgs/patient-db-svgs/hospital-prof-img.svg";
import { useState } from "react";
import HospitalHeader from "./HospitalHeader";
import { useCareProviderSingle } from "@src/hooks/useDashboard";
import { ApiSavedCareProviders } from "@src/api/ApiDashboard";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SavedModal from "./Model/SavedModal";

interface HospitalProfileCardProps {
  name: string;
  imageUrl: string;
  email: string;
  specialty: string;
  description: string;
  id: number;
}

export default function HospitalProfileCard({
  name,
  imageUrl,
  email,
  specialty,
  description,
  id,
}: HospitalProfileCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data } = useCareProviderSingle(id);
  const queryClient = useQueryClient();
  const [savedModal, setSavedModal] = useState();
  // Example services data; replace or populate as needed
  const servicesData = [
    { id: 1, name: "24/7 Nursing Care" },
    { id: 2, name: "Assisted Living Apartments" },
    { id: 3, name: "Physical & Occupational Therapy" },
    { id: 4, name: "Hospice & Palliative Care" },
    { id: 5, name: "Memory Care Unit" },
  ];

  const {
    mutateAsync: savedCareProvidersMutation,
    isPending: savedCareProvidersPending,
  } = useMutation({
    mutationFn: () => ApiSavedCareProviders({ care_provider_id: data?.id }),

    onSuccess: async () => {
      toast.success("Care Provider Saved Successfully");
      queryClient.invalidateQueries(["useCareProviderSingle"]); // refetch list
    },
    onError: (error) => {
      toast.error("Something Went Wrong");
    },
  });

  const handleBookmarkToggle = async () => {
    if (savedCareProvidersPending) return;

    setIsBookmarked(!isBookmarked);

    if (data?.is_saved_care_provider == true) {
      // handleSaved()
      setSavedModal(true);
      return;
    }

    await savedCareProvidersMutation();
  };

  const handleSaved = async () => {
    await savedCareProvidersMutation();
    setSavedModal(false);
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center flex-wrap justify-between mb-6">
        {/* Left: Use HospitalHeader Component */}
        <HospitalHeader
          name="Johns Hopkins Hospital"
          imageUrl={ProfilePic}
          email="support@hopkinshospital.org"
          id={id}
        />

        {/* right: bookmark button */}
        {/* <button 
          type="button"
          onClick={handleBookmarkToggle}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark hospital"}
          className="w-10 h-10 mt-3 sm:mt-0 grid cursor-pointer place-items-center rounded-full border border-gray-300
               hover:bg-gray-100 transition-colors"
        >
          <Bookmark
            className={`w-4 h-4 ${
              data?.is_saved_care_provider
                ? "fill-current text-medical-blue"
                : "text-gray-700"
            }`}
          />
        </button> */}

        <button
          type="button"
          onClick={handleBookmarkToggle}
          disabled={savedCareProvidersPending}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark hospital"}
          className={`w-10 h-10 mt-3 sm:mt-0 grid cursor-pointer place-items-center rounded-full border border-gray-300
    hover:bg-gray-100 transition-colors ${
      savedCareProvidersPending ? "opacity-50 cursor-not-allowed" : ""
    }`}
        >
          <Bookmark
            className={`w-4 h-4 ${
              data?.is_saved_care_provider
                ? "fill-current text-medical-blue"
                : "text-gray-700"
            }`}
          />
        </button>
      </div>
      {savedModal && (
        <SavedModal
          onSaved={handleSaved}
          onClose={() => setSavedModal(false)}
          isOpen={true}
        />
      )}
      {/* About Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
        <div className="mb-3">
          <span className="text-sm text-gray-500 block mb-1">
            {data?.specialization}
          </span>
          <p className="text-sm text-gray-900 font-medium">{specialty}</p>
        </div>
        <h5>
          {data?.address} | {data?.organization_name}
        </h5>
        <p>{data?.additional_details}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Services Offered Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Services Offered:
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {data?.service?.length == 0 ? (
            <p className=" mt-5">No Service Found</p>
          ) : (
            data?.service?.map((service) => (
              <li
                key={service.id}
                className="flex items-center space-x-2 text-sm"
              >
                <img src={Tick} alt="" className="w-4 h-4 flex-shrink-0" />
                <span className="text-gray-700">{service.name}</span>
              </li>
            ))
          )}
        </ul>
        <div className=" sm:grid grid-cols-3 mt-7 gap-2 justify-between">
          {data?.gallary_images?.length > 0 ? (
            data.gallary_images.map((img) => (
              <div
                key={img.id}
                className="border sm:mb-0 mb-5 sm:py-0 py-4 flex justify-center border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow hover:scale-105 transition-transform duration-300 duration-300"
              >
                <img
                  src={`${import.meta.env.VITE_APP_API_IMG_URL}${img.image}`}
                  alt="Gallery"
                  className="w-25 h-25 object-cover "
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 italic">
              No gallery images found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
