import React from "react";
import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";


const CareProviderDashboard: React.FC = () => {
  const [showRatingDropdown, setShowRatingDropdown] = React.useState(false);
  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    Replies?:string;
    Users?:string;
    date?: string;
    LastActive?: string;
  };

  const columns = [
    {
      accessor: "id",
      header: "Id",
      showSort: true,
    },
    {
      accessor: "userData",
      header: "Topic Names",
      showSort: true,
      cell: ({ row }: any) => {
        const { first_name, last_name, email } = row.original;
        return (
          <div className="flex items-center gap-3">
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
      accessor: "Replies",
      header: "Replies",
      showSort: true,
    },
    {
      accessor: "Users",
      header: "Users",
      showSort: true,
    },
    {
      accessor: "LastActive",
      header: "Last Active",
      showSort: true,
    },
  ];

  const data: dataTypes[] = [
    {
      id: "01",
      first_name: "Best Hospitals for Post-Surgery Rehab?",
      Replies: "100",
      Users: "45k",
      LastActive: "1h ago",
    },
    {
      id: "02",
      first_name: "Signs of Quality in Nursing Homes",
      Replies: "73",
      Users: "1.0M",
      LastActive: "1h ago",
    },
    {
      id: "03",
      first_name: "Home Health vs. Hospice-Whats'Right",
      Replies: "56",
      Users: "1.0k",
      LastActive: "2h ago",
    },
    {
      id: "04",
      first_name: "Hidden Costs in Long-Term Care Facilities",
      Replies: "67",
      Users: "55k",
      LastActive: "3h ago",
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
            showCheckbox={true}
            onRowSelect={handleRowSelect}
            className="my-custom-class"
          />
        </div>
      </div>
    </div>
  );
};

export default CareProviderDashboard;
