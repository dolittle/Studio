// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export type DeleteFileFromMicroservice = (fileName: string) => void;

export interface ConfigFilesTableProps {
    filesNames: string[],
    onDeleteFileClick: DeleteFileFromMicroservice
}

export interface ConfigFilesTableRow {
    fileName: string,
    path?: string,
    dateAdded?: string,
    addedBy?: string
}

const toRows=(fileNames: string[]): ConfigFilesTableRow[] =>{
    return fileNames.map((name)=>{
        return {
            fileName: name,
            path: '/app/data/',
            dateAdded: 'N/A',
            addedBy: 'N/A'
        } as ConfigFilesTableRow;
    });
};

export default function ConfigFilesTable(props: ConfigFilesTableProps) {

  const rows = toRows(props.filesNames);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Path</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Date Added</TableCell>
            <TableCell align="left">Added By</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.fileName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.path}</TableCell>
              <TableCell align="left">{row.fileName}</TableCell>
              <TableCell align="left">{row.dateAdded}</TableCell>
              <TableCell align="left">{row.addedBy}</TableCell>
              <TableCell align="left"><IconButton onClick={(e)=>{
                  return props.onDeleteFileClick(row.fileName);
              }}><DeleteIcon color="primary"/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
