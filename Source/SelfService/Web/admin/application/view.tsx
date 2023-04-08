// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import {
    adminApplicationAccessAddUser,
    getAdminApplicationAccess,
    HttpInputApplicationAccess,
    adminApplicationAccessRemoveUser,
    HttpResponseApplicationAccess,
} from '../../apis/solutions/application';
import { Customer, getCustomer } from '../../apis/solutions/customer';

import { ButtonText } from '../../components/theme-legacy/buttonText';
import { TextField } from '../../components/theme-legacy/textField';

type ViewParams = {
    customerId: string;
    applicationId: string;
};

export const View = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId, applicationId } = useParams<ViewParams>();
    if (!customerId || !applicationId) return null;

    const [loaded, setLoaded] = useState(false);
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
            setLoaded(true);
        };

        fetchData().catch((e) => {
            setFetchDataError(true);
            // TODO could be better with the message
            enqueueSnackbar('Failed to get data from the server.', { variant: 'error' });
        });
    }, []);

    if (fetchDataError) {
        return (
            <>
                <p>Failed to fetch data</p>

                <ButtonText onClick={async () => {
                    const href = `/admin/customers`;
                    navigate(href);
                }}>Back to customers</ButtonText>
            </>
        );
    }

    if (!loaded) return null;

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
            <Typography variant='h1' my={2}>Customer {customer.name}</Typography>

            <ButtonText onClick={async () => {
                const href = `/admin/customer/${customerId}`;
                navigate(href);
            }}>Back to customer</ButtonText>

            <Typography variant='h1' my={2}>Application {accessInfo.name}</Typography>
            <Typography variant='h2' my={2}>Access View</Typography>

            <TextField id="userEmail"
                label='Email'
                placeholder=""
                value={userEmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value!;
                    setUserEmail(newValue);
                }}
            />

            <ButtonText onClick={handleAddEmail}>Add User</ButtonText>

            <ul>
                {accessInfo.users.map(user => {
                    return (
                        <li key={user.email}>
                            <span>{user.email}</span>
                            <ButtonText onClick={() => handleRemoveEmail(user.email)}>Remove User</ButtonText>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
