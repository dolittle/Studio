// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { applicationAccessAddUser, getApplicationAccess, HttpInputApplicationAccess, applicationAccessRemoveUser } from '../../api/application';
import { ButtonText } from '../../theme/buttonText';
import { TextField } from '../../theme/textField';
import { Customer, getCustomer } from '../../api/customer';

export const View: React.FunctionComponent<any> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const { customerId, applicationId } = useParams();

    const [loaded, setLoaded] = useState(false);
    const [fetchDataError, setFetchDataError] = useState(false);
    const [users, setUsers] = useState([] as HttpInputApplicationAccess[]);
    const [customer, setCustomer] = useState({} as Customer);

    const [userEmail, setUserEmail] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all([
                getCustomer(customerId),
                getApplicationAccess(applicationId)
            ]);
            setCustomer(data[0].customer);
            setUsers(data[1].users);
            setLoaded(true);
        };

        fetchData().catch((e) => {
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


    return (
        <>
            <h1>Customer {customer.name}</h1>
            <ButtonText onClick={async () => {
                const href = `/admin/customer/${customerId}`;
                history.push(href);
            }}>Back to customer</ButtonText>


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
                if (userEmail === '') {
                    enqueueSnackbar('Email is empty', { variant: 'error' });
                    return;
                }

                const input: HttpInputApplicationAccess = {
                    email: userEmail,
                };

                try {
                    await applicationAccessAddUser(applicationId, input);
                    const access = await getApplicationAccess(applicationId);
                    setUsers(access.users);
                    setUserEmail('');
                } catch (e) {
                    enqueueSnackbar(e.message, { variant: 'error' });
                }
            }}>Add User</ButtonText>

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
                                    enqueueSnackbar(e.message, { variant: 'error' });
                                }
                            }}>Remove User</ButtonText>
                        </li>);
                })}
            </ul>
        </>
    );
};
