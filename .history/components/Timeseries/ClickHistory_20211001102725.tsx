import React, { useMemo } from 'react'

import Brush from './Brush'
import { Datum } from './interfaces'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

import { useAtomValue } from 'jotai/utils'
import { intervalAtom } from '../../atoms/timeseries'

interface Click {
    x: number;
    y: number;
};

const ClickHistory = ({ interval }: { interval: string }) => {
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading || error || !clicks?.length) return null

   

    const data: Datum[] = clicks.map((click: Click, index: number) => {
        let timestamp = formatClickDate(click.x, minTimestamp, interval).timestamp
        return {
            index,
            timestamp,
            clickscore: click.y,
            clickdate: new Date(timestamp)
        }
    });

    return (
        <Brush 
            data={data} 
            minTimestamp={minTimestamp} 
        />
    )
}

export default ClickHistory

