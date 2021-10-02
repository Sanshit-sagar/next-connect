import React from 'react'

import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import {
    zoomOptions,
    rangeOptions,
    rangeIndexAtom,
    intervalOptions,
    intervalIndexAtom,
    clickstreamZoomIndexAtom,
    clickstreamZoomTextValueAtom
} from '../../atoms/timeseries'
import { intervalAtom } from '../../atoms/timeseries'


import { Text } from '../../primitives/Text'
import { ToolbarButtonGroup, ToolbarSeparator as TBAR } from '../../primitives/Toolbar'


import { 
    SpaceEvenlyHorizontallyIcon, 
    CalendarIcon 
} from '@radix-ui/react-icons'

export const Range = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(rangeIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={rangeOptions[selectedIndex].textValue}
            selectedTextValue={<><CalendarIcon /> <Text> {rangeOptions[selectedIndex].textValue} </Text></>}
            items={rangeOptions}
        />
    );
}

export const Increments = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(intervalIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Interval Length'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`${intervalOptions[selectedIndex].value}`}
            selectedTextValue={<><SpaceEvenlyHorizontallyIcon /> <Text> {intervalOptions[selectedIndex].textValue} </Text></>}
            items={intervalOptions}
        />
    )
}

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(clickstreamZoomIndexAtom)
    const zoomValue = useAtomValue(clickstreamZoomTextValueAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: number) => setZoomIndex(value || 0)}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomValue}`}
            items={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}

export const TimeSelectionGroup = () => (
    <ToolbarButtonGroup>
        <Zoom />
        <TBAR />
        <Range />
        <Increments />
    </ToolbarButtonGroup>
)

const Timeseries = () => {
    const interval = useAtomValue(intervalAtom)

    return (
        <ClickHistory 
            interval={interval}
        /> 
    ); 
}

export default Timeseries