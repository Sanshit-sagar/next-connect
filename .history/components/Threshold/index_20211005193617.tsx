import React from 'react'
import useSWR from 'swr'
import { Text } from '../../primitives/Text'

import { AreaDifference } from './AreaDifference'
import { VisxParentSizeWrapper } from '../../primitives/Shared'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import {
    AreaDifferenceProps,
    Margin,
    Click,
    ParentSizeProps
} from './interfaces'


interface SwrFetchResponse<T> {
    data: SlugRankingsByFrequency; 
    error: Error | any | null;
}

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}; 


const useUserSlugs = (): SwrResponse<Click> => {
    let email = 'sanshit.sagar@gmail.com'
    const { data, error }:  = useSWR(`/api/users/${email}/rankings/frequencies`)

    return {
        data: data || undefined,
        loading: boolean,
        error: Error | any | null,
    };
}

const Threshold = () => {

    const { clicks, loading, error } = useUserSlugs()

    if(loading) return <Text>loading...</Text> 
    if(error) return <Text>error!</Text> 
    
    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ height, width }: ParentSizeProps) => (
                    <AreaDifference
                        clicks={clicks}
                        height={height}
                        width={width}
                    /> 
                )}
            </ParentSize>
       </VisxParentSizeWrapper>
    )
}


// TODO import timeseries atoms here
    // http://localhost:3000/api/users/sanshit.sagar@gmail.com/rankings/frequencies

