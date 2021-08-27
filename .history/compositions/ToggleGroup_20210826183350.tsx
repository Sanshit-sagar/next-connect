import React, { useState } from 'react'

import { 
    ToolbarGroup,
    ToolbarGroupLabel,
    ToolbarToggleGroup,
    ToolbarToggleItem
} from '../primitives/Toolbar'

export interface Preset {
    id: string;
    index: number;
    label: string;
    value: string; 
}

export interface PresetToggleProps {
    value: string;
    presets: Preset[]; 
}


const PresetToggleButtons: React.FC<PresetToggleProps>  = ({ value, presets }: PresetToggleProps) => {

    const [selectedValue, setSelectedValue] = useState(value)

    const handleSelectionChange = (updatedValue: React.SetStateAction<string>) => {
        setSelectedValue(updatedValue)
    }

    return (
        <ToolbarGroup>
            <ToolbarToggleGroup
                type='single' 
                value={selectedValue}
                onValueChange={handleSelectionChange}
                disabled={false}
                aria-label='Time Filter Presets'
            >
                {presets.map((preset: Preset, index: number) => {
                    return (
                        <ToolbarToggleItem
                            as="button" 
                            key={index}
                            value={preset.value}
                        >
                           {preset.id}
                        </ToolbarToggleItem>
                    );
                })}
            </ToolbarToggleGroup>
        </ToolbarGroup>
    )
}

export default PresetToggleButtons