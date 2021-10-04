import { styled } from '@stitches/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px $
    '&:hover': { 
        backgroundColor: '$accent'
    },
    '&:focus': { 
        boxShadow: `0 0 0 2px black` 
    },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: violet.violet11,
});


export const Checkbox = StyledCheckbox;
export const CheckboxIndicator = StyledIndicator;
