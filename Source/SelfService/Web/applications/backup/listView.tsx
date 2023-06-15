// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { Paper } from '@mui/material';

import { IconButton } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupLink, getLink, BackupsForApplication, getBackupsByApplication, BackupLinkShareInput } from '../../apis/solutions/backups';

const getDateFromFileName = (fileName: string) => {
    // Remove from string all characters that are not digits, underscores or dashes.
    // From 'petripoint-dev-2023-06-14_05-29-14' to '----2023-06-14_05-29-14'.
    const cleanedFileName = fileName.replace(/[^\d_-]/g, '');

    // From '----2023-06-14_05-29-14' to ['----2023-06-14', '05-29-14'].
    const seperateDateTime = cleanedFileName.split('_');

    // Remove dashes from the beginning of the string.
    // From '['----2023-06-14', '05-29-14']' to '2023-06-14'.
    const date = seperateDateTime[0].replace(/^\-+/gm, '');

    // From '['----2023-06-14', '05-29-14']' to '05:29:14'.
    const time = seperateDateTime[1].replace(/-/g, ':');

    return `${date} at ${time}`;
};

const getBackupShareLink = async (row: BackupsDetailsList, applicationId) => {
    const input: BackupLinkShareInput = {
        applicationId,
        environment: row?.environment,
        file_path: row?.file,
    };

    const share: BackupLink = await getLink(input);

    return share.url;
};

type BackupsDetailsList = {
    environment: string;
    file: string;
    createdOn: string;
};

type BackupsTableRows = {
    row: BackupsDetailsList;
};

export type ListViewProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const ListView = ({ application, environment }: ListViewProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({} as BackupsForApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getBackupsByApplication(application.id, environment)
        ]).then(values => {
            const _data = values[0];
            setData(_data);
            setIsLoaded(true);
        });
    }, []);

    // TODO: Add loading indicator
    if (!isLoaded) return null;

    const backupsDataGridRows: BackupsDetailsList[] = data.files.map<BackupsDetailsList>(file => {
        return {
            id: file,
            file,
            createdOn: getDateFromFileName(file),
            environment,
        };
    });

    const DownloadCell = ({ row }: BackupsTableRows) => {
        const handleDownload = async () => {
            const url = await getBackupShareLink(row, application.id);
            window.open(url, '_blank');
            enqueueSnackbar(`${row?.file} has been downloaded.`);
        };

        return (
            <IconButton tooltipText='Download backup file' icon='DownloadRounded' onClick={handleDownload} />
        );
    };

    const CopyLinkCell = ({ row }: BackupsTableRows) => {
        const handleLinkCopy = async () => {
            const url = await getBackupShareLink(row, application.id);
            await navigator.clipboard.writeText(url);
            enqueueSnackbar(`${row?.file} copied to clipboard.`);
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
    );
};
