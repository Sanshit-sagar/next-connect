import React, { useEffect } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { IconButton } from '../../primitives/IconButton' 

import { 
    theme as defaultTheme,
    theme1Light, 
    theme1Dark, 
    theme2Light, 
    theme2Dark, 
    theme3Light,
    theme3Dark
} from '../../stitches.config'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose,
    PopoverArrow,
    PopoverHeading,
    PopoverSeparator
} from '../../primitives/Popover'

import { 
    Cross2Icon,
    LayersIcon,
    BlendingModeIcon
} from '@radix-ui/react-icons'

import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

interface ITheme {
    index: number; 
    id: string; 
    name: string; 
    className: any; 
    icon: any;
    color: string; 
};

export const themes: ITheme[] = [
    { index: 0, id: 'default-theme',name:'Default Theme', className: defaultTheme, icon:<BlendingModeIcon /> , color: 'orange' },
    { index: 1, id: 'theme1-light', name: 'Theme1 [Light]', className: theme1Light, icon:<BlendingModeIcon />, color: 'white' },
    { index: 2, id: 'theme1-dark', name: 'Theme1 [Dark]', className: theme1Dark, icon:<BlendingModeIcon />, color: 'purple' },
    { index: 3, id: 'theme2-light', name: 'Theme2 [Light]', className: theme2Light, icon:<BlendingModeIcon />, color: 'white'},
    { index: 4, id: 'theme2-dark', name: 'Theme2 [Dark]', className: theme2Dark, icon:  <BlendingModeIcon />, color: 'pink'},
    { index: 5, id: 'theme3-light', name: 'Theme3 [Light]', className: theme3Light, icon: <BlendingModeIcon />, color: 'white'},
    { index: 6, id: 'theme3-dark', name: 'Theme3 [Dark]', className: theme3Dark, icon:  <BlendingModeIcon />, color: 'green' },
];

const themeIds: string[] = themes.map(())

export const activeThemeIndexAtom = atom(0)
export const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)
export const activeThemeClassNameAtom = atom((get) => themes[get(activeThemeIndexAtom)].className)

const Swatch = () => {
    const setActiveThemeIndex = useUpdateAtom(activeThemeIndexAtom)
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    const activeThemeClassName = useAtomValue(activeThemeClassNameAtom)
    
    const handleRetheme = (updatedThemeIndex: number) => setActiveThemeIndex(updatedThemeIndex)

    useEffect(() => {
        document.body.classList.remove('default-theme', 'theme1-light', 'theme1-dark', 'theme2-light', 'theme2-dark', 'theme3-light', 'theme3-dark')
        document.body.classList.add(activeThemeClassName)
    }, [activeThemeIdStr, activeThemeClassName])

    return (
        
        <Popover>
            <PopoverTrigger aria-label={`Theme Selection`}>
                <IconButton>
                    <LayersIcon />
                </IconButton>
            </PopoverTrigger>

            <PopoverContent>
                <Flex css={{ fd: 'column', jc: 'space-evenly', ai: 'center', gap: 10, pt: '$2', pl: '$1', pr: '$1' }}>
                    <Text as='span' css={{ mb: 10, color: '$loContrast', transform: 'uppercase' }}>
                        Current: {activeThemeIdStr}  
                    </Text>
                    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-start', flexWrap: 'wrap', width: '150px', height: '100%' }}>
                        {themes.map((theme, i) => {
                            return (
                                <IconButton
                                    key={`theme-${i}`}
                                    onClick={() => handleRetheme(i)}
                                    css={{ bc: theme.color, mb: '$1', mr: '$1' }}
                                >
                                    {theme.icon}
                                </IconButton> 
                            );
                        })}
                    </Flex>
                </Flex>

                <PopoverArrow />
                <PopoverClose aria-label="Close">
                    <Cross2Icon />
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default Swatch