import React from 'react'

import { styled } from '../../../stitches.config'

import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'
import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'

import { TextField } from '../../../compositions/TextField'

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

const Controller = () => {
    const [altCount, setAltCount] = React.useState(2)

    return (
        <Toolbar>
            <NumberField
                label='Alternates'
                value={altCount}
                onChange={(updatedAltCount: number) => setAltCount(updatedAltCount)}
                minValue={2}
                maxValue={5}
            />
            <ToolbarSeparator /> 
            <RangeSlider
                label="Audience Split"
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[0.33, 0.66]}
                step={0.01}
            />
        </Toolbar>
    );
}


const ConfigDetails = () => {
    const [value, setValue] = React.useState('')

    const handleChange = (updatedValue: string) => {
        setValue(updatedValue)
    }

    return (
        <Flex css={{ f}}
        <TextField
            label='Email'
            placeholder='abc@example.com'
            value={value}
            onChange={handleChange}
        />
    )
}

const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
            <ConfigDetails /> 
        </AbTestingContainer>
    )
}

export default AbTestingTab