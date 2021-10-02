import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'
import { Tree } from '../../compositions/Tree'

import {
    useSavedSlugs, 
    useSavedDestinations 
} from '../../hooks/useSavedCollections'

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}
interface CollectionProps {
    name: string; 
    data: string[]; // TODO replace with Collection[] 
    loading: boolean;
    error: Error | null; 
}

interface MappingProps {
    name: string; 
    data: {
        [key: string]: string[] 
    }; 
    loading: boolean; 
    error: Error | null; 
}

const CollectionContainer = styled(Flex, {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1'
});

const Collection = ({ name, data, loading, error }: CollectionProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return (
        <CollectionContainer>
            <Heading size='2'> {name} </Heading>
            <Separator orientation={'horizontal'} /> 
            
            <Tree name={name} defaultOpen>
                {data && data.map((datum: string, idx: number) => (
                    <Tree key={`slugIdx-${idx}`} name={datum} />
                ))}
            </Tree>
        </CollectionContainer>
    )
}

const Mapping = ({ name, data, loading, error }: MappingProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>

    return (
        <CollectionContainer>
            <Tree name={<Text size=''> {name} </Heading>}>
                {data && Object.keys(data).map((url, i) => {
                    let slugs = data[url] 
                    return (
                        <Tree key={i} name={`${url} (${slugs.length})`} defaultOpen>
                            {slugs.map((slug, j) => (
                                <Tree key={j} name={slug} /> 
                            ))}
                        </Tree>
                    )
                })}
            </Tree>
        </CollectionContainer>
    )
}

export const SavedSlugs = () => {
    const { data, loading, error }: SwrResponse = useSavedSlugs()
    return <Collection name={'Slugs'} data={data} loading={loading} error={error} /> 
}

export const SavedDestinations = () => {
    const { data, loading, error }: SwrResponse = useSavedDestinations()
    return <Mapping name={'Destination URLs'} data={data} loading={loading} error={error} /> 
}