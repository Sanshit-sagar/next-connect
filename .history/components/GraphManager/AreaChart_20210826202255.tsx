import React from 'react'
import { 
    Datum,
    AreaChartProps,
    ClickDate,
    ClickScore
} from './interfaces'
import {
    AXIS_LEFT_TICK_LABEL_PROPS,
    AXIS_BOTTOM_TICK_LABEL_PROPS,
    AXIS_COLOR
} from './constants'
import { AnimatedAxisLeft, AnimatedAxisBottom } from 'react-spring'
import { AreaClosed } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve';
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
            <AreaClosed<Datum>
                data={data}
                x={(d: Datum) => xScale(getDate(d)) || 0}
                y={(d: Datum) => yScale(getClickScore(d)) || 0}
                yScale={yScale}
                strokeWidth={1}
                stroke="url(#gradient)"
                fill="url(#gradient)"
                curve={curveMonotoneX}
            />
            {!hideBottomAxis && (
                // <AxisBottom
                    // top={yMax}
                    // scale={xScale}
                    // numTicks={width > 520 ? 10 : 5}
                    // stroke={AXIS_COLOR}
                    // tickStroke={AXIS_COLOR}
                    // tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                // />
                <AnimatedAxisLeft


                />
            )}
            {!hideLeftAxis && (
                <AxisLeft
                    scale={yScale}
                    numTicks={5}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
                />
            )}
            {children}
        </Group>
    )
}

export default AreaChart