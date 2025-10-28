import React from "react";

function PaymentHistoryLoader() {
  return (
    <div>
      <div className="p-5 mb-5 rounded-xl flex justify-between items-center border border-gray-300">
        <div>
          <div className="w-20 mb-2 h-4 bg-gray-300 rounded"></div>
          <div className="w-15 mb-2 h-4 bg-gray-300 rounded"></div>
          <div className="w-50 h-4 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="w-25 h-6 bg-gray-300 rounded-[8px]"></div>
        </div>
      </div>
      <div className="p-5 rounded-xl flex justify-between items-center border border-gray-300">
        <div>
          <div className="w-20 mb-2 h-4 bg-gray-300 rounded"></div>
          <div className="w-15 mb-2 h-4 bg-gray-300 rounded"></div>
          <div className="w-50 h-4 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="w-25 h-6 bg-gray-300 rounded-[8px]"></div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryLoader;