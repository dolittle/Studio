// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { HttpResponsePodStatus, PodInfo, ContainerStatusInfo } from '../../api/api';
import { ViewLogIcon, DownloadLogIcon } from '../../theme/icons';

const stackTokens = { childrenGap: 15 };

type Props = {
    status: string
    data: HttpResponsePodStatus
    environment: string
    applicationId: string
};

type Item = {
    key: string
    name: string
    state: string
    age: string
    image: string
    started: string
    restarts: number
    pod: PodInfo
    container: ContainerStatusInfo
};

export const HealthStatus: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const applicationId = _props.applicationId;
    const status = _props.status;
    const data = _props.data;
    const environment = _props.environment;

    const renderViewLog = (item?: Item, index?: number, column?: IColumn) => {
        const podInfo = item!.pod;
        const container = item!.container;
        return (
            <Stack
                key={container.name}
                tokens={stackTokens}
                horizontal
            >
                <>
                    <div onClick={() => {
                        alert('TODO: Download logs');
                    }}>
                        {DownloadLogIcon}
                    </div>
                    <div onClick={() => {
                        const href = `/microservices/application/${applicationId}/${environment}/pod/view/${podInfo.name}/logs?containerName=${container.name}`;
                        history.push(href);
                    }}>
                        {ViewLogIcon}
                    </div>
                </>
            </Stack >
        );
    };


    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'status', name: 'Status', fieldName: 'state', minWidth: 50, maxWidth: 50, isResizable: true },
        { key: 'restarts', name: 'Restarts', fieldName: 'restarts', minWidth: 75, maxWidth: 75, isResizable: true },
        { key: 'age', name: 'Age', fieldName: 'age', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'started', name: 'Started', fieldName: 'started', minWidth: 150, maxWidth: 150, isResizable: true },
        { key: 'container', name: 'Container', fieldName: 'image', minWidth: 300, maxWidth: 500, isResizable: true },
        { key: 'logs', name: 'View Logs', minWidth: 50, maxWidth: 50, isResizable: true, onRender: renderViewLog },
    ];


    const items: Item[] = data.pods.flatMap(pod => {
        return pod.containers.map((container, index) => {
            const name = index === 0 ? pod.name : '';
            return {
                key: `${pod.name}-${container.name}`,
                name,
                image: container.image,
                state: container.state,
                started: container.started,
                age: container.age,
                restarts: container.restarts,
                container,
                pod,
            } as Item;
        });
    }) as Item[];

    return (
        <>
            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>Status: {status}</Text>
                <DetailsList
                    checkboxVisibility={CheckboxVisibility.hidden}
                    items={items}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                />
            </Stack>

        </>
    );
};
