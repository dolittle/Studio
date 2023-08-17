// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { IconButton } from '@dolittle/design-system';

import { BackupLink, getLink, BackupLinkShareInput } from '../../apis/solutions/backups';

export type BackupsDetailsList = {
    environment: string;
    file: string;
    createdOn: string;
};

type BackupsTableRows = {
    row: BackupsDetailsList;
};

const getBackupShareLink = async (row: BackupsDetailsList, applicationId: string) => {
    const input: BackupLinkShareInput = {
        applicationId,
        environment: row?.environment,
        file_path: row?.file,
    };

    const share: BackupLink = await getLink(input);

    return share.url;
};

export type BackupsDataGridProps = {
    applicationId: string;
    backupsDataGridRows: BackupsDetailsList[];
};

export const BackupsDataGrid = ({ applicationId, backupsDataGridRows }: BackupsDataGridProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const DownloadCell = ({ row }: BackupsTableRows) => {
        const handleDownload = async () => {
            const url = await getBackupShareLink(row, applicationId);
            window.open(url, '_blank');
            enqueueSnackbar(`${row?.file} has been downloaded.`);
        };

        return (
            <IconButton tooltipText='Download backup file' icon='DownloadRounded' onClick={handleDownload} />
        );
    };

    const CopyLinkCell = ({ row }: BackupsTableRows) => {
        const handleLinkCopy = async () => {
            const url = await getBackupShareLink(row, applicationId);
            await navigator.clipboard.writeText(url);
            enqueueSnackbar(`${row?.file} has been copied to clipboard.`);
        };

        return (
            <IconButton tooltipText='Copy link' icon='CopyAllRounded' onClick={handleLinkCopy} />
        );
    };

    const backupsDataGridColumns: GridColDef[] = [
        {
            field: 'file',
            headerName: 'Name',
            minWidth: 687,
            flex: 1,
        },
        {
            field: 'createdOn',
            headerName: 'Date & Time',
            headerAlign: 'center',
            align: 'center',
            minWidth: 277,
            flex: 1,
        },
        {
            field: 'download',
            headerName: 'Download',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 104,
            flex: 1,
            renderCell: DownloadCell,
        },
        {
            field: 'copy',
            headerName: 'Copy',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 104,
            flex: 1,
            renderCell: CopyLinkCell,
        },
    ];

    return (
        <Paper elevation={1} sx={{ width: 1, boxShadow: 'none' }}>
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
    );
};
