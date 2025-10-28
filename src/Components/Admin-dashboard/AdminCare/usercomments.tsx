import React, { useState } from "react";
import TanDataTable from "@src/Components/dashboard-components/tanstack-data-table/tan-data-table";
import { TanDataTableColumn } from "@src/Components/dashboard-components/tanstack-data-table/types";
import DropdownActions from "@src/Components/Dashboard-components/dropdownactions/dropdownactions";

interface Props {
  commentData: Array<{
    id: number;
    post_id: number;
    user_id: number;
    parent_id: number | null;
    status: string;
    content: string;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    post?: {
      community?: {
        id: number;
        title: string;
      };
    };
  }>;
}

type dataTypes = {
  id: number;
  community: string;
  postId: number;
  date: string;
  reviews: string;
};

const UserComments: React.FC<Props> = ({ commentData }) => {
  const columns: TanDataTableColumn<dataTypes>[] = [
    { accessor: "community", header: "Community", showSort: true },
    { accessor: "postId", header: "Post ID", showSort: true },
    { accessor: "date", header: "Date", showSort: true },
    { accessor: "reviews", header: "Comment", showSort: true },
  ];

  const data: dataTypes[] =
    commentData?.map((item) => ({
      id: item.id,
      community: item.post?.community?.title || "—",
      postId: item.post_id,
      date: new Date(item.created_at).toLocaleDateString(),
      reviews: item.content || "—",
    })) || [];

  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 3;
  const totalRecords = commentData?.length;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const Pagination = () => {

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    type PageItem = number | "ELLIPSIS";

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

    const startIdx = totalRecords ? (currentPage - 1) * pageSize + 1 : 0;
    const endIdx = Math.min(currentPage * pageSize, totalRecords);

    return (
      <div className="py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[#6b7280]">
            Showing <span className="font-medium">{startIdx}</span> to{" "}
            <span className="font-medium">{endIdx}</span> of{" "}
            <span className="font-medium">{totalRecords}</span> results
          </div>

          <div className="flex items-center gap-2 md:justify-end">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!canPrev}
              className={`px-2 py-1 text-sm ${
                canPrev
                  ? "text-[#2563eb] hover:underline cursor-pointer"
                  : "text-[#c7c7c7] cursor-not-allowed"
              }`}
            >
              Prev
            </button>

            {items.map((it, idx) =>
              it === "ELLIPSIS" ? (
                <span key={`e-${idx}`} className="px-2 text-sm text-[#111827]">
                  …
                </span>
              ) : (
                <button
                  key={it}
                  type="button"
                  onClick={() => setCurrentPage(it)}
                  className={`min-w-[34px] cursor-pointer h-8 px-3 text-sm rounded 
                    border border-[#E5E7EB]
                    ${
                      it === currentPage
                        ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                        : "bg-white text-[#111827] hover:bg-[#F3F4F6]"
                    }`}
                >
                  {it}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={!canNext}
              className={`px-2 py-1 text-sm ${
                canNext
                  ? "text-[#2563eb] hover:underline cursor-pointer"
                  : "text-[#c7c7c7] cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 font-bold text-[20px] space-grotesk">
            Comments on Posts
          </h3>
        </div>

        {data?.length > 0 ? (
          <TanDataTable<dataTypes>
            columns={columns}
            data={paginatedData}
            onRowSelect={handleRowSelect}
            showActions={false}
            className="my-custom-class"
            actions={(row) => <DropdownActions />}
          />
        ) : (
          <div className="text-center text-sm text-gray-500 py-10">
            No comments found.
          </div>
        )}
        <Pagination
          totalRecords={totalRecords}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default UserComments;
