


import React, { useState } from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import DropdownActions from "@components/Dashboard-components/Dropdown-actions/DropdownActions";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";

const  UserFlagged: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  type dataTypes = {
    id?: number;
    community?: string;
    role?: string;
    post?: string;
    date?: string;
    reason?: string;
    image?: string;
  };


  const columns: TanDataTableColumn<dataTypes>[] = [
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
      accessor: "reason",
      header: "Reason",
      showSort: true,
    },
   
  ];

  const data: dataTypes[] = [
    {
      id: 1,
      community: "Asthma Wellness Group",
      post: "Tips for Spring Air Quality",
      date: "9/4/12",
      reason: "misinformation"
    },
    {
      id: 2,
      community: "Asthma Wellness Group",
      post: "Tips for Spring Air Quality",
      date: "9/4/12",
       reason: "Spam/Pormotion"
    },
    
  ];

  const handleRowSelect = (row: dataTypes) => {
    console.log("Selected row:", row);
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
          <h3 className="md:mb-0 mb-3">Flagged Post</h3>
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

export default  UserFlagged;
