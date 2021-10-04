import { styled } from '../../../stitches.config'

import React, { useState } from 'react'

import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { updateSearchParamsAtom } from '../data'

import { useUser } from '@clerk/clerk-react'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
// import { useHover } from '@react-aria/interactions'
// import { useFocusWithin } from '@react-aria/interactions'
// import { useFetch } from '../../../hooks/useFetch'

import { Item } from '@react-stately/collections' 
import { ComboBox } from '../../../compositions/ComboBox'


import { 
    UrchinAtom, 
    SavedUrchin,
    IUrchinListProps,
    UrchinCategoryType,
    UrchinCategoryEnum,
} from './interfaces'

import {
    seoTermAtom,
    seoSourceAtom,
    seoMediumAtom,
    seoContentAtom,
    seoCampaignAtom,
    // focussedParamAtom,
    // hoveredParamAtom,
    // clickedParamAtom
} from '../../../atoms/urchins'

const UrchinGroupContainer = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch',
    gap: '$1'
})


const urchinAtoms: UrchinAtom[] = [
    { key: '1', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: '2', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: '3', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: '4', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: '5', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

type NewUrchin = Omit<SavedUrchin, 'key'>;


function NewUrchinFactory(label: UrchinCategoryType, initValue: string, listIndex: number): NewUrchin {
    const datetime = new Date()

    return {
        id: `${listIndex}`,
        category: label,
        name: initValue,
        frequency: 1,
        updatedAt: datetime,
        createdAt: datetime,
        slugs: ['tester_slug'],
    };
}


export const UtmParamInput = ({ key, label, filterValue, setFilterValue, endpoint }: IUrchinListProps) => { 
    // const [endpoint, setEndpoint] = useState('')   
    const updateSearchParams = useUpdateAtom(updateSearchParamsAtom)

    const [error, setError] = useState<Error | null>(null)
    const [selectedKey, setSelectedKey] = useState<Key>('a')
 
    let { contains } = useFilter({ sensitivity: 'base' })

    let list = useAsyncList<NewUrchin, string>({ 
        async load({ signal, cursor }) {
            const res = await fetch(cursor || `${endpoint}`, { signal })
            const json = await res.json()

            return { 
                items: json.results, 
                cursor: json.next 
            }
        }
    })
   
    let filteredItems: ComboBoxItem[] = React.useMemo(() => {
        return list.items
            .filter((item: NewUrchin) => contains(item.name, filterValue))
            .map((matchedItem: NewUrchin) => {
                return {
                    id: matchedItem.id,
                    name: matchedItem.name
                }
            }); 
    }, [list, filterValue])

  
    // STATE METHOD IMPLEMENTATIONS / EVENT HANDLERS
    let onSelectionChange = (key: Key): any => {
        let selectedItem: NewUrchin = list.items.find((item: NewUrchin) => (item.id===key)) || list.items[0]
        setSelectedKey(key)
        setFilterValue(selectedItem?.name ?? '')
        
        if(selectedItem?.name) {
            updateSearchParams({ param: `utm_${label}`, value: selectedItem.name, action: 'append' })
        } else {
            updateSearchParams({ param: `utm_${label}`, value: selectedItem.name, action: 'delete' })
        }
    }

    let isLoading = () => React.useMemo(() => {
        if(list?.loadingState==='loading') return true
        if(list?.loadingState==='loadingMore') return true
        if(list?.loadingState==='sorting') return true
        if(list?.loadingState==='filtering') return true
        return false; 
    }, [list?.loadingState, selectedKey])

    const handlePersist = () => {
        const newUrchin: NewUrchin = NewUrchinFactory(label, filterValue, list.items?.length || 0)
        list.insert(0, {...newUrchin})

        
        setError(null)
    }

    // const handleRemove = () => list.removeSelectedItems();

    interface ComboBoxItem {
        id: string; 
        name: string; 
    }

    if(isLoading()) return <Text> Loading... </Text>
    if(error) return <Text> Error! </Text> 

    return (
        <ComboBox
            key={key}
            label={label}
            placeholder={`Enter a ${label}`}
            selectedKey={selectedKey}
            onSelectionChange={onSelectionChange}
            items={[...filteredItems]}
            inputValue={filterValue}
            onInputChange={setFilterValue}
            commit={handlePersist}
            disallowEmptySelection
        >
            {(item: ComboBoxItem) => (
                <Item key={item.id}>
                    {item.name}
                </Item>
            )}
        </ComboBox>
    )
}


export const SeoParamsInput = () => {  
    const { user, isSignedOut, isLoading } = useUser({ withAssertions: true })
    
    if(isLoading(user)) return <Text> loading.... </Text>
    if(isSignedOut(user)) return <Text> Not Authenticated </Text>
  
    return (
        <UrchinGroupContainer>
            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { key, category, atom }: UrchinAtom = atomicUrchin
                const [value, setValue] = useAtom(atom)

                return (
                    <UtmParamInput 
                        key={key} 
                        label={category}
                        filterValue={value}
                        setFilterValue={setValue}
                        endpoint={
                                user?.primaryEmailAddress 
                            ?   `/api/urchins/user/${user?.primaryEmailAddress}/${category}` 
                            :   undefined
                        }
                    /> 
                )
            })}
        </UrchinGroupContainer>
    );
}