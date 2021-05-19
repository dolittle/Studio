// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { List } from '@fluentui/react/lib/List';
import { Link } from '@fluentui/react';

import { getApplications, HttpResponseApplications, ShortInfo } from '../api';

export const ApplicationsScreen: React.FunctionComponent = () => {
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
                window.location.href = `/application/${application.id}/${application.environment}`;
                return;
            }
            setData(data);
            return;
        });
    }, []);



    const onRenderCell = (item?: ShortInfo, index?: number | undefined): JSX.Element => {
        const application = item!;
        return (
            <Link href={`/application/${application.id}`} underline>
                {application.name}
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
