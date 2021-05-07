// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import { ActionButton } from '@fluentui/react/lib/Button';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';

import { HttpResponsePodStatus, PodInfo } from '../api';

const stackTokens = { childrenGap: 15 };

type Props = {
    data: HttpResponsePodStatus
};

type PodInfoItem = {
    key: string
    name: string
    data: PodInfo
};

export const PodStatus: React.FunctionComponent<Props> = (props) => {
    // TODO what is this?
    // eslint-disable-next-line react/prop-types
    const data = props.data!;

    const renderLogs = (item?: PodInfoItem, index?: number, column?: IColumn) => {
        const podInfo = item!.data;
        const applicationId = data.namespace.split('application-')[1];
        const containers = podInfo.containers;

        const items = containers.map(containerName => {
            return (
                <Stack key={containerName} tokens={stackTokens} horizontal>
                    <ActionButton
                        iconProps={{ iconName: 'SearchData' }}
                        allowDisabledFocus
                        onClick={async () => {
                            const href = `/application/${applicationId}/pod/view/${podInfo.name}/logs?containerName=${containerName}`;
                            window.location.href = href;
                        }}
                    >
                        {containerName}
                    </ActionButton>
                </Stack >
            );
        });

        return (
            <Stack tokens={stackTokens}>
                {items}
            </Stack>
        );
    };

    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'status', name: 'Status', fieldName: 'phase', minWidth: 100, maxWidth: 200, isResizable: true },
        {
            key: 'logs',
            name: 'Logs',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: renderLogs
        }
    ];


    const items: PodInfoItem[] = data.pods.map(pod => {
        return {
            key: pod.name,
            name: pod.name, // Couldnt figure out how to get fieldName to work with data.name
            phase: pod.phase, // Couldnt figure out how to get fieldName to work with data.name
            data: pod
        };
    });

    return (
        <>
            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>Pod Status</Text>
                <DetailsList
                    items={items}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                />
            </Stack>
        </>
    );
};
