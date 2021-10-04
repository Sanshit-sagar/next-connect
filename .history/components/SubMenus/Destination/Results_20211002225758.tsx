import React from 'react'
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useFilter } from '@react-aria/i18n'
import { useSavedDestinations } from '../../../hooks/useSavedCollections'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitivies/Flex'
import { ScrollArea } from '../../../primitives/ScrollArea'

const MatchedDestinations = styled(Flex, {
    width: 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$2'
})


const Results = () => {
    let { contains } = useFilter({ sensitivity: 'base' })

    const destinationInput = useAtomValue(destinationInputAtom)
    const { data, loading, error } = useSavedDestinations('concise')

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    return (
        <ScrollArea>
            <
        </ScrollArea>
    );
}