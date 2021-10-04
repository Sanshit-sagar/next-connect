
import React from 'react'

import { ScaleLinear } from 'd3'
import { Stack } from '@visx/shape'
import { animated, useSpring } from 'react-spring'
import { colorScale, patternScale } from './constants'

type Datum = number[];

export interface SteamerProps {
    layers: number[][];
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    animate: boolean;
    keys: number[];
    range: (n: number) => number[]; 
}

export const StackedSteams = ({ layers, xScale, yScale, animate, keys }: SteamerProps) => {

    const getY0 = (d: Datum) => yScale(d[0]) ?? 0;
    const getY1 = (d: Datum) => yScale(d[1]) ?? 0;
    
    return (
        <Stack<number[], number>
            data={layers}
            keys={keys}
            offset="wiggle"
            color={colorScale}
            x={(_, i) => xScale(i) ?? 0}
            y0={getY0}
            y1={getY1}
        >
        {({ stacks, path }) =>
            stacks.map((stack) => {
                const pathString = path(stack) || ''
                const color = colorScale(stack.key)
                const pattern = patternScale(stack.key)

                const tweened = animate ? useSpring({ pathString }) : { pathString };
                
                return (
                    <g key={`series-${stack.key}`}>
                        <animated.path 
                            d={tweened.pathString} 
                            fill={color} 
                        />
                        <animated.path 
                            d={tweened.pathString} 
                            fill={`url(#${pattern})`} 
                        />
                    </g>
                );
            })
        }
    </Stack>
    )
}