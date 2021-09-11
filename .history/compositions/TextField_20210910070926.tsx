import React from 'react'
import { useTextField } from '@react-aria/textfield'

import { 
    ControlGroup, 
    Label,
    Input
} from '../primitives/FieldSet'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import { 
    InfoCircledIcon,
    CheckCircledIcon,
    CrossCircledIcon
} from '@radix-ui/react-icons'

interface IValidationProps {
    isValid: boolean;
}

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

const ValidationIcon = ({ isValid }: IValidationProps) => {
    return isValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}

const Validator = ({ isValid }: IValidationProps) => {
    const validationColor = isValid ? 'green' : 'red'
    const validationResult = isValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon isValid={isValid} />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}

interface ITextFieldProps {
    label: string; 
    value: string; 
    onChange: (event: React.ChangeEventHandler<HTMLInputElement>); 
    isValid: boolean;
}

export const TextField = ({ label, value, onChange, isValid = true }: ITextFieldProps) => {
    const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>()
    let {labelProps, inputProps} = useTextField(props, inputRef);

    return (
        <ControlGroup>
            <Label {...labelProps}> 
                <>{label}</>
                <InfoCircledIcon />
            </Label>
            <Input 
                {...inputProps}
                size='1' 
                type='text'
                ref={inputRef}
                placeholder='www.example.com'
                css={{
                    backgroundColor: '$accentDulled',
                    border: 'thin solid $border',
                    padding: '$2',
                    mt: '$2',
                    '&:hover': {
                        borderColor: '$neutral'
                    }
                }}
            /> 
            <Validator isValid={isValid} />
        </ControlGroup>
    )
}


// const IsTypingDisplay = () => {
    // const [isTyping, setIsTyping]  = useAtom(isTypingDestinationAtom)
//  
    // const [lastTypedAt, setLastTypedAt] = useState<number | undefined>(new Date(1970,1,1).getTime());
    // let {keyboardProps} = useKeyboard({
        // onKeyDown: (e: KeyboardEvent) => {
            // setLastTypedAt(new Date().getTime())
            // setIsTyping(true)
        // },
        // onKeyUp: (e: KeyboardEvent) => {
            // setLastTypedAt(new Date().getTime())
        // }
    // });
    // useEffect(() => {
        // if(isTyping && lastTypedAt - new Date().getTime() > 1000) {
            // setIsTyping(false); 
        // }
    // }, [lastTypedAt]);
    // 
    // const isTyping = useAtomValue(isTypingDestinationAtom)

    // return <Text css={{ marginLeft: 'auto' }}>{isTyping ? '...' : '' }</Text> 
// }


