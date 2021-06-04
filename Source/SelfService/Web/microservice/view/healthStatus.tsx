// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { HttpResponsePodStatus, PodInfo, ContainerStatusInfo } from '../../api/api';
import { Link } from '@fluentui/react';

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
    restarts: any // Int?
    pod: PodInfo
    container: ContainerStatusInfo
};

const downloadLogIcon = (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9393 16.8749C13.0799 16.8747 13.2155 16.9271 13.3194 17.0218C13.4233 17.1165 13.4879 17.2466 13.5006 17.3866C13.5133 17.5266 13.4731 17.6663 13.388 17.7782C13.3029 17.89 13.1789 17.966 13.0406 17.991L12.9393 18H0.563572C0.422999 18.0003 0.287423 17.9479 0.183542 17.8532C0.0796608 17.7585 0.0150036 17.6283 0.00230216 17.4883C-0.0103993 17.3483 0.0297756 17.2086 0.114916 17.0968C0.200056 16.9849 0.323991 16.909 0.462315 16.8839L0.563572 16.8749H12.9393ZM6.75146 3.12885e-08C6.88312 -4.38621e-05 7.01063 0.0460957 7.11177 0.130384C7.21292 0.214672 7.28129 0.331767 7.30499 0.461279L7.31399 0.562535L7.30949 13.8316L11.4104 9.72736C11.5033 9.634 11.6261 9.57622 11.7572 9.56409C11.8884 9.55196 12.0197 9.58625 12.1282 9.66098L12.2069 9.72623C12.3001 9.81931 12.3577 9.94214 12.3696 10.0733C12.3815 10.2045 12.3471 10.3357 12.2722 10.444L12.2069 10.5228L7.15311 15.5856C7.07474 15.6639 6.97489 15.7171 6.86622 15.7386L6.74696 15.7499C6.66114 15.7498 6.57648 15.7301 6.49945 15.6922C6.42243 15.6544 6.35507 15.5995 6.30255 15.5316L1.28812 10.5228C1.18807 10.4237 1.12878 10.2908 1.12197 10.1502C1.11516 10.0096 1.16132 9.87153 1.25133 9.7633C1.34134 9.65506 1.46866 9.5845 1.60815 9.56556C1.74765 9.54662 1.88917 9.58066 2.00479 9.66098L2.08354 9.72623L6.18442 13.8226L6.18892 0.56366C6.18877 0.489692 6.20322 0.416422 6.23142 0.348042C6.25962 0.279662 6.30104 0.217516 6.35329 0.16516C6.40554 0.112805 6.4676 0.0712683 6.53592 0.042928C6.60425 0.0145876 6.67749 -1.16647e-07 6.75146 3.12885e-08Z" fill="#F2F2F2" />
    </svg>
);
const viewLogIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
    </svg>

);


export const HealthStatus: React.FunctionComponent<Props> = (props) => {

    const history = useHistory();
    // TODO what is this?
    // eslint-disable-next-line react/prop-types
    const applicationId = props!.applicationId;
    const status = props!.status;
    const data = props!.data;
    const environment = props!.environment;


    const renderViewLog = (item?: Item, index?: number, column?: IColumn) => {
        const podInfo = item!.pod;
        const applicationId = data.namespace.split('application-')[1];
        const container = item!.container;

        return (
            <Stack
                key={container.name}
                tokens={stackTokens}
                horizontal
            >
                <>
                    <div onClick={() => {
                        console.log('Download logs');
                    }}>
                        {downloadLogIcon}
                    </div>
                    <div onClick={() => {
                        const href = `/application/${applicationId}/${environment}/pod/view/${podInfo.name}/logs?containerName=${container.name}`;
                        history.push(href);
                    }}>
                        {viewLogIcon}
                    </div>
                </>
            </Stack >
        );
    };


    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'status', name: 'Status', fieldName: 'state', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'restarts', name: 'Restarts', fieldName: 'restarts', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'age', name: 'Age', fieldName: 'age', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'started', name: 'Started', fieldName: 'started', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'container', name: 'Container', fieldName: 'image', minWidth: 200, maxWidth: 300, isResizable: true },
        { key: 'logs', name: 'View Logs', minWidth: 50, maxWidth: 100, isResizable: true, onRender: renderViewLog },
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
