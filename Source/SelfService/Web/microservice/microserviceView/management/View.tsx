// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {} from 'react';

import { Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';
import { useBuildResults } from './buildResults/useBuildResults';
import { View as BuildResults} from './buildResults/View';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const tabs = [
        {
            label: 'Build Results',
            render: () => <BuildResults applicationId={props.applicationId} environment={props.environment} microserviceId={props.microserviceId}/>
        }
    ];
    return (
        <>
            <Tabs tabs={tabs} />
        </>
    );
};
