import { styled } from '../stitches.config'
import { green } from '@radix-ui/colors'

export const FieldSet = styled('fieldset', {
    all: 'unset',
    width: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
});

export const FieldSetGroup = styled('fieldset', {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    jc: 'flex-start', 
    ai: 'flex-start', 
    flexWrap: 'wrap',
    gap: '$1', 
    pt: '$2',
    border: 'thin solid transparent'
});

export const FieldSetInputGroup = styled('div', {

    width: '100%', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-end', 
    gap: '$1',  
    mt: '$2',
    border: '1px solid', 
    borderColor: '$border',  
    backgroundColor: '$lightPanel', 
    color: '$text', 
    '&:hover': { 
        borderColor: '$hiContrast', 
        br: '$2' 
    } 
});

export const FieldSetGroupHeading = styled('fieldset', {
    display: 'inline-flex',
    color: '$text',
    fontSize: 14,
    fontWeight: 'bold',
    mb: '$2', 
    textDecoration: 'underline', 
    textDecorationColor: '$funky',
    border: 'none',
});

export const FilterFieldset = styled('fieldset', {
    all: 'unset',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

export const UrlFieldSet = styled('fieldset', {
    all: 'unset',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
})
  
export const Label = styled('label', {
    display: 'block',
    fontSize: 12,
    color: 'red',
    fontWeight: 200,
    fontStyle: 'regular',
    lineHeight: 1,
    margin: 1
});
  
export const Input = styled('input', {
    all: 'unset',
    flex: '1 0 auto',
    borderRadius: '$1',
    padding: '0 $1',
    color: '$accent',
    bc: 'transparent',
    border: 'thin solid',
    br: '$1',
    borderColor: '$accent',
    '&:focus': { 
        boxShadow: `0 0 0 2px ${green.green8}` 
    },
    fontSize: 12,
    placeholder: '$loContrast'
});
  