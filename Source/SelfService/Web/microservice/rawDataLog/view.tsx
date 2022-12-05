// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReadable } from 'use-svelte-store';

import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react';

import { HealthStatus } from '../microserviceView/healthStatus/healthStatus';
import { HttpResponsePodStatus } from '../../api/api';

import { microservices, MicroserviceStore } from '../../stores/microservice';
import { Webhooks } from './webhooks';
import { ConfigView } from './config/configView';
import { Typography } from '@mui/material';

const stackTokens = { childrenGap: 15 };

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

export const View: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;
    const podsData = _props.podsData;
    const [selectedKey, setSelectedKey] = useState('healthStatus');

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId && ms.environment === environment);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <Typography variant='h1' my={2}>{currentMicroservice.name}</Typography>
                <Pivot selectedKey={selectedKey}
                    onLinkClick={(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
                        const key = item?.props.itemKey as string;
                        if (selectedKey !== key) {
                            setSelectedKey(key);
                        }
                    }}
                >
                    <PivotItem
                        itemKey="config"
                        headerText="Config"
                        onClick={() => {
                            setSelectedKey('config');
                        }}
                    >
                        <ConfigView microservice={currentMicroservice.edit} />
                    </PivotItem>
                    <PivotItem
                        itemKey="webhooks"
                        headerText="Webhooks"
                        onClick={() => {
                            setSelectedKey('webhooks');
                        }}
                    >
                        <Webhooks microservice={currentMicroservice.edit} />
                    </PivotItem>

                    <PivotItem
                        itemKey="healthStatus"
                        headerText="Health Status">
                        <HealthStatus applicationId={applicationId} environment={environment} microserviceId={microserviceId} msName={currentMicroservice.name} data={podsData} />
                    </PivotItem>
                </Pivot>

            </Stack>
        </>
    );
};
