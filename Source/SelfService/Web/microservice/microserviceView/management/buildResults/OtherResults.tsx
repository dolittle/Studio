// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { BuildResult } from './BuildResults';

export type OtherResultsProps = {
    results: BuildResult[]
};

export const OtherResultsView = (props: OtherResultsProps) => {
    if (!props.results?.length) {
        return <></>;
    }
    const results = props.results;
    return (
        <>
            <Typography variant='h3' sx={{ my: 2 }}>Other</Typography>
            <TableContainer>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        {results.map((result, i) => (
                            <TableRow key={i} >
                            <TableCell align="left">{`${result.type}: ${result.message}`}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

