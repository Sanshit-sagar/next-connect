import { styled } from '../../stitches.config'
import { useMessageFormatter } from '@react-aria/i18n';

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { 
    useUser,
    SignedIn, 
    ClerkLoading, 
    UserButton
} from '@clerk/nextjs'

import { messages } from '../Locales'

const ProfileWrapper = styled(Flex, {
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$2',
    ml: '$3', 
    bc: 'transparent'
})

const GreetingText = styled(Text, {
    fontSize: '$6',
    color: '$text',
    margin: '$1'
}); 

const IsLoading = () => (
    <Text> Loading... </Text> 
)

const GreetUser = () => {
    let user = useUser()
    let formatMessage = useMessageFormatter(messages)

    return (
        <GreetingText> 
            {JSON.stringify(user)})} 
        </GreetingText>
    )
}


export const UserProfile = () => {

    return (
        <ProfileWrapper>
            <ClerkLoading>
                <IsLoading /> 
            </ClerkLoading>
            <SignedIn>  
                <GreetUser /> 
                <UserButton /> 
            </SignedIn> 
        </ProfileWrapper>
    )
}