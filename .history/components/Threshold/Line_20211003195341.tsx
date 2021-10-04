import React from 'react'

import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

const BACKGROUND = '#f3f3f3'
const GRID_STROKE = '#e0e0e0'
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

const date = (d: Click) => new Date(d.date).valueOf() 
const groupA = (d: Click) => Number(d['Group A'])
const groupB = (d: Click) => Number(d['Group B'])



export const AreaDifference = ({ height, width, margin = DEFAULT_MARGIN }: ThresholdProps) => {
    if(width < 10) return null

    const yMax = height - margin.top - margin.bottom 
    const xMax = width - margin.left - margin.right 

    const clicksScale = scaleLinear<number>({
        domain: [
            Math.min(...clicks.map((d) => Math.min(groupA(d), groupB(d)))),
            Math.max(...clicks.map((d) => Math.max(groupB(d), groupB(d)))),
        ],
        range: [yMax, 0],
        nice: true,
    }); 

    const timeScale = scaleTime<number>({
        domain: [
            Math.min(...clicks.map(date)),
            Math.max(...clicks.map(date))
        ],
        range: [0, xMax]
    });


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
                        width={xMax} 
                        height={yMax} 
                        stroke={GRID_STROKE}
                    /> 
                    <GridColumns
                        scale={timeScale}
                        width={xMax}
                        height={yMax}
                        stroke={GRID_STROKE}
                    /> 
                     <line 
                        x1={xMax} 
                        x2={xMax} 
                        y1={0} 
                        y2={yMax} 
                        stroke="#e0e0e0" 
                    />
                    <AxisBottom 
                        scale={timeScale} 
                        top={yMax} 
                        numTicks={width > 520 ? 10 : 5} 
                    />
                    <AxisLeft
                        scale={clicksScale}
                    /> 
                    <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
                        # Clicks
                    </text>
                    <Threshold<CityTemperature>
            id={`${Math.random()}`}
            data={cityTemperature}
            x={d => timeScale(date(d)) ?? 0}
            y0={d => temperatureScale(ny(d)) ?? 0}
            y1={d => temperatureScale(sf(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
                    <LinePath
                        data={clicks}
                        curve={curveBasis}
                        x={d => timeScale(date(d)) ?? 0}
                        y={d => clicksScale(groupA(d)) ?? 0}
                        stroke="#222"
                        strokeWidth={1.5}
                        strokeOpacity={0.8}
                        strokeDasharray="1,2"
                    />
                    <LinePath
                        data={clicks}
                        curve={curveBasis}
                        x={d => timeScale(date(d)) ?? 0}
                        y={d => clicksScale(groupB(d)) ?? 0}
                        stroke="#222"
                        strokeWidth={1.5}
                    />
                </Group>
            </svg>
        </div>
    )
}