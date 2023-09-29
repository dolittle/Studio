// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ListItem, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { getCustomer, CustomerDetailed } from '../apis/solutions/customer';
import { saveStudioConfig, Studio } from '../apis/solutions/studio';

const displayDisabledEnvironments = (environments: string[]) => {
    if (!environments.length) return 'none';

    return (
        <ul>
            {environments.map((environment, index) => <ListItem key={index}>{environment}</ListItem>)}
        </ul>
    );
};

type CustomerViewParams = {
    customerId: string;
};

export const CustomerView = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { customerId } = useParams<CustomerViewParams>();

    if (!customerId) return null;

    const [config, setConfig] = useState({} as Studio);
    const [customer, setCustomer] = useState({} as CustomerDetailed);
    const [toggleConfig, setToggleConfig] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getCustomer(customerId)
            .then(customer => {
                setCustomer(customer);
                setConfig(customer.studioConfig);
                setIsLoaded(true);
            })
            .catch(() => {
                enqueueSnackbar('Failed getting customers data from the server.', { variant: 'error' });
            });
    }, [toggleConfig]);

    if (!isLoaded) return null;

    // Beautiful hot mess, to take application + environment and shape it to have unique applications with a list of environments.
    const applications = [...new Set(
        customer.applications
            .filter((application, index) => customer.applications.findIndex(index => application.id === index.id) === index)
            .map(application => {
                return {
                    id: application.id,
                    name: application.name,
                    environments: [] as string[],
                };
            })
    )].map(application => {
        application.environments = customer.applications.filter(a => a.id === application.id).map(application => application.environment);
        return application;
    });

    const handleEnvironmentToggle = () => {
        customer.studioConfig.disabledEnvironments = customer.studioConfig.disabledEnvironments.length ? [] : ['*'];

        saveStudioConfig(customerId, config)
            .then(result => {
                if (!result) {
                    enqueueSnackbar('Failed saving the config.', { variant: 'error' });
                    return;
                }
                setToggleConfig(!toggleConfig);
                enqueueSnackbar('Save successfull.', { variant: 'info' });
            })
            .catch(error => {
                console.log(error);
                enqueueSnackbar('Failed saving the config.', { variant: 'error' });
            });
    };

    return (
        <>
            <Typography variant='h1' my={2}>Customer: {customer.customer.name}</Typography>

            <ul>
                <ListItem>Customer ID: {customerId}</ListItem>
                <ListItem>Build overwrite: {String(customer.studioConfig.buildOverwrite)}</ListItem>
                <ListItem>Can create applications: {String(customer.studioConfig.canCreateApplication)}</ListItem>
                <ListItem>Disabled environments: {displayDisabledEnvironments(customer.studioConfig.disabledEnvironments)}</ListItem>
            </ul>

            <Button
                label={customer.studioConfig.disabledEnvironments.length ? 'Enable all environments' : 'Disable all environments'}
                onClick={handleEnvironmentToggle}
            />

            <Typography variant='h2' my={2}>Applications</Typography>

            {applications.map(application =>
                <>
                    <Typography variant='h3' my={2} key={`${application.id}`}>{application.name} ({application.id})</Typography>

                    <Button
                        label='View Access'
                        variant='filled'
                        endWithIcon='KeyboardDoubleArrowRight'
                        overrides={{
                            component: Link,
                            to: `/admin/customer/${customerId}/application/${application.id}/user/access`,
                        }}
                    />

                    <Typography variant='h4' my={2}>Environments</Typography>
                    <ul>
                        {application.environments.map((environment, index) => <ListItem key={index}>{environment}</ListItem>)}
                    </ul>
                </>
            )}
        </>
    );
};
