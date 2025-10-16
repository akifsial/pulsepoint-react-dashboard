import DashboardCards from './dashboardcontent/dashboard-cards';
import Reviewed from './dashboardcontent/reviewed';
import CareProviderDashboard from './admin-table';

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
