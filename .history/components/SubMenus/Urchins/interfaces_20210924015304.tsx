import { SetStateAction } from 'react'
import { WritableAtom } from 'jotai'
import {
    SavedUrchin,
    UrchinCategoryType
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