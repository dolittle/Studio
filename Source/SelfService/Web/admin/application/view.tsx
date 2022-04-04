// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';


import { applicationAccessAddUser, getApplicationAccess, HttpInputApplicationAccess, applicationAccessRemoveUser } from '../../api/application';
import { ButtonText } from '../../theme/buttonText';
import { TextField } from '../../theme/textField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        inactiveText: {
            color: '#93959F',
        },
        progressBar: {
            color: '#ff9366',
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
                borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-input': {
                color: 'white'
            },
        },
        stepIcon: {
            'color': '#3B3D48',
            '&.MuiStepIcon-active': {
                color: '#6678F6'
            },
            '&.MuiStepIcon-completed': {
                color: '#6678F6'
            },
            '&.MuiStepIcon-active .MuiStepIcon-text': {
                fill: '#B3BBFB'
            },
            '&.MuiStepIcon-root .MuiStepIcon-text': {
                fill: '#93959F'
            }
        }
    })
);

export const View: React.FunctionComponent<any> = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId, applicationId } = useParams();

    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([] as HttpInputApplicationAccess[]);
    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {
        getApplicationAccess(applicationId)
            .then(access => {
                setUsers(access.users);
                setLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting user list from the server', { variant: 'error' });
            });
    }, []);

    if (!loaded) {
        return null;
    }


    return (
        <>
            <h1>Application Access View</h1>
            <TextField id="userEmail"
                label='Email'
                placeholder=""
                value={userEmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value!;
                    setUserEmail(newValue);
                }}
            />
            <ButtonText onClick={async () => {
                const input: HttpInputApplicationAccess = {
                    email: userEmail,
                };

                try {
                    await applicationAccessAddUser(applicationId, input);
                    const access = await getApplicationAccess(applicationId);
                    setUsers(access.users);
                    setUserEmail('');
                } catch (e) {
                    enqueueSnackbar('Failed to add user', { variant: 'error' });
                }
            }}>Add User</ButtonText>

            <div className={classes.root}>
                <ul>
                    {users.map(user => {
                        return (
                            <li key={user.email}>
                                <span>{user.email}</span>
                                <ButtonText onClick={async () => {
                                    const input: HttpInputApplicationAccess = {
                                        email: user.email
                                    };

                                    try {
                                        await applicationAccessRemoveUser(applicationId, input);
                                        const access = await getApplicationAccess(applicationId);
                                        setUsers(access.users);
                                    } catch (e) {
                                        enqueueSnackbar('Failed to remove user', { variant: 'error' });
                                    }
                                }}>Remove User</ButtonText>
                            </li>);
                    })}
                </ul>
            </div>
        </>
    );
};
