// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { WorkSpaceLayoutWithSidePanel } from '../layout/workSpaceLayout';
import { Welcome } from './Welcome';
import { AllCustomersView } from './AllCustomersView';
import { CreateCustomer } from './CreateCustomer';
import { CustomerView } from './CustomerView';
import { ApplicationAccessView } from './ApplicationAccessView';

export const AdminIndex = () =>
    <WorkSpaceLayoutWithSidePanel pageTitle='Administrator' sidePanelMode='applications'>
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/customers' element={<AllCustomersView />} />
            <Route path="/customer/create" element={<CreateCustomer />} />
            <Route path='/customer/:customerId' element={<CustomerView />} />
            <Route path='/customer/:customerId/application/:applicationId/user/access' element={<ApplicationAccessView />} />
        </Routes>
    </WorkSpaceLayoutWithSidePanel>;
