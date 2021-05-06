// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { List } from '@fluentui/react/lib/List';
import { Link, Text } from '@fluentui/react';

import { getApplications, HttpResponseApplications, ShortInfo, HttpResponseMicroservices } from './api';

export const ApplicationsScreen: React.FunctionComponent = () => {
    const [data, setData] = useState({
        id: '',
        name: '',
        applications: []
    } as HttpResponseApplications);

    // TODO handle when not 200!
    //const tenantId = 'fe7736bb-57fc-4166-bb91-6954f4dd4eb7';
    const tenantId = '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3';
    useEffect(() => {
        getApplications(tenantId).then(data => {
            // If only 1 item redirect
            if (data.applications.length === 1) {
                const application = data.applications[0];
                window.location.href = `/application/${application.id}`;
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
