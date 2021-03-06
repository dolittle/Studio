// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react';

import { HealthStatus } from '../view/healthStatus';
import { HttpResponsePodStatus, getServerUrlPrefix } from '../../api/api';
import { SecondaryButton } from '../../theme/secondaryButton';
import { DownloadLogIcon } from '../../theme/icons';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';
import { ConfigView } from './configView';
import { ConfigViewK8s } from './configViewK8s';


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
    // Want microservice name

    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/application/${applicationId}/${environment}/microservices/overview`;
        history.push(href);
        return null;
    }

    const configMapPrefix = `${environment.toLowerCase()}-${currentMicroservice.name.toLowerCase()}`;

    let hasEditData = false;
    if (currentMicroservice.edit &&
        currentMicroservice.edit.dolittle &&
        currentMicroservice.id !== '' &&
        currentMicroservice.kind !== '') {
        hasEditData = true;
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
                        {hasEditData
                            ? <ConfigView microservice={currentMicroservice.edit} />
                            : <ConfigViewK8s microservice={currentMicroservice.live} />
                        }

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
