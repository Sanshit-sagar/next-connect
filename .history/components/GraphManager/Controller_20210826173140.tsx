import React from 'react'

import {
    Toolbar,
    ToolbarSeparator
} from '../../primitives/Toolbar'

import {
    Quantity,
    TimeAgo,
    TickSize,
    ToggleGroup,
    Actions
} from './index'


const Controller = () => {

    return (
        <Toolbar>
            <Quantity />
            <TimeAgo /> 
            <TickSize />
            <ToolbarSeparator />
            <ToggleGroup /> 
            <ToolbarSeparator />
            <Actions />
        </Toolbar>
    );
}

export default Controller