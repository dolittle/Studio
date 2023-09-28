// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { Button, TextField } from '@dolittle/design-system';

import {
    adminApplicationAccessAddUser,
    getAdminApplicationAccess,
    HttpInputApplicationAccess,
    adminApplicationAccessRemoveUser,
    HttpResponseApplicationAccess,
} from '../../apis/solutions/application';
import { Customer, getCustomer } from '../../apis/solutions/customer';

type ViewParams = {
    customerId: string;
    applicationId: string;
};

export const ApplicationAccessView = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { customerId, applicationId } = useParams<ViewParams>();

    if (!customerId || !applicationId) return null;

    const [isLoaded, setIsLoaded] = useState(false);
    const [fetchDataError, setFetchDataError] = useState(false);
    const [accessInfo, setAccessInfo] = useState({} as HttpResponseApplicationAccess);
    const [customer, setCustomer] = useState({} as Customer);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all([
                getCustomer(customerId),
                getAdminApplicationAccess(customerId, applicationId),
            ]);

            setCustomer(data[0].customer);
            setAccessInfo(data[1]);
            setIsLoaded(true);
        };

        fetchData().catch(() => {
            setFetchDataError(true);
            enqueueSnackbar('Failed to get data from the server.', { variant: 'error' });
        });
    }, []);

    const handleBackToCustomers = () => {
        const href = '/admin/customers';
        navigate(href);
    };

    const handleBackToCustomer = () => {
        const href = `/admin/customer/${customerId}`;
        navigate(href);
    };

    if (fetchDataError) {
        return (
            <>
                <Typography sx={{ mb: 3 }}>Failed to fetch data.</Typography>
                <Button label='Back to customers' variant='filled' startWithIcon='ArrowBack' onClick={handleBackToCustomers} />
            </>
        );
    }

    if (!isLoaded) return null;

    const handleAddEmail = async () => {
        if (userEmail === '') {
            enqueueSnackbar('Email is empty', { variant: 'error' });
            return;
        }

        const input: HttpInputApplicationAccess = {
            email: userEmail,
        };

        try {
            await adminApplicationAccessAddUser(customerId, applicationId, input);
            const access = await getAdminApplicationAccess(customerId, applicationId);
            setAccessInfo(access);
            setUserEmail('');
            enqueueSnackbar('Access granted, email added.', { variant: 'info' });
        } catch (error: unknown) {
            const message = (error instanceof Error) ? error.message : 'Something went wrong when adding email.';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    const handleRemoveEmail = async (email: string) => {
        const input: HttpInputApplicationAccess = {
            email,
        };

        try {
            await adminApplicationAccessRemoveUser(customerId, applicationId, input);
            const access = await getAdminApplicationAccess(customerId, applicationId);
            setAccessInfo(access);
            enqueueSnackbar('Access revoked, email removed.', { variant: 'info' });
        } catch (error: unknown) {
            const message = (error instanceof Error) ? error.message : 'Something went wrong when removing email.';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    return (
        <>
            <Typography variant='h1' my={2}>Customer: {customer.name}</Typography>
            <Button label='Back to customer' variant='filled' startWithIcon='ArrowBack' onClick={handleBackToCustomer} />
            <Typography variant='h1' my={4}>Application: {accessInfo.name}</Typography>

            <Typography variant='h2' my={4}>Access View</Typography>

            <TextField
                label='Email'
                value={userEmail}
                onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value!;
                    setUserEmail(newValue);
                }}
            />

            <Button label='Add User' startWithIcon='AddCircle' onClick={handleAddEmail} />

            <ul>
                {accessInfo.users.map(user => {
                    return (
                        <li key={user.email}>
                            <span>{user.email}</span>
                            <Button label='Remove User' onClick={() => handleRemoveEmail(user.email)} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
