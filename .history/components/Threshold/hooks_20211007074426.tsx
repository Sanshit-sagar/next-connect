import useSWR from 'swr'
import { mockViewsA, mockViewsB } from './mocks'
import { MockView } from './interfaces'

import { extent, zip } from 'd3-array'

const useZippedClicks = () => {
    let groupAData: MockView[] = mockViewsA.views
    let groupBData: MockView[] = mockViewsB.views

    let [aMin, aMax] = extent(groupAData, )
    let [bMin, bMax] = extent(groupBData)



    let testData = zip(groupAData, groupBData)

    return {
        
    }

}