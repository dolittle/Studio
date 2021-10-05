// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';

import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ClassNameMap } from '@material-ui/styles/withStyles';

type Props = {
    authorization: string
    classes: ClassNameMap<any>
};

export const ViewWebhookCredentials: React.FunctionComponent<Props> = (props) => {
    const classes = props!.classes;
    const credentials = getCredentialsFromBasicAuth(props!.authorization);
    const username = credentials.username;
    const hiddenPassword = '******';
    const [password, setPassword] = useState(hiddenPassword);

    const togglePassword = () => {
        if (password === hiddenPassword) {
            setPassword(credentials.password);
        } else {
            setPassword(hiddenPassword);
        }
    };

    return (
        <>
            <Typography component="p" className={classes.label}>
                Username
            </Typography>

            <Typography component="p" className={classes.data}>
                {username}
            </Typography>


            <Typography component="p" className={classes.label}>
                Password
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Typography component="p" className={classes.data}>
                        {password}
                    </Typography>
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
        </>
    );
};
