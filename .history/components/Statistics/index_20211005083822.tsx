import React, { useEffect } from "react"
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
import { useMap , MapOrEntries } from '../../hooks/useMap'

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
    next: () => void; 
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
    mb: '$2'
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
    height: 65,
    bc: '$loContrast',
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1',
    border: '1px solid $border',
    br: '$1',
    margin: '$1', 
    mr: '$3',
    '&:hover': { 
        bc: '$border3',
    },
    pr: '$2'
});

const StatCategoryLeader = styled(Flex, {
   width: '100%', 
   fd: 'row', 
   jc: 'flex-start', 
   ai: 'stretch', 
   gap: '$2',
})

const CategoryTextLabel = styled(Text, {
    height: '100%',
    color: '$funky', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start',
    mb: '$2'
})


const statIcons = [
    <CursorArrowIcon key={'1'} />,
    <TargetIcon  key={'2'} />,
    <EyeOpenIcon key={'3'} />,
    <LoopIcon key={'4'}  />
];


const CategoryText = ({ name, icon }: { icon: React.ReactNode; name: string; }) => (
    <CategoryTextLabel> 
        <Flex > {icon} </Flex>
        <Flex css={{ ml: '$2' }}> {name} </Flex>
    </CategoryTextLabel>
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

const NumberOne = ({ leader, next }: { leader: string; next: () => void; }) => {
    return (
        <Text as='button' onClick={() => next()} size='1' css={{ color: '$accent', fontWeight: '500' }}>
            {leader}
        </Text>
    );
}


const AnimatedStat = ({ index, name, value, leader = '', next }: IStats) => (
    <>
        <Container>
            <Category index={index} name={name} /> 
            <NumberOne leader={leader} next={next} />
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
                            next={() => console.log('nexting for overview stats')}
                        />
                    </Statistic>
                )
            })}
        </Container> 
    )
}

const initialValues: MapOrEntries<string, number> = [
    ['ip', 0],
    ['country', 0],
    ['engine', 0],
    ['browser', 0],
    ['os', 0],
    ['uniques', 0],
    ['views', 0],
    ['tlsVersion', 0],
    ['slug', 0],
];

export const CachedStatistics = () => {
    
    // const [map, positions] = useMap<string, number>([
    //     ['ip', 0],
    //     ['country', 0],
    //     ['engine', 0],
    //     ['browser', 0],
    //     ['os', 0],
    //     ['uniques', 0],
    //     ['views', 0],
    //     ['tlsVersion', 0],
    //     ['slug', 0],
    // ]);
    
    // const has = (category: string): boolean => map.entries(([key, value]) => key===category)


    // const get = (category: string): number | null => map.entries(([key, value]) => {
    //     return key===category ? value : null
    // })[0];
    
    // const set = (category: string, value: number): void => set(String(category), Number(value))
    // const increment = (category: string): void => set(String(category), has(category) ? get(category) + 1 : 1)
    // const reset = (): void => positions.reset()


    const { statistics, statsLoading, statsError } = useUserStatistics()
    

    const { freqs, loading, error }: {
        freqs: { [key: string]: INormalizedFreqProps[] };
        loading: boolean;
        error: Error | any | null; 
    } = useFrequencies()



    useEffect(() => {
        if(loading || error || !freqs?.length) return; 

        Object.entries(freqs).map((keyVal, i) => {
            set(keyVal[0], 0); 
        })
    }, [freqs, loading, error])

    if(statsLoading || loading) return <Text> loading... </Text>
    if(error || statsError) return <Text> error... </Text>

    return (
        <Container>
            {freqs && Object.entries(freqs).map((keyVal, index) =>  {
                
                let category = keyVal[0]
               
                let leader: { 
                    score: number; 
                    title: string; 
                    rank: number; 
                    normalizedFreq: number;  
                } = freqs[category][get(category)]

        
                return (
                    <Statistic key={`statistic-for-${index}`}>
                        <AnimatedStat 
                            index={index} 
                            name={`${category}`} 
                            value={parseInt(`${leader.score}`)}
                            leader={`${leader.title}`}
                            // next={() => increment(category)}
                        />
                    </Statistic>    
                )
            })}
        </Container> 
    );
}


{/* <Button onClick={() => setEntriesIndex((entriesIndex + 1) % Object.entries(freqs).length)}>
    next 
</Button> */}
// Statistic
   // return (
                    //     
                    // )