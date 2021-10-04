import React from 'react'

import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

const BACKGROUND = '#f3f3f3'
const RADIUS = 14

interface ThresholdProps {
    height: number;
    width: number;
    margin?: { 
        top:number; 
        bottom: number; 
        left: number; 
        right:number;
    };
}

const DEFAULT_MARGIN = { top: 40, right: 30, bottom: 50, left: 40 };


export const AreaDifference = ({ height, width, margin = DEFAULT_MARGIN }: ThresholdProps) => {
    if(width < 10) return null

    const yMax = height - margin.top - margin.bottom 
    const xMax = width - margin.left - margin.right 


    return (
        <div>
            <svg height={height} width={width}>
                <rect
                    x={0}
                    y={0}
                    height={height}
                    width={width}
                    fill={BACKGROUND}
                    rx={RADIUS}
                />
                <Group left={margin.left} top={margin.top}>
                    <GridRows 
                        scale={clicksScale} 
                        width={xMax} height={yMax} stroke={''}
                </Group>
            </svg>
        </div>
    )
}