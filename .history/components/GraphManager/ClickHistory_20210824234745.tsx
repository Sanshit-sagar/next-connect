import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks'

export type TimeStamp = number;
export type ClickScore = number;
export type ClickDate = Date; 

export interface ClickHistoryProps {
    quantity: string;
    timeAgo: string;
    tickSize: string;
}

export interface ClickEvent {
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickdate: ClickDate; 
}

export interface ClickHistory {
    clicks?: ClickEvent[];
    start: ClickDate;
    end: ClickDate;
    durationInMs?: number;
    tickSize?: number;
    numIntervals?: number; 
};

let data: ClickEvent[] = []
let history: ClickHistory = {}


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    let start: number = parseInt(minTimestamp)
    let duration: number = new Date().getTime() - start
    let numIntervals: number = duration/parseInt(tickSize)

    clicks.map((click: { x: number, y: number }, _: number) => {
        let timestamp: TimeStamp = start + click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(start + click.x)
        data.push({ timestamp, clickscore, clickdate }); 
    });

    history = {
        clicks: [...clicks], 
        start: new Date(minTimestamp),
        end: new Date(),
        durationInMs: clicks[clicks.length - 1].timestamp - clicks[0].timestamp,
        tickSize: parseInt(tickSize),
        numIntervals
    }
    
    return (
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}> 
                <Text> Click History </Text>
                <Text> {`${JSON.stringify(data)}`}</Text> 
            </Flex>
        </Box>
    )
}

export default ClickHistory





