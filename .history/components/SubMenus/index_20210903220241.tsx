import React, { useState } from 'react'
import { styled } from '../../stitches.config'
import {
    Tabs, 
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../primitives/Tabs'

import { Button } from '../../primitives/Button'
import { Icon } from '../../primitives/Icon'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator' 

import { DestinationTabContent } from './DestinationTab'
import { ExpirationTabContent } from './ExpirationTab'
import SlugTabContent from './SlugTab'
import SeoTabContent from './SeoTab'

import { 
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from '../../primitives/Dialog'

import {
    TargetIcon,
    Link2Icon,
    ClockIcon,
    LockClosedIcon,
    ShuffleIcon,
    Crosshair2Icon,
    PersonIcon,
    Share1Icon,
    CrossCircledIcon
} from '@radix-ui/react-icons'

const TABS_ORIENTATION = 'horizontal'
const TABS_DIRECTION = 'ltr'

interface SubMenu {
    id: string; 
    label: string; 
    value: string; 
    displayName?: string | undefined | null; 
    icon: any; 
    content: any; 
}

// TODO: EMBED IN PNGS, RATE LIMITTER & WAITING ROOM, MANAGE CACHE, SECURITY HEADERS, FEATURE TOGGLES
const descriptions: any = Object.values({
    'destination': 'Enter or type the URL that you would like to slugify',
    'slug': 'Customize the settings to generate a slug that best fits your needs',
    'seo': 'Start fine-tuning your analytics by templating SEO and UTM parameters',
    'abtesting': 'Split traffic and measure customer responses to new features',
    'timeframe': 'When should this slug self-detonate?',
    'security': 'Reset or toggle a passord at any time',
    'qrCode': 'Make your content avilable at the click of a picture',
    'share': 'Generate shareable links and messages for all your favourite platforms'
});

const submenus: SubMenu[] = [
    { id: 'destination', value: 'destination', label: '  Destination', content: <DestinationTabContent />, icon: <TargetIcon />, },
    { id: 'slug', value: 'slug', label: '  Slug', content: <SlugTabContent />, icon: <Link2Icon /> },
    { id: 'seo', value: 'seo', label: '  SEO', displayName: 'search engine optimization', content: <SeoTabContent />, icon: <Crosshair2Icon />},
    { id: 'timeframe', value: 'timeframe', label: ' expiration', content: <ExpirationTabContent />, icon: <ClockIcon />},
    { id: 'security', value: 'security', label: '  Security', content: <SlugTabContent />, icon: <LockClosedIcon /> },
    { id: 'abtesting', value: 'abtesting', label: '  A/B Testing', content: <SlugTabContent />, icon: <PersonIcon /> },
    { id: 'routing', value: 'routing', label: '  Routing', content: <SlugTabContent />, icon: <ShuffleIcon /> },
    { id: 'share', value: 'share', label: '  Share', content: <SlugTabContent />, icon: <Share1Icon /> },
    // { id: 'blacklists', value: 'blacklist', label: 'Blacklists', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'cache', value: 'cache', label: 'Cache', content: <SlugTabContent />, icon: <Link2Icon /> },
    // { id: 'securityHeaders }
    // { id: 'qrCodes', value: 'qrCodes', label: 'QR Codes', content: <SlugTabContent />, icon: <Link2Icon /> },
];


export const MenuContainer = styled('div', {
    backgroundColor: '$hiContrast', 
    height: '600px', 
    width: '1000px', 
    border: '2px solid',
    borderColor: '$border3',
    maxWidth: '1100px', 
    br: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
    
});


const TabulatedMenu = () => {
    const [activeTab, setActiveTab] = useState(submenus[0].id)
    const handleActiveTabChange = (value: string) => setActiveTab(value)

    return (
        <Dialog>
            <Tabs 
                orientation={TABS_ORIENTATION} 
                dir={TABS_DIRECTION}
                value={activeTab} 
                onValueChange={handleActiveTabChange}
            >
                <TabsList aria-label={`tabs-list-menu`}>
                    {submenus.map((submenu, i) => {
                        return (
                            <TabsTrigger 
                                key={`submenu-${i}`} 
                                value={submenu.value} 
                            >
                                <Flex css={{ width: '100%',fd: 'row', jc: 'flex-start', ai: 'center', paddingRight: '$2' }}>
                                    <Text 
                                        as='span' 
                                        size='1' 
                                        css={{ 
                                            color: '$text', 
                                            fontWeight: 300, 
                                            display: 'flex', 
                                            width: '100%',
                                            fd: 'row', 
                                            jc: 'space-between', 
                                            ai: 'center'
                                        }}
                                    >
                                        <Icon 
                                            label={`${submenu.label}`}
                                            children={submenu.icon}
                                        />
                                        {submenu.label.toUpperCase()}
                                    </Text>
                                </Flex>
                            </TabsTrigger>
                        ); 
                    })}
                </TabsList>
                
                {submenus.map((submenu, i: number) => {
                    return (
                        <TabsContent key={`content-for-tab-${i}`} value={submenu.id}>
                            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                                <Heading size='2'>
                                    {submenu.icon}
                                    {submenu.label.toLowerCase()} 
                                </Heading>
                                <Text size='1' css={{ color: '$text', marginTop: 15 }}>     
                                    {`${i < descriptions.length ? descriptions[i] : '--'}`}    
                                </Text> 
                                <Separator 
                                    css={{ 
                                        color: '$accent', 
                                        bc: '$accentContrast', 
                                        width: '100%',
                                        marginTop: '$3',
                                        marginBottom: '$3'
                                    }} 
                                />
                                <Flex css={{ fd: 'column', jc: 'space-between', ai: 'flex-end', gap: '$2' }}>        
                                    {submenu.content}
                                </Flex>
                            </Flex>
                            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', mt: 20}}>
                                <DialogTrigger as={Button}>
                                    done
                                </DialogTrigger> 
                            </Flex>
                        </TabsContent>
                    );
                })}
            </Tabs>

            <DialogContent>
                <Heading size='5' as='h6' css={{ color: '$text', fontWeight: 500 }}>
                    New Slug
                </Heading>
                <Text size="3" as="subtitle" css={{ color: '$text' }}>
                    TODOTODOTODO
                </Text>
                
                <NewSlugDetailsSummary />
            </DialogContent>

        </Dialog>
    );
}

export default TabulatedMenu

