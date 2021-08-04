// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getApplication, HttpResponseApplications2 } from '../api/api';
import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';

export const EnvironmentScreen: React.FunctionComponent = () => {
    const history = useHistory();

    const { applicationId } = useParams() as any;
    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplication(applicationId),
        ]).then(values => {
            const applicationData = values[0];
            setApplication(applicationData);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <h1>Application not found</h1>
            </>
        );
    }


    const nav = getDefaultMenu(history, application.id, '');

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer />
                </div>
            </div>

            <h1>Welcome</h1>
            <p>Todo</p>
            <ul>
                <li>Create new environment</li>
            </ul>
        </LayoutWithSidebar >
    );
};
