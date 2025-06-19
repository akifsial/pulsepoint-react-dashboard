import React from 'react'
import AgeGroupChart from './AgeGroupChart'
import InsuranceChart from './InsuranceChart'
// import AgeGroupChart from './AgeGroupChart'
// import InsuranceChart from './InsuranceChart'

const GroupChart = () => {
  return (
    <div className='flex items-center justify-center gap-2.5'>
      <AgeGroupChart/>
      <InsuranceChart/>
    </div>
  )
}

export default GroupChart
