// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { getPodStatus, HttpResponsePodStatus } from '../api/api';
import { PodStatus } from '../microservice/podStatus';


import { useReadable, useWritable } from 'use-svelte-store';
import { microservices } from '../stores/state';

const stackTokens = { childrenGap: 15 };

export const MicroserviceViewScreen: React.FunctionComponent = () => {
    const $microservices = useReadable(microservices) as any;
    //
    const history = useHistory();
    const { applicationId, environment, microserviceId } = useParams() as any;
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        Promise.all([
            getPodStatus(applicationId, environment, microserviceId)
        ]).then(values => {
            setPodsData(values[0]);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }


    const _items: ICommandBarItemProps[] = [
        {
            key: 'editItem',
            text: 'Edit',
            iconProps: { iconName: 'Edit' },
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/edit/${microserviceId}`;
                history.push(href);
            }
        }
    ];
    return (
        <>
            <h1>Microservice View Screen</h1>

            <ul>
                {$microservices.map(foo => (
                    <li key={foo.id}>{foo.name}</li>
                ))}
            </ul>

            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>
                    application: {applicationId}
                </Text>
                <Text variant="xLarge" block>
                    microservice: {microserviceId}
                </Text>
            </Stack>
            <CommandBar
                items={_items}
                ariaLabel="Use left and right arrow keys to navigate between commands"
            />

            <PodStatus environment={environment} data={podsData} />
        </>
    );
};
