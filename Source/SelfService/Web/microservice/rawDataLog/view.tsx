// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react';

import { HealthStatus } from '../view/healthStatus';
import { HttpResponsePodStatus } from '../../api/api';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';
import { Webhooks } from './webhooks';
import { ConfigView } from './config/configView';

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

    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    return (
        <>
            <Stack tokens={stackTokens}>
                <h1>{currentMicroservice.name}</h1>
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
                        <HealthStatus applicationId={applicationId} status="TODO" environment={environment} microserviceId={microserviceId} data={podsData} />
                    </PivotItem>
                </Pivot>

            </Stack>
        </>
    );
};
