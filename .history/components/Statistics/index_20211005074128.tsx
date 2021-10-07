import React from "react"
import { styled } from '../../stitches.config'

import { a, useSpring } from '@react-spring/web'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { StatisticsSkeleton } from './Skeleton'

import { 
    useUserStatistics,
    useUserSummary,
    useFrequencies
} from '../../hooks/useClicks'
import { useGloballyConsistentColors } from '../../hooks/useColors' 

import { 
    CursorArrowIcon, 
    TargetIcon,
    EyeOpenIcon,
    LoopIcon
} from '@radix-ui/react-icons'

interface IStats {
    index: number; 
    name: string; 
    value: number;
    leader?: string;
}

interface ISpringNumber {
    result: number;
}

interface INormalizedFreqProps { 
    title: string; 
    score: number; 
    rank: number; 
    normalizedFreq: number; 
}

interface NormalizedStat {
    key: string; 
    val: INormalizedFreqProps;
}

const Container = styled(Flex, {
    width: '300px', 
    margin: '$1',
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1', 
})

const Column = styled('div', {
    width: '100%', 
    display: 'flex', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1', 
    mb: '$2'
})

const Statistic = styled('div', {
    height: '75px',
    bc: '$neutral',
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1',
    border: '1px solid $border',
    br: '$1',
    margin: '$1', 
    mr: '$3',
    padding: '$1', 
    '&:hover': { 
        bc: '$border3',
    }
});

const StatCategoryLeader = styled(Flex, {
   width: '100%', 
   fd: 'row', 
   jc: 'flex-start', 
   ai: 'stretch', 
   gap: '$2',
})

const CategoryTextLabel = styled(Text, {
    color: '$funky', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start'
})


const statIcons = [
    <CursorArrowIcon key={'1'} />,
    <TargetIcon  key={'2'} />,
    <EyeOpenIcon key={'3'} />,
    <LoopIcon key={'4'}  />
];


const CategoryText = ({ name, icon }: { icon: React.ReactNode; name: string; }) => (
    <CategoryTextLabel> {icon} {name} </CategoryTextLabel>
)

const Category = ({ name, index }: { name: string; index: number; }) => {
    return (
        <StatCategoryLeader>
            <CategoryText
                icon={statIcons[index]}
                name={name.toUpperCase()} 
            />
        </StatCategoryLeader>
    )
}

const NumberOne = ({ leader }: { leader: string }) => {
    return (
        <Text as='span' size='1' css={{ color: '$accent', fontWeight: '500' }}>
            {leader}
        </Text>
    );
}


const AnimatedStat = ({ index, name, value, leader = '' }: IStats) => (
    <>
        <Container>
            <Category index={index} name={name} /> 
            <NumberOne leader={leader} />
        </Container>
        <AnimatedNumerical result={parseInt(`${value}`)} />
    </>
);


const AnimatedNumerical = ({ result }: ISpringNumber) => {
    const colors = useGloballyConsistentColors()
    const props = useSpring({ from: { result: 0 }, result, reset: true })

    if(!result || result===undefined) return <a.h1> 0 </a.h1>

    return (
        <a.h1 
            style={{ 
                color: colors.accent, 
                fontWeight: 'bold'
            }}
        >
            {props.result.to(Math.round)}
        </a.h1>
    );
}

export const StatisticsOverview = () => {
    const { statistics, statsLoading, statsError } = useUserStatistics()
    const { summary, smLoading, smError } = useUserSummary()

    if(statsLoading ||smLoading) return <StatisticsSkeleton />
    if(statsError || smError) return <Text as='span'> error... </Text>

    let start = summary.start;
    let end = summary.end;
    let duration = summary.numDays

    return (
        <Container>
            {statistics.map((stat: any, i: number) => {
                return (
                    <Statistic key={`statistic-${i}`}>  
                        <AnimatedStat 
                            index={i} 
                            name={stat.name} 
                            value={i<2 ? stat.result : stat.result[1]} 
                            leader={
                                    i < 2
                                ?   i===0 
                                ?   `${start.split(' ')[0]} to ${end.split(' ')[0]} [${Math.round(duration)} Days]` 
                                :   ''
                                : stat.result[0]
                            }
                        />
                    </Statistic>
                )
            })}
        </Container> 
    )
}

export const CachedStatistics = () => {
    const { statistics, statsLoading, statsError } = useUserStatistics()

    const { freqs, loading, error }: {
        freqs: { [key: string]: INormalizedFreqProps[][] };
        loading; boolean;
        error: Error | any | null; 
    } = useFrequencies()

    if(statsLoading || loading) return <Text> loading... </Text>
    if(error || statsError) return <Text> error... </Text>

    return (
        <Container>
            {freqs && Object.entries(freqs).map((keyVal) =>  {
                   
                    let category = keyVal[0]
                    // [key: string, value: : INormalizedFreqProps[][]]

                    return <Text> {JSON.stringify(freqs[category][0])} </Text> 
            })}
        </Container> 
    );
}


{/* <Button onClick={() => setEntriesIndex((entriesIndex + 1) % Object.entries(freqs).length)}>
    next 
</Button> */}
// Statistic
   // return (
                    //     <Statistic key={`statistic-for-${i}`}>
                    //         <AnimatedStat 
                    //             index={j} 
                    //             name={`Most Used ${key}`} 
                    //             value={parseInt(`${leader.score}`)}
                    //             leader={`${leader.title}`}
                    //         />
                    //     </Statistic>    
                    // )