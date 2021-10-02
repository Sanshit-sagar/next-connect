import React, { useState }  from 'react'

// import { Text } from '../../primitives/Text'
// import { Flex } from '../../primitives/Flex'

// import { 
//     Toolbar, 
//     ToolbarToggleItem, 
//     ToolbarToggleGroup
// } from '../../primitives/Toolbar'
// import { TableSkeleton } from './Skeleton'
// import { TableScro llView } from './ScrollView'

import { Table } from './Aria/AriaTable'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'

type Column = {
    name: string;
    uid: string; 
};

type Pokemon = {
    id: number;
    name: string;
    type: string;
    level: string; 
};


const DataTable: React.FC<{}> = (props: any) => {

    function AsyncSortTable() {
        let list = useAsyncList({
            async load({signal}) {
                let res = await fetch(`https://swapi.dev/api/people/?search`, {signal});
                let json = await res.json();
                return {
                    items: json.results
                };
          },
          async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp =(parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1;
                    }
                    return cmp;
                })
            };
          }
    });
  

    return (
       
        <Table
            aria-label="Example table with client side sorting"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}>
            <TableHeader>
                <Column key="name" allowsSorting>
                    Name
                </Column>
                <Column key="height" allowsSorting>
                    Height
                </Column>
                <Column key="mass" allowsSorting>
                    Mass
                </Column>
                <Column key="birth_year" allowsSorting>
                    Birth Year
                </Column>
            </TableHeader>
            <TableBody items={list.items}>
                {(item) => (
                <Row key={item.name}>
                    {(columnKey) => <Cell>{item[columnKey]}</Cell>}
                </Row>
                )}
            </TableBody>
        </Table>
    );
}

export default DataTable










// {/* />   */}