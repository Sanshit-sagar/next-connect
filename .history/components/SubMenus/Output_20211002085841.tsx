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
import { OpenGraphResults } from '../SidePanel/OpenGraph'
import { ToolbarIconButton } from '../../compositions/IconButton'

import { FullUrl } from './data'
import { Submit } from './Submit'
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

const UndoRedoReset = () => {
    const handleUndo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Undoing')
    const handleRedo = (_event: React.MouseEvent<HTMLButtonElement>) => toast.success('Redoing')
    const handleReset = (_event:  React.MouseEvent<HTMLButtonElement>) => toast.success('Resetting')

    return (
        <>
            <ToolbarIconButton 
                icon={<ThickArrowLeftIcon />} 
                label={'Undo'} 
                onClick={handleUndo}
            /> 
            <ToolbarIconButton 
                icon={<ThickArrowRightIcon />} 
                label={'Redo'} 
                onClick={handleRedo}
            />
             <ToolbarIconButton 
                icon={<ReloadIcon />} 
                label={'Reset'} 
                onClick={handleReset}
            />
        </>
    )
}

const Actions = () => (
    <ToolbarButtonGroup>
        <OpenGraph /> 
        <UndoRedoReset /> 
    </ToolbarButtonGroup>
)

const SuggestedSlug = () => {
    const [isCopied, setIsCopied] = React.useState('')
    let suggestion = useAtomValue(suggestedSlugAtom)

    const handleCopyToClipboard = () => {
        toast(`Copied ${suggestion} to clipboard`)
    }

    return (
        <ToolbarTextBox>
            <Tooltip content={`Your site can be reached @ ${suggestion}`}>
                <ToolbarLink> {sanitize(suggestion)} </ToolbarLink>
            </Tooltip>
            <Tooltip content={`Copy ${suggestion} to clipboard?`}>
                <ToolbarIconButton
                    icon={<ClipboardCopyIcon />}
                    label={'Copy to Clipboard'}
                    onClick={handleCopyToClipboard}
                />
            </Tooltip>
        </ToolbarTextBox>
    )
}

export const SubmissionUrl = () => (
    <Toolbar>
        <Actions />
        <ToolbarSeparator /> 
        <SuggestedSlug /> 
        <ToolbarSeparator /> 
        <FullUrl /> 
        <Submit /> 
    </Toolbar>
);

