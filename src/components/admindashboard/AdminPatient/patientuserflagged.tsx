import React, { useEffect, useState } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";

interface PostFlag {
  id: number;
  user_id: number;
  post_id: number;
  deleted: boolean;
  created_at: string;
  post: {
    id: number;
    title: string;
    community_id: number;
    created_at: string;
    post_report: {
      id: number;
      comment: string;
      report_reason: {
        name: string;
      };
    }[];
    community: {
      title: string;
    };
  };
}

interface Props {
  postFlagData: PostFlag[];
}

type DataTypes = {
  id: number;
  community: string;
  post: string;
  date: string;
  reason: string;
};

const PatientUserFlagged: React.FC<Props> = ({ postFlagData }) => {
  const columns: TanDataTableColumn<DataTypes>[] = [
    { accessor: "community", header: "Community", showSort: true },
    { accessor: "post", header: "Post Title", showSort: true },
    { accessor: "date", header: "Date", showSort: true },
    { accessor: "reason", header: "Reason", showSort: true },
  ];


  const data: DataTypes[] =
    postFlagData
      ?.filter((item) => item?.deleted === true) 
      .map((item) => ({
        id: item.id,
        community: item.post?.community?.title || "—",
        post: item.post?.title || "—",
        date: new Date(item.created_at).toLocaleDateString(),
        reason: item.post?.post_report?.[0]?.report_reason?.name || "—",
      })) || [];

  
  const handleRowSelect = (row: DataTypes) => {
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationData, setPaginationData] = useState([]);

  const pageSize = 3;
  const totalRecords = postFlagData?.length;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const Pagination = () => {

    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    type PageItem = number | "ELLIPSIS";

    const getPageItems = (): PageItem[] => {
      const items: PageItem[] = [];
      items.push(1);

      if (currentPage <= 2 && totalPages > 2) {
        items.push(2);
        if (totalPages > 3) items.push("ELLIPSIS");
      }

      if (currentPage > 2 && currentPage < totalPages - 1) {
        if (currentPage - 1 > 2) items?.push("ELLIPSIS");
        items.push(currentPage - 1, currentPage, currentPage + 1);
        if (currentPage + 1 < totalPages - 1) items.push("ELLIPSIS");
      }

      if (currentPage >= totalPages - 1 && totalPages > 3) {
        items.push("ELLIPSIS");
        if (totalPages - 1 > 1) items.push(totalPages - 1);
      }

      if (totalPages > 1) items.push(totalPages);

      return items.filter((v, i, a) => a.indexOf(v) === i);
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
              className={`px-2 cursor-pointer py-1 text-sm ${
                canPrev
                  ? "text-[#2563eb] hover:underline"
                  : "text-[#c7c7c7] cursor-default"
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
                  ? "text-[#2563eb] hover:underline"
                  : "text-[#c7c7c7] cursor-default"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };


  useEffect(() => {
    const paginatedData =
      postFlagData
        ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        ?.map((item) => ({
          id: item.id,
          community: item.post?.community?.title || "—",
          post: item.post?.title || "—",
          date: new Date(item.created_at).toLocaleDateString(),
          reason: item.post?.post_report?.[0]?.report_reason?.name || "—",
        })) || [];

    setPaginationData(paginatedData.reverse()); 
  }, [currentPage, pageSize, postFlagData]);

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 space-grotesk font-bold text-lg">
            Flagged Post
          </h3>
        </div>

        <TanDataTable<DataTypes>
          columns={columns}
          data={[...paginationData].reverse()}
          onRowSelect={handleRowSelect}
          showActions={false}
          className="my-custom-class"
        />
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

export default PatientUserFlagged;
