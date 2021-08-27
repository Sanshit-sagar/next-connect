import React from 'react';

import { StyledAppContainer } from '../primitives/Shared'
import GraphManager from '../components/GraphManager' 

import { StyledAppContainer } from '../primitives/Shared';
import ParentSize from '@visx/responsive/lib/components/ParentSize'

const Home = () => {

  return (
        <StyledAppContainer>
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;