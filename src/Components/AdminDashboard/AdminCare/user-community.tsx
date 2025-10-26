import React, { useState } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@components/dashboard-components/dropdown-actions/dropdown-actions";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import { divide } from "lodash";

const UserCommunity: React.FC<any> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;

  type dataTypes = {
    id?: number;
    first_name?: string;
    role?: string;
    image?: string;
    lastdate?: string;
    status?: string;
    user?: any;
    updated_at?: string;
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Member's Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { user } = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={dummyImage}
              alt={user?.user_name || "User"}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {user?.user_name}
              </span>
              {user?.email}
            </div>
          </div>
        );
      },
    },
    {
      accessor: "role",
      header: <span className=" w-35">Role</span>,
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { user } = row.original;
        return (
          <div className="flex w-35 justify-center items-center flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {user?.role_type === "CARE_PROVIDER"
                ? "Care Provider"
                : "Patient"}
            </span>
          </div>
        );
      },
    },
    {
      accessor: "community",
      header: "Community",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => (
        <div className="flex items-center gap-3">
          <div className="flex gap-1 flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {row.original.community?.title}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessor: "updated_at",
      header: "Last Visit Date",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { updated_at } = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {updated_at ? new Date(updated_at).toLocaleDateString() : "-"}
            </span>
          </div>
        );
      },
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const status = row.original?.status?.toLowerCase();
        const isActive = status === "approved";
        const statusClass = isActive
          ? "text-[#067647] border-[1.5px] border-[#079455] bg-[#ECFDF3]"
          : "text-gray-600 border border-gray-400 bg-gray-100";

        const displayStatus = status
          ? status.charAt(0).toUpperCase() + status.slice(1)
          : "Unknown";

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass}`}
          >
            {displayStatus}
          </span>
        );
      },
    },
  ];

  const data: dataTypes[] = Array.isArray(userData?.community_members)
    ? userData?.community_members
    : [];

  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRowSelect = (row: dataTypes) => {};

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const getPageItems = (): (number | "ELLIPSIS")[] => {
      const items: (number | "ELLIPSIS")[] = [];
      const siblings = 1; 
      const firstPage = 1;
      const lastPage = totalPages;

      if (totalPages <= 5 + siblings * 2) {
        for (let i = 1; i <= totalPages; i++) items.push(i);
      } else {
        const left = Math.max(currentPage - siblings, 2);
        const right = Math.min(currentPage + siblings, totalPages - 1);

        items.push(firstPage);
        if (left > 2) items.push("ELLIPSIS");

        for (let i = left; i <= right; i++) items.push(i);

        if (right < totalPages - 1) items.push("ELLIPSIS");
        items.push(lastPage);
      }

      return items;
    };

    const items = getPageItems();

    return (
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 py-2">
          Showing{" "}
          {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
          results
        </div>
        <div className="py-4 flex justify-end gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={!canPrev}
            className={`px-2 py-1 text-sm ${
              canPrev
                ? "text-blue-600 hover:underline cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Prev
          </button>

          {items.map((it, idx) =>
            it === "ELLIPSIS" ? (
              <span key={`e-${idx}`} className="px-2 text-sm">
                …
              </span>
            ) : (
              <button
                key={it}
                onClick={() => setCurrentPage(it as number)}
                className={`min-w-[34px] cursor-pointer h-8 px-3 text-sm rounded border ${
                  it === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {it}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={!canNext}
            className={`px-2 py-1 text-sm ${
              canNext
                ? "text-blue-600 hover:underline cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 font-bold text-[20px] space-grotesk">
            Community Participation
          </h3>
        </div>

        {activeTab === "all" && (
          <>
            <TanDataTable<dataTypes>
              columns={columns}
              data={paginatedData}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => <DropdownActions />}
            />
            <Pagination />
          </>
        )}

        {activeTab === "saved" && <p>Saved tab content here...</p>}
      </div>
    </div>
  );
};

export default UserCommunity;
