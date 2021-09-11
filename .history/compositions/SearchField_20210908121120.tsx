import React, { useRef } from 'react'

import { styled } from '../stitches.config'
import { useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'
import { useSearchFieldState } from '@react-stately/searchfield';

import { Cross2Icon } from '@radix-ui/react-icons'

const SearchInputWrapper = styled('div', {
    backgroundColor: '$accent',
    padding: '$1',
    br: '$1',
    width: '250px',
    display: 'flex',
});

const SearchInput = styled('input', {
    all: 'unset',
    flex: 1,
    color: '$accentContrast',
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': { 
        border: '$border3'
    }
})

const ClearInput = styled('button', {
    border: 'transparent',
    outline: 'transparent',
    backgroundColor: 'transparent',
})

const ClearInputButton = ({ inputLength }: { inputLength: number }) => (
    inputLength===0 ? null : <ClearInput><Cross2Icon /></ClearInput>
);


export const SearchField = (props) => {
    let inputRef = useRef()
    let state = useSearchFieldState(props)
    let {inputProps} = useSearchField(props, state, inputRef)
  
    return (
        <SearchInputWrapper>
            <SearchInput 
                {...inputProps} 
                ref={inputRef} 
            />
            {state.value!=='' && 
            <ClearInputButton 
                    inputLength={state.value.length} 
                />
            }
        </SearchInputWrapper>
    );
}
