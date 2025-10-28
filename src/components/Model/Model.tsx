import closeArrow from "@assets/media/svgs/dashboard-svgs/close-circle.svg";
import { X } from "lucide-react";
const Model = ({ setIsOpen, children,className="" }) => {
  return (
    <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
      <div className={`bg-white p-7.5 rounded-[10px] relative w-full  mx-4 ${className}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer right-[18px] top-[18px]"
          aria-label="Close"
        >
          <X />
        </button>

        <div>{children}</div>
      </div>
    </div>  
  );
};

export default Model;
