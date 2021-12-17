// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useSnackbar } from 'notistack';

import { Box, Grid } from '@mui/material';

import { MicroservicePurchaseOrder } from '../../api/index';

import { ViewWebhookCredentials } from './viewWebhookCredentials';
import { EditWebhookCredentials } from './editWebhookCredentials';
import { ButtonText } from '../../theme/buttonText';
import { RowWithLink } from './rowWithLink';
import { HeaderDataRow } from '../components/headDataRow';
import copyToClipboard from 'copy-to-clipboard';

type Props = {
    onSave: (microservice: MicroservicePurchaseOrder) => any;
    microservice: MicroservicePurchaseOrder;
    editMode: boolean;
    onCancel: () => void;
};

export const ViewConfiguration: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();


    const _props = props!;
    const editMode = _props.editMode;
    const ms = _props.microservice;
    // TODO get host from tenant
    const webhookPrefix = `https://TODO/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';
    const msName = ms.name;

    const copyPOHeadUrl = (event: React.MouseEvent<HTMLElement>) => {
        try {
            copyToClipboard(`${webhookPrefix}/${webhookPoHead}`);
            enqueueSnackbar('POHEAD URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POHEAD URL to clipboard.', { variant: 'error' });
        }
    };

    const copyPOLineUrl = (event: React.MouseEvent<HTMLElement>) => {
        try {
            copyToClipboard(`${webhookPrefix}/${webhookPoLine}`);
            enqueueSnackbar('POLINE URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POLINE URL to clipboard.', { variant: 'error' });
        }
    };

    const webhookCredentials = !editMode ?
        <ViewWebhookCredentials authorization={ms.extra.webhooks[0].authorization} />
        : <EditWebhookCredentials authorization={ms.extra.webhooks[0].authorization} onCancel={_props.onCancel} />;

    return (
        <div >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <HeaderDataRow
                    head='Purchase order API name'
                    data={msName}
                />

                <HeaderDataRow
                    head='uuid provided'
                    data={ms.dolittle.microserviceId}
                />

                <HeaderDataRow
                    head='Runtime image provided'
                    data={ms.extra.runtimeImage}
                />

                <Box py={1}>
                    <RowWithLink
                        title='Webhook for purchase order head (POHEAD)'
                        prefix={
                            <span>
                                {webhookPrefix} / m3/pohead
                            </span>
                        }
                        suffix={
                            <Box m={-1.2}>
                                <ButtonText
                                    withIcon={false}
                                    onClick={copyPOHeadUrl}
                                >
                                    COPY TO CLIPBOARD
                                </ButtonText>
                            </Box>
                        }
                    />
                </Box>

                <Box py={1}>
                    <RowWithLink
                        title='Webhook for purchase order head (POLINE)'
                        prefix={
                            <span>
                                {webhookPrefix} / m3/pohead
                            </span>
                        }
                        suffix={
                            <Box m={-1.2}>
                                <ButtonText
                                    withIcon={false}
                                    onClick={copyPOLineUrl}
                                >
                                    COPY TO CLIPBOARD
                                </ButtonText>
                            </Box>
                        }
                    />
                </Box>

                <Box py={1}>
                    {webhookCredentials}
                </Box>
            </Grid >
        </div >
    );
};
