import React from 'react'

import { styled } from '../../../stitches.config'

import { Text } from '../../../primitives/Text'
import { NumberField } from '../../../compositions/NumberField' 

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


const AbTestingTab = () => {
    const [val, setVal] = React.useState(new Intl.NumberFormat('en-US', {style: 'percent'}).format(

    const handleChange = (e) => {
        setVal(new Intl.NumberFormat('en-US', {style: 'percent'}).format(e.currentTarget.value));
    }

    return (
        <AbTestingContainer>
            <NumberField
                label={'TEST'}
                value={val}
                onChange={handleChange}
                formatOptions={{
                    style: 'percent'
                }}
            />
            {/* <Text> Current Value: {testVal} </Text> */}
        </AbTestingContainer>
    )
}

export default AbTestingTab