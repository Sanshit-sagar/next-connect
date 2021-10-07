import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'


import { useSlugDetails } from '../../hooks/useSavedCollections'
import { ClockIcon, LockClosedIcon, StopwatchIcon } from '@radix-ui/react-icons'

import { useDateFormatter } from '@react-aria/i18n'

const SlugDetailsContainer = styled(Flex, {
    height: 100,
    width: 100, 
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    gap: '$1',
    bc: 'transparent', 
    color: '$text',
    border: 'none', 
    margin: 0, 
    padding: 0,
    ml: '$1',
    pl: '1px',
    pt: '$1',
});


interface SlugDetails {
    createdAt: string; 
    destination: string; 
    email: string; 
    expiration: string; 
    password: string; 
    slug: string; 
    url: string; 
}

function deserialize(data: SlugDetails): SlugDetails | undefined {
   
    if(!data?.slug) return undefined;

    let expArr = data.expiration.substring(9).split('&')
    let expStart = expArr[1]
    let expEnd = expArr[1].substring(8)

    return {
        ...data,
        encodedUrl: data.url,
        createdAt: new Date(data.createdAt).getTime(),
        password: data.password.substring(5),
        expiration: 
    }
}

type SwrResponse = {
    data: string[];
    loading: boolean;
    error: Error | any | null
}

export const SlugInfo = ({ slug }: SlugDetails) => {
    let formatter = useDateFormatter()
    const { data, loading, error }: SwrResponse = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    let details: SlugDetails | undefined = (data && !loading && !error) ? deserialize(data) : undefined

    if(details===undefined) return null
    
    return (
        <SlugDetailsContainer>
            <Tree name={details.expiration} icon={<StopwatchIcon />} defaultOpen />
            <Tree name={details.password} icon={<LockClosedIcon />} defaultOpen />
            <Tree name={formatter.format(details.createdAt)} icon={<ClockIcon />}  defaultOpen />
        </SlugDetailsContainer>
    )
}