import React from 'react'

import { styled } from '../../../stitches.config'

import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'
import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'

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

    return (
        <Toolbar>
            <NumberField
                label='# of Alternates'
                value={}
            />
            <RangeSlider
                label="Audience Split"
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[0.33, 0.33]}
                step={0.01}
            />
            <ToolbarSeparator /> 
        </Toolbar>
    );
}


const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
        </AbTestingContainer>
    )
}

export default AbTestingTab