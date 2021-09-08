
import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import { atom, useAtom } from 'jotai'
import { fetcher } from '../../../lib/utils/fetcher'

import useSWR from 'swr'
import 

const postId = atom(9001)

const SeoParamResult = () => {
    const id = useAtom(postId)
    const { data, error } = useSWR(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, fetcher)

    if(!data && !error) return <Text> {id} loading... </Text>;
    if(error) return <Text> error: {error && error.message} </Text>;
    return <Text css={{ color: '$text' }}> {data ? JSON.stringify(data) : 'No data to show'} </Text>;
}

export const SeoParams = () => {

    return (
        <Box css={{ backgroundColor: 'transparent', height: '300px', width: '300px' }}>
            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch' }}>
                <SeoParamResult />
            </Flex>
        </Box>
    );
}