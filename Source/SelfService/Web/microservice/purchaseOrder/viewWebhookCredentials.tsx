// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';

import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ClassNameMap } from '@mui/styles/withStyles';
import { RowWithLink } from './rowWithLink';

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

    return <>
        <Box px={0} mx={0} py={1}>
            <Typography component="p" className={classes.label}>
                Username
            </Typography>

            <Typography component="p" className={classes.data}>
                {username}
            </Typography>
        </Box>

        <Box px={0} mx={0} py={1}>
            <RowWithLink
                title='Password'
                prefix={
                    <Typography component="p" className={classes.data}>
                        {password}
                    </Typography>
                }
                suffix={
                    <Box m={-1.2}>
                        <IconButton
                            onClick={() => {
                                togglePassword();
                            }}
                            className={classes.iconRoot}
                            size="large">
                            <VisibilityIcon className={classes.icon} />
                        </IconButton>
                    </Box>
                }
            />
        </Box >
    </>;
};
