import React from 'react'


import { Text } from '../../primitives/Text'
import { ControlGroup, Label } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'
import { OpenGraphPreview } from './OpenGraphPreview'

import { useAtom, atom } from 'jotai'

const VALID_URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const destinationInputAtom = atom('')
export const isDestinationInputValidAtom = atom((get) => isValidURL(get(destinationInputAtom)))

function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    const [isDestValid] = useAtom(isDestinationInputValidAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }


    return (
        <>
            <ControlGroup>
                <Label css={{ color: '$text', mt: '$2' }}> 
                    <Text size='1' css={{ color: '$text' }}>
                        Original URL
                    </Text>
                </Label>
                <TextField 
                    size='1' 
                    type='url'
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{
                        color:  isDestValid ? 'green' : 'red',
                        borderColor: isDestValid ? 'green' : 'red',
                        border: 'thin solid',
                        padding: '$2',
                        mt: '$2'
                    }}
                /> 
            </ControlGroup>
           
            <OpenGraphPreview
                destinationInput={destinationInput}
                isDestValid={isDestValid}
            />


        </>
    );
}



