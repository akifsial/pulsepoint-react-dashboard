import React from 'react'
import DashboardCards from './DashboardContent/DashboardCards'
import Reviewed from './DashboardContent/Reviewed'
import CareProviderDashboard from './AdminTable'

const AdDashboard = () => {
  return (
    <>
      <DashboardCards/>
      <Reviewed/>
      <CareProviderDashboard/>
    </>
  )
}

export default AdDashboard
