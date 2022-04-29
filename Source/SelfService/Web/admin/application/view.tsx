// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { adminApplicationAccessAddUser, getAdminApplicationAccess, HttpInputApplicationAccess, adminApplicationAccessRemoveUser, HttpResponseApplicationAccess } from '../../api/application';
import { ButtonText } from '../../theme/buttonText';
import { TextField } from '../../theme/textField';
import { Customer, getCustomer } from '../../api/customer';

export const View: React.FunctionComponent<any> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId, applicationId } = useParams();

    const [loaded, setLoaded] = useState(false);
    const [fetchDataError, setFetchDataError] = useState(false);
    const [accessInfo, setAccessInfo] = useState({} as HttpResponseApplicationAccess);
    const [customer, setCustomer] = useState({} as Customer);

    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all([
                getCustomer(customerId),
                getAdminApplicationAccess(customerId, applicationId)
            ]);
            setCustomer(data[0].customer);
            setAccessInfo(data[1]);
            setLoaded(true);
        };

        fetchData().catch((e) => {
            setFetchDataError(true);
            // TODO could be better with the message
            enqueueSnackbar('Failed to get data from the server', { variant: 'error' });
        });
    }, []);

    if (fetchDataError) {
        return (
            <>
                <p>Failed to fetch data</p>
                <ButtonText onClick={async () => {
                    const href = `/admin/customers`;
                    history.push(href);
                }}>Back to customers</ButtonText>
            </>
        );
    }

    if (!loaded) {
        return null;
    }

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
            enqueueSnackbar('Access granted, email added', { variant: 'info' });
        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' });
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
            enqueueSnackbar('Access revoked, email removed', { variant: 'info' });
        } catch (e) {
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    };

    return (
        <>
            <h1>Customer {customer.name}</h1>
            <ButtonText onClick={async () => {
                const href = `/admin/customer/${customerId}`;
                history.push(href);
            }}>Back to customer</ButtonText>


            <h1>Application {accessInfo.name}</h1>
            <h2>Access View</h2>

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
                        </li>);
                })}
            </ul>
        </>
    );
};
