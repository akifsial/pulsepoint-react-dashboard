import StatsCommonCards from "@components/Dashboard-components/Cards/StatsCommonCards";
import React from "react";
import userSearch from "@assets/media/svgs/dashboard-svgs/user-search.svg";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import filterIcon from "@assets/media/svgs/dashboard-svgs/filter-icon.svg";
import ForwardArrow from "@assets/media/svgs/dashboard-svgs/arrow-forward-white.svg";
import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
import { AnimatePresence, motion } from "framer-motion";
import RatingFilterDropdown from "@components/Dashboard-components/Dropdowns/RatingFilterDropdown";
import RatingStars from "@components/Shared-components/RatingStars";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import WriteReview from "@assets/media/svgs/dashboard-svgs/writen-review.svg";
import ThumbsUp from "@assets/media/svgs/dashboard-svgs/thumbs-up.svg";
// import Admindb from "@assets/media/svgs/admin-db-svgs/admin-dashboard.svg";
import alice from "@assets/media/images/dashboard-images/alice.svg";

const AdminDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    rating?: React.ReactNode;
    reviews?: string;
    specialization?: string;
    location?: string;
  };

  const columns = [
    {
      accessor: "userData",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: any) => {
        const { first_name, last_name, email } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {first_name} {last_name}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {email}
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
      accessor: "specialization",
      header: "Specialization",
      showSort: true,
    },
    {
      accessor: "location",
      header: "Location",
      showSort: true,
    },
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Alice",
      last_name: "Border",
      date: "9/04/12",
      email: "alice.border@example.com",
      // image: "/images/dashboard-images/alice.svg",
      image: alice,
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Elderly care",
      location: "📍200 1st St SW, Rochester",
    },
    {
      id: 2,
      first_name: "Michael",
      last_name: "Schofield",
      date: "9/04/16",
      email: "michael.schofield@example.com",
      image: "/images/michael.png",
      rating: <RatingStars value={3} isDisabled={true} />,
      specialization: "Post-surgical rehab",
      location: "📍190 E Bannock St, Boise, ID 83712",
    },
    {
      id: 3,
      first_name: "Sarah",
      last_name: "Johnson",
      date: "10/04/19",
      email: "sarah.johnson@example.com",
      image: "/images/sarah.png",
      rating: <RatingStars value={4} isDisabled={true} />,
      specialization: "Harmony Memory Care",
      location: "📍T9500 Euclid Ave, Cleveland,",
    },
    {
      id: 4,
      first_name: "John",
      last_name: "Doe",
      date: "12/04/22",
      email: "john.doe@example.com",
      image: "/images/john.png",
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Fitness  services.",
      location: "📍1468 Madison Ave, NY 10029",
    },
    {
      id: 5,
      first_name: "Emily",
      last_name: "Davis",
      date: "15/04/23",
      email: "emily.davis@example.com",
      image: "/images/emily.png",
      rating: <RatingStars value={2} isDisabled={true} />,
      specialization: "Rehabilitation Center",
      location: "📍8900 N Kendall Dr, Miami, FL 33176",
    },
  ];

  const handleRowSelect = (row: Person) => {
    console.log("Selected row:", row);
  };

  const renderActions = (row: Person) => (
    <button onClick={() => alert(`Edit ${row.name}`)}>Edit</button>
  );
  return (
    <div className="mb-10">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[13px]">
        <StatsCommonCards
          count={40}
          title={
            <>
              Total Care <br />
              Providers Listing
            </>
          }
          cardImg={userSearch}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={25}
          title="Total Reviews Written"
          cardImg={WriteReview}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={4.6}
          title="Average Rating Given"
          cardImg={ThumbsUp}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
      </div>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Care Providers</h3>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="flex items gap-4 ">
                <PrimaryButton
                  btnText="Ratigs"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <PrimaryButton
                  btnText="View All Listing"
                  btnTextClass="text-[#FFFFFF] text-sm font-semibold"
                  showImg={true}
                  imgClass="w-[14px] h-[13px] object-cover"
                  img={ForwardArrow}
                  imgPosition="right"
                  btnClass="border border-[#252525] px-4 py-3 md:w-[180px] w-full rounded-[10px] bg-[#000000]"
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
        {/* <div>
          <TanDataTable<dataTypes>
            columns={columns}
            data={data}
            showCheckbox={false}
            onRowSelect={handleRowSelect}
            actions={renderActions}
            showActions={true}
            className="my-custom-class"
            actions={(row) => (
              <DropdownActions
                onView={() => console.log("View", row.id)}
                onEdit={() => console.log("Edit", row.id)}
                onDelete={() => console.log("Delete", row.id)}
              />
            )}
          />
        </div> */}
        <div>
  <TanDataTable<dataTypes>
    columns={columns}
    data={data}
    showCheckbox={false}
    onRowSelect={handleRowSelect}
    showActions={true}
    className="my-custom-class"
    actions={(row) => (
      <DropdownActions
        onView={() => console.log("View", row.id)}
        onEdit={() => console.log("Edit", row.id)}
        onDelete={() => console.log("Delete", row.id)}
      />
    )}
  />
</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
