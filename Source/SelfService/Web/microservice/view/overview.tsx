// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react';

import { HealthStatus } from './healthStatus';
import { getPodStatus, HttpResponsePodStatus, getServerUrlPrefix } from '../../api/api';
import { SecondaryButton } from '../../theme/secondaryButton';
import { DownloadLogIcon } from '../../theme/icons';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';

const stackTokens = { childrenGap: 15 };

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
};

export const Overview: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;

    const [selectedKey, setSelectedKey] = useState('healthStatus');
    // Want microservice name
    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);
    const [loaded, setLoaded] = useState(false);
    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/application/${applicationId}/${environment}/microservices/overview`;
        history.push(href);
        return null;
    }

    const configMapPrefix = `${environment.toLowerCase()}-${currentMicroservice.name.toLowerCase()}`;

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
                        <p>Config Screen</p>
                    </PivotItem>
                    <PivotItem
                        itemKey="healthStatus"
                        headerText="Health Status">
                        <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
                    </PivotItem>
                </Pivot>

                <SecondaryButton
                    title="Download secret env-variables yaml"
                    icon={DownloadLogIcon}
                    onClick={() => {
                        const secretName = `${configMapPrefix}-secret-env-variables`;
                        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/secret/${secretName}?download=1&fileType=yaml`;
                        window.open(href, '_blank');
                    }}
                />

                <SecondaryButton
                    title="Download config files yaml"
                    icon={DownloadLogIcon}
                    onClick={() => {
                        const configMapName = `${configMapPrefix}-config-files`;
                        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                        window.open(href, '_blank');
                    }}
                />

                <SecondaryButton
                    title="Download env-variables yaml"
                    icon={DownloadLogIcon}
                    onClick={() => {
                        const configMapName = `${configMapPrefix}-env-variables`;
                        const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                        window.open(href, '_blank');
                    }}
                />
            </Stack>
        </>
    );
};
