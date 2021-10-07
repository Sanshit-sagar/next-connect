import React from 'react'
import { atom } from 'jotai'

import { Text } from '../../primitives/Text'
import SelectMenu from '../../compositions/SelectMenu'
import { MenuBar, Container, ParentSizeWrapper } from './styled'

import { AreaDifference } from './AreaDifference'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { useSlugsWithViews } from './hooks'
import { ParentSizeProps } from './interfaces'

// const globalFiltersStrAtom = atom<string>(
//     (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
// ); 

// const slug1ValueAtom = atom('')
// const slugs: string[] = []

// const slug1Atom = atom(
//     (get) => get(slug1ValueAtom),
//     (_get, set, update: number) => set(slug1ValueAtom, slugs[update]),
// ); 

// interface SwrResponse<T> {
//     data: T;
//     loading: boolean;
//     error: Error | any | null;
// }
interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

function SelectPropsFactory(keys: string[]): IItem[] {
    return keys.map((key: string, i: number) => {
        return {
            id: `${i}`,
            value: key,
            textValue: `${key}`,
            icon: undefined,
            alt: undefined,
        }
    });
}

const SlugSelector = (seenUserSlugs: string[]) => {
    const [slugIndex, setSlugIndex] = React.useState('')
    const handleIndexUpdate = () => {
        setSlugIndex(slugIndex + 1)
    }
   
    let slugItems: IItem[] = SelectPropsFactory(seenUserSlugs?.length ? seenUserSlugs : ['']) 

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={parseInt(slugIndex)}
            setSelectedIndex={handleIndexUpdate}
            selectedTextValue={`${slugItems[parseInt(slugIndex)].textValue}`}
            selectedValue={`${slugItems[parseInt(slugIndex)].value}`}
        /> 
    )
}


export const Threshold = () => {
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let seenUserSlugs: string[] = !loading && !error && data ? Object.keys(data) : []
       
    return (
        <Container>        
            <MenuBar> 
                <SlugSelector seenUserSlugs={seenUserSlugs} slugId={'slug1/> 
                <Text> /anotha-one </Text>
            </MenuBar>
       
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
