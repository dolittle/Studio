// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {} from 'react';
import { Typography, IconButton } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { ArtifactResults, BuildResult } from './BuildResults';

export type ArtifactsResultsProps = {
    results: ArtifactResults,
    type: string
};


function toGroupedResults(results: ArtifactResults) {
    // TODO: The generation should be a part of the key here.
    const result = new Map<string, {alias: string, generation: number, buildResults: BuildResult[]}>();
    results.forEach(_ => {
        let item = result.get(_.artifact.id);
        if (item === undefined) {
            item = {alias: _.alias, generation: _.artifact.generation, buildResults: []};
        }
        item.buildResults.push(_.buildResult);
        result.set(_.artifact.id, item);
    });
    return result;
}

const ExpandableRow = ({children, expandComponent}: {children: JSX.Element[], expandComponent: JSX.Element}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};
export const ArtifactsResultsView = (props: ArtifactsResultsProps) => {
    if (!props.results?.length) {
        return <></>;
    }

    const results = toGroupedResults(props.results);
    return (
        <>
            <Typography variant='h3' sx={{ my: 2 }}>{props.type}</Typography>
            <TableContainer>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">Alias</TableCell>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Generation</TableCell>
                            <TableCell align="left">Build Messages</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(results, ([id, {alias, generation, buildResults}]) => (
                            <ExpandableRow
                            key={id}
                            expandComponent={
                            <>
                                {buildResults.map((result, i) => (
                                    <TableCell key={id + i} colSpan={3}>{`${result.type}: ${result.message}`}</TableCell>
                                ))}
                            </>}
                          >
                            <TableCell sx={{color: buildResults.findIndex(_ => _.isFailed) === -1 ? undefined : 'red'}} align="left">{alias ?? 'No Alias'}</TableCell>
                            <TableCell align="left">{id}</TableCell>
                            <TableCell align="left">{generation}</TableCell>
                            <TableCell align="left">{buildResults.length}</TableCell>
                          </ExpandableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

