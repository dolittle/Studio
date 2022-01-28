// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { useSnackbar } from 'notistack';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { StaticFiles, deleteFile } from '../../../api/staticFiles';
import { ButtonText } from '../../../theme/buttonText';
import { CdnInfo } from './view';

type ListItem = {
    fileName: string
    fullUrl: string
};

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    cdnInfo: CdnInfo
    data: StaticFiles
    afterDelete: () => void
};


export const ListView: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const _props = props!;

    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;
    const data = _props.data;
    const cdnInfo = _props.cdnInfo;

    const items = data.files.map<ListItem>(e => {
        // No need for "/" between them
        const url = `${cdnInfo.domain}${e}`;
        return {
            fileName: e,
            fullUrl: url,
        };
    });

    const onClickDelete = async (item: ListItem) => {
        await deleteFile(applicationId, environment, microserviceId, item.fileName);
        enqueueSnackbar('item deleted');
        _props.afterDelete();
    };

    const onClickView = (item: ListItem) => {
        enqueueSnackbar('TODO: url to open in new window');
        window.open(item.fullUrl, '_blank');
    };

    return (

        <Box component={Paper} m={2}>
            <TableContainer>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">View</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.fileName}>
                                <TableCell align="left">
                                    <FileCopyIcon onClick={async () => {
                                        await navigator.clipboard.writeText(item.fullUrl);
                                        enqueueSnackbar('url copied to clipboard');
                                    }} />
                                    <a
                                        onClick={() => onClickView(item)}
                                    >
                                        {item.fileName}
                                    </a>
                                </TableCell>

                                <TableCell align="right" title={item.fullUrl}>
                                    <ButtonText
                                        onClick={() => onClickView(item)}
                                        startIcon={<OpenInNewIcon />}
                                    >
                                        View
                                    </ButtonText>
                                </TableCell>

                                <TableCell align="right">
                                    <ButtonText
                                        onClick={() => onClickDelete(item)}
                                        startIcon={<DeleteForeverIcon />}
                                    >
                                        Delete
                                    </ButtonText>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
};
