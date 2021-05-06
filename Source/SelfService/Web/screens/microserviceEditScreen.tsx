// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { Create as Microservice } from '../micoservice/Microservice';
import { getMicroservices, HttpResponseMicroservices } from '../api';
import { getTenant } from '../store';


const stackTokens = { childrenGap: 15 };

export const MicroserviceEditScreen: React.FunctionComponent = () => {
    const tenantId = getTenant();
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
