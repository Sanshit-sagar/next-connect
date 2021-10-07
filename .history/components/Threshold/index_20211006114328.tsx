import React, { useState } from 'react'

import { atom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { amountAtom, rangeAtom, intervalAtom } from '../../atoms/timeseries'

import { useSlugsWithViews } from './hooks'
import { Text } from '../../primitives/Text'
import { ParentSizeProps } from './interfaces'
import { AreaDifference } from './AreaDifference'
import SelectMenu from '../../compositions/SelectMenu'
import { MenuBar, Container, ParentSizeWrapper } from './styled'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

interface SlugState { 
    slug: string, 
    value: string | undefined; 
}

interface StoredSlugState {
    selectedValue: string | undefined; 
    isSelected: boolean; 
    isLoading: boolean; 
}

interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

const INIT_SELECTION_STATE = { 
    'slug1': { 
        isSelected: false,
        selectedValue: undefined,
        loading: false,
    },
    'slug2': {
        isSelected: false,
        selectedValue: undefined,
        loading: false,
    }
};

const slugSelectionAtom = atom(INIT_SELECTION_STATE)
const slugFetchEndpointsAtom = atom((get))
const makeSelectionAtom = atom(
    null,
    (get, set, update: SlugState) => {
        set(slugSelectionAtom, {
            ...get(slugSelectionAtom),
            [`${update.slug}`]: {
                selectedValue: update.value,
                isSelected: update.value && update.slug ? true : false,
                isLoading:  update.value && update.slug ? true : false,
                isFetching: false,
            }
        });
    }
);



const globalFilterStrAtom = atom(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
);
const filteredSlugClicksUrlsAtom = atom(
    (get) => {
        
        let urlsForFetching: string[] = get(slugSelectionAtom).map((slugState: StoredSlugState) => { 
            if(slugState.isSelected && slugState.isLoading) {
                return `/api/metrics/slug/${slugState.selectedValue}/tail/${get(globalFilterStrAtom)}`
            } else {
                return ''
            }
        }); 
); 



const isIndexInRange = (index: number, itemsInRange: any[]) => index >= 0 && index <itemsInRange?.length;

function SelectPropsFactory(keys: string[]): IItem[] {
    return keys.map((key: string, i: number) => {
        return {
            id: `${i}`,
            value: key,
            textValue: `${key}`,
            icon: undefined,
            alt: undefined,
        }
    })
}

const SlugSelector = ({ 
    slugId, 
    seenUserSlugs 
}: { 
    slugId: string; 
    seenUserSlugs: string[]; 
}) => {

    const [selectedIndex, setSelectedIndex] = useState(slugId)
    const selectSlug = useUpdateAtom(makeSelectionAtom)

    const handleIndexUpdate = (updatedIndex: number) => {
        setSelectedIndex(`${updatedIndex}`)   
        selectSlug({ 
            slug: slugId, 
            value: isIndexInRange(updatedIndex, slugItems) ? slugItems[updatedIndex].textValue : undefined 
        });
    }

    let slugItems: IItem[] = SelectPropsFactory(seenUserSlugs?.length ? seenUserSlugs : ['']) 

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={parseInt(selectedIndex)}
            setSelectedIndex={handleIndexUpdate}
            selectedTextValue={`${slugItems[parseInt(selectedIndex)]?.textValue ?? slugItems[0].textValue}`}
            selectedValue={`${slugItems[parseInt(selectedIndex)]?.value ?? slugItems[0].value}`}
        /> 
    )
}

const SelectionMenu = ({ seenUserSlugs }: { seenUserSlugs: string[]; }) => (
    <MenuBar> 
        <SlugSelector 
            slugId={'slug1'}
            seenUserSlugs={seenUserSlugs} 
        />
        <SlugSelector 
            slugId={'slug2'}
            seenUserSlugs={seenUserSlugs} 
        />
    </MenuBar>
)


export const Threshold = () => {
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let seenUserSlugs: string[] = !loading && !error && data ? Object.keys(data) : []

    
       
    return (
        <Container>        
            <SelectionMenu 
                seenUserSlugs={seenUserSlugs} 
            /> 
       
            <ParentSizeWrapper>
                <ParentSize>
                    {({ height, width }: ParentSizeProps) => (
                        <AreaDifference 
                            slugs={seenUserSlugs}
                            height={height} 
                            width={width} 
                        />
                    )}
                </ParentSize>
            </ParentSizeWrapper>
        </Container>
    );
}

// /api/users/sanshit.sagar@gmail.com/rankings/uniques
