// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { getCredentialsFromBasicAuth } from '../../utils/httpCredentials';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GeneratePassword } from './generatePassword';
import { Button } from '../../theme/button';
import { ButtonText } from '../../theme/buttonText';
import { TextField } from '../../theme/textField';


type Props = {
    authorization: string;
    onCancel: () => void;
};

const styles = {
    actionsContainer: {
        marginBottom: 2,
    },
    iconRoot: {
        padding: 0,
        paddingLeft: 10,
        marginRight: 1,
    },
    icon: {
        fill: '#6678F6',
    },
<<<<<<< HEAD
    textField: { //https://stackoverflow.com/a/60461876 excellent resource
        '& .MuiOutlinedInput-input': {
            color: 'white'
        },
        '& .MuiInputLabel-root': {
            color: 'white'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            color: 'white',
            borderColor: theme => theme.palette.text.secondary
        },
        '&:hover .MuiOutlinedInput-input': {
            color: 'white'
        },
    }
=======
>>>>>>> main
};


export const EditWebhookCredentials: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();

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


    return <>
        <Typography component="p">
            Username
        </Typography>


        <TextField
            required
            id='outlined-required'
            label='Username'
<<<<<<< HEAD
            variant='outlined'
            sx={styles.textField}
=======
>>>>>>> main
            value={username}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value!);
                setSaveProtection(true);
            }}
        />


        <Typography component="p">
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
<<<<<<< HEAD
                    variant='outlined'
                    sx={styles.textField}
=======
>>>>>>> main
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
                <IconButton
                    onClick={() => {
                        togglePassword();
                    }}
                    sx={styles.iconRoot}
                    size="large">
                    <VisibilityIcon color='primary' sx={styles.icon} />
                </IconButton>

                <GeneratePassword password={password} setPassword={(newPassword) => {
                    setPassword(newPassword);
                    setSaveProtection(true);
                }}
                />
            </Grid>
        </Grid>

        <Box sx={styles.actionsContainer}>
            <div>
                <ButtonText
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
                </ButtonText>
                <Button
                    onClick={() => {
                        enqueueSnackbar('TODO: save', { variant: 'warning' });
                    }}
                    disabled={false}
                >
                    Save
                </Button>
            </div>
        </Box>
    </>;
};
