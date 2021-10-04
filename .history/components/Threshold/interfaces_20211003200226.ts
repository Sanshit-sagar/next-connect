export interface Click {
    date: Date;
    groupA: number;
    groupB: number; 
}

export interface Margin { 
    top: number; 
    bottom: number; 
    left: number; 
    right: number;
}

export interface AreaDifferenceProps {
    clicks: Click[];
    height: number;
    width: number;
    margin?: Margin;
}