// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import { ApplicationScreen } from './screens/applicationScreen';
import { ApplicationsScreen } from './screens/applicationsScreen';

import { uriWithAppPrefix } from './store';
import { LoginScreen } from './screens/loginScreen';


export const App = () => {

    // I wonder if I can use a catchall Route?
    // Little hack to force redirect
    if (['', '/', uriWithAppPrefix('/')].includes(window.location.pathname)) {
        window.location.href = uriWithAppPrefix('/applications');
        return (<></>);
    }

    return (
        <>
            <BrowserRouter basename={uriWithAppPrefix('')}>
                <Route exact path="/login">
                    <LoginScreen />
                </Route>

                <Route exact path="/applications">
                    <ApplicationsScreen />
                </Route>

                <Route path="/application/:applicationId/:environment">
                    <ApplicationScreen />
                </Route>

            </BrowserRouter>
        </>
    );
};
