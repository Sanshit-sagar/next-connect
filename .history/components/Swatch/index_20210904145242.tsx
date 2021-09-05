import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { IconButton } from '../../primitives/IconButton'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose,
    PopoverArrow
} from '../../primitives/Popover'

import { 
    Cross2Icon,
    LayersIcon 
} from '@radix-ui/react-icons'

import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const ThemeSelectorBase = () => (
    <IconButton 
        size='1'
        variant='raised'
    />
);

const themes = [
    { id: 'default-theme', name: 'Default (Light)' },
    { id: 'dark-theme', name: 'Default (Dark)' },
    { id: 'dark-theme-2', name: 'Dark Theme v2' },
];

const activeThemeIndexAtom = atom(0);
const activeThemeIdAtom = atom((get) => themes[get(activeThemeIndexAtom)].id)

const Swatch = () => {
    const setActiveThemeIndex = useUpdateAtom(activeThemeIndexAtom)
    const activeThemeIdStr = useAtomValue(activeThemeIdAtom)
    
    const handleRetheme = (updatedThemeIndex: number) => {
        setActiveThemeIndex(updatedThemeIndex)
    }

    useEffect(() => {
        document.body.classList.remove('theme-default', 'dark-theme', 'dark-theme-2')
        document.body.classList.add(activeThemeIdStr)
    }, [darkMode])

    return (
        
        <Popover>
            <PopoverTrigger aria-label={`Theme Selection`}>
                <IconButton>
                    <LayersIcon />
                </IconButton>
            </PopoverTrigger>

            <PopoverContent>
                <Flex css={{ flexDirection: 'column', gap: 10 }}>
                    <Text as='span' css={{ marginBottom: 10, color: '$loContrast', transform: 'uppercase' }}>
                        Current: {activeThemeIdStr}  
                    </Text>
                    <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'center'}}>
                        {themes.map((theme, i) => {
                            return (
                                <Button
                                    key={`theme-${i}`}
                                    onClick={() => handleRetheme(i)}
                                >
                                    {theme.id}
                                </Button> 
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