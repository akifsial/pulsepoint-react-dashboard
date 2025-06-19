import React, { useState } from "react";
import { Search, Clock } from 'lucide-react';
// Import your actual image
import Patientdbimg from "@assets/media/svgs/patient-db-svgs/patient-dashboard.jpeg";

// Your existing Model component (simplified for demo)
const Model = ({ setIsOpen, children, className = "" }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className={`bg-white p-7.5 rounded-[10px] relative w-full mx-4 ${className}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[18px] top-[18px]"
          aria-label="Close"
        >
          <span className="w-7 h-7 cursor-pointer text-gray-500 hover:text-gray-700 text-xl">×</span>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

interface RecentSearch {
  id: string;
  text: string;
}

interface ReviewCardProps {
  backgroundImage?: string;
  title?: string;
  buttonText?: string;
  onReviewClick?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  backgroundImage,
  title = "Tell us what you liked or didn't like",
  buttonText = "Write a Review",
  onReviewClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const recentSearches: RecentSearch[] = [
    { id: '1', text: 'Johns Hopkins Hospital' },
    { id: '2', text: 'Dr. Amanda Reyes – Green Valley Rehab Center' },
    { id: '3', text: 'Search all providers near 10001' },
    { id: '4', text: 'St. Luke\'s Long-Term Care – 30303' }
  ];

  const handleReviewClick = () => {
    console.log("Button clicked!");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClear = () => {
    console.log('Clear recent searches');
  };

  const handleSearchItemClick = (searchText: string) => {
    setSearchValue(searchText);
    console.log('Selected search:', searchText);
  };

  return (
    <div
      className="relative w-[340px] h-[142px] rounded-[10px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Content container with flex column layout */}
      <div className="relative h-full p-4 flex flex-col justify-between">
        {/* Title text - positioned at top left */}
        <h2 className="text-white text-sm leading-[22px] tracking-[0%] font-normal font-sans max-w-[140px] text-start">
          {title}
        </h2>

        {/* Button - positioned at bottom right */}
        <div className="flex justify-start">
          <button
            onClick={handleReviewClick}
            className="w-[120px] h-[32px] rounded-[8px] bg-[#28A2FF] hover:bg-[#1e8ae6] transition-colors text-white font-bold text-[10px] leading-[12px] tracking-[0%] font-sans flex justify-center items-center gap-[4px] shadow-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Provider Search Modal */}
      {isDropdownOpen && (
        <Model setIsOpen={setIsDropdownOpen} className="max-w-[500px]">
          <div className="pt-4">
            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search with Provider name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base"
                  autoFocus
                />
              </div>
            </div>

            {/* Recents Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-medium text-base">Recents</h3>
                <button
                  onClick={handleClear}
                  className="text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Recent Searches List */}
              <div className="space-y-1 max-h-[250px] overflow-y-auto">
                {recentSearches.map((search) => (
                  <div
                    key={search.id}
                    onClick={() => handleSearchItemClick(search.text)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {search.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Model>
      )}

      <div className="absolute inset-0 bg-black/10 rounded-[10px] pointer-events-none z-0" />
    </div>
  );
};

const AppReviewCard: React.FC = () => {
  const handleReviewClick = () => {
    console.log("Review button clicked!");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ReviewCard
        onReviewClick={handleReviewClick}
        backgroundImage={Patientdbimg} 
      />
    </div>
  );
};

export default AppReviewCard;