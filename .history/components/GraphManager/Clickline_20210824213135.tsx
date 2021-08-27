import React from 'react'

import { useClickHistoryForUser } from '../../hooks/useClicks'


export type TimeStamp = number;
export type ClickScore = number;

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CLICK_HISTORY_CHART_ID = 'CLICK_HISTORY'

const ClicksData = ({ amount, range, interval }) => {
    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)

    return {
        <Flex css={{ fd: 'column'', jc: 'flex-start', ai: 'stretch }}> 
            <Text> {JSON.stringify(</Text>
        </Flex>
    }
}
