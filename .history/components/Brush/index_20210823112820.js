import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';



const Timeseries = () => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval);

    return (
        <DashboardDisplayBox>
        <VisxParentSizeWrapper> 
            <p> {JSON.stringify(clicks) </p>
        </VisxParentSizeWrapper>
    )
}