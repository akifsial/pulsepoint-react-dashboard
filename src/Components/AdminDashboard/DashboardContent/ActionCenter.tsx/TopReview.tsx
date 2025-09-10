// import ChartComponent from "../../../AdminDashboard/ChartComponent/Chart.jsx"
import ChartComponent from '@components/AdminDashboard/ChartComponent/Chart'

const TopReview = () => {
  return (
    <div className='bg-white p-5 rounded-[10px] w-full min-h-[408px]'>
      <h4 className='!text-[20px] text-[#181D27] mb-3.5 font-bold space-grotesk'>User Activity Over Time</h4>
      <ChartComponent/>
    </div>
  )
}

export default TopReview
