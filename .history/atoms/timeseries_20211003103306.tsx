import { atom, WritableAtom } from 'jotai' 
import { Datum } from '../components/Timeseries/interfaces'
import { IItem as ToggleItem } from '../compositions/ToggleButtonsGroup'
import { ZoomInIcon, ZoomOutIcon, ReloadIcon } from '@radix-ui/react-icons'

interface IItem {
    id: string; 
    value: string | number; 
    textValue: string;
    alt: string | undefined;
    icon: React.ReactNode | undefined; 
}

const currentDate = new Date();

const initData: Datum[] = [{
    index: 0,
    timestamp: currentDate.getTime(),
    clickscore: 0,
    clickfmttime: currentDate.toLocaleString(),
    clickdate: currentDate, 
}]

export const zoomOptions: ToggleItem[] = [
    { id: '0', value: 'zoom in', textValue: 'Magnify',  alt: undefined, icon: <ZoomInIcon /> },
    { id: '1', value: 'zoom out', textValue: 'Reduce',  alt: undefined,  icon: <ZoomOutIcon /> },
    { id: '2', value: 'reset', textValue: 'Reset', alt: undefined, icon: <ReloadIcon /> },
]

export const rangeOptions: IItem[] = [
    { id: '0', value: 1000 * 60, textValue: '1 Minute', alt: undefined, icon: undefined },
    { id: '1', value: 1000 * 60 * 10, textValue: '10 Minutes', alt: undefined, icon: undefined },
    { id: '2', value: 1000 * 60 * 30, textValue: '30 Minutes', alt: undefined, icon: undefined },
    { id: '3', value: 1000 * 60 * 60, textValue: '1 Hour', alt: '60 Minutes', icon: undefined },
    { id: '4', value: 1000 * 60 * 60 * 6, textValue: '6 Hours', alt: '360 Minutes', icon: undefined },
    { id: '5', value: 1000 * 60 * 60 * 12, textValue: '12 Hours', alt: '720 Minutes', icon: undefined },
    { id: '6', value: 1000 * 60 * 60 * 24, textValue: '1 Day', alt: '1440 Minutes (24 hours)', icon: undefined },
    { id: '7', value: 1000 * 60 * 60 * 24 * 7, textValue: '1 Week', alt: '9960 Minutes (156 hours)', icon: undefined },
    { id: '8', value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '1 Month', alt: '30 days', icon: undefined },
    { id: '9', value: 1000 * 60 * 60 * 24 * 7 * 30, textValue: '3 Months', alt: '30 days', icon: undefined },
    { id: '10', value: 1000 * 60 * 60 * 24 * 365, textValue: '1 Year', alt: '12 months (365 days)', icon: undefined }
]

export const intervalOptions: IItem[] = [
    { id: '0', value: 1000, textValue: 'second', alt: undefined, icon: undefined },
    { id: '1', value: 1000 * 60, textValue: 'minute',  alt: undefined, icon: undefined  },
    { id: '2', value: 1000 * 60 * 60, textValue: 'hour',  alt: undefined, icon: undefined  },
    { id: '3', value: 1000 * 60 * 60 * 24, textValue: 'day',  alt: undefined, icon: undefined  },
    { id: '4', value: 1000 * 60 * 60 * 24 * 7, textValue: 'week',  alt: undefined, icon: undefined  },
    { id: '5', value: 1000 * 60 * 60 * 60 * 7 * 30, textValue: 'month',  alt: undefined, icon: undefined  }
]

export const statisticOptions: IItem[] = [
    { id: '0', value: 'norm', textValue: 'Timeseries', alt: undefined, icon: undefined },
    { id: '1', value: 'cummulative', textValue: 'Cummulative', alt: undefined, icon: undefined },
    { id: '2', value: 'movingAverage', textValue: 'Moving Avg', alt: undefined, icon: undefined },
]

const METRICS_API = `/api/metrics/user/sanshit.sagar@gmail.com`

export const rangeIndexAtom = atom(8)
export const intervalIndexAtom = atom(3)
export const filteredDataAtom = atom(initData) 
export const statisticIndexAtom = atom(0)

export const boundsAtom = atom({
    x0: new Date().getTime(),
    y0: 0,
    x1: new Date().getTime(), 
    y1: 10
});
export const lastUpdatedAtAtom = atom(new Date().getTime())

const rangeStrAtom = atom((get) => rangeOptions[get(rangeIndexAtom)].textValue)

export const amountAtom = atom((get) => get(rangeStrAtom).split(' ')[0])
export const rangeAtom = atom((get) => get(rangeStrAtom).split(' ')[1].toLowerCase())
export const intervalAtom = atom((get) => intervalOptions[get(intervalIndexAtom)].textValue)
export const statisticAtom = atom((get) => statisticOptions[get(statisticIndexAtom)].value)

export const presetClickstreamEndpointAtom  = atom<string>(
    (get) => {
        let range = get(rangeAtom)
        let amount = get(amountAtom)
        let interval = get(intervalAtom) 

        return `${METRICS_API}/tail/${amount}/${range}/${interval}`
    }
)

type Datum = { x: number; y: number; }
type RawData = Datum[]; 
type Timeseries = {
    index:number; 
    timestamp: number;
    clickscore: number; 
    clickdate: Date; 
}
export const timeseriesAtom: WritableAtom<RawData, Timeseries> = atom([{x: 0, y: 0 }]); 
export const updateTimeseriesAtom = atom(
    null,
    (_get, set, update: Timeseries) => {
        set(timeseriesAtom, [
            ...update.map((datum: RawData, index: number) => {
                return { 
                    index, 
                    timestamp: formatClickDate(click.x, minTimestamp, interval).timestamp,
                    clickscore: click.y, 
                    clickdate: new Date(formatClickDate(click.x, minTimestamp, interval).timestamp) 
                };
            });
        ]);
    }
);

export const cummulativeAtom = atom(
    (get) => {
        let runningTotal = 0
        return get(timeseriesAtom).map((item: { x: number; y: number; }) => {
            runningTotal += item.y
            return {
                x: item.x,
                y: runningTotal 
            }
        });
    }
); 

export const windowSizeAtom = atom(
    (get) => {
        let range: number = parseInt(`${rangeOptions[get(rangeIndexAtom)].value}`)
        let interval: number = parseInt(`${intervalOptions[get(intervalIndexAtom)].value}`)
        return Math.round(range/(interval*4))
    }
);
export const numWindowsAtom = atom(
    (get) => {
        let range: number = parseInt(`${rangeOptions[get(rangeIndexAtom)].value}`)
        return range/get(windowSizeAtom)
    }
)


// function accumulate(data: Click[]) {
//     let runningTotal = 0
//     let cummClicks: Click[] = []
//     let windowSize = data.length / 5

//     data.map((click: Click, i: number) => {
//         runningTotal += click.y
//         if(i >= windowSize) {
//             runningTotal -= cummClicks[i - windowSize].y
//         }
//         cummClicks.push({
//             x: click.x,
//             y: runningTotal/windowSize,
//         })
//     })

//     return cummClicks
// }

// export const movingAverageAtom = atom(
//     (get) => {
//         let windowSum = 0;
//         return get(timeseriesAtom).map((item: { x: number; y: number; }) => {

//         })
//     }
// )


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const styleOptions: IItem[] = [
    { id: '0', value: 'linear', textValue: 'polyline', alt: undefined, icon: undefined, }, // category: 'Curve Type' },
    { id: '1', value: 'natural', textValue: 'natural cubic spline', alt: undefined, icon: undefined },
    { id: '2', value: 'monotone', textValue: 'cubic spline', alt: undefined, icon: undefined },
    { id: '3', value: 'step', textValue: 'piecewise', alt: undefined, icon: undefined },
]

export const styleIndexAtom = atom(1)
export const curveStyleAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].value
)
export const curveStyleTextValueAtom = atom(
    (get) => styleOptions[get(styleIndexAtom)].textValue
)

export const clickstreamZoomIndexAtom = atom(1)
export const clickstreamZoomTextValueAtom = atom(
    (get) => {
        let zoomIndex = parseInt(`${get(clickstreamZoomIndexAtom)}`)
        return `${zoomIndex}`
    }
)

