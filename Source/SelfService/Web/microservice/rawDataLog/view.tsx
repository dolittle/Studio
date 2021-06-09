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
import { ViewConfig } from './viewConfig';
import { MicroserviceRawDataLogIngestor } from '../../api/index';

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
        const href = `/application/${applicationId}/${environment}/microservices/overview`;
        history.push(href);
        return null;
    }


    const ms = {
        dolittle: {
            applicationId,
            tenantId: 'TODO',
            microserviceId,
        },
        name: 'Raw Data Log Ingestor',
        kind: 'raw-data-log-ingestor',
        environment,
        extra: {
            headImage: currentMicroservice.live.images[0].image,
            runtimeImage: '',
            ingress: {
                path: '/TODO',
                pathType: 'Prefix',
                host: 'TODO',
                domainPrefix: 'TODO'
            },
            webhooks: [],
        }
    } as MicroserviceRawDataLogIngestor;

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
                        <ViewConfig ms={ms} />
                    </PivotItem>
                    <PivotItem
                        itemKey="webhooks"
                        headerText="Webhooks"
                        onClick={() => {
                            setSelectedKey('webhooks');
                        }}
                    >
                        <Webhooks />
                    </PivotItem>

                    <PivotItem
                        itemKey="healthStatus"
                        headerText="Health Status">
                        <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
                    </PivotItem>
                </Pivot>

            </Stack>
        </>
    );
};
