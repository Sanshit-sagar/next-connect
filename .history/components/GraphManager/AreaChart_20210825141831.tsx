import React from 'react'
import { 
    Datum,
    AreaChartProps
} from './interfaces'
import {
    AXIS_LEFT_TICK_LABEL_PROPS,
    AXIS_BOTTOM_TICK_LABEL_PROPS,
    AXIS_COLOR
} from './constants'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { AreaClosed } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'
import { Group } from '@visx/group'


const AreaChart:React.FC<AreaChartProps> = ({
    data,
    width,
    yMax,
    margin,
    xScale,
    yScale,
    gradientColor,
    hideBottomAxis = false,
    hideLeftAxis = false,
    top,
    left,
    children
}) => {

    if(width < 10) return null; 

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0



    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinearGradient
                  id="gradient"
                  from={gradientColor}
                  fromOpacity={1}
                  to={gradientColor}
                  toOpacity={0.2}
             />

    )
}

export default AreaChart