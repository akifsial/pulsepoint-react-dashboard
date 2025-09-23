/* components/ArrowButtonGroup.tsx */
import { FC } from "react";

interface ArrowButtonGroupProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const ArrowButtonGroup: FC<ArrowButtonGroupProps> = ({ onPrev, onNext }) => (
  <div className="w-[136.974px] h-[40px] flex gap-[15px]">
    {/* left / previous */}
    <button
      aria-label="Previous"
      onClick={onPrev}
      className="w-[60.987px] h-[40px] px-[20px]
                 flex items-center justify-center
                 rounded-[4px] border-[0.83px] border-[#162544]"
    >
      <svg
        className="-rotate-180"
        width="20.987"
        height="12.273"
        viewBox="0 0 21 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 6H19M13.5 0.5L19 6L13.5 11.5"
          stroke="#162544"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    {/* right / next */}
    <button
      aria-label="Next"
      onClick={onNext}
      className="w-[60.987px] h-[40px] px-[20px]
                 flex items-center justify-center
                 rounded-[4px] border-[0.83px] border-[#162544]"
    >
      <svg
        width="20.987"
        height="12.273"
        viewBox="0 0 21 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 6H19M13.5 0.5L19 6L13.5 11.5"
          stroke="#162544"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

export default ArrowButtonGroup;
