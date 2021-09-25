import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import {
    UrchinCategoryEnum,
    AsyncDataPair, 
    SavedUrchin, 
    UrchinAtom, 
    IUrchin,
    IUrchinListProps,
    UrchinCategoryType,
}
export interface UrchinAtom  { 
    key: Key; 
    category: UrchinCategoryType; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

export interface AsyncDataPair {
    items: SavedUrchin[]; 
    cursor: string | null; 
}