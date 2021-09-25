import { styled } from '../../../stitches.config'

import React, { useState } from 'react'

import { AsyncListData, useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../../compositions/ComboBox'
import { Item } from '@react-stately/collections' 
import { useFilter } from '@react-aria/i18n'
import { useFocusWithin } from '@react-aria/interactions'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Tooltip } from '../../../primitives/Tooltip'
import { ScrollArea } from '../../../primitives/ScrollArea'

import { useAtom } from 'jotai'
import { humanReadable } from '../../../lib/utils/dateUtils'
import { useMutate } from '../../../hooks/useMutate'

import { useUser } from "@clerk/clerk-react"
import { EyeOpenIcon, StarIcon, TrashIcon } from '@radix-ui/react-icons'

import { 
    UrchinAtom, 
    SavedUrchin,
    IUrchinListProps,
    UrchinCategoryType,
    UrchinCategoryEnum
} from './interfaces'

import {
    seoTermAtom,
    seoSourceAtom,
    seoMediumAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'

const UrchinGroupContainer = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch',
    gap: '$1'
})

const UrchinInfoContainer = styled(Flex, {
    width: '100%', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$2'
})

const UrchinHeader = styled(Text, {
    fontSize: '$3',
    color: '$text', 
    textDecoration: 'underline', 
    textDecorationColor: '$text'
}) 

const UrchinStatistic = styled(Flex, {
    color: '$funkyText', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center',
    gap: '$1'
})

const UrchinStatisticsRow = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1'
});

const UrchinTimeAgo = styled(Text, {
    width: '100%',
    margin: 0,
    padding: 0, 
    display: 'inline-flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-end'
});

const urchinAtoms: UrchinAtom[] = [
    { key: '1', category: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { key: '2', category: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { key: '3', category: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { key: '4', category: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { key: '5', category: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

const getKeyForUrchin= (item: SavedUrchin): React.Key => {
    return item?.id ? `item-${parseInt(item?.id)}` : `item-${new Date().getTime()}`
}


type NewUrchinProps = Omit<SavedUrchin, 'key'>;

function NewUrchinFactory(label: UrchinCategoryType, initValue: string, listIndex: number): NewUrchinProps {
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

    let [selectedKey, setSelectedKey] = useState<Key>('a')
    let [error, setError] = useState<any | undefined>()
    let [response, setResponse] = useState<any | undefined>()
    let [isFocusWithin, setFocusWithin] = useState(false);
  
    let list: AsyncListData<SavedUrchin> = useAsyncList({ async load({ signal, cursor }) {
            let categoryEndpoint = `${endpoint}`
            let res = await fetch(cursor || categoryEndpoint, { signal })
            let json = await res.json()
            return { items: json.results, cursor: json.next }
        }, 
        getKey: (item: SavedUrchin) => getKeyForUrchin(item)
    });

    let { service, mutate } = useMutate()
    let { contains } = useFilter({ sensitivity: 'base' }); 

    let { focusWithinProps } = useFocusWithin({
        onFocusWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(true),
        onBlurWithin: (_event: React.FocusEvent<Element>) => setFocusWithin(false),
        onFocusWithinChange: (isFocusWithin: boolean) => setFocusWithin(isFocusWithin)
    });

    const isLoadingStateLoading = (ls: string) => ls==='loading' || ls==='loadingMore' || ls==='filtering' || ls==='sorting'
    const isServiceStateLoading = (s: string) => s==='loading' || s==='init' 
    const isLoading = (): boolean => {
        let ariaLoading = isLoadingStateLoading(list.loadingState)
        let promiseLoading = isServiceStateLoading(service.status) 
        return ariaLoading || promiseLoading
    }

    let filteredItems: SavedUrchin[] = React.useMemo(() => {
        return list.items.filter((item: SavedUrchin) => {
            return contains(item.name, filterValue) || null
        })
    }, [list, filterValue]);
  
    let onSelectionChange = (key: string) => {
        let selectedItem: SavedUrchin = list.items.find((item: SavedUrchin) => item.id===key)
        setSelectedKey(key)
        setFilterValue(selectedItem?.name ?? '')
        
    }

    const handlePersist = () => {
        const newItem: NewUrchinProps = NewUrchinFactory(label, filterValue, list.items?.length || 0)
        const newItemKey: Key = String(`${list?.items.length || Math.random}`)
        const newUrchin: SavedUrchin = { key: React.Key(newItemKey, ...newItem }; 

        list.insert(0, { 
            key: list.getKey(newItem),
            ...newItem 
        })
        setError(null!)
        setResponse(null!)

        // mutate(label, filterValue, newItem).then((response: any) => {
        //     setResponse(response)
        // }).catch((error: Error) => {
        //     setError(error)
        // })
    }

    const handleRemove = () => {
        list.removeSelectedItems() 
    }

    if(error || response?.error) return <Text> Error! </Text>
    
    return (
        <ComboBox
            key={key}
            label={label}
            placeholder={`Enter a ${label}`}
            selectedKey={selectedKey}
            onSelectionChange={onSelectionChange}
            items={filteredItems}
            inputValue={filterValue}
            onInputChange={setFilterValue}
            commit={handlePersist}
            allowsCustomValue={true}
            {...focusWithinProps}
        >
            {(item: SavedUrchin) => (
                <Item key={item.id}>
                    <UrchinInfoContainer>
                        <UrchinHeader> {item.name} </UrchinHeader>

                        <UrchinStatisticsRow> 
                            <UrchinStatistic>
                                <StarIcon />  {Math.round(item.frequency * 100)/10} 
                            </UrchinStatistic>
                            <UrchinStatistic>  
                                <EyeOpenIcon /> {Math.round(item.frequency * 100)/10} 
                            </UrchinStatistic>
                        </UrchinStatisticsRow> 

                        <UrchinTimeAgo> 
                            {humanReadable(item.updatedAt)} 

                            <Tooltip content={`Delete ${item.name}?`}>
                                <button style={{ padding: 0, margin: 0, backgroundColor: 'transparent', border: 'none'}}>
                                    <Text css={{ color: 'red', '&:hover': { color: 'magenta' } }}>
                                        <TrashIcon aria-hidden="true" /> 
                                    </Text>
                                </button> 
                            </Tooltip>
                        </UrchinTimeAgo>
                    </UrchinInfoContainer>
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
                let [value, setValue] = useAtom(atom)

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