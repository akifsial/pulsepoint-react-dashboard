import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import { useAllSavedCareProviders } from "@src/hooks/use-users";
import dummyImage from "@assets/media/images/dashboard-images/userDummy.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import dayjs from "dayjs";
import Pagination from "@components/pagination/pagination";
import TableSkeletonLoader from "@components/loaders/table-skeleton-loader";
import alice from "@assets/media/images/dashboard-images/alice.svg";
import RatingStars from "@components/shared-components/rating-stars";
function SavedCareProviders({
  debouncedSearchText,
  rating,
  page,
  setPage,
}) {
  const [sort, setSort] = useState(true);

  const {
    data: AllSavedCareProviders,
    refetch,
    isLoading: isLoadingAllSavedCareProvider,
  } = useAllSavedCareProviders(
    debouncedSearchText,
    rating,
    page,
    sort == true ? "desc" : "asc"
  );

  const onSortClick = () => {
    setSort(!sort);
    refetch();
  };


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
            className="flex me-5 items-center gap-3 cursor-pointer"
            onClick={() => navigate(`/patient/care-provider/${id}`)}
          >
            <img
              src={dummyImage}
              alt={`${first_name} ${last_name}`}
              className="w-[38px] h-[38px] rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-[#252525] leading-tight">
                {organization_name?.length > 20
                  ? organization_name?.slice(0, 20)+"..."
                  : organization_name}
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
      header: <span className="">Date</span>,
      showSort: true,
      cell: ({ row }) => (
        <i className="">
          {dayjs(row?.original?.created_at).format("DD/MM/YY")}
        </i>
      ),
    },
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
            fill={filled ? "#FACC15" : "#D1D5DB"} 
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
      cell: ({ getValue }) => {
        const specialization = getValue() || "N/A";

        return (
          <div className="max-w-[180px]">
            <span
              className={
                specialization === "N/A"
                  ? "text-gray-500 flex justify-center w-[180px]"
                  : "truncate block w-[180px] text-left"
              }
              title={specialization !== "N/A" ? specialization : ""}
            >
              {specialization}
            </span>
          </div>
        );
      },
    },
    {
      accessor: "state",
      header: <span className="">State</span>,
      width: 200,
      showSort: true,
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      accessor: "address",
      header: "Location",
      showSort: true,
      cell: ({ getValue }) => {
        const specialization = getValue() || "N/A";

        return (
          <div className="max-w-[150px]">
            <span
              className={
                specialization === "N/A"
                  ? "text-gray-500 flex justify-center w-[150px]"
                  : "truncate block w-[180px] text-left"
              }
              title={specialization !== "N/A" ? specialization : ""}
            >
              {specialization}
            </span>
          </div>
        );
      },
    },
    {
      accessor: "postal_code",
      header: "Zip Code",
      showSort: true,
    },
  ];

  const handleRowSelect = (row: dataTypes) => {};
  const navigate = useNavigate();
  const columns = React.useMemo(() => getColumns(navigate), [navigate]);
  const handlePageChange = (page) => {
    setPage(page);
  };
    type dataTypes = {
      id?: number;
      first_name?: string;
      last_name?: string;
      date?: string;
      email?: string;
      image?: string;
      rating?: number | string | React.ReactNode;
      reviews?: string;
      specialization?: string;
      location?: string;
      onSortClick?: number;
    };
  

    const data: dataTypes[] = [
    {
      id: 1,
      first_name: "Alice",
      last_name: "Border",
      date: "9/04/12",
      email: "alice.border@example.com",
      image: alice,
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Elderly care",
      location: "📍200 1st St SW, Rochester",
    },
    {
      id: 2,
      first_name: "Michael",
      last_name: "Schofield",
      date: "9/04/16",
      email: "michael.schofield@example.com",
      image: "/images/michael.png",
      rating: <RatingStars value={3} isDisabled={true} />,
      specialization: "Post-surgical rehab",
      location: "📍190 E Bannock St, Boise, ID 83712",
    },
    {
      id: 3,
      first_name: "Sarah",
      last_name: "Johnson",
      date: "10/04/19",
      email: "sarah.johnson@example.com",
      image: "/images/sarah.png",
      rating: <RatingStars value={4} isDisabled={true} />,
      specialization: "Harmony Memory Care",
      location: "📍T9500 Euclid Ave, Cleveland,",
    },
    {
      id: 4,
      first_name: "John",
      last_name: "Doe",
      date: "12/04/22",
      email: "john.doe@example.com",
      image: "/images/john.png",
      rating: <RatingStars value={5} isDisabled={true} />,
      specialization: "Fitness  services.",
      location: "📍1468 Madison Ave, NY 10029",
    },
    {
      id: 5,
      first_name: "Emily",
      last_name: "Davis",
      date: "15/04/23",
      email: "emily.davis@example.com",
      image: "/images/emily.png",
      rating: <RatingStars value={2} isDisabled={true} />,
      specialization: "Rehabilitation Center",
      location: "📍8900 N Kendall Dr, Miami, FL 33176",
    },
  ];

  return (
    <div className="">
      {isLoadingAllSavedCareProvider ? (
        <TableSkeletonLoader />
      ) : (
        <div className="overflow-x-auto w-full">
          <TanDataTable<dataTypes>
            columns={columns}
            data={data}
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
