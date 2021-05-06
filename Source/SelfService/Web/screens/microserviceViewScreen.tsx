// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { getTenant } from '../store';


const stackTokens = { childrenGap: 15 };

export const MicroserviceViewScreen: React.FunctionComponent = () => {
    const tenantId = getTenant();
    const { applicationId, microserviceId } = useParams() as any;

    const _items: ICommandBarItemProps[] = [
        {
            key: 'editItem',
            text: 'Edit',
            iconProps: { iconName: 'Edit' },
            href: `/application/${applicationId}/microservice/edit/${microserviceId}`,
        },
        {
            key: 'showCurrentStatus',
            text: 'Current Status',
            iconProps: { iconName: 'WebAppBuilderFragment' },
            onClick: () => console.log('Get pods'),
        }
    ];


    return (
        <>
            <h1>Microservice View Screen</h1>

            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>
                    tenant: {tenantId}
                </Text>
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

        </>
    );
};
