import React, { useState } from 'react'
import useSWR from 'swr' 

interface UseSavedSlugsProps {
    cursor: number; 
    pageSize: number;
}
interface SwrResponse {
    data: any;
    loading: boolean;
    error: 
}


const useSavedSlugs = ({ cursor = 0, pageSize = 10 }: UseSavedSlugsProps): SwrResponse => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error
    }
}

const SavedSlugs = () => {
    const [pageSize, setPageSize] = useState(10)
    const [cursor, setCursor] = useState(0)
    const { data, loading, error } = useSavedSlugs({ cursor, pageSize })

    return (

    )
}