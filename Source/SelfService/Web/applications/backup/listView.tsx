// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid-pro';

import { IconButton } from '@dolittle/design-system';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';

import { ShortInfo } from '../../apis/solutions/api';
import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupLink, getLink, BackupsForApplication, getBackupsByApplication, BackupLinkShareInput } from '../../apis/solutions/backups';

import { useGlobalContext } from '../../context/globalContext';

import { DownloadIconButton } from '../../components/downloadIconButton';

//import { backupsDataGridColumns } from './backupsDataGridColumns';

type BackupsDetailsList = {
    environment: string;
    application: ShortInfo;
    file: string;
    when: string;
};

export type ListViewProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const ListView = ({ application, environment }: ListViewProps) => {
    const { setNotification } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({} as BackupsForApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getBackupsByApplication(application.id, environment)
        ]).then(values => {
            const _data = values[0];
            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setData(_data);
            setIsLoaded(true);
        });
    }, []);

    //console.log('data', data);
    //https://1c7a24ffb4204f4fb02c415d.file.core.windows.net/petripoint-dev-backup/mongo/petripoint-dev-2023-06-13_13-29-13.gz.mongodump?se=2023-06-16T09%3A11%3A53Z&sig=SWNzYxF2zIYi%2Ft5Me974JdLeACLUrQwXIUCdvtHAwds%3D&sp=r&spr=https&sr=f&sv=2019-02-02
    //https://1c7a24ffb4204f4fb02c415d.file.core.windows.net/petripoint-dev-backup/mongo/petripoint-dev-2023-06-13_13-29-13.gz.mongodump?se=2023-06-16T09%3A12%3A18Z&sig=J1kG1EY4VpZx7T62xg20NIsjjkKCnUkTtfG8R8XT34s%3D&sp=r&spr=https&sr=f&sv=2019-02-02

    // TODO: Add loading indicator
    if (!isLoaded) return null;

    const backupsDataGridRows: BackupsDetailsList[] = data.files.map<BackupsDetailsList>(file => {
        //console.log('file', file);
        const parts = file.split('/');
        const when: string = parts[parts.length - 1].replace('.gz.mongodump', '');

        return {
            id: `${application.id}-${environment}`,
            file,
            when,
            application: data.application,
            environment,
        };
    });

    const handleLinkCopy = async (params) => {
        const input: BackupLinkShareInput = {
            applicationId: application.id,
            environment: params.row.environment,
            file_path: params.row.file,
        };

        const share: BackupLink = await getLink(input);
        await navigator.clipboard.writeText(share.url);
        enqueueSnackbar(`${share.url} copied to clipboard.`);
    };

    const handleDownload = async (params) => {
        const input: BackupLinkShareInput = {
            applicationId: application.id,
            environment: params.row.environment,
            file_path: params.row.file,
        };

        const share: BackupLink = await getLink(input);
        window.open(share.url, '_blank');
        enqueueSnackbar(`${share.url} has been downloaded.`);
    };

    console.log('backupsDataGridRows', backupsDataGridRows);

    const backupsDataGridColumns: GridColDef[] = [
        {
            field: 'file',
            headerName: 'Name',
            minWidth: 300,
            flex: 1,
        },
        {
            field: 'when',
            headerName: 'Date & Time',
            minWidth: 100,
            flex: 1,
            headerAlign: 'right',
            align: 'right',
        },
        {
            field: 'download',
            headerName: 'Download',
            //sortable: false,
            minWidth: 180,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <DownloadIconButton
                    tooltipText='Download backup file'
                    icon='DownloadRounded'
                    snackbarMessage={`Test`}
                    onClick={() => handleDownload(params)}
                />
            ),
        },
        {
            field: 'copy',
            headerName: 'Copy',
            //sortable: false,
            minWidth: 216,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <DownloadIconButton
                    tooltipText='Copy link'
                    icon='CopyAllRounded'
                    snackbarMessage={`Test`}
                    onClick={() => handleLinkCopy(params)}
                />
            ),
        },
    ];

    return (
        <Box component={Paper} m={2}>
            <TableContainer>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Application</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Download</TableCell>
                            <TableCell align="right">Clipboard</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {backupsDataGridRows.map(item => (
                            <TableRow key={item.file}>
                                <TableCell align="left">
                                    {item.file}
                                </TableCell>
                                <TableCell align="right">{application.name}</TableCell>
                                <TableCell align="right">{item.when}</TableCell>

                                <TableCell align="right"><GetAppIcon onClick={async () => {
                                    const input: BackupLinkShareInput = {
                                        applicationId: application.id,
                                        environment: item.environment,
                                        file_path: item.file,
                                    };

                                    const share: BackupLink = await getLink(input);
                                    window.open(share.url, '_blank');
                                }} /></TableCell>

                                <TableCell align="right"><ShareIcon onClick={async () => {
                                    const input: BackupLinkShareInput = {
                                        applicationId: application.id,
                                        environment: item.environment,
                                        file_path: item.file,
                                    };

                                    const share: BackupLink = await getLink(input);
                                    await navigator.clipboard.writeText(share.url);
                                    setNotification('The download link is now in your clipboard', 'info');
                                }} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper sx={{ width: 1, height: 1, boxShadow: 'none' }}>
                <DataGridPro
                    rows={backupsDataGridRows}
                    columns={backupsDataGridColumns}
                    autoHeight
                    headerHeight={46}
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 40}
                    disableColumnMenu
                    disableColumnReorder
                    disableColumnResize
                    disableColumnSelector
                    disableSelectionOnClick
                    hideFooter
                />
            </Paper>
        </Box>
    );
};
