// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';



const stackTokens = { childrenGap: 15 };

export const MicroserviceEditScreen: React.FunctionComponent = () => {
    // TODO Get from application
    const tenantId = 'TODO';
    const { applicationId, microserviceId } = useParams() as any;

    return (
        <>
            <h1>Microservice Edit Screen</h1>

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
        </>
    );
};
