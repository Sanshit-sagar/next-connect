import React, { useEffect} from 'react'

import { Atom, atom } from 'jotai'
import { atomWithStorage, useUpdateAtom } from 'jotai/utils'

export const darkModeAtom = atomWithStorage('darkMode', false)
export const themeAtom = atomWithStorage('theme', 'theme1-light')
export const isMountedAtom = atom<boolean>(false)

export const activeRouteAtom: Atom<string> = atom('/dash')

export const quantityAtom: Atom<number>  = atom(2)
export const timeAgoAtom: Atom<number> = atom(5)
export const openTimeAgoAtom: Atom<boolean> = atom(false)
export const tickSizeAtom: Atom<number> = atom(3)
export const tickSizeActive: Atom<boolean> = atom(false)

const Home = () => {
    const setIsMounted = useUpdateAtom(isMountedAtom)

    useEffect(() => setIsMounted(true), []);

    return (
        <>
            <h1> Welcome to analytic.ly </h1> 
        </>
    );
}
   
export default Home;

