// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';

import { MicroservicePurchaseOrder } from '../../api/index';

import { ViewWebhookCredentials } from './viewWebhookCredentials';
import { EditWebhookCredentials } from './editWebhookCredentials';
import { ButtonText } from '../../theme/buttonText';

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
        button: {
            padding: 0,
            marginRight: theme.spacing(1),
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

        label: {
            padding: theme.spacing(1),
            color: theme.palette.text.primary
        },
        data: {
            padding: theme.spacing(1),
            color: theme.palette.text.secondary
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
        },
    })
);


export const ViewConfiguration: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const _props = props!;
    const editMode = _props.editMode;
    const ms = _props.microservice;
    const searchParams = new URLSearchParams(location.search);

    const webhookPrefix = `https://${ms.extra.ingress.host}/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';
    const msName = ms.name;

    useEffect(() => {
        const firstTime = searchParams.get('firstTime')!;
        if (firstTime === '1') {
            enqueueSnackbar('Microservice ‘Supplier PO API’ successfully created.');
        }
    }, []);

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
                <Box m={2} pt={3}>
                    <Typography component="p" className={classes.label}>
                        Purchase order API name
                    </Typography>

                    <Typography component="p" className={classes.data}>
                        {msName}
                    </Typography>


                    <Typography component="p" className={classes.label}>
                        uuid provided
                    </Typography>

                    <Typography component="p" className={classes.data}>
                        {ms.dolittle.microserviceId}
                    </Typography>

                    <Typography component="p" className={classes.label}>
                        Runtime image provided
                    </Typography>

                    <Typography component="p" className={classes.data}>
                        {ms.extra.runtimeImage}
                    </Typography>


                    <Typography component="p" className={classes.label}>
                        Webhook for purchase order head (POHEAD)
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <span className={classes.inactiveText}>
                                {webhookPrefix} / m3/pohead
                            </span>

                        </Grid>

                        <Grid
                            item xs={4}
                        >
                            <ButtonText
                                withIcon={false}
                                onClick={copyPOHeadUrl}>
                                COPY TO CLIPBOARD
                            </ButtonText>
                        </Grid>
                    </Grid>

                    <Typography component="p" className={classes.label}>
                        Webhook for purchase order head (POLINE)
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <span className={classes.inactiveText}>
                                {webhookPrefix} / m3/poline
                            </span>

                        </Grid>

                        <Grid
                            item xs={4}
                        >
                            <ButtonText
                                withIcon={false}
                                onClick={copyPOLineUrl}>
                                COPY TO CLIPBOARD
                            </ButtonText>
                        </Grid>
                    </Grid>

                    {webhookCredentials}
                </Box>
            </Grid >
        </div >
    );
};
