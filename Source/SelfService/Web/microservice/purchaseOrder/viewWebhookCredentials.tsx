// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RowWithLink } from './rowWithLink';

type Props = {
    authorization: string
};

const styles = {
    iconRoot: {
        padding: 0,
        paddingLeft: 10,
        marginRight: 1,
    },
    icon: {
        fill: '#6678F6',
    },
};

export const ViewWebhookCredentials: React.FunctionComponent<Props> = (props) => {
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
            <Typography component="p">
                Username
            </Typography>

            <Typography component="p">
                {username}
            </Typography>
        </Box>

        <Box px={0} mx={0} py={1}>
            <RowWithLink
                title='Password'
                prefix={
                    <Typography component="p">
                        {password}
                    </Typography>
                }
                suffix={
                    <Box m={-1.2}>
                        <IconButton
                            onClick={() => {
                                togglePassword();
                            }}
                            sx={styles.iconRoot}
                            size="large">
                            <VisibilityIcon sx={styles.icon} />
                        </IconButton>
                    </Box>
                }
            />
        </Box >
    </>;
};
