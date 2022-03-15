// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Customer, getCustomers } from '../api/customer';
import { getStudioConfig, saveStudioConfig, Studio } from '../api/studio';
import { ButtonText } from '../theme/buttonText';

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
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId } = useParams();
    const [configLoaded, setConfigLoaded] = useState(false);
    const [customerLoaded, setCustomerLoaded] = useState(false);
    const [config, setConfig] = useState({} as Studio);
    const [customer, setCustomer] = useState({} as Customer);
    const [toggleConfig, setToggleConfig] = useState(false);

    useEffect(() => {
        getCustomers()
            .then(customers => {
                const customer = customers.find(customer => customer.id === customerId);
                if (!customer) {
                    enqueueSnackbar('No customer with the given id found', { variant: 'error' });
                    return;
                }

                setCustomer(customer);
                setCustomerLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting customers data from the server', { variant: 'error' });
            });
    }, []);

    useEffect(() => {
        getStudioConfig(customerId)
            .then(config => {
                setConfig(config);
                setConfigLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting customers studio config from the server', { variant: 'error' });
            });
    }, [toggleConfig]);

    if (!configLoaded || !customerLoaded) {
        return null;
    }

    return (
        <>
            <h1>Customer {customer.name}</h1>
            <div className={classes.root}>
                <ul>
                    <li>
                        Customer ID: {customerId}
                    </li>
                    <li>
                        Build overwrite: {String(config.buildOverwrite)}
                    </li>
                    <li>
                        Can create applications: {String(config.canCreateApplication)}
                    </li>
                    <li>
                        Disabled environments: {config.disabledEnvironments}
                    </li>
                </ul>
                <ButtonText
                    onClick={() => {
                        config.disabledEnvironments = config.disabledEnvironments.length ? [] : ['*'];

                        saveStudioConfig(customerId, config)
                            .then(result => {
                                if (!result) {
                                    enqueueSnackbar('Failed saving the config', { variant: 'error' });
                                    return;
                                }
                                setToggleConfig(!toggleConfig);
                            })
                            .catch(error => {
                                console.log(error);
                                enqueueSnackbar('Failed saving the config', { variant: 'error' });
                            });
                    }}>
                    {config.disabledEnvironments.length ? 'Enable all environments' : 'Disable all environments'}
                </ButtonText>
            </div>
        </>
    );
};
