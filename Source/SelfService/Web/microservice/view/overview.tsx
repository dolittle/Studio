// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { Pivot, PivotItem } from '@fluentui/react';

import { HealthStatus } from './healthStatus';
import { getPodStatus, HttpResponsePodStatus } from '../../api/api';

const stackTokens = { childrenGap: 15 };

type Props = {
};

export const Overview: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const { environment, applicationId, microserviceId } = useParams() as any;
    const [selectedKey, setSelectedKey] = useState('healthStatus');

    const [podsData, setPodsData] = useState({
        namespace: '',
        microservice: {
            name: '',
            id: ''
        },
        pods: []
    } as HttpResponsePodStatus);
    const [loaded, setLoaded] = useState(false);

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
                        <HealthStatus status="TODO" environment={environment} data={podsData} />
                    </PivotItem>
                </Pivot>
            </Stack>
        </>
    );
};
