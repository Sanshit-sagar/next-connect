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

interface IUserFields {
    path: string; 
    firstName: string; 
    lastName: string; 
    emailAddresses: string; 
    userFields: string[];
}

const useUserFields = (): { path: string; firstName: string; lastName: string; email: string; fields: string[]; } => {
    
    const resource: UserResource = useUser()
    const IUserFields 

    return {
        path,
        firstName,
        lastName,
        email: emailAddress,
        fields: Object.keys(userFields) 
    };
}

const IsLoading = () => (
    <Text> Loading... </Text> 
)

const GreetUser = () => {
    
    let formatMessage = useMessageFormatter(messages)

    return (
        <GreetingText> 
            {JSON.stringify(Object.keys(user))}
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