// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import { MicroservicePurchaseOrder } from '../../api/index';
import { useSnackbar } from 'notistack';
import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Paper from '@material-ui/core/Paper';

type Props = {
    onSave: (microservice: MicroservicePurchaseOrder) => any;
    microservice: MicroservicePurchaseOrder;
};

// TODO: I am not winning at the game of grids / css / flexbox
// Below is ugly and still not right
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            padding: 0,
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        inactiveText: {
            padding: theme.spacing(0),
            paddingRight: theme.spacing(10),
            color: '#93959F',
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
        }
    })
);


export const ViewConfiguration: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const _props = props!;

    const ms = _props.microservice;

    const webhookPrefix = `https://${ms.extra.ingress.host}/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';
    const msName = ms.name;
    const credentials = getCredentialsFromBasicAuth(ms.extra.webhooks[0].authorization);
    const username = credentials.username;
    const hiddenPassword = '*****';
    const [password, setPassword] = useState(hiddenPassword);

    const copyPOHeadUrl = async () => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoHead}`);
            enqueueSnackbar('POHEAD URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POHEAD URL to clipboard.', { variant: 'error' });
        }
    };

    const copyPOLineUrl = async () => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoLine}`);
            enqueueSnackbar('POLINE URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POLINE URL to clipboard.', { variant: 'error' });
        }
    };

    const togglePassword = () => {
        if (password === hiddenPassword) {
            setPassword(credentials.password);
        } else {
            setPassword(hiddenPassword);
        }


    };

    return (
        <div >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <h1>Purchase order API name</h1>
                <p>{msName}</p>


                <h1>uuid provided</h1>
                <p>9f6a613f-d969-4938-alac-5b7d199bc40</p>

                <h1>Runtime image provided</h1>
                <p>dolittle/runtime: 6.0</p>


                <p>Webhook for purchase order head (POHEAD)</p>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <span className={classes.inactiveText}>
                            {webhookPrefix} / m3/pohead
                        </span>

                    </Grid>

                    <Grid
                        item xs={4}
                    >
                        <Button className={classes.copyClipboardCallToAction} color='primary' onClick={copyPOHeadUrl}>COPY TO CLIPBOARD</Button>
                    </Grid>
                </Grid>


                <p>Webhook for purchase order line (POLINE)</p>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <span className={classes.inactiveText}>
                            {webhookPrefix} / m3/poline
                        </span>

                    </Grid>

                    <Grid
                        item xs={4}
                    >
                        <Button className={classes.copyClipboardCallToAction} color='primary' onClick={copyPOLineUrl}>COPY TO CLIPBOARD</Button>
                    </Grid>
                </Grid>

                <h1>Username</h1>
                <p>{username}</p>

                <h1>Password</h1>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <span>{password}</span>

                    </Grid>

                    <Grid
                        item xs={10}
                    >
                        <IconButton onClick={() => {
                            togglePassword();
                        }}
                            className={classes.iconRoot}
                        >
                            <VisibilityIcon className={classes.icon} />
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid >
        </div >
    );
};
