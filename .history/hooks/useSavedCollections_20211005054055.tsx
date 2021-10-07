import useSWR from 'swr' 
import { SerializedSlug} from '../components/SidePanel/SlugInfo'


interface SwrResponse {
    data: string[] | SerializedSlug;
    loading: boolean;
    error: Error | null; 
}

type VerbosityType = 'verbose' | 'concise'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/slugs/verbose`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    }
}
export const useSavedDestinations = (verbosity: VerbosityType = 'verbose'): SwrResponse => {

    const { data, error } = useSWR(`/api/config/destinations/${verbosity}`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    } 
}

export const useSlugDetails = (slug: string): SwrResponse => {
    const { data , error } = useSWR(`/api/config/slug/${slug}`, fetcher)
    
    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    } 
}