import React from 'react'

import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { HeatmapCircle, HeatmapRect } from '@visx/heatmap'

import genBins, { Bins, Bin } from '@visx/mock-data/lib/generators/genBins'
import getSeededRandom from '@visx/mock-data'

const hot1 = '#77312f'
const hot2 = '#f33d15'
const cool1 = '#122549'
const cool2 = '#b4fbde'
export const background = '#28272c'

const binData = genBins({
    
})

function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
    return Math.max(...data.map(value))
}
function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
    return Math.min(...data.map(value))
}

const bins = (d: Bins) => d.bins;
const count = (d: Bin) => d.count;