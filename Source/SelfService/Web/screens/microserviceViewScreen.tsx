// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { getPodStatus, HttpResponsePodStatus } from '../api';
import { PodStatus } from '../micoservice/podStatus';


const stackTokens = { childrenGap: 15 };

export const MicroserviceViewScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { applicationId, environment, microserviceId } = useParams() as any;
    const [showCurrentStatus, setShowCurrentStatus] = useState(false);
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);

    const _items: ICommandBarItemProps[] = [
        {
            key: 'editItem',
            text: 'Edit',
            iconProps: { iconName: 'Edit' },
            onClick: () => {
                const href = `/application/${applicationId}/${environment}/microservice/edit/${microserviceId}`;
                history.push(href);
            }
        },
        {
            key: 'showCurrentStatus',
            text: 'Current Status',
            iconProps: { iconName: 'WebAppBuilderFragment' },
            onClick: () => {
                // TODO maybe loading feedback
                getPodStatus(applicationId, environment, microserviceId).then(data => {
                    setShowCurrentStatus(showCurrentStatus ? false : true);
                    setPodsData(data);
                    return;
                });

            }
        }
    ];
    return (
        <>
            <h1>Microservice View Screen</h1>

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

            {showCurrentStatus && (<PodStatus data={podsData} />)}

        </>
    );
};
