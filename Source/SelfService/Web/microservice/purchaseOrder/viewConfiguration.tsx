// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Box, Grid } from '@mui/material';

import { MicroservicePurchaseOrder } from '../../api/index';

import { ViewWebhookCredentials } from './viewWebhookCredentials';
import { EditWebhookCredentials } from './editWebhookCredentials';
import { ButtonText } from '../../theme/buttonText';
import { RowWithLink } from './rowWithLink';
import { HeaderDataRow } from '../components/headDataRow';

type Props = {
    onSave: (microservice: MicroservicePurchaseOrder) => any;
    microservice: MicroservicePurchaseOrder;
    editMode: boolean;
    onCancel: () => void;
};

// Below is ugly and still not right
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        inactiveText: {
            padding: theme.spacing(0),
            paddingRight: theme.spacing(10),
            color: theme.palette.text.secondary,
            lineHeight: 1.75,
        },
        icon: {
            fill: '#6678F6',
        },
        iconRoot: {
            padding: 0,
            paddingLeft: theme.spacing(10),
            marginRight: theme.spacing(1),
        },
        copyClipboardCallToAction: {
            padding: theme.spacing(0),
            lineHeight: 1.75,
        },
        textField: { //https://stackoverflow.com/a/60461876 excellent resource
            '& .MuiOutlinedInput-input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
                color: 'white'
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                color: 'white',
                borderColor: theme.palette.text.secondary
            },
            '&:hover .MuiOutlinedInput-input': {
                color: 'white'
            },
        }
    })
);


export const ViewConfiguration: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();


    const _props = props!;
    const editMode = _props.editMode;
    const ms = _props.microservice;
    // TODO get host from tenant
    const webhookPrefix = `https://TODO/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';
    const msName = ms.name;

    const copyPOHeadUrl = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoHead}`);
            enqueueSnackbar('POHEAD URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POHEAD URL to clipboard.', { variant: 'error' });
        }
    };

    const copyPOLineUrl = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoLine}`);
            enqueueSnackbar('POLINE URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POLINE URL to clipboard.', { variant: 'error' });
        }
    };

    const webhookCredentials = !editMode ?
        <ViewWebhookCredentials classes={classes} authorization={ms.extra.webhooks[0].authorization} />
        : <EditWebhookCredentials classes={classes} authorization={ms.extra.webhooks[0].authorization} onCancel={_props.onCancel} />;

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
