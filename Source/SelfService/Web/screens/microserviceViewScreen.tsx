// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';

import { getPodStatus, HttpResponsePodStatus } from '../api/api';
import { PodStatus } from '../microservice/podStatus';
import { Overview } from '../microservice/view/overview';

const stackTokens = { childrenGap: 15 };

export const MicroserviceViewScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { applicationId, environment, microserviceId } = useParams() as any;
    // TODO overview specifc per microservice
    return (
        <>
            <Overview />
        </>
    );
};
