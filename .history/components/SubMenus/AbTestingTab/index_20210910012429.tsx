import React from 'react'

import { styled } from '../../../stitches.config'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

import { NumberField } from '../../../compositions/NumberField'

const 

const AbTestingTab = () => {

    return (
        <Box css={{ border: ''}}
        <NumberField />
    )
}

export default AbTestingTab