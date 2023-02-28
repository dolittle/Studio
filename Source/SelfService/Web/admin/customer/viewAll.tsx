// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useEffect,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getCustomers, Customers } from '../../api/solutions/customer';
import { ButtonText } from '../../components/theme-legacy/buttonText';
import { Typography } from '@mui/material';


type Props = {

};

export const ViewAll: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [loaded, setLoaded] = useState(false);
    const [customers, setCustomers] = useState([] as Customers);

    useEffect(() => {
        getCustomers()
            .then(customers => {

                setCustomers(customers);
                setLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
            });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <ButtonText
                onClick={() => {
                    const href = `/admin/customer/create`;
                    navigate(href);
                }}>
                Create new Customer
            </ButtonText>

            <Typography variant='h1' my={2}>View Customers</Typography>

            <ul>
                {customers.map((customer) => {
                    return <li key={`${customer.id}`}>

                        <ButtonText
                            onClick={() => {
                                const href = `/admin/customer/${customer.id}`;
                                navigate(href);
                            }}
                        >
                            {customer.name} ({customer.id})
                        </ButtonText>
                    </li>;
                })}
            </ul>
        </>
    );
};
