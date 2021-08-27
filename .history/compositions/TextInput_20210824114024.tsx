import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Input, Label, Fieldset } from '../primitives/TextInput'


const FieldSet = ({ label, inputValueAtom }) => {
    const [input, setInput] = useAtom(inputValueAtom)

    return (
        <Fieldset>
         <Label 
                htmlFor="inputLabel" 
                css={{ lineHeight: '35px', marginRight: 15 }}
            >
              First name
            </Label>
             <Input 
                type="text" 
                id="firstName" 
                defaultValue="Pedro Duarte" 
            />
        </Fieldset>
    )
}
