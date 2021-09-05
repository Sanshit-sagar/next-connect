import React from 'react'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

const GRADIENT_ID_BASE: string = 'brush-id'

export const SecurityTabContent = () => {
    const ugcc = useGloballyConsistentColors(); 
    return (
        <Box css={{ p: '$2', br: '$2', bc: '$2'}}>
            <Text> {JSON.stringify(ugcc)} </Text>
        </Box>

    )
}