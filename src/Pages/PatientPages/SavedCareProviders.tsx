import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
import { useAllSavedCareProviders } from "@src/hooks/useUsers";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import dayjs from "dayjs";
import Pagination from "@components/Pagination/Pagination";
import TableSkeletonLoader from "@components/Loaders/TableSkeletonLoader";
// import columns from "@pages/PatientPages/";
function SavedCareProviders({
  debouncedSearchText,
  rating,
  page,
  setPage,
  // sort,
  // onSortClick,
}) {
  const [sort, setSort] = useState(true);
  // const [page, setPage] = useState(1);

  const {
    data: AllSavedCareProviders,
    refetch,
    isLoading: isLoadingAllSavedCareProvider,
  } = useAllSavedCareProviders(
    debouncedSearchText,
    rating,
    page,
    sort == true ? "asc" : "desc"
  );

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };

  //   const [page, setPage] = useState(1);

  const getColumns = (
    navigate: ReturnType<typeof useNavigate>
  ): TanDataTableColumn<dataTypes>[] => [
    {
      accessor: "first_name",
      header: "Provider’s Name",
      showSort: true,
      cell: ({ row }: { row: { original: dataTypes } }) => {
        const { id, organization_name, first_name, last_name, email } =
          row.original;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/patient/hospital-profile/${id}`)}
          >
            <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {organization_name}
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
      header: "Date",
      showSort: true,
      cell: ({ row }) => (
        <i>{dayjs(row?.original?.created_at).format("DD/MM/YY")}</i>
      ),
    },
    // {
    //   accessor: "total_rating",
    //   header: "Rating",
    //   showSort: true,
    //   cell: ({ getValue }) => {
    //     const rating = getValue();
    //     return rating ? rating : ""
    //   },
    // },

    {
      accessor: "total_rating",
      header: "Rating",
      showSort: true,
      cell: ({ getValue }) => {
        const rating = Number(getValue()) || 0;
        const totalStars = 5;

        const StarIcon = ({ filled }: { filled: boolean }) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "#FACC15" : "#D1D5DB"} // yellow-400 or gray-300
            width="20"
            height="20"
          >
            <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.267L12 19.771l-7.416 4.096L6 15.6 0 9.753l8.332-1.735z" />
          </svg>
        );

        return (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalStars }).map((_, index) => (
              <StarIcon key={index} filled={index < rating} />
            ))}
          </div>
        );
      },
    },
    {
      accessor: "specialization",
      header: "Specialization",
      showSort: true,
    },
    {
      accessor: "address",
      header: "Location",
      showSort: true,
    },
  ];

  const handleRowSelect = (row: dataTypes) => {};
  const navigate = useNavigate();
  const columns = React.useMemo(() => getColumns(navigate), [navigate]);
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="">
     { isLoadingAllSavedCareProvider ? (
      <TableSkeletonLoader />) : (
      <div className="overflow-x-auto">
        <TanDataTable<dataTypes>
          columns={columns}
          data={AllSavedCareProviders?.records ?? []}
          showCheckbox={false}
          onRowSelect={handleRowSelect}
          className="my-custom-class"
          onSortClick={onSortClick}
        />
      <div className="">
        <Pagination
          onPageChange={handlePageChange}
          totalRows={AllSavedCareProviders?.totalRecords}
          currentPage={page}
          rowsPerPage={3}
        />
      </div>{" "}
      </div>
      )}
    </div>
  );
}

export default SavedCareProviders;
