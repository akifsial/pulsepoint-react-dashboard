import React from 'react'
import ChartComponent from "@components/AdminDashboard/ChartComponent/Chart.jsx"

const TopReview = () => {
  return (
    <div className='bg-white p-5 rounded-[10px] w-1/2 h-[308px]'>
      <h4 className='text-xl text-[#181D27] mb-3.5 font-bold'>📊 Top Reviewed Provider This Week</h4>
      <ChartComponent/>
    </div>
  )
}

export default TopReview
