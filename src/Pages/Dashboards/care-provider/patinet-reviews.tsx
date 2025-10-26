import React, { useEffect } from "react";
import SelectCommonBox from "@components/dashboard-components/select-common-box";
import { PrimaryButton } from "@components/shared-components/buttons/common-button/common-button";
import { AnimatePresence, motion } from "framer-motion";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import RatingFilterDropdown from "@components/dashboard-components/dropdowns/rating-filter-dropdown";
import PatientReviewsCard from "@components/dashboard-components/cards/patient-reviews-card";
import { v4 as uuid } from "uuid";
import { useMeApi } from "@src/hooks/use-users";
import { useNavigate } from "react-router-dom";

const PatinetReviews: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [rating, setRating] = React.useState("");
  const navigate=useNavigate()
    const { data:MeData,refetch:MeDataFetch } = useMeApi(navigate);
  
    useEffect(()=>{
      MeDataFetch()
    })
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRatingDropdown(false);
      }
    };

    if (showRatingDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRatingDropdown]);

  const statusOptions = [
    { id: uuid(), label: "All Reviews", value: "" },
    { id: uuid(), label: "All Flagged", value: "1" },
    { id: uuid(), label: "None", value: "0" },
  ];



  return (
    <div>
      <h2 className="mb-4 text-[25px] font-bold space-grotesk">Patient Reviews</h2>
      <div className="bg-[#FFFFFF] rounded-[10px] md:px-5 md:py-5 px-3 py-3">
        <div className="mb-7 flex lg:flex-row flex-col lg:items-center lg:justify-between">
          <h3 className="lg:mb-0 space-grotesk text-[20px] font-bold mb-3">View and respond to feedback</h3>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <div className="relative md:flex items-center gap-4">
              <div className="flex items-center gap-2 md:mb-0 mb-5">
                <p className="text-[#252525] inter font-medium text-sm">
                  Show Reviews
                </p>
                <SelectCommonBox
                  value={filterValue}
                  onChange={(val) => setFilterValue(val)}
                  options={statusOptions}
                  className="w-full inter md:w-[125px] h-[44px] text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[#252525] inter font-medium text-sm">Filter by</p>
                <PrimaryButton
                  btnText={` ${rating} Ratings`}
                  showImg={true}
                  imgClass="w-[24px] h-[24px] ml-2 object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border inter flex border-[#252525] px-4 md:w-[101px] h-[46px] w-full py-[10px] rounded-lg text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
              </div>

              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-[60px] w-50 z-50"
                  >
                    <RatingFilterDropdown
                      setRating={setRating}
                      setShowRatingDropdown={setShowRatingDropdown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="h-[510px] overflow-y-auto pr-2">
          <PatientReviewsCard
            filterValue={filterValue}
            rating={rating}
          />
        </div>
      </div>
    </div>
  );
};

export default PatinetReviews;
