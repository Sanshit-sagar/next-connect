import React from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'
export const newSlugTimeframeStartAtom = atom(new Date())

const ExpirationTabContent = () => {

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center', gap: '$1' }}> 
            <Text size='5' css={{ color: '$text' }}>
                hihihi
            </Text>
        </Flex>
    )
}


export default ExpirationTabContent