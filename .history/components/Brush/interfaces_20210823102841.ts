export interface Margin {
    top: number;
    left: number;
    bottom: number;
    right: number; 
}

export interface DataProps {
    start: timestamp;
    end: Date; 
    intervalInMs: number;
    email: string;
    slug?: string; 
}


export interface TimeseriesChartProps {

}