import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


type DeleteFileFromMicroservice = (fileName: string)=>Promise<void>

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
            path: "/app/data/",
            dateAdded: "N/A",
            addedBy: "N/A"
        } as ConfigFilesTableRow
    })
}

export default function ConfigFilesTable(props: ConfigFilesTableProps) {

  const rows = toRows(props.filesNames)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Path</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Date Added</TableCell>
            <TableCell align="right">Added By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.fileName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.path}</TableCell>
              <TableCell align="right">{row.fileName}</TableCell>
              <TableCell align="right">{row.dateAdded}</TableCell>
              <TableCell align="right">{row.addedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
