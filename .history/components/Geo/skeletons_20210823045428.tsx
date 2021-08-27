import React from 'react'

interface SkeletonProps {
   height: number;
   width: number;
}
const MercatorSkeleton:React.FC = () => {
   return (
       <DashboardDisplayBox>
           <VisxParentSizeWrapper>
               <ParentSize>
                   {({ width, height }) 
                           return (
                               <Flex css={{ fd: 'row', jc: 'center', ai: 'center'}}>
                                   <Loading />;
                               </Flex>
                           );
                       }      
               </ParentSize>
           </VisxParentSizeWrapper>
       </DashboardDisplayBox>
   )
}

export default MercatorSkeleton