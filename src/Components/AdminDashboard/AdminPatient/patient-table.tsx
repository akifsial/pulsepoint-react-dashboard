import React, { useState, useEffect, useMemo } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@components/shared-components/inputs/common-input/common-input";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import UserInfo from "./use-iInfo";
import DropdownActions from "@components/dashboard-components/dropdown-actions/dropdown-actions";
import { FaRegFileAlt } from "react-icons/fa";
import { apiServices } from "@src/shared/api-services";
import apiEndpoint from "@src/shared/api-end-point";
import ExportTable from "@components/shared-components/export-table";
import autoTable from "jspdf-autotable";
import { debounce } from "lodash";
import SkeletonTableLoader from "@components/loader/skelton-table-loader";
import Pagination from "@components/pagination/pagination";
import { useNavigate } from "react-router-dom";
import AdminDropdownAction from "../admindropdownaction/admin-dropdown-action";

declare module "jspdf" {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

const PatientTable: React.FC = () => {
  type dataTypes = {
    id: number;
    first_name?: string;
    reviews?: string;
    patient?: number;
    lastdate?: string;
    status?: string;
    email?: string;
    date?: string;
    image?: string;
  };

  const [selectedUser, setSelectedUser] = useState<dataTypes | false>(false);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<dataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [, setRecentSearches] = useState<string[]>([]);
  const [patientsData, setPatientsData] = useState();
  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const fetchUserProfile = async () => {
    try {
      const response = await apiServices.get(apiEndpoint.me);
      if (response.data.success) {
        const userData = response.data.payload;
        const capitalizedFirstName = capitalizeFirstLetter(
          userData.first_name || ""
        );
        // capitalizedFirstName available if needed
        setUserId(userData.id);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  // integrating api for fetching patients data
  // API: server-side pagination
  const fetchPatients = async (search: string) => {
    try {
      setLoading(true);
      let url = apiEndpoint.getUsersByRole(
        `PATIENT&page=${currentPage}&limit=${pageSize}`
      );
      if (search && search.trim() !== "") {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const response = await apiServices.get(url);
      const records = response.data?.payload?.records || [];
      setTotalRecords(
        response.data?.payload?.totalRecords ?? records.length ?? 0
      );
      setPatientsData(response.data.payload);

      const mappedData: dataTypes[] = records.map((item: any) => ({
        id: item.id,
        first_name: item.first_name,
        email: item.email,
        image: item.image || dummyImage,
        date: new Date(item.created_at).toLocaleDateString(),
        status: item.status,
        reviews: "–",
        lastdate: new Date(item.updated_at).toLocaleDateString(),
        postal_code: item?.postal_code,
        community: item?.community,
      }));

      setPatientData(mappedData);
    } catch (error) {
      console.error("Failed to fetch patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  // recent search api and filteration
  const fetchRecentSearches = async () => {
    if (!userId) return;
    try {
      const response = await apiServices.get(
        apiEndpoint.getRecentSearches(userId)
      );
      if (response.data?.success) {
        setRecentSearches(response.data.payload || []);
      }
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // NOTE: only depend on userId and currentPage to avoid double-calls.
  useEffect(() => {
    if (userId !== null) {
      fetchPatients(searchText);
    }
  }, [userId, currentPage]);

  const debouncedFetchPatients = debounce((search: string) => {
    fetchPatients(search);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setCurrentPage(1); // reset page on new search
    debouncedFetchPatients(value);
  };

  // Filtered data
  const filteredResult = useMemo(
    () =>
      (patientData ?? []).filter((item) =>
        `${item.first_name ?? ""} ${item.email ?? ""} ${item.id}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [patientData, searchText]
  );

  // Pagination calculations now based on server total
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const handleRowSelect = (row: dataTypes) => {
  };

  const columns: TanDataTableColumn<dataTypes>[] = [
    {
      accessor: "first_name",
      header: "Patient’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { first_name, email, image, id } = row.original;
        return (
          <div
            className="flex mr-10 items-center gap-3 cursor-pointer"
            onClick={() => {
              // Navigate to UserInfo page with user ID in URL
              navigate(`/admin/patient-info/${id}`);
            }}
         
          >
            {/* <img
              src={`${import.meta.env.VITE_APP_API_IMG_URL}${image}`}
              alt={first_name}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            /> */}
            <img
              src={
                row.original.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      row.original.image
                    }`
                  : dummyImage
              }
              onError={(e) => {
                // if broken URL, fallback to dummyImage
                (e.currentTarget as HTMLImageElement).src = dummyImage;
              }}
              alt={row.original.first_name || "Patient"}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight ">
                {first_name}
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
      header: <span className="-ml-2">Registered Date</span>,
      showSort: true,
    },
    {
      accessor: "lastdate",
      header: <span className="-ml-3">Last Visit Date</span>,
      showSort: true,
    },
    {
      accessor: "status",
      header: "Status",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const status = row.original.status ?? "";
        const statusStyles: Record<"active" | "inactive", string> = {
          active: "text-[#067647] border-[1.5px] border-[#079455]",
          inactive: "text-[#C22E00] border-[1.5px] border-[#C22E00]",
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStyles[status.toLowerCase() as "active" | "inactive"] ||
              "bg-gray-200 text-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessor: "postal_code",
      header: "Zip Code",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        // const postal_code = row.original.postal_code ?? "";
        const { postal_code } = row.original;

        return <span className="ml-2.5">{postal_code ? postal_code : "N/A"}</span>;
      },
    },
  ];

  // Pagination UI
  // const Pagination = () => {
  //   if (totalRecords <= pageSize) return null;

  //   const canPrev = currentPage > 1;
  //   const canNext = currentPage < totalPages;

  //   type PageItem = number | "ELLIPSIS";

  //   const getPageItems = (): PageItem[] => {
  //     const items: PageItem[] = [];
  //     items.push(1);

  //     if (currentPage <= 2 && totalPages > 2) {
  //       items.push(2);
  //       if (totalPages > 3) items.push("ELLIPSIS");
  //     }

  //     if (currentPage > 2 && currentPage < totalPages - 1) {
  //       if (currentPage - 1 > 2) items.push("ELLIPSIS");
  //       items.push(currentPage - 1, currentPage, currentPage + 1);
  //       if (currentPage + 1 < totalPages - 1) items.push("ELLIPSIS");
  //     }

  //     if (currentPage >= totalPages - 1 && totalPages > 3) {
  //       items.push("ELLIPSIS");
  //       if (totalPages - 1 > 1) items.push(totalPages - 1);
  //     }

  //     if (totalPages > 1) items.push(totalPages);

  //     return items.filter((v, i, a) => a.indexOf(v) === i);
  //   };

  //   const items = getPageItems();

  //   const startIdx = totalRecords ? (currentPage - 1) * pageSize + 1 : 0;
  //   const endIdx = Math.min(currentPage * pageSize, totalRecords);

  //   return (
  //     <div className="py-4">
  //       <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
  //         {/* LEFT: statement */}
  //         <div className="text-sm text-[#6b7280]">
  //           Showing <span className="font-medium">{startIdx}</span> to{" "}
  //           <span className="font-medium">{endIdx}</span> of{" "}
  //           <span className="font-medium">{totalRecords}</span> results
  //         </div>

  //         {/* RIGHT: buttons */}
  //         <div className="flex items-center gap-2 md:justify-end">
  //           <button
  //             type="button"
  //             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
  //             disabled={!canPrev}
  //             className={`px-2 py-1 text-sm ${
  //               canPrev
  //                 ? "text-[#2563eb] hover:underline"
  //                 : "text-[#c7c7c7] cursor-default"
  //             }`}
  //           >
  //             Prev
  //           </button>

  //           {/* Page numbers with ellipsis */}
  //           {items.map((it, idx) =>
  //             it === "ELLIPSIS" ? (
  //               <span key={`e-${idx}`} className="px-2 text-sm text-[#111827]">
  //                 …
  //               </span>
  //             ) : (
  //               <button
  //                 key={it}
  //                 type="button"
  //                 onClick={() => setCurrentPage(it)}
  //                 className={`min-w-[34px] h-8 px-3 text-sm rounded
  //                   border border-[#E5E7EB]
  //                   ${
  //                     it === currentPage
  //                       ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
  //                       : "bg-white text-[#111827] hover:bg-[#F3F4F6]"
  //                   }`}
  //               >
  //                 {it}
  //               </button>
  //             )
  //           )}

  //           <button
  //             type="button"
  //             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
  //             disabled={!canNext}
  //             className={`px-2 py-1 text-sm ${
  //               canNext
  //                 ? "text-[#2563eb] hover:underline"
  //                 : "text-[#c7c7c7] cursor-default"
  //             }`}
  //           >
  //             Next
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="mb-10">
      {!selectedUser && (
        <h2 className="space-grotesk md:mt-0 mt-5 text-[25px] !font-bold text-heading leading-8 tracking-normal text-brand-ink">
          Patients List
        </h2>
      )}
      <div
        className={` mt-6 rounded-[10px] pt-6 ${
          selectedUser ? "" : "bg-white"
        }`}
      >
        {selectedUser ? (
          <UserInfo
            userData={selectedUser}
            goBack={() => setSelectedUser(false)}
          />
        ) : (
          <>
            <div className="mb-6 flex md:flex-row flex-col md:items-center px-5 md:justify-between">
              <h3 className="md:mb-0 mb-3 text-[20px] font-bold  space-grotesk">Patient's Details</h3>

              <div className="hidden lg:flex lg:flex-1 lg:justify-end px-5">
                <CommonInput
                  placeholder="Search by Name, Email, or ID"
                  value={searchText}
                  onChange={handleSearchChange}
                  onFocus={fetchRecentSearches}
                  showImg={true}
                  imgSrc={searchIcon}
                  imgLeft={true}
                  inputClassName="text-sm !placeholder-[#252525] inter"
                  containerClassName="rounded-[10px]"
                />
              </div>

              <div className="flex md:flex-row flex-col md:items-center md:gap-4 gap-3">
                <div className="relative">
                  <div className="relative">
                    <div className="flex items gap-4">
                      <ExportTable
                        data={filteredResult}
                        fileName="Patients"
                        columnNames={[
                          "Patient's Name",
                          "Email",
                          "Registered Date",
                          "Reviews",
                          "Last Visit Date",
                          "Status",
                        ]}
                        columnKeys={[
                          "first_name",
                          "email",
                          "date",
                          "reviews",
                          "lastdate",
                          "status",
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              {loading ? (
                <p className="text-center  text-gray-500 px-10 py-10">
                  <SkeletonTableLoader />
                </p>
              ) : (
                <>
                  <TanDataTable<dataTypes>
                    columns={columns}
                    data={patientData}
                    // showCheckbox={true}
                    onRowSelect={handleRowSelect}
                    showActions={true}
                    actions={(row) => (
                      <AdminDropdownAction
                        variant="default"
                        actions={[
                          {
                            label: "View Detail",
                            icon: <FaRegFileAlt className="text-gray-600" />,
                            type: "view",
                            onClick: () => {
                              // Navigate to UserInfo page with user ID in URL
                              navigate(`/admin/patient-info/${row.id}`);
                            },
                          },
                        ]}
                      />
                    )}
                  />
                  {/* <Pagination /> */}
                </>
              )}
            </div>
            <div>
              <Pagination
                rowsPerPage={pageSize}
                totalRows={patientsData?.totalRecords || 0} // ✅ API ka totalRecords use karo
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientTable;
