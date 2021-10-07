import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { extent, zip } from 'd3-array'

const useZippedClicks = () => {
    let groupAData: number[] = mockViewsA.views
    let groupBData: number[] = mockViewsB.views

    let testData = zip(groupAData, groupBData)

    return {
        
    }

}