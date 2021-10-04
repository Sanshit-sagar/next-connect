import React from 'react'
import { styled } from '../../../stitches.config'

import { useAtomValue } from 'jotai/utils'
import { destinationInputAtom } from '../../../atoms/destination'

import { useFilter } from '@react-aria/i18n'
import { useSavedDestinations } from '../../../hooks/useSavedCollections'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitivies/Flex'
import { ScrollArea } from '../../../primitives/ScrollArea'

const MatchedDestinations = styled('ul', {
    width: '250px',
    height: '250px',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    gap: '$2'
})


const Results = () => {
    let { contains } = useFilter({ sensitivity: 'base' })
    const destinationInput = useAtomValue(destinationInputAtom)
    const { data, loading, error } = useSavedDestinations('concise')

    let matchedDestinations: string[] = []

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    matchedDestinations results = !loading && !error && data ? data.slice(0,10)

    return (
        <ScrollArea>
            <MatchedDestinations>
                {}

            </MatchedDestinations>
        </ScrollArea>
    );
}