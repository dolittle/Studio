// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ListItem, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { getCustomers, Customers } from '../../apis/solutions/customer';

export const ViewAll = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [loaded, setLoaded] = useState(false);
    const [customers, setCustomers] = useState([] as Customers);

    useEffect(() => {
        getCustomers()
            .then(customers => {
                setCustomers(customers);
                setLoaded(true);
            }).catch(error => {
                console.log(error);
                enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
            });
    }, []);

    if (!loaded) return null;

    return (
        <>
            <Typography variant='h1' my={2}>View Customers</Typography>

            <ul>
                {customers.map(customer =>
                    <ListItem key={`${customer.id}`}>
                        <Button
                            label={`${customer.name} (${customer.id})`}
                            overrides={{
                                component: Link,
                                to: `/admin/customer/${customer.id}`
                            }}
                        />
                    </ListItem>
                )}
            </ul>

            <Button
                label='Create new Customer'
                variant='fullwidth'
                startWithIcon='AddCircle'
                overrides={{
                    component: Link,
                    to: '/admin/customer/create',
                }}
            />
        </>
    );
};
