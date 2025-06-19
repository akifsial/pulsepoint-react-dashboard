import StatsCommonCards from "@components/Dashboard-components/Cards/StatsCommonCards";
import React from "react";
import contacts from "@assets/media/svgs/dashboard-svgs/contacts.svg";
import stars from "@assets/media/svgs/dashboard-svgs/stars.svg";
import flags from "@assets/media/svgs/dashboard-svgs/flag.svg";
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
import ForumActivityCard from "@components/Dashboard-components/Cards/ForumActivityCard";

const CareProviderDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    date?: string;
    email?: string;
    image?: string;
    rating?: any;
    reviews?: string;
  };

  const columns = [
    {
      accessor: "userData",
      header: "Patient’s Name",
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
      accessor: "reviews",
      header: "Reviews",
      showSort: true,
    },
  ];

 const data: dataTypes[] = [
  {
    id: 1,
    first_name: "Ronald",
    last_name: "Richards",
    date: "9/4/12",
    email: "tim.jennings@example.com",
    image: "/images/alice.png",
    rating: <RatingStars value={5} isDisabled={true} />,
    reviews: "Staff was caring and responsive, though the wait time could be improved.",
  },
  {
    id: 2,
    first_name: "Dianne",
    last_name: "Russell",
    date: "5/7/16",
    email: "alma.lawson@example.com",
    image: "/images/michael.png",
    rating: <RatingStars value={4} isDisabled={true} />,
    reviews: "Excellent support for my mother with dementia. Highly recommended.",
  },
  {
    id: 3,
    first_name: "Jacob",
    last_name: "Jones",
    date: "10/6/13",
    email: "kenzi.lawson@example.com",
    image: "/images/michael.png",
    rating: <RatingStars value={4} isDisabled={true} />,
    reviews: "Facilities are clean and staff is friendly. A bit pricey, but worth it.",
  },
  {
    id: 4,
    first_name: "Devon",
    last_name: "Lane",
    date: "2/11/12",
    email: "dolores.chambers@example.com",
    image: "/images/michael.png",
    rating: <RatingStars value={3} isDisabled={true} />,
    reviews: "Great amenities and staff. Rooms were spacious and bright.",
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
          count={128}
          title="Total Patient Reviews"
          cardImg={contacts}
          imgBg="#EEE0FF"
          borderBg="#9747FF"
        />
        <StatsCommonCards
          count={10}
          title="Unread Messages or Questions"
          cardImg={stars}
          imgBg="#D8F6D4"
          borderBg="#52C343"
        />
        <StatsCommonCards
          count={10}
          title="Flagged Reviews"
          cardImg={flags}
          imgBg="#FFE8CF"
          borderBg="#F98A17"
        />
        <StatsCommonCards
          count={87}
          title="Profile Views This Month"
          cardImg={userSearch}
          imgBg="#E2F0F6"
          borderBg="#007AB2"
        />
      </div>
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3">Recent Reviews</h3>
          <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
            <p className="text-[#252525] font-medium text-sm">Filter by</p>
            <div className="relative">
              <div className="flex items gap-4 ">
                <PrimaryButton
                  btnText="ratings"
                  showImg={true}
                  imgClass="w-[24px] h-[24px] object-cover"
                  img={filterIcon}
                  imgPosition="left"
                  btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
                  onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                />
                <PrimaryButton
                  btnText="View All Reviews"
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
        <div>
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
        </div>
      </div>
      <div className="bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between mb-4">
            <h3 className="mb-3 md:mb-0">Community Forum Activity</h3>
            <div className="flex items-center gap-3">
              <p className="text-[#252525] font-medium text-sm">Filter by</p>
              <PrimaryButton
                btnText="Today"
                showImg={true}
                imgClass="w-[24px] h-[24px] object-cover"
                img={filterIcon}
                imgPosition="left"
                btnClass="border border-[#252525] px-4 md:w-[101px] w-full py-[10px] rounded-[10px] text-[#252525] text-sm font-medium"
                // onClick={() => setShowRatingDropdown(!showRatingDropdown)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2  grid-cols-1 gap-[13px]">
            <ForumActivityCard />
            <ForumActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareProviderDashboard;
