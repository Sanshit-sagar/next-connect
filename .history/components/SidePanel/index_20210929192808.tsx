import React from 'react' 
import { atom, useAtom } from 'jotai'

import { ITabItem, TabsContainer } from '../../compositions/Tabs'

// import { OpenGraphResults } from './OpenGraph'
import { InputSummary } from './InputSummary'
import { SeoResults } from './SeoSummary'
import { SavedSlugs } from './SavedSlugs'

import { 
    ArchiveIcon, 
    ClipboardIcon,
    FileTextIcon,
    HomeIcon 
} from '@radix-ui/react-icons'

const activeCollectionsTabStrAtom = atom('clipboard')

const tabItems: ITabItem[] = [
    { id: '0', value: 'clipboard', name: 'Clipboard', content: <InputSummary />, icon: <ClipboardIcon /> },
    { id: '1', value: 'slugs', name: 'Saved Slugs', content: <SavedSlugs />, icon: <FileTextIcon /> },
     { id: '2', value: 'urchins', name: 'Saved Urchins', content: null, icon: <HomeIcon /> },
     { id: '2', value: 'urchins', name: 'Saved Templates', content: null, icon: <HomeIcon /> },
];

export const SidePanel = () => {
    const [activePanel, setActivePanel] = useAtom(activeCollectionsTabStrAtom)

    const handleTabChange = (updatedTab: string) => setActivePanel(updatedTab);

    return (
        <TabsContainer 
            size='small'
            orientation='horizontal' 
            direction='ltr'
            items={tabItems} 
            value={activePanel}
            onChange={handleTabChange} 
        />
    );
}