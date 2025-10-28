import React, { useState, useEffect, useMemo } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import searchIcon from "@assets/media/svgs/patient-db-svgs/search-icon.svg";
import CommonInput from "@src/Components/Sharedcomponents/Inputs/CommonInput/commoninput";
import { TanDataTableColumn } from "@components/dashboard-components/tanstack-data-table/types";
import UserInfo from "./useiInfo";
import DropdownActions from "@src/Components/Dashboardcomponents/dropdownactions/dropdownactions";
import { FaRegFileAlt } from "react-icons/fa";
import { apiServices } from "@src/shared/apiservices";
import apiEndpoint from "@src/shared/apiendpoint";
import ExportTable from "@src/Components/Sharedcomponents/exporttable";
import autoTable from "jspdf-autotable";
import { debounce } from "lodash";
import SkeletonTableLoader from "@src/Components/loader/skeltontableloader";
import Pagination from "@src/Components/Pagination/pagination";
import { useNavigate } from "react-router-dom";
import AdminDropdownAction from "../admindropdownaction/admindropdownaction";

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
  const [userId, setUserId] = useState<number | null>(null);
  const [, setRecentSearches] = useState<string[]>([]);
  const [patientsData, setPatientsData] = useState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const dummyPatientData = {
    records: [
      {
        id: 1,
        first_name: "Oliver Smith",
        email: "oliver.smith@nhs.uk",
        image: "", 
        date: "2024-03-12",
        lastdate: "2024-09-25",
        status: "active",
        postal_code: "SW1A 1AA",
      },
      {
        id: 2,
        first_name: "Amelia Johnson",
        email: "amelia.johnson@nhs.uk",
        image: "",
        date: "2024-02-20",
        lastdate: "2024-08-10",
        status: "inactive",
        postal_code: "E1 6AN",
      },
      {
        id: 3,
        first_name: "George Brown",
        email: "george.brown@nhs.uk",
        image: "",
        date: "2024-04-05",
        lastdate: "2024-09-15",
        status: "active",
        postal_code: "M1 1AE",
      },
      {
        id: 4,
        first_name: "Isla Taylor",
        email: "isla.taylor@nhs.uk",
        image: "",
        date: "2024-05-10",
        lastdate: "2024-09-28",
        status: "active",
        postal_code: "B1 1TB",
      },
      {
        id: 5,
        first_name: "Harry Wilson",
        email: "harry.wilson@nhs.uk",
        image: "",
        date: "2024-01-15",
        lastdate: "2024-07-12",
        status: "inactive",
        postal_code: "L1 8JQ",
      },
      {
        id: 6,
        first_name: "Sophia Davies",
        email: "sophia.davies@nhs.uk",
        image: "",
        date: "2024-03-22",
        lastdate: "2024-09-09",
        status: "active",
        postal_code: "CF10 1EP",
      },
      {
        id: 7,
        first_name: "Jack Miller",
        email: "jack.miller@nhs.uk",
        image: "",
        date: "2024-02-02",
        lastdate: "2024-09-30",
        status: "inactive",
        postal_code: "G1 1XW",
      },
    ],
  };

  const [patientData, setPatientData] = useState<dataTypes[]>(
    dummyPatientData.records
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(
    dummyPatientData.records.length
  );

  const fetchUserProfile = async () => {
    try {
      const response = await apiServices.get(apiEndpoint.me);
      if (response.data.success) {
        const userData = response.data.payload;
        const capitalizedFirstName = capitalizeFirstLetter(
          userData.first_name || ""
        );
        setUserId(userData.id);
      }
    } catch (error) {
    }
  };
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
    } finally {
      setLoading(false);
    }
  };

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
    }
  };


  useEffect(() => {
    fetchUserProfile();
  }, []);

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
    setCurrentPage(1); 
    debouncedFetchPatients(value);
  };

  const filteredResult = useMemo(
    () =>
      (patientData ?? []).filter((item) =>
        `${item.first_name ?? ""} ${item.email ?? ""} ${item.id}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [patientData, searchText]
  );

  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const handleRowSelect = (row: dataTypes) => {};

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
              navigate(`/admin/patient-info/${id}`);
            }}
          >
            <img
              src={
                row.original.image
                  ? `${import.meta.env.VITE_APP_API_IMG_URL}${
                      row.original.image
                    }`
                  : dummyImage
              }
              onError={(e) => {
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
        const { postal_code } = row.original;

        return (
          <span className="ml-2.5">{postal_code ? postal_code : "N/A"}</span>
        );
      },
    },
  ];

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
              <h3 className="md:mb-0 mb-3 text-[20px] font-bold  space-grotesk">
                Patient's Details
              </h3>

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
                    data={filteredResult}
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
                            onClick: () =>
                              navigate(`/admin/patient-info/${row.id}`),
                          },
                        ]}
                      />
                    )}
                  />

                </>
              )}
            </div>
            <div>
              <Pagination
                rowsPerPage={pageSize}
                totalRows={patientsData?.totalRecords || 0} 
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
