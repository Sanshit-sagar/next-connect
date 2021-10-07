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
    data: ApiResourceWrapper<T>; 
    error: Error | any | null;
}

interface ApiResourceWrapper<T> {
    frequencies: T; 
    category: string; 
    resource: string;
    resourceId: string;
    collection: string; 
    timestamp: number; 
};

interface SlugRankings {
    title: string; 
    score: string; 
    rank: number;
    normalizedFreq: number; 
}

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}; 


const useUserSlugs = (): SwrResponse<any> => {
    const { data, error } = useSWR(`/api/info/clickstream/${slug}/${r}/${range}/:interval`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error: error
    };
}

export const Threshold = () => {

    const { data, loading, error } = useUserSlugs()

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

