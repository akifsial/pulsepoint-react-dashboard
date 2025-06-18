import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import React from "react";


const ReportTable: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  type dataTypes = {
    id?: string
    post?: string;
    users?:string;
    user?: string;
    type?: string;
    community?: string;
    flagged?: string;
    date?: string;
    status?: string;
  };

  const columns = [
    {
      accessor: "post",
      header: "Post ID",
      showSort: true,
    },
    // {
    //   accessor: "userData",
    //   header: "Topic Names",
    //   showSort: true,
    //   cell: ({ row }: any) => {
    //     const { first_name, last_name, email } = row.original;
    //     return (
    //       <div className="flex items-center gap-3">
    //         <div className="flex flex-col">
    //           <span className="font-medium text-sm text-[#252525] leading-tight">
    //             {first_name} {last_name}
    //           </span>
    //           <span className="text-xs text-gray-500 leading-tight">
    //             {email}
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      accessor: "users",
      header: "Users",
      showSort: true,
    },
    {
      accessor: "user",
      header: "User",
      showSort: true,
    },
    {
      accessor: "type",
      header: "Type",
      showSort: true,
    },
    {
      accessor: "community",
      header: "Community",
      showSort: true,
    },
    {
      accessor: "flagged",
      header: "Flagged",
      showSort: true,
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
    },
    {
      accessor: "date",
      header: "Action Date",
      showSort: true,
    },
  ];

  const data: dataTypes[] = [
    {
      id: "1",
      post: "CM-1224",
      users: "Savannah Nguyen",
      user: "Patient",
      type: "Discussion",
      community: "Dementia Support",
      flagged: "Yes",
      status: "Under review",
      date: "9/4/12"
    }, 
    {
      id: "1",
      post: "CM-1224",
      users: "Savannah Nguyen",
      user: "Patient",
      type: "Discussion",
      community: "Dementia Support",
      flagged: "Yes",
      status: "Under review",
      date: "9/4/12"
    }, 
    {
      id: "1",
      post: "CM-1224",
      users: "Savannah Nguyen",
      user: "Patient",
      type: "Discussion",
      community: "Dementia Support",
      flagged: "Yes",
      status: "Under review",
      date: "9/4/12"
    }, 
    {
      id: "1",
      post: "CM-1224",
      users: "Savannah Nguyen",
      user: "Patient",
      type: "Discussion",
      community: "Dementia Support",
      flagged: "Yes",
      status: "Under review",
      date: "9/4/12"
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
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-3 flex md:flex-row flex-col md:items-center md:justify-between">
          <h4>Trending Topics in Communities</h4>
        </div>
        <div>
          <TanDataTable<dataTypes>
            columns={columns}
            data={data}
            showCheckbox={false}
            onRowSelect={handleRowSelect}
            className="my-custom-class"
          />
        </div>
      </div>
    </div>
  );
};

export default ReportTable;

