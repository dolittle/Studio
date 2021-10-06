// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState, useEffect } from 'react';
import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { GeneratePassword } from './generatePassword';
import { Button } from '../../theme/button';


type Props = {
    authorization: string
    classes: ClassNameMap<any>
    onCancel: () => void;
};

export const EditWebhookCredentials: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const classes = props!.classes;
    const credentials = getCredentialsFromBasicAuth(props!.authorization);
    const [username, setUsername] = useState(credentials.username);
    const [password, setPassword] = useState(credentials.password);
    const [showPassword, setShowPassword] = useState(false);
    const [saveProtection, setSaveProtection] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (saveProtection) {
            // TODO Bring modal into play
            enqueueSnackbar('TODO: Unsaved changes, change to modal', { variant: 'warning' });
        }
    });


    return (
        <>
            <Typography component="p" className={classes.label}>
                Username
            </Typography>


            <TextField
                required
                id='outlined-required'
                label='Username'
                variant='outlined'
                className={classes.textField}
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value!);
                    setSaveProtection(true);
                }}
            />


            <Typography component="p" className={classes.label}>
                Password
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <TextField
                        required
                        id='outlined-password-input'
                        type={showPassword ? 'text' : 'password'}
                        label='Password'
                        autoComplete='current-password'
                        variant='outlined'
                        className={classes.textField}
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value!);
                            setSaveProtection(true);
                        }}
                    />
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

                    <GeneratePassword password={password} setPassword={(newPassword) => {
                        setPassword(newPassword);
                        setSaveProtection(true);
                    }}
                    />
                </Grid>
            </Grid>

            <div className={classes.actionsContainer}>
                <div>
                    <Button
                        onClick={() => {
                            if (saveProtection) {
                                enqueueSnackbar('TODO: cancel', { variant: 'warning' });
                            }
                            props!.onCancel();
                        }}
                        disabled={false}
                        buttonType='secondary'
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            enqueueSnackbar('TODO: save', { variant: 'warning' });
                        }}
                        disabled={false}
                        buttonType='primary'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
};
