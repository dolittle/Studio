// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface HeadCell {
    id: string;
    numeric: boolean;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'containerImage',
        numeric: true,
        label: 'Container image',
    },
    {
        id: 'runtime',
        numeric: false,
        label: 'Runtime',
    },
    {
        id: 'publicURL',
        numeric: false,
        label: 'Public URL',
    },
];

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property) => void;
    order: Order;
    orderBy: string;
}

export const EnhancedTableHead = ({ order, orderBy, onRequestSort }: EnhancedTableProps) => {
    const createSortHandler = (property) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {
                                    orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'
                                            }
                                        </Box>
                                    ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
};
