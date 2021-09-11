import React from 'react'

import { styled } from '../../../stitches.config'
import { RangeSlider } from '../../../compositions/Slider'

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'center', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

const Controller = () => {

    return (
        <RangeSlider
            label="Audience Split"
            formatOptions={{ style: 'percent' }}
            maxValue={1}
            defaultValue={[0.20, 0.60]}
            step={0.01}
        />
    );
}


const AbTestingTab = () => {

    return (
        <AbTestingContainer>

        </AbTestingContainer>
    )
}

export default AbTestingTab