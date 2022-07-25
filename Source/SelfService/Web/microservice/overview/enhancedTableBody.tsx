// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Paper, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';

import { EnhancedTableHead } from './enhancedTableHead';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

type EnhancedTableBodyProps = {
    data: [],
    applicationId: any,
    environment: any,
};

// TODO: add types
export const EnhancedTableBody: React.FC<EnhancedTableBodyProps> = ({ data, applicationId, environment }: EnhancedTableBodyProps) => {
    const history = useHistory();
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onClickView = (id) => {
        const href = `/microservices/application/${applicationId}/${environment}/view/${id}`;
        history.push(href);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="Microservice-table"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => onClickView(row.id)}>
                                            <TableCell id={labelId} scope="row">{row.name}</TableCell>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.kind}</TableCell>
                                            <TableCell>{row.environment}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};
