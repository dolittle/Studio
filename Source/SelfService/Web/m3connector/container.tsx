// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { HttpResponseApplication } from '../api/application';

import { View as Overview } from './overview';
import { View as Details } from './details';
import { View as Setup } from './setup';

import { Typography } from '@mui/material';

type ContainerProps = {
    application: HttpResponseApplication;
};

export const Container = ({ application }: ContainerProps) =>
    <>
        <Typography variant='h1' my={2}>M3 Connector</Typography>
        <Routes>
            <Route exact path="/m3connector/application/:applicationId/overview">
                <Overview application={application} />
            </Route>
            <Route exact path="/m3connector/application/:applicationId/:environment/setup">
                <Setup application={application} />
            </Route>

            <Route exact path="/m3connector/application/:applicationId/:environment/details">
                <Details applicationId={application.id} />
            </Route>
        </Routes>
    </>;
