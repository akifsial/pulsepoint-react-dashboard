import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Correct icon imports

const TopBar: React.FC = () => {
  return (
    <div className="bg-[#2DB3FF] text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <span className="font-geist font-normal text-[16px] leading-[24px] tracking-normal">
          Thursday, May 08, 2025
        </span>
        <div className="flex space-x-3" style={{ width: '114px', height: '24px', position: 'absolute', top: '13px', left: '1191px' }}>
          <FaFacebook className="h-4 w-4 cursor-pointer hover:opacity-80" />
          <FaLinkedin className="h-4 w-4 cursor-pointer hover:opacity-80" />
          <FaInstagram className="h-4 w-4 cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
