// import React, { useState, useEffect } from "react";
// import TanDataTable from "@components/Dashboard-components/Tanstack-data-table/TanDataTable";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import exports from "@assets/media/svgs/export.svg";
// import whitearrow from "@assets/media/svgs/whitearrow.svg";
// import { apiServices } from "@src/Shared/apiServices";
// import apiEndpoint from "@src/Shared/apiEndPoint";
// import { AnimatePresence, motion } from "framer-motion";
// import whitearr from "../../../assets/media/svgs/whitearr.svg";
// import { TanDataTableColumn } from "@components/Dashboard-components/Tanstack-data-table/types";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import SelectField from "@components/SelectField";

// // Define the type for the row data (replacing 'Person' with an actual type)
// type Post = {
//   id: string | number;
//   post: string;
//   users: string;
//   role: string;
//   community: string;
//   status: string;
//   date: string;
// };

// const ReportTable: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isExportOpen, setIsExportOpen] = useState(false);

//   // API integration to fetch all community posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const response = await apiServices.get(
//           apiEndpoint.getAllCommunityPosts
//         );
//         if (response.data.success) {
//           const records = response.data.payload.records || [];
//           const mappedPosts = records.map((post: any) => ({
//             // id: post.id,
//             post: post.community_id,
//             users: post.user?.first_name || "Unknown User",
//             role: post.user?.role_type || "Unknown Role",
//             community: post.community.title,
//             status: post.status,
//             date: new Date(post.created_at).toLocaleDateString(),
//           }));
//           setPosts(mappedPosts);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Define columns for TanDataTable with 'accessor' set to 'id'
//   const columns: TanDataTableColumn<Post>[] = [
//     { accessor: "post", header: "Post ID", showSort: true },
//     { accessor: "users", header: "Users", showSort: true },
//     { accessor: "role", header: "Role", showSort: true },
//     { accessor: "community", header: "Community", showSort: true },
//     { accessor: "status", header: "Status", showSort: true },
//     { accessor: "date", header: "Last Action", showSort: true },
//   ];

//   // Handle row selection (use when a row is selected)
//   const handleRowSelect = (row: Post) => {
//   };

//   // Render actions (like buttons) for each row
//   const renderActions = (row: Post) => (
//     <button onClick={() => alert(`Edit ${row.post}`)}>Edit</button>
//   );

//   // Function to handle CSV export
//   const handleExportCSV = () => {
//     const csvRows = [
//       ["Post ID", "Users", "Role", "Community", "Status", "Last Action"],
//       ...posts.map((item) =>
//         ["post", "users", "role", "community", "status", "date"].map(
//           (key) => item[key] || ""
//         )
//       ),
//     ];

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       csvRows.map((e) => e.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "Moderation_Summary.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setIsExportOpen(false);
//   };

//   // Function to handle PDF export
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     const tableColumn = [
//       "Post ID",
//       "Users",
//       "Role",
//       "Community",
//       "Status",
//       "Last Action",
//     ];
//     const tableRows = posts.map((item) =>
//       ["post", "users", "role", "community", "status", "date"].map(
//         (key) => item[key] || ""
//       )
//     );

//     doc.text("Moderation Summary Data", 14, 15);

//     // Ensure autoTable is applied correctly here
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 20,
//       styles: { fontSize: 8 },
//     });

//     doc.save("Moderation_Summary.pdf");
//     setIsExportOpen(false);
//   };
//   const [timeRange1, setTimeRange1] = useState("7d");
//   const timeOptions = [
//     { value: "7d", label: "Last 7 Days" },
//     { value: "30d", label: "Last 30 Days" },
//     { value: "90d", label: "Last 90 Days" },
//   ];

//   return (
//     <div className="mb-10">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h3>Moderation Summary</h3>
//         </div>
//         <div className="flex items-center gap-3.5 pt-3">
//           <div className="relative">
//             <div className="flex items gap-4">
//               <div className="">
//                 <SelectField
//                   options={timeOptions}
//                   value={timeRange1}
//                   onChange={(e) => setTimeRange1(e.target.value)}
//                   className="pr-9 border border-[#252525] rounded-[5px] "
//                 />
//               </div>
//               <PrimaryButton
//                 btnText="Export Table"
//                 showImg={true}
//                 img={exports}
//                 imgClass="w-4 h-4"
//                 suffixImg={whitearrow}
//                 suffixImgClass="w-4 h-4"
//                 onClick={() => setIsExportOpen(!isExportOpen)}
//                 btnClass="flex items-center justify-center gap-[5px] h-[46px] cursor-pointer w-[159px] bg-[#28A2FF] text-white px-4 rounded-lg font-semibold text-sm"
//               />
//             </div>
//             <AnimatePresence>
//               {isExportOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute top-[50px] left-[150px] bg-white shadow-md rounded-lg p-4 z-50"
//                 >
//                   <div className="flex flex-col gap-2 w-full">
//                     <button
//                       className="text-sm text-black mb-2.5"
//                       onClick={handleExportCSV}
//                     >
//                       Export as CSV
//                     </button>
//                     <button
//                       className="text-sm text-black"
//                       onClick={handleExportPDF}
//                     >
//                       Export as PDF
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 bg-[#FFFFFF] rounded-[10px] px-4 py-6 mb-6">
//         <h4 className="text-xl font-bold mb-2">Top Contributors</h4>
//         <div>
//           {loading ? (
//             <p className="text-center text-gray-500 py-10">Loading posts...</p>
//           ) : (
//             <TanDataTable
//               columns={columns}
//               data={posts}
//               showCheckbox={false}
//               className="my-custom-class"
//               onRowSelect={handleRowSelect}
//               renderActions={renderActions}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportTable;
