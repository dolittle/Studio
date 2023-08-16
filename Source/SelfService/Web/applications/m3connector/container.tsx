// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';

import { View as Overview } from './overview';
import { View as Details } from './details';
import { View as Setup } from './setup';

export type ContainerProps = {
    application: HttpResponseApplication;
};

// TODO PAV: Is this component even needed? Can this be moved to the parent component directly?
export const Container = ({ application }: ContainerProps) =>
    <>
        <Typography variant='h1' my={2}>M3 Connector</Typography>

        <Routes>
            <Route path='/overview' element={<Overview application={application} />} />
            <Route path='/:environment/setup' element={<Setup application={application} />} />
            <Route path='/:environment/details' element={<Details applicationId={application.id} />} />
        </Routes>
    </>;
