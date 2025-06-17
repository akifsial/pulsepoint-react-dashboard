import React from 'react';
import Flagwhite from "@assets/media/svgs/dashboard-svgs/flag4.svg";
import Flagblue from "@assets/media/svgs/dashboard-svgs/flag3.svg";
import Save from "@assets/media/svgs/dashboard-svgs/save.svg";
import SaveBlue from "@assets/media/svgs/dashboard-svgs/saveBlue.svg";

interface PostActionsMenuProps {
  onFlagPost: () => void;
  onSavePost: () => void;
  showSave: boolean; 
}

const PostActionsMenu: React.FC<PostActionsMenuProps> = ({ onFlagPost, onSavePost, showSave }) => {
  return (
    <div className="absolute top-14 right-4 bg-white border border-gray-300 rounded-[10px] shadow-md p-1.5 z-50">
      <button
        onClick={onFlagPost}
        className="group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2 mb-0.5"
      >
        <span className="inline-block group-hover:hidden">
          <img src={Flagwhite} alt="Flagwhite" />
        </span>
        <span className="hidden group-hover:inline-block">
          <img src={Flagblue} alt="Flagblue" />
        </span>
        Flag Post
      </button>

      {showSave && (
        <button
          onClick={onSavePost}
          className="group w-full text-left pl-[10px] pr-5.5 text-sm py-2.5 hover:bg-[#E7F2F9] rounded-[5px] flex items-center gap-2"
        >
          <span className="inline-block group-hover:hidden">
            <img src={Save} alt="Save" />
          </span>
          <span className="hidden group-hover:inline-block">
            <img src={SaveBlue} alt="SaveBlue" />
          </span>
          Save Post
        </button>
      )}
    </div>
  );
};

export default PostActionsMenu;
