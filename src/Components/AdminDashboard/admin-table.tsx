import React, { useState, useEffect } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import apiEndpoint from "@src/shared/api-end-point";
import { apiServices } from "@src/shared/api-services";
import SkeletonTableLoader from "@components/loader/skelton-table-loader";
import Pagination from "@components/pagination/pagination";

// Interface for the trending topic data structure
interface TrendingTopicData {
  id: number;
  topic_name: string;
  replies: number;
  users: number;
  last_active: string;
}

const CareProviderDashboard: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopicData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);

  const pageSize = 3;

  // Function to fetch trending topics data from API
  const fetchTrendingTopics = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      // Include pagination params
      const response = await apiServices.get(
        apiEndpoint.trendingTopics(`trending_topics&page=${page}&limit=${pageSize}`)
      );

      if (response.data.success) {
        const dataWithId = response.data.payload.map((item: any, index: number) => ({
          ...item,
          id: (page - 1) * pageSize + index + 1, // unique id across pages
        }));
        setTrendingTopics(dataWithId);

        // Use total count from API if available, otherwise fallback
        setTotalRows(response.data.total || response.data.payload.length);
      } else {
        setError("Error: Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch data when page changes
  useEffect(() => {
    fetchTrendingTopics(currentPage);
  }, [currentPage]);

  // Define columns for the TanDataTable
  const columns = [
    { accessor: "id", header: "Id", showSort: true },
    { accessor: "topic_name", header: "Topic Names", showSort: true },
    { accessor: "replies", header: "Replies", showSort: true },
    { accessor: "users", header: "Users", showSort: true },
    { accessor: "last_active", header: "Last Active", showSort: true },
  ];

  if (error) return <div>{error}</div>;

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-3 flex md:flex-row flex-col md:items-center md:justify-between">
          <h4 className=" space-grotesk  text-[20px] font-bold ">Trending Topics in Communities</h4>
        </div>
        <div>
          {loading ? (
            <p className="text-center text-gray-500 px-10 py-10">
              <SkeletonTableLoader />
            </p>
          ) : (
            <TanDataTable<TrendingTopicData>
              columns={columns}
              data={trendingTopics}
              className="my-custom-class"
            />
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            // rowsPerPage={pageSize}
              rowsPerPage={pageSize} // 3 rows per page
            totalRows={totalRows}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CareProviderDashboard;
