// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React from 'react'
import { styled } from '../../stiches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import {DateUtils} from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css";

import { FlexCenterCenterColumn } from '../../primitives/Shared'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

const StyledCell = styled('div', {
    position: 'relative',
    height: '30px',
    width: '30px',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-end',
    gap: '$1',
    bc: 'transparent',
    border: '$1 solid $border',
    br: '0.5px',
    padding: '$1',
    margin: 0,
    '&:hover': {
        backgroundColor: '$neutral',
        borderColor: '$border3'
    }
});

const StyledDate = styled(Text, {
    position: 0,
    top: 0,
    rig
    color: '$text',
    size: '$2',
    margin: '$1',
    '&:hover': {
        color: '$accent'
    }
});


function renderDay(day) {
    const date = day.getDate();

    return (
        <div style={cellStyle}> 
            <div style={dateStyle}>
                {date}
            </div>
        </div>
    );
}

export const ExpirationTabContent = () => {

    return (
        <FlexCenterCenterColumn>
            <DayPicker 
                className="SlugLifetimeSelector"
                renderDay={renderDay}
                canChangeMonth={true}
            />
        </FlexCenterCenterColumn>
    );
}