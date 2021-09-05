import React, { useState, useEffect } from 'react'

import { styled, 
    theme as defaultTheme, 
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark } from '../../stitches.config'
import { darkModeAtom, themeAtom } from '../../pages/index'

import { IconButton } from '../../primitives/IconButton'
import { Icon } from '../../primitives/Icon'

import { useAtom } from 'jotai'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

import { themes, activeThemeIndexAtom } from '../Swatch'

function getToggledIndex(preToggleIndex) {
   let lightOrDark = themes[preToggleIndex].id.split('-')[1]
   return (lightOrDark==='light') ? preToggleIndex + 1 : preToggleIndex - 1;
}

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [activeThemeIndex, setActiveThemeIndex] = useAtom(activeThemeIndexAtom)

    const thematicToggle = () => {
        setDarkMode(!darkMode)
        setActiveThemeIndex(activeThemeIndex===0 ? 2 : 
    }
    
    return (
        <>
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
            <Icon label={`Dark Mode: ${!darkMode ? 'OFF' : 'ON'}`}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </Icon>
        </IconButton>
        <p> {theme} </p>
        </>
    )
}

export default DarkMode 