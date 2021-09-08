import React, { useState } from 'react'

import {
    Collapsible,
    CollapsibleTrigger as Trigger,
    CollapsibleContent as Content,
    CollapsibleExpandedPanel as Panel,
    CollapsibleTogglerWithIcon as Toggler,
    CollapsiblePanelText as PanelText,
    CollapsibleText as Text,
} from '../../primitives/Collapsible'
import { Flex }

// import { atom, useAtom } from 'jotai'
// import { useUpdateAtom, useAtomValue } from 'jotai/utils'

// const openUrchins = { 
    // 'medium': false; 
    // 'source': false; 
    // 'term': false; 
    // 'content': false; 
    // 'campaign': false;
// }

export const MatchedUrchins = () => {
    const [open, setOpen] = useState(false)    

    const handleOpenChange = () => setOpen(!open)

    return (
        <Collapsible open={open} onOpenChange={handleOpenChange}>
            
            <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Text> found xx matches for $slug </Text>
                <Trigger asChild> 
                    <Toggler open={open} />
                </Trigger>
            </Flex>

            <Panel> /result1 </Panel>

            <Content>
                <Panel>
                    <PanelText> /result2 </PanelText>
                </Panel>
                <Panel>
                    <PanelText> /result3 </PanelText>
                </Panel>
            </Content>
        </Collapsible> 
    )
}
