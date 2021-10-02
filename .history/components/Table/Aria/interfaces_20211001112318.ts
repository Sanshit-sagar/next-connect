import { HTMLAttributes } from 'react'
import { GridNode } from '@react-types/grid'

export interface ColumnHeaderProps {
    node: GridNode<unknown>;
    isVirtualized?: boolean;
}

interface ColumnHeaderAria {
    columnHeaderProps: HTMLAttributes<HTMLElement>
}