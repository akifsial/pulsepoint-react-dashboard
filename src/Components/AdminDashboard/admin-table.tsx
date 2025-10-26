import React, { useState, useEffect } from "react";
import TanDataTable from "@components/dashboard-components/tanstack-data-table/tan-data-table";
import apiEndpoint from "@src/shared/api-end-point";
import { apiServices } from "@src/shared/api-services";
import SkeletonTableLoader from "@components/loader/skelton-table-loader";
import Pagination from "@components/pagination/pagination";

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

  const fetchTrendingTopics = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiServices.get(
        apiEndpoint.trendingTopics(
          `trending_topics&page=${page}&limit=${pageSize}`
        )
      );

      if (response.data.success) {
        const dataWithId = response.data.payload.map(
          (item: any, index: number) => ({
            ...item,
            id: (page - 1) * pageSize + index + 1, 
          })
        );
        setTrendingTopics(dataWithId);

        setTotalRows(response.data.total || response.data.payload.length);
      } else {
        setError("Error: Failed to fetch data");
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };


  
  const columns = [
    { accessor: "id", header: "Id", showSort: true },
    { accessor: "topic_name", header: "Topic Names", showSort: true },
    { accessor: "replies", header: "Replies", showSort: true },
    { accessor: "users", header: "Users", showSort: true },
    { accessor: "last_active", header: "Last Active", showSort: true },
  ];


  useEffect(() => {
    const dummyTrendingTopics: TrendingTopicData[] = [
      { id: 1, topic_name: "Improving Patient Communication", replies: 124, users: 45, last_active: "2 hours ago" },
      { id: 2, topic_name: "Best Practices in Home Care", replies: 87, users: 33, last_active: "5 hours ago" },
      { id: 3, topic_name: "Handling Insurance Claims Efficiently", replies: 56, users: 20, last_active: "1 day ago" },
      { id: 4, topic_name: "Reducing Caregiver Burnout", replies: 102, users: 40, last_active: "3 days ago" },
      { id: 5, topic_name: "Telehealth Adoption Challenges", replies: 74, users: 29, last_active: "5 days ago" },
      { id: 6, topic_name: "HIPAA Compliance & Data Security", replies: 91, users: 37, last_active: "1 week ago" },
      { id: 7, topic_name: "Hospital Readmission Reduction Strategies", replies: 43, users: 18, last_active: "2 weeks ago" },
      { id: 8, topic_name: "AI in Healthcare Documentation", replies: 120, users: 55, last_active: "3 weeks ago" },
      { id: 9, topic_name: "Patient Feedback Systems & Surveys", replies: 68, users: 25, last_active: "1 month ago" },
    ];
  
    setTrendingTopics(dummyTrendingTopics);
    setTotalRows(dummyTrendingTopics.length);
  }, [currentPage]);

  
  if (error) return <div>{error}</div>;

  return (
    <div className="mb-10">
      <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
        <div className="mb-3 flex md:flex-row flex-col md:items-center md:justify-between">
          <h4 className=" space-grotesk  text-[20px] font-bold ">
            Trending Topics in Communities
          </h4>
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

        <div className="mt-4">
          <Pagination
            rowsPerPage={pageSize} 
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
