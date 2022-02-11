// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useEffect,
    useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getCustomers, Customers } from '../api/customer';
import { ButtonText } from '../theme/buttonText';


type Props = {

};


export const ViewAll: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [loaded, setLoaded] = useState(false);
    const [customers, setCustomers] = useState([] as Customers);

    useEffect(() => {
        Promise.all([
            getCustomers(),
        ]).then(values => {
            const applicationsData = values[0];

            setCustomers(values[0]);
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
                    history.push(href);
                }}>
                Create new Customer
            </ButtonText>

            <h1>View Customers</h1>

            <ul>
                {customers.map((customer) => {
                    return <li key={`${customer.id}`}>
                        <p>{customer.name} ({customer.id})</p>
                    </li>;
                })}
            </ul>
        </>
    );
};
