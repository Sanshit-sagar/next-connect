// from http://react-day-picker.js.org/examples/selecting-range-mouse-enter.html
import React from 'react'

import { }

import {DateUtils} from 'react-day-picker'
import DayPicker from 'react-day-picker/DayPicker'
import "react-day-picker/lib/style.css";

import { FlexCenterCenterColumn } from '../../primitives/Shared'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'


function renderDay(day) {
    const date = day.getDate();

    const dateStyle = {
        position: 'absolute',
        color: 'lightgray',
        bottom: 0,
        right: 0,
        fontSize: 20,
    };
    const cellStyle = {
        height: 50,
        width: 60,
        position: 'relative',
    };

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