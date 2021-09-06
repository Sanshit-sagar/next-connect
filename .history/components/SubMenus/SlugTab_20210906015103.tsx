import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { ControlGroup, Label, Input } from '../../primitives/FieldSet' 
import {
    Toolbar,
    ToolbarToggleGroup,
    ToolbarToggleItem, 
    ToolbarLink
} from '../../primitives/Toolbar' 

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

interface INumberFieldProps {
    label: string | string[] | undefined | null;
    value: number | string;
    handleUpdate: (value: number) => void;  
}

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent,
    SelectItemIndicator
} from '../../primitives/Select'

import { 
    ChevronDownIcon, 
    DotFilledIcon,
    MixIcon,
    LetterCaseCapitalizeIcon
} from '@radix-ui/react-icons'

interface ISlugCateogry {
    id: number; 
    category: string; 
    description: string; 
}

interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltTypeIndex:number; 
    separator: string; 
    isManly?: boolean 
}

const slugCategoryOptions: ISlugCateogry[] = [
    { id: 0, category: 'Random', description: '' },
    { id: 1, category: 'Custom', description: ''  },
];

interface ISeparator {
    symbol: string;
    value: string;
    alt?: string | undefined; 
}

export const numStringsAtom = atom(3)
export const saltLengthAtom = atom(4)
export const saltTypeIndexAtom = atom(0)
export const separatorAtom = atom('-')

export const NUM_STRINGS_LABEL = 'Number of Strings'

const CustomLabel = ({ value }: { value: string }) => (
    <Label>
        <Text size='1' css={{ color: '$text' }}> 
            {value}
         </Text>
    </Label>
);

const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
            
    return (
        <Flex css={{ width: '200px', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text size='1'> 
                        {slugCategoryOptions[selectedIndex]?.category} 
                        <ChevronDownIcon />
                    </Text>
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
                                     <Flex css={{ display: 'flex', fd: 'row', jc: 'flex-start', ai: 'center', gap: 0 }}>   
                                        {index===selectedIndex &&
                                            <SelectItemIndicator>
                                                <DotFilledIcon /> 
                                            </SelectItemIndicator>
                                         }
                                        <Text size='1' css={{ color: '$text'}}> 
                                            {option.category} 
                                        </Text>
                                    </Flex>
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    );
}

const saltTypes = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

const SuggestedSlug  = ({ saltLength, numStrings, separator, saltTypeIndex }: ISuggestedSlugsProps) => {
    let isManly = false; 
    let saltType = saltTypes[saltTypeIndex].id;
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='1' css={{ width: 'flex', display: 'inline-flex', flexWrap: 'nowrap', color: '$text'}}>
            {suggestion}
        </Text>
    )
}

const NumericalFieldSet = ({ label, value, handleUpdate }: INumberFieldProps) => {

    return (
        <ControlGroup> 
            <CustomLabel value={label} />

            <Input 
                type='number'
                key={`label-${label}`}
                value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleUpdate(parseInt(`${event.currentTarget.value}`))
                }}
                css={{ width: '100px' }}
            />
        </ControlGroup>
    )
}

const NumStringsFieldSet = () => {
    const [numStrings, setNumStrings] = useAtom(numStringsAtom)

    return (
        <NumericalFieldSet 
            label={NUM_STRINGS_LABEL} 
            value={numStrings} 
            handleUpdate={(value: number) => setNumStrings(value)}
        />
    );
}

const SeparatorSelector = () => {
    const [separator, setSeparator] = useAtom(separatorAtom)

    const separators: ISeparator[] = [
        { symbol: '-', value: 'hyphen', alt: 'dash' },
        { symbol: '*', value: 'start', alt: 'asterisk'}, 
        { symbol: '_', value: 'underscore', alt: undefined },
        { symbol: '#', value: 'hashtag', alt: 'pound' },
    ];

    const handleSeparatorChange = (value: string) => setSeparator(value)

    return (
        <ControlGroup> 
            <CustomLabel value='Separator' /> 

            <ToolbarToggleGroup 
                type='single' 
                aria-label='slug-word-separator'
                value={separator}
                onValueChange={handleSeparatorChange}
            >
                {separators.map((separator: ISeparator, index: number) => {
                    return (
                        <ToolbarToggleItem 
                            key={`Separator-id-${index}`}
                            value={separator.value}
                            aria-label={`Separator-with-symbol-for-${separator.value}`}
                        >
                           <Text size='1' css={{ color: '$text' }}>
                               {separator.symbol}
                            </Text>
                        </ToolbarToggleItem>
                    );
                })}
            </ToolbarToggleGroup>

        </ControlGroup>
    )
}

const SaltTypePicker = () => {
    const [saltTypeIndex, setSaltTypeIndex] = useAtom(saltTypeIndexAtom)


    const updateSaltType = (value: index) => setSaltTypeIndex(value) 

    return (
        <ControlGroup>
            <Label>
                <Text size='1' css={{ color: '$text' }}> 
                    Salt Type
                 </Text>
            </Label>

            <ToolbarToggleGroup 
                type='single' 
                value={saltTypeIndex} 
                onValueChange={updateSaltType}
            > 
                {saltTypes.map((type: { id: number; icon: any }, i: number) => {
                    return (
                        <ToolbarToggleItem 
                            key={`Salt-type-${i}`} 
                            value={i}
                        > 
                            <>
                                <Text size='1' css={{ color: '$text'}}>
                                   {type.id}
                                </Text>
                                {type.icon}
                            </>
                         </ToolbarToggleItem>
                    )
                })}
            </ToolbarToggleGroup>
        </ControlGroup> 
    )
}
                
const SlugTabContent = () => {
    const [saltLength, setSaltLength] = useState(2)
    const [numStrings, setNumStrings] = useState(3)

    const saltTypeIndex = useAtomValue(saltTypeIndexAtom)
    const separator = useAtomValue(separatorAtom)

    return (
        <Flex css={{  fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
            <SlugCategorySelector />

            <Toolbar>            
                <NumericalFieldSet
                    label={`NumStrings`}
                    value={numStrings} 
                    handleUpdate={(value: number) => setNumStrings(value)}
                />

                <NumericalFieldSet 
                    label={`SaltLen`}
                    value={saltLength} 
                    handleUpdate={(value: number) => setSaltLength(value)}
                />
                <SeparatorSelector />
                <SaltTypePicker /> 
             </Toolbar>   

            <SuggestedSlug 
                saltLength={saltLength} 
                numStrings={numStrings} 
                separator={separator} 
                saltTypeIndex={saltTypeIndex} 
            />
        </Flex>
    );
}

export default SlugTabContent