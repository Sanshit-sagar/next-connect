import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { UrlFieldSet, Label, Input } from '../../primitives/FieldSet' 

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent
} from '../../primitives/Select'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface ISlugCateogry {
    id: number; 
    category: string; 
    description: string; 
}

const slugCategoryOptions: ISlugCateogry[] = [
    { id: 0, category: 'Short', description: '' },
    { id: 1, category: 'Cute', description: ''  },
    { id: 2, category: 'Secure', description: '' },
    { id: 3, category: 'Marketable', description: '' },
    { id: 4, category: 'Custom', description: '' }
];

export const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
            
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$2' }}>
                        <Text size='1'> 
                            {slugCategoryOptions[selectedIndex]?.category} 
                            <ChevronDownIcon />
                        </Text>
                    </Flex>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {slugCategoryOptions.map((option: ISlugCateogry, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'> {option.category} </Text>
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    );
}

interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltType: 'number' | 'string' | 'mixed' | undefined;
    separator: string; 
    isManly?: boolean 
}

const SuggestedSlugs = ({ saltLength, numStrings, separator, saltType }: ISuggestedSlugsProps) => {
    let isManly = false; 
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='1' css={{ width: 'flex', display: 'inline-flex', flexWrap: 'nowrap', color: '$text'}}>
            {JSON.stringify(suggestion)}
        </Text>
    )
}

// const saltTypes: any[]  = ['number', 'string', 'mixed', undefined]
// const typeObk timeOnSite = new Date().no() PM`
interface INumberFieldProps {
    label: string | string[] | undefined | null;
    value: number | string;
    handleUpdate: (value: number) => void;  
}

const NumericalFieldSet = ({ label, value, handleUpdate }: INumberFieldProps) => {
    // cnonst get KO v/s 
    
    return (
        <UrlFieldSet> 
            <Label htmlFor={label}>
                {label} 
            </Label>
            <Input 
                key={`label-${label}`}
                value={value} 
                onValueChange={handleUpdate}
            />
        </UrlFieldSet>
    )
}
                
const SlugTabContent = () => {
    const [saltLength, setSaltLength] = useState<number>(2)
    const [numStrings, setNumStrings] = useState<number>(3)
    const [separator, setSeparator] = useState<string>('#')
    const [saltTypeIndex, setSaltTypeIndex] = useState<number>(0)

    return (
        <>
             <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                
                <Label 
                    key={`label-for-slug-len-${saltLength}-strings-${numStrings}`}
                    as='label' 
                    css={{ color: '$text' }}
                > 
                    Personalize your slug
                </Label>

                <SlugCategorySelector />

                    

                <SuggestedSlug 
                    saltLength={saltLength} 
                    numStrings={numStrings} 
                    separator={separator} 
                    saltTypeIndex={saltTypeIndex} 
                />    

            </UrlFieldSet>
        </>
    )   
}

export default SlugTabContent