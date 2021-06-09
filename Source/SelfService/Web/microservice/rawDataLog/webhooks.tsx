// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';

const stackTokens = { childrenGap: 15 };

type Props = {};

type Item = {
    kind: string
    suffix: string // Is unique
    lastMessage: string
};

export const Webhooks: React.FunctionComponent<Props> = (props) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const _props = props!;

    const fakeData = [
        {
            kind: 'M3/HEADLINE',
            suffix: 'm3/headline',
            lastMessage: '2021-06-01 13:05:30'
        },
        {
            kind: 'M3/MPLINE',
            suffix: 'm3/mpline',
            lastMessage: '2021-06-01 13:05:30'
        }
    ] as Item[];
    const renderAction = (item?: Item, index?: number, column?: IColumn) => {
        return (
            <Stack
                key={item!.suffix}
                tokens={stackTokens}
                horizontal
            >
                <>
                    <a onClick={() => {
                        alert('TODO: View Sample');
                    }}>
                        View Sample
                    </a>

                    <a onClick={() => {
                        alert('TODO: Edit webhook');
                    }}>
                        Edit
                    </a>

                    <a onClick={() => {
                        alert('TODO: Delete webhook');
                    }}>
                        Delete
                    </a>

                </>
            </Stack >
        );
    };

    const columns: IColumn[] = [
        { key: 'kind', name: 'Kind', fieldName: 'kind', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'suffix', name: 'Suffix', fieldName: 'suffix', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'lastMessage', name: 'Last Message', fieldName: 'lastMessage', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'action', name: 'Action', minWidth: 50, maxWidth: 50, isResizable: true, onRender: renderAction },
    ];

    const items: Item[] = fakeData;

    return (
        <>
            <h1>Fake Data</h1>
            <DetailsList
                checkboxVisibility={CheckboxVisibility.hidden}
                items={items}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
            />
        </>
    );
};
