import React, { useState, useEffect } from 'react'

import { useAtom } from 'jotai'
import { Icon } from '../../primitives/Icon'
import { IconButton } from '../../primitives/IconButton'

import { 
    styled, 
    theme as defaultTheme, 
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark 
} from '../../stitches.config'
import { 
    darkModeAtom, 
    themeAtom 
} from '../../pages/index'
import { 
    themes, 
    activeThemeIndexAtom 
} from '../Swatch'
import { 
    SunIcon, 
    MoonIcon 
} from '@radix-ui/react-icons'

const LIGHT = 'light'
const DARK = 'dark'

const isLight = (thematicState: string) => thematicState===LIGHT

const getToggledIndex = (preToggleIndex: number) => {
    try {
        return isLight(themes[preToggleIndex].id.split('-')[1]) ? preToggleIndex + 1 : preToggleIndex - 1
    } catch(error) {
        console.error(error)
        return preToggleIndex; 
    }
}
    

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
           // TODO: to be safe, return  math.min(themes.length-1, math.max(0, getToggleIndex(ati)))
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 2 : getToggledIndex(activeThemeIndex))
    }
    
    return (
        <IconButton
            size='1'
            variant='raised'
            onClick={thematicToggle} 
            css={{ 
                mr: '$5', 
                bc: '$hiContrast', 
                borderColor: '$funky', 
                color: '$funky', 
                '&:hover': { 
                    bc: '$accentHover', 
                    border: 'thin solid', 
                    borderColor: '$border3'
                }
            }}
        >
            <Icon 
                label={`Dark Mode: ${!darkMode ? 'OFF' : 'ON'}`}
                children={darkMode ? <SunIcon /> : <MoonIcon />}
            />
        </IconButton>
    )
}

export default DarkMode 