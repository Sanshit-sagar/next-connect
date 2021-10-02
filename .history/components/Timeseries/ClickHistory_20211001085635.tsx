import React from 'react'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Brush from './Brush'

// function formatClickDate(x: number, minTimestamp: number, interval: string): { timestamp: number, fmtTimestamp: string } {
//     let x0: number = minTimestamp;
    
//     if(interval==='sec') {
//         x0 += 1000 * x; 
//     } else if(interval==='min') {
//         x0 += 60 * 1000 * x; 
//     } else if(interval==='hour') {
//         x0 += 60 * 60 * 1000 * x;
//     } else {
//         x0 += 24 * 60 * 60 * 1000 * x; 
//     }

//     return { 
//         timestamp: parseInt(`${x0}`), 
//         fmtTimestamp: `${format(new Date(x0), 'dayhourmin')}`
//     };
// }

// interface IClick { 
//     x: number;
//     y: number;
// }

const ClickHistory = () => (
        <ParentSize>
            {(_: { resize: (_: any) => void }) =>
                <Brush />
            }
        </ParentSize>  
    );

export default ClickHistory


// const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(2021,6,1).getTime()
// const now: number = new Date().getTime()


