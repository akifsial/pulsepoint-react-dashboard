// import React, { useState } from "react";
// import userProfile from "@assets/media/svgs/dashboard-svgs/userProfile.svg";
// import postImage from "@assets/media/images/dashboard-images/postImage.png";
// import { PrimaryButton } from "@components/Shared-components/Buttons/Common-button/CommonButton";
// import arrowUp from "@assets/media/svgs/dashboard-svgs/arrow-up-btn.svg";
// import arrowDowm from "@assets/media/svgs/dashboard-svgs/arrow-down-btn.svg";
// import share from "@assets/media/svgs/dashboard-svgs/share.svg";
// import comment from "@assets/media/svgs/dashboard-svgs/comment.svg";
// import addCommunity from "@assets/media/svgs/dashboard-svgs/addCommunity.svg";
// import CommonInput from "@components/Shared-components/Inputs/Common-Input/CommonInput";
// import searchCommunity from "@assets/media/svgs/dashboard-svgs/searchCommunity.svg";
// import yourHouseIcon from "@assets/media/svgs/patient-db-svgs/yourHouseIcon.svg";
// import PopularIcon from "@assets/media/svgs/patient-db-svgs/popular-icon.svg";
// import flag from "@assets/media/svgs/dashboard-svgs/flag.svg";
// import PostCard, { PostData, ButtonData } from "../../Components/PostCard";
// import PopularCommunity from "@components/CareProvider/CommunityForum/PopularCommunity";
// const postList: PostData[] = [
//   {
//     userImage: userProfile,
//     userName: "Cody Fisher",
//     userPost: "Posted by: caregiverSon89",
//     title: "How do I convince my dad to accept home care?",
//     desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
//     postImage: postImage,
//     userTime: "Today at 3:00PM",
//     userReview:
//       "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent? Read more..",
//   },
//   {
//     userImage: userProfile,
//     userName: "Cody Fisher",
//     userPost: "Posted by: caregiverSon89",
//     title: "How do I convince my dad to accept home care?",
//     desc: "My 78-year-old dad is struggling with mobility, but refuses help at home. Has anyone had success getting through to a stubborn parent?",
//     postImage: postImage,
//     userTime: "Today at 3:00PM",
//     userReview:
//       "My 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobilityMy 78-year-old dad is struggling with mobility",
//   },
// ];

// // Define the button data with proper typing
// const buttons: ButtonData[] = [
//   { btnText: "32k", btnIcon: arrowUp, downarrow: arrowDowm },
//   { btnText: "2.2k", btnIcon: comment },
//   { btnText: "Share", btnIcon: share },
//   { btnText: "Flag", btnIcon: flag },
// ];

// const AdminCommunityForum: React.FC = () => {
//   const [selectedButton, setSelectedButton] = useState<string>("Home"); // Default is 'Home'
//   const [showBackFeed, setShowBackFeed] = useState<boolean>(false); // Add this line

//   return (
//     <div className="flex gap-6 w-full">
//       {/* Left side - Main content */}
//       <div
//         className="w-[75%] h-[661px] overflow-y-auto pr-2"
//         style={{
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//       >
//         <h2 className="mb-4">Your Feed</h2>
//         <div className="flex gap-1">
//           <PrimaryButton
//             btnText="Home"
//             showImg={true}
//             imgClass="w-[16px] h-[16px] object-cover"
//             img={yourHouseIcon}
//             imgPosition="left"
//             btnClass={`flex items-center gap-3 px-4 py-[10px] rounded-[10px] transition-all activeborder border-[#000] px-4 w-full md:w-[98px] py-[5.5px] rounded-[20px] font-medium mb-5 ${
//               selectedButton === "Home" 
//                 ? "bg-[#28A2FF] text-white" 
//                 : "bg-[#D9E7EE] text-[#252525]"
//             }`}
//             onClick={() => setSelectedButton("Home")}
//           />
//           <PrimaryButton
//             btnText="Popular"
//             showImg={true}
//             imgClass="w-[16px] h-[16px] object-cover"
//             img={PopularIcon}
//             imgPosition="left"
//             btnClass={`flex items-center gap-3 px-4 py-[10px] rounded-[10px] transition-all activeborder border-[#000] px-4 w-full md:w-[98px] py-[5.5px] rounded-[20px] font-medium mb-5 ${
//               selectedButton === "Popular" 
//                 ? "bg-[#28A2FF] text-white" 
//                 : "bg-[#D9E7EE] text-[#252525]"
//             }`}
//             onClick={() => setSelectedButton("Popular")}
//           />
//         </div>

//         {/* Render posts using PostCard component */}
//         {selectedButton === "Home" && postList.length > 0 ? (
//           postList.slice(0, 2).map((post, index) => (
//             <PostCard
//               key={index}
//               post={post}
//               buttons={buttons}
//               showComments={true}
//               showFullPost={true}
//             />
//           ))
//         ) : selectedButton === "Popular" && postList.length > 0 ? (
//           postList.slice(0, 1).map((post, index) => (
//             <PostCard
//               key={index}
//               post={post}
//               buttons={buttons}
//               showComments={false}
//               showFullPost={false}
//             />
//           ))
//         ) : null}
//       </div>

//       {/* Right side - Popular Community */}
//       <div className="w-[25%]">
//         <PopularCommunity />
//       </div>
//     </div>
//   );
// };

// export default AdminCommunityForum;



import Community from '@components/CareProvider/CommunityForum/Community'
import React from 'react'

const AdminCommunityForum = () => {
  return (
    <div>
      <Community />
      {/* You can add more components or content here as needed */}
    </div>
  )
}

export default AdminCommunityForum
