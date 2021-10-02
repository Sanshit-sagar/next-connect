import useSWR from 'swr' 

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/slugs/`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    }
}
export const useSavedDestinations = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/destinations`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    } 
}