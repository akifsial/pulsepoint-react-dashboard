const User = ({data}) => {
  // Safety check: ensure data is an array before mapping
  if (!data || !Array.isArray(data)) {
    return null; 
  }

  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="flex font-normal justify-between items-center mb-2 gap-4 text-base">
          <span className="w-full text-[#252525]/50">
            {item.label}
          </span>
          <span className="w-full text-end text-[15px] font-medium text-[#252525]">{item.value}</span>
        </div>
      ))}
    </>
  );
};

export default User;
