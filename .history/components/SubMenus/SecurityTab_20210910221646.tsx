import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import SeoParams from './SeoParameters/SeoParamResults'

export const SecurityTabContent = () => {
   
    return (
        <Box css={{ height: '400px', width: '400px' }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
                <Text> yoyoyo </Text>
                <SeoParams />
            </Flex>
        </Box>

    )
}