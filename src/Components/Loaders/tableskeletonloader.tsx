import React from "react";

const TableSkeletonLoader = () => {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        <tbody>
          {[...Array(2)].map((_, index) => (
            <tr
              key={index}
              className="bg-white border-b border-[#2525251a] hover:bg-[var(--primary-color-hover-light)] transition-colors duration-200"
            >
              <td className="px-2 py-5">
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  <div className="h-4 w-[150px] bg-gray-200 rounded" />
                </div>
              </td>

              <td className="px-2 py-5">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </td>

              <td className="px-2 py-5">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </td>

              <td className="px-2 py-5">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-2 py-5">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </td>
              <td className="px-2 py-5">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeletonLoader;
