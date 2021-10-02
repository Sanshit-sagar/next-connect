import React from 'react'
import Timeseries from '../components/Timeseries'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
    return <Timeseries />
}
const timeseriesMetadata = {
    title: 'Timeseries',
    description: 'Timeseries '
}
Dashboard.getLayout = function getLayout(page: any) {
    return (
        <DashboardLayout meta={timeseriesMetadata}>
            {page} 
        </DashboardLayout>
    )
}

export default Dashboard