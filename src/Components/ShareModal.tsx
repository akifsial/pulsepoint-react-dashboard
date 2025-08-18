import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import {
  FaPinterest,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaTumblr,
  FaLinkedinIn,
} from "react-icons/fa";
import { X } from "lucide-react";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [activeIcon, setActiveIcon] = useState<string>("");
  const shareUrl = `https://mywebsite.com/posts/${1}`;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000001A]  bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[16px] p-6 w-full max-w-md shadow-xl text-center "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-6">Share this design</h2>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="cursor-pointer mb-7 text-gray-400 hover:text-gray-600 text-xl"
          >
            <X />
          </button>
        </div>
        {/* Social Icons */}
        <div className="flex justify-center gap-5 items-center mb-6 px-4">
          <TwitterShareButton>
            <IconButton
              icon={<FaTwitter />}
              active={activeIcon === "twitter"}
              onClick={() => setActiveIcon("twitter")}
            />
          </TwitterShareButton>

          {/* <FacebookShareButton url={shareUrl} quote="asdasdasd">
            <IconButton
              icon={<FaFacebookF />}
              active={activeIcon === "facebook"}
              onClick={() => setActiveIcon("facebook")}
            />
          </FacebookShareButton> */}

          <FacebookShareButton
  url={shareUrl}
  quote="Check out this post!"
  onClick={() => setActiveIcon("facebook")} // optional: mark as active
>
  <FaFacebookF size={24} className={activeIcon === "facebook" ? "text-blue-600" : "text-gray-700"} />
</FacebookShareButton>


          <LinkedinShareButton>
            <IconButton
              icon={<FaLinkedinIn />}
              active={activeIcon === "linkedin"}
              onClick={() => setActiveIcon("linkedin")}
            />
          </LinkedinShareButton>
        </div>

        {/* Link Share */}
        <div className="text-left text-sm font-medium text-gray-500 mb-2">
          Or copy link
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            className="flex-1 px-3 py-2 text-sm bg-gray-100 outline-none"
          />
          <button className="text-[#007AB2] cursor-pointer px-4 py-2 text-sm font-semibold">
            Copy
          </button>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
};

export default ShareModal;

// Reusable IconButton component
const IconButton = ({
  icon,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 cursor-pointer rounded-full flex items-center justify-center transition ${
        active ? "border-2 border-[#007AB2]" : "bg-white border border-gray-200"
      }`}
    >
      <span className="text-gray-600 text-lg">{icon}</span>
    </button>
  );
};
