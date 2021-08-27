import React from 'react';
import { useAtom, atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))

const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

import SelectMenu from './Select'

interface NumberInputProps {
    inputAtom: any;
    inputNumberAtom: any; 
}

const NumberInput = ({ inputAtom, inputNumberAtom }: NumberInputProps) => {
    const [input, setInput] = useAtom(inputAtom); 
    const [inputNumber] = useAtom(inputNumberAtom);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(event.currentTarget.value); 
    }

    return (
        <>
            <label> Amount: {`${inputNumber}`} </label>
            <input 
                id='amount'
                type='number'
                value={input || ''}
                onChange={handleInputChange}
            />
        </>
    )
} 

const Timeseries:React.FC = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
           
                <NumberInput 
                    inputAtom={amountAtom}
                    inputNumberAtom={amountNumberAtom}
                />
                <SelectMenu 
                    menuName={'Interval'} 
                    openAtom={selectOpenAtom} 
                    selectedIndexAtom={intervalAtom} 
                    selectedStrAtom={intervalStrAtom} 
                    selectionOptions={intervalOptions}
                />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries