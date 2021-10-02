import React from 'react'
import useSWR from 'swr' 

const useSavedSlugs = ({ cursor = 0, pageSize = 10 }: { cursor: number; pageSize: number }) => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error
    }
}

const SavedSlugs = () => {
    const { }

    return (

    )
}