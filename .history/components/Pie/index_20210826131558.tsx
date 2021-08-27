import React, { useState } from "react"

import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { 
    GraphContainer, 
    VisxParentSizeWrapper 
} from '../../primitives/Shared'

import { 
  Toolbar, 
  ToolbarToggleGroup,
  ToolbarToggleItem
} from '../../primitives/Toolbar'

import { useFrequencies } from '../../hooks/useClicks'
import FreqPieChart from './Pie'
import { GraphSkeleton } from '../Skeletons'

const DEFAULT_MARGIN = { top: 50, left: 50, bottom: 50, right: 50 };

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof DEFAULT_MARGIN;
  animate: boolean;
};

interface PieControllerProps {
  filter: string;
  updateFilter: any;
};

const PieController = ({ filter, updateFilter }: PieControllerProps) => {
  let options = [
    { id: 0, value: 'browser', label: 'Browser', width: '45px' },
    { id: 1, value: 'os', label: 'Operating System', width: '100px' },
    { id: 2, value: 'engine', label: 'Engine', width: '45px' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
    { id: 5, value: 'country', label: 'Country', width: '50px' },
    { id: 5, value: 'ip', label: 'IP Address', width: '60px' },
  ]; 

  return (
    <Box css={{ width: '100%' }}> 
      <Toolbar aria-label="Formatting options">
          <ToolbarToggleGroup type="single" aria-label="Text formatting">
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
              {options.map(function(option: any, index: number) {
                return (
                  <ToolbarToggleItem
                    as="button"
                    key={index} 
                    onClick={() => updateFilter(option.value)}
                    value={filter}
                  >
                    <Text 
                        size='1' 
                        css={{ width: option.width }}
                    >
                        {option.label}
                    </Text>
                  </ToolbarToggleItem>
                );
              })}
            </Flex>
          </ToolbarToggleGroup>
        </Toolbar>
    </Box>

  );
}

const PieChart = ({ darkMode }: { darkMode: boolean }) => {
  const [filter, setFilter] = useState('httpProtocol')
  const handleFilterUpdate = (updatedFilter: string) => setFilter(updatedFilter); 

  const { freqs, loading, error } = useFrequencies(filter)

  freqs.map((freq: string, _: number) => {
      
  })

  if(loading) return <GraphSkeleton />
  if(error) return <p> error </p>

  return (
    <GraphContainer>
        <VisxParentSizeWrapper>
            <PieController 
                filter={filter}
                updateFilter={handleFilterUpdate} 
            /> 
            <ParentSize>
              {({ width, height }) => {
                return (
                  <FreqPieChart
                    freqs={freqs}
                    width={width} 
                    height={height} 
                    animate={true}
                    darkMode={darkMode}
                    margin={DEFAULT_MARGIN}
                  />
                );
              }}
            </ParentSize>
        </VisxParentSizeWrapper>
    </GraphContainer>
  );
}

export default PieChart