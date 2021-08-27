import React from 'react';

import { Box } from '../primitives/Box'
// import { Flex } from '../primitives/Flex'
// import { Text } from '../primitives/Text'
// import PieChart from '../components/Pie'
// import Wrapper from '../components/Wrapper'
// import UniqueBars from '../components/Bars'
import Curve from '../components/Curve'
// import HeatedGeo from '../components/Geo'
// import GraphSkeleton from '../components/Geo/skeletons'

import GraphManager from '../components/GraphManager' 
import { DashboardDisplayBox } from '../primitives/Shared';

const Home = () => {

  return (
        <Box css={{ height: '100%'}}>
            <DashboardDisplayBox>
                <VisxParentSizeWrapper>
                    <ParentSize>
                        ({})
                    </ParentSize>
                </VisxParentSizeWrapper>
            </DashboardDisplayBox>
            <Curve /> 
        </Box>
    );
}

export default Home

