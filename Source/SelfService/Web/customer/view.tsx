// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { getCustomer, CustomerDetailed } from '../api/customer';
import { saveStudioConfig, Studio } from '../api/studio';
import { ButtonText } from '../theme/buttonText';
import { Box } from '@mui/material';

const styles = {
    root: {
        width: '100%',
    },
    button: {
        marginTop: 1,
        marginRight: 1,
    },
    actionsContainer: {
        marginBottom: 2,
    },
    resetContainer: {
        padding: 3,
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
        '&.MuiStepIcon-root.Mui-active': {
            color: '#6678F6'
        },
        '&.MuiStepIcon-root.Mui-completed': {
            color: '#6678F6'
        },
        '&.MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
            fill: '#B3BBFB'
        },
        '&.MuiStepIcon-root .MuiStepIcon-text': {
            fill: '#93959F'
        }
    }
};

export const View: React.FunctionComponent<any> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId } = useParams();
    //const [configLoaded, setConfigLoaded] = useState(false);
    const [customerLoaded, setCustomerLoaded] = useState(false);
    const [config, setConfig] = useState({} as Studio);
    const [customer, setCustomer] = useState({} as CustomerDetailed);
    const [toggleConfig, setToggleConfig] = useState(false);

    useEffect(() => {
        getCustomer(customerId)
            .then(customer => {

                setCustomer(customer);
                setConfig(customer.studioConfig);
                setCustomerLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting customers data from the server', { variant: 'error' });
            });
    }, [toggleConfig]);

    if (!customerLoaded) {
        return null;
    }

    const displayDisabledEnvironments = (environments: string[]) => {
        if (!environments.length) {
            return 'none';
        }
        return <ul>
            {environments.map(environment => {
                return <li key={`${environment}`}>{environment}</li>;
            })}
        </ul>;
    };

    return (
        <>
            <h1>Customer {customer.customer.name}</h1>
            <Box sx={styles.root}>
                <ul>
                    <li>
                        Customer ID: {customerId}
                    </li>
                    <li>
                        Build overwrite: {String(customer.studioConfig.buildOverwrite)}
                    </li>
                    <li>
                        Can create applications: {String(customer.studioConfig.canCreateApplication)}
                    </li>
                    <li>
                        Disabled environments: {displayDisabledEnvironments(customer.studioConfig.disabledEnvironments)}
                    </li>
                </ul>
                <ButtonText
                    onClick={() => {
                        customer.studioConfig.disabledEnvironments = customer.studioConfig.disabledEnvironments.length ? [] : ['*'];

                        saveStudioConfig(customerId, config)
                            .then(result => {
                                if (!result) {
                                    enqueueSnackbar('Failed saving the config', { variant: 'error' });
                                    return;
                                }
                                setToggleConfig(!toggleConfig);
                                enqueueSnackbar('Save successfull', { variant: 'info' });
                            })
                            .catch(error => {
                                console.log(error);
                                enqueueSnackbar('Failed saving the config', { variant: 'error' });
                            });
                    }}>
                    {customer.studioConfig.disabledEnvironments.length ? 'Enable all environments' : 'Disable all environments'}
                </ButtonText>

                <h1>Applications</h1>

                <ul>
                    {[...new Set(customer.applications.map(application => {
                        return {
                            id: application.id,
                            name: application.name,
                        };
                    }))].map((application) => {
                        return (<>
                            <h2 key={`${application.id}`}>{application.name} ({application.id})</h2>
                            <ButtonText
                                onClick={() => {
                                    const href = `/admin/customer/${customerId}/application/${application.id}/user/access`;
                                    history.push(href);
                                }}
                            >
                                View Access
                            </ButtonText>
                        </>);
                    })}
                </ul>
            </Box>
        </>
    );
};
