import React from "react";
import SelectCommonBox from "@components/Dashboard-components/SelectCommonBox";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import PatientReviewsCard from "@components/Dashboard-components/Cards/PatientReviewsCard";
import { v4 as uuid } from "uuid";

const PatinetReviews: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("flagged"); 

  const statusOptions = [
    { id: uuid(), label: "All Flagged", value: "flagged" },
    { id: uuid(), label: "None", value: "none" },
  ];

  return (
   <div>
  <h2 className="mb-4">Patient Reviews</h2>
  <div className="bg-[#FFFFFF] rounded-[10px] px-5 py-5">
    
    {/* Fixed Header */}
    <div className="mb-7 flex md:flex-row flex-col md:items-center md:justify-between">
      <h3 className="md:mb-0 mb-3">View and respond to feedback</h3>
      <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
        <div className="relative flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[#252525] font-medium text-sm">Show Reviews</p>
            <SelectCommonBox
              value={filterValue}
              onChange={(val) => setFilterValue(val)}
              options={statusOptions}
              className="w-full md:w-[200px] h-[40px] text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <PrimaryButton
              btnText="Ratings"
              showImg={true}
              imgClass="w-[24px] h-[24px] object-cover"
              img={filterIcon}
              imgPosition="left"
              btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
              onClick={() => setShowRatingDropdown(!showRatingDropdown)}
            />
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {showRatingDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-[60px] w-50 z-50"
              >
                <RatingFilterDropdown />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>

    {/* Scrollable Area */}
    <div className="h-[510px] overflow-y-auto pr-2">
      <PatientReviewsCard filterValue={filterValue} />
    </div>
  </div>
</div>

  );
};

export default PatinetReviews;
