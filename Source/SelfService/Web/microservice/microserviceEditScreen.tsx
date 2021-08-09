// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { HttpResponseApplications2 } from '../api/api';



const stackTokens = { childrenGap: 15 };

type Props = {
    environment: string
    application: HttpResponseApplications2
};


export const MicroserviceEditScreen: React.FunctionComponent<Props> = (props) => {
    // TODO Get from application
    const tenantId = 'TODO';
    const { microserviceId } = useParams() as any;
    const applicationId = props!.application.id;
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
