import React from 'react'

import { useAtomValue } from 'jotai/utils'
import { suggestedSlugAtom } from './Slug/SlugTab'

import { 
    ReloadIcon,
    GlobeIcon, 
    ThickArrowLeftIcon, 
    ThickArrowRightIcon, 
    ClipboardCopyIcon
} from '@radix-ui/react-icons'

import { Flex } from '../../primitives/Flex'
import { Tooltip } from '../../primitives/Tooltip'
import { IconButton } from '../../primitives/IconButton'
import {
    Toolbar,
    ToolbarLink,
    ToolbarTextBox,
    ToolbarSeparator,
    ToolbarButtonGroup
} from '../../primitives/Toolbar'

import { HoverCard } from '../../compositions/HoverCard'
import { ToolbarIconButton } from '../../compositions/IconButton'

import { FullUrl } from './data'
import { Submit } from './Submit'
import { OpenGraphResults } from '../SidePanel/OpenGraph'

import toast from 'react-hot-toast'

const sanitize = (txt: string) => txt.length >= 20 ? `...${txt.substring(txt.length - 20)}` : txt

const OpenGraph = () => (
    <HoverCard 
        trigger={
            <IconButton size='2' variant='ghost'>
                <GlobeIcon />
            </IconButton>
        }
        content={<OpenGraphResults />}
    />
)

const Undo = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Undoing')
    return (
        <ToolbarIconButton 
            icon={<ThickArrowLeftIcon />} 
            label={'Undo'} 
            onClick={handleUndo}
        /> 
    )
}

const Redo = () => {
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Redoing')
    return (
        <ToolbarIconButton 
            icon={<ThickArrowRightIcon />} 
            label={'Redo'} 
            onClick={handleRedo}
        />
    )
}

const Reset = () => {
    const handleReset = (_event:  React.MouseEvent<HTMLButtonElement>) => toast.success('Resetting')

    return (       
        <ToolbarIconButton 
            icon={<ReloadIcon />} 
            label={'Reset'} 
            onClick={handleReset}
        />
    )
}

const SuggestedSlug = () => {
    const [isCopied, setIsCopied] = React.useState(false)
    let suggestion = useAtomValue(suggestedSlugAtom)

    const handleCopyToClipboard = () => {
        setIsCopied(true)
        toast(`Copied ${suggestion} to clipboard`)
    }

    return (
        <ToolbarTextBox>
            <Tooltip content={`Your site can be reached @ ${suggestion}`}>
                <ToolbarLink> {sanitize(suggestion)} </ToolbarLink>
            </Tooltip>
           
                <Flex css={{ mb: '$2', '&:hover': { cursor: 'copy' } }}>
                    <ToolbarIconButton
                        icon={<ClipboardCopyIcon />}
                        label={`Copy ${suggestion} to Clipboard`}
                        onClick={handleCopyToClipboard}
                    />
                </Flex> 
            </Tooltip>
        </ToolbarTextBox>
    )
}

export const SubmissionUrl = () => (
    <Toolbar>
        <ToolbarButtonGroup>
            <OpenGraph /> 
            <Undo /> 
            <Redo />
            <Reset /> 
        </ToolbarButtonGroup>

        <ToolbarSeparator />
        <SuggestedSlug /> 
        <ToolbarSeparator />

        <FullUrl /> 
        <Submit /> 
    </Toolbar>
);

