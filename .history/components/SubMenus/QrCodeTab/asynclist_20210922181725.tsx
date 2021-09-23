import React from 'react'
import { useAsyncList } from '@react-stately/data'
import { ComboBox } from '../../'

const AsyncListTest = () => {
    
    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch(`/api/urchins/user/sanshit.sagar@gmail.com/medium`, { signal })
            let json = await res.json()

            return {
              items: [...json.results.urchins]
            }
        }
    })

    return (
        <ComboBox
            label="Star Wars Character Lookup"
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}
            loadingState={list.loadingState}>
            {(item) => <Item key={item.name}>{item.name}</Item>}
        </ComboBox>

    )
}