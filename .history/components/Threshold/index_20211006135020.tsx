import React, { useState } from 'react'

import { atom, WritableAtom } from 'jotai'
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
    id: string; 
    selectedValue: string | undefined; 
    isSelected: boolean; 
    isLoading: boolean; 
    endpoint: string;
}

interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

const INIT_SELECTION_STATE: StoredSlugState[] = [{ 
    id: 'slug1',
    isSelected: false,
    selectedValue: undefined,
    isLoading: false,
    endpoint: ''
}, {
    id: 'slug2',
    isSelected: false,
    selectedValue: undefined,
    isLoading: false,
    endpoint: ''
}];

const globalFilterStrAtom = atom(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
);

// init selections to not loading, not selected 
const slugSelectionAtom = atom(INIT_SELECTION_STATE) 

 //init fetchEndpoints to empty string for each selection
const slugFetchEndpointsAtom: WritableAtom<string[], string[]> = atom(
    (get) => Object.keys(get(slugSelectionAtom)).map((_slug: string) => ''),
    (get, set, update: string[]) => {
        set(slugSelectionAtom, get(slugSelectionAtom).map((entry: StoredSlugState, index: number) => {
            return {
                ...entry,
                isLoading: false,
                endpoint: !entry.isSelected || !update[index]?.length ? '' : update[index],
            };
        }));
    }
)

// on an updated selection, if an item is unselected -> revert to original settings
// if a selection is made, update selection values, and mark the state as loading -> awaiting clicks
const makeSelectionAtom = atom(
    null,
    (get, set, update: StoredSlugState) => {
        set(slugSelectionAtom, get(slugSelectionAtom).map((slugState: StoredSlugState, _index: number) => {
            return {
                slug: slugState.slug,
                selectedValue: slugState.slug !== update.slug ? slugState.value : update.value,
                isSelected: slugState.slug !== update.slug ? slugState.isSelected : update.isSelected,
                isLoading:  slugState.slug !== update.slug ? slugState.isLoading : update.value && update.slug ,
                isFetching: false
            }
        }));
    }
    // todo revert fetch endpoint here as well
);

const filteredSlugClicksUrlsAtom = atom(
    (get) => get(slugFetchEndpointsAtom),
    (get, set, update) => {
        return set(slugFetchEndpointsAtom, Object.values(get(slugSelectionAtom)).map((slugState: StoredSlugState) => {
            return slugState.isSelected && slugState.isLoading
                ? `/api/metrics/slug/${slugState.selectedValue}/tail/${get(globalFilterStrAtom)}`
                : ``
        }));
    }
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

const SlugEndpoints = () => {
    const slugFetchEndpoints = useAtomValue(slugFetchEndpointsAtom)

    return <Text>{JSON.stringify(slugFetchEndpoints)} </Text> 
}

const SelectionMenu = ({ seenUserSlugs }: { seenUserSlugs: string[]; }) => (
    <MenuBar> 
        <SlugSelector 
            slugId={'slug1'}
            seenUserSlugs={seenUserSlugs} 
        />
        <SlugEndpoints />

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
