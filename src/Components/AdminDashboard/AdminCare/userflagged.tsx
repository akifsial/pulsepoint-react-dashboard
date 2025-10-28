import React, { useState } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@src/Components/Dashboardcomponents/dropdownactions/dropdownactions";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";

interface PostFlag {
  id: number;
  user_id: number;
  post_id: number;
  deleted: boolean;
  created_at: string;
  post?: {
    id: number;
    title?: string;
    community?: { id: number; title?: string };
    post_report?: { name?: string }[];
  };
}

interface Props {
  post_flag?: PostFlag[];
}

const UserFlagged: React.FC<Props> = ({ post_flag }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3; 

  type dataTypes = {
    id: number;
    community: string;
    post: string;
    date: string;
    reason: string;
  };

  const tableData: dataTypes[] =
    post_flag?.map((item) => ({
      id: item.id,
      community: item.post?.community?.title || "--",
      post: item.post?.title || "--",
      date: item.created_at
        ? new Date(item.created_at).toLocaleDateString()
        : "--",
      reason: item.post?.post_report?.[0]?.report_reason?.name || "--",
    })) || [];

  const columns: TanDataTableColumn<dataTypes>[] = [
    { accessor: "community", header: "Community", showSort: true },
    { accessor: "post", header: "Post Title", showSort: true },
    { accessor: "date", header: "Date", showSort: true },
    { accessor: "reason", header: "Reason", showSort: true },
  ];

  const totalRecords = tableData.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const paginatedData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


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
                className={`min-w-[34px] h-8 px-3 text-sm rounded border ${
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
      <div className="mt-6 bg-white rounded-[10px] px-4 py-6 mb-6">
        <h3 className="mb-4 text-[20px] font-bold space-grotesk">
          Flagged Posts
        </h3>
        {paginatedData.length > 0 ? (
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
        ) : (
          <div className="text-center text-sm text-gray-500 py-10">
            No flagged posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFlagged;
