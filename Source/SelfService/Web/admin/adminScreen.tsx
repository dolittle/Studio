// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { WorkSpaceLayoutWithSidePanel } from '../components/layout/workSpaceLayout';
import { Create as CreateCustomer } from './customer/create';
import { ViewAll as ViewAllCustomers } from './customer/viewAll';
import { View as ViewCustomer } from './customer/view';
import { View as ViewApplicationAccess } from './application/view';

const welcome = (
    <>
        <Typography variant='h1' my={2}>Hello Admin</Typography>
        <Button
            label='Take me to the Customers'
            variant='filled'
            endWithIcon='KeyboardDoubleArrowRight'
            overrides={{
                component: Link,
                to: '/admin/customers'
            }}
        />
    </>
);

export const Screen = () =>
    <WorkSpaceLayoutWithSidePanel pageTitle='Administrator' sidePanelMode='applications'>
        <Routes>
            <Route path='/' element={welcome} />
            <Route path='/customers' element={<ViewAllCustomers />} />
            <Route path='/customer/create' element={<CreateCustomer />} />
            <Route path='/customer/:customerId' element={<ViewCustomer />} />
            <Route path='/customer/:customerId/application/:applicationId/user/access' element={<ViewApplicationAccess />} />
        </Routes>
    </WorkSpaceLayoutWithSidePanel>;

