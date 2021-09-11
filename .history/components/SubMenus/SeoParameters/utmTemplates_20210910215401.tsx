import React from 'react'

import { Box } from '../../../primitives/Box'
import { Flex } from '../../../primitives/Flex'

import { atom } from 'jotai'
import { }


interface UtmResults {
    id: string; 
    urchin: string;
};

let fetchCounter = 0;

const fetchSeoParams = async (updatedEmail: string) => {
  const response = await fetch(`/api/urchins/user/${updatedEmail}`)
  return [
    { id: "debug", title: `Fetched ${++fetchCounter} times` },
    ...(await response.json())
  ]
};


const seoParamsAtom = atom(fetchSeoParams('sanshit.sagar@gmail.com'))
const latestPostsAtom = atom(
    (get) => get(postsAtom),
    async (_get, set) => set(seoParamsAtom, await fetchSeoParams())
);

const SeoParams = () => {

    return (

    );
}