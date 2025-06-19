import closeArrow from "../../assets/media/svgs/dashboard-svgs/closeIcon.svg";

const Model = ({ setIsOpen, children,className="" }) => {
  return (
    <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
      <div className={`bg-white p-7.5 rounded-[10px] relative w-full  mx-4 ${className}`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-[18px] top-[18px]"
          aria-label="Close"
        >
          <img src={closeArrow} alt="Close" className="w-7 h-7 cursor-pointer" style={{ filter: 'invert(0.9)' }} />
        </button>

        <div>{children}</div>
      </div>
    </div>  
  );
};

export default Model;
