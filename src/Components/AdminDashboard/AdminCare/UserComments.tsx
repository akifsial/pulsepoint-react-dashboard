
import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const  UserComments: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    community?: string;
    role?: string;
    post?: string;
    date?: string;
    reviews?: string;
    image?: string;
  };


  const columns: TanDataTableColumn<dataTypes>[] = [
    // {
    //   accessor: "first_name",
    //   header: "Provider’s Name",
    //   showSort: true,
    //   cell: ({ row }: { row: { original: dataTypes } }) => {
    //     const { first_name } = row.original;
    //     return (
    //       <div className="flex items-center gap-3">
    //         <img
    //           src={dummyImage}
    //           alt={`${first_name} `}
    //           className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
    //         />
    //         <div className="flex flex-col">
    //           <span className="font-medium text-sm text-[#252525] leading-tight">
    //             {first_name} 
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      accessor: "community",
      header: "Community",
      showSort: true,
    },
    {
      accessor: "post",
      header: "Post Title",
      showSort: true,
    },
    {
      accessor: "date",
      header: "Date",
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
      community: "Asthma Wellness Group",
      post: "Tips for Spring Air Quality",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be imporoved"
    },
    {
      id: 2,
      community: "Asthma Wellness Group",
      post: "Tips for Spring Air Quality",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be imporoved"
    },
    {
     id: 3,
      community: "Asthma Wellness Group",
      post: "Tips for Spring Air Quality",
      date: "9/4/12",
      reviews: "Staff was caring and responsive, though the wait time could be imporoved"
    },
  ];

  const handleRowSelect = (row: dataTypes) => {
  };

  const renderActions = (row: dataTypes) => (
    <button onClick={() => alert(`Edit ${row.first_name} ${row.last_name}`)}>
      Edit
    </button>
  );

  const handleTabClick = (tab: "all" | "saved") => {
    setActiveTab(tab);
  };
  const [searchText, setSearchText] = React.useState<string>("");

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 font-space-grotesk">Comments on Posts</h3>
        </div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit", row.id)}
                  onDelete={() => console.log("Delete", row.id)}
                />
              )}
            />
          ) : (
            <TanDataTable<dataTypes>
              columns={columns}
              data={data.slice(0, 3)}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => (
                <DropdownActions
                  onView={() => console.log("View Detail", row.id)}
                  onEdit={() => console.log("Edit", row.id)}
                  onDelete={() => console.log("Delete", row.id)}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default  UserComments;
