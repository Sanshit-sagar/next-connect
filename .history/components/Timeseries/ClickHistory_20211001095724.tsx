import React from 'react'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Brush from './Brush'
import { Datum } from './interfaces'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'


const ClickHistory = ({ interval }: { interval: string; }) => {
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading || error || !clicks?.length) return null

    const data: Datum[] = clicks.map((click: { 
        x: number; 
        y: number 
    }, index: number) => {
        
        let timestamp = formatClickDate(click.x, minTimestamp, interval).timestamp
        return {
            index,
            timestamp,
            clickscore: click.y,
            clickdate: new Date(timestamp)
        };
    });

    return (
        <ParentSize>
            {(_: { resize: (_: any) => void }) => <Brush data={data} minTimestamp={minTimestamp} />}
        </ParentSize>  
    );
}


export default ClickHistory


// const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(2021,6,1).getTime()
// const now: number = new Date().getTime()


