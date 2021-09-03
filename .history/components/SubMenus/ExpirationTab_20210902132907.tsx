import React from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const getMillisInXMins = (x: number): number => 1000*60*x;  
const getTMinus1Min = new Date().getTime() - getMillisInXMins(1)
const getTPlus1Min = new Date().getTime() + getMillisInXMins(1)
const getDateAtTminus1min: Date = new Date(getTMinus1Min)
const getDateAtTplus1min: Date = new Date(getTPlus1Min)

export const newSlugTimeframeStartAtom = atom<Date>(getDateAtTminus1min)
export const newSlugTimeframeEndAtom = atom<Date>(getDateAtTplus1min)
export const newSlugTimeframeStartInMsAtom = atom<number>((get) => get(newSlugTimeframeStartAtom).getTime())
export const newSlugTimeframeEndInMsAtom = atom<number>((get) => get(newSlugTimeframeEndAtom).getTime())
export const newSlugTimeRange = atom<number>((get) =>get(newSlugTimeframeEndInMsAtom) - get(newSlugTimeframeStartInMsAtom))

const WritableExpirationTab = () => {
    const setTimeframeStart = useUpdateAtom(newSlugTimeframeStartAtom)
    const setTimeframeEnd = useUpdateAtom(newSlugTimeframeEndAtom)

    const handleStartUpdate = (updatedStart: Date) => setTimeframeStart(updatedStart)
    const handleEndUpdate = (updatedEnd: Date) => setTimeframeEnd(updatedEnd)

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center', gap: '$1' }}> 
            <TimeframeStartInput 
                updateStart={handleStartUpdatee} 
            />
             <TimeframeEndInput 
                updateEnd={handleEndUpdate} 
            />
        </Flex>
    )
}

const TimeframeStartInput = () => {

    return (
        <DayPickerInput
           value={from}
           placeholder="From"
           format="LL"
           formatDate={formatDate}
           parseDate={parseDate}
           dayPickerProps={{
             selectedDays: [from, { from, to }],
             disabledDays: { after: to },
             toMonth: to,
             modifiers,
             numberOfMonths: 2,
             onDayClick: () => this.to.getInput().focus(),
           }}
           onDayChange={this.handleFromChange}
         />
    )
}

const ExpirationTabContent = () => {
   
   


   
   
   
   
   
   
   
}


export default ExpirationTabContent