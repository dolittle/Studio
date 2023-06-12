// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

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

    if (!isLoaded) return null;

    const backups: BackupsDetailsList[] = data.files.map<BackupsDetailsList>(file => {
        const parts = file.split('/');
        const when: string = parts[parts.length - 1].replace('.gz.mongodump', '');

        return {
            application: data.application,
            environment,
            file,
            when,
        };
    });

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
                        {backups.map((item) => (
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
        </Box>
    );
};
