import React from 'react';
import { useAtom, atom } from 'jotai'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { GraphSkeleton } from '../Skeletons/index'
import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared' 

import { useClickHistoryForUser } from '../../hooks/useClicks'

const amountAtom: Atom<number> = atom(1)
const amountStrAtom: Atom<string> = ((get) => `${get(amount)}`)
const rangeAtom: Atom<string> = atom('week')
const intervalAtom: Atom<string> = atom('day')

const AmountInput:React.FC<> = () => {
    const [amount, setAmount] = useAtom(amountAtom); 
    const [amountStr] = useAtom(amountStrAtom);

    const handleInputChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {
        setAmount(event.currentTarget.value); 
    }

    return (
        <>
            <label> Amount: {amountStr} </label>
            <input 
                id='amount'
                type='number'
                value={amount}
                onChange={handleInputChange}
            />
        </>
    )
}

const Timeseries:React.FC<> = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
           
           
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries