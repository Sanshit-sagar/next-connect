import { AxisScale, Orientation } from '@visx/axis'
import { ReactNode } from 'react'

export type TimeStamp = number;
export type ClickScore = number;
export type ClickFmtTime = string; 
export type ClickDate = Date; 

export type SelectionValue = number | string;
export type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;
export type AxisDirection = Orientation. | 'left' | 'top' | 'right' | undefined; 

export interface TickCount {
    y: number;
    x: number; 
}

export interface SelectionOption {
    id: number;
    label: string;
}

export interface ClickHistoryProps {
    amount: number;
    range: string;
    interval: string;
}

export interface Datum {
    index: number;
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickfmttime: ClickFmtTime; 
    clickdate: ClickDate; 
}

export interface GraphDetails {
    start: ClickDate;
    end?: ClickDate;
    durationInMs?: number;
    tickSizeInMs?: number;
    numIntervals?: number; 
};

export interface MarginProps {
    top: number;
    left: number; 
    bottom: number; 
    right: number; 
}

export interface PrimaryChartProps {
    height: number; 
    width: number;
    data: Datum[];
    details: GraphDetails;
    margin?: MarginProps; 
}

export interface HeightProps {
    height: number;
    width: number; 
}

export type TooltipData = Datum

export interface LineChartProps {
    data: Datum[];
    width: number;
    yMax: number;
    margin: MarginProps;
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    stroke: string;
    top?: number;
    left?: number;
    xTickFormat?: string;
    children?: any; 
}

export interface SecondaryChartProps {
    data: Datum[];
    width: number;
    height: number;
    margin?: MarginProps
}

export interface AreaChartProps {
    data: Datum[];
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    width: number;
    yMax: number;
    margin: MarginProps;
    gradientColor: string;
    stroke?: string;
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    top?: number;
    left?: number;
    children?: ReactNode;
}

export interface BrushChartProps {
    loading: boolean;
    error: any | null; 
    mappedData: Datum[];
    details: GraphDetails;
}

export type AnnotationProps = {
    width: number;
    height: number;
    compact?: boolean;
};

export interface FormattedTimes {
    timestamp: number; 
    fmtTimestamp: string;
}