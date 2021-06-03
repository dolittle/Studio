// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from '@fluentui/react/lib/List';
import { Link } from '@fluentui/react';

import { getApplications, HttpResponseApplications, ShortInfoWithEnvironment } from '../api/api';
import { uriWithAppPrefix } from '../store';


export const ApplicationsScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const [data, setData] = useState({
        id: '',
        name: '',
        applications: []
    } as HttpResponseApplications);

    // TODO handle when not 200!
    useEffect(() => {
        getApplications().then(data => {
            // If only 1 item redirect
            if (data.applications.length === 1) {
                const application = data.applications[0];
                window.location.href = uriWithAppPrefix(`/application/${application.id}/${application.environment}/microservices/overview`);
                return;
            }
            setData(data);
            return;
        });
    }, []);


    if (data.id === '') {
        return null;
    }


    const onRenderCell = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const application = item!;
        return (
            <Link onClick={() => {
                // This is annoying as balls
                const href = `/application/${application.id}/${application.environment}/microservices/overview`;
                history.push(href);
            }}
                underline>
                {application.name} {application.environment}
            </Link>
        );
    };

    return (
        <>
            <h1>Applications Screen</h1>

            <List items={data.applications} onRenderCell={onRenderCell} />
        </>
    );
};
