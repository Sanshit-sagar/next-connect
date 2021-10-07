import React from 'react'
import { styled } from '../../stitches.config'

import { atom, useAtom } from 'jotai'
import {
    zoomOptions,
    rangeOptions,
    rangeIndexAtom,
    intervalOptions,
    intervalIndexAtom,
    clickstreamZoomIndexAtom,
    statisticOptions,
    statisticIndexAtom,
    windowSizeAtom
} from '../../atoms/timeseries'

import { Text } from '../../primitives/Text'
import { NumberField } from '../../compositions/NumberField'
import { Toolbar, ToolbarButtonGroup, ToolbarSeparator } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'

import { styleOptions as curveOptions } from '../../atoms/timeseries'

import { 
    SpaceEvenlyHorizontallyIcon, 
    CalendarIcon, 
    BarChartIcon 
} from '@radix-ui/react-icons'

const ToolbarMenu = styled(Toolbar, {
    height: 30, 
    border: 'none', 
    boxShadow: 'none', 
    width: '98.5%' 
});

interface SelectedProps {
    icon: React.ReactNode; 
    text: string; 
};

const Selected = ({ 
    icon, 
    text 
}: SelectedProps) => (
    <>
        {icon}
        <Text size='1'> {text} </Text>
    </>
); 

export const Range = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(rangeIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={rangeOptions[selectedIndex].textValue}
            selectedTextValue={
                <Selected 
                    icon={<CalendarIcon />} 
                    text={rangeOptions[selectedIndex].textValue} 
                />
            }
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
            selectedValue={intervalOptions[selectedIndex].textValue}
            selectedTextValue={
                <Selected 
                    icon={<SpaceEvenlyHorizontallyIcon />} 
                    text={intervalOptions[selectedIndex].textValue} 
                />
            }
            items={intervalOptions}
        />
    )
}

export const Statistic = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(statisticIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Statistic Selector'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`statisticOptions[selectedIndex].value`}
            selectedTextValue={
                <Selected 
                    icon={<BarChartIcon /> } 
                    text={statisticOptions[selectedIndex].textValue} 
                />
            }
            items={statisticOptions}
        />
    )
}

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(clickstreamZoomIndexAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: number) => setZoomIndex(value || 0)}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomOptions[zoomIndex].value}`}
            items={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}


const clickstreamCurveIndexAtom = atom(0)

export const CurveOptions = ({ curveOptions }: { curveOptions: { key: string; }}) => {
    const [curveIndex, setCurveIndex] = useAtom(clickstreamCurveIndexAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${curveIndex}`}
            setSelectedIndex={(value: number) => setCurveIndex(value || 0)}
            selectedValue={`${curveIndex}`}
            selectedTextValue={`${curveOptions[curveIndex].value}`}
            items={curveOptions}
            groupName={'Slug Activity Graph Curve Options'}
        />
    );
}


export const WindowSize = () => {
    const [windowSize, setWindowSize] = useAtom(windowSizeAtom)

    return (
        <NumberField
            label={'Window Size'}
            value={windowSize}
            onChange={(updatedValue: number) => setWindowSize(updatedValue)}
        />
    )
}



const Controller = () => (
    <ToolbarMenu aria-label='Timeseries-controls'>
        <ToolbarButtonGroup>
            <ToolbarSeparator />
            <CurveOptions />
            <ToolbarSeparator />
            <Range />
            <Increments />
            <ToolbarSeparator />
            <Statistic />
        </ToolbarButtonGroup>
    </ToolbarMenu>
);

export default Controller