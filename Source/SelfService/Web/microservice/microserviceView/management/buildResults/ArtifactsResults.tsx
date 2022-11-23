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

function toCombinedKey(id: string, alias: string, generation: number) {
    return `${id}/${alias}/${generation}`;
}

function toGroupedResults(results: ArtifactResults) {
    // TODO: The generation should be a part of the key here.
    const result = new Map<string, {id: string, alias: string, generation: number, buildResults: BuildResult[]}>();
    results.forEach(_ => {
        const combinedKey = toCombinedKey(_.artifact.id, _.alias, _.artifact.generation);
        let item = result.get(combinedKey);
        if (item === undefined) {
            item = {id: _.artifact.id, alias: _.alias, generation: _.artifact.generation, buildResults: []};
        }
        item.buildResults.push(_.buildResult);
        result.set(combinedKey, item);
    });
    return result;
}

const ExpandableRow = ({children, buildMessages: buildResults}: {children: JSX.Element[], buildMessages: BuildResult[]}) => {
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
      {isExpanded && buildResults.map((result, i) => (
        <TableRow key={i}>
            <TableCell padding="checkbox" />
            <TableCell colSpan={4}>{`${result.type}: ${result.message}`}</TableCell>
      </TableRow>
      ))}
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
                        {Array.from(results, ([combinedKey, {id, alias, generation, buildResults}]) => (
                            <ExpandableRow
                            key={combinedKey}
                            buildMessages={buildResults}
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

