// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import {
    Route,
    Switch,
    useHistory,
} from 'react-router-dom';

import { Create as CreateCustomer } from '../customer/create';
import { ViewAll as ViewAllCustomers } from '../customer/viewAll';
import { View as ViewCustomer } from '../customer/view';
import { View as ViewApplicationAccess } from '../admin/application/view';
import { Button as ThemedButton } from '../theme/button';

import {
    LayoutWithSidebar,
} from '../layout/layoutWithSidebar';



export const Screen: React.FunctionComponent = () => {
    const history = useHistory();
    const nav = [];


    const welcome = (
        <>
            <h1>Hello Admin</h1>
            <ThemedButton onClick={() => {
                const href = `/admin/customers`;
                history.push(href);
            }}>Take me to the Customers</ThemedButton>
        </>
    );

    return (
        <LayoutWithSidebar navigation={nav}>
            <Switch>

                <Route exact path="/admin/customer/create">
                    <CreateCustomer />
                </Route>

                <Route exact path="/admin/customers">
                    <ViewAllCustomers />
                </Route>

                <Route exact path="/admin/customer/:customerId">
                    <ViewCustomer />
                </Route>

                <Route exact path="/admin/customer/:customerId/application/:applicationId/user/access">
                    <ViewApplicationAccess />
                </Route>

                <Route exact path="/admin/">
                    {welcome}
                </Route>

            </Switch>

        </LayoutWithSidebar >
    );
};
