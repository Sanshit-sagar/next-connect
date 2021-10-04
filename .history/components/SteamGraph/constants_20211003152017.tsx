import { scaleOrdinal } from '@visx/scale'

export const NUM_LAYERS = 20

const range = (n: number) => Array.from(new Array(n), (_, i) => i)
const keys = range(NUM_LAYERS)


export const colorScale = scaleOrdinal({
    domain: keys,
    range: ['rgba(255,200,200,1.0)', '#fff', '#667', 'rgba(255,100,100,1.0)', 'hsl(252, 56%, 57%)']
})
export const patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})