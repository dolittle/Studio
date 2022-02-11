// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';


import { Create as CreateCustomer } from '../customer/create';
import { ViewAll as ViewAllCustomers } from '../customer/viewAll';
import {
    LayoutWithSidebar,
} from '../layout/layoutWithSidebar';



export const Screen: React.FunctionComponent = () => {
    const nav = [];


    return (
        <LayoutWithSidebar navigation={nav}>
            <Switch>

                <Route exact path="/admin/customer/create">
                    <CreateCustomer />
                </Route>

                <Route exact path="/admin/customers">
                    <ViewAllCustomers />
                </Route>


            </Switch>

        </LayoutWithSidebar >
    );
};
