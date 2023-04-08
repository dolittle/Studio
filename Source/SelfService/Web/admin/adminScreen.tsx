// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, Routes, useNavigate, } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { Create as CreateCustomer } from './customer/create';
import { ViewAll as ViewAllCustomers } from './customer/viewAll';
import { View as ViewCustomer } from './customer/view';
import { View as ViewApplicationAccess } from './application/view';
import { LayoutWithSidebar } from '../components/layout/layoutWithSidebar';

export const Screen: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const nav = [];

    const welcome = (
        <>
            <Typography variant='h1' my={2}>Hello Admin</Typography>
            <Button
                label='Take me to the Customers'
                variant='filled'
                endWithIcon='KeyboardDoubleArrowRight'
                onClick={() => {
                    const href = `/admin/customers`;
                    navigate(href);
                }}
            />
        </>
    );

    return (
        <LayoutWithSidebar navigation={nav}>
            <Routes>
                <Route path="/" element={welcome} />
                <Route path="/customers" element={<ViewAllCustomers />} />
                <Route path="/customer/create" element={<CreateCustomer />} />
                <Route path="/customer/:customerId" element={<ViewCustomer />} />
                <Route path="/customer/:customerId/application/:applicationId/user/access" element={<ViewApplicationAccess />} />
            </Routes>
        </LayoutWithSidebar>
    );
};
