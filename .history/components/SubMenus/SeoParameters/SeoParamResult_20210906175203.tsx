import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'

const Results = ({ data, loading, error }: { data: any | null, loading: boolean, error: any | null }) => {












}

export const SeoParamResult = () => {
    let url = '/api/urchins/user/sanshit.sagar@gmail.com'
    const { lastFetchedAt, data, loading, error } = useAsyncJotai(url)

    if(!lastFetchedAt) return <Text> loading 1.0 </Text>

    return (
        <>
        <Text> {lastFetchedAt} </Text>
        <Results data={data} loading={loading} error={error} />
        </>
    ); 
}