import React from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
import ReviewForm from "@components/ReviewForm";

// Provider clinic images (you can replace these with actual clinic logos)
// import mayoClinicLogo from "@assets/media/images/dashboard-images/mayo-clinic.png";
// import clevelandClinicLogo from "@assets/media/images/dashboard-images/cleveland-clinic.png";
// import johnsHopkinsLogo from "@assets/media/images/dashboard-images/johns-hopkins.png";

const AdminPatientReviews: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");

  type ReviewDataTypes = {
    id?: number;
    provider_name?: string;
    provider_email?: string;
    date?: string;
    rating?: number | string | React.ReactNode;
    reviews?: string;
    location?: string;
    provider_logo?: string;
  };

  const columns: TanDataTableColumn<ReviewDataTypes>[] = [
    {
      accessor: "provider_name",
      header: "Provider's Name",
      showSort: true,
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { provider_name, provider_email, provider_logo } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={provider_logo || dummyImage}
              alt={provider_name}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {provider_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {provider_email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessor: "date",
      header: "Date",
      showSort: true,
      cell: (info: any) => <i>{info.getValue()}</i>,
    },
    {
      accessor: "rating",
      header: "Rating",
      showSort: true,
    },
    {
      accessor: "reviews",
      header: "Reviews",
      showSort: false,
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { reviews } = row.original;
        return (
          <div className="max-w-xs">
            <span className="text-sm text-[#252525] line-clamp-2">
              "{reviews}"
            </span>
          </div>
        );
      },
    },
    {
      accessor: "location",
      header: "Location",
      showSort: true,
      cell: ({ row }: { row: { original: ReviewDataTypes } }) => {
        const { location } = row.original;
        return (
          <div className="flex items-center">
            <span className="text-sm text-[#252525]">{location}</span>
          </div>
        );
      },
    },
  ];

  const reviewsData: ReviewDataTypes[] = [
    {
      id: 1,
      provider_name: "Mayo Clinic",
      provider_email: "contact@mayoclinic.org",
      date: "9/4/12",
      // provider_logo: mayoClinicLogo,
      rating: <RatingStars value={5} isDisabled={true} />,
      reviews: "Staff was caring and responsive, though the wait time could be improved.",
      location: "📍200 1st St SW, Rochester",
    },
    {
      id: 2,
      provider_name: "Cleveland Clinic",
      provider_email: "info@clevelandclinic.com",
      date: "5/7/16",
      // provider_logo: clevelandClinicLogo,
      rating: <RatingStars value={4} isDisabled={true} />,
      reviews: "Excellent support for my mother with dementia. Highly recommended.",
      location: "📍9500 Euclid Ave, Cleveland",
    },
    {
      id: 3,
      provider_name: "Johns Hopkins Hospital",
      provider_email: "support@hopkinshospital.org",
      date: "10/6/13",
      // provider_logo: johnsHopkinsLogo,
      rating: <RatingStars value={4} isDisabled={true} />,
      reviews: "Facilities are clean and staff is friendly. A bit pricey, but worth it.",
      location: "📍1800 Orleans St, Baltimore",
    },
    {
      id: 4,
      provider_name: "Massachusetts Gr. Hospital",
      provider_email: "info@massgeneral.org",
      date: "2/11/12",
      provider_logo: dummyImage,
      rating: <RatingStars value={2} isDisabled={true} />,
      reviews: "Great amenities and staff. Rooms were spacious and bright.",
      location: "📍55 Fruit St, Boston",
    },
    {
      id: 5,
      provider_name: "Cedars-Sinai Medical Center",
      provider_email: "hello@cedars-sinai.org",
      date: "3/4/16",
      provider_logo: dummyImage,
      rating: <RatingStars value={1} isDisabled={true} />,
      reviews: "Compassionate end-of-life care. They made a difficult time easier.",
      location: "📍8700 Beverly Blvd, LA",
    },
    {
      id: 6,
      provider_name: "Mount Sinai Hospital",
      provider_email: "contact@mountsinai.org",
      date: "8/15/14",
      provider_logo: dummyImage,
      rating: <RatingStars value={1} isDisabled={true} />,
      reviews: "The food quality was inconsistent, but the overall experience was positive.",
      location: "📍1 Gustave L. Levy Pl, NY",
    },
    {
      id: 7,
      provider_name: "UCLA Medical Center",
      provider_email: "info@uclahealth.org",
      date: "11/22/15",
      provider_logo: dummyImage,
      rating: <RatingStars value={0} isDisabled={true} />,
      reviews: "They offered a variety of activities that kept my father engaged.",
      location: "📍757 Westwood Plaza, LA",
    },
  ];

  const handleRowSelect = (row: ReviewDataTypes) => {
    console.log("Selected row:", row);
  };

  return (
    <div className="mb-10">
      <h2
        className="
          font-space-grotesk
          font-bold
          text-heading
          leading-8
          tracking-normal
          text-brand-ink
          align-middle
        "
      >
        My Reviews
      </h2>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Given Reviews</h3>
          {/* searchbar */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
            <CommonInput
              placeholder="Search with Provider name , zip code"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              showImg={true}
              imgSrc={searchIcon}
              imgLeft={true}
              inputClassName="text-sm"
              containerClassName="w-full max-w-sm"
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter By</p>
            <div className="relative">
              <div className="flex items gap-4">
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
              <AnimatePresence>
                {showRatingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-[60px] w-50 z-50"
                  >
                    <RatingFilterDropdown />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <TanDataTable<ReviewDataTypes>
            columns={columns}
            data={reviewsData}
            showCheckbox={false}
            onRowSelect={handleRowSelect}
            showActions={true}
            className="my-custom-class"
            actions={(row) => (
              <DropdownActions
                onEdit={() => console.log("Edit Review", row.id)}
                onDelete={() => console.log("Delete Review", row.id)}
              />
            )}
          />
        </div>
    </div>
      </div>
  );
};

export default AdminPatientReviews;