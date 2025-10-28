import React, { useEffect, useState } from "react";
import TanDataTable from "@src/Components/dashboard-components/tanstack-data-table/tan-data-table";
import DropdownActions from "@src/Components/Dashboard-components/dropdownactions/dropdownactions";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { TanDataTableColumn } from "@src/Components/dashboard-components/tanstack-data-table/types";

const UserCommunityPatient: React.FC<any> = (userData) => {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const communityData: dataTypes[] = Array.isArray(
    userData?.userData?.community_members
  )
    ? userData.userData.community_members.map((member: any) => ({
        id: member.id,
        first_name: member.user?.first_name || userData.userData.first_name,
        last_name: member.user?.last_name || userData.userData.last_name,
        email: member.user?.email || userData.userData.email,
        role_type: member.user?.role_type || userData.userData.role_type,
        image: member.user?.image || null,
        status: member.status, 
        updated_at: member.created_at, 
        community: member?.community,
        asdasd: "asd",
      }))
    : [];

  const pageSize = 3;
  const totalRecords = communityData?.length;
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

  type dataTypes = {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    role_type?: string;
    image?: string | null;
    status?: string;
    updated_at?: string;
  };

  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    const paginatedData =
      communityData?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ) || [];

    setPaginationData(paginatedData?.reverse());
  }, [currentPage, pageSize]);

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Member's Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => (
        <div className="flex items-center gap-3">
          <img
            src={
              row.original.image
                ? `${import.meta.env.VITE_APP_API_IMG_URL}${row.original.image}`
                : dummyImage
            }
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = dummyImage;
            }}
            alt={row.original.first_name || "Member"}
            className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
          />
          <div className="flex gap-1 flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {row.original.first_name} {row.original.last_name}
            </span>
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessor: "role_type",
      header: <span className="ml-12 w-35">Role</span>,
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => (
        <div className="flex w-35 justify-center items-center gap-3">
          <div className="flex gap-1 flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {row.original.role_type === "CARE_PROVIDER"
                ? "Care Provider"
                : "Patient"}
            </span>
          </div>
        </div>
      ),
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
      cell: ({ row }: { row: { original: dataTypes } }) => (
        <div className="flex items-center gap-3">
          <div className="flex gap-1 flex-col">
            <span className="font-medium text-sm text-[#252525] leading-tight">
              {row.original.updated_at
                ? new Date(row.original.updated_at).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const status = row.original.status?.toLowerCase();
        const statusStyles = {
          approved: "text-[#067647] border-[1.5px] border-[#079455]",
          inactive: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStyles[status as "approved" | "inactive"] ||
              "bg-gray-200 text-gray-700"
            }`}
          >
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "-"}
          </span>
        );
      },
    },
  ];

  const handleRowSelect = (row: dataTypes) => {};


  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-6 flex md:flex-row flex-col md:items-center md:justify-between">
          <h3 className="md:mb-0 mb-3 text-[20px] font-bold space-grotesk">
            Community Participation
          </h3>
        </div>
        <div>
          {activeTab === "all" ? (
            <TanDataTable<dataTypes>
              columns={columns}
              data={[...paginationData].reverse()}
              onRowSelect={handleRowSelect}
              showActions={false}
              className="my-custom-class"
              actions={(row) => <DropdownActions />}
            />
          ) : (
            <p>No saved communities yet.</p>
          )}
        </div>

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

export default UserCommunityPatient;
