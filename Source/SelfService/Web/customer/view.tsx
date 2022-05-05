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

    // Beautiful hot mess, to take application + environment and shape it to have unique applications with a list of environments
    const applications = [...new Set(
        customer.applications.
            filter((a, i) => customer.applications.
                findIndex((b) => a.id === b.id) === i).
            map(application => {
                return {
                    id: application.id,
                    name: application.name,
                    environments: [] as string[]
                };
            })
    )].map(application => {
        application.environments = customer.applications.filter((a, i) => a.id === application.id).map(application => application.environment);
        return application;
    });

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

                <h2>Applications</h2>

                <div>
                    {applications.map((application) => {
                        return (<>
                            <h1 key={`${application.id}`}>{application.name} ({application.id})</h1>
                            <ButtonText
                                onClick={() => {
                                    const href = `/admin/customer/${customerId}/application/${application.id}/user/access`;
                                    history.push(href);
                                }}
                            >
                                View Access
                            </ButtonText>

                            <h3>Environments</h3>
                            <ul>
                                {application.environments.map((environment) => {
                                    return (
                                        <>
                                            <li>{environment}</li>
                                        </>
                                    );
                                })}
                            </ul>
                        </>);
                    })}
                </div>
            </Box>
        </>
    );
};
