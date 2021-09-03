import React from 'react'
import Timeseries from '../components/Timeseries'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
    return <Timeseries />
}

Dashboard.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout> 
            {page} 
        </DashboardLayout>
    )
}

export default Dashboard