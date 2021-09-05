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
import { useAtomValue } from 'jotai/utils'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'


const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const setActiveThemeIndex = useA(activeThemeIndexAtom)
    
    return (
        <>
        <IconButton
            size='1'
            variant='raised'
            onClick={() => {
                 setDarkMode(!darkMode)
                 setTheme(theme === 'defaultTheme' ? theme2Dark : `${theme.split('-')[0]}-${theme.split('-')[1]==='light' ? 'dark':'light'}`)
            }} 
            css={{ mr: '$5', bc: '$hiContrast', borderColor: '$funky', color: '$funky', '&:hover': { bc: '$accentHover', border: 'thin solid', borderColor: '$border3' } }}
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