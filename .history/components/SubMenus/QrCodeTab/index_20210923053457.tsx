import { useState, useEffect } from 'react'
import { useAsyncList } from '@react-stately/data'
import { Item } from '@react-stately/collections' 

import { ComboBox } from '../../../compositions/ComboBox'
import { Text } from '../../../primitives/Text'

import { useClerk } from "@clerk/clerk-react";

import {
    seoSourceAtom,
    seoMediumAtom,
    seoTermAtom,
    seoContentAtom,
    seoCampaignAtom
} from '../../../atoms/urchins'
import { Flex } from '../../../primitives/Flex'
import { MenuTriggerActionEnum } from '../../../compositions/interfaces'
import { WritableAtom, useAtom } from 'jotai'

const useUserSession = () => {
    const { user: activeUser } = useClerk()

    const { 
        firstName, 
        lastName, 
        primaryEmailAddress
    } = activeUser 

    return { firstName, lastName, primaryEmailAddress }
}

interface UrchinAtom  { 
    id: string; 
    name: string; 
    atom: WritableAtom<string, React.SetStateAction<string>> 
}

enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    SOURCE = 'source',
    TERM = 'term',
    CAMPAIGN = 'campaign',
    CONTENT = 'content'
}

enum IdEnum { 
    ONE = '1',
    ID_TWO = '2',
    ID_THREE = '3',
    ID_FOUR = '4',
    ID_FIVE = '5',
};

type UrchinIdType = 
    | UrchinIdEnum.ID_ONE 
    | UrchinIdEnum.ID_TWO
    | UrchinIdEnum.ID_THREE
    | UrchinIdEnum.ID_FOUR
    | UrchinIdEnum.ID_FIVE 

type UrchinCategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT


interface IUrchin {
    id: string; 
    name: UrchinCategoryType; 
    frequency: number; 
    updatedAt: Date;
}

const urchinAtoms: UrchinAtom[] = [
    { id: IdEnum.., name: UrchinCategoryEnum.MEDIUM, atom: seoMediumAtom },
    { id: '1', name: UrchinCategoryEnum.TERM, atom: seoTermAtom },
    { id: '2', name: UrchinCategoryEnum.SOURCE, atom: seoSourceAtom },
    { id: '3', name: UrchinCategoryEnum.CAMPAIGN, atom: seoCampaignAtom },
    { id: '4', name: UrchinCategoryEnum.CONTENT, atom: seoContentAtom }
]

interface IUrchinListProps { 
    key: string; 
    label: UrchinCategoryType; 
    value: string; 
    setValue: (v: string) => void; 
    url: string; 
}

enum ServiceStateEnum {
    INIT ='init',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}

interface ServiceInit { status: ServiceStateEnum.INIT; }
interface ServiceLoading { status: ServiceStateEnum.LOADING; }
interface ServiceLoaded<T> {
    status: ServiceStateEnum.LOADED;
    payload: T;
}
interface ServiceError {
    status: ServiceStateEnum.ERROR;
    error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null; 
    result: IUrchin[];
}

export const UrchinLists = ({ key, label, value, setValue, url }: IUrchinListProps) => {
    const { primaryEmailAddress } = useUserSession()
    const [serviceState, setServiceState] = useState<Service<ApiResponse>>({
        status: ServiceStateEnum.INIT
    })
    
    let list = useAsyncList({ async load({signal, cursor}) {
            let endpoint = `${url}/${label}`
            let res = await fetch(cursor || endpoint, { signal })
            let json = await res.json()

            return { 
                items:  !json?.results ? [] : json.results,
                cursor: !json?.next ? null : json.next
            }
        }
    })


    const addUrchinToUserCollection = (key: UrchinCategoryType, value: string) => {
        setServiceState({ status: ServiceStateEnum.LOADING })

        let postHeaders =  new Headers()
        postHeaders.append('Content-Type', 'application/json; charset=utf-8')
    
        return new Promise((resolve, reject) => {
            fetch(`/api/urchins/user/${primaryEmailAddress}/${key}`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({
                    "utmKey": key,
                    "utmValue": value,
                })
            })
            .then((response) => response.json())
            .then((result) => {
                setServiceState({ 
                    status: ServiceStateEnum.LOADED, 
                    payload: result 
                })
                resolve(result)
            })
            .catch((error) => {
                setServiceState({ 
                    status: ServiceStateEnum.ERROR,
                    error 
                });
                reject(error)
            });
        })
    }

    const handlePersist = () => {
        
        if(!list.items?.length) {
            list.append({ 
                id: `${0}`, 
                name: value, 
                frequency: 1, 
                updatedAt: new Date()
            })
        }
        addUrchinToUserCollection(label, value)
    }

    return (
        <ComboBox
            key={key}
            label={label}
            items={list?.items ?? []}
            inputValue={value}
            onInputChange={(updatedInput: string) => {
                list.setFilterText(updatedInput)
                setValue(updatedInput)
            }}
            loadingState={list?.loadingState ?? false}
            onLoadMore={list.loadMore}
            commit={extendedSave}
            allowsCustomValues={true}
            menuTriggerAction={MenuTriggerActionEnum.MANUAL}
        >
            {(item: IUrchin) => (
               <Item key={item.id}>
                    <Text size='1'> 
                        {item?.name ?? ''} 
                    </Text>
                </Item>
            )}
        </ComboBox>
    )
}

export const AsyncListTest = () => {  
    let [url, setUrl] = useState<string | undefined>(undefined)

    const { primaryEmailAddress } = useUserSession()
    
    useEffect(() => {
        setUrl(primaryEmailAddress?.length ? `/api/urchins/user/${primaryEmailAddress}` : undefined)
    ), [primaryEmailAddress])

    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>

            {urchinAtoms.map((atomicUrchin: UrchinAtom) => {
                let { id, name, atom }: UrchinAtom = atomicUrchin
                let [value, setValue] = useAtom(atom)

                return (
                    <UrchinLists 
                        key={id} 
                        label={name}
                        value={value}
                        setValue={setValue}
                        url={`${url}/${name}`}
                    /> 
                )
            })}
        </Flex>
    )
}